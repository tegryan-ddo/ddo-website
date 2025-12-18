'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  GitPullRequest,
  FileText,
  Settings,
  CheckCircle,
  Shield,
  ArrowRight,
  Github,
  ChevronDown,
  ChevronUp,
  Zap,
  Users,
  Search,
  Code,
  Target,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

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

const whatYouDo = [
  {
    step: 1,
    title: 'Request a feature in Slack',
    description: 'Using a simple slash command',
    icon: MessageSquare,
  },
  {
    step: 2,
    title: 'Answer clarifying questions',
    description: 'Only when needed',
    icon: Users,
  },
  {
    step: 3,
    title: 'Review the PR and merge',
    description: 'When you\'re happy',
    icon: GitPullRequest,
  },
]

const whatEnkaiDoes = [
  {
    title: 'Turns requests into work that fits your product',
    description: 'Enkai converts each request into a GitHub issue and reviews it in the context of your entire app—so features don\'t get built in isolation.',
    icon: Target,
  },
  {
    title: 'Plans before it codes',
    description: 'Before implementation, Enkai produces a clear, human-readable plan: what will change, where it will change, what the user will notice, and how it will be tested.',
    icon: FileText,
  },
  {
    title: 'Builds multiple features efficiently',
    description: 'Instead of doing one tiny change at a time, Enkai can batch small-to-medium requests together—so you get meaningful progress in fewer review cycles.',
    icon: Zap,
  },
  {
    title: 'Implements in a clean, isolated environment',
    description: 'Work happens in an isolated build environment so changes are reproducible, reviewable, and don\'t contaminate your main branch.',
    icon: Settings,
  },
  {
    title: 'Submits a pull request for human approval',
    description: 'Every change lands as a PR with: a plain-English summary, what was added/changed, how to validate it, and any tradeoffs or follow-ups.',
    icon: GitPullRequest,
  },
]

const whyTeamsLikeThis = [
  {
    title: 'Less meetings, more shipping',
    description: 'You don\'t need a ceremony to keep momentum. The work shows up as PRs.',
    icon: Zap,
  },
  {
    title: 'Your repo is the source of truth',
    description: 'Everything is traceable: request, discussion, implementation, and review live together.',
    icon: Github,
  },
  {
    title: 'Safe by default',
    description: 'Nothing merges automatically. You approve what ships.',
    icon: Shield,
  },
]

const useCases = [
  'Add new pages and flows (marketing, onboarding, internal tools)',
  'Build new features behind feature flags',
  'Improve UX and performance iteratively',
  'Integrate third-party services (auth, billing, CRM, analytics)',
  'Refactor and harden areas that need enterprise polish',
]

const faqs = [
  {
    question: 'Will Enkai match our style and patterns?',
    answer: 'Yes—Enkai works from your repo and existing code conventions. Over time it becomes increasingly consistent with your patterns.',
  },
  {
    question: 'Do we lose control over architecture?',
    answer: 'No. You review every PR. If you want stricter controls, you can enforce CODEOWNERS, required reviews, CI gates, and branch protections.',
  },
  {
    question: 'What if the request is ambiguous?',
    answer: 'Enkai asks targeted questions only when needed. The goal is minimal back-and-forth, not silence.',
  },
  {
    question: 'How do we validate changes?',
    answer: 'Each PR includes a validation checklist (what to click, what to verify, what should happen).',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-slate-400">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function EnkaiHowItWorksClient() {
  const [showTechnical, setShowTechnical] = useState(false)

  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge
                  variant="outline"
                  className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-400"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-2" />
                  Slack → GitHub → Ship
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Build software the way you{' '}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  already think about it.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto"
              >
                <strong className="text-white">Ask for a feature in Slack.</strong>{' '}
                Enkai turns it into a plan, implements it safely, and submits a{' '}
                <strong className="text-white">pull request</strong> for your review.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl max-w-xl mx-auto mb-8"
              >
                <p className="text-lg text-slate-300">
                  You describe what you want. Enkai delivers a PR you can review and merge.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-violet-500 to-purple-500"
                  asChild
                >
                  <Link href="/contact?service=enkai">
                    Try Enkai on Your Repo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What You Do */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">What you do</h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {whatYouDo.map((step) => (
                <motion.div
                  key={step.step}
                  variants={item}
                  className="relative"
                >
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 mb-4">
                      <step.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="text-sm font-medium text-violet-400 mb-2">Step {step.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-lg text-slate-300 mt-8"
            >
              That&apos;s it.
            </motion.p>
          </div>
        </section>

        {/* What Enkai Does */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">What Enkai does</h2>
            </motion.div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {whatEnkaiDoes.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {index + 1}) {item.title}
                      </h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-lg text-slate-300 mt-8"
            >
              You stay in control.
            </motion.p>
          </div>
        </section>

        {/* The Enkai Loop */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-8">The Enkai loop (end-to-end)</h2>

              <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-8">
                <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-medium">
                  <span className="text-violet-400">Slack</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-purple-400">GitHub Issue</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-pink-400">Plan</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-fuchsia-400">Build</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-violet-400">PR</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-purple-400">Your Review</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-pink-400">Merge</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">Repeat</span>
                </div>
              </div>

              <p className="text-xl text-slate-300 mt-8">
                This is the entire product.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Teams Like This */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Why teams like this approach</h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {whyTeamsLikeThis.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={item}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Common use cases</h2>

              <ul className="space-y-3">
                {useCases.map((useCase) => (
                  <motion.li
                    key={useCase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{useCase}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">FAQ</h2>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Under the Hood (Collapsible) */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-white">Under the hood (optional technical detail)</span>
                {showTechnical ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {showTechnical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl"
                >
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-2">
                      <Code className="w-4 h-4 mt-1 text-violet-400" />
                      <span>Enkai builds enterprise-ready Next.js apps backed by bespoke AWS infrastructure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Github className="w-4 h-4 mt-1 text-violet-400" />
                      <span>GitHub issues drive the queue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Settings className="w-4 h-4 mt-1 text-violet-400" />
                      <span>Work is implemented in isolated environments, then proposed via pull requests.</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-slate-800">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-500/20 rounded-2xl p-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Want to see it on your codebase?
              </h2>
              <p className="text-slate-400 mb-8">
                If you can provide a Next.js repo and a Slack workspace, Enkai can start producing PRs from real requests.
              </p>
              <Button
                variant="gradient"
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-purple-500"
                asChild
              >
                <Link href="/contact?service=enkai">
                  Get Started with Enkai
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
