const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams, MultiString, FilterParams, PagingParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RuleV1 } from '../../../src/data/version1/RuleV1';
import { RuleDefinitionsMemoryPersistence } from '../../../src/persistence/RuleDefinitionsMemoryPersistence';
import { RuleDefinitionsController } from '../../../src/logic/RuleDefinitionsController';
import { RuleDefinitionsHttpServiceV1 } from '../../../src/services/version1/RuleDefinitionsHttpServiceV1';
import { RulePriorityV1 } from '../../../src/data/version1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let RULE1: RuleV1 = {
    id: '1',
    name: 'name 1',
    group: 'Group 1',
    action: 'copy',
    condition: 'condition 1',
    priority: RulePriorityV1.High,
    description: null,
    params: { param1: '123' },
    disabled: false
};

let RULE2: RuleV1 = {
    id: '2',
    name: 'name 2',
    group: 'Group 1',
    action: 'delete',
    condition: 'condition 2',
    priority: RulePriorityV1.Low,
    description: null,
    params: { param1: '2443' },
    disabled: false
};

let RULE3: RuleV1 = {
    id: '3',
    name: 'name 3',
    group: 'Group 2',
    action: 'create',
    condition: 'condition 1',
    priority: RulePriorityV1.Medium,
    description: null,
    params: { param1: '2345' },
    disabled: true
};

suite('RuleDefinitionsHttpServiceV1', () => {
    let persistence: RuleDefinitionsMemoryPersistence;
    let service: RuleDefinitionsHttpServiceV1;
    let rest: any;

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        let controller = new RuleDefinitionsController();

        persistence = new RuleDefinitionsMemoryPersistence();

        service = new RuleDefinitionsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-ruledefinitions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-ruledefinitions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-ruledefinitions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });

    teardown(async () => {
        await service.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        let rule1, rule2;
        
        // Create one rule
        let rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE1.id);
        assert.equal(rule.name, RULE1.name);
        assert.equal(rule.group, RULE1.group);

        rule1 = rule;

        // Create another rule
        rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE2.id);
        assert.equal(rule.name, RULE2.name);
        assert.equal(rule.group, RULE2.group);

        rule2 = rule;

        // Create yet another rule
        rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE3
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE3.id);
        assert.equal(rule.name, RULE3.name);
        assert.equal(rule.group, RULE3.group);

        // Get all rules
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        // Update the rule
        rule1.name = 'Updated Name 1';
        rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/update_rule',
                {
                    rule: rule1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.name, 'Updated Name 1');
        assert.equal(rule.id, RULE1.id);

        rule1 = rule;

        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/delete_rule_by_id',
                {
                    rule_id: rule1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(Object.keys(result).length != 0 ? result : null);
                    else reject(err);
                }
            );
        });

        assert.equal(result.id, rule1.id);

        // Try to get delete rule
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rule_by_id',
                {
                    rule_id: rule1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(Object.keys(result).length != 0 ? result : null);
                    else reject(err);
                }
            );
        });

        assert.isNull(result);
    });

    test('Get with Filters', async () => {
        // Create one rule
        let rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE1.id);
        assert.equal(rule.name, RULE1.name);
        assert.equal(rule.group, RULE1.group);

        // Create another rule
        rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE2.id);
        assert.equal(rule.name, RULE2.name);
        assert.equal(rule.group, RULE2.group);

        // Create yet another rule
        rule = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/create_rule',
                {
                    rule: RULE3
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rule);
        assert.equal(rule.id, RULE3.id);
        assert.equal(rule.name, RULE3.name);
        assert.equal(rule.group, RULE3.group);

        // Get rules filtered by group
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        group: 'Group 1'
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get rules filtered by search
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        search: '2'
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get rules filtered by priority
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        priority: RulePriorityV1.Medium
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Get rules filtered by priority range
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        min_priority: RulePriorityV1.Medium,
                        max_priority: RulePriorityV1.High
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get rules filtered by action
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        action: 'delete'
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Get rules filtered by disabled
        page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/rule_definitions/get_rules',
                {
                    filter: FilterParams.fromValue({
                        disabled: true
                    }),
                    paging: new PagingParams()
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 1);
    });
});