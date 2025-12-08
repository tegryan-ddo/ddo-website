'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Free 30-minute strategy session',
  'Custom AI readiness assessment',
  'No obligation consultation',
]

export function CTASection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="text-gradient-light">AI Strategy</span>?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            Join the 78% of enterprises embracing AI. Let&apos;s discuss how we can help
            you move from experimentation to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <Button
              size="xl"
              className="bg-white text-zinc-900 hover:bg-zinc-100"
              asChild
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Call
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
              asChild
            >
              <Link href="/assessment">
                Take AI Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center text-sm text-zinc-400"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-400 mr-2" />
                {benefit}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
