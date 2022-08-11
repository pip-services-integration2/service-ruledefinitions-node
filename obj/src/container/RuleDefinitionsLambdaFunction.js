"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.RuleDefinitionsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const RuleDefinitionsServiceFactory_1 = require("../build/RuleDefinitionsServiceFactory");
class RuleDefinitionsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("rule_definitions", "Business rule definitions function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-ruledefinitions', 'controller', 'default', '*', '*'));
        this._factories.add(new RuleDefinitionsServiceFactory_1.RuleDefinitionsServiceFactory());
    }
}
exports.RuleDefinitionsLambdaFunction = RuleDefinitionsLambdaFunction;
exports.handler = new RuleDefinitionsLambdaFunction().getHandler();
//# sourceMappingURL=RuleDefinitionsLambdaFunction.js.map