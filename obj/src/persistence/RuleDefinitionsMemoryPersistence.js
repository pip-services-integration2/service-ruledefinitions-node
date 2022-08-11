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
exports.RuleDefinitionsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class RuleDefinitionsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.group, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        if (this.matchString(item.condition, search))
            return true;
        if (this.matchString(item.action, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let group = filter.getAsNullableString('group');
        let description = filter.getAsNullableString('description');
        let priority = filter.getAsNullableInteger('priority');
        let min_priority = filter.getAsNullableInteger('min_priority');
        let max_priority = filter.getAsNullableInteger('max_priority');
        let condition = filter.getAsNullableString('condition');
        let action = filter.getAsNullableString('action');
        let disabled = filter.getAsNullableBoolean('disabled');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        return (item) => {
            if (search && !this.matchSearch(item, search))
                return false;
            if (id && item.id != id)
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (name && item.name != name)
                return false;
            if (group && item.group != group)
                return false;
            if (description && item.description != description)
                return false;
            if (priority && item.priority != priority)
                return false;
            if (min_priority && item.priority > min_priority)
                return false;
            if (max_priority && item.priority < max_priority)
                return false;
            if (condition && item.condition != condition)
                return false;
            if (action && item.action != action)
                return false;
            if (disabled && item.disabled != disabled)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
}
exports.RuleDefinitionsMemoryPersistence = RuleDefinitionsMemoryPersistence;
//# sourceMappingURL=RuleDefinitionsMemoryPersistence.js.map