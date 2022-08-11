"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDefinitionsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const RuleV1Schema_1 = require("../data/version1/RuleV1Schema");
class RuleDefinitionsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRulesCommand());
        this.addCommand(this.makeGetRuleByIdCommand());
        this.addCommand(this.makeCreateRuleCommand());
        this.addCommand(this.makeUpdateRuleCommand());
        this.addCommand(this.makeDeleteRuleByIdCommand());
    }
    makeGetRulesCommand() {
        return new pip_services3_commons_nodex_2.Command("get_rules", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getRules(correlationId, filter, paging);
        }));
    }
    makeGetRuleByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_rule_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let rule_id = args.getAsString("rule_id");
            return yield this._logic.getRuleById(correlationId, rule_id);
        }));
    }
    makeCreateRuleCommand() {
        return new pip_services3_commons_nodex_2.Command("create_rule", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('rule', new RuleV1Schema_1.RuleV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let rule = args.get("rule");
            return yield this._logic.createRule(correlationId, rule);
        }));
    }
    makeUpdateRuleCommand() {
        return new pip_services3_commons_nodex_2.Command("update_rule", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('rule', new RuleV1Schema_1.RuleV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let rule = args.get("rule");
            return yield this._logic.updateRule(correlationId, rule);
        }));
    }
    makeDeleteRuleByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_rule_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('rule_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let ruleId = args.getAsNullableString("rule_id");
            return yield this._logic.deleteRuleById(correlationId, ruleId);
        }));
    }
}
exports.RuleDefinitionsCommandSet = RuleDefinitionsCommandSet;
//# sourceMappingURL=RuleDefinitionsCommandSet.js.map