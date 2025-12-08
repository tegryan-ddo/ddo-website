'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { AnimatedCounter, parseStatValue } from '@/components/ui/animated-counter'

const stats = [
  {
    value: '$8.8B',
    label: 'AI Consulting Market (2024)',
    growth: '→ $49B by 2032',
    source: 'SNS Insider',
    sourceUrl: '#',
  },
  {
    value: '78%',
    label: 'Organizations Using AI',
    growth: '+15% from 2023',
    source: 'McKinsey 2025',
    sourceUrl: '#',
  },
  {
    value: '30%',
    label: 'GenAI Projects Fail',
    growth: 'After POC stage',
    source: 'Gartner',
    sourceUrl: '#',
  },
  {
    value: '3.7x',
    label: 'Average GenAI ROI',
    growth: 'Per $1 invested',
    source: 'Gartner',
    sourceUrl: '#',
  },
]

const partners = [
  { name: 'AWS', logo: '/img/partners/aws.svg' },
  { name: 'Anthropic', logo: '/img/partners/anthropic.svg' },
  { name: 'OpenAI', logo: '/img/partners/openai.svg' },
  { name: 'Microsoft', logo: '/img/partners/microsoft.svg' },
  { name: 'Google Cloud', logo: '/img/partners/gcp.svg' },
]

export function SocialProof() {
  return (
    <section className="section bg-white dark:bg-zinc-950">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 dark:text-brand-400 font-medium mb-4"
          >
            The AI Opportunity
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            The Data Speaks for Itself
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 dark:text-zinc-400"
          >
            AI adoption is accelerating, but most organizations struggle to move past
            experimentation. We help bridge that gap.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const parsed = parseStatValue(stat.value)
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="stat-card h-full">
                  <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                    <AnimatedCounter
                      end={parsed.end}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      decimals={parsed.decimals}
                      duration={2.5}
                    />
                  </div>
                  <div className="text-base font-medium text-zinc-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    {stat.growth}
                  </div>
                  <a
                    href={stat.sourceUrl}
                    className="inline-flex items-center text-xs text-zinc-400 dark:text-zinc-500 hover:text-brand-500 transition-colors"
                  >
                    Source: {stat.source}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partners/Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
            Expertise across leading AI platforms and cloud providers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-50 dark:opacity-40">
            {/* Placeholder for partner logos - would use actual images */}
            {['AWS', 'Anthropic', 'OpenAI', 'Microsoft', 'Google Cloud'].map(
              (partner) => (
                <div
                  key={partner}
                  className="text-lg font-semibold text-zinc-400 dark:text-zinc-600"
                >
                  {partner}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
