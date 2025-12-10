// DevAIOps Service Packages Data

export interface ServicePackage {
  id: string
  name: string
  tagline: string
  price: string
  priceNote?: string
  delivery: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
  ctaLink: string
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  packages: ServicePackage[]
}

// One-time AWS Infrastructure Packages
export const awsLaunchpadPackages: ServicePackage[] = [
  {
    id: 'launchpad-starter',
    name: 'Launchpad Starter',
    tagline: 'Get to production fast',
    price: '$2,999',
    delivery: '7 days',
    description: 'Perfect for startups launching their first production app. Everything you need to go live securely.',
    features: [
      'AWS account setup with best practices',
      'VPC with public/private subnets',
      'EC2 or Fargate for your application',
      'RDS PostgreSQL or Aurora Serverless',
      'S3 + CloudFront CDN',
      'SSL certificates & IAM roles',
      'Basic CloudWatch monitoring',
      'Complete Terraform code',
      '14-day support included',
    ],
    cta: 'Get Started',
    ctaLink: '/contact?package=launchpad-starter',
  },
  {
    id: 'launchpad-professional',
    name: 'Launchpad Professional',
    tagline: 'Production-ready infrastructure',
    price: '$7,999',
    delivery: '14 days',
    description: 'For growing startups ready to professionalize. CI/CD, monitoring, and auto-scaling included.',
    features: [
      'Everything in Starter',
      'CI/CD pipeline (GitHub Actions)',
      'Automated deployments',
      'CloudWatch dashboards & alarms',
      'PagerDuty/SNS alerting',
      'Auto-scaling configuration',
      'Secrets Manager setup',
      'Basic WAF rules',
      '30-day support included',
    ],
    highlighted: true,
    cta: 'Most Popular',
    ctaLink: '/contact?package=launchpad-professional',
  },
  {
    id: 'launchpad-enterprise',
    name: 'Launchpad Enterprise',
    tagline: 'Multi-environment, compliance-ready',
    price: '$19,999',
    delivery: '21 days',
    description: 'Production-grade, multi-environment infrastructure for companies with serious requirements.',
    features: [
      'Everything in Professional',
      'Multi-environment (dev/staging/prod)',
      'AWS Organizations multi-account',
      'ECS or EKS container orchestration',
      'GuardDuty, Security Hub, Inspector',
      'WAF with custom rules',
      'Disaster recovery setup',
      'Database read replicas',
      '90-day support included',
    ],
    cta: 'Talk to Us',
    ctaLink: '/contact?package=launchpad-enterprise',
  },
]

// Security Packages
export const securityPackages: ServicePackage[] = [
  {
    id: 'security-audit',
    name: 'Security Shield Audit',
    tagline: 'Quick security health check',
    price: '$2,999',
    delivery: '5 days',
    description: 'Fast, thorough assessment of your AWS security posture with prioritized remediation roadmap.',
    features: [
      'AWS Security Hub assessment',
      'IAM policy review',
      'Network security analysis',
      'S3 bucket security audit',
      'Encryption review',
      'Public exposure scan',
      'Executive summary report',
      'Prioritized remediation roadmap',
    ],
    cta: 'Book Audit',
    ctaLink: '/contact?package=security-audit',
  },
  {
    id: 'security-comprehensive',
    name: 'Security Shield Comprehensive',
    tagline: 'Full security posture assessment',
    price: '$7,999',
    delivery: '10 days',
    description: 'Complete security assessment with compliance mapping and 8 hours of remediation included.',
    features: [
      'Everything in Audit',
      'CloudTrail log analysis',
      'GuardDuty findings review',
      'Secrets management assessment',
      'Backup and DR review',
      'Compliance mapping (SOC2/HIPAA/PCI)',
      '8 hours remediation included',
      '60-minute executive briefing',
    ],
    highlighted: true,
    cta: 'Get Protected',
    ctaLink: '/contact?package=security-comprehensive',
  },
  {
    id: 'soc2-accelerator',
    name: 'SOC 2 Accelerator',
    tagline: 'Audit-ready in 90 days',
    price: '$24,999',
    delivery: '90 days',
    description: 'Complete SOC 2 Type 1 readiness program. From gap analysis to audit coordination.',
    features: [
      'SOC 2 Type 1 readiness assessment',
      'Gap analysis & control mapping',
      'AI-assisted policy generation (20+ docs)',
      'Evidence collection system setup',
      'Security tool configuration',
      'Compliance platform setup',
      'Auditor selection & coordination',
      '90-day support through audit',
    ],
    cta: 'Start Compliance',
    ctaLink: '/contact?package=soc2-accelerator',
  },
  {
    id: 'penetration-test',
    name: 'Penetration Test',
    tagline: 'Prove your security',
    price: '$7,999',
    delivery: '10 days',
    description: 'External and web application penetration testing with detailed report and attestation letter.',
    features: [
      'External network pen test',
      'Web application testing (OWASP Top 10)',
      'API security assessment',
      'Authentication testing',
      'Business logic testing',
      'Technical findings report',
      'Remediation recommendations',
      'Re-test & attestation letter',
    ],
    cta: 'Book Test',
    ctaLink: '/contact?package=penetration-test',
  },
]

