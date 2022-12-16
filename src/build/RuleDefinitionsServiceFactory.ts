import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { RuleDefinitionsMongoDbPersistence } from '../persistence/RuleDefinitionsMongoDbPersistence';
import { RuleDefinitionsFilePersistence } from '../persistence/RuleDefinitionsFilePersistence';
import { RuleDefinitionsMemoryPersistence } from '../persistence/RuleDefinitionsMemoryPersistence';
import { RuleDefinitionsController } from '../logic/RuleDefinitionsController';
import { RuleDefinitionsCommandableHttpServiceV1 } from '../services/version1/RuleDefinitionsCommandableHttpServiceV1';

export class RuleDefinitionsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-ruledefinitions", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-ruledefinitions", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-ruledefinitions", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-ruledefinitions", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-ruledefinitions", "controller", "default", "*", "1.0");
	public static CmdHttpServiceDescriptor = new Descriptor("service-ruledefinitions", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RuleDefinitionsServiceFactory.MemoryPersistenceDescriptor, RuleDefinitionsMemoryPersistence);
		this.registerAsType(RuleDefinitionsServiceFactory.FilePersistenceDescriptor, RuleDefinitionsFilePersistence);
		this.registerAsType(RuleDefinitionsServiceFactory.MongoDbPersistenceDescriptor, RuleDefinitionsMongoDbPersistence);
		this.registerAsType(RuleDefinitionsServiceFactory.ControllerDescriptor, RuleDefinitionsController);
		this.registerAsType(RuleDefinitionsServiceFactory.CmdHttpServiceDescriptor, RuleDefinitionsCommandableHttpServiceV1);
	}
	
}
