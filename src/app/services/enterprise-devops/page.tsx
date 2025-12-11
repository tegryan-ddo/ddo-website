'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Bot,
  Server,
  GitBranch,
  Lock,
  BarChart3,
  Headphones,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const capabilities = [
  {
    icon: Server,
    title: 'Infrastructure Architecture',
    description: 'Complete AWS infrastructure design and implementation using Terraform, from VPC to production.',
  },
  {
    icon: GitBranch,
    title: 'CI/CD Excellence',
    description: 'GitHub Actions, GitLab CI, or Jenkins pipelines with automated testing, security scanning, and deployments.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'SOC 2, HIPAA, PCI-DSS compliance implementation with continuous security monitoring.',
  },
  {
    icon: BarChart3,
    title: 'Cost Optimization',
    description: 'FinOps practices that typically reduce AWS spend by 30-50% while improving performance.',
  },
  {
    icon: Headphones,
    title: '24/7 Operations',
    description: 'Optional round-the-clock monitoring, incident response, and on-call coverage.',
  },
  {
    icon: Bot,
    title: 'AI-Augmented Velocity',
    description: 'AI-assisted code review, documentation, and monitoring that multiplies our output.',
  },
]

const deliverables = [
  'Complete infrastructure as code (Terraform)',
  'CI/CD pipelines with automated testing',
  'Security hardening and compliance documentation',
  'Monitoring dashboards and alerting',
  'Runbooks and operational procedures',
  'Knowledge transfer and team training',
  'Architecture decision records (ADRs)',
  'Cost optimization recommendations',
]

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Deep dive into your current infrastructure, pain points, and objectives. We audit everything.',
    duration: '1-2 weeks',
  },
  {
    step: '02',
    title: 'Architecture',
    description: 'Design the target state with detailed architecture diagrams, cost projections, and migration plan.',
    duration: '1 week',
  },
  {
    step: '03',
    title: 'Build',
    description: 'AI-augmented implementation at 10x speed. Full IaC, CI/CD, security, and monitoring.',
    duration: '4-8 weeks',
  },
  {
    step: '04',
    title: 'Operate',
    description: 'Ongoing management, optimization, and support. We become your DevOps team.',
    duration: 'Ongoing',
  },
]

const comparison = [
  { metric: 'Time to production', traditional: '4-6 months', devaiops: '4-8 weeks' },
  { metric: 'Team size required', traditional: '3-5 engineers', devaiops: '1 senior + AI' },
  { metric: 'Documentation', traditional: 'Manual, often outdated', devaiops: 'Auto-generated, always current' },
  { metric: 'Security scanning', traditional: 'Weekly or manual', devaiops: 'Every commit, automated' },
  { metric: 'Cost visibility', traditional: 'Monthly reports', devaiops: 'Real-time dashboards' },
]


export const metadata = {
  title: 'Enterprise DevOps & Infrastructure Takeover | Digital DevOps',
  description: 'Complete DevOps function ownership. We become your DevOps team - architecting, building, and operating your AWS infrastructure.',
}

export default function EnterpriseDevOpsPage() {
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
                <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Users className="w-3.5 h-3.5 mr-2" />
                  Enterprise Service
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Full Infrastructure{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Takeover
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl"
              >
                We become your DevOps team. AI-augmented senior engineers who architect,
                build, secure, and operate your AWS infrastructure at 10x the speed of
                traditional consultancies.
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
                  <Link href="/contact?service=enterprise-devops">
                    Schedule Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/case-studies">
                    View Case Studies
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10x', label: 'Faster Delivery' },
                { value: '$2M+', label: 'Client Savings' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '50+', label: 'Enterprise Projects' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                What We Take Over
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Complete DevOps function ownership—from architecture to operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                    <cap.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-slate-400">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-slate-900/50">
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
                A proven process refined over 50+ enterprise engagements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 h-full">
                    <div className="text-5xl font-bold text-slate-800 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 mb-4">{step.description}</p>
                    <Badge variant="outline" className="border-slate-700 text-slate-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-800" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Traditional vs DevAIOps
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                See why AI-augmented DevOps delivers faster at lower cost
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
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">Metric</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">Traditional Consulting</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-cyan-400">DevAIOps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {comparison.map((row) => (
                    <tr key={row.metric} className="hover:bg-slate-900/50">
                      <td className="py-4 px-6 text-slate-300">{row.metric}</td>
                      <td className="py-4 px-6 text-slate-500">{row.traditional}</td>
                      <td className="py-4 px-6 text-cyan-400 font-semibold">{row.devaiops}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  What You Get
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Every engagement includes comprehensive deliverables that
                  become your property. No lock-in, no dependencies.
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=enterprise-devops">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Engagement Models
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Flexible options to match your needs and budget
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Project-Based',
                  price: '$75K - $250K',
                  description: 'Defined scope with clear deliverables',
                  features: ['Fixed timeline', 'Specific outcomes', 'Knowledge transfer', 'Post-project support'],
                },
                {
                  title: 'Monthly Retainer',
                  price: '$25K - $50K/mo',
                  description: 'Ongoing DevOps team augmentation',
                  features: ['Dedicated capacity', 'Flexible priorities', 'Continuous improvement', '24/7 support option'],
                  popular: true,
                },
                {
                  title: 'Full Takeover',
                  price: 'Custom',
                  description: 'We become your DevOps department',
                  features: ['Complete ownership', 'Hiring & training', 'Strategic planning', 'Executive reporting'],
                },
              ].map((tier, i) => (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl border p-6 ${
                    tier.popular
                      ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-transparent'
                      : 'border-slate-800 bg-slate-900/50'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-1">{tier.title}</h3>
                  <div className="text-2xl font-bold text-white mb-2">{tier.price}</div>
                  <p className="text-slate-400 mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                    asChild
                  >
                    <Link href="/contact?service=enterprise-devops">
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready to 10x Your DevOps?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Schedule a free discovery call. We&apos;ll audit your current state
                and show you exactly how we can help.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=enterprise-devops">
                    Schedule Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
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
