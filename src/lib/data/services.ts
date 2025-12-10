// DevAIOps Service Packages Data
// Focused on: Enterprise consulting & Bespoke AWS for fast-growing AI/tech startups

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

// Main service tiers - simplified for enterprise/growth focus
export const serviceTiers: ServicePackage[] = [
  {
    id: 'growth-infrastructure',
    name: 'Growth Infrastructure',
    tagline: 'For Series A/B startups hitting scale',
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
    highlighted: true,
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

// Ideal customer profiles for targeting
export const idealCustomers = [
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
    problem: 'Outgrowing basic hosting',
    solution: 'Custom AWS architecture that scales with your business, not against it.',
  },
  {
    problem: 'Need SOC 2 to close enterprise deals',
    solution: 'Audit-ready in 90 days with our compliance acceleration program.',
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

// Homepage service highlights - simplified
export const serviceHighlights = [
  {
    id: 'growth-infrastructure',
    name: 'Growth Infrastructure',
    description: 'Bespoke AWS for Series A/B startups. Scale confidently with architecture designed for your specific needs.',
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
    color: 'from-emerald-500 to-teal-500',
    startingPrice: 'From $15K',
    link: '/services/security',
  },
]

// Stats for social proof
export const companyStats = [
  { label: 'Avg Savings', value: '40%', subtext: 'on AWS costs' },
  { label: 'Time to SOC 2', value: '90', subtext: 'days' },
  { label: 'Client Retention', value: '95%', subtext: 'rate' },
  { label: 'Experience', value: '10+', subtext: 'years' },
]

// Comparison data - enterprise focused
export const comparisonData = {
  headers: ['', 'Big 4 Consultancy', 'Freelancer', 'DevAIOps'],
  rows: [
    ['Typical Engagement', '$150K-500K', '$10K-30K', '$25K-100K'],
    ['Team Experience', 'Mixed (often juniors)', 'Variable', 'Senior only (10+ yrs)'],
    ['Delivery Speed', '3-6 months', '1-2 months', '3-6 weeks'],
    ['AI/ML Expertise', 'Limited', 'Rare', 'Core competency'],
    ['Post-Delivery Support', 'Extra cost', 'Limited', 'Included'],
    ['Infrastructure as Code', 'Sometimes', 'Rarely', 'Always'],
  ],
}

// Testimonials/social proof
export const clientTypes = [
  'AI/ML startups',
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
