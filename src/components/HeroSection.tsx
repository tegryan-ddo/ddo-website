'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedCounter, parseStatValue } from '@/components/ui/animated-counter'

const stats = [
  { label: 'AI Market Growth', value: '$49B', subtext: 'by 2032', icon: TrendingUp },
  { label: 'Enterprise Adoption', value: '78%', subtext: 'using AI', icon: Users },
  { label: 'Average ROI', value: '3.7x', subtext: 'per $1 invested', icon: Zap },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              AI Enablement Consulting
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
          >
            Turn AI Experiments into{' '}
            <span className="text-gradient">Business Value</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            While 30% of GenAI projects fail after proof of concept, we help enterprises
            bridge the gap from experimentation to production. Deep technical expertise
            in AI, React, and DevOps.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="gradient" size="xl" asChild>
              <Link href="/assessment" className="flex items-center">
                Take AI Readiness Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/case-studies">
                <Play className="mr-2 h-5 w-5" />
                View Case Studies
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat) => {
              const parsed = parseStatValue(stat.value)
              return (
                <div
                  key={stat.label}
                  className="stat-card text-center"
                >
                  <stat.icon className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                    <AnimatedCounter
                      end={parsed.end}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      decimals={parsed.decimals}
                      duration={2}
                    />
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {stat.subtext}
                  </div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Source Citation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-zinc-400 dark:text-zinc-500 mt-6"
          >
            Sources: McKinsey State of AI 2025, Gartner, SNS Insider
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-zinc-300 dark:border-zinc-700 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-600 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
