'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Clock,
  Zap,
  Layers,
  Bot,
  Smartphone,
  Database,
  Lock,
  Gauge,
  Palette,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const packages = [
  {
    name: 'Landing Page Pro',
    price: '$2,999',
    delivery: '5 days',
    description: 'High-converting marketing sites and product launches',
    features: [
      'Custom Next.js 15 landing page',
      'Mobile-first responsive design',
      'Up to 5 sections/pages',
      'Contact form with email delivery',
      'SEO optimization (meta tags, structured data)',
      'Analytics integration (GA4 or Plausible)',
      'Performance optimization (90+ Lighthouse)',
      'Vercel or AWS Amplify deployment',
    ],
    deliverables: ['Source code (GitHub)', 'Deployment config', 'Content editing guide', '14-day support'],
  },
  {
    name: 'MVP Builder',
    price: '$14,999',
    delivery: '4 weeks',
    popular: true,
    description: 'Full-stack applications for startups building their first product',
    features: [
      'Complete Next.js application',
      'User authentication (Cognito, Auth0, or Clerk)',
      'PostgreSQL database + Prisma ORM',
      '5-10 core features (defined in kickoff)',
      'Admin dashboard',
      'REST or GraphQL API',
      'File upload handling',
      'Email notifications (AWS SES)',
      'Responsive UI (Tailwind CSS)',
      'AWS or Vercel deployment',
    ],
    deliverables: ['Complete source code', 'Database schema', 'API documentation', 'Deployment guide', 'User guide', '30-day support'],
    addons: [
      { name: 'AI integration (Claude/GPT)', price: '+$4,999' },
      { name: 'Payment processing (Stripe)', price: '+$2,999' },
      { name: 'Additional features', price: '$1,500/feature' },
    ],
  },
  {
    name: 'AI Integration Sprint',
    price: '$9,999',
    delivery: '2 weeks',
    description: 'Add AI capabilities to existing applications',
    features: [
      'AI use case discovery and design',
      'LLM integration (Claude, GPT, or Bedrock)',
      'RAG pipeline setup (if applicable)',
      'Prompt engineering and optimization',
      'Rate limiting and cost controls',
      'Error handling and fallbacks',
      'Production deployment',
      'Monitoring and logging',
    ],
    deliverables: ['Integrated AI features', 'Prompt library', 'Cost optimization guide', 'Usage monitoring dashboard', '30-day support'],
    useCases: ['Customer support chatbot', 'Document Q&A system', 'Content generation', 'Data extraction', 'Code assistance', 'Recommendation engine'],
  },
]

const techStack = [
  { name: 'Next.js 15', category: 'Framework' },
  { name: 'React 19', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Vercel', category: 'Deployment' },
]

const capabilities = [
  { icon: Smartphone, title: 'Responsive Design', description: 'Mobile-first, works on all devices' },
  { icon: Gauge, title: 'Performance', description: '90+ Lighthouse scores guaranteed' },
  { icon: Lock, title: 'Security', description: 'Auth, encryption, best practices' },
  { icon: Bot, title: 'AI Integration', description: 'Claude, GPT, AWS Bedrock' },
  { icon: Database, title: 'Full-Stack', description: 'Frontend, API, database' },
  { icon: Palette, title: 'Design Systems', description: 'Consistent, scalable UI' },
]


export const metadata = {
  title: 'Next.js Application Development & MVP Building | Digital DevOps',
  description: 'Custom Next.js web application development. From high-converting landing pages to full-stack MVPs with AI integration options.',
}

export default function DevelopmentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-violet-500/10 text-violet-400 border-violet-500/20">
                  <Code2 className="w-3.5 h-3.5 mr-2" />
                  Application Development
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
              >
                Next.js Apps{' '}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Built Fast
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl"
              >
                Modern web applications with AI-powered development speed.
                From landing pages to full-stack MVPs, built with TypeScript,
                Tailwind, and AWS best practices.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=mvp-builder">
                    Start Your MVP
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/contact?service=landing-page">
                    Need a Landing Page?
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 border-y border-slate-800">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 mb-3">
                    <cap.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{cap.title}</h3>
                  <p className="text-xs text-slate-400">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Development Packages
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Fixed-price packages with clear deliverables. No hourly surprises.
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
                      ? 'border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent'
                      : 'border-slate-800 bg-slate-900/50'
                  } p-6`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-violet-600 to-purple-500 text-white border-0">
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
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pkg.addons && (
                    <div className="mb-6 pt-4 border-t border-slate-800">
                      <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                        Add-ons
                      </h4>
                      <ul className="space-y-2">
                        {pkg.addons.map((addon) => (
                          <li key={addon.name} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{addon.name}</span>
                            <span className="text-violet-400 font-medium">{addon.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pkg.useCases && (
                    <div className="mb-6 pt-4 border-t border-slate-800">
                      <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                        Use Cases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.useCases.map((uc) => (
                          <Badge key={uc} variant="outline" className="border-slate-700 text-slate-400">
                            {uc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white'
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

        {/* Tech Stack */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Modern Tech Stack
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We build with the latest tools for performance, maintainability, and developer experience
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center"
                >
                  <div className="text-lg font-semibold text-white mb-1">{tech.name}</div>
                  <div className="text-sm text-slate-400">{tech.category}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
                    Custom Projects
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Enterprise Applications
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Complex web applications with multiple integrations, advanced features,
                    and enterprise requirements. We scope these individually to ensure
                    the right solution for your needs.
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-white">Starting at $49,999</span>
                    <span className="text-slate-400">8-12 weeks</span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white"
                    asChild
                  >
                    <Link href="/contact?service=enterprise-application">
                      Discuss Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Complex web application',
                    'Multiple user roles',
                    'Third-party integrations',
                    'Real-time features',
                    'Advanced workflows',
                    'Comprehensive testing',
                    'Security hardening',
                    'Team training',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                How We Work
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                A streamlined process that keeps you informed every step of the way
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Discovery', description: 'Understand requirements and define scope' },
                { step: '2', title: 'Design', description: 'Wireframes, tech decisions, timeline' },
                { step: '3', title: 'Build', description: 'AI-augmented development sprints' },
                { step: '4', title: 'Review', description: 'Testing, feedback, refinements' },
                { step: '5', title: 'Launch', description: 'Deployment, docs, knowledge transfer' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Ready to Build?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-400 mb-8"
              >
                Let&apos;s discuss your project. We&apos;ll help you choose the right
                package and timeline for your needs.
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
                  className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white"
                  asChild
                >
                  <Link href="/contact?service=development">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  asChild
                >
                  <Link href="/pricing">
                    View All Pricing
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
