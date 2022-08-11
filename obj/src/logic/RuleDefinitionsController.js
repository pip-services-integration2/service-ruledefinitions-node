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
exports.RuleDefinitionsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const RuleDefinitionsCommandSet_1 = require("./RuleDefinitionsCommandSet");
class RuleDefinitionsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(RuleDefinitionsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RuleDefinitionsCommandSet_1.RuleDefinitionsCommandSet(this);
        return this._commandSet;
    }
    getRules(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRuleById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    createRule(correlationId, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.create(correlationId, rule);
        });
    }
    updateRule(correlationId, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.update(correlationId, rule);
        });
    }
    deleteRuleById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.deleteById(correlationId, id);
        });
    }
}
exports.RuleDefinitionsController = RuleDefinitionsController;
RuleDefinitionsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-ruledefinitions:persistence:*:*:1.0');
//# sourceMappingURL=RuleDefinitionsController.js.map