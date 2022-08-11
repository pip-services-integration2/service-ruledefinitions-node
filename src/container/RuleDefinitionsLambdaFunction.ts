import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { RuleDefinitionsServiceFactory } from '../build/RuleDefinitionsServiceFactory';

export class RuleDefinitionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("rule_definitions", "Business rule definitions function");
        this._dependencyResolver.put('controller', new Descriptor('service-ruledefinitions', 'controller', 'default', '*', '*'));
        this._factories.add(new RuleDefinitionsServiceFactory());
    }
}

export const handler = new RuleDefinitionsLambdaFunction().getHandler();