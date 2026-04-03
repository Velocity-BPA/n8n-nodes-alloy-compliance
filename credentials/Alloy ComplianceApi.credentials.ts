import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AlloyComplianceApi implements ICredentialType {
	name = 'alloyComplianceApi';
	displayName = 'Alloy Compliance API';
	documentationUrl = 'https://docs.alloy.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'The API key for authenticating with Alloy Compliance API. Obtain this from your Alloy dashboard.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			default: 'https://api.alloy.com/v1',
			description: 'The base URL for the Alloy API (sandbox or production)',
		},
	];
}