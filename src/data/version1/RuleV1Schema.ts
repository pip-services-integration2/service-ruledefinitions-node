import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class RuleV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('group', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('description', TypeCode.Map);
        this.withRequiredProperty('priority', TypeCode.Integer);
        this.withOptionalProperty('params', TypeCode.Map);
        this.withRequiredProperty('condition', TypeCode.String);
        this.withRequiredProperty('action', TypeCode.String);
        this.withRequiredProperty('disabled', TypeCode.Boolean);
    }
}
