import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from './IRuleDefinitionsPersistence';
export declare class RuleDefinitionsMemoryPersistence extends IdentifiableMemoryPersistence<RuleV1, string> implements IRuleDefinitionsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>>;
}
