"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDefinitionsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const RuleDefinitionsServiceFactory_1 = require("../build/RuleDefinitionsServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class RuleDefinitionsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("rule_definitions", "Business rule definitions microservice");
        this._factories.add(new RuleDefinitionsServiceFactory_1.RuleDefinitionsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.RuleDefinitionsProcess = RuleDefinitionsProcess;
//# sourceMappingURL=RuleDefinitionsProcess.js.map