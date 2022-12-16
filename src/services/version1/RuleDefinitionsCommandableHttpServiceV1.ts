import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class RuleDefinitionsCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/rule_definitions');
        this._dependencyResolver.put('controller', new Descriptor('service-ruledefinitions', 'controller', 'default', '*', '1.0'));
    }
}