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
    id: 'fintech-aws-infrastructure',
    title: 'Production AWS in 2 Weeks',
    client: 'Series A FinTech Startup',
    industry: 'Financial Services',
    services: ['AWS Infrastructure', 'Security', 'CI/CD'],
    challenge:
      'Needed production-ready AWS infrastructure for SOC 2 compliance before closing a major enterprise deal. Traditional consultancies quoted 2-3 months.',
    solution:
      'Delivered complete AWS infrastructure with VPC, ECS, RDS, and CI/CD pipelines in 14 days. Included security hardening and compliance documentation.',
    outcomes: [
      { metric: '14 days', label: 'To production' },
      { metric: '$45K', label: 'Saved vs quoted' },
      { metric: 'SOC 2', label: 'Audit ready' },
      { metric: '99.9%', label: 'Uptime achieved' },
    ],
    technologies: ['AWS', 'Terraform', 'ECS', 'RDS', 'GitHub Actions'],
    duration: '2 weeks',
    teamSize: '1 senior engineer',
    color: 'from-blue-500 to-cyan-500',
    testimonial: {
      quote: "We were quoted 8-12 weeks by three different firms. Digital DevOps delivered in 2 weeks and we passed our SOC 2 audit on the first try. They literally saved our enterprise deal.",
      author: "CTO",
      role: "Series A FinTech"
    },
    content: `
## Background

This Series A fintech startup had built their MVP on Heroku and was closing a $2M enterprise deal—but the prospect required SOC 2 compliance and a "real" infrastructure before signing. With the deal deadline 6 weeks away, they reached out after getting 8-12 week quotes from traditional consultancies.

## The Challenge

### Technical State
- **Heroku-based infrastructure**: Working but not enterprise-ready
- **No Infrastructure as Code**: All configuration was manual
- **Shared database**: Dev and prod on the same RDS instance
- **No CI/CD**: Deployments were manual git pushes
- **Zero compliance documentation**: Nothing ready for auditors

### Business Pressure
- **$2M deal at risk**: Contract required SOC 2 readiness
- **6-week deadline**: Traditional timelines wouldn't work
- **Limited budget**: Series A meant watching every dollar
- **No DevOps hire**: 5-person team was all product engineers

## Our Approach

We proposed our AWS Launchpad Professional package, customized for their compliance requirements.

### Week 1: Foundation

**Day 1-2: AWS Account Setup**
- Created new AWS Organization with proper account structure
- Set up AWS Control Tower for governance
- Configured IAM with SSO integration
- Enabled CloudTrail and Config for compliance

**Day 3-4: Networking**
- Deployed VPC across 3 availability zones
- Configured public/private subnets
- Set up NAT gateways and routing
- Implemented security groups with least-privilege

**Day 5-7: Core Infrastructure**
- Provisioned ECS Fargate cluster
- Set up RDS PostgreSQL with encryption
- Configured S3 buckets with versioning
- Deployed CloudFront for static assets

### Week 2: CI/CD & Security

**Day 8-9: CI/CD Pipeline**
- Built GitHub Actions workflows
- Implemented automated testing
- Created staging and production pipelines
- Set up blue-green deployments

**Day 10-11: Security Hardening**
- Configured WAF with OWASP rules
- Enabled GuardDuty and Security Hub
- Set up secrets management
- Implemented encryption everywhere

**Day 12-14: Documentation & Handoff**
- Generated architecture diagrams
- Created runbooks for operations
- Wrote compliance documentation
- Conducted knowledge transfer session

## Technical Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  AWS Organization                                                │
│  └── Production Account                                         │
│       ├── VPC (3 AZs)                                           │
│       │   ├── Public Subnets (ALB)                              │
│       │   ├── Private Subnets (ECS, RDS)                        │
│       │   └── NAT Gateways                                      │
│       ├── ECS Fargate Cluster                                   │
│       │   ├── Application Service                               │
│       │   └── Background Worker Service                         │
│       ├── RDS PostgreSQL (Multi-AZ)                             │
│       ├── ElastiCache Redis                                     │
│       ├── S3 + CloudFront                                       │
│       └── Security Layer                                        │
│           ├── WAF                                               │
│           ├── GuardDuty                                         │
│           └── Security Hub                                      │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Deliverables

Everything was delivered as Terraform code with full documentation:

- **20+ Terraform modules** covering all infrastructure
- **GitHub Actions workflows** for CI/CD
- **Architecture diagrams** for technical and executive audiences
- **Runbooks** for common operations
- **Security baseline documentation** for SOC 2 auditors
- **30-day support** for questions and issues

## Results

### Immediate Impact
- **Production live in 14 days** vs 8-12 week quotes
- **$45,000 saved** compared to lowest traditional quote
- **Zero downtime migration** from Heroku

### 6-Month Follow-up
- **SOC 2 Type I passed** on first audit attempt
- **99.9% uptime** maintained since launch
- **$2M deal closed** on schedule
- **Zero security incidents**

### Cost Comparison
| Provider | Quote | Timeline |
|----------|-------|----------|
| Big 4 Consultancy | $85,000 | 12 weeks |
| AWS Partner Agency | $55,000 | 8 weeks |
| Freelancer | $25,000 | 6 weeks |
| **Digital DevOps** | **$7,999** | **2 weeks** |

## Key Learnings

1. **AI tooling is a multiplier**: Our AI-augmented workflow let one senior engineer do what traditionally requires a team

2. **Terraform modules compound**: Pre-built, battle-tested modules eliminated weeks of development

3. **Compliance from day one**: Building security in was faster than retrofitting

4. **Documentation matters**: Well-documented infrastructure made SOC 2 audit smooth

---

*Need production AWS fast? [Contact us](/contact) to discuss your timeline.*
    `,
  },
  {
    id: 'healthcare-hipaa-compliance',
    title: 'HIPAA Compliance in 8 Weeks',
    client: 'Digital Health Platform',
    industry: 'Healthcare',
    services: ['Security & Compliance', 'AWS Infrastructure'],
    challenge:
      'Healthcare startup handling PHI needed HIPAA compliance to sign hospital contracts. Previous consultant had spent 6 months with incomplete results.',
    solution:
      'Complete HIPAA implementation including technical controls, policies, and documentation. Achieved compliance certification in 8 weeks.',
    outcomes: [
      { metric: '8 weeks', label: 'To HIPAA ready' },
      { metric: '$1.2M', label: 'Contracts unlocked' },
      { metric: '100%', label: 'Audit findings resolved' },
      { metric: '50%', label: 'Faster than quoted' },
    ],
    technologies: ['AWS', 'Terraform', 'CloudTrail', 'KMS', 'GuardDuty'],
    duration: '8 weeks',
    teamSize: '1 senior engineer',
    color: 'from-emerald-500 to-teal-500',
    testimonial: {
      quote: "Our previous consultant spent 6 months and left us with a pile of incomplete documents. Digital DevOps came in, cleaned everything up, and got us HIPAA compliant in 8 weeks. We've now signed three hospital contracts.",
      author: "CEO",
      role: "Digital Health Platform"
    },
    content: `
## Background

This digital health startup had built an innovative patient engagement platform but was stuck in a frustrating loop: hospitals wanted to buy, but required HIPAA compliance first. A previous consultant had spent 6 months (and $80K) producing incomplete documentation and partial implementations.

## The Challenge

### Inherited Mess
- **Incomplete policies**: 40+ documents started but not finished
- **Partial technical controls**: Some encryption, inconsistent logging
- **No risk assessment**: Required for HIPAA but never completed
- **Confused team**: Unclear what was done vs. still needed
- **Lost time**: 6 months with nothing to show for it

### Business Impact
- **$1.2M in contracts waiting**: Three hospitals ready to sign
- **Investor pressure**: Series B contingent on enterprise traction
- **Competitor threat**: Rival company was HIPAA compliant
- **Team morale**: Previous failure had demoralized the team

## Our Approach

We conducted a 2-day assessment, then executed a focused 8-week sprint.

### Phase 1: Assessment & Gap Analysis (Week 1-2)

**Current State Audit**
- Inventoried all existing documentation
- Assessed technical controls in place
- Interviewed key stakeholders
- Mapped PHI data flows

**Gap Analysis**
- Compared current state to HIPAA requirements
- Prioritized gaps by risk and effort
- Created detailed remediation plan
- Set clear milestones for 8 weeks

### Phase 2: Technical Controls (Week 3-5)

**Data Protection**
- Implemented encryption for all PHI at rest (KMS)
- Configured TLS everywhere for data in transit
- Set up proper key management and rotation
- Deployed data loss prevention controls

**Access Controls**
- Implemented role-based access control
- Set up MFA for all PHI access
- Created automated provisioning/deprovisioning
- Established break-glass procedures

**Audit Logging**
- Centralized all logs in CloudWatch
- Configured CloudTrail for API auditing
- Implemented tamper-evident log storage
- Set up retention per HIPAA requirements

**Monitoring & Incident Response**
- Deployed GuardDuty for threat detection
- Created security incident procedures
- Set up automated alerting
- Established incident response team

### Phase 3: Administrative Controls (Week 5-7)

**Policy Development**
- Wrote 25 required HIPAA policies
- Created procedures for each policy
- Developed employee training materials
- Established policy review schedule

**Risk Assessment**
- Conducted formal risk assessment
- Documented all identified risks
- Created risk treatment plans
- Established ongoing risk management process

**Business Associate Agreements**
- Audited all vendors handling PHI
- Executed BAAs with AWS and others
- Created BAA tracking system
- Established vendor review process

### Phase 4: Validation & Documentation (Week 7-8)

**Internal Audit**
- Conducted mock HIPAA audit
- Tested all technical controls
- Verified policy implementation
- Documented evidence for each requirement

**Documentation Package**
- Compiled compliance evidence binder
- Created architecture documentation
- Prepared executive summary
- Assembled auditor-ready package

## Technical Implementation

### AWS HIPAA Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  HIPAA-Eligible AWS Services Only                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  VPC (Isolated Network)                                   │   │
│  │  ├── Private Subnets (Application + Database)            │   │
│  │  ├── No Public Access to PHI                              │   │
│  │  └── VPN for Admin Access                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Data Layer                                               │   │
│  │  ├── RDS PostgreSQL (encrypted, Multi-AZ)                │   │
│  │  ├── S3 (encrypted, versioned, access logged)            │   │
│  │  └── ElastiCache (encrypted)                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Security & Monitoring                                    │   │
│  │  ├── KMS (customer-managed keys)                          │   │
│  │  ├── CloudTrail (all API calls logged)                    │   │
│  │  ├── GuardDuty (threat detection)                         │   │
│  │  ├── Config (compliance monitoring)                       │   │
│  │  └── SecurityHub (centralized findings)                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Compliance Checklist

| Safeguard | Requirement | Implementation |
|-----------|-------------|----------------|
| Access Control | Unique user IDs | AWS IAM + SSO |
| Access Control | Automatic logoff | Session timeout |
| Audit Controls | Activity logs | CloudTrail + CloudWatch |
| Integrity | PHI alteration detection | Versioning + checksums |
| Transmission | Encryption in transit | TLS 1.2+ everywhere |
| Encryption | Encryption at rest | KMS with CMKs |

## Results

### Compliance Achieved
- **HIPAA compliance verified** by third-party assessor
- **All 45 technical requirements** implemented
- **25 policies** documented and approved
- **Risk assessment** completed and filed

### Business Impact
- **$1.2M in contracts signed** within 60 days of compliance
- **3 hospital partnerships** launched
- **Series B closed** with HIPAA as key milestone
- **Sales cycle reduced** by 4 weeks on average

### Operational Improvements
- **Automated compliance monitoring** via AWS Config
- **Security incident response** under 1 hour
- **Zero PHI breaches** since implementation
- **Annual audit prep** reduced to 1 week

## Key Learnings

1. **Previous work wasn't wasted**: We salvaged useful content from the failed engagement

2. **Technical controls are the easy part**: Policies and training take more time than expected

3. **AWS makes HIPAA easier**: HIPAA-eligible services + BAA removes complexity

4. **Documentation is deliverable**: Auditors need evidence, not just implementations

---

*Need HIPAA compliance? [Contact us](/contact) for a free assessment of your current state.*
    `,
  },
  {
    id: 'saas-devops-transformation',
    title: 'From Weekly to Daily Deploys',
    client: 'B2B SaaS Platform',
    industry: 'Technology',
    services: ['CI/CD', 'AWS Infrastructure', 'DevOps'],
    challenge:
      'Engineering team stuck in deployment hell—weekly releases that took 8 hours and failed 30% of the time. Developer productivity plummeting.',
    solution:
      'Complete DevOps transformation with GitOps, automated testing, and zero-downtime deployments. Enabled multiple daily deploys.',
    outcomes: [
      { metric: '10x', label: 'Deploy frequency' },
      { metric: '8hrs→15min', label: 'Deploy time' },
      { metric: '2%', label: 'Failure rate (was 30%)' },
      { metric: '40%', label: 'More features shipped' },
    ],
    technologies: ['AWS', 'Terraform', 'GitHub Actions', 'ECS', 'Datadog'],
    duration: '6 weeks',
    teamSize: '1 senior engineer',
    color: 'from-violet-500 to-purple-500',
    testimonial: {
      quote: "Deployments used to be our most dreaded day. Now we deploy 3-4 times daily without even thinking about it. Our engineers are shipping features instead of fighting infrastructure.",
      author: "VP Engineering",
      role: "B2B SaaS Platform"
    },
    content: `
## Background

This B2B SaaS company had grown from 5 to 40 engineers in 18 months. Their deployment process—designed for a small team—had become a bottleneck. Releases happened weekly (on Saturdays, to minimize risk), took 8 hours, and failed 30% of the time.

## The Challenge

### Deployment Pain
- **8-hour deployment windows**: Friday night to Saturday morning
- **30% failure rate**: Almost one in three deploys required rollback
- **Manual processes**: 47-step runbook executed by hand
- **Fear-driven releases**: Teams batched changes to avoid deploys
- **Weekend work**: On-call engineer sacrificed every Saturday

### Developer Impact
- **2-week release cycles**: Code sat waiting for deployment
- **Context switching**: Bugs discovered weeks after writing code
- **Low morale**: Engineers dreading their on-call rotation
- **Hiring challenges**: Candidates asked about deploy process

### Business Impact
- **Slow feature delivery**: Competitors shipping faster
- **Customer frustration**: Bug fixes delayed by release schedule
- **Revenue at risk**: Several customers threatening to churn

## Our Approach

We proposed a 6-week DevOps transformation to enable continuous deployment.

### Week 1: Assessment & Quick Wins

**Current State Analysis**
- Shadowed a deployment end-to-end
- Documented all 47 manual steps
- Identified failure points and causes
- Interviewed engineers on pain points

**Quick Wins**
- Automated 15 manual steps immediately
- Fixed two configuration issues causing 40% of failures
- Reduced deploy time to 4 hours
- Team morale boost from visible progress

### Week 2-3: CI/CD Pipeline

**Build Pipeline**
- Containerized all services for consistency
- Implemented parallel test execution
- Added security scanning to builds
- Created artifact versioning

**Test Automation**
- Set up integration test environment
- Implemented database migration testing
- Added smoke tests for deployments
- Created test data management

### Week 3-4: GitOps & Deployment

**Infrastructure as Code**
- Converted all infrastructure to Terraform
- Implemented GitOps workflow
- Created environment parity (dev = staging = prod)
- Set up drift detection

**Zero-Downtime Deployments**
- Implemented blue-green deployments
- Added health check gates
- Created automatic rollback triggers
- Built deployment dashboard

### Week 5-6: Observability & Optimization

**Monitoring & Alerting**
- Deployed comprehensive metrics collection
- Created deployment tracking dashboard
- Implemented error rate monitoring
- Set up intelligent alerting

**Process Optimization**
- Established deployment SLOs
- Created runbooks for incidents
- Trained team on new processes
- Documented everything

## Technical Implementation

### Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| Deploy frequency | Weekly | Multiple daily |
| Deploy duration | 8 hours | 15 minutes |
| Failure rate | 30% | 2% |
| Manual steps | 47 | 0 |
| Rollback time | 2+ hours | 2 minutes |
| Weekend deploys | Every Saturday | Never |

### CI/CD Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Developer Workflow                                              │
│  ├── Feature Branch                                              │
│  ├── Pull Request                                               │
│  └── Merge to Main                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  CI Pipeline (GitHub Actions)                                    │
│  ├── Build & Test (parallel)                                    │
│  ├── Security Scan (SAST, dependencies)                         │
│  ├── Container Build                                            │
│  └── Push to ECR                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  CD Pipeline                                                     │
│  ├── Deploy to Staging (automatic)                              │
│  ├── Integration Tests                                          │
│  ├── Deploy to Production (on approval)                         │
│  └── Smoke Tests + Monitoring                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Production (ECS Blue-Green)                                     │
│  ├── Blue Environment (current)                                  │
│  ├── Green Environment (new)                                     │
│  └── ALB Traffic Shifting                                       │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Deployment Flow

1. **Developer merges PR** → triggers CI pipeline
2. **CI runs** → build, test, scan, containerize (8 minutes)
3. **Auto-deploy to staging** → integration tests run
4. **One-click production deploy** → blue-green swap
5. **Health checks pass** → traffic shifts to new version
6. **If issues** → automatic rollback in 2 minutes

## Results

### Deployment Metrics
- **10x deploy frequency**: Weekly → 3-4 times daily
- **97% faster deploys**: 8 hours → 15 minutes
- **15x lower failure rate**: 30% → 2%
- **100% automated**: 47 manual steps → 0

### Team Impact
- **No more weekend deploys**: Team has Saturdays back
- **Higher morale**: Engineers love the new process
- **Better hiring**: DevOps is now a selling point
- **Less on-call burden**: Automated rollback handles most issues

### Business Impact
- **40% more features shipped**: Faster cycle times
- **Faster bug fixes**: Hours instead of weeks
- **Customer satisfaction up**: Rapid response to issues
- **Zero churn**: At-risk customers retained

### Cost Savings
- **$150K/year saved**: Weekend overtime eliminated
- **Engineering time reclaimed**: 8 hours/week × 52 weeks
- **Reduced incident costs**: Faster detection and recovery

## Key Learnings

1. **Quick wins matter**: Early automation built trust and momentum

2. **Test automation unlocks speed**: Can't deploy fast without confidence

3. **GitOps simplifies everything**: Infrastructure changes via PR = auditable + reversible

4. **Monitoring enables confidence**: Teams deploy more when they can see what's happening

---

*Stuck in deployment hell? [Contact us](/contact) to discuss your DevOps transformation.*
    `,
  },
  {
    id: 'ecommerce-cost-optimization',
    title: '45% AWS Cost Reduction',
    client: 'E-commerce Marketplace',
    industry: 'Retail',
    services: ['Cost Optimization', 'AWS Infrastructure'],
    challenge:
      'AWS bill had grown to $85K/month with no clear understanding of where money was going. CFO demanded 30% reduction within 90 days.',
    solution:
      'Comprehensive cost analysis and optimization program. Achieved 45% reduction through right-sizing, reserved instances, and architecture improvements.',
    outcomes: [
      { metric: '45%', label: 'Cost reduction' },
      { metric: '$460K', label: 'Annual savings' },
      { metric: '0%', label: 'Performance impact' },
      { metric: '14 days', label: 'To first savings' },
    ],
    technologies: ['AWS', 'Terraform', 'CloudWatch', 'Cost Explorer'],
    duration: '4 weeks',
    teamSize: '1 senior engineer',
    color: 'from-orange-500 to-amber-500',
    testimonial: {
      quote: "We thought we needed to cut features to reduce costs. Digital DevOps found $460K in annual savings without touching a single feature. The CFO was thrilled.",
      author: "Director of Engineering",
      role: "E-commerce Marketplace"
    },
    content: `
## Background

This e-commerce marketplace had grown rapidly, and so had their AWS bill—from $15K to $85K/month in 18 months. The CFO was alarmed and demanded a 30% reduction. The engineering team had no idea where to start.

## The Challenge

### Cost Visibility
- **No cost allocation**: Resources not tagged properly
- **Unclear ownership**: Nobody knew who owned what
- **Historical blind spot**: No trending or forecasting
- **Surprise bills**: Large charges discovered after the fact

### Technical Debt
- **Over-provisioned everything**: "Just in case" sizing
- **No auto-scaling**: Fixed capacity for variable load
- **Development waste**: Non-prod environments running 24/7
- **Orphaned resources**: Old experiments never cleaned up

### Organizational Issues
- **No accountability**: Cost was "infrastructure's problem"
- **Fear of change**: Worry that optimization = outages
- **Lack of expertise**: Team didn't know AWS pricing well
- **Reactive spending**: Adding resources without analysis

## Our Approach

We executed our Cost Crusher program—performance-based pricing where we keep 50% of first-year savings.

### Week 1: Discovery & Analysis

**Cost Visibility**
- Implemented comprehensive tagging strategy
- Set up Cost Explorer dashboards
- Created cost allocation by team/service
- Analyzed 12 months of billing data

**Quick Win Identification**
- Found $12K/month in immediately deletable resources
- Identified over-provisioned instances
- Discovered unused reserved capacity
- Mapped development environment waste

### Week 2: Quick Wins Implementation

**Immediate Actions (Day 1-3)**
- Deleted orphaned resources: -$8K/month
- Stopped unused dev environments: -$4K/month
- Removed duplicate backups: -$2K/month
- Total quick wins: **$14K/month saved**

**Instance Right-Sizing (Day 4-7)**
- Analyzed utilization across all instances
- Right-sized 47 over-provisioned instances
- Implemented auto-scaling for variable workloads
- Additional savings: **$11K/month**

### Week 3: Reserved Capacity & Architecture

**Reserved Instances**
- Analyzed stable baseline workloads
- Purchased 1-year reserved instances for predictable usage
- Implemented Savings Plans for compute
- Savings from reservations: **$15K/month**

**Architecture Optimization**
- Moved to Graviton instances: 20% cheaper, better performance
- Implemented S3 Intelligent-Tiering: -40% storage costs
- Optimized data transfer with CloudFront
- Architecture savings: **$8K/month**

### Week 4: Governance & Sustainability

**Cost Governance**
- Set up budgets and alerts
- Created cost anomaly detection
- Implemented tag enforcement
- Established monthly review process

**Documentation & Training**
- Created cost optimization runbook
- Trained team on cost-aware decisions
- Documented all changes made
- Established ongoing optimization cadence

## Technical Details

### Cost Breakdown (Before)

| Category | Monthly Cost | % of Total |
|----------|-------------|------------|
| EC2 Compute | $42,000 | 49% |
| RDS Database | $18,000 | 21% |
| Data Transfer | $8,500 | 10% |
| S3 Storage | $7,000 | 8% |
| Other | $9,500 | 12% |
| **Total** | **$85,000** | **100%** |

### Optimization Actions

| Action | Monthly Savings | Implementation |
|--------|----------------|----------------|
| Delete orphaned resources | $8,000 | Day 1 |
| Stop unused dev environments | $4,000 | Day 2 |
| Right-size EC2 instances | $11,000 | Week 2 |
| Reserved Instances + Savings Plans | $15,000 | Week 3 |
| Graviton migration | $5,000 | Week 3 |
| S3 Intelligent-Tiering | $3,000 | Week 3 |
| Data transfer optimization | $2,500 | Week 3-4 |
| **Total Monthly Savings** | **$38,500** | |

### Cost Breakdown (After)

| Category | Before | After | Savings |
|----------|--------|-------|---------|
| EC2 Compute | $42,000 | $22,000 | 48% |
| RDS Database | $18,000 | $12,000 | 33% |
| Data Transfer | $8,500 | $5,000 | 41% |
| S3 Storage | $7,000 | $4,000 | 43% |
| Other | $9,500 | $3,500 | 63% |
| **Total** | **$85,000** | **$46,500** | **45%** |

## Results

### Financial Impact
- **45% cost reduction**: Exceeded 30% target
- **$38,500/month saved**: $462,000 annual savings
- **ROI timeline**: Investment recovered in first month
- **Sustained savings**: Built systems to maintain gains

### Operational Improvements
- **Better visibility**: Real-time cost dashboards
- **Predictable spending**: Budgets and forecasting
- **Team accountability**: Cost allocated to owners
- **Proactive management**: Alerts before overspending

### Performance Impact
- **Zero degradation**: All SLAs maintained
- **Improved performance**: Graviton instances are faster
- **Better scaling**: Auto-scaling responds to demand
- **Reduced waste**: Resources match actual needs

## Ongoing Governance

We implemented sustainable cost management:

1. **Weekly cost reviews**: 15-minute check on trends
2. **Monthly deep dives**: Detailed analysis and optimization
3. **Quarterly planning**: Capacity and reservation planning
4. **Tag enforcement**: All new resources must be tagged
5. **Budget alerts**: Immediate notification of anomalies

## Key Learnings

1. **Quick wins build momentum**: Finding immediate savings created stakeholder confidence

2. **Visibility enables action**: Teams can't optimize what they can't see

3. **Reserved capacity = guaranteed savings**: Predictable workloads should always use reservations

4. **Culture matters**: Sustainable savings require team buy-in

---

*Think your AWS bill is too high? [Contact us](/contact) for a free cost analysis. If we can't find 20% savings, the analysis is free.*
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
