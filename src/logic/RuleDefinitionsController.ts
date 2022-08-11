import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { RuleV1 } from '../data/version1/RuleV1';
import { IRuleDefinitionsPersistence } from '../persistence/IRuleDefinitionsPersistence';
import { IRuleDefinitionsController } from './IRuleDefinitionsController';
import { RuleDefinitionsCommandSet } from './RuleDefinitionsCommandSet';

export class RuleDefinitionsController implements  IConfigurable, IReferenceable, ICommandable, IRuleDefinitionsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-ruledefinitions:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(RuleDefinitionsController._defaultConfig);
    private _persistence: IRuleDefinitionsPersistence;
    private _commandSet: RuleDefinitionsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IRuleDefinitionsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RuleDefinitionsCommandSet(this);
        return this._commandSet;
    }
    
    public async getRules(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RuleV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getRuleById(correlationId: string, id: string): Promise<RuleV1> {
        return await this._persistence.getOneById(correlationId, id);        
    }

    public async createRule(correlationId: string, rule: RuleV1): Promise<RuleV1> {
        return await this._persistence.create(correlationId, rule);
    }

    public async updateRule(correlationId: string, rule: RuleV1): Promise<RuleV1> {
        return await this._persistence.update(correlationId, rule);
    }

    public async deleteRuleById(correlationId: string, id: string): Promise<RuleV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
