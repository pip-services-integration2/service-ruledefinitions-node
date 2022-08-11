// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { Descriptor, MultiString } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ConsoleLogger } from 'pip-services3-components-node';

// import { RuleV1 } from '../../src/data/version1/RuleV1';
// import { RuleDefinitionsMemoryPersistence } from '../../src/persistence/RuleDefinitionsMemoryPersistence';
// import { RuleDefinitionsController } from '../../src/logic/RuleDefinitionsController';
// import { RuleDefinitionsLambdaFunction } from '../../src/container/RuleDefinitionsLambdaFunction';

// let RULE1: RuleV1 = {
//     id: '1',
//     name: new MultiString({en: 'App1'}),
//     product: 'Product 1',
//     copyrights: 'PipDevs 2018',
//     min_ver: 0,
//     max_ver: 9999
// };
// let RULE2: RuleV1 = {
//     id: '2',
//     name: new MultiString({en: 'App2'}),
//     product: 'Product 1',
//     copyrights: 'PipDevs 2018',
//     min_ver: 0,
//     max_ver: 9999
// };

// suite('RuleDefinitionsLambdaFunction', ()=> {
//     let lambda: RuleDefinitionsLambdaFunction;

//     suiteSetup((done) => {
//         let config = ConfigParams.fromTuples(
//             'logger.descriptor', 'pip-services:logger:console:default:1.0',
//             'persistence.descriptor', 'service-ruledefinitions:persistence:memory:default:1.0',
//             'controller.descriptor', 'service-ruledefinitions:controller:default:default:1.0'
//         );

//         lambda = new RuleDefinitionsLambdaFunction();
//         lambda.configure(config);
//         lambda.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         lambda.close(null, done);
//     });
    
//     test('CRUD Operations', (done) => {
//         var rule1, rule2: RuleV1;

//         async.series([
//         // Create one rule
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'create_rule',
//                         rule: RULE1
//                     },
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name, RULE1.name);
//                         assert.equal(rule.product, RULE1.product);
//                         assert.equal(rule.copyrights, RULE1.copyrights);

//                         rule1 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Create another rule
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'create_rule',
//                         rule: RULE2
//                     },
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name, RULE2.name);
//                         assert.equal(rule.product, RULE2.product);
//                         assert.equal(rule.copyrights, RULE2.copyrights);

//                         rule2 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Get all rules
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'get_rules' 
//                     },
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the rule
//             (callback) => {
//                 rule1.name.en = 'Updated Name 1';

//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'update_rule',
//                         rule: rule1
//                     },
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isObject(rule);
//                         assert.equal(rule.name.en, 'Updated Name 1');
//                         assert.equal(rule.id, RULE1.id);

//                         rule1 = rule;

//                         callback();
//                     }
//                 );
//             },
//         // Delete rule
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'delete_rule_by_id',
//                         rule_id: rule1.id
//                     },
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete rule
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'rules',
//                         cmd: 'get_rule_by_id',
//                         rule_id: rule1.id
//                     },
//                     (err, rule) => {
//                         assert.isNull(err);

//                         assert.isNull(rule || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });