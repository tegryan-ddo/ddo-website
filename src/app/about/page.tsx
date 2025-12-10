'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  Linkedin,
  Mail,
  MapPin,
  Shield,
  Target,
  Terminal,
  Users,
  Zap,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const values = [
  {
    icon: Target,
    title: 'Fixed Pricing',
    description:
      'No hourly billing surprises. Every project has a clear scope and fixed price before we start.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description:
      'AI tooling accelerates our work. What takes others 4-8 weeks, we deliver in 1-3 weeks.',
  },
  {
    icon: Users,
    title: 'Senior Engineers Only',
    description:
      '10+ years of AWS and DevOps experience. No juniors learning on your dime.',
  },
  {
    icon: Shield,
    title: 'Enterprise Quality',
    description:
      'Best practices, full documentation, and infrastructure as code. Built to last.',
  },
]

const certifications = [
  { name: 'AWS Solutions Architect Pro', issuer: 'Amazon Web Services' },
  { name: 'AWS DevOps Engineer Pro', issuer: 'Amazon Web Services' },
  { name: 'HashiCorp Terraform Associate', issuer: 'HashiCorp' },
  { name: 'Kubernetes Administrator', issuer: 'CNCF' },
]

const expertise = [
  'AWS VPC & Networking',
  'EC2 & Auto Scaling',
  'RDS & Aurora',
  'ECS & EKS',
  'Lambda & Serverless',
  'CloudFront & S3',
  'Terraform & IaC',
  'CI/CD Pipelines',
  'GitHub Actions',
  'Docker & Containers',
  'Security & IAM',
  'Cost Optimization',
]

const stats = [
  { value: '10+', label: 'Years AWS Experience' },
  { value: '150+', label: 'Projects Delivered' },
  { value: '70%', label: 'Faster Than Traditional' },
  { value: '$2.5M+', label: 'Client Cost Savings' },
]

const differentiators = [
  {
    title: 'Traditional DevOps Firms',
    items: [
      { text: '4-8 weeks for AWS setup', negative: true },
      { text: '$25K-$50K minimum engagement', negative: true },
      { text: 'Junior resources learning on your dime', negative: true },
      { text: 'Hourly billing with scope creep', negative: true },
      { text: 'Manual documentation (if any)', negative: true },
    ],
  },
  {
    title: 'Digital DevOps',
    items: [
      { text: '1-3 weeks for AWS setup', negative: false },
      { text: 'Starting at $2,999 fixed price', negative: false },
      { text: 'Senior engineers only (10+ years)', negative: false },
      { text: 'Fixed pricing, no surprises', negative: false },
      { text: 'AI-generated docs always included', negative: false },
    ],
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Terminal className="w-3.5 h-3.5 mr-2" />
                  About DevAIOps
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Senior DevOps.{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AI-Powered Speed.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400"
              >
                We combine 10+ years of AWS and DevOps expertise with AI tooling
                to deliver enterprise-quality infrastructure at startup speed and prices.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-slate-950">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-cyan-400 font-medium mb-4">
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Why We Built DevAIOps
                </h2>
                <div className="space-y-4 text-slate-400">
                  <p>
                    After a decade of AWS and DevOps consulting, we saw the same pattern:
                    enterprises overpaying for slow delivery, and startups getting cut corners
                    because they couldn&apos;t afford enterprise rates.
                  </p>
                  <p>
                    Then AI changed everything. Tools like Claude and GPT-4 didn&apos;t replace
                    senior expertise—they amplified it. A single senior engineer with AI
                    tooling now delivers what used to require a team.
                  </p>
                  <p>
                    We built Digital DevOps to pass those efficiency gains to our clients:
                    <strong className="text-white"> enterprise-quality AWS infrastructure
                    at fixed prices that startups can afford.</strong>
                  </p>
                  <p>
                    No hourly billing. No junior resources. No surprises. Just fast,
                    reliable AWS infrastructure delivered by engineers who&apos;ve done it
                    hundreds of times before.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Our Tech Stack
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {expertise.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        className="px-3 py-2 bg-slate-800/80 rounded-lg text-xs text-center text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 bg-slate-900">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-cyan-400 font-medium mb-4"
              >
                The Difference
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Why DevAIOps?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400"
              >
                AI tooling lets us deliver enterprise quality at startup prices.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {differentiators.map((col, colIndex) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1 }}
                  className={`rounded-2xl p-8 ${
                    colIndex === 0
                      ? 'bg-slate-800/50 border border-slate-700/50'
                      : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    colIndex === 0 ? 'text-slate-400' : 'text-white'
                  }`}>
                    {col.title}
                  </h3>
                  <ul className="space-y-4">
                    {col.items.map((listItem, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${
                          listItem.negative
                            ? 'bg-red-500/20'
                            : 'bg-emerald-500/20'
                        }`}>
                          {listItem.negative ? (
                            <span className="block w-3 h-3 text-red-400">✕</span>
                          ) : (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          )}
                        </div>
                        <span className={listItem.negative ? 'text-slate-400' : 'text-white'}>
                          {listItem.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-slate-950">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-cyan-400 font-medium mb-4"
              >
                Our Approach
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                How We Work
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400"
              >
                Principles that guide every engagement.
              </motion.p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={item}
                  className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 bg-slate-900">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-cyan-400 font-medium mb-4"
              >
                Credentials
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                AWS & DevOps Certifications
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400"
              >
                Verified expertise across cloud and infrastructure platforms.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {cert.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {cert.issuer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Partner Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="text-sm text-slate-500 mb-8">
                Expertise across leading platforms
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                {['AWS', 'Terraform', 'Kubernetes', 'GitHub', 'Docker'].map(
                  (partner) => (
                    <div
                      key={partner}
                      className="text-lg font-semibold text-slate-600"
                    >
                      {partner}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-950">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
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
                  Get a free AWS review and see how we can help optimize your
                  infrastructure or build something new.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 text-slate-300">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>hello@digitaldevops.io</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>Ucluelet, BC, Canada (Remote-first)</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                    <span>@digitaldevops</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col justify-center"
              >
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                    asChild
                  >
                    <Link href="/contact">
                      <span className="flex items-center justify-center">
                        Get Free AWS Review
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                    asChild
                  >
                    <Link href="/pricing">
                      View Pricing
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
