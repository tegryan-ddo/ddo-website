'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Cpu,
  TrendingUp,
  Building2,
  GitBranch,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  serviceTiers,
  idealCustomers,
  problemsSolved,
  comparisonData,
  ServicePackage,
} from '@/lib/data/services'

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

export function PricingPageContent() {
  return (
    <div className="container-wide pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge
            variant="outline"
            className="mb-4 border-blue-500/30 bg-blue-500/10 text-blue-400"
          >
            Enterprise & Growth-Stage Focus
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
        >
          Bespoke AWS Infrastructure
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400"
        >
          For fast-growing AI/tech companies that need more than basic hosting.
          Custom architecture, senior engineers, real solutions.
        </motion.p>
      </div>

      {/* Service Tiers */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
      >
        {serviceTiers.map((tier) => (
          <motion.div
            key={tier.id}
            variants={item}
            className={`relative h-full ${tier.highlighted ? 'lg:-mt-4 lg:mb-4' : ''}`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                  Most Popular
                </Badge>
              </div>
            )}
            <div
              className={`h-full rounded-2xl p-6 flex flex-col ${
                tier.highlighted
                  ? 'bg-slate-800 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/50 border border-slate-800'
              }`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400">{tier.tagline}</p>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
              </div>

              <p className="text-sm text-slate-300 mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? 'gradient' : 'outline'}
                className={
                  tier.highlighted
                    ? 'w-full bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'w-full border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300'
                }
                asChild
              >
                <Link href={tier.ctaLink}>
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Who We Work With */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Who We Work With</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We specialize in helping growth-stage companies solve real infrastructure challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {idealCustomers.map((customer, index) => {
            const icons = [GitBranch, Cpu, TrendingUp, Building2]
            const Icon = icons[index] || Cpu
            return (
              <div
                key={customer.id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{customer.title}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">{customer.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Common challenges:</p>
                  <ul className="space-y-1">
                    {customer.challenges.map((challenge) => (
                      <li key={challenge} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* Problems We Solve */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Problems We Solve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsSolved.map((item) => (
              <div key={item.problem} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                <p className="text-white font-medium mb-2">{item.problem}</p>
                <p className="text-sm text-slate-400">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Comparison Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How We Compare</h2>
          <p className="text-slate-400">
            Enterprise quality without the enterprise price tag or timeline.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {comparisonData.headers.map((header, i) => (
                  <th
                    key={header}
                    className={`py-4 px-6 text-left text-sm font-medium ${
                      i === 3 ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.rows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-800/50">
                  <td className="py-4 px-6 text-slate-300 font-medium">{row[0]}</td>
                  <td className="py-4 px-6 text-slate-500">{row[1]}</td>
                  <td className="py-4 px-6 text-slate-500">{row[2]}</td>
                  <td className="py-4 px-6 text-white font-medium">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Why Custom Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 border-t border-slate-800 pt-16"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Why Custom Pricing?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-white mb-2">Every company is different</h3>
            <p className="text-sm text-slate-400">
              A pre-seed startup with 10 users has very different needs than a Series B
              company handling millions of requests. We scope each engagement to your
              specific situation, not a one-size-fits-all package.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">We focus on outcomes</h3>
            <p className="text-sm text-slate-400">
              Our goal is to solve your actual problem, not sell you services you don&apos;t need.
              We&apos;ll tell you if you&apos;re not ready for us, or if there&apos;s a simpler solution.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Transparent scoping</h3>
            <p className="text-sm text-slate-400">
              After our initial consultation, you&apos;ll get a detailed proposal with clear
              deliverables, timeline, and fixed pricing. No hourly billing surprises.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Long-term partnerships</h3>
            <p className="text-sm text-slate-400">
              95% of our clients continue working with us after initial engagements.
              We price fairly because we want to grow with you.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 text-center bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl border border-slate-800"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Let&apos;s Talk About Your Infrastructure
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Schedule a free 30-minute consultation. We&apos;ll discuss your challenges
          and whether we&apos;re the right fit - no pressure, no pitch deck.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="gradient"
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
            asChild
          >
            <Link href="/contact?type=consultation">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  )
}
