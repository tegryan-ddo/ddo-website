'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Shield, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASectionNew() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to 10x Your DevOps Velocity?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Start with a free AWS Well-Architected Review. We'll assess your infrastructure
            and you could receive $5,000 in AWS credits.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              variant="gradient"
              size="xl"
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
              asChild
            >
              <Link href="/contact?type=consultation">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              asChild
            >
              <Link href="/pricing">
                View Packages & Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Fixed pricing, no surprises</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Start within 48 hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
