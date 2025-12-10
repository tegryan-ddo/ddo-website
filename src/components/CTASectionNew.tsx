'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Shield, Users } from 'lucide-react'
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
            Ready to Scale Your Infrastructure?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Schedule a free 30-minute consultation. We&apos;ll discuss your challenges
            and whether we&apos;re the right fit—no pressure, no sales pitch.
          </motion.p>

          {/* CTA Button */}
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
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Senior engineers only (10+ yrs)</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>95% client retention rate</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span>We&apos;ll tell you if we&apos;re not the right fit</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
