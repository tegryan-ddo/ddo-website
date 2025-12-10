// DevAIOps Service Packages Data
// Focused on: Enterprise consulting, bespoke AWS, and managed hosting for AI apps

export interface ServicePackage {
  id: string
  name: string
  tagline: string
  price: string
  priceNote?: string
  delivery?: string
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

// Main service tiers
export const serviceTiers: ServicePackage[] = [
  {
    id: 'repo-to-production',
    name: 'Repo to Production',
    tagline: 'Enterprise hosting at startup prices',
    price: 'From $299',
    priceNote: '/month',
    description: 'Give us your Git repo—any language, any stack. We deploy it on enterprise-grade, SOC 2 compliant AWS infrastructure. You focus on code, we handle everything else.',
    features: [
      'Any language, any framework, any stack',
      'SOC 2 compliant infrastructure included',
      'Auto-scaling & high availability',
      'SSL, CDN, and DDoS protection',
      'CI/CD from your repo (GitHub, GitLab, etc.)',
      'Monitoring, logging, and alerting',
      'Database hosting available',
      'Zero DevOps required from you',
    ],
    highlighted: true,
    cta: 'Get Started',
    ctaLink: '/contact?service=repo-to-production',
  },
  {
    id: 'growth-infrastructure',
    name: 'Growth Infrastructure',
    tagline: 'Custom architecture for scale',
    price: 'From $25K',
    description: 'Bespoke AWS architecture for AI/tech startups that have outgrown basic hosting. We solve scaling challenges, optimize costs, and build infrastructure that grows with you.',
    features: [
      'Custom AWS architecture design',
      'Multi-environment setup (dev/staging/prod)',
      'Auto-scaling for unpredictable traffic',
      'CI/CD pipelines with GitOps',
      'Cost optimization from day one',
      'Complete Terraform/IaC codebase',
      'Performance tuning for AI workloads',
      '90-day support included',
    ],
    cta: 'Schedule Consultation',
    ctaLink: '/contact?service=growth-infrastructure',
  },
  {
    id: 'enterprise-devops',
    name: 'Enterprise DevOps',
    tagline: 'Full infrastructure takeover',
    price: 'Custom',
    description: 'We become your DevOps team. Ideal for companies that need senior expertise without the hiring challenge. Full ownership of your infrastructure operations.',
    features: [
      'Dedicated senior DevOps engineers',
      'Complete infrastructure management',
      '24/7 monitoring & incident response',
      'Security hardening & compliance',
      'Platform engineering & developer experience',
      'Capacity planning & cost optimization',
      'Quarterly architecture reviews',
      'Direct Slack/Teams integration',
    ],
    cta: 'Talk to Us',
    ctaLink: '/contact?service=enterprise-devops',
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance',
    tagline: 'SOC 2, HIPAA, enterprise-ready',
    price: 'From $15K',
    description: 'For startups selling to enterprise or handling sensitive data. We get you audit-ready and help you close bigger deals faster.',
    features: [
      'Security architecture review',
      'Compliance gap analysis',
      'SOC 2 Type I/II preparation',
      'HIPAA compliance implementation',
      'Policy & procedure documentation',
      'Evidence collection automation',
      'Auditor coordination',
      'Penetration testing available',
    ],
    cta: 'Get Compliant',
    ctaLink: '/contact?service=security-compliance',
  },
]

// Repo to Production pricing tiers
export const repoToProductionTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$299',
    priceNote: '/month',
    description: 'Perfect for indie hackers, MVPs, and early-stage projects.',
    features: [
      '1 application',
      '2 environments (staging + prod)',
      'Shared infrastructure',
      'SSL & CDN included',
      'Basic monitoring',
      '5GB database included',
      'Email support',
    ],
    cta: 'Get Started',
    ctaLink: '/contact?service=repo-starter',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$799',
    priceNote: '/month',
    description: 'For growing apps that need more power and dedicated resources.',
    features: [
      'Up to 3 applications',
      '3 environments (dev + staging + prod)',
      'Dedicated compute resources',
      'Auto-scaling included',
      'Advanced monitoring & alerting',
      '25GB database included',
      'Priority support',
      'Custom domain SSL',
    ],
    highlighted: true,
    cta: 'Most Popular',
    ctaLink: '/contact?service=repo-professional',
  },
  {
    id: 'business',
    name: 'Business',
    price: '$1,999',
    priceNote: '/month',
    description: 'Enterprise features for serious applications with compliance needs.',
    features: [
      'Up to 10 applications',
      'Unlimited environments',
      'Dedicated VPC',
      'SOC 2 compliant infrastructure',
      'SLA guarantee (99.9% uptime)',
      '100GB database included',
      '24/7 support',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact?service=repo-business',
  },
]

