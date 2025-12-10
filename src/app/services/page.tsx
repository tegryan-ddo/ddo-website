'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Cloud,
  Shield,
  Settings,
  GitBranch,
  ArrowRight,
  Check,
  Zap,
  Users,
  Code2,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { serviceTiers, repoToProductionTiers, comparisonData } from '@/lib/data/services'

const services = [
  {
    id: 'repo-to-production',
    icon: GitBranch,
    title: 'Repo to Production',
    tagline: 'Enterprise hosting at startup prices',
    description: 'Give us your Git repo—any language, any stack. We deploy it on enterprise-grade, SOC 2 compliant AWS infrastructure.',
    price: 'From $299/mo',
    color: 'from-emerald-500 to-teal-500',
    href: '/services/repo-to-production',
    highlight: true,
    features: [
      'Any language, any framework',
      'SOC 2 compliant infrastructure',
      'Auto-scaling & CDN included',
      'Zero DevOps required',
    ],
  },
  {
    id: 'growth-infrastructure',
    icon: Cloud,
    title: 'Growth Infrastructure',
    tagline: 'Custom architecture for scale',
    description: 'Bespoke AWS architecture for AI/tech startups that have outgrown basic hosting. Custom solutions for your specific needs.',
    price: 'From $25K',
    color: 'from-blue-500 to-cyan-500',
    href: '/services/aws-accelerator',
    features: [
      'Custom AWS architecture',
      'Multi-environment setup',
      'Performance optimization',
      '90-day support included',
    ],
  },
  {
    id: 'enterprise-devops',
    icon: Settings,
    title: 'Enterprise DevOps',
    tagline: 'Full infrastructure takeover',
    description: 'We become your DevOps team. Senior engineers, 24/7 support, and complete ownership of your infrastructure operations.',
    price: 'Custom',
    color: 'from-violet-500 to-purple-500',
    href: '/services/enterprise-devops',
    features: [
      'Dedicated senior engineers',
      '24/7 monitoring & response',
      'Platform engineering',
      'Direct Slack integration',
    ],
  },
  {
    id: 'security-compliance',
    icon: Shield,
    title: 'Security & Compliance',
    tagline: 'SOC 2, HIPAA, enterprise-ready',
    description: 'For startups selling to enterprise or handling sensitive data. We get you audit-ready and help you close bigger deals.',
    price: 'From $15K',
    color: 'from-orange-500 to-amber-500',
    href: '/services/security',
    features: [
      'SOC 2 Type I/II preparation',
      'HIPAA compliance',
      'Security audits',
      'Penetration testing',
    ],
  },
]

const differentiators = [
  {
    icon: GitBranch,
    title: 'Just Give Us Your Repo',
    description: 'Any language, any framework. We handle the rest.',
  },
  {
    icon: Shield,
    title: 'SOC 2 from $299/mo',
    description: 'Enterprise security at startup prices.',
  },
  {
    icon: Users,
    title: 'Senior Engineers Only',
    description: '10+ years experience. No juniors learning on your dime.',
  },
  {
    icon: Code2,
    title: 'You Own Everything',
    description: 'Full access to code, infrastructure, and configs.',
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
      <main className="bg-slate-950">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <GitBranch className="w-3.5 h-3.5 mr-2" />
                  From Repo to Enterprise Production
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Enterprise AWS.{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Startup Pricing.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 mb-8"
              >
                Whether you need SOC 2 compliant hosting for $299/month or a complete
                infrastructure overhaul, we&apos;ve got you covered. Zero DevOps required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  asChild
                >
                  <Link href="/services/repo-to-production">
                    Repo to Production
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/contact?type=consultation">
                    Schedule Consultation
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {differentiators.map((diff) => (
                <motion.div
                  key={diff.title}
                  variants={item}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-4">
                    <diff.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{diff.title}</h3>
                  <p className="text-sm text-slate-400">{diff.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Services
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                From managed hosting to complete infrastructure takeover—choose what fits your needs.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={item}
                >
                  <Link href={service.href} className="block group">
                    <div
                      className={`relative h-full rounded-2xl border p-8 transition-all duration-300 ${
                        service.highlight
                          ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-transparent hover:border-emerald-400'
                          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                      }`}
                    >
                      {service.highlight && (
                        <div className="absolute -top-3 left-6">
                          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color}`}
                        >
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">{service.price}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-emerald-400 text-sm mb-4">{service.tagline}</p>
                      <p className="text-slate-400 mb-6">{service.description}</p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-slate-300">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <span className="font-medium">Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose DevAIOps?
              </h2>
              <p className="text-lg text-slate-400">
                Enterprise infrastructure without the enterprise complexity or price tag.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-slate-800">
                    {comparisonData.headers.map((header, i) => (
                      <th
                        key={header}
                        className={`text-left py-4 px-6 text-sm font-semibold ${
                          i === 3 ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {comparisonData.rows.map((row) => (
                    <tr key={row[0]} className="hover:bg-slate-900/50">
                      <td className="py-4 px-6 text-slate-300 font-medium">{row[0]}</td>
                      <td className="py-4 px-6 text-slate-500">{row[1]}</td>
                      <td className="py-4 px-6 text-slate-500">{row[2]}</td>
                      <td className="py-4 px-6 text-white font-medium">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
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
                className="text-lg text-slate-400 mb-8"
              >
                Schedule a free 30-minute consultation. We&apos;ll discuss your needs
                and whether we&apos;re the right fit—no pressure, no sales pitch.
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
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  asChild
                >
                  <Link href="/contact?type=consultation">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/services/repo-to-production">
                    Start from $299/mo
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
