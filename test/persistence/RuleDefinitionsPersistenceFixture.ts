const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { RuleV1 } from '../../src/data/version1/RuleV1';

import { IRuleDefinitionsPersistence } from '../../src/persistence/IRuleDefinitionsPersistence';
import { RulePriorityV1 } from '../../src/data/version1';

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

export class RuleDefinitionsPersistenceFixture {
    private _persistence: IRuleDefinitionsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateRules() {
        // Create one rule
        let rule = await this._persistence.create(null, RULE1);
        assert.isObject(rule);
        assert.equal(rule.id, RULE1.id);
        assert.equal(rule.name, RULE1.name);
        assert.equal(rule.group, RULE1.group);

        // Create another rule
        rule = await this._persistence.create(null, RULE2);
        assert.isObject(rule);
        assert.equal(rule.id, RULE2.id);
        assert.equal(rule.name, RULE2.name);
        assert.equal(rule.group, RULE2.group);

        // Create yet another rule
        rule = await this._persistence.create(null, RULE3);
        assert.isObject(rule);
        assert.equal(rule.id, RULE3.id);
        assert.equal(rule.name, RULE3.name);
        assert.equal(rule.group, RULE3.group);
    }
                
    public async testCrudOperations() {
        let rule1: RuleV1;

        // Create items
        await this.testCreateRules();

        // Get all rules
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        rule1 = page.data[0];

        // Update the rule
        rule1.name = 'Updated Name 1';

        let rule = await this._persistence.update(null, rule1);
        assert.isObject(rule);
        assert.equal(rule.name, 'Updated Name 1');
        assert.equal(rule.id, rule1.id);

        // Delete rule
        await this._persistence.deleteById(null, rule1.id);

        // Try to get delete rule
        rule = await this._persistence.getOneById(null, rule1.id);

        assert.isNull(rule || null);
    }

    public async testGetWithFilter() {
        // Create rules
        await this.testCreateRules();

        // Get rules filtered by group
        let rules = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                group: 'Group 1'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 2);

        // Get rules filtered by search
        rules = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: '2'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 2);

        // Get rules filtered by priority
        rules = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                priority: RulePriorityV1.Medium
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 1);

        // Get rules filtered by priority range
        rules = await this._persistence.getPageByFilter(
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
        rules = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                action: 'delete'
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 1);

        // Get rules filtered by disabled
        rules = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                disabled: true
            }),
            new PagingParams()
        );

        assert.isObject(rules);
        assert.lengthOf(rules.data, 1);
    }
}
