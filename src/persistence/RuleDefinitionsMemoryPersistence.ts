import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';

export class RuleDefinitionsMemoryPersistence 
    extends IdentifiableMemoryPersistence<RuleV1, string> 
    implements IRuleDefinitionsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: RuleV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.group, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        if (this.matchString(item.condition, search))
            return true;
        if (this.matchString(item.action, search))
            return true;
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let group = filter.getAsNullableString('group');
        let description = filter.getAsNullableString('description');
        let priority = filter.getAsNullableInteger('priority');
        let min_priority = filter.getAsNullableInteger('min_priority');
        let max_priority = filter.getAsNullableInteger('max_priority');
        let condition = filter.getAsNullableString('condition');
        let action = filter.getAsNullableString('action');
        let disabled = filter.getAsNullableBoolean('disabled');
        let ids = filter.getAsObject('ids');

        // Process ids filter
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;

        return (item) => {
            if (search && !this.matchSearch(item, search)) 
                return false;
            if (id && item.id != id) 
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (name && item.name != name) 
                return false;
            if (group && item.group != group) 
                return false;
            if (description && item.description != description) 
                return false;
            if (priority && item.priority != priority) 
                return false;
            if (min_priority && item.priority > min_priority) 
                return false;
            if (max_priority && item.priority < max_priority) 
                return false;
            if (condition && item.condition != condition) 
                return false;
            if (action && item.action != action) 
                return false;
            if (disabled && item.disabled != disabled)
                return false;
            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}
