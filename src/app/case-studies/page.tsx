'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { caseStudies } from '@/lib/data/case-studies'

const industries = ['All', 'Financial Services', 'Technology', 'Healthcare', 'Retail']

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

export default function CaseStudiesPage() {
  const [filter, setFilter] = React.useState('All')

  const filteredStudies = caseStudies.filter(
    (study) => filter === 'All' || study.industry === filter
  )

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
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
                  Case Studies
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Real Results,{' '}
                <span className="text-gradient">Real Impact</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400"
              >
                See how we&apos;ve helped organizations transform their AI initiatives
                into measurable business outcomes.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-slate-900/50 border-y border-slate-800">
          <div className="container-wide">
            <div className="flex flex-wrap justify-center gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setFilter(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === industry
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="section bg-slate-950">
          <div className="container-wide">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-16"
            >
              {filteredStudies.map((study, index) => (
                <motion.article
                  key={study.id}
                  variants={item}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.services.map((service) => (
                        <Badge key={service} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {study.title}
                    </h2>
                    <p className="text-brand-400 font-medium mb-4">
                      {study.client} | {study.industry}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          Challenge
                        </h3>
                        <p className="text-slate-400">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          Solution
                        </h3>
                        <p className="text-slate-400">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {study.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {study.teamSize}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" asChild>
                      <Link href={`/case-studies/${study.id}`}>
                        Read Full Case Study
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Outcomes Card */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div
                      className={`rounded-3xl bg-gradient-to-br ${study.color} p-1`}
                    >
                      <div className="rounded-[calc(1.5rem-4px)] bg-slate-900 p-8">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-brand-500" />
                          Key Outcomes
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          {study.outcomes.map((outcome) => (
                            <div key={outcome.label}>
                              <div className="text-3xl font-bold text-gradient mb-1">
                                {outcome.metric}
                              </div>
                              <div className="text-sm text-slate-400">
                                {outcome.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-slate-900">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready to Create Your Success Story?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Let&apos;s discuss how we can help you achieve similar results.
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
                  className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white"
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
