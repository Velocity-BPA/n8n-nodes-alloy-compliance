# n8n-nodes-alloy-compliance

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Alloy Compliance that provides access to 6 core resources for compliance automation and monitoring. Enables seamless integration with Alloy's compliance platform for entity screening, document management, evaluation workflows, and real-time webhook monitoring.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Compliance](https://img.shields.io/badge/compliance-automation-green)
![KYC](https://img.shields.io/badge/KYC-screening-orange)
![Monitoring](https://img.shields.io/badge/monitoring-webhooks-purple)

## Features

- **Entity Management** - Create, update, and manage compliance entities with comprehensive screening capabilities
- **Document Processing** - Upload, retrieve, and manage compliance documents with metadata tracking
- **Evaluation Workflows** - Execute and monitor compliance evaluations with detailed results and status tracking
- **Watchlist Integration** - Access and manage watchlist entries for ongoing compliance monitoring
- **Workflow Automation** - Configure and manage compliance workflows with customizable triggers and actions
- **Real-time Webhooks** - Set up webhook endpoints for instant compliance event notifications and updates
- **Comprehensive Screening** - Perform KYC, AML, and sanctions screening across multiple data sources
- **Audit Trail Support** - Maintain detailed logs and history for compliance reporting and auditing

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-alloy-compliance`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-alloy-compliance
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-alloy-compliance.git
cd n8n-nodes-alloy-compliance
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-alloy-compliance
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Alloy Compliance API key | Yes |
| Environment | API environment (sandbox/production) | Yes |
| Base URL | Custom API base URL (if applicable) | No |

## Resources & Operations

### 1. Evaluation

| Operation | Description |
|-----------|-------------|
| Create | Create a new compliance evaluation |
| Get | Retrieve an existing evaluation by ID |
| List | List all evaluations with filtering options |
| Update | Update evaluation status or metadata |
| Delete | Remove an evaluation from the system |

### 2. Entity

| Operation | Description |
|-----------|-------------|
| Create | Create a new entity for compliance screening |
| Get | Retrieve entity details and screening results |
| List | List all entities with search and filter capabilities |
| Update | Update entity information and re-screen |
| Delete | Remove an entity from the compliance system |
| Screen | Perform on-demand screening of an entity |

### 3. Document

| Operation | Description |
|-----------|-------------|
| Upload | Upload compliance documents with metadata |
| Get | Retrieve document details and download links |
| List | List all documents with filtering and search |
| Update | Update document metadata and tags |
| Delete | Remove documents from the system |
| Download | Download document content |

### 4. Watchlist

| Operation | Description |
|-----------|-------------|
| Create | Add new entries to watchlists |
| Get | Retrieve specific watchlist entry details |
| List | List watchlist entries with search capabilities |
| Update | Modify watchlist entry information |
| Delete | Remove entries from watchlists |
| Search | Search across all watchlist entries |

### 5. Workflow

| Operation | Description |
|-----------|-------------|
| Create | Create new compliance workflows |
| Get | Retrieve workflow configuration and status |
| List | List all workflows with filtering options |
| Update | Modify workflow settings and triggers |
| Delete | Remove workflows from the system |
| Execute | Manually trigger workflow execution |

### 6. Webhook

| Operation | Description |
|-----------|-------------|
| Create | Set up new webhook endpoints |
| Get | Retrieve webhook configuration details |
| List | List all configured webhooks |
| Update | Modify webhook settings and URLs |
| Delete | Remove webhook configurations |
| Test | Send test events to webhook endpoints |

## Usage Examples

```javascript
// Create a new entity for compliance screening
{
  "name_first": "John",
  "name_last": "Doe",
  "birth_date": "1985-06-15",
  "document_ssn": "123-45-6789",
  "address_line_1": "123 Main St",
  "address_city": "New York",
  "address_state": "NY",
  "address_postal_code": "10001",
  "address_country_code": "US"
}
```

```javascript
// Upload a compliance document
{
  "entity_token": "ent_abc123def456",
  "document_type": "government_id",
  "file_name": "drivers_license.pdf",
  "file_content": "base64_encoded_content",
  "metadata": {
    "issuing_authority": "NY DMV",
    "expiration_date": "2025-12-31"
  }
}
```

```javascript
// Create a compliance evaluation
{
  "entity_token": "ent_abc123def456",
  "evaluation_type": "kyc_screening",
  "workflow_token": "wfl_xyz789abc123",
  "custom_parameters": {
    "risk_threshold": "medium",
    "include_sanctions": true,
    "include_pep": true
  }
}
```

```javascript
// Set up a webhook for real-time notifications
{
  "url": "https://your-app.com/webhook/alloy-compliance",
  "events": ["evaluation.completed", "entity.flagged", "document.processed"],
  "secret": "your_webhook_secret",
  "active": true,
  "description": "Compliance notifications webhook"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired credentials | Verify API key is correct and active |
| 403 Forbidden | Insufficient permissions for operation | Check API key permissions and account limits |
| 404 Not Found | Requested resource does not exist | Verify entity/document/evaluation tokens are correct |
| 429 Rate Limited | Too many requests sent | Implement exponential backoff and retry logic |
| 422 Validation Error | Request data validation failed | Check required fields and data formats |
| 500 Internal Error | Alloy service temporarily unavailable | Retry request after brief delay |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-alloy-compliance/issues)
- **API Documentation**: [Alloy Compliance API Docs](https://docs.alloy.com)
- **Community Support**: [Alloy Community Forum](https://community.alloy.com)