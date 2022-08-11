import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsController } from './IRuleDefinitionsController';
export declare class RuleDefinitionsController implements IConfigurable, IReferenceable, ICommandable, IRuleDefinitionsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRules(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>>;
    getRuleById(correlationId: string, id: string): Promise<RuleV1>;
    createRule(correlationId: string, rule: RuleV1): Promise<RuleV1>;
    updateRule(correlationId: string, rule: RuleV1): Promise<RuleV1>;
    deleteRuleById(correlationId: string, id: string): Promise<RuleV1>;
}