// Ideal customer profiles for targeting
export const idealCustomers = [
  {
    id: 'indie-developers',
    title: 'Indie Developers & AI Builders',
    description: 'Solo developers and small teams building AI apps who want enterprise infrastructure without the complexity.',
    challenges: [
      'Don\'t want to learn Kubernetes/AWS',
      'Need SOC 2 for enterprise customers',
      'Want to focus on code, not infrastructure',
      'Tired of Vercel/Heroku limitations',
    ],
  },
  {
    id: 'ai-startups',
    title: 'AI/ML Startups',
    description: 'Building AI products with GPU workloads, model serving, or data pipelines that need to scale.',
    challenges: [
      'GPU infrastructure costs spiraling',
      'Model serving latency issues',
      'Data pipeline bottlenecks',
      'Scaling inference endpoints',
    ],
  },
  {
    id: 'series-a-b',
    title: 'Series A/B Companies',
    description: 'Post-product-market-fit startups experiencing rapid growth and infrastructure growing pains.',
    challenges: [
      'Outgrowing Vercel/Heroku/basic setups',
      'Need SOC 2 to close enterprise deals',
      'Database performance issues',
      'Cloud costs increasing faster than revenue',
    ],
  },
  {
    id: 'enterprise-teams',
    title: 'Enterprise Teams',
    description: 'Companies that need senior DevOps expertise but struggle to hire in a competitive market.',
    challenges: [
      'DevOps team is a bottleneck',
      'Security/compliance requirements growing',
      'Modernization projects stalled',
      'Need experienced architects, not juniors',
    ],
  },
]

// What we solve - problem-focused messaging
export const problemsSolved = [
  {
    problem: 'Just want to ship code',
    solution: 'Give us your repo. We handle deployment, scaling, security, and compliance.',
  },
  {
    problem: 'Need SOC 2 but can\'t afford enterprise prices',
    solution: 'SOC 2 compliant hosting starting at $299/month. Enterprise security, startup pricing.',
  },
  {
    problem: 'Outgrowing basic hosting',
    solution: 'Custom AWS architecture that scales with your business, not against it.',
  },
  {
    problem: 'Cloud costs growing faster than revenue',
    solution: 'Architecture optimization that typically saves 30-50% on AWS spend.',
  },
  {
    problem: 'Can\'t hire senior DevOps engineers',
    solution: 'Fractional DevOps team with 10+ years experience, available when you need us.',
  },
  {
    problem: 'AI workloads hitting infrastructure limits',
    solution: 'GPU-optimized infrastructure, model serving, and ML pipeline architecture.',
  },
]

// Homepage service highlights - updated with Repo to Production
export const serviceHighlights = [
  {
    id: 'repo-to-production',
    name: 'Repo to Production',
    description: 'Give us your Git repo. Any stack, any language. Enterprise-grade, SOC 2 compliant hosting from $299/mo.',
    icon: 'GitBranch',
    color: 'from-emerald-500 to-teal-500',
    startingPrice: 'From $299/mo',
    link: '/services/repo-to-production',
  },
  {
    id: 'growth-infrastructure',
    name: 'Growth Infrastructure',
    description: 'Bespoke AWS for Series A/B startups. Custom architecture designed for your specific scaling needs.',
    icon: 'Cloud',
    color: 'from-blue-500 to-cyan-500',
    startingPrice: 'From $25K',
    link: '/services/aws-accelerator',
  },
  {
    id: 'enterprise-devops',
    name: 'Enterprise DevOps',
    description: 'We become your DevOps team. Senior engineers, 24/7 support, complete infrastructure ownership.',
    icon: 'Settings',
    color: 'from-violet-500 to-purple-500',
    startingPrice: 'Custom',
    link: '/services/enterprise-devops',
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance',
    description: 'SOC 2, HIPAA, and enterprise security. Get audit-ready and close bigger deals.',
    icon: 'Shield',
    color: 'from-orange-500 to-amber-500',
    startingPrice: 'From $15K',
    link: '/services/security',
  },
]

// Stats for social proof
export const companyStats = [
  { label: 'Hosting', value: '$299', subtext: '/mo starting' },
  { label: 'Time to SOC 2', value: '90', subtext: 'days' },
  { label: 'Client Retention', value: '95%', subtext: 'rate' },
  { label: 'Experience', value: '10+', subtext: 'years' },
]

// Comparison data - now includes hosting comparison
export const comparisonData = {
  headers: ['', 'Vercel/Heroku', 'DIY AWS', 'DevAIOps'],
  rows: [
    ['SOC 2 Compliant', 'Enterprise only ($$$)', 'You build it', 'Included from $299/mo'],
    ['Any Stack Support', 'Limited', 'Yes (complex)', 'Yes (we handle it)'],
    ['Auto-scaling', 'Basic', 'You configure', 'Included'],
    ['DevOps Required', 'Some', 'Extensive', 'Zero'],
    ['Custom Architecture', 'No', 'Yes', 'Yes'],
    ['Enterprise Support', '$$$', 'N/A', 'Included'],
  ],
}

// Testimonials/social proof
export const clientTypes = [
  'AI/ML startups',
  'Indie developers',
  'Series A-C companies',
  'Healthcare tech',
  'FinTech',
  'B2B SaaS',
]

// Legacy exports for backwards compatibility (can be removed after full migration)
export const awsLaunchpadPackages: ServicePackage[] = []
export const securityPackages: ServicePackage[] = []
export const supportPackages: ServicePackage[] = []
export const autopilotPackages: ServicePackage[] = []
export const developmentPackages: ServicePackage[] = []
export const specialOfferings: { id: string; name: string; price: string; description: string; cta: string; ctaLink: string }[] = []
export const bundles: ServicePackage[] = []