// Monthly Support Packages
export const supportPackages: ServicePackage[] = [
  {
    id: 'guardian-essential',
    name: 'Guardian Essential',
    tagline: 'Expert help when you need it',
    price: '$1,999',
    priceNote: '/month',
    delivery: '8 hours included',
    description: 'Ideal for startups that need occasional expert DevOps help without a full-time commitment.',
    features: [
      '8 hours DevOps support/month',
      'Business hours support (9am-6pm PT)',
      '8-hour response SLA',
      'Monthly infrastructure review',
      'Slack channel access',
      'Hours roll over (2 month max)',
    ],
    cta: 'Start Plan',
    ctaLink: '/contact?package=guardian-essential',
  },
  {
    id: 'guardian-professional',
    name: 'Guardian Professional',
    tagline: 'Regular DevOps support',
    price: '$4,999',
    priceNote: '/month',
    delivery: '20 hours included',
    description: 'For growing companies with regular DevOps needs and faster response requirements.',
    features: [
      '20 hours DevOps support/month',
      'Extended hours (7am-10pm PT)',
      '4-hour response SLA',
      'Weekly check-in call',
      'Basic 24/7 monitoring',
      'Quarterly security review',
    ],
    highlighted: true,
    cta: 'Most Popular',
    ctaLink: '/contact?package=guardian-professional',
  },
  {
    id: 'guardian-enterprise',
    name: 'Guardian Enterprise',
    tagline: 'Always-on support',
    price: '$9,999',
    priceNote: '/month',
    delivery: '40 hours included',
    description: 'Reliable, always-on support with dedicated engineer and comprehensive SLAs.',
    features: [
      '40 hours DevOps support/month',
      '24/7 support availability',
      '2-hour response SLA',
      '24/7 monitoring + incident response',
      'Dedicated primary engineer',
      'Quarterly roadmap planning',
    ],
    cta: 'Talk to Us',
    ctaLink: '/contact?package=guardian-enterprise',
  },
]

// Managed Infrastructure (Autopilot) Packages
export const autopilotPackages: ServicePackage[] = [
  {
    id: 'autopilot-startup',
    name: 'Autopilot Startup',
    tagline: 'Full management, startup price',
    price: '$2,499',
    priceNote: '/month',
    delivery: 'Up to $5K AWS spend',
    description: 'We manage your entire AWS infrastructure so you can focus on building your product.',
    features: [
      'Full infrastructure management',
      '24/7 monitoring & alerting',
      'Incident response & resolution',
      'Security patching & updates',
      'Monthly cost optimization',
      'Backup verification',
      '99.9% uptime SLA',
    ],
    cta: 'Start Autopilot',
    ctaLink: '/contact?package=autopilot-startup',
  },
  {
    id: 'autopilot-growth',
    name: 'Autopilot Growth',
    tagline: 'Scale with confidence',
    price: '$4,999',
    priceNote: '/month',
    delivery: 'Up to $20K AWS spend',
    description: 'For scaling startups that need multi-environment management and proactive optimization.',
    features: [
      'Everything in Startup',
      'Multi-environment management',
      'CI/CD pipeline management',
      'Weekly cost optimization',
      'Performance tuning',
      'Quarterly DR testing',
      '99.95% uptime SLA',
    ],
    highlighted: true,
    cta: 'Scale Up',
    ctaLink: '/contact?package=autopilot-growth',
  },
  {
    id: 'autopilot-scale',
    name: 'Autopilot Scale',
    tagline: 'Enterprise-grade managed services',
    price: '$9,999',
    priceNote: '/month',
    delivery: 'Up to $50K AWS spend',
    description: 'Comprehensive management for growth-stage companies with compliance needs.',
    features: [
      'Everything in Growth',
      'Multi-account management',
      'Advanced security monitoring',
      'Compliance maintenance',
      'Capacity planning',
      'Dedicated team',
      '99.99% uptime SLA',
    ],
    cta: 'Go Enterprise',
    ctaLink: '/contact?package=autopilot-scale',
  },
]

// Development Packages
export const developmentPackages: ServicePackage[] = [
  {
    id: 'landing-page',
    name: 'Landing Page Pro',
    tagline: 'Launch in 5 days',
    price: '$2,999',
    delivery: '5 days',
    description: 'Custom Next.js landing page with modern design, SEO optimization, and fast deployment.',
    features: [
      'Custom Next.js 15 design',
      'Responsive (mobile-first)',
      'Up to 5 sections/pages',
      'Contact form with email',
      'SEO optimization',
      'Analytics integration',
      '90+ Lighthouse score',
      '14-day support',
    ],
    cta: 'Build Landing Page',
    ctaLink: '/contact?package=landing-page',
  },
  {
    id: 'mvp-builder',
    name: 'MVP Builder',
    tagline: 'From idea to product',
    price: '$14,999',
    delivery: '4 weeks',
    description: 'Full Next.js application with authentication, database, and 5-10 core features.',
    features: [
      'Full Next.js application',
      'User authentication',
      'PostgreSQL + Prisma',
      '5-10 core features',
      'Admin dashboard',
      'REST or GraphQL API',
      'AWS deployment',
      '30-day support',
    ],
    highlighted: true,
    cta: 'Build MVP',
    ctaLink: '/contact?package=mvp-builder',
  },
  {
    id: 'ai-integration',
    name: 'AI Integration Sprint',
    tagline: 'Add AI to your app',
    price: '$9,999',
    delivery: '2 weeks',
    description: 'Integrate LLMs, RAG pipelines, or custom AI features into your existing application.',
    features: [
      'AI use case discovery',
      'LLM integration (Claude/GPT/Bedrock)',
      'RAG pipeline setup',
      'Prompt engineering',
      'Rate limiting & cost controls',
      'Production deployment',
      'Usage monitoring',
      '30-day support',
    ],
    cta: 'Add AI',
    ctaLink: '/contact?package=ai-integration',
  },
]

// Special Offerings
export const specialOfferings = [
  {
    id: 'well-architected-review',
    name: 'Free AWS Well-Architected Review',
    price: 'FREE',
    description: 'Professional assessment of your AWS infrastructure against the 5 Well-Architected pillars. Qualified workloads receive $5,000 in AWS credits.',
    cta: 'Book Free Review',
    ctaLink: '/contact?package=well-architected-review',
  },
  {
    id: 'cost-crusher',
    name: 'Cost Crusher Program',
    price: 'Performance-Based',
    description: 'We analyze and optimize your AWS costs. Pay 50% of first-year savings. Guarantee: 20% savings or analysis is free.',
    cta: 'Crush Costs',
    ctaLink: '/contact?package=cost-crusher',
  },
  {
    id: 'emergency-response',
    name: 'Emergency Response',
    price: '$2,999',
    description: '24/7 emergency support for security incidents, outages, or critical issues. 30-minute response time.',
    cta: 'Get Emergency Help',
    ctaLink: '/contact?package=emergency-response',
  },
]

// Bundles
export const bundles: ServicePackage[] = [
  {
    id: 'complete-startup-stack',
    name: 'Complete Startup Stack',
    tagline: 'Everything to launch',
    price: '$29,999',
    priceNote: 'Save $7,000+',
    delivery: '8 weeks',
    description: 'AWS infrastructure + Next.js MVP + Security audit + 3 months support. Everything a startup needs.',
    features: [
      'AWS Launchpad Professional ($7,999)',
      'Next.js MVP Builder ($14,999)',
      'Security Shield Audit ($2,999)',
      '3 months Guardian Essential ($5,997)',
      'Total value: $31,994',
    ],
    highlighted: true,
    cta: 'Get the Stack',
    ctaLink: '/contact?package=complete-startup-stack',
  },
  {
    id: 'scale-up-security',
    name: 'Scale-Up Security Bundle',
    tagline: 'Enterprise customer ready',
    price: '$39,999',
    priceNote: 'Save $5,000+',
    delivery: '16 weeks',
    description: 'SOC 2 compliance + comprehensive security + pen test + 3 months professional support.',
    features: [
      'SOC 2 Accelerator ($24,999)',
      'Security Shield Comprehensive ($7,999)',
      'Penetration Test ($7,999)',
      '3 months Guardian Professional ($14,997)',
      'Total value: $55,994',
    ],
    cta: 'Get Compliant',
    ctaLink: '/contact?package=scale-up-security',
  },
]

// Homepage service highlights
export const serviceHighlights = [
  {
    id: 'aws-infrastructure',
    name: 'AWS Infrastructure',
    description: 'Production-ready AWS setup in 1-3 weeks. VPC, compute, databases, CI/CD, monitoring - all with Terraform.',
    icon: 'Cloud',
    color: 'from-blue-500 to-cyan-500',
    startingPrice: '$2,999',
    link: '/services#aws-infrastructure',
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance',
    description: 'Security audits, SOC 2 prep, pen testing, and HIPAA compliance. Audit-ready in 90 days.',
    icon: 'Shield',
    color: 'from-red-500 to-orange-500',
    startingPrice: '$2,999',
    link: '/services#security',
  },
  {
    id: 'devops-support',
    name: 'DevOps Support',
    description: 'Monthly retainer for ongoing DevOps help. From 8 hours/month to 24/7 dedicated support.',
    icon: 'Headphones',
    color: 'from-violet-500 to-purple-500',
    startingPrice: '$1,999/mo',
    link: '/services#support',
  },
  {
    id: 'managed-infrastructure',
    name: 'Managed Infrastructure',
    description: 'We run your AWS. You focus on your product. Full monitoring, incident response, and optimization.',
    icon: 'Settings',
    color: 'from-emerald-500 to-teal-500',
    startingPrice: '$2,499/mo',
    link: '/services#managed',
  },
  {
    id: 'app-development',
    name: 'Next.js Development',
    description: 'Landing pages to full applications. AI-assisted development for faster delivery.',
    icon: 'Code',
    color: 'from-pink-500 to-rose-500',
    startingPrice: '$2,999',
    link: '/services#development',
  },
  {
    id: 'ai-integration',
    name: 'AI Integration',
    description: 'Add Claude, GPT, or Bedrock to your app. RAG pipelines, chatbots, and custom AI features.',
    icon: 'Brain',
    color: 'from-amber-500 to-yellow-500',
    startingPrice: '$9,999',
    link: '/services#ai',
  },
]

// Stats for social proof
export const companyStats = [
  { label: 'Deployments', value: '150+', subtext: 'this year' },
  { label: 'AWS Savings', value: '$2M+', subtext: 'for clients' },
  { label: 'Avg Delivery', value: '10x', subtext: 'faster' },
  { label: 'Uptime', value: '99.9%', subtext: 'maintained' },
]

// Comparison data
export const comparisonData = {
  headers: ['Metric', 'Traditional Consultancy', 'Freelancer', 'DevAIOps'],
  rows: [
    ['AWS Setup', '$25,000-50,000', '$5,000-15,000', '$2,999-19,999'],
    ['Delivery Time', '4-8 weeks', '2-4 weeks', '1-3 weeks'],
    ['SOC 2 Prep', '$50,000-100,000', 'N/A', '$24,999'],
    ['Monthly Support', '$15,000-30,000', '$5,000-10,000', '$1,999-9,999'],
    ['Documentation', 'Extra cost', 'Minimal', 'Always included'],
    ['Infrastructure as Code', 'Sometimes', 'Rarely', 'Always'],
  ],
}
