'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  Quote,
  Share2,
  TrendingUp,
  Users,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { caseStudies, getCaseStudyById, getRelatedCaseStudies } from '@/lib/data/case-studies'

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  const caseStudy = getCaseStudyById(slug)
  const relatedStudies = caseStudy ? getRelatedCaseStudies(slug, 2) : []

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Case Study Not Found
          </h1>
          <p className="text-slate-400 mb-8">
            The case study you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/case-studies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
        <div className={`absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br ${caseStudy.color} opacity-20 rounded-full blur-3xl`} />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link
              href="/case-studies"
              className="inline-flex items-center text-sm text-slate-400 hover:text-brand-500 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Link>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {caseStudy.title}
            </h1>

            {/* Client Info */}
            <p className="text-xl text-brand-400 font-medium mb-6">
              {caseStudy.client} | {caseStudy.industry}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{caseStudy.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{caseStudy.teamSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{caseStudy.industry}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes Banner */}
      <section className="py-12 bg-slate-900">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-brand-500" />
              <h2 className="text-lg font-semibold text-white">
                Key Outcomes
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {caseStudy.outcomes.map((outcome) => (
                <div key={outcome.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                    {outcome.metric}
                  </div>
                  <div className="text-sm text-slate-400">
                    {outcome.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              {/* Challenge & Solution Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-slate-900 rounded-xl">
                  <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">
                    The Challenge
                  </h3>
                  <p className="text-slate-400">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div className="p-6 bg-brand-900/20 rounded-xl">
                  <h3 className="text-sm font-semibold text-brand-100 mb-2 uppercase tracking-wide">
                    Our Solution
                  </h3>
                  <p className="text-brand-200">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Full Content */}
              <div className="prose prose-invert prose-slate prose-lg max-w-none">
                <CaseStudyContent content={caseStudy.content} />
              </div>

              {/* Technologies Used */}
              <div className="mt-12 p-6 bg-slate-900 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <div className="mt-12 p-8 bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-2xl">
                  <Quote className="h-10 w-10 text-brand-500 mb-4" />
                  <blockquote className="text-xl text-white mb-4 italic">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-white">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-sm text-slate-400">
                      {caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-slate-400">Share this case study:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(caseStudy.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="sticky top-24 space-y-8"
              >
                {/* CTA Box */}
                <div className="p-6 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready for Similar Results?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Let's discuss how we can help you achieve your AI and DevOps goals.
                  </p>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" asChild className="w-full">
                      <Link href="/contact">Schedule Consultation</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="w-full text-white hover:text-white hover:bg-white/10">
                      <Link href="/assessment">Take AI Assessment</Link>
                    </Button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 bg-slate-900 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Project Details
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs text-slate-400 uppercase tracking-wide">
                        Industry
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {caseStudy.industry}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 uppercase tracking-wide">
                        Duration
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {caseStudy.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 uppercase tracking-wide">
                        Team Size
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {caseStudy.teamSize}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400 uppercase tracking-wide">
                        Services
                      </dt>
                      <dd className="flex flex-wrap gap-1 mt-1">
                        {caseStudy.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Related Case Studies */}
                {relatedStudies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Related Case Studies
                    </h3>
                    <div className="space-y-4">
                      {relatedStudies.map((related) => (
                        <Link
                          key={related.id}
                          href={`/case-studies/${related.id}`}
                          className="block p-4 bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
                        >
                          <Badge variant="outline" className="text-xs mb-2">
                            {related.industry}
                          </Badge>
                          <h4 className="font-medium text-white text-sm leading-snug">
                            {related.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-2">
                            {related.client}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="container-wide text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results with AI and DevOps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/contact" className="flex items-center">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white" asChild>
              <Link href="/case-studies">View More Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Simple markdown-to-JSX renderer for case study content
function CaseStudyContent({ content }: { content: string }) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let inCodeBlock = false
  let codeContent: string[] = []
  let inTable = false
  let tableRows: string[][] = []

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      if (listType === 'ul') {
        elements.push(
          <ul key={elements.length} className="my-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-500 mt-1.5">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        )
      } else {
        elements.push(
          <ol key={elements.length} className="my-4 space-y-2 list-decimal list-inside">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        )
      }
      currentList = []
      listType = null
    }
  }

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, ...body] = tableRows
      elements.push(
        <div key={elements.length} className="my-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead>
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-white bg-slate-800">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {body.filter(row => !row[0].startsWith('---') && !row[0].includes('----')).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-sm text-slate-300">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
      inTable = false
    }
  }

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-400 hover:underline">$1</a>')
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={elements.length} className="my-4 p-4 bg-slate-800 rounded-lg overflow-x-auto">
            <code className="text-sm text-slate-100 font-mono">{codeContent.join('\n')}</code>
          </pre>
        )
        codeContent = []
        inCodeBlock = false
      } else {
        flushList()
        flushTable()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) {
        flushList()
        inTable = true
      }
      const cells = line.split('|').slice(1, -1)
      tableRows.push(cells)
      continue
    } else if (inTable) {
      flushTable()
    }

    // Headings
    if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-white mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    if (line.startsWith('#### ')) {
      flushList()
      elements.push(
        <h4 key={elements.length} className="text-lg font-semibold text-white mt-6 mb-2">
          {line.slice(5)}
        </h4>
      )
      continue
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushList()
      elements.push(<hr key={elements.length} className="my-8 border-slate-700" />)
      continue
    }

    // Lists
    if (line.match(/^- /)) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      currentList.push(line.slice(2))
      continue
    }

    if (line.match(/^\d+\. /)) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      currentList.push(line.replace(/^\d+\. /, ''))
      continue
    }

    // Empty line
    if (line.trim() === '') {
      flushList()
      continue
    }

    // Regular paragraph
    flushList()
    elements.push(
      <p key={elements.length} className="my-4 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
    )
  }

  flushList()
  flushTable()

  return <>{elements}</>
}
