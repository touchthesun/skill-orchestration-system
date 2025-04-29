# Getting Started

This guide will help you set up the development environment for the DoIT Skills Orchestration System and understand its architecture.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Version 20.10.0 or higher
- **Node.js**: Version 18.x or higher
- **Python**: Version 3.9 or higher
- **Git**: Latest version recommended
- **AWS CLI**: Configured with appropriate access for development environments

## Development Environment Setup

### Clone the Repository

```bash
git clone https://github.com/doit/skills-orchestration.git
cd skills-orchestration
```

### Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file to configure your local development settings:

```
# Core Settings
NODE_ENV=development
LOG_LEVEL=debug
PORT=3000

# Database Connections
MONGODB_URI=mongodb://localhost:27017/skills_orchestration
REDIS_URL=redis://localhost:6379
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

# Integration Credentials
ZENDESK_API_TOKEN=your_token_here
ZENDESK_SUBDOMAIN=doit
JIRA_API_TOKEN=your_token_here
JIRA_DOMAIN=doit.atlassian.net

# LLM Configuration
LLM_PROVIDER=openai
LLM_API_KEY=your_key_here
LLM_MODEL=gpt-4
```

### Start Development Services

Using Docker Compose:

```bash
docker-compose up -d
```

This will start the following services:

- MongoDB (document storage)
- Neo4j (graph database for skills)
- Redis (caching and message broker)
- MinIO (object storage)
- Localstack (AWS service emulation)

### Install Dependencies

```bash
npm install
```

### Initialize the Database

```bash
npm run db:init
```

This script will:
- Create necessary database schemas
- Populate initial skill taxonomy
- Set up admin user

### Start the Development Server

```bash
npm run dev
```

The server will start on http://localhost:3000 with hot reloading enabled.

## Project Structure

The project follows a microservices architecture with the following components:

```
├── api-gateway/          # API Gateway and routing
├── services/
│   ├── employee-service/ # Employee profile management
│   ├── skills-service/   # Skills taxonomy and relationships
│   ├── demand-service/   # Demand signal processing
│   ├── llm-service/      # LLM interface and context management
│   └── notification-service/ # Notification delivery
├── integrations/
│   ├── zendesk/          # ZenDesk connector
│   ├── project-mgmt/     # Project management connectors
│   ├── hr-systems/       # HR system connectors
│   └── chat-platforms/   # Chat platform integrations
├── shared/
│   ├── models/           # Shared data models
│   ├── utils/            # Common utilities
│   └── middleware/       # Shared middleware
├── infrastructure/       # Terraform and deployment configs
└── docs/                 # Documentation (MkDocs)
```

## Local Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run specific service tests
npm test -- --scope=skills-service

# Run with coverage
npm test -- --coverage
```

### Linting and Formatting

```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format
```

### Database Migrations

```bash
# Create a new migration
npm run migration:create -- "add_skill_demand_index"

# Run pending migrations
npm run migration:up

# Rollback last migration
npm run migration:down
```

### Working with the Skills Knowledge Graph

The Neo4j browser is available at http://localhost:7474 for visualizing and querying the skills graph.

Sample Cypher query to explore skill relationships:

```cypher
MATCH (s:Skill)-[r:REQUIRES]->(prereq:Skill)
WHERE s.name = 'Kubernetes Security'
RETURN s, r, prereq
```

### Testing Integrations

We provide mock servers for each integration:

```bash
# Start mock ZenDesk server
npm run mock:zendesk

# Start mock JIRA server
npm run mock:jira
```

## LLM Development

### Testing the LLM Interface

The LLM development console is available at http://localhost:3000/llm-console

This provides:
- Interactive query testing
- Tool execution visualization
- Context inspection
- Response evaluation

### Working with the Model-Context Protocol

When developing new tools for the LLM:

1. Define the tool schema in `services/llm-service/src/tools`
2. Implement the tool executor
3. Register the tool in the tool registry
4. Test using the LLM console

Example tool definition:

```typescript
import { defineTool } from '@doit/mcp-core';

export const skillSearchTool = defineTool({
  name: 'skill-search',
  description: 'Search for skills based on name, domain, or related technologies',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query'
      },
      domain: {
        type: 'string',
        description: 'Optional domain to restrict search'
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results',
        default: 5
      }
    },
    required: ['query']
  },
  execute: async ({ query, domain, limit }, context) => {
    // Implementation
    return { results: [] };
  }
});
```

## Deployment Pipeline

### Local to Dev

```bash
# Build all services
npm run build

