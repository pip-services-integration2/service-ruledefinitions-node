"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDefinitionsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class RuleDefinitionsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/rule_definitions');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-ruledefinitions', 'controller', 'default', '*', '1.0'));
    }
}
exports.RuleDefinitionsHttpServiceV1 = RuleDefinitionsHttpServiceV1;
//# sourceMappingURL=RuleDefinitionsHttpServiceV1.js.map