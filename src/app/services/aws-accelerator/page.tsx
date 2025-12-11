'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Clock,
  DollarSign,
  Server,
  Database,
  Shield,
  Zap,
  FileCode,
  Gift,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const packages = [
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
      'S3 bucket with CloudFront CDN',
      'SSL certificates (ACM)',
      'IAM roles with least-privilege',
      'Security groups configured',
      'Basic CloudWatch monitoring',
      'Complete Terraform code',
      'Architecture diagram',
      'Deployment runbook',
    ],
    deliverables: ['Terraform code', 'Architecture diagram', 'Runbook', '14-day support'],
  },
  {
    name: 'Launchpad Professional',
    price: '$7,999',
    delivery: '14 days',
    popular: true,
    description: 'For growing startups ready to professionalize their infrastructure',
    features: [
      'Everything in Starter, plus:',
      'CI/CD pipeline (GitHub Actions)',
      'Automated staging/production deploys',
      'CloudWatch dashboards & alarms',
      'SNS/PagerDuty alerting',
      'Auto-scaling configuration',
      'Secrets Manager setup',
      'S3 lifecycle policies',
      'Database automated backups',
      'Cost allocation tags',
      'Basic WAF rules',
      'Monitoring playbook',
    ],
    deliverables: ['All Starter deliverables', 'CI/CD pipeline code', 'Monitoring playbook', '30-day support'],
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
      'Advanced networking (Transit Gateway)',
      'ECS or EKS orchestration',
      'GuardDuty & Security Hub',
      'WAF with custom rules',
      'Disaster recovery setup',
      'Database read replicas',
      'ElastiCache for caching',
      'SQS/SNS for async processing',
      'CloudTrail audit logging',
    ],
    deliverables: ['All Pro deliverables', 'Multi-account architecture', 'DR runbook', '90-day support'],
  },
]

const whyUs = [
  {
    icon: Clock,
    title: '7-21 Day Delivery',
    description: 'What takes others months, we deliver in weeks using AI-augmented workflows.',
  },
  {
    icon: DollarSign,
    title: 'Fixed Pricing',
    description: 'No surprise bills. Know exactly what you pay before we start.',
  },
  {
    icon: FileCode,
    title: 'You Own Everything',
    description: 'Complete Terraform code, documentation, and runbooks. No vendor lock-in.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Every setup follows AWS Well-Architected Framework security best practices.',
  },
]

const included = [
  'AWS account organization',
  'VPC with proper networking',
  'Compute (EC2/ECS/Fargate)',
  'Database (RDS/Aurora)',
  'Storage (S3 + CDN)',
  'SSL certificates',
  'IAM security setup',
  'Monitoring basics',
  'Complete Terraform code',
  'Architecture diagrams',
  'Deployment runbooks',
  'Post-delivery support',
]


export const metadata = {
  title: 'AWS Launchpad & Accelerator Packages | Digital DevOps',
  description: 'Launch production-ready AWS infrastructure in 7-21 days. Fixed-price packages including Terraform code, CI/CD, and documentation.',
}

export default function AWSAcceleratorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Cloud className="w-3.5 h-3.5 mr-2" />
                  SMB & Startups
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                AWS{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Launchpad
                </span>{' '}
                Packages
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl"
              >
                Production-ready AWS infrastructure in 7-21 days. Fixed pricing,
                complete documentation, and Terraform code you own. No ongoing fees.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=aws-launchpad">
                    Get Started
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
                    Free AWS Review First
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Choose Your Package
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                All packages include complete Terraform code, documentation, and post-delivery support
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      {pkg.delivery} delivery
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      Deliverables
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.deliverables.map((d) => (
                        <Badge key={d} variant="outline" className="border-slate-700 text-slate-400">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>

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
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Every Package Includes
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Production-ready infrastructure with everything you need to run
                  your application securely and reliably.
                </p>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="w-6 h-6 text-cyan-400" />
                    <span className="font-semibold text-white">Plus: Free AWS Credits</span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Qualified workloads may receive up to $5,000 in AWS credits through
                    our AWS Partner status. Ask us about eligibility.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                From kickoff to handoff in as little as 7 days
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Kickoff Call', description: 'Review requirements, finalize scope, gather credentials' },
                { step: '2', title: 'Build', description: 'We provision your infrastructure using Terraform' },
                { step: '3', title: 'Review', description: 'Walk through everything, make any adjustments' },
                { step: '4', title: 'Handoff', description: 'Transfer code, docs, and knowledge to your team' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Migration Add-on */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
                    Add-On Service
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Need to Migrate?
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Moving from another cloud, on-premise, or a messy existing AWS setup?
                    We handle full migrations with minimal downtime.
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-white">$14,999 - $49,999</span>
                    <span className="text-slate-400">based on complexity</span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                    asChild
                  >
                    <Link href="/contact?service=aws-migration">
                      Discuss Migration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Current state assessment',
                    'Migration planning',
                    'Infrastructure provisioning',
                    'Data migration',
                    'DNS cutover',
                    'Parallel running period',
                    'Post-migration optimization',
                    'Documentation',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready for Production AWS?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Get a free AWS Well-Architected Review first, or jump straight into a package.
                Either way, we&apos;ll have you production-ready in weeks.
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
                  <Link href="/contact?service=aws-launchpad">
                    Get Started Now
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
      </main>
      <Footer />
    </>
  )
}
