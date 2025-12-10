'use client'

import { motion } from 'framer-motion'
import { Book, FileText, Video, ArrowRight, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const resources = [
  {
    category: 'Getting Started',
    items: [
      {
        title: 'AI Readiness Assessment',
        description: 'Take our free assessment to evaluate your organization\'s AI readiness.',
        href: '/assessment',
        icon: FileText,
        internal: true,
      },
      {
        title: 'ROI Calculator',
        description: 'Calculate the potential return on investment for AI and DevOps initiatives.',
        href: '/calculator',
        icon: FileText,
        internal: true,
      },
    ],
  },
  {
    category: 'Case Studies',
    items: [
      {
        title: 'Success Stories',
        description: 'See how we\'ve helped enterprises transform with AI and modern DevOps.',
        href: '/case-studies',
        icon: Book,
        internal: true,
      },
    ],
  },
  {
    category: 'Industry Insights',
    items: [
      {
        title: 'Blog & Articles',
        description: 'Read our latest insights on AI adoption, DevOps practices, and industry trends.',
        href: '/insights',
        icon: FileText,
        internal: true,
      },
    ],
  },
  {
    category: 'External Resources',
    items: [
      {
        title: 'AWS Documentation',
        description: 'Official AWS documentation for cloud services and AI/ML tools.',
        href: 'https://docs.aws.amazon.com/',
        icon: ExternalLink,
        internal: false,
      },
      {
        title: 'Anthropic Claude Docs',
        description: 'Learn about Claude AI capabilities and best practices.',
        href: 'https://docs.anthropic.com/',
        icon: ExternalLink,
        internal: false,
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-600/10" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Book className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Resources & Documentation
            </h1>
            <p className="text-xl text-slate-400">
              Tools, guides, and resources to help you on your AI transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container-wide">
          <div className="space-y-12">
            {resources.map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon
                    const Wrapper = item.internal ? Link : 'a'
                    const wrapperProps = item.internal
                      ? { href: item.href }
                      : { href: item.href, target: '_blank', rel: 'noopener noreferrer' }

                    return (
                      <Wrapper
                        key={itemIndex}
                        {...wrapperProps}
                        className="block p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-brand-500 transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-brand-900/30 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-brand-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-brand-400 transition-colors flex items-center gap-2">
                              {item.title}
                              {!item.internal && (
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                              )}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Wrapper>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-slate-400 mb-6">
              Our team is here to help you navigate your AI transformation journey.
              Reach out for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/assessment">
                <Button variant="outline">
                  Take AI Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
