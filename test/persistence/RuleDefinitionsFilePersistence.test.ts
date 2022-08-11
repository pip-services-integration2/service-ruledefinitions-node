import { RuleDefinitionsFilePersistence } from '../../src/persistence/RuleDefinitionsFilePersistence';
import { RuleDefinitionsPersistenceFixture } from './RuleDefinitionsPersistenceFixture';

suite('RuleDefinitionsFilePersistence', ()=> {
    let persistence: RuleDefinitionsFilePersistence;
    let fixture: RuleDefinitionsPersistenceFixture;
    
    setup(async () => {
        persistence = new RuleDefinitionsFilePersistence('./data/rules.test.json');

        fixture = new RuleDefinitionsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
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