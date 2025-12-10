'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap } from 'lucide-react'
import { comparisonData } from '@/lib/data/services'

export function WhyDevAIOps() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-medium mb-4"
          >
            Why DevAIOps?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            The AI-Augmented Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            We use AI tooling to deliver enterprise-quality work at startup prices and speed.
          </motion.p>
        </div>

        {/* Visual Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Traditional */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-400 mb-6">
              Traditional DevOps
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <span className="text-white font-medium">4-8 weeks</span>
                  <span className="text-slate-400"> for AWS setup</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <span className="text-white font-medium">$25K-$50K</span>
                  <span className="text-slate-400"> minimum engagement</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <span className="text-white font-medium">Junior resources</span>
                  <span className="text-slate-400"> learning on your dime</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <span className="text-white font-medium">Manual documentation</span>
                  <span className="text-slate-400"> (if any)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-red-500/20">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <div>
                  <span className="text-white font-medium">Hourly billing</span>
                  <span className="text-slate-400"> with scope creep</span>
                </div>
              </li>
            </ul>
          </div>

          {/* DevAIOps */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-30 blur" />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">
                  DevAIOps
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">1-3 weeks</span>
                    <span className="text-slate-400"> for AWS setup</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Starting at $2,999</span>
                    <span className="text-slate-400"> fixed price</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Senior engineers only</span>
                    <span className="text-slate-400"> (10+ years)</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">AI-generated docs</span>
                    <span className="text-slate-400"> always included</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Fixed pricing</span>
                    <span className="text-slate-400"> no surprises</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Detailed Table (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="hidden lg:block overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {comparisonData.headers.map((header, index) => (
                  <th
                    key={header}
                    className={`py-4 px-6 text-left text-sm font-medium ${
                      index === 3
                        ? 'text-cyan-400 bg-cyan-500/5'
                        : 'text-slate-400'
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-slate-800/50"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`py-4 px-6 text-sm ${
                        cellIndex === 0
                          ? 'text-white font-medium'
                          : cellIndex === 3
                          ? 'text-cyan-400 font-medium bg-cyan-500/5'
                          : 'text-slate-400'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">How is this possible?</span>{' '}
            AI tooling reduces manual work by 70-80%. Pre-built Terraform modules.
            Automated documentation. One senior engineer with AI = 10x output.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
