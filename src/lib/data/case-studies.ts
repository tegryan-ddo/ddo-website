export interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  services: string[]
  challenge: string
  solution: string
  outcomes: { metric: string; label: string }[]
  technologies: string[]
  duration: string
  teamSize: string
  color: string
  content: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'enterprise-ai-platform',
    title: 'Enterprise AI Platform',
    client: 'Fortune 500 Financial Services',
    industry: 'Financial Services',
    services: ['AI Implementation', 'DevOps', 'Security'],
    challenge:
      'Legacy systems preventing adoption of modern AI capabilities. Manual processes costing millions in operational inefficiency.',
    solution:
      'Designed and implemented a secure AI platform enabling RAG-based document processing and automated customer service workflows.',
    outcomes: [
      { metric: '60%', label: 'Reduction in processing time' },
      { metric: '$2.4M', label: 'Annual cost savings' },
      { metric: '95%', label: 'Customer satisfaction' },
      { metric: '3 months', label: 'Time to production' },
    ],
    technologies: ['AWS Bedrock', 'React', 'Kubernetes', 'Terraform'],
    duration: '4 months',
    teamSize: '3 consultants',
    color: 'from-blue-500 to-cyan-500',
    testimonial: {
      quote: "Digital DevOps transformed our approach to AI. What we thought would take years was delivered in months, with production-grade quality from day one.",
      author: "VP of Technology",
      role: "Fortune 500 Financial Services"
    },
    content: `
## Background

This Fortune 500 financial services firm processes millions of documents annually—loan applications, compliance reports, customer correspondence, and regulatory filings. Their existing systems relied heavily on manual review, with documents often sitting in queues for days before processing.

The leadership team recognized that AI could transform their operations, but previous attempts had stalled. A proof-of-concept chatbot had been built but never made it to production due to security concerns and integration challenges.

## The Challenge

When we engaged with the client, we identified several interconnected problems:

### Technical Debt
- **Legacy document management**: A 15-year-old system with no API access
- **Siloed data**: Customer information spread across 7 different databases
- **Security constraints**: Strict compliance requirements (SOC 2, PCI-DSS) that previous vendors couldn't meet

### Operational Issues
- **Processing backlog**: 48-72 hour average turnaround for document review
- **Error rates**: 12% of manually processed documents required rework
- **Scaling limitations**: Adding headcount wasn't keeping pace with volume growth

### Strategic Gaps
- **No AI expertise**: Internal team lacked experience with production AI systems
- **Vendor lock-in concerns**: Leadership wary of dependency on single AI provider
- **Unclear ROI**: Previous AI initiatives hadn't demonstrated measurable value

## Our Approach

We proposed a phased approach that would deliver value quickly while building toward a comprehensive platform.

### Phase 1: Foundation (Weeks 1-4)

**Secure Infrastructure Setup**
- Deployed a private AI infrastructure on AWS using Bedrock for model access
- Implemented VPC isolation, encryption at rest and in transit, and comprehensive audit logging
- Established CI/CD pipelines with security scanning at every stage

**Document Pipeline Architecture**
- Built a document ingestion system capable of handling 100K+ documents daily
- Implemented OCR with confidence scoring for quality control
- Created a chunking strategy optimized for financial document structure

### Phase 2: RAG Implementation (Weeks 5-8)

**Knowledge Base Development**
- Indexed 10 years of historical documents and decisions
- Implemented hybrid search combining semantic and keyword matching
- Built a feedback loop for continuous retrieval quality improvement

**Answer Generation**
- Fine-tuned prompts for financial domain accuracy
- Implemented citation tracking for audit compliance
- Created confidence thresholds for human escalation

### Phase 3: Workflow Automation (Weeks 9-12)

**Customer Service Integration**
- Connected AI system to existing ticketing platform
- Implemented intelligent routing based on query complexity
- Built agent assist tools for complex cases

**Quality Assurance**
- Deployed automated accuracy monitoring
- Created A/B testing framework for prompt optimization
- Established human review sampling for continuous improvement

### Phase 4: Scale & Optimize (Weeks 13-16)

**Performance Optimization**
- Reduced average response time from 3 seconds to 400ms
- Implemented caching strategies for common queries
- Optimized embedding model for cost efficiency

**Operational Handoff**
- Trained internal team on system management
- Created runbooks for common scenarios
- Established ongoing support relationship

## Technical Architecture

The final architecture balanced security, performance, and maintainability:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Document Sources                                                │
│  ├── Email Gateway                                              │
│  ├── Web Upload Portal                                          │
│  └── Legacy System Connectors                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Processing Pipeline (AWS)                                       │
│  ├── S3 (encrypted storage)                                     │
│  ├── Lambda (document processing)                               │
│  ├── Textract (OCR)                                             │
│  └── SQS (queue management)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AI Platform                                                     │
│  ├── OpenSearch (vector store)                                  │
│  ├── Bedrock (Claude models)                                    │
│  └── Custom APIs (Next.js on EKS)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Applications                                                    │
│  ├── Agent Dashboard (React)                                    │
│  ├── Customer Portal                                            │
│  └── Admin Tools                                                │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Results

After 4 months, the impact was measurable across multiple dimensions:

### Operational Efficiency
- **60% reduction** in document processing time (72 hours → 29 hours average)
- **85% of routine queries** handled without human intervention
- **90% reduction** in processing errors through automated validation

### Financial Impact
- **$2.4M annual savings** from reduced manual processing
- **15% increase** in customer throughput without headcount growth
- **ROI achieved** in 6 months post-deployment

### Customer Experience
- **95% customer satisfaction** rating for AI-assisted interactions
- **70% faster** response times for common inquiries
- **24/7 availability** for document submission and status checks

### Compliance & Security
- **Zero security incidents** since deployment
- **Full audit trail** for all AI decisions
- **SOC 2 Type II** certification maintained

## Key Learnings

This engagement reinforced several principles that guide our work:

1. **Security First**: Building compliance into the architecture from day one avoided costly retrofits

2. **Incremental Value**: Delivering working software in 4-week cycles maintained stakeholder confidence

3. **Human-in-the-Loop**: Designing for human escalation built trust and caught edge cases

4. **Measurement Matters**: Establishing baselines before implementation enabled clear ROI demonstration

## What's Next

The client is now expanding the platform to additional use cases:
- Automated compliance checking for new regulations
- Predictive analytics for customer churn
- Internal knowledge management for employee onboarding

---

*Interested in similar results? [Contact us](/contact) to discuss your AI transformation.*
    `,
  },
  {
    id: 'agentic-ai-system',
    title: 'Agentic AI Support System',
    client: 'Series B SaaS Company',
    industry: 'Technology',
    services: ['AI Strategy', 'AI Implementation'],
    challenge:
      'Support team overwhelmed with repetitive tickets. Need to scale customer support without proportional headcount growth.',
    solution:
      'Built an agentic AI system using Claude that autonomously handles tier-1 support, escalates complex issues, and learns from agent feedback.',
    outcomes: [
      { metric: '70%', label: 'Tickets auto-resolved' },
      { metric: '45%', label: 'Reduction in response time' },
      { metric: '4.8/5', label: 'Customer rating' },
      { metric: '8x', label: 'ROI in first year' },
    ],
    technologies: ['Anthropic Claude', 'Next.js', 'PostgreSQL', 'AWS'],
    duration: '3 months',
    teamSize: '2 consultants',
    color: 'from-violet-500 to-purple-500',
    testimonial: {
      quote: "Our support team went from firefighting to actually improving the product. The AI handles the routine stuff perfectly, and escalates the tricky cases with full context.",
      author: "Head of Customer Success",
      role: "Series B SaaS Company"
    },
    content: `
## Background

This Series B SaaS company had grown rapidly—ARR tripled in 18 months—but their support infrastructure hadn't kept pace. The 8-person support team was handling 2,000+ tickets per month, with average response times stretching to 4 hours during peak periods.

Leadership faced a difficult choice: hire aggressively to maintain service quality, or find a way to do more with the existing team. They came to us looking for an AI solution that could actually work—not another chatbot that frustrated customers.

## The Challenge

We identified the core issues during our discovery phase:

### Volume & Complexity Distribution
- **60%** of tickets were repetitive (password resets, feature questions, billing inquiries)
- **30%** required investigation but followed predictable patterns
- **10%** genuinely needed human expertise and judgment

### Existing Tooling Limitations
- Basic chatbot had 15% deflection rate and negative customer feedback
- Help documentation was outdated and hard to search
- No integration between support tools and product analytics

### Team Dynamics
- Senior agents spending 70% of time on tier-1 issues
- High turnover due to repetitive work
- Tribal knowledge not captured in any system

## Our Approach

We designed an agentic AI system that could act autonomously within defined boundaries, escalating when uncertain rather than guessing.

### Phase 1: Understanding & Architecture (Weeks 1-3)

**Deep Dive into Support Operations**
- Analyzed 6 months of ticket history (12,000+ tickets)
- Interviewed all support team members
- Mapped customer journey touchpoints

**Agentic Architecture Design**
- Defined agent capabilities and boundaries
- Designed escalation logic with confidence thresholds
- Created feedback loops for continuous learning

### Phase 2: Core Agent Development (Weeks 4-7)

**Multi-Tool Agent Framework**
Built an agent capable of:
- Querying the product database for account information
- Searching documentation and past tickets
- Executing common actions (password resets, plan changes)
- Creating and updating tickets in the existing system

**Conversation Management**
- Implemented context tracking across multi-turn conversations
- Built handoff protocols for human escalation
- Created audit logging for all agent actions

### Phase 3: Knowledge Integration (Weeks 8-9)

**RAG-Enhanced Responses**
- Indexed all documentation with semantic search
- Incorporated resolved ticket patterns
- Added product feature documentation

**Dynamic Learning**
- Built feedback mechanism for agent corrections
- Implemented prompt versioning for A/B testing
- Created dashboards for quality monitoring

### Phase 4: Deployment & Optimization (Weeks 10-12)

**Gradual Rollout**
- Started with 10% of incoming tickets
- Monitored quality metrics continuously
- Expanded to 100% over 4 weeks

**Team Enablement**
- Trained support team on escalation handling
- Created tools for feedback and correction
- Established quality review processes

## Technical Implementation

### Agent Architecture

\`\`\`
User Message
     │
     ▼
┌─────────────────────────────────────────┐
│  Intent Classification                   │
│  • Determine query type                  │
│  • Assess complexity                     │
│  • Check for existing context            │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Planning Phase                          │
│  • Identify required information         │
│  • Select appropriate tools              │
│  • Plan action sequence                  │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Execution Phase                         │
│  • Execute tool calls                    │
│  • Validate results                      │
│  • Handle errors gracefully              │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Response Generation                     │
│  • Synthesize gathered information       │
│  • Apply tone and style guidelines       │
│  • Include confidence assessment         │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Quality Gate                            │
│  • Check confidence threshold            │
│  • Verify action appropriateness         │
│  • Escalate if uncertain                 │
└─────────────────────────────────────────┘
\`\`\`

### Tool Capabilities

The agent has access to the following tools with defined permissions:

| Tool | Capability | Autonomy Level |
|------|------------|----------------|
| Account Lookup | Read customer data | Full |
| Ticket Search | Search history | Full |
| Doc Search | Query knowledge base | Full |
| Password Reset | Execute reset | Full |
| Plan Change | Modify subscription | Requires confirmation |
| Refund | Process refund | Escalate to human |
| Feature Request | Log request | Full |

### Escalation Logic

The agent escalates to human support when:
- Confidence score below 0.7
- Customer expresses frustration (sentiment analysis)
- Request involves financial transactions over threshold
- Query touches sensitive account information
- Agent has attempted 3+ tool calls without resolution

## Results

### Efficiency Metrics
- **70% of tickets** now resolved without human intervention
- **45% reduction** in average response time (4 hours → 2.2 hours)
- **85% reduction** in tier-1 ticket load for human agents

### Quality Metrics
- **4.8/5 average rating** for AI-handled interactions
- **92% resolution rate** on first contact
- **3% escalation rate** for AI-initiated conversations

### Business Impact
- **$480K annual savings** in support costs
- **8x ROI** achieved in first year
- **Zero additional hires** despite 40% volume growth

### Team Impact
- Senior agents now focus on complex issues and product feedback
- Support team turnover decreased by 50%
- Team satisfaction scores increased significantly

## Key Learnings

1. **Agentic beats chatbot**: Giving the AI ability to take action (not just answer questions) dramatically increased usefulness

2. **Confidence-based escalation**: Teaching the AI to say "I'm not sure" built customer trust

3. **Human-in-the-loop feedback**: Agent corrections by humans created a virtuous learning cycle

4. **Start narrow, expand carefully**: Beginning with high-confidence use cases built organizational trust

## What's Next

The company is now exploring:
- Proactive support (reaching out before issues escalate)
- AI-assisted onboarding for new customers
- Integration with product telemetry for predictive support

---

*Ready to transform your support operations? [Take our AI readiness assessment](/assessment) or [contact us](/contact) to get started.*
    `,
  },
  {
    id: 'devops-transformation',
    title: 'DevOps Transformation',
    client: 'Healthcare Technology Provider',
    industry: 'Healthcare',
    services: ['DevOps', 'Security & Compliance'],
    challenge:
      'Manual deployments taking days. Unable to meet compliance requirements for HIPAA. Development velocity suffering.',
    solution:
      'Implemented GitOps workflows with automated compliance checks, infrastructure as code, and comprehensive observability.',
    outcomes: [
      { metric: '10x', label: 'Faster deployments' },
      { metric: '99.9%', label: 'Uptime achieved' },
      { metric: 'HIPAA', label: 'Compliance certified' },
      { metric: '80%', label: 'Less manual work' },
    ],
    technologies: ['Kubernetes', 'ArgoCD', 'Terraform', 'Datadog'],
    duration: '6 months',
    teamSize: '2 consultants',
    color: 'from-emerald-500 to-teal-500',
    testimonial: {
      quote: "We went from dreading deployments to deploying multiple times per day with confidence. The compliance automation alone was worth the investment.",
      author: "CTO",
      role: "Healthcare Technology Provider"
    },
    content: `
## Background

This healthcare technology provider builds software for hospitals and clinics, managing sensitive patient data across hundreds of healthcare facilities. Their platform had grown organically over 8 years, and the infrastructure hadn't evolved to match.

Deployments were manual, stressful affairs that typically happened on weekends to minimize risk. The team had failed their last HIPAA audit and was facing potential customer losses if they couldn't demonstrate improved compliance controls.

## The Challenge

### Deployment Pain
- **3-4 day deployment cycles** from code complete to production
- **Weekend deployments only** due to risk concerns
- **50% rollback rate** when issues were discovered
- **Manual configuration** of each environment

### Compliance Gaps
- **Failed HIPAA audit** on access controls and audit logging
- **No infrastructure versioning** making changes untrackable
- **Manual security reviews** creating bottlenecks
- **Incomplete disaster recovery** documentation and testing

### Operational Issues
- **2 full-time engineers** dedicated to deployment support
- **Limited observability** into production systems
- **Alert fatigue** from poorly tuned monitoring
- **No staging environment** that matched production

## Our Approach

We proposed a 6-month transformation focusing on automation, compliance, and reliability.

### Phase 1: Assessment & Foundation (Weeks 1-4)

**Current State Analysis**
- Documented all existing infrastructure components
- Mapped deployment processes and pain points
- Identified compliance gaps against HIPAA requirements
- Assessed team skills and training needs

**Infrastructure as Code Foundation**
- Selected Terraform as IaC tool
- Created modular infrastructure definitions
- Implemented state management with remote backend
- Established coding standards and review processes

### Phase 2: Kubernetes Platform (Weeks 5-10)

**Cluster Architecture**
- Designed multi-environment Kubernetes architecture
- Implemented network policies for workload isolation
- Configured pod security policies for HIPAA compliance
- Set up secrets management with encrypted storage

**GitOps Implementation**
- Deployed ArgoCD for declarative deployments
- Created application manifests for all services
- Implemented progressive delivery with Argo Rollouts
- Established git workflows for infrastructure changes

### Phase 3: CI/CD Pipeline (Weeks 11-16)

**Automated Build & Test**
- Implemented containerized build pipelines
- Added SAST and DAST security scanning
- Created integration test suites for each service
- Automated container image vulnerability scanning

**Deployment Automation**
- Built promotion pipelines between environments
- Implemented automated rollback on health check failures
- Created deployment dashboards for visibility
- Established change approval workflows

### Phase 4: Compliance Automation (Weeks 17-20)

**Access Controls**
- Implemented RBAC with least-privilege principles
- Automated access provisioning and deprovisioning
- Created audit trails for all access changes
- Established break-glass procedures for emergencies

**Audit Logging**
- Centralized all logs with tamper-evident storage
- Implemented log retention policies per HIPAA
- Created automated compliance reporting
- Built alerting for security-relevant events

### Phase 5: Observability & Reliability (Weeks 21-24)

**Monitoring Stack**
- Deployed comprehensive metrics collection
- Created application-specific dashboards
- Implemented distributed tracing
- Established SLOs and error budgets

**Incident Response**
- Created runbooks for common scenarios
- Implemented automated alerting with escalation
- Established on-call rotation and procedures
- Conducted game day exercises

## Technical Architecture

### Platform Overview

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Developer Experience                                            │
│  ├── GitHub (source control)                                    │
│  ├── GitHub Actions (CI pipelines)                              │
│  └── ArgoCD (GitOps deployments)                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Kubernetes Platform (EKS)                                       │
│  ├── Production Cluster                                         │
│  ├── Staging Cluster                                            │
│  └── Development Cluster                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Supporting Services                                             │
│  ├── Vault (secrets management)                                 │
│  ├── Datadog (observability)                                    │
│  └── PagerDuty (incident management)                            │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Deployment Flow

| Step | Before | After |
|------|--------|-------|
| Code Review | Manual, days | Automated checks, hours |
| Build | Local, inconsistent | Containerized, reproducible |
| Security Scan | Manual, occasional | Automated, every commit |
| Deploy to Dev | Manual SSH | Git push, automatic |
| Deploy to Staging | Manual, 4 hours | Promotion pipeline, 15 min |
| Deploy to Prod | Weekend, 8 hours | Automated, 30 min |
| Rollback | Manual, 2+ hours | Automatic, 2 min |

## Results

### Deployment Metrics
- **10x faster deployments**: 3-4 days → 30 minutes
- **Daily deployments**: From monthly to multiple per day
- **5% rollback rate**: Down from 50%
- **Zero weekend deployments**: All during business hours

### Reliability Metrics
- **99.9% uptime**: Up from 98.5%
- **MTTR reduced 80%**: From 4 hours to 45 minutes
- **Alert volume down 90%**: Through tuning and consolidation
- **Zero P1 incidents**: In 6 months post-transformation

### Compliance Achievements
- **HIPAA audit passed**: With zero findings
- **SOC 2 Type II ready**: Framework in place
- **Complete audit trail**: For all infrastructure changes
- **Automated compliance reports**: Generated monthly

### Team Impact
- **2 engineers freed**: From deployment duties
- **Developer satisfaction up**: Deployment is no longer dreaded
- **Faster feature delivery**: Focus on code, not operations
- **Knowledge documented**: Runbooks for all procedures

## Key Learnings

1. **GitOps enables compliance**: Treating infrastructure as code creates the audit trail regulators require

2. **Automation builds confidence**: The team deploys more often because they trust the process

3. **Observability is foundational**: You can't improve what you can't measure

4. **Cultural change takes time**: Technical transformation is easier than habit change

## What's Next

The team is continuing to evolve their platform:
- Implementing chaos engineering practices
- Expanding automated testing coverage
- Building self-service developer portal
- Exploring edge deployment for latency-sensitive features

---

*Struggling with deployments or compliance? [Contact us](/contact) to discuss how we can help.*
    `,
  },
  {
    id: 'ai-powered-analytics',
    title: 'AI-Powered Analytics Dashboard',
    client: 'E-commerce Platform',
    industry: 'Retail',
    services: ['Modern Development', 'AI Implementation'],
    challenge:
      'Business users spending hours in spreadsheets trying to understand customer behavior. No real-time insights available.',
    solution:
      'Built a conversational analytics platform allowing natural language queries of business data with AI-generated insights.',
    outcomes: [
      { metric: '5hrs', label: 'Weekly time saved per user' },
      { metric: '3x', label: 'More data-driven decisions' },
      { metric: '90%', label: 'User adoption rate' },
      { metric: '15%', label: 'Revenue increase from insights' },
    ],
    technologies: ['OpenAI', 'Next.js', 'Snowflake', 'Recharts'],
    duration: '4 months',
    teamSize: '3 consultants',
    color: 'from-orange-500 to-amber-500',
    testimonial: {
      quote: "I can just ask 'What's driving cart abandonment this week?' and get an actual answer with visualizations. It's like having a data analyst available 24/7.",
      author: "Director of E-commerce",
      role: "E-commerce Platform"
    },
    content: `
## Background

This mid-market e-commerce platform sells specialty goods through multiple channels—their own website, marketplaces, and wholesale. With $50M+ in annual revenue, they generated significant data but lacked the tools to use it effectively.

The analytics team (2 people) was overwhelmed with ad-hoc requests. Business users had learned to work around them by exporting data to spreadsheets, leading to conflicting numbers and delayed decisions.

## The Challenge

### Data Accessibility
- **2-week average** for analytics request fulfillment
- **Multiple data sources**: Website analytics, ERP, marketing platforms
- **No single source of truth**: Different tools showing different numbers
- **SQL required**: Business users locked out of direct access

### Decision-Making Impact
- **Reactive decisions**: Issues discovered after the fact
- **Missed opportunities**: Trends identified too late to act
- **Gut-feel dominance**: Data available but not actionable
- **Meeting preparation**: Hours spent creating reports

### Technical Limitations
- **No real-time data**: Daily batch updates at best
- **Static dashboards**: Pre-built views that didn't answer new questions
- **Scale issues**: Complex queries took hours to run
- **No mobile access**: Insights only available at desks

## Our Approach

We built a conversational analytics platform that democratized data access while maintaining governance and accuracy.

### Phase 1: Data Foundation (Weeks 1-4)

**Data Warehouse Modernization**
- Migrated to Snowflake for scalable analytics
- Built real-time data pipelines from key sources
- Created a semantic layer for consistent metrics
- Implemented data quality monitoring

**Metric Definitions**
- Worked with stakeholders to define key metrics
- Created a business glossary for consistent terminology
- Built automated data quality checks
- Established data lineage tracking

### Phase 2: Natural Language Interface (Weeks 5-8)

**Query Understanding**
- Built intent classification for common question types
- Created entity extraction for business terms
- Developed SQL generation from natural language
- Implemented query validation and safety checks

**Answer Generation**
- Designed contextual response formatting
- Built visualization recommendation engine
- Created insight summarization
- Implemented follow-up question handling

### Phase 3: Visualization & Insights (Weeks 9-12)

**Dynamic Visualization**
- Built automated chart selection based on data type
- Created interactive drill-down capabilities
- Implemented comparison and trend analysis
- Added annotation and sharing features

**Proactive Insights**
- Built anomaly detection for key metrics
- Created automated insight generation
- Implemented alerting for significant changes
- Developed weekly summary reports

### Phase 4: Deployment & Adoption (Weeks 13-16)

**User Onboarding**
- Created guided tutorials for new users
- Built example question library
- Developed role-based default dashboards
- Implemented feedback collection

**Enterprise Features**
- Added SSO integration
- Built access controls by data domain
- Created audit logging for compliance
- Implemented usage analytics

## Technical Implementation

### Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Data Sources                                                    │
│  ├── Shopify (e-commerce)                                       │
│  ├── NetSuite (ERP)                                             │
│  ├── Google Analytics                                           │
│  └── Marketing Platforms                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Data Pipeline (Fivetran + dbt)                                  │
│  ├── Real-time sync for key data                                │
│  ├── Transformation layer                                       │
│  └── Semantic modeling                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Snowflake Data Warehouse                                        │
│  ├── Raw data layer                                             │
│  ├── Transformed data layer                                     │
│  └── Semantic/metrics layer                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  AI Analytics Platform                                           │
│  ├── Next.js frontend                                           │
│  ├── Query engine (text-to-SQL)                                 │
│  └── Visualization engine                                       │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Query Flow

\`\`\`
User Question: "What's our customer acquisition cost by channel this month?"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Intent & Entity Extraction                                      │
│  • Metric: Customer Acquisition Cost                            │
│  • Dimension: Channel                                           │
│  • Time Period: Current Month                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  SQL Generation                                                  │
│  SELECT channel,                                                 │
│         SUM(marketing_spend) / COUNT(DISTINCT new_customers)    │
│  FROM metrics.acquisition                                        │
│  WHERE date >= DATE_TRUNC('month', CURRENT_DATE)                │
│  GROUP BY channel                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Visualization Selection                                         │
│  • Data type: Categorical comparison                            │
│  • Recommended: Horizontal bar chart                            │
│  • Include: Trend comparison to last month                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Response Generation                                             │
│  "Your CAC by channel this month:                               │
│   • Paid Search: $45 (↓12% vs last month)                       │
│   • Social: $62 (↑8%)                                           │
│   • Organic: $15 (↓3%)                                          │
│   Notable: Paid search efficiency improved significantly."       │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Results

### User Adoption
- **90% adoption rate** across target users
- **400+ questions asked** per week
- **15 minutes** average session duration
- **95% query success rate**

### Time Savings
- **5 hours saved** per user per week
- **Analytics team freed**: From ad-hoc requests to strategic work
- **Faster meetings**: Real-time answers during discussions
- **Reduced spreadsheet usage**: 70% decline

### Business Impact
- **15% revenue increase** attributed to faster insights
- **3x more A/B tests** due to easier analysis
- **Earlier trend detection**: Issues caught days sooner
- **Better inventory management**: Reduced stockouts by 25%

### Data Quality
- **Single source of truth**: Eliminated conflicting numbers
- **Metric consistency**: Standard definitions across org
- **Real-time visibility**: Data fresh within 15 minutes
- **Self-service adoption**: 85% of questions answered without analyst

## Key Learnings

1. **Semantic layer is critical**: Consistent metric definitions enabled accurate natural language queries

2. **Training data matters**: Building question examples from real user queries improved accuracy dramatically

3. **Visualization automation**: Choosing the right chart type automatically increased engagement significantly

4. **Progressive disclosure**: Starting simple and enabling drill-down matched how users actually explore data

## What's Next

The platform is evolving to include:
- Predictive analytics ("What will next month's revenue be?")
- Automated anomaly explanations
- Integration with planning tools
- Mobile-native experience

---

*Want to unlock your data with AI? [Contact us](/contact) to discuss how conversational analytics could work for you.*
    `,
  },
]

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id)
}

export function getRelatedCaseStudies(currentId: string, limit: number = 2): CaseStudy[] {
  const current = getCaseStudyById(currentId)
  if (!current) return caseStudies.slice(0, limit)

  return caseStudies
    .filter((study) => study.id !== currentId)
    .filter(
      (study) =>
        study.industry === current.industry ||
        study.services.some((service) => current.services.includes(service))
    )
    .slice(0, limit)
}
