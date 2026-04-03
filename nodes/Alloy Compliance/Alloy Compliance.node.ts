/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-alloycompliance/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class AlloyCompliance implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Alloy Compliance',
    name: 'alloycompliance',
    icon: 'file:alloycompliance.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Alloy Compliance API',
    defaults: {
      name: 'Alloy Compliance',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'alloycomplianceApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Evaluation',
            value: 'evaluation',
          },
          {
            name: 'Entity',
            value: 'entity',
          },
          {
            name: 'Document',
            value: 'document',
          },
          {
            name: 'Watchlist',
            value: 'watchlist',
          },
          {
            name: 'Workflow',
            value: 'workflow',
          },
          {
            name: 'Webhook',
            value: 'webhook',
          }
        ],
        default: 'evaluation',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['evaluation'] } },
  options: [
    { name: 'Create Evaluation', value: 'createEvaluation', description: 'Create a new evaluation for identity verification', action: 'Create evaluation' },
    { name: 'Get Evaluation', value: 'getEvaluation', description: 'Retrieve a specific evaluation by token', action: 'Get evaluation' },
    { name: 'List Evaluations', value: 'listEvaluations', description: 'List all evaluations with optional filtering', action: 'List evaluations' },
    { name: 'Update Evaluation', value: 'updateEvaluation', description: 'Update an existing evaluation', action: 'Update evaluation' },
    { name: 'Rerun Evaluation', value: 'rerunEvaluation', description: 'Rerun an evaluation with updated data', action: 'Rerun evaluation' },
  ],
  default: 'createEvaluation',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['entity'] } },
	options: [
		{
			name: 'Create Entity',
			value: 'createEntity',
			description: 'Create a new entity for compliance evaluation',
			action: 'Create entity',
		},
		{
			name: 'Get Entity',
			value: 'getEntity',
			description: 'Retrieve a specific entity by token',
			action: 'Get entity',
		},
		{
			name: 'List Entities',
			value: 'listEntities',
			description: 'List all entities with optional filtering',
			action: 'List entities',
		},
		{
			name: 'Update Entity',
			value: 'updateEntity',
			description: 'Update entity information',
			action: 'Update entity',
		},
		{
			name: 'Delete Entity',
			value: 'deleteEntity',
			description: 'Delete an entity',
			action: 'Delete entity',
		},
	],
	default: 'createEntity',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['document'] } },
  options: [
    { name: 'Upload Document', value: 'uploadDocument', description: 'Upload a document for verification', action: 'Upload document' },
    { name: 'Get Document', value: 'getDocument', description: 'Retrieve document details and verification results', action: 'Get document' },
    { name: 'List Documents', value: 'listDocuments', description: 'List all documents for an entity', action: 'List documents' },
    { name: 'Update Document', value: 'updateDocument', description: 'Update document metadata', action: 'Update document' },
    { name: 'Delete Document', value: 'deleteDocument', description: 'Delete a document', action: 'Delete document' }
  ],
  default: 'uploadDocument',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['watchlist'],
		},
	},
	options: [
		{
			name: 'Search Watchlist',
			value: 'searchWatchlist',
			description: 'Search watchlists for potential matches',
			action: 'Search watchlist',
		},
		{
			name: 'Get Watchlist Match',
			value: 'getWatchlistMatch',
			description: 'Retrieve detailed information about a watchlist match',
			action: 'Get watchlist match',
		},
		{
			name: 'List Watchlist Searches',
			value: 'listWatchlistSearches',
			description: 'List all watchlist searches',
			action: 'List watchlist searches',
		},
		{
			name: 'Resolve Watchlist Match',
			value: 'resolveWatchlistMatch',
			description: 'Mark a watchlist match as resolved (true positive or false positive)',
			action: 'Resolve watchlist match',
		},
	],
	default: 'searchWatchlist',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['workflow'],
    },
  },
  options: [
    {
      name: 'List Workflows',
      value: 'listWorkflows',
      description: 'List all available workflows',
      action: 'List workflows',
    },
    {
      name: 'Get Workflow',
      value: 'getWorkflow',
      description: 'Retrieve workflow configuration and details',
      action: 'Get a workflow',
    },
    {
      name: 'Run Workflow',
      value: 'runWorkflow',
      description: 'Execute a workflow against an entity',
      action: 'Run a workflow',
    },
    {
      name: 'Get Workflow Versions',
      value: 'getWorkflowVersions',
      description: 'List all versions of a workflow',
      action: 'Get workflow versions',
    },
  ],
  default: 'listWorkflows',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['webhook'] } },
  options: [
    { name: 'Create Webhook', value: 'createWebhook', description: 'Create a new webhook subscription', action: 'Create webhook' },
    { name: 'List Webhooks', value: 'listWebhooks', description: 'List all webhook subscriptions', action: 'List webhooks' },
    { name: 'Get Webhook', value: 'getWebhook', description: 'Retrieve webhook details', action: 'Get webhook' },
    { name: 'Update Webhook', value: 'updateWebhook', description: 'Update webhook configuration', action: 'Update webhook' },
    { name: 'Delete Webhook', value: 'deleteWebhook', description: 'Delete a webhook subscription', action: 'Delete webhook' }
  ],
  default: 'createWebhook',
},
{
  displayName: 'Workflow Token',
  name: 'workflowToken',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'The workflow token for the evaluation',
},
{
  displayName: 'First Name',
  name: 'nameFirst',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'First name of the individual being evaluated',
},
{
  displayName: 'Last Name',
  name: 'nameLast',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'Last name of the individual being evaluated',
},
{
  displayName: 'Social Security Number',
  name: 'documentSsn',
  type: 'string',
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'Social Security Number of the individual',
},
{
  displayName: 'Address Line 1',
  name: 'addressLine1',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'Street address of the individual',
},
{
  displayName: 'City',
  name: 'addressCity',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'City of the address',
},
{
  displayName: 'State',
  name: 'addressState',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'State or province of the address',
},
{
  displayName: 'Postal Code',
  name: 'addressPostalCode',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: '',
  description: 'Postal code or ZIP code of the address',
},
{
  displayName: 'Country Code',
  name: 'addressCountryCode',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation'] } },
  default: 'US',
  description: 'ISO country code of the address',
},
{
  displayName: 'Evaluation Token',
  name: 'evaluationToken',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['evaluation'], operation: ['getEvaluation', 'updateEvaluation', 'rerunEvaluation'] } },
  default: '',
  description: 'Token of the evaluation to retrieve, update, or rerun',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['evaluation'], operation: ['listEvaluations'] } },
  default: 50,
  description: 'Maximum number of evaluations to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: { show: { resource: ['evaluation'], operation: ['listEvaluations'] } },
  default: 0,
  description: 'Number of evaluations to skip',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'string',
  displayOptions: { show: { resource: ['evaluation'], operation: ['listEvaluations'] } },
  default: '',
  description: 'Filter evaluations by status',
},
{
  displayName: 'Created After',
  name: 'createdAfter',
  type: 'dateTime',
  displayOptions: { show: { resource: ['evaluation'], operation: ['listEvaluations'] } },
  default: '',
  description: 'Filter evaluations created after this date',
},
{
  displayName: 'Created Before',
  name: 'createdBefore',
  type: 'dateTime',
  displayOptions: { show: { resource: ['evaluation'], operation: ['listEvaluations'] } },
  default: '',
  description: 'Filter evaluations created before this date',
},
{
  displayName: 'External Entity ID',
  name: 'externalEntityId',
  type: 'string',
  displayOptions: { show: { resource: ['evaluation'], operation: ['updateEvaluation'] } },
  default: '',
  description: 'External entity identifier for the evaluation',
},
{
  displayName: 'Tags',
  name: 'tags',
  type: 'string',
  displayOptions: { show: { resource: ['evaluation'], operation: ['updateEvaluation'] } },
  default: '',
  description: 'Comma-separated tags for the evaluation',
},
{
  displayName: 'Idempotency Key',
  name: 'idempotencyKey',
  type: 'string',
  displayOptions: { show: { resource: ['evaluation'], operation: ['createEvaluation', 'rerunEvaluation'] } },
  default: '',
  description: 'Optional idempotency key for POST requests',
},
{
	displayName: 'Entity Token',
	name: 'entity_token',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['getEntity', 'updateEntity', 'deleteEntity'],
		},
	},
	default: '',
	description: 'The unique token identifying the entity',
},
{
	displayName: 'First Name',
	name: 'name_first',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'First name of the entity',
},
{
	displayName: 'Last Name',
	name: 'name_last',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'Last name of the entity',
},
{
	displayName: 'Birth Date',
	name: 'birth_date',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'Birth date in YYYY-MM-DD format',
},
{
	displayName: 'SSN',
	name: 'document_ssn',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'Social Security Number',
},
{
	displayName: 'Address Line 1',
	name: 'address_line_1',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'Primary address line',
},
{
	displayName: 'City',
	name: 'address_city',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'City name',
},
{
	displayName: 'State',
	name: 'address_state',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'State or province code',
},
{
	displayName: 'Postal Code',
	name: 'address_postal_code',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: '',
	description: 'Postal or ZIP code',
},
{
	displayName: 'Country Code',
	name: 'address_country_code',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['createEntity'],
		},
	},
	default: 'US',
	description: 'Two-letter country code',
},
{
	displayName: 'First Name',
	name: 'name_first_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated first name of the entity',
},
{
	displayName: 'Last Name',
	name: 'name_last_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated last name of the entity',
},
{
	displayName: 'Birth Date',
	name: 'birth_date_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated birth date in YYYY-MM-DD format',
},
{
	displayName: 'Address Line 1',
	name: 'address_line_1_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated primary address line',
},
{
	displayName: 'City',
	name: 'address_city_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated city name',
},
{
	displayName: 'State',
	name: 'address_state_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated state or province code',
},
{
	displayName: 'Postal Code',
	name: 'address_postal_code_update',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['updateEntity'],
		},
	},
	default: '',
	description: 'Updated postal or ZIP code',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['listEntities'],
		},
	},
	default: 50,
	description: 'Maximum number of entities to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['listEntities'],
		},
	},
	default: 0,
	description: 'Number of entities to skip',
},
{
	displayName: 'Created After',
	name: 'created_after',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['listEntities'],
		},
	},
	default: '',
	description: 'Filter entities created after this date (ISO 8601 format)',
},
{
	displayName: 'Created Before',
	name: 'created_before',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['entity'],
			operation: ['listEntities'],
		},
	},
	default: '',
	description: 'Filter entities created before this date (ISO 8601 format)',
},
{
  displayName: 'Entity Token',
  name: 'entity_token',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['uploadDocument', 'listDocuments'] } },
  default: '',
  description: 'The entity token to associate the document with',
},
{
  displayName: 'Document Type',
  name: 'document_type',
  type: 'options',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['uploadDocument', 'updateDocument'] } },
  options: [
    { name: 'Driver License', value: 'driver_license' },
    { name: 'Passport', value: 'passport' },
    { name: 'ID Card', value: 'id_card' },
    { name: 'Utility Bill', value: 'utility_bill' },
    { name: 'Bank Statement', value: 'bank_statement' }
  ],
  default: 'driver_license',
  description: 'Type of document being uploaded or updated',
},
{
  displayName: 'Front Image',
  name: 'front_image',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['uploadDocument'] } },
  default: '',
  description: 'Base64 encoded front image of the document or file URL',
},
{
  displayName: 'Back Image',
  name: 'back_image',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['document'], operation: ['uploadDocument'] } },
  default: '',
  description: 'Base64 encoded back image of the document or file URL (optional)',
},
{
  displayName: 'Document Token',
  name: 'document_token',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['getDocument', 'updateDocument', 'deleteDocument'] } },
  default: '',
  description: 'The unique token of the document',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['document'], operation: ['listDocuments'] } },
  default: 25,
  description: 'Maximum number of documents to return',
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  required: false,
  displayOptions: { show: { resource: ['document'], operation: ['listDocuments'] } },
  default: 0,
  description: 'Number of documents to skip',
},
{
  displayName: 'Idempotency Key',
  name: 'idempotency_key',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['document'], operation: ['uploadDocument'] } },
  default: '',
  description: 'Unique key to ensure request idempotency',
},
{
	displayName: 'First Name',
	name: 'nameFirst',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['searchWatchlist'],
		},
	},
	default: '',
	description: 'First name to search for in watchlists',
},
{
	displayName: 'Last Name',
	name: 'nameLast',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['searchWatchlist'],
		},
	},
	default: '',
	description: 'Last name to search for in watchlists',
},
{
	displayName: 'Birth Date',
	name: 'birthDate',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['searchWatchlist'],
		},
	},
	default: '',
	description: 'Birth date in YYYY-MM-DD format',
},
{
	displayName: 'Address Country Code',
	name: 'addressCountryCode',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['searchWatchlist'],
		},
	},
	default: '',
	description: 'ISO 3166-1 alpha-2 country code for address',
},
{
	displayName: 'Watchlist Types',
	name: 'watchlistTypes',
	type: 'multiOptions',
	options: [
		{
			name: 'OFAC SDN',
			value: 'ofac_sdn',
		},
		{
			name: 'UN Sanctions',
			value: 'un_sanctions',
		},
		{
			name: 'EU Sanctions',
			value: 'eu_sanctions',
		},
		{
			name: 'PEP',
			value: 'pep',
		},
	],
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['searchWatchlist'],
		},
	},
	default: [],
	description: 'Types of watchlists to search',
},
{
	displayName: 'Match Token',
	name: 'matchToken',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['getWatchlistMatch'],
		},
	},
	default: '',
	description: 'Token identifying the watchlist match',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['listWatchlistSearches'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['listWatchlistSearches'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Entity Token',
	name: 'entityToken',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['listWatchlistSearches'],
		},
	},
	default: '',
	description: 'Filter searches by entity token',
},
{
	displayName: 'Created After',
	name: 'createdAfter',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['listWatchlistSearches'],
		},
	},
	default: '',
	description: 'Filter searches created after this date',
},
{
	displayName: 'Created Before',
	name: 'createdBefore',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['listWatchlistSearches'],
		},
	},
	default: '',
	description: 'Filter searches created before this date',
},
{
	displayName: 'Match Token',
	name: 'matchToken',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['resolveWatchlistMatch'],
		},
	},
	default: '',
	description: 'Token identifying the watchlist match to resolve',
},
{
	displayName: 'Resolution',
	name: 'resolution',
	type: 'options',
	required: true,
	options: [
		{
			name: 'True Positive',
			value: 'true_positive',
		},
		{
			name: 'False Positive',
			value: 'false_positive',
		},
	],
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['resolveWatchlistMatch'],
		},
	},
	default: 'false_positive',
	description: 'Resolution type for the match',
},
{
	displayName: 'Notes',
	name: 'notes',
	type: 'string',
	typeOptions: {
		rows: 3,
	},
	displayOptions: {
		show: {
			resource: ['watchlist'],
			operation: ['resolveWatchlistMatch'],
		},
	},
	default: '',
	description: 'Additional notes about the resolution',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  default: 100,
  description: 'Maximum number of workflows to return',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['listWorkflows'],
    },
  },
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  default: 0,
  description: 'Number of workflows to skip',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['listWorkflows'],
    },
  },
},
{
  displayName: 'Workflow Token',
  name: 'workflowToken',
  type: 'string',
  required: true,
  default: '',
  description: 'The workflow token to retrieve',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['getWorkflow'],
    },
  },
},
{
  displayName: 'Workflow Token',
  name: 'workflowToken',
  type: 'string',
  required: true,
  default: '',
  description: 'The workflow token to run',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['runWorkflow'],
    },
  },
},
{
  displayName: 'Entity Token',
  name: 'entityToken',
  type: 'string',
  required: true,
  default: '',
  description: 'The entity token to run the workflow against',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['runWorkflow'],
    },
  },
},
{
  displayName: 'Idempotency Key',
  name: 'idempotencyKey',
  type: 'string',
  default: '',
  description: 'Optional idempotency key for the request',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['runWorkflow'],
    },
  },
},
{
  displayName: 'Workflow Token',
  name: 'workflowToken',
  type: 'string',
  required: true,
  default: '',
  description: 'The workflow token to get versions for',
  displayOptions: {
    show: {
      resource: ['workflow'],
      operation: ['getWorkflowVersions'],
    },
  },
},
{
  displayName: 'URL',
  name: 'url',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['createWebhook', 'updateWebhook']
    }
  },
  default: '',
  description: 'The URL where webhook events will be sent'
},
{
  displayName: 'Events',
  name: 'events',
  type: 'multiOptions',
  required: true,
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['createWebhook', 'updateWebhook']
    }
  },
  options: [
    { name: 'evaluation.created', value: 'evaluation.created' },
    { name: 'evaluation.completed', value: 'evaluation.completed' },
    { name: 'evaluation.failed', value: 'evaluation.failed' },
    { name: 'workflow.started', value: 'workflow.started' },
    { name: 'workflow.completed', value: 'workflow.completed' },
    { name: 'workflow.failed', value: 'workflow.failed' },
    { name: 'person.created', value: 'person.created' },
    { name: 'person.updated', value: 'person.updated' }
  ],
  default: [],
  description: 'The events to subscribe to'
},
{
  displayName: 'Secret',
  name: 'secret',
  type: 'string',
  typeOptions: {
    password: true
  },
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['createWebhook', 'updateWebhook']
    }
  },
  default: '',
  description: 'Secret key for HMAC-SHA256 signature verification (optional but recommended)'
},
{
  displayName: 'Active',
  name: 'active',
  type: 'boolean',
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['updateWebhook']
    }
  },
  default: true,
  description: 'Whether the webhook is active'
},
{
  displayName: 'Webhook ID',
  name: 'webhookId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['getWebhook', 'updateWebhook', 'deleteWebhook']
    }
  },
  default: '',
  description: 'The ID of the webhook'
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['listWebhooks']
    }
  },
  default: 25,
  description: 'Maximum number of webhooks to return'
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['listWebhooks']
    }
  },
  default: 0,
  description: 'Number of webhooks to skip'
},
{
  displayName: 'Environment',
  name: 'environment',
  type: 'options',
  options: [
    { name: 'Sandbox', value: 'sandbox' },
    { name: 'Production', value: 'production' }
  ],
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['createWebhook', 'listWebhooks', 'getWebhook', 'updateWebhook', 'deleteWebhook']
    }
  },
  default: 'sandbox',
  description: 'The environment to use'
},
{
  displayName: 'Idempotency Key',
  name: 'idempotencyKey',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['webhook'],
      operation: ['createWebhook']
    }
  },
  default: '',
  description: 'Unique key to ensure request idempotency (optional)'
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'evaluation':
        return [await executeEvaluationOperations.call(this, items)];
      case 'entity':
        return [await executeEntityOperations.call(this, items)];
      case 'document':
        return [await executeDocumentOperations.call(this, items)];
      case 'watchlist':
        return [await executeWatchlistOperations.call(this, items)];
      case 'workflow':
        return [await executeWorkflowOperations.call(this, items)];
      case 'webhook':
        return [await executeWebhookOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeEvaluationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('alloycomplianceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'createEvaluation': {
          const workflowToken = this.getNodeParameter('workflowToken', i) as string;
          const nameFirst = this.getNodeParameter('nameFirst', i) as string;
          const nameLast = this.getNodeParameter('nameLast', i) as string;
          const documentSsn = this.getNodeParameter('documentSsn', i) as string;
          const addressLine1 = this.getNodeParameter('addressLine1', i) as string;
          const addressCity = this.getNodeParameter('addressCity', i) as string;
          const addressState = this.getNodeParameter('addressState', i) as string;
          const addressPostalCode = this.getNodeParameter('addressPostalCode', i) as string;
          const addressCountryCode = this.getNodeParameter('addressCountryCode', i) as string;
          const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;

          const body: any = {
            workflow_token: workflowToken,
            name_first: nameFirst,
            name_last: nameLast,
            address_line_1: addressLine1,
            address_city: addressCity,
            address_state: addressState,
            address_postal_code: addressPostalCode,
            address_country_code: addressCountryCode,
          };

          if (documentSsn) {
            body.document_ssn = documentSsn;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/evaluations`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          if (idempotencyKey) {
            options.headers['Idempotency-Key'] = idempotencyKey;
          }

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getEvaluation': {
          const evaluationToken = this.getNodeParameter('evaluationToken', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/evaluations/${evaluationToken}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listEvaluations': {
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          const status = this.getNodeParameter('status', i) as string;
          const createdAfter = this.getNodeParameter('createdAfter', i) as string;
          const createdBefore = this.getNodeParameter('createdBefore', i) as string;

          const queryParams: string[] = [];
          if (limit) queryParams.push(`limit=${limit}`);
          if (offset) queryParams.push(`offset=${offset}`);
          if (status) queryParams.push(`status=${status}`);
          if (createdAfter) queryParams.push(`created_after=${createdAfter}`);
          if (createdBefore) queryParams.push(`created_before=${createdBefore}`);

          const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/evaluations${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateEvaluation': {
          const evaluationToken = this.getNodeParameter('evaluationToken', i) as string;
          const externalEntityId = this.getNodeParameter('externalEntityId', i) as string;
          const tags = this.getNodeParameter('tags', i) as string;

          const body: any = {};
          if (externalEntityId) body.external_entity_id = externalEntityId;
          if (tags) body.tags = tags.split(',').map((tag: string) => tag.trim());

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/evaluations/${evaluationToken}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'rerunEvaluation': {
          const evaluationToken = this.getNodeParameter('evaluationToken', i) as string;
          const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/evaluations/${evaluationToken}/rerun`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          if (idempotencyKey) {
            options.headers['Idempotency-Key'] = idempotencyKey;
          }

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeEntityOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('alloycomplianceApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'createEntity': {
					const name_first = this.getNodeParameter('name_first', i) as string;
					const name_last = this.getNodeParameter('name_last', i) as string;
					const birth_date = this.getNodeParameter('birth_date', i) as string;
					const document_ssn = this.getNodeParameter('document_ssn', i) as string;
					const address_line_1 = this.getNodeParameter('address_line_1', i) as string;
					const address_city = this.getNodeParameter('address_city', i) as string;
					const address_state = this.getNodeParameter('address_state', i) as string;
					const address_postal_code = this.getNodeParameter('address_postal_code', i) as string;
					const address_country_code = this.getNodeParameter('address_country_code', i) as string;

					const body = {
						name_first,
						name_last,
						birth_date,
						document_ssn,
						address_line_1,
						address_city,
						address_state,
						address_postal_code,
						address_country_code,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl || 'https://api.alloy.com/v1'}/entities`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getEntity': {
					const entity_token = this.getNodeParameter('entity_token', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl || 'https://api.alloy.com/v1'}/entities/${entity_token}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'listEntities': {
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const created_after = this.getNodeParameter('created_after', i) as string;
					const created_before = this.getNodeParameter('created_before', i) as string;

					const queryParams = new URLSearchParams();
					if (limit) queryParams.append('limit', limit.toString());
					if (offset) queryParams.append('offset', offset.toString());
					if (created_after) queryParams.append('created_after', created_after);
					if (created_before) queryParams.append('created_before', created_before);

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl || 'https://api.alloy.com/v1'}/entities?${queryParams.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateEntity': {
					const entity_token = this.getNodeParameter('entity_token', i) as string;
					const name_first_update = this.getNodeParameter('name_first_update', i) as string;
					const name_last_update = this.getNodeParameter('name_last_update', i) as string;
					const birth_date_update = this.getNodeParameter('birth_date_update', i) as string;
					const address_line_1_update = this.getNodeParameter('address_line_1_update', i) as string;
					const address_city_update = this.getNodeParameter('address_city_update', i) as string;
					const address_state_update = this.getNodeParameter('address_state_update', i) as string;
					const address_postal_code_update = this.getNodeParameter('address_postal_code_update', i) as string;

					const body: any = {};
					if (name_first_update) body.name_first = name_first_update;
					if (name_last_update) body.name_last = name_last_update;
					if (birth_date_update) body.birth_date = birth_date_update;
					if (address_line_1_update) body.address_line_1 = address_line_1_update;
					if (address_city_update) body.address_city = address_city_update;
					if (address_state_update) body.address_state = address_state_update;
					if (address_postal_code_update) body.address_postal_code = address_postal_code_update;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl || 'https://api.alloy.com/v1'}/entities/${entity_token}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteEntity': {
					const entity_token = this.getNodeParameter('entity_token', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl || 'https://api.alloy.com/v1'}/entities/${entity_token}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeDocumentOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('alloycomplianceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'uploadDocument': {
          const entity_token = this.getNodeParameter('entity_token', i) as string;
          const document_type = this.getNodeParameter('document_type', i) as string;
          const front_image = this.getNodeParameter('front_image', i) as string;
          const back_image = this.getNodeParameter('back_image', i) as string;
          const idempotency_key = this.getNodeParameter('idempotency_key', i) as string;

          const body: any = {
            entity_token,
            document_type,
            front_image,
          };

          if (back_image) {
            body.back_image = back_image;
          }

          const headers: any = {
            'Authorization': `Bearer ${credentials.apiKey}`,
            'Content-Type': 'application/json',
          };

          if (idempotency_key) {
            headers['Idempotency-Key'] = idempotency_key;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/documents`,
            headers,
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getDocument': {
          const document_token = this.getNodeParameter('document_token', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/documents/${document_token}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'listDocuments': {
          const entity_token = this.getNodeParameter('entity_token', i) as string;
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          const qs: any = {
            entity_token,
          };

          if (limit) {
            qs.limit = limit;
          }

          if (offset) {
            qs.offset = offset;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/documents`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'updateDocument': {
          const document_token = this.getNodeParameter('document_token', i) as string;
          const document_type = this.getNodeParameter('document_type', i) as string;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/documents/${document_token}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              document_type,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'deleteDocument': {
          const document_token = this.getNodeParameter('document_token', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/documents/${document_token}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeWatchlistOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('alloycomplianceApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			const baseOptions: any = {
				headers: {
					'Authorization': `Bearer ${credentials.apiKey}`,
					'Content-Type': 'application/json',
				},
				json: true,
			};

			switch (operation) {
				case 'searchWatchlist': {
					const nameFirst = this.getNodeParameter('nameFirst', i) as string;
					const nameLast = this.getNodeParameter('nameLast', i) as string;
					const birthDate = this.getNodeParameter('birthDate', i) as string;
					const addressCountryCode = this.getNodeParameter('addressCountryCode', i) as string;
					const watchlistTypes = this.getNodeParameter('watchlistTypes', i) as string[];

					const body: any = {
						name_first: nameFirst,
						name_last: nameLast,
					};

					if (birthDate) {
						body.birth_date = birthDate.split('T')[0];
					}
					if (addressCountryCode) {
						body.address_country_code = addressCountryCode;
					}
					if (watchlistTypes && watchlistTypes.length > 0) {
						body.watchlist_types = watchlistTypes;
					}

					const options: any = {
						...baseOptions,
						method: 'POST',
						url: `${credentials.baseUrl}/watchlist/search`,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getWatchlistMatch': {
					const matchToken = this.getNodeParameter('matchToken', i) as string;

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/watchlist/matches/${matchToken}`,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'listWatchlistSearches': {
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const entityToken = this.getNodeParameter('entityToken', i) as string;
					const createdAfter = this.getNodeParameter('createdAfter', i) as string;
					const createdBefore = this.getNodeParameter('createdBefore', i) as string;

					const qs: any = {
						limit,
						offset,
					};

					if (entityToken) {
						qs.entity_token = entityToken;
					}
					if (createdAfter) {
						qs.created_after = createdAfter;
					}
					if (createdBefore) {
						qs.created_before = createdBefore;
					}

					const options: any = {
						...baseOptions,
						method: 'GET',
						url: `${credentials.baseUrl}/watchlist/searches`,
						qs,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'resolveWatchlistMatch': {
					const matchToken = this.getNodeParameter('matchToken', i) as string;
					const resolution = this.getNodeParameter('resolution', i) as string;
					const notes = this.getNodeParameter('notes', i) as string;

					const body: any = {
						resolution,
					};

					if (notes) {
						body.notes = notes;
					}

					const options: any = {
						...baseOptions,
						method: 'PUT',
						url: `${credentials.baseUrl}/watchlist/matches/${matchToken}/resolve`,
						body,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeWorkflowOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('alloycomplianceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listWorkflows': {
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/workflows`,
            headers: {
              'Authorization': `Basic ${Buffer.from(credentials.apiKey + ':').toString('base64')}`,
              'Content-Type': 'application/json',
            },
            qs: {
              limit,
              offset,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getWorkflow': {
          const workflowToken = this.getNodeParameter('workflowToken', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/workflows/${workflowToken}`,
            headers: {
              'Authorization': `Basic ${Buffer.from(credentials.apiKey + ':').toString('base64')}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'runWorkflow': {
          const workflowToken = this.getNodeParameter('workflowToken', i) as string;
          const entityToken = this.getNodeParameter('entityToken', i) as string;
          const idempotencyKey = this.getNodeParameter('idempotencyKey', i) as string;

          const headers: any = {
            'Authorization': `Basic ${Buffer.from(credentials.apiKey + ':').toString('base64')}`,
            'Content-Type': 'application/json',
          };

          if (idempotencyKey) {
            headers['Idempotency-Key'] = idempotencyKey;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/workflows/${workflowToken}/run`,
            headers,
            body: {
              entity_token: entityToken,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getWorkflowVersions': {
          const workflowToken = this.getNodeParameter('workflowToken', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/workflows/${workflowToken}/versions`,
            headers: {
              'Authorization': `Basic ${Buffer.from(credentials.apiKey + ':').toString('base64')}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeWebhookOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('alloycomplianceApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const environment = this.getNodeParameter('environment', i, 'sandbox') as string;
      const baseUrl = environment === 'production' ? 'https://api.alloy.com/v1' : 'https://api.sandbox.alloy.com/v1';

      const baseHeaders: any = {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json'
      };

      switch (operation) {
        case 'createWebhook': {
          const url = this.getNodeParameter('url', i) as string;
          const events = this.getNodeParameter('events', i) as string[];
          const secret = this.getNodeParameter('secret', i, '') as string;
          const idempotencyKey = this.getNodeParameter('idempotencyKey', i, '') as string;

          const headers = { ...baseHeaders };
          if (idempotencyKey) {
            headers['Idempotency-Key'] = idempotencyKey;
          }

          const body: any = {
            url,
            events
          };

          if (secret) {
            body.secret = secret;
          }

          const options: any = {
            method: 'POST',
            url: `${baseUrl}/webhooks`,
            headers,
            body,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listWebhooks': {
          const limit = this.getNodeParameter('limit', i, 25) as number;
          const offset = this.getNodeParameter('offset', i, 0) as number;

          const options: any = {
            method: 'GET',
            url: `${baseUrl}/webhooks`,
            headers: baseHeaders,
            qs: {
              limit,
              offset
            },
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getWebhook': {
          const webhookId = this.getNodeParameter('webhookId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${baseUrl}/webhooks/${webhookId}`,
            headers: baseHeaders,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateWebhook': {
          const webhookId = this.getNodeParameter('webhookId', i) as string;
          const url = this.getNodeParameter('url', i) as string;
          const events = this.getNodeParameter('events', i) as string[];
          const secret = this.getNodeParameter('secret', i, '') as string;
          const active = this.getNodeParameter('active', i, true) as boolean;

          const body: any = {
            url,
            events,
            active
          };

          if (secret) {
            body.secret = secret;
          }

          const options: any = {
            method: 'PUT',
            url: `${baseUrl}/webhooks/${webhookId}`,
            headers: baseHeaders,
            body,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteWebhook': {
          const webhookId = this.getNodeParameter('webhookId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${baseUrl}/webhooks/${webhookId}`,
            headers: baseHeaders,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i }
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
