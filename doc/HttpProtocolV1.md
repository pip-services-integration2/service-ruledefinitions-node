# HTTP Protocol (version 1) <br/> RuleDefinitions Microservice

RuleDefinitions microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [RuleV1 class](#class1)
* [DataPage<RuleV1> class](#class2)
* [POST /rule_definitions/get_rules](#operation1)
* [POST /rule_definitions/get_rule_by_id](#operation2)
* [POST /rule_definitions/create_rule](#operation3)
* [POST /rule_definitions/update_rule](#operation4)
* [POST /rule_definitions/delete_rule_id](#operation5)

## Data types

### <a name="class1"></a> RuleV1 class

Represents an rule

**Properties:**
- id: string - unique rule id
- name: string - rule name
- group: string - group name
- description: string - rule description
- priority: number - rule priority (RulePriorityV1)
- params: any - additional rule parameters
- condition: string - rule condition
- action: string - rule action

### <a name="class2"></a> DataPage<RuleV1> class

Represents a paged result with subset of requested rules

**Properties:**
- data: [RuleDefinition] - array of retrieved RuleDefinition page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Method: 'POST', route '/rule_definitions/get_rules'

Retrieves a collection of rules according to specified criteria

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: Object
  - ids: string - (optional) a comma-separated list of rule ids 
  - id: string - (optional) unique id of rule
  - name: string - (optional) rule name
  - group: string - (optional) rule group
  - description: string - (optional) rule description
  - priority: number - (optional) rule priority
  - min_priority: number - (optional) minimum rule priority
  - max_priority: number - (optional) maximum rule priority
  - condition: string - (optional) rule condition
  - action: string - (optional) rule action
  - search: string - (optional) search for rules fields: id, name, group, description, condition, action 
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of RuleDefinition objects, DataPage<RuleV1> object is paging was requested or error

### <a name="operation2"></a> Method: 'POST', route '/rule_definitions/get_rule_by_id'

Retrieves a single rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id

**Response body:**
RuleDefinition object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/rule_definitions/create_rule'

Creates a new rule

**Request body:**
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule: RuleV1 - RuleDefinition object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created RuleDefinition object or error

### <a name="operation4"></a> Method: 'POST', route '/rule_definitions/update_rule'

Updates rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule: RuleV1 - RuleDefinition object with new values. Partial updates are supported

**Response body:**
Updated RuleDefinition object or error 
 
### <a name="operation5"></a> Method: 'POST', route '/rule_definitions/delete_rule_by_id'

Deletes rule specified by its unique id

**Request body:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- rule_id: string - unique rule id

**Response body:**
Occured error or null for success
 
