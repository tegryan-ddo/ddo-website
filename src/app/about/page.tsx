'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Target,
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
    title: 'Outcomes First',
    description:
      'We measure success by the business value we deliver, not hours logged or features shipped.',
  },
  {
    icon: Zap,
    title: 'Technical Excellence',
    description:
      'Deep expertise in AI, modern development, and DevOps. We stay ahead of the curve so you can too.',
  },
  {
    icon: Users,
    title: 'Partnership Mindset',
    description:
      'We work alongside your team, transferring knowledge and building lasting capabilities.',
  },
  {
    icon: Globe,
    title: 'Responsible AI',
    description:
      'Ethics and safety are not afterthoughts. We build AI systems you can trust and explain.',
  },
]

const certifications = [
  { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services' },
  { name: 'AWS DevOps Engineer', issuer: 'Amazon Web Services' },
  { name: 'Anthropic Partner', issuer: 'Anthropic' },
  { name: 'Google Cloud Professional', issuer: 'Google Cloud' },
]

const expertise = [
  'Agentic AI Systems',
  'RAG & LLM Pipelines',
  'React & Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'AWS & Cloud Infrastructure',
  'Kubernetes',
  'CI/CD Automation',
  'Infrastructure as Code',
  'Security & Compliance',
  'MLOps',
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '95%', label: 'Client Retention' },
  { value: '3.7x', label: 'Avg. Client ROI' },
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
        <section className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-zinc-950">
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
                  About Us
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
              >
                Bridging the Gap Between{' '}
                <span className="text-gradient">AI & Business Value</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400"
              >
                Digital DevOps is an AI enablement consultancy helping enterprises move
                from AI experimentation to production value.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
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
                  <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="section bg-white dark:bg-zinc-950">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-brand-600 dark:text-brand-400 font-medium mb-4">
                  Our Mission
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                  Helping Organizations Realize the Full Potential of AI
                </h2>
                <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
                  <p>
                    While 78% of enterprises now use AI in at least one function, most
                    struggle to move beyond experimentation. Gartner reports that 30% of
                    GenAI projects are abandoned after proof of concept.
                  </p>
                  <p>
                    We founded Digital DevOps to bridge this gap. With deep expertise in
                    AI systems, modern development practices, and enterprise DevOps, we
                    help organizations turn AI investments into measurable business
                    outcomes.
                  </p>
                  <p>
                    Our approach combines technical excellence with strategic guidance,
                    ensuring AI initiatives align with business goals and deliver
                    sustainable value.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                    {expertise.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg text-xs text-center text-zinc-700 dark:text-zinc-300 shadow-sm"
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

        {/* Values */}
        <section className="section bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand-600 dark:text-brand-400 font-medium mb-4"
              >
                Our Values
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                How We Work
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-zinc-600 dark:text-zinc-400"
              >
                These principles guide everything we do.
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
                  className="feature-card"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section bg-white dark:bg-zinc-950">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand-600 dark:text-brand-400 font-medium mb-4"
              >
                Credentials
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
              >
                Certifications & Partnerships
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-zinc-600 dark:text-zinc-400"
              >
                We maintain certifications across leading cloud and AI platforms.
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
                  className="flex items-center gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-brand-500" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      {cert.name}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
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
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                Trusted expertise across leading platforms
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-50 dark:opacity-40">
                {['AWS', 'Anthropic', 'OpenAI', 'Microsoft', 'Google Cloud'].map(
                  (partner) => (
                    <div
                      key={partner}
                      className="text-lg font-semibold text-zinc-400 dark:text-zinc-600"
                    >
                      {partner}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section bg-zinc-900 dark:bg-zinc-950">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                >
                  Let&apos;s Work Together
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-zinc-400 mb-8"
                >
                  Ready to turn your AI initiatives into business value? Let&apos;s start
                  with a conversation about your goals and challenges.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 text-zinc-300">
                    <Mail className="w-5 h-5 text-brand-400" />
                    <span>hello@digitaldevops.io</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <MapPin className="w-5 h-5 text-brand-400" />
                    <span>Remote-first, US-based</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <Linkedin className="w-5 h-5 text-brand-400" />
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
                  <Button variant="gradient" size="xl" className="w-full sm:w-auto" asChild>
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center justify-center">
                        Schedule a Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto border-zinc-700 text-white hover:bg-zinc-800"
                    asChild
                  >
                    <Link href="/assessment">
                      Take AI Readiness Assessment
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
