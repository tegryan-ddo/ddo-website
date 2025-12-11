'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  GitMerge,
  Terminal,
  Server,
  Workflow,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    icon: GitMerge,
    title: 'CI/CD Pipeline Optimization',
    description: 'Streamline your deployment process with robust, automated pipelines.',
    features: ['GitHub Actions / GitLab CI', 'Automated Testing', 'Deployment Strategies (Canary, Blue/Green)'],
  },
  {
    icon: Server,
    title: 'Infrastructure as Code (IaC)',
    description: 'Manage your infrastructure reliably and consistently.',
    features: ['Terraform', 'AWS CloudFormation', 'State Management'],
  },
  {
    icon: ShieldCheck,
    title: 'DevSecOps Integration',
    description: 'Embed security into every stage of your development lifecycle.',
    features: ['Vulnerability Scanning', 'Compliance Automation', 'Secrets Management'],
  },
]

const technologies = [
  { category: 'CI/CD', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'] },
  { category: 'IaC', items: ['Terraform', 'Pulumi', 'Ansible', 'CloudFormation'] },
  { category: 'Containerization', items: ['Docker', 'Kubernetes', 'ECS', 'Helm'] },
  { category: 'Monitoring', items: ['Datadog', 'Prometheus', 'Grafana', 'CloudWatch'] },
]

export default function EnterpriseDevopsClient() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-sky-500/10 text-sky-400 border-sky-500/20">
                  <Building2 className="w-3.5 h-3.5 mr-2" />
                  Enterprise Solutions
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Enterprise{' '}
                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  DevOps
                </span>{' '}
                Transformation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl"
              >
                Scale your engineering operations, improve developer velocity, and
                enforce security and compliance across the organization.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=enterprise-devops">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-500 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300"
                  asChild
                >
                  <Link href="/case-studies">
                    View Case Studies
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 mb-4">
                    <service.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Enterprise Toolchain
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We work with the industry-standard tools to build resilient and scalable systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-slate-800 bg-slate-900/30 text-center"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{tech.category}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tech.items.map((item) => (
                      <Badge key={item} variant="secondary" className="bg-slate-800 text-slate-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Transform Your DevOps Culture
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Let&apos;s build a roadmap to modernize your infrastructure and development processes.
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
                  className="bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=enterprise-devops">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
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