# Deploy to development environment
npm run deploy:dev
```

### CI/CD Workflow

1. Push to feature branch triggers tests and lint checks
2. PR to main triggers integration tests
3. Merge to main deploys to development environment
4. Version tag deploys to staging
5. Promotion approval deploys to production

## Common Development Tasks

### Adding a New Skill Domain

1. Create the domain in Neo4j:

```typescript
import { SkillDomainRepository } from '@doit/skills-service';

const domainRepo = new SkillDomainRepository();
await domainRepo.create({
  name: 'Serverless Computing',
  description: 'Function-as-a-Service and event-driven architectures',
  parentDomain: 'Cloud Computing'
});
```

2. Add initial skills to the domain
3. Create relationships between skills
4. Update the frontend taxonomy browser

### Implementing a New Integration

1. Create a new integration module:

```bash
npm run generate:integration -- --name=azure-devops
```

2. Implement the required interfaces:

```typescript
import { Integration, DataSourceConfig } from '@doit/integration-core';

export class AzureDevOpsIntegration implements Integration {
  constructor(private config: DataSourceConfig) {}
  
  async initialize(): Promise<void> {
    // Set up connection to Azure DevOps
    console.log('Initializing Azure DevOps integration');
  }
  
  async fetchProjects(): Promise<Project[]> {
    // Implementation to fetch projects from Azure DevOps
    return [];
  }
  
  async extractSkillsFromProjects(projects: Project[]): Promise<SkillDemand[]> {
    // Extract skills from project descriptions and requirements
    return [];
  }
  
  async syncData(): Promise<SyncResult> {
    const projects = await this.fetchProjects();
    const skillDemands = await this.extractSkillsFromProjects(projects);
    
    // Store the extracted data
    return {
      success: true,
      itemsProcessed: projects.length,
      skillsDetected: skillDemands.length
    };
  }
}
```

3. Register the integration in the system
4. Create appropriate tests
5. Document the integration configuration

### Adding a New Recommendation Algorithm

1. Create a recommendation strategy:

```typescript
import { RecommendationStrategy } from '@doit/recommendation-engine';

export class CertificationPathRecommendation implements RecommendationStrategy {
  async generateRecommendations(employeeId: string, options: any): Promise<Recommendation[]> {
    // Implementation logic
    return [];
  }
  
  async rankRecommendations(recommendations: Recommendation[]): Promise<Recommendation[]> {
    // Ranking logic
    return recommendations.sort((a, b) => b.score - a.score);
  }
}
```

2. Register the strategy in the recommendation service
3. Add tests for the new algorithm
4. Update documentation

## Troubleshooting

### Common Issues and Solutions

#### Database Connection Issues

```bash
# Check MongoDB connection
mongosh mongodb://localhost:27017/skills_orchestration

# Check Neo4j connection
cypher-shell -u neo4j -p password -a bolt://localhost:7687
```

#### API Gateway Connection Refused

```bash
# Check if gateway is running
docker ps | grep api-gateway

# Check logs
docker logs skills-orchestration-api-gateway-1
```

#### LLM Service Not Responding

```bash
# Check LLM service logs
docker logs skills-orchestration-llm-service-1

# Verify API key in environment variables
docker exec skills-orchestration-llm-service-1 env | grep LLM_API_KEY
```

### Logging and Debugging

All services use structured JSON logging. To view logs:

```bash
# View all logs
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f skills-service

# Filter logs by level
docker-compose logs -f | grep ERROR
```

For enhanced debugging:

1. Set `LOG_LEVEL=debug` in your `.env` file
2. Restart the service: `docker-compose restart skills-service`
3. Use the debugging endpoints: `http://localhost:3000/debug/skills-service`

## Next Steps

Now that you have your development environment set up, here are some recommended next steps:

1. Explore the [Architecture Documentation](../architecture.md) to understand system design
2. Review [API Specifications](../implementation/api-specs.md) for service interfaces
3. Check [Data Models](../implementation/data-models.md) for core data structures
4. Explore the integration points in [Integrations](../implementation/integrations.md)

## Support and Resources

- **Development Chat**: Join the #skills-orchestration channel in Slack
- **Issue Tracking**: Report bugs in the [GitHub Issue Tracker](https://github.com/doit/skills-orchestration/issues)
- **Documentation**: Full documentation is available in the `/docs` directory
- **Architecture Decision Records**: Review past decisions in `/docs/adr`