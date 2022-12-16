"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDefinitionsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const RuleDefinitionsMongoDbPersistence_1 = require("../persistence/RuleDefinitionsMongoDbPersistence");
const RuleDefinitionsFilePersistence_1 = require("../persistence/RuleDefinitionsFilePersistence");
const RuleDefinitionsMemoryPersistence_1 = require("../persistence/RuleDefinitionsMemoryPersistence");
const RuleDefinitionsController_1 = require("../logic/RuleDefinitionsController");
const RuleDefinitionsCommandableHttpServiceV1_1 = require("../services/version1/RuleDefinitionsCommandableHttpServiceV1");
class RuleDefinitionsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor, RuleDefinitionsMemoryPersistence_1.RuleDefinitionsMemoryPersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.FilePersistenceDescriptor, RuleDefinitionsFilePersistence_1.RuleDefinitionsFilePersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor, RuleDefinitionsMongoDbPersistence_1.RuleDefinitionsMongoDbPersistence);
        this.registerAsType(RuleDefinitionsServiceFactory.ControllerDescriptor, RuleDefinitionsController_1.RuleDefinitionsController);
        this.registerAsType(RuleDefinitionsServiceFactory.CmdHttpServiceDescriptor, RuleDefinitionsCommandableHttpServiceV1_1.RuleDefinitionsCommandableHttpServiceV1);
    }
}
exports.RuleDefinitionsServiceFactory = RuleDefinitionsServiceFactory;
RuleDefinitionsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "factory", "default", "default", "1.0");
RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "persistence", "memory", "*", "1.0");
RuleDefinitionsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "persistence", "file", "*", "1.0");
RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "persistence", "mongodb", "*", "1.0");
RuleDefinitionsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "controller", "default", "*", "1.0");
RuleDefinitionsServiceFactory.CmdHttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-ruledefinitions", "service", "commandable-http", "*", "1.0");
//# sourceMappingURL=RuleDefinitionsServiceFactory.js.map