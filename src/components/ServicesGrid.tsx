'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Cloud,
  Shield,
  Headphones,
  Settings,
  Code,
  Brain,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { serviceHighlights } from '@/lib/data/services'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Shield,
  Headphones,
  Settings,
  Code,
  Brain,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesGrid() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-400 font-medium mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            End-to-End AWS & DevOps Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            From initial setup to full managed services. Fixed pricing,
            fast delivery, and AI-augmented efficiency.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceHighlights.map((service) => {
            const IconComponent = iconMap[service.icon] || Cloud
            return (
              <motion.div
                key={service.id}
                variants={item}
              >
                <Link
                  href={service.link}
                  className="block group h-full"
                >
                  <div className="relative h-full bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/80">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Starting at{' '}
                        <span className="text-white font-medium">
                          {service.startingPrice}
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            asChild
          >
            <Link href="/pricing">
              View All Packages & Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
