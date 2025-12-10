'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Building2,
  Rocket,
  Shield,
  Clock,
  DollarSign,
  Terminal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedCounter, parseStatValue } from '@/components/ui/animated-counter'
import { companyStats } from '@/lib/data/services'

export function HeroSectionNew() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge
              variant="outline"
              className="px-4 py-2 border-blue-500/30 bg-blue-500/10 text-blue-400"
            >
              <Terminal className="w-3.5 h-3.5 mr-2" />
              AWS Partner • AI-Augmented DevOps
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center text-white mb-6"
          >
            AI-Augmented DevOps.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              10x Velocity.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto text-center mb-12"
          >
            Senior DevOps engineers + AI tooling = one person doing the work of ten.
            We take over your AWS infrastructure and ship at startup speed.
          </motion.p>

          {/* Dual Path Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Enterprise Path */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Enterprise</h3>
                    <p className="text-sm text-slate-400">Full Infrastructure Takeover</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>We become your DevOps team</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Security & compliance included</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>24/7 support available</span>
                  </li>
                </ul>

                <Button
                  variant="gradient"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  asChild
                >
                  <Link href="/contact?type=enterprise">
                    Talk to Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Startup/SMB Path */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Rocket className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Startups & SMB</h3>
                    <p className="text-sm text-slate-400">Fixed-Price Packages</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>AWS setup from $2,999</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Delivered in 1-3 weeks</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Security audit included</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                  asChild
                >
                  <Link href="/pricing">
                    See Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {companyStats.map((stat) => {
              const parsed = parseStatValue(stat.value)
              return (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800"
                >
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedCounter
                      end={parsed.end}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      decimals={parsed.decimals}
                      duration={2}
                    />
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    {stat.subtext}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
