"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class RuleV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('group', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withRequiredProperty('priority', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('params', pip_services3_commons_nodex_2.TypeCode.Map);
        this.withRequiredProperty('condition', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('action', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('disabled', pip_services3_commons_nodex_2.TypeCode.Boolean);
    }
}
exports.RuleV1Schema = RuleV1Schema;
//# sourceMappingURL=RuleV1Schema.js.map