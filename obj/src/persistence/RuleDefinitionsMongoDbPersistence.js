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
exports.RuleDefinitionsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class RuleDefinitionsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('rule_definitions');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ group: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            searchCriteria.push({ condition: { $regex: searchRegex } });
            searchCriteria.push({ action: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });
        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });
        let description = filter.getAsNullableString('description');
        if (description != null)
            criteria.push({ description: description });
        let _priority = filter.getAsNullableInteger('priority');
        if (_priority != null)
            criteria.push({ priority: _priority });
        let min_priority = filter.getAsNullableInteger('min_priority');
        if (min_priority != null)
            criteria.push({ priority: { $lte: min_priority } });
        let max_priority = filter.getAsNullableInteger('max_priority');
        if (max_priority != null)
            criteria.push({ priority: { $gte: max_priority } });
        let condition = filter.getAsNullableString('condition');
        if (condition != null)
            criteria.push({ condition: condition });
        let action = filter.getAsNullableString('action');
        if (action != null)
            criteria.push({ action: action });
        let disabled = filter.getAsNullableBoolean('disabled');
        if (disabled != null)
            criteria.push({ disabled: disabled });
        return criteria.length > 0 ? { $and: criteria } : null;
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
exports.RuleDefinitionsMongoDbPersistence = RuleDefinitionsMongoDbPersistence;
//# sourceMappingURL=RuleDefinitionsMongoDbPersistence.js.map