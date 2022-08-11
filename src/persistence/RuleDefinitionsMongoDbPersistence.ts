import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';

export class RuleDefinitionsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<RuleV1, string>
    implements IRuleDefinitionsPersistence {

    constructor() {
        super('rule_definitions');
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ group: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            searchCriteria.push({ condition: { $regex: searchRegex } });
            searchCriteria.push({ action: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });

        let description = filter.getAsNullableString('description');
        if (description != null)
            criteria.push({ description: description });

        let _priority = filter.getAsNullableInteger('priority');
        if (_priority != null)
            criteria.push({ priority: _priority });

        let min_priority = filter.getAsNullableInteger('min_priority');
        if (min_priority != null)
            criteria.push({ priority: { $lte: min_priority } });        

        let max_priority = filter.getAsNullableInteger('max_priority');
        if (max_priority != null)
            criteria.push({ priority: { $gte: max_priority } });        
    
        let condition = filter.getAsNullableString('condition');
        if (condition != null)
            criteria.push({ condition: condition });

        let action = filter.getAsNullableString('action');
        if (action != null)
            criteria.push({ action: action });                                

        let disabled = filter.getAsNullableBoolean('disabled');
        if (disabled != null)
            criteria.push({ disabled: disabled });                                
    
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}
