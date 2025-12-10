'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GitBranch,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Globe,
  Database,
  Monitor,
  Lock,
  Server,
  Code,
  Terminal,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { repoToProductionTiers } from '@/lib/data/services'

const supportedStacks = [
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Go', icon: '🔵' },
  { name: 'Ruby', icon: '💎' },
  { name: 'Java', icon: '☕' },
  { name: 'PHP', icon: '🐘' },
  { name: '.NET', icon: '🔷' },
  { name: 'Rust', icon: '🦀' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Django', icon: '🎸' },
  { name: 'Rails', icon: '🛤️' },
  { name: 'FastAPI', icon: '⚡' },
]

const howItWorks = [
  {
    step: 1,
    title: 'Connect Your Repo',
    description: 'Link your GitHub, GitLab, or Bitbucket repository. We support any language or framework.',
    icon: GitBranch,
  },
  {
    step: 2,
    title: 'We Configure Everything',
    description: 'Our team sets up your infrastructure: compute, databases, CDN, SSL, monitoring—all SOC 2 compliant.',
    icon: Server,
  },
  {
    step: 3,
    title: 'Push and Deploy',
    description: 'Every push to your main branch triggers automatic deployment. Zero downtime, instant rollbacks.',
    icon: Zap,
  },
  {
    step: 4,
    title: 'We Handle the Rest',
    description: 'Scaling, security patches, monitoring, incident response—we manage it all so you can focus on code.',
    icon: Shield,
  },
]

const features = [
  {
    icon: Shield,
    title: 'SOC 2 Compliant',
    description: 'Enterprise-grade security and compliance included at every tier. Audit-ready from day one.',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Your app served from edge locations worldwide. Fast load times for every user.',
  },
  {
    icon: Database,
    title: 'Managed Databases',
    description: 'PostgreSQL, MySQL, Redis, MongoDB—fully managed with automated backups.',
  },
  {
    icon: Monitor,
    title: '24/7 Monitoring',
    description: 'Real-time monitoring, alerting, and incident response. We catch issues before your users do.',
  },
  {
    icon: Lock,
    title: 'SSL & Security',
    description: 'Free SSL certificates, DDoS protection, WAF, and automatic security updates.',
  },
  {
    icon: Terminal,
    title: 'Any Stack',
    description: 'Node, Python, Go, Ruby, Java, PHP, .NET, Rust—if it runs, we can deploy it.',
  },
]

export default function RepoToProductionPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge
                  variant="outline"
                  className="mb-6 border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                >
                  <GitBranch className="w-3.5 h-3.5 mr-2" />
                  Enterprise Hosting • Startup Pricing
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Give Us Your Repo.{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  We Handle the Rest.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
              >
                Any language. Any framework. Any stack. We deploy it on enterprise-grade,
                SOC 2 compliant AWS infrastructure—starting at just $299/month.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  variant="gradient"
                  size="xl"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500"
                  asChild
                >
                  <Link href="/contact?service=repo-to-production">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                  asChild
                >
                  <Link href="#pricing">
                    View Pricing
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Supported Stacks */}
        <section className="py-12 border-y border-slate-800">
          <div className="container-wide">
            <p className="text-center text-slate-500 text-sm mb-6">Works with any stack you&apos;re using</p>
            <div className="flex flex-wrap justify-center gap-4">
              {supportedStacks.map((stack) => (
                <div
                  key={stack.name}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg"
                >
                  <span>{stack.icon}</span>
                  <span className="text-sm text-slate-300">{stack.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From repo to production in 4 simple steps. No DevOps experience required.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-slate-950 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 font-bold text-sm">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Everything You Need, Nothing You Don&apos;t</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Enterprise-grade infrastructure without the enterprise complexity or price tag.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 scroll-mt-24">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Enterprise infrastructure at startup-friendly prices. No hidden fees, no surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {repoToProductionTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${tier.highlighted ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div
                    className={`h-full rounded-2xl p-6 flex flex-col ${
                      tier.highlighted
                        ? 'bg-slate-800 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/50 border border-slate-800'
                    }`}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
                    </div>

                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-slate-400">{tier.priceNote}</span>
                    </div>

                    <p className="text-sm text-slate-400 mb-6">{tier.description}</p>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={tier.highlighted ? 'gradient' : 'outline'}
                      className={
                        tier.highlighted
                          ? 'w-full bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'w-full border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                      }
                      asChild
                    >
                      <Link href={tier.ctaLink}>
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 bg-slate-900/50">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us Over...</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="py-4 px-6 text-left text-sm font-medium text-slate-400"></th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-slate-400">Vercel/Heroku</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-slate-400">DIY AWS</th>
                    <th className="py-4 px-6 text-left text-sm font-medium text-emerald-400">DevAIOps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-6 text-slate-300 font-medium">SOC 2 Compliant</td>
                    <td className="py-4 px-6 text-slate-500">Enterprise only ($$$)</td>
                    <td className="py-4 px-6 text-slate-500">You build it</td>
                    <td className="py-4 px-6 text-white font-medium">✓ From $299/mo</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-6 text-slate-300 font-medium">Any Stack</td>
                    <td className="py-4 px-6 text-slate-500">Limited</td>
                    <td className="py-4 px-6 text-slate-500">Yes (complex)</td>
                    <td className="py-4 px-6 text-white font-medium">✓ We handle it</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-6 text-slate-300 font-medium">DevOps Required</td>
                    <td className="py-4 px-6 text-slate-500">Some</td>
                    <td className="py-4 px-6 text-slate-500">Extensive</td>
                    <td className="py-4 px-6 text-white font-medium">✓ Zero</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 px-6 text-slate-300 font-medium">Custom Architecture</td>
                    <td className="py-4 px-6 text-slate-500">No</td>
                    <td className="py-4 px-6 text-slate-500">Yes</td>
                    <td className="py-4 px-6 text-white font-medium">✓ Available</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-slate-300 font-medium">Enterprise Support</td>
                    <td className="py-4 px-6 text-slate-500">$$$</td>
                    <td className="py-4 px-6 text-slate-500">N/A</td>
                    <td className="py-4 px-6 text-white font-medium">✓ Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Ship Faster?
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Stop wrestling with infrastructure. Give us your repo and start focusing on what matters—your code.
              </p>
              <Button
                variant="gradient"
                size="xl"
                className="bg-gradient-to-r from-emerald-500 to-teal-500"
                asChild
              >
                <Link href="/contact?service=repo-to-production">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
