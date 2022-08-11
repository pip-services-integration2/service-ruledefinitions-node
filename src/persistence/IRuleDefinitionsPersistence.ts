import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { RuleV1 } from '../data/version1/RuleV1';

export interface IRuleDefinitionsPersistence extends IGetter<RuleV1, string>, IWriter<RuleV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>>;

    getOneById(correlationId: string, id: string): Promise<RuleV1>;

    create(correlationId: string, item: RuleV1): Promise<RuleV1>;

    update(correlationId: string, item: RuleV1): Promise<RuleV1>;

    deleteById(correlationId: string, id: string): Promise<RuleV1>;
}
