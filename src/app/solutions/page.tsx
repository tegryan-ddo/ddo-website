'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HeartPulse,
  Landmark,
  Laptop2,
  ShoppingCart,
  Sparkles,
  Factory,
  Truck,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const industries = [
  {
    id: 'financial-services',
    name: 'Financial Services',
    icon: Landmark,
    description: 'Secure AI solutions for banks, insurance, and fintech companies navigating complex regulatory requirements.',
    challenges: [
      'Regulatory compliance (SOC 2, PCI-DSS)',
      'Legacy system modernization',
      'Fraud detection and prevention',
      'Customer experience automation',
    ],
    solutions: [
      'Compliant RAG systems for document processing',
      'Agentic AI for customer service',
      'MLOps pipelines for risk models',
      'Secure cloud infrastructure',
    ],
    metrics: [
      { value: '60%', label: 'Processing time reduction' },
      { value: '$2.4M', label: 'Annual savings' },
    ],
    caseStudyId: 'enterprise-ai-platform',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: HeartPulse,
    description: 'HIPAA-compliant AI and DevOps solutions for healthcare providers, pharma, and health tech companies.',
    challenges: [
      'HIPAA and HITRUST compliance',
      'Clinical workflow optimization',
      'Patient data privacy',
      'Interoperability requirements',
    ],
    solutions: [
      'Secure AI infrastructure on AWS/Azure',
      'Automated compliance monitoring',
      'Clinical decision support systems',
      'HL7 FHIR integration pipelines',
    ],
    metrics: [
      { value: '10x', label: 'Faster deployments' },
      { value: '99.9%', label: 'Uptime achieved' },
    ],
    caseStudyId: 'devops-transformation',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'technology',
    name: 'Technology & SaaS',
    icon: Laptop2,
    description: 'AI-powered features and scalable infrastructure for software companies looking to innovate faster.',
    challenges: [
      'Scaling customer support',
      'Building AI-powered features',
      'Deployment velocity',
      'Cost optimization at scale',
    ],
    solutions: [
      'Agentic AI support systems',
      'AI feature integration',
      'GitOps and CI/CD pipelines',
      'Kubernetes platform engineering',
    ],
    metrics: [
      { value: '70%', label: 'Tickets auto-resolved' },
      { value: '8x', label: 'First year ROI' },
    ],
    caseStudyId: 'agentic-ai-system',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    icon: ShoppingCart,
    description: 'AI-driven insights and automation for retailers looking to understand customers and optimize operations.',
    challenges: [
      'Customer behavior analysis',
      'Real-time inventory management',
      'Personalization at scale',
      'Data silos across channels',
    ],
    solutions: [
      'Conversational analytics platforms',
      'AI-powered recommendations',
      'Unified data warehousing',
      'Predictive demand forecasting',
    ],
    metrics: [
      { value: '15%', label: 'Revenue increase' },
      { value: '5hrs', label: 'Weekly time saved' },
    ],
    caseStudyId: 'ai-powered-analytics',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'AI and DevOps solutions for manufacturers seeking operational excellence and digital transformation.',
    challenges: [
      'Predictive maintenance',
      'Quality control automation',
      'Supply chain visibility',
      'OT/IT convergence',
    ],
    solutions: [
      'IoT data pipeline architecture',
      'ML-powered defect detection',
      'Real-time monitoring dashboards',
      'Edge computing infrastructure',
    ],
    metrics: [
      { value: '40%', label: 'Downtime reduction' },
      { value: '25%', label: 'Quality improvement' },
    ],
    color: 'from-slate-500 to-zinc-600',
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: Truck,
    description: 'AI optimization and real-time visibility for logistics companies managing complex supply chains.',
    challenges: [
      'Route optimization',
      'Demand forecasting',
      'Real-time tracking',
      'Partner integration',
    ],
    solutions: [
      'AI route optimization systems',
      'Predictive analytics platforms',
      'Real-time visibility dashboards',
      'API integration architecture',
    ],
    metrics: [
      { value: '20%', label: 'Cost reduction' },
      { value: '35%', label: 'Efficiency gain' },
    ],
    color: 'from-rose-500 to-pink-500',
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

export default function SolutionsPage() {
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
                  Industry Solutions
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
              >
                AI Solutions for{' '}
                <span className="text-gradient">Your Industry</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400"
              >
                We understand that every industry has unique challenges. Our solutions are
                tailored to meet your specific regulatory, operational, and competitive requirements.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="section bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container-wide">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  variants={item}
                  className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${industry.color}`} />

                  <div className="p-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${industry.color} text-white`}>
                        <industry.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                          {industry.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                      {industry.description}
                    </p>

                    {/* Key Challenges */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wide">
                        Key Challenges We Solve
                      </h4>
                      <ul className="space-y-2">
                        {industry.challenges.slice(0, 3).map((challenge) => (
                          <li key={challenge} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                      {industry.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-2xl font-bold text-gradient">{metric.value}</div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2">
                      {industry.caseStudyId ? (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href={`/case-studies/${industry.caseStudyId}`}>
                            View Case Study
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link href="/case-studies">
                            View Case Studies
                          </Link>
                        </Button>
                      )}
                      <Button variant="default" size="sm" asChild className="flex-1">
                        <Link href="/contact">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="section bg-white dark:bg-zinc-950">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                Our Industry Approach
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-zinc-600 dark:text-zinc-400"
              >
                Every engagement starts with understanding your specific industry context and challenges.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-brand-500">1</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  Industry Discovery
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We learn your regulatory environment, competitive landscape, and operational constraints.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-brand-500">2</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  Tailored Solution Design
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We design solutions that meet your specific compliance, security, and performance requirements.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-brand-500">3</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  Proven Implementation
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We deliver using battle-tested patterns adapted to your industry's unique needs.
                </p>
              </motion.div>
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
                Ready to Transform Your Industry?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-zinc-400 mb-8"
              >
                Let's discuss how AI can address your specific industry challenges.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="gradient" size="xl" asChild>
                  <Link href="/contact" className="flex items-center">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  asChild
                >
                  <Link href="/assessment">Take AI Assessment</Link>
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
