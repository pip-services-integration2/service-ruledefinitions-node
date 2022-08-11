const assert = require('chai').assert;

import { RuleDefinitionsMemoryPersistence } from "../../src/persistence/RuleDefinitionsMemoryPersistence";
import { ConfigParams, Descriptor, References, FilterParams, PagingParams } from "pip-services3-commons-nodex";
import { RuleDefinitionsController } from "../../src/logic/RuleDefinitionsController";
import { RuleV1, RulePriorityV1 } from "../../src/data/version1";

suite('RuleDefinitionsController', () => {
    let _persistence: RuleDefinitionsMemoryPersistence;
    let _controller: RuleDefinitionsController;

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

    setup(async () => {
        _persistence = new RuleDefinitionsMemoryPersistence();
        _controller = new RuleDefinitionsController();
        _persistence.configure(new ConfigParams());
        var references = References.fromTuples(
            new Descriptor("service-ruledefinitions", "persistence", "mock", "default", "1.0"), _persistence
        );
        _controller.setReferences(references);
        await _persistence.open(null);
    });

    teardown(async () => {
        await _persistence.close(null);
    });

    test('CRUD Operations', async () => {
        let rule1: RuleV1;

        // Create one rule
        let rule = await _controller.createRule(null, RULE1);
        assert.isObject(rule);
        assert.equal(rule.id, RULE1.id);
        assert.equal(rule.name, RULE1.name);
        assert.equal(rule.group, RULE1.group);

        rule1 = rule;

        // Create another rule
        rule = await _controller.createRule(null, RULE2);
        assert.isObject(rule);
        assert.equal(rule.id, RULE2.id);
        assert.equal(rule.name, RULE2.name);
        assert.equal(rule.group, RULE2.group);

        // Create yet another rule
        rule = await _controller.createRule(null, RULE3);
        assert.isObject(rule);
        assert.equal(rule.id, RULE3.id);
        assert.equal(rule.name, RULE3.name);
        assert.equal(rule.group, RULE3.group);

        // Get all rules
        let page = await _controller.getRules(null, new FilterParams(), new PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        rule1 = page.data[0];

        // Update the rule
        rule1.name = 'Updated Name 1';
        rule = await _controller.updateRule(null, rule1);

        rule = await _controller.updateRule(null, rule1);
        assert.isObject(rule);
        assert.equal(rule.name, 'Updated Name 1');
        assert.equal(rule.id, rule1.id);

        // Delete rule
        await _controller.deleteRuleById(null, rule1.id);

        // Try to get delete rule
        rule = await _controller.getRuleById(null, rule1.id);

        assert.isNull(rule || null);
    });

    test('Get with Filters', async () => {
        // Create one rule
        let rule = await _controller.createRule(null, RULE1);
        assert.isObject(rule);
        assert.equal(rule.id, RULE1.id);
        assert.equal(rule.name, RULE1.name);
        assert.equal(rule.group, RULE1.group);

        // Create another rule
        rule = await _controller.createRule(null, RULE2);
        assert.isObject(rule);
        assert.equal(rule.id, RULE2.id);
        assert.equal(rule.name, RULE2.name);
        assert.equal(rule.group, RULE2.group);

        // Create yet another rule
        rule = await _controller.createRule(null, RULE3);
        assert.isObject(rule);
        assert.equal(rule.id, RULE3.id);
        assert.equal(rule.name, RULE3.name);
        assert.equal(rule.group, RULE3.group);

        // Get rules filtered by group
        let rules = await _controller.getRules(
            null,
            FilterParams.fromValue({
                group: 'Group 1'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 2);

        // Get rules filtered by search
        rules = await _controller.getRules(
            null,
            FilterParams.fromValue({
                search: '2'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 2);

        // Get rules filtered by priority range
        rules = await _controller.getRules(
            null,
            FilterParams.fromValue({
                min_priority: RulePriorityV1.Medium,
                max_priority: RulePriorityV1.High
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 2);

        // Get rules filtered by action
        rules = await _controller.getRules(
            null,
            FilterParams.fromValue({
                action: 'delete'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 1);

        // Get rules filtered by disabled
        rules = await _controller.getRules(
            null,
            FilterParams.fromValue({
                disabled: true
            }),
            new PagingParams()
        );
        
        assert.isObject(rules);
        assert.lengthOf(rules.data, 1);
    });

});