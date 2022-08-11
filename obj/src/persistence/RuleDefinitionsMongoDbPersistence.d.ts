import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';
export declare class RuleDefinitionsMongoDbPersistence extends IdentifiableMongoDbPersistence<RuleV1, string> implements IRuleDefinitionsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>>;
}
