import { CommandSet } from 'pip-services3-commons-nodex';
import { IRuleDefinitionsController } from './IRuleDefinitionsController';
export declare class RuleDefinitionsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRuleDefinitionsController);
    private makeGetRulesCommand;
    private makeGetRuleByIdCommand;
    private makeCreateRuleCommand;
    private makeUpdateRuleCommand;
    private makeDeleteRuleByIdCommand;
}
