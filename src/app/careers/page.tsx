'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Position {
  title: string
  type: string
  location: string
  description: string
}

const openPositions: Position[] = [
  // Add positions here when available
  // {
  //   title: 'Senior AI Engineer',
  //   type: 'Full-time',
  //   location: 'Remote (Canada/US)',
  //   description: 'Help clients implement and scale AI solutions.',
  // },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-600/10" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Briefcase className="w-3 h-3 mr-1" />
              Careers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-slate-400">
              Help enterprises transform with AI. We&apos;re building a team of exceptional
              consultants who are passionate about turning AI experiments into business value.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-slate-900">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Digital DevOps?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-800 rounded-xl"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-900/30 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Cutting-Edge Work
              </h3>
              <p className="text-slate-400">
                Work with the latest AI technologies including Claude, GPT-4, and custom ML solutions
                for enterprise clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-800 rounded-xl"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-900/30 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Remote-First
              </h3>
              <p className="text-slate-400">
                Work from anywhere. We&apos;re based in beautiful British Columbia but our team
                spans across North America.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-slate-800 rounded-xl"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-900/30 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Work-Life Balance
              </h3>
              <p className="text-slate-400">
                Flexible hours, unlimited PTO, and a culture that values results over hours logged.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Open Positions
          </h2>

          {openPositions.length > 0 ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-brand-500 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {position.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                      </div>
                      <p className="mt-2 text-slate-400">
                        {position.description}
                      </p>
                    </div>
                    <Button className="bg-brand-600 hover:bg-brand-700 text-white whitespace-nowrap">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl mx-auto">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Open Positions
              </h3>
              <p className="text-slate-400 mb-6">
                We don&apos;t have any open positions right now, but we&apos;re always interested
                in hearing from talented people.
              </p>
              <Link href="/contact">
                <Button variant="outline">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
