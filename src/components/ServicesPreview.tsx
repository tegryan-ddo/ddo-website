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
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Brain,
    title: 'AI Strategy',
    description:
      'Define your AI roadmap with clear business objectives, use case prioritization, and measurable KPIs.',
    features: ['Use Case Discovery', 'ROI Analysis', 'Implementation Roadmap'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bot,
    title: 'AI Implementation',
    description:
      'Build production-ready AI solutions with agentic systems, RAG pipelines, and custom model integration.',
    features: ['Agentic AI Systems', 'RAG Pipelines', 'Model Fine-tuning'],
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code2,
    title: 'Modern Development',
    description:
      'React and TypeScript expertise to build performant, accessible frontends that showcase AI capabilities.',
    features: ['React/Next.js', 'TypeScript', 'Design Systems'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Workflow,
    title: 'DevOps Excellence',
    description:
      'CI/CD pipelines, infrastructure as code, and platform engineering to ship faster with confidence.',
    features: ['CI/CD Automation', 'Infrastructure as Code', 'Kubernetes'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description:
      'Enterprise security practices, compliance frameworks, and responsible AI governance built-in.',
    features: ['Security Architecture', 'Compliance (SOC2, HIPAA)', 'AI Governance'],
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Rocket,
    title: 'Scale & Optimize',
    description:
      'Performance optimization, cost management, and scaling strategies for AI workloads in production.',
    features: ['Cost Optimization', 'Performance Tuning', 'MLOps'],
    color: 'from-pink-500 to-fuchsia-500',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesPreview() {
  return (
    <section className="section bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 dark:text-brand-400 font-medium mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            End-to-End AI Enablement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400"
          >
            From strategy to production, we provide the technical expertise your team
            needs to successfully adopt and scale AI initiatives.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="feature-card group"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-6`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-brand-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
