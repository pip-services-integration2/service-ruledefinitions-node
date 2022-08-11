import { ConfigParams } from 'pip-services3-commons-nodex';

import { RuleDefinitionsMemoryPersistence } from '../../src/persistence/RuleDefinitionsMemoryPersistence';
import { RuleDefinitionsPersistenceFixture } from './RuleDefinitionsPersistenceFixture';

suite('RuleDefinitionsMemoryPersistence', ()=> {
    let persistence: RuleDefinitionsMemoryPersistence;
    let fixture: RuleDefinitionsPersistenceFixture;
    
    setup(async () => {
        persistence = new RuleDefinitionsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new RuleDefinitionsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});