/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { AlloyCompliance } from '../nodes/Alloy Compliance/Alloy Compliance.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('AlloyCompliance Node', () => {
  let node: AlloyCompliance;

  beforeAll(() => {
    node = new AlloyCompliance();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Alloy Compliance');
      expect(node.description.name).toBe('alloycompliance');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Evaluation Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.alloy.com/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  test('should create evaluation successfully', async () => {
    const mockResponse = {
      token: 'eval_123',
      status: 'pending',
      workflow_token: 'wf_123'
    };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createEvaluation')
      .mockReturnValueOnce('wf_123')
      .mockReturnValueOnce('John')
      .mockReturnValueOnce('Doe')
      .mockReturnValueOnce('123456789')
      .mockReturnValueOnce('123 Main St')
      .mockReturnValueOnce('New York')
      .mockReturnValueOnce('NY')
      .mockReturnValueOnce('10001')
      .mockReturnValueOnce('US')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  test('should get evaluation successfully', async () => {
    const mockResponse = {
      token: 'eval_123',
      status: 'approved',
      summary: { result: 'Approved' }
    };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getEvaluation')
      .mockReturnValueOnce('eval_123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  test('should list evaluations successfully', async () => {
    const mockResponse = {
      data: [
        { token: 'eval_123', status: 'approved' },
        { token: 'eval_456', status: 'pending' }
      ],
      pagination: { total: 2, limit: 50, offset: 0 }
    };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listEvaluations')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  test('should update evaluation successfully', async () => {
    const mockResponse = {
      token: 'eval_123',
      external_entity_id: 'ext_123',
      tags: ['tag1', 'tag2']
    };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateEvaluation')
      .mockReturnValueOnce('eval_123')
      .mockReturnValueOnce('ext_123')
      .mockReturnValueOnce('tag1, tag2');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  test('should rerun evaluation successfully', async () => {
    const mockResponse = {
      token: 'eval_123',
      status: 'pending',
      rerun: true
    };
    
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('rerunEvaluation')
      .mockReturnValueOnce('eval_123')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: mockResponse,
      pairedItem: { item: 0 }
    }]);
  });

  test('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getEvaluation')
      .mockReturnValueOnce('invalid_token');

    const error = new Error('Evaluation not found');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{
      json: { error: 'Evaluation not found' },
      pairedItem: { item: 0 }
    }]);
  });

  test('should throw error for unknown operation', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

    await expect(
      executeEvaluationOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Unknown operation: unknownOperation');
  });
});

describe('Entity Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.alloy.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Entity Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('createEntity', () => {
		it('should create entity successfully', async () => {
			const mockResponse = {
				entity_token: 'ent_123456',
				name_first: 'John',
				name_last: 'Doe',
				birth_date: '1990-01-01',
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createEntity')
				.mockReturnValueOnce('John')
				.mockReturnValueOnce('Doe')
				.mockReturnValueOnce('1990-01-01')
				.mockReturnValueOnce('123456789')
				.mockReturnValueOnce('123 Main St')
				.mockReturnValueOnce('New York')
				.mockReturnValueOnce('NY')
				.mockReturnValueOnce('10001')
				.mockReturnValueOnce('US');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});

		it('should handle create entity error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('createEntity');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: { error: 'API Error' },
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getEntity', () => {
		it('should get entity successfully', async () => {
			const mockResponse = {
				entity_token: 'ent_123456',
				name_first: 'John',
				name_last: 'Doe',
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getEntity')
				.mockReturnValueOnce('ent_123456');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('listEntities', () => {
		it('should list entities successfully', async () => {
			const mockResponse = {
				entities: [
					{ entity_token: 'ent_123456', name_first: 'John', name_last: 'Doe' },
					{ entity_token: 'ent_789012', name_first: 'Jane', name_last: 'Smith' },
				],
				total_count: 2,
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listEntities')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('updateEntity', () => {
		it('should update entity successfully', async () => {
			const mockResponse = {
				entity_token: 'ent_123456',
				name_first: 'John',
				name_last: 'Updated',
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateEntity')
				.mockReturnValueOnce('ent_123456')
				.mockReturnValueOnce('John')
				.mockReturnValueOnce('Updated')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('deleteEntity', () => {
		it('should delete entity successfully', async () => {
			const mockResponse = { success: true };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteEntity')
				.mockReturnValueOnce('ent_123456');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeEntityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});
});

describe('Document Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-api-key', 
        baseUrl: 'https://api.alloy.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  test('uploadDocument should upload document successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('uploadDocument')
      .mockReturnValueOnce('entity_123')
      .mockReturnValueOnce('driver_license')
      .mockReturnValueOnce('base64_front_image')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    const mockResponse = { document_token: 'doc_123', status: 'uploaded' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.alloy.com/v1/documents',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        entity_token: 'entity_123',
        document_type: 'driver_license',
        front_image: 'base64_front_image',
      },
      json: true,
    });
  });

  test('getDocument should retrieve document successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getDocument')
      .mockReturnValueOnce('doc_123');

    const mockResponse = { document_token: 'doc_123', verification_status: 'verified' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.alloy.com/v1/documents/doc_123',
      headers: {
        'Authorization': 'Bearer test-api-key',
      },
      json: true,
    });
  });

  test('listDocuments should list documents successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listDocuments')
      .mockReturnValueOnce('entity_123')
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(0);

    const mockResponse = { documents: [{ document_token: 'doc_123' }] };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.alloy.com/v1/documents',
      headers: {
        'Authorization': 'Bearer test-api-key',
      },
      qs: {
        entity_token: 'entity_123',
        limit: 10,
        offset: 0,
      },
      json: true,
    });
  });

  test('should handle API errors', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getDocument');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Watchlist Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://api.alloy.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('searchWatchlist', () => {
		it('should search watchlist successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('searchWatchlist')
				.mockReturnValueOnce('John')
				.mockReturnValueOnce('Doe')
				.mockReturnValueOnce('1990-01-01')
				.mockReturnValueOnce('US')
				.mockReturnValueOnce(['ofac_sdn']);

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				matches: [{ match_token: 'match_123', score: 0.95 }],
			});

			const result = await executeWatchlistOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([
				{
					json: { matches: [{ match_token: 'match_123', score: 0.95 }] },
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle search errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('searchWatchlist');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeWatchlistOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('getWatchlistMatch', () => {
		it('should get watchlist match successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getWatchlistMatch')
				.mockReturnValueOnce('match_123');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				match_token: 'match_123',
				entity: { name: 'John Doe' },
				score: 0.95,
			});

			const result = await executeWatchlistOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([
				{
					json: {
						match_token: 'match_123',
						entity: { name: 'John Doe' },
						score: 0.95,
					},
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('listWatchlistSearches', () => {
		it('should list watchlist searches successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listWatchlistSearches')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce('entity_123')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				searches: [{ search_token: 'search_123' }],
				total_count: 1,
			});

			const result = await executeWatchlistOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([
				{
					json: {
						searches: [{ search_token: 'search_123' }],
						total_count: 1,
					},
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('resolveWatchlistMatch', () => {
		it('should resolve watchlist match successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('resolveWatchlistMatch')
				.mockReturnValueOnce('match_123')
				.mockReturnValueOnce('false_positive')
				.mockReturnValueOnce('Not a real match');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				match_token: 'match_123',
				resolution: 'false_positive',
				resolved_at: '2023-01-01T00:00:00Z',
			});

			const result = await executeWatchlistOperations.call(
				mockExecuteFunctions,
				[{ json: {} }],
			);

			expect(result).toEqual([
				{
					json: {
						match_token: 'match_123',
						resolution: 'false_positive',
						resolved_at: '2023-01-01T00:00:00Z',
					},
					pairedItem: { item: 0 },
				},
			]);
		});
	});
});

describe('Workflow Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://api.alloy.com/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('listWorkflows operation', () => {
    it('should list workflows successfully', async () => {
      const mockResponse = { workflows: [], total: 0 };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listWorkflows')
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(0);

      const result = await executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.alloy.com/v1/workflows',
          qs: { limit: 100, offset: 0 },
        })
      );
    });

    it('should handle listWorkflows errors', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listWorkflows')
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(0);

      await expect(
        executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('API Error');
    });
  });

  describe('getWorkflow operation', () => {
    it('should get workflow successfully', async () => {
      const mockResponse = { workflow_token: 'wf_123', name: 'Test Workflow' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getWorkflow')
        .mockReturnValueOnce('wf_123');

      const result = await executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.alloy.com/v1/workflows/wf_123',
        })
      );
    });

    it('should handle getWorkflow errors', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Workflow not found'));
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getWorkflow')
        .mockReturnValueOnce('wf_123');

      await expect(
        executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('Workflow not found');
    });
  });

  describe('runWorkflow operation', () => {
    it('should run workflow successfully', async () => {
      const mockResponse = { evaluation_token: 'eval_123', status: 'running' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('runWorkflow')
        .mockReturnValueOnce('wf_123')
        .mockReturnValueOnce('ent_456')
        .mockReturnValueOnce('idmp_789');

      const result = await executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'https://api.alloy.com/v1/workflows/wf_123/run',
          body: { entity_token: 'ent_456' },
          headers: expect.objectContaining({
            'Idempotency-Key': 'idmp_789',
          }),
        })
      );
    });

    it('should handle runWorkflow errors', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Execution failed'));
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('runWorkflow')
        .mockReturnValueOnce('wf_123')
        .mockReturnValueOnce('ent_456')
        .mockReturnValueOnce('');

      await expect(
        executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('Execution failed');
    });
  });

  describe('getWorkflowVersions operation', () => {
    it('should get workflow versions successfully', async () => {
      const mockResponse = { versions: [{ version: 1, status: 'active' }] };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getWorkflowVersions')
        .mockReturnValueOnce('wf_123');

      const result = await executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.alloy.com/v1/workflows/wf_123/versions',
        })
      );
    });

    it('should handle getWorkflowVersions errors', async () => {
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Versions not found'));
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getWorkflowVersions')
        .mockReturnValueOnce('wf_123');

      await expect(
        executeWorkflowOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('Versions not found');
    });
  });
});

describe('Webhook Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-api-key',
        baseUrl: 'https://api.sandbox.alloy.com/v1'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Alloy Compliance Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn()
      }
    };
  });

  describe('createWebhook', () => {
    it('should create webhook successfully', async () => {
      const mockResponse = {
        webhook_id: 'wh_123456',
        url: 'https://example.com/webhook',
        events: ['evaluation.created', 'evaluation.completed'],
        active: true,
        created_at: '2024-01-01T00:00:00Z'
      };

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createWebhook')
        .mockReturnValueOnce('sandbox')
        .mockReturnValueOnce('https://example.com/webhook')
        .mockReturnValueOnce(['evaluation.created', 'evaluation.completed'])
        .mockReturnValueOnce('secret123')
        .mockReturnValueOnce('idempotency123');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.sandbox.alloy.com/v1/webhooks',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
          'Idempotency-Key': 'idempotency123'
        },
        body: {
          url: 'https://example.com/webhook',
          events: ['evaluation.created', 'evaluation.completed'],
          secret: 'secret123'
        },
        json: true
      });

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });

    it('should handle create webhook error', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createWebhook')
        .mockReturnValueOnce('sandbox')
        .mockReturnValueOnce('https://example.com/webhook')
        .mockReturnValueOnce(['evaluation.created'])
        .mockReturnValueOnce('')
        .mockReturnValueOnce('');

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('listWebhooks', () => {
    it('should list webhooks successfully', async () => {
      const mockResponse = {
        webhooks: [
          { webhook_id: 'wh_123456', url: 'https://example.com/webhook1', active: true },
          { webhook_id: 'wh_789012', url: 'https://example.com/webhook2', active: false }
        ],
        total: 2
      };

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('listWebhooks')
        .mockReturnValueOnce('production')
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(10);

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.alloy.com/v1/webhooks',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json'
        },
        qs: {
          limit: 50,
          offset: 10
        },
        json: true
      });

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getWebhook', () => {
    it('should get webhook successfully', async () => {
      const mockResponse = {
        webhook_id: 'wh_123456',
        url: 'https://example.com/webhook',
        events: ['evaluation.created'],
        active: true
      };

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getWebhook')
        .mockReturnValueOnce('sandbox')
        .mockReturnValueOnce('wh_123456');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.sandbox.alloy.com/v1/webhooks/wh_123456',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json'
        },
        json: true
      });

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('updateWebhook', () => {
    it('should update webhook successfully', async () => {
      const mockResponse = {
        webhook_id: 'wh_123456',
        url: 'https://updated.example.com/webhook',
        events: ['evaluation.created', 'workflow.completed'],
        active: false
      };

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateWebhook')
        .mockReturnValueOnce('sandbox')
        .mockReturnValueOnce('wh_123456')
        .mockReturnValueOnce('https://updated.example.com/webhook')
        .mockReturnValueOnce(['evaluation.created', 'workflow.completed'])
        .mockReturnValueOnce('newsecret')
        .mockReturnValueOnce(false);

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PUT',
        url: 'https://api.sandbox.alloy.com/v1/webhooks/wh_123456',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json'
        },
        body: {
          url: 'https://updated.example.com/webhook',
          events: ['evaluation.created', 'workflow.completed'],
          active: false,
          secret: 'newsecret'
        },
        json: true
      });

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('deleteWebhook', () => {
    it('should delete webhook successfully', async () => {
      const mockResponse = { success: true };

      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteWebhook')
        .mockReturnValueOnce('sandbox')
        .mockReturnValueOnce('wh_123456');

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeWebhookOperations.call(
        mockExecuteFunctions,
        [{ json: {} }]
      );

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'https://api.sandbox.alloy.com/v1/webhooks/wh_123456',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json'
        },
        json: true
      });

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});
});
