'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Cloud,
  Shield,
  Code2,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Zap,
  Server,
  Lock,
  Cpu,
  HeadphonesIcon,
  Bot,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const serviceCategories = [
  {
    id: 'aws-infrastructure',
    icon: Cloud,
    title: 'AWS Infrastructure',
    tagline: 'Production-ready in days, not months',
    description:
      'Complete AWS infrastructure setup with VPC, compute, databases, and CI/CD. All delivered as Terraform code you own.',
    packages: [
      {
        name: 'Launchpad Starter',
        price: '$2,999',
        delivery: '7 days',
        description: 'Perfect for startups launching their first production app',
        features: [
          'AWS account setup with best practices',
          'VPC with public/private subnets',
          'EC2 or Fargate for your application',
          'RDS PostgreSQL or Aurora Serverless',
          'S3 + CloudFront CDN',
          'SSL certificates & IAM roles',
          'Complete Terraform code',
          '14-day support included',
        ],
      },
      {
        name: 'Launchpad Professional',
        price: '$7,999',
        delivery: '14 days',
        popular: true,
        description: 'For growing startups ready to professionalize',
        features: [
          'Everything in Starter, plus:',
          'CI/CD pipeline (GitHub Actions)',
          'Automated staging/production deploys',
          'CloudWatch dashboards & alarms',
          'Auto-scaling configuration',
          'Secrets Manager setup',
          'WAF rules & security groups',
          '30-day support included',
        ],
      },
      {
        name: 'Launchpad Enterprise',
        price: '$19,999',
        delivery: '21 days',
        description: 'Production-grade, multi-environment infrastructure',
        features: [
          'Everything in Professional, plus:',
          'Multi-environment (dev/staging/prod)',
          'AWS Organizations setup',
          'ECS or EKS orchestration',
          'GuardDuty & Security Hub',
          'Disaster recovery setup',
          'ElastiCache + SQS/SNS',
          '90-day support included',
        ],
      },
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'security-compliance',
    icon: Shield,
    title: 'Security & Compliance',
    tagline: 'Enterprise-ready security posture',
    description:
      'From quick security audits to full SOC 2 preparation. We help you meet compliance requirements and protect your infrastructure.',
    packages: [
      {
        name: 'Security Shield Audit',
        price: '$2,999',
        delivery: '5 days',
        description: 'Quick security health check',
        features: [
          'AWS Security Hub assessment',
          'IAM policy review',
          'Network security analysis',
          'S3 bucket security audit',
          'Public exposure scan',
          'Prioritized remediation roadmap',
          'Executive summary report',
          '30-minute review call',
        ],
      },
      {
        name: 'Security Shield Comprehensive',
        price: '$7,999',
        delivery: '10 days',
        popular: true,
        description: 'Full security posture assessment',
        features: [
          'Everything in Audit, plus:',
          'CloudTrail log analysis',
          'GuardDuty findings review',
          'Secrets management assessment',
          'Incident response plan review',
          'Compliance mapping (SOC2/HIPAA)',
          '8 hours remediation included',
          '60-minute executive briefing',
        ],
      },
      {
        name: 'SOC 2 Accelerator',
        price: '$24,999',
        delivery: '90 days',
        description: 'Complete SOC 2 Type 1 readiness',
        features: [
          'Gap analysis & readiness assessment',
          'Policy document generation (20+)',
          'Control implementation guidance',
          'Compliance platform setup',
          'Evidence collection system',
          'Employee training materials',
          'Auditor coordination',
          '90-day support through audit',
        ],
      },
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'application-development',
    icon: Code2,
    title: 'Application Development',
    tagline: 'Modern apps, AI-powered speed',
    description:
      'Next.js applications from landing pages to full-stack MVPs. Built with TypeScript, Tailwind, and AWS best practices.',
    packages: [
      {
        name: 'Landing Page Pro',
        price: '$2,999',
        delivery: '5 days',
        description: 'High-converting marketing sites',
        features: [
          'Custom Next.js 15 landing page',
          'Mobile-first responsive design',
          'Up to 5 sections/pages',
          'Contact form with email',
          'SEO optimization',
          'Analytics integration',
          '90+ Lighthouse score',
          'Vercel/Amplify deployment',
        ],
      },
      {
        name: 'MVP Builder',
        price: '$14,999',
        delivery: '4 weeks',
        popular: true,
        description: 'Full-stack apps for startups',
        features: [
          'Complete Next.js application',
          'User authentication (Cognito/Clerk)',
          'PostgreSQL + Prisma',
          '5-10 core features',
          'Admin dashboard',
          'REST or GraphQL API',
          'AWS deployment',
          '30-day support included',
        ],
      },
      {
        name: 'AI Integration Sprint',
        price: '$9,999',
        delivery: '2 weeks',
        description: 'Add AI to existing apps',
        features: [
          'AI use case discovery',
          'Claude/GPT/Bedrock integration',
          'RAG pipeline setup',
          'Prompt engineering',
          'Rate limiting & cost controls',
          'Production deployment',
          'Usage monitoring dashboard',
          '30-day support included',
        ],
      },
    ],
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    id: 'managed-services',
    icon: HeadphonesIcon,
    title: 'Managed Services',
    tagline: 'We run it, you build it',
    description:
      'Ongoing DevOps support and fully managed infrastructure. From advisory hours to complete infrastructure management.',
    packages: [
      {
        name: 'DevOps Guardian',
        price: 'From $1,999/mo',
        delivery: 'Ongoing',
        description: '8-40 hours monthly DevOps support',
        features: [
          'Dedicated support hours',
          'Infrastructure troubleshooting',
          'CI/CD maintenance',
          'Security patching',
          'Performance investigations',
          'Architecture consultations',
          'Slack channel access',
          '4-8 hour response SLA',
        ],
      },
      {
        name: 'Autopilot Managed',
        price: 'From $2,499/mo',
        delivery: 'Ongoing',
        popular: true,
        description: 'Full infrastructure management',
        features: [
          '24/7 monitoring & alerting',
          'Incident response & resolution',
          'Security patching & updates',
          'Monthly cost optimization',
          'Backup verification',
          '99.9%+ uptime SLA',
          'Weekly/monthly reviews',
          'Dedicated engineer',
        ],
      },
      {
        name: 'Fractional CTO',
        price: '$4,999/mo',
        delivery: '16 hrs/month',
        description: 'Senior technical leadership',
        features: [
          'Strategic technical planning',
          'Architecture decisions',
          'Vendor evaluations',
          'Team mentorship',
          'Hiring support',
          'Board/investor updates',
          'Weekly strategy sessions',
          'Async Slack access',
        ],
      },
    ],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
  },
]

const differentiators = [
  {
    icon: Clock,
    title: '70% Faster',
    description: 'AI-augmented workflows deliver in days what takes others weeks',
  },
  {
    icon: DollarSign,
    title: 'Fixed Pricing',
    description: 'No surprise bills. Know your costs upfront, every time.',
  },
  {
    icon: Zap,
    title: 'Senior Engineers',
    description: '10+ years experience. No juniors learning on your dime.',
  },
  {
    icon: Code2,
    title: 'You Own the Code',
    description: 'Full Terraform/IaC included. No vendor lock-in.',
  },
]

const specialOfferings = [
  {
    icon: Rocket,
    title: 'Free AWS Well-Architected Review',
    description: 'Professional assessment + $5,000 AWS credits for qualified workloads',
    cta: 'Book Free Review',
    href: '/contact?service=well-architected-review',
  },
  {
    icon: DollarSign,
    title: 'Cost Crusher Program',
    description: 'We find 20%+ savings or analysis is free. Pay 50% of first-year savings.',
    cta: 'Get Cost Analysis',
    href: '/contact?service=cost-optimization',
  },
  {
    icon: Zap,
    title: 'Emergency Response',
    description: '24/7 availability for critical incidents. 30-minute response time.',
    cta: 'Emergency Help',
    href: '/contact?service=emergency',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Bot className="w-3.5 h-3.5 mr-2" />
                  AI-Augmented Delivery
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Fixed-Price{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AWS & DevOps
                </span>{' '}
                Packages
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 mb-8"
              >
                Production infrastructure in days, not months. Senior engineers + AI tooling
                = enterprise quality at startup prices.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <Link href="/pricing">
                    View All Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/contact?service=well-architected-review">
                    Free AWS Review
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {differentiators.map((diff) => (
                <motion.div
                  key={diff.title}
                  variants={item}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                    <diff.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{diff.title}</h3>
                  <p className="text-sm text-slate-400">{diff.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-slate-900/50' : ''}`}
          >
            <div className="container-wide">
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} mb-6`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-cyan-400 font-medium mb-2">{category.tagline}</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </motion.div>

              {/* Package Cards */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {category.packages.map((pkg) => (
                  <motion.div
                    key={pkg.name}
                    variants={item}
                    className={`relative rounded-2xl border ${
                      pkg.popular
                        ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-transparent'
                        : 'border-slate-800 bg-slate-900/50'
                    } p-6`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                      <p className="text-sm text-slate-400 mb-4">{pkg.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">{pkg.price}</span>
                        <span className="text-slate-400">• {pkg.delivery}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                      asChild
                    >
                      <Link href={`/contact?service=${encodeURIComponent(pkg.name)}`}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        ))}

        {/* Special Offerings */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Special Programs
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Flexible options for every situation
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {specialOfferings.map((offering) => (
                <motion.div
                  key={offering.title}
                  variants={item}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                    <offering.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{offering.title}</h3>
                  <p className="text-slate-400 mb-6">{offering.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500/50 bg-cyan-500/10 text-white hover:bg-cyan-500/20 hover:border-cyan-400"
                    asChild
                  >
                    <Link href={offering.href}>
                      {offering.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Digital DevOps?
              </h2>
              <p className="text-lg text-slate-400">
                See how we compare to traditional options
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Service
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">
                      Traditional Firm
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">
                      Freelancer
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-cyan-400">
                      Digital DevOps
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-4 px-6 text-slate-300">AWS Setup</td>
                    <td className="py-4 px-6 text-slate-500">$25K-$50K</td>
                    <td className="py-4 px-6 text-slate-500">$5K-$15K</td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold">$2,999-$19,999</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-4 px-6 text-slate-300">Delivery Time</td>
                    <td className="py-4 px-6 text-slate-500">4-8 weeks</td>
                    <td className="py-4 px-6 text-slate-500">2-4 weeks</td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold">1-3 weeks</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-4 px-6 text-slate-300">SOC 2 Prep</td>
                    <td className="py-4 px-6 text-slate-500">$50K-$100K</td>
                    <td className="py-4 px-6 text-slate-500">N/A</td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold">$24,999</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-4 px-6 text-slate-300">Monthly Support</td>
                    <td className="py-4 px-6 text-slate-500">$15K-$30K</td>
                    <td className="py-4 px-6 text-slate-500">$5K-$10K</td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold">$1,999-$9,999</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-4 px-6 text-slate-300">IaC Included</td>
                    <td className="py-4 px-6 text-slate-500">Sometimes</td>
                    <td className="py-4 px-6 text-slate-500">Rarely</td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold">Always</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Book a free 30-minute consultation to discuss your infrastructure needs.
                No sales pitch, just honest advice.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <Link href="/contact">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/pricing">
                    View Full Pricing
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
