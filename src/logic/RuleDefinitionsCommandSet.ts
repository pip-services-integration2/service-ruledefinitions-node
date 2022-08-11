import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { RuleV1Schema } from '../data/version1/RuleV1Schema';
import { IRuleDefinitionsController } from './IRuleDefinitionsController';

export class RuleDefinitionsCommandSet extends CommandSet {
    private _logic: IRuleDefinitionsController;

    constructor(logic: IRuleDefinitionsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetRulesCommand());
		this.addCommand(this.makeGetRuleByIdCommand());
		this.addCommand(this.makeCreateRuleCommand());
		this.addCommand(this.makeUpdateRuleCommand());
		this.addCommand(this.makeDeleteRuleByIdCommand());
    }

	private makeGetRulesCommand(): ICommand {
		return new Command(
			"get_rules",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getRules(correlationId, filter, paging);
            }
		);
	}

	private makeGetRuleByIdCommand(): ICommand {
		return new Command(
			"get_rule_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('rule_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let rule_id = args.getAsString("rule_id");
				return await this._logic.getRuleById(correlationId, rule_id);
            }
		);
	}

	private makeCreateRuleCommand(): ICommand {
		return new Command(
			"create_rule",
			new ObjectSchema(true)
				.withRequiredProperty('rule', new RuleV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let rule = args.get("rule");
				return await this._logic.createRule(correlationId, rule);
            }
		);
	}

	private makeUpdateRuleCommand(): ICommand {
		return new Command(
			"update_rule",
			new ObjectSchema(true)
				.withRequiredProperty('rule', new RuleV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let rule = args.get("rule");
				return await this._logic.updateRule(correlationId, rule);
            }
		);
	}
	
	private makeDeleteRuleByIdCommand(): ICommand {
		return new Command(
			"delete_rule_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('rule_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let ruleId = args.getAsNullableString("rule_id");
				return await this._logic.deleteRuleById(correlationId, ruleId);
			}
		);
	}
}