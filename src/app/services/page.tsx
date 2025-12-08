'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain,
  Code2,
  Shield,
  Rocket,
  ArrowRight,
  Workflow,
  Bot,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    id: 'ai-strategy',
    icon: Brain,
    title: 'AI Strategy & Advisory',
    tagline: 'From vision to roadmap',
    description:
      'Define your AI strategy with clear business objectives, prioritized use cases, and measurable KPIs. We help you navigate the AI landscape and identify opportunities that drive real business value.',
    features: [
      'AI Readiness Assessment',
      'Use Case Discovery & Prioritization',
      'ROI Analysis & Business Case Development',
      'Technology Stack Recommendations',
      'Implementation Roadmap',
      'Risk Assessment & Mitigation Planning',
    ],
    outcomes: [
      'Clear AI vision aligned with business goals',
      'Prioritized use case portfolio',
      'Detailed implementation timeline',
      'Stakeholder alignment and buy-in',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'ai-implementation',
    icon: Bot,
    title: 'AI Implementation',
    tagline: 'Production-ready AI systems',
    description:
      'Build and deploy AI solutions that work in the real world. From agentic systems to RAG pipelines, we bring deep technical expertise to move your AI from proof of concept to production.',
    features: [
      'Agentic AI System Design',
      'RAG Pipeline Development',
      'LLM Integration & Orchestration',
      'Custom Model Fine-tuning',
      'Prompt Engineering & Optimization',
      'AI Safety & Guardrails Implementation',
    ],
    outcomes: [
      'Production-ready AI applications',
      'Scalable, maintainable AI architecture',
      'Reduced hallucinations and errors',
      'Measurable performance improvements',
    ],
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    id: 'modern-development',
    icon: Code2,
    title: 'Modern Development',
    tagline: 'React & TypeScript expertise',
    description:
      'Build performant, accessible frontends that showcase your AI capabilities. We specialize in React, Next.js, and TypeScript to deliver exceptional user experiences.',
    features: [
      'React & Next.js Development',
      'TypeScript Implementation',
      'Design System Creation',
      'Component Library Development',
      'Performance Optimization',
      'Accessibility (WCAG 2.1 AA)',
    ],
    outcomes: [
      'Fast, responsive applications',
      'Consistent design language',
      'Improved developer productivity',
      'Better user engagement metrics',
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'devops',
    icon: Workflow,
    title: 'DevOps Excellence',
    tagline: 'Ship faster with confidence',
    description:
      'Accelerate your delivery pipeline with modern DevOps practices. CI/CD automation, infrastructure as code, and platform engineering to help your team ship faster and more reliably.',
    features: [
      'CI/CD Pipeline Design & Implementation',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Kubernetes & Container Orchestration',
      'Observability & Monitoring Setup',
      'GitOps Workflow Implementation',
      'Platform Engineering',
    ],
    outcomes: [
      'Faster deployment cycles',
      'Reduced manual toil',
      'Improved system reliability',
      'Better visibility into system health',
    ],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security & Compliance',
    tagline: 'Enterprise-grade protection',
    description:
      'Build security into your AI systems from day one. We help you navigate compliance requirements and implement responsible AI governance practices.',
    features: [
      'Security Architecture Review',
      'Compliance Framework Implementation',
      'AI Governance & Ethics',
      'Data Privacy & Protection',
      'Penetration Testing & Vulnerability Assessment',
      'SOC 2, HIPAA, GDPR Compliance',
    ],
    outcomes: [
      'Reduced security risk',
      'Compliance certification readiness',
      'Responsible AI practices',
      'Stakeholder confidence',
    ],
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 'scale-optimize',
    icon: Rocket,
    title: 'Scale & Optimize',
    tagline: 'Performance at scale',
    description:
      'Optimize your AI workloads for performance and cost. From MLOps pipelines to cost management strategies, we help you scale efficiently.',
    features: [
      'MLOps Pipeline Implementation',
      'Cost Optimization Strategies',
      'Performance Tuning & Profiling',
      'Auto-scaling Configuration',
      'Model Serving Optimization',
      'Resource Right-sizing',
    ],
    outcomes: [
      'Reduced cloud spend',
      'Improved response times',
      'Higher throughput',
      'Predictable scaling',
    ],
    color: 'from-pink-500 to-fuchsia-500',
    bgColor: 'bg-pink-500/10',
  },
]

const engagementModels = [
  {
    title: 'Strategic Advisory',
    description: 'Ongoing guidance and strategic support for your AI initiatives',
    duration: 'Monthly retainer',
    bestFor: 'Organizations building AI capabilities',
  },
  {
    title: 'Project-Based',
    description: 'Defined scope, timeline, and deliverables for specific initiatives',
    duration: '2-6 months typical',
    bestFor: 'Clear project requirements',
  },
  {
    title: 'Team Augmentation',
    description: 'Embedded expertise to accelerate your existing teams',
    duration: 'Flexible duration',
    bestFor: 'Scaling engineering capacity',
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
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-zinc-950">
          <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Our Services
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
              >
                End-to-End{' '}
                <span className="text-gradient">AI Enablement</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8"
              >
                From strategy to production, we provide the technical expertise your team
                needs to successfully adopt and scale AI initiatives.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="gradient" size="xl" asChild>
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/assessment">
                    Take AI Assessment
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Detail Section */}
        <section className="section bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container-wide">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-24"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={item}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </div>

                    <p className="text-brand-600 dark:text-brand-400 font-medium mb-2">
                      {service.tagline}
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" asChild>
                      <Link href="/contact">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Outcomes Card */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className={`${service.bgColor} rounded-3xl p-8`}>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
                        Expected Outcomes
                      </h3>
                      <ul className="space-y-4">
                        {service.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <div
                              className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-zinc-700 dark:text-zinc-300">
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Service Comparison Table */}
        <section className="section bg-white dark:bg-zinc-950">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand-600 dark:text-brand-400 font-medium mb-4"
              >
                Compare Options
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                Which Service Is Right for You?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-zinc-600 dark:text-zinc-400"
              >
                Not sure where to start? Here&apos;s a quick guide to help you choose.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-white">
                      If you need...
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-white">
                      Start with
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-900 dark:text-white">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      Clarity on AI opportunities & roadmap
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#ai-strategy" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        AI Strategy & Advisory
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">2-4 weeks</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      To build production AI systems
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#ai-implementation" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        AI Implementation
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">2-6 months</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      Modern web applications
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#modern-development" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        Modern Development
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">1-4 months</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      Faster, safer deployments
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#devops" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        DevOps Excellence
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">1-3 months</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      Compliance & security review
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#security" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        Security & Compliance
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">2-8 weeks</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                      Performance & cost optimization
                    </td>
                    <td className="py-4 px-6">
                      <Link href="#scale-optimize" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                        Scale & Optimize
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">2-6 weeks</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Not sure? We can help you figure out the right approach.
              </p>
              <Button variant="outline" asChild>
                <Link href="/assessment">
                  Take Our AI Readiness Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="section bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand-600 dark:text-brand-400 font-medium mb-4"
              >
                How We Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                Engagement Models
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-zinc-600 dark:text-zinc-400"
              >
                Flexible engagement options tailored to your needs and timeline.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engagementModels.map((model, index) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card text-center"
                >
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                    {model.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {model.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-brand-600 dark:text-brand-400 font-medium">
                      {model.duration}
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400">
                      Best for: {model.bestFor}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-zinc-900 dark:bg-zinc-950">
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
                className="text-lg text-zinc-400 mb-8"
              >
                Schedule a free consultation to discuss your AI initiatives and how we can help.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="gradient" size="xl" asChild>
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  asChild
                >
                  <Link href="/assessment">
                    Take AI Assessment
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
