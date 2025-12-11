'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  FileCheck,
  AlertTriangle,
  Lock,
  Eye,
  FileText,
  Users,
  Award,
  Search,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const packages = [
  {
    name: 'Security Shield Audit',
    price: '$2,999',
    delivery: '5 days',
    description: 'Quick security health check for your AWS infrastructure',
    features: [
      'AWS Security Hub assessment',
      'IAM policy review & recommendations',
      'Network security analysis',
      'S3 bucket security audit',
      'Encryption review (at-rest & in-transit)',
      'Public exposure scan',
      'Compliance gap summary',
    ],
    deliverables: [
      'Executive summary (non-technical)',
      'Detailed findings report',
      'Prioritized remediation roadmap',
      '30-minute review call',
    ],
  },
  {
    name: 'Security Shield Comprehensive',
    price: '$7,999',
    delivery: '10 days',
    popular: true,
    description: 'Full security posture assessment with remediation',
    features: [
      'Everything in Audit, plus:',
      'CloudTrail log analysis',
      'GuardDuty findings review',
      'Secrets management assessment',
      'Backup and DR review',
      'Incident response plan review',
      'Compliance mapping (SOC2, HIPAA, PCI)',
      'Third-party integration security review',
    ],
    deliverables: [
      'All Audit deliverables',
      'Compliance readiness scorecard',
      '8 hours remediation included',
      '60-minute executive briefing',
    ],
  },
  {
    name: 'Penetration Test',
    price: '$7,999',
    delivery: '10 days',
    description: 'External and application security testing',
    features: [
      'External network penetration test',
      'Web application security testing',
      'OWASP Top 10 assessment',
      'API security assessment',
      'Authentication/authorization testing',
      'Business logic testing',
      'Social engineering awareness (optional)',
    ],
    deliverables: [
      'Executive summary',
      'Technical findings report',
      'Proof of concept for vulnerabilities',
      'Remediation recommendations',
      'Re-test of critical findings (30 days)',
      'Attestation letter for customers',
    ],
  },
]

const compliancePackages = [
  {
    name: 'SOC 2 Accelerator',
    price: '$24,999',
    delivery: '90 days to audit-ready',
    description: 'Complete SOC 2 Type 1 readiness preparation',
    icon: Award,
    features: [
      'SOC 2 Type 1 readiness assessment',
      'Gap analysis against Trust Service Criteria',
      'Policy document generation (20+ documents)',
      'Control implementation guidance',
      'Evidence collection system setup',
      'Security tool configuration',
      'Employee security training materials',
      'Auditor selection assistance',
      'Audit coordination and support',
    ],
    note: 'Audit fees ($10-20K) and compliance platform ($5-15K/year) are additional.',
  },
  {
    name: 'HIPAA Compliance',
    price: '$34,999',
    delivery: '12 weeks',
    description: 'Healthcare compliance for PHI handling',
    icon: FileCheck,
    features: [
      'HIPAA gap assessment',
      'Technical safeguards implementation',
      'Administrative safeguards documentation',
      'Physical safeguards guidance',
      'AWS HIPAA-eligible service configuration',
      'BAA coordination with AWS',
      'Encryption implementation',
      'Audit logging setup',
      'Incident response procedures',
      'Employee training program',
    ],
    note: 'Includes complete HIPAA documentation, risk assessment, and policy library.',
  },
]

const auditAreas = [
  { icon: Lock, title: 'IAM & Access', description: 'User permissions, roles, and policies' },
  { icon: Shield, title: 'Network Security', description: 'VPCs, security groups, NACLs' },
  { icon: Eye, title: 'Data Protection', description: 'Encryption, backup, retention' },
  { icon: AlertTriangle, title: 'Threat Detection', description: 'GuardDuty, Security Hub, CloudTrail' },
  { icon: FileText, title: 'Compliance', description: 'SOC 2, HIPAA, PCI, GDPR' },
  { icon: Search, title: 'Vulnerability', description: 'Scanning, patching, remediation' },
]

export default function SecurityClient() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Shield className="w-3.5 h-3.5 mr-2" />
                  Security & Compliance
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Enterprise-Grade{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Security
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl"
              >
                From quick security audits to full SOC 2 compliance preparation.
                We help you meet customer requirements and protect your infrastructure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=security-audit">
                    Get Security Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/contact?service=soc2">
                    SOC 2 Readiness
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Audit Areas */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {auditAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-3">
                    <area.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{area.title}</h3>
                  <p className="text-xs text-slate-400">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Packages */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Security Assessment Packages
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Know your security posture. Get actionable recommendations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl border ${
                    pkg.popular
                      ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-transparent'
                      : 'border-slate-800 bg-slate-900/50'
                  } p-6`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-0">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{pkg.description}</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      {pkg.delivery}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      What We Review
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                    asChild
                  >
                    <Link href={`/contact?service=${encodeURIComponent(pkg.name)}`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Packages */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Compliance Packages
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Get audit-ready faster. We&apos;ve helped dozens of startups achieve compliance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compliancePackages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                      <pkg.icon className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                      <p className="text-slate-400">{pkg.description}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                    <Clock className="w-4 h-4" />
                    {pkg.delivery}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {pkg.note && (
                    <div className="rounded-lg bg-slate-900 p-4 mb-6">
                      <p className="text-sm text-slate-400">{pkg.note}</p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"
                    asChild
                  >
                    <Link href={`/contact?service=${encodeURIComponent(pkg.name)}`}>
                      Start Compliance Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Security Matters */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Why Security Can&apos;t Wait
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      stat: '65%',
                      text: 'of security incidents come from cloud misconfigurations',
                    },
                    {
                      stat: '$4.45M',
                      text: 'average cost of a data breach in 2023',
                    },
                    {
                      stat: '83%',
                      text: 'of enterprises require SOC 2 from their vendors',
                    },
                  ].map((item) => (
                    <div key={item.stat} className="flex items-start gap-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {item.stat}
                      </div>
                      <p className="text-slate-400 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Common Security Issues We Find
                </h3>
                <ul className="space-y-4">
                  {[
                    'Overly permissive IAM policies',
                    'Public S3 buckets with sensitive data',
                    'Unencrypted databases',
                    'Missing MFA on root accounts',
                    'Default security group rules',
                    'No CloudTrail logging enabled',
                    'Outdated software with known CVEs',
                    'Secrets stored in code repositories',
                  ].map((issue) => (
                    <li key={issue} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{issue}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
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
                Know Your Security Posture
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Get a comprehensive security assessment in 5-10 days.
                Actionable findings, prioritized remediation, executive summary.
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
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=security-audit">
                    Start Security Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/contact?service=soc2">
                    Discuss SOC 2
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
