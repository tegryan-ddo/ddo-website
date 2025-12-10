'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  ArrowRight,
  Cloud,
  Shield,
  Headphones,
  Settings,
  Code,
  Zap,
  Gift,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  awsLaunchpadPackages,
  securityPackages,
  supportPackages,
  autopilotPackages,
  developmentPackages,
  specialOfferings,
  bundles,
  ServicePackage,
} from '@/lib/data/services'

function PackageCard({ pkg, index }: { pkg: ServicePackage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative h-full ${pkg.highlighted ? 'lg:-mt-4 lg:mb-4' : ''}`}
    >
      {pkg.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            Most Popular
          </Badge>
        </div>
      )}
      <div
        className={`h-full rounded-2xl p-6 flex flex-col ${
          pkg.highlighted
            ? 'bg-slate-800 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
            : 'bg-slate-900/50 border border-slate-800'
        }`}
      >
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
          <p className="text-sm text-slate-400">{pkg.tagline}</p>
        </div>

        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{pkg.price}</span>
          {pkg.priceNote && (
            <span className="text-slate-400 text-sm">{pkg.priceNote}</span>
          )}
        </div>

        <p className="text-sm text-slate-400 mb-4">{pkg.delivery}</p>

        <p className="text-sm text-slate-300 mb-6">{pkg.description}</p>

        <ul className="space-y-3 mb-6 flex-grow">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={pkg.highlighted ? 'gradient' : 'outline'}
          className={
            pkg.highlighted
              ? 'w-full bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'w-full border-slate-700 text-slate-300 hover:bg-slate-800'
          }
          asChild
        >
          <Link href={pkg.ctaLink}>
            {pkg.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

function Section({
  id,
  icon: Icon,
  title,
  description,
  packages,
  color,
}: {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  packages: ServicePackage[]
  color: string
}) {
  return (
    <section id={id} className="py-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-slate-400 mb-8 max-w-2xl">{description}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>
    </section>
  )
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
            Transparent Pricing
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
        >
          Simple, Fixed-Price Packages
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400"
        >
          No hourly billing, no scope creep, no surprises. Know exactly what
          you&apos;re getting and what you&apos;re paying.
        </motion.p>
      </div>

      {/* Quick Nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2 mb-16"
      >
        {[
          { label: 'AWS Infrastructure', href: '#aws-infrastructure' },
          { label: 'Security', href: '#security' },
          { label: 'DevOps Support', href: '#support' },
          { label: 'Managed Services', href: '#managed' },
          { label: 'Development', href: '#development' },
          { label: 'Bundles', href: '#bundles' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {item.label}
          </a>
        ))}
      </motion.div>

      {/* Special Offerings Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">
              Special Offerings
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {specialOfferings.map((offering) => (
              <div
                key={offering.id}
                className="bg-slate-900/50 rounded-xl p-4 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{offering.name}</h4>
                  <span className="text-sm font-semibold text-cyan-400">
                    {offering.price}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-3">
                  {offering.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0"
                  asChild
                >
                  <Link href={offering.ctaLink}>
                    {offering.cta}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Package Sections */}
      <Section
        id="aws-infrastructure"
        icon={Cloud}
        title="AWS Infrastructure Setup"
        description="Production-ready AWS infrastructure in 1-3 weeks. Everything you need to launch and scale, built with Terraform."
        packages={awsLaunchpadPackages}
        color="from-blue-500 to-cyan-500"
      />

      <Section
        id="security"
        icon={Shield}
        title="Security & Compliance"
        description="Security audits, penetration testing, and compliance preparation. Get audit-ready faster."
        packages={securityPackages}
        color="from-red-500 to-orange-500"
      />

      <Section
        id="support"
        icon={Headphones}
        title="DevOps Support Plans"
        description="Monthly retainer for ongoing DevOps help. Expert support when you need it, at a fraction of a full-time hire."
        packages={supportPackages}
        color="from-violet-500 to-purple-500"
      />

      <Section
        id="managed"
        icon={Settings}
        title="Managed Infrastructure (Autopilot)"
        description="We fully manage your AWS. You focus on building your product. 24/7 monitoring, incident response, and optimization included."
        packages={autopilotPackages}
        color="from-emerald-500 to-teal-500"
      />

      <Section
        id="development"
        icon={Code}
        title="Next.js Development"
        description="From landing pages to full applications. AI-assisted development for faster delivery at lower cost."
        packages={developmentPackages}
        color="from-pink-500 to-rose-500"
      />

      {/* Bundles */}
      <section id="bundles" className="py-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Save with Bundles</h2>
        </div>
        <p className="text-slate-400 mb-8 max-w-2xl">
          Combine services and save. Perfect for startups and growing companies
          that need multiple services.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {bundles.map((bundle, index) => (
            <PackageCard key={bundle.id} pkg={bundle} index={index} />
          ))}
        </div>
      </section>

      {/* FAQ / Notes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 border-t border-slate-800"
      >
        <h2 className="text-2xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-white mb-2">
              What&apos;s NOT included in pricing?
            </h3>
            <p className="text-sm text-slate-400">
              AWS infrastructure costs (you pay AWS directly), third-party tool
              subscriptions, audit firm fees for SOC 2/etc., and compliance
              platform subscriptions.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Payment terms?</h3>
            <p className="text-sm text-slate-400">
              One-time packages: 50% upfront, 50% on completion. Monthly
              packages: Paid monthly in advance. Enterprise/custom: Net 30
              available.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">
              What guarantees do you offer?
            </h3>
            <p className="text-sm text-slate-400">
              Delivery guarantee: On-time or 25% discount. Satisfaction
              guarantee: 30-day money-back on first engagement. SLA guarantee:
              Credits for missed SLAs.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">
              Do you offer discounts?
            </h3>
            <p className="text-sm text-slate-400">
              Annual prepay: 15% discount on monthly packages. Startup program:
              20% off for YC, Techstars, or similar. Non-profit: 25% discount.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Not sure which package fits?
        </h2>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
          Schedule a free consultation. We&apos;ll discuss your needs and
          recommend the right solution - no pressure, no commitment.
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
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            asChild
          >
            <Link href="/contact?package=well-architected-review">
              Start with Free AWS Review
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  )
}
