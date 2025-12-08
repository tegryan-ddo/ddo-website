'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { articles, getArticleById, getRelatedArticles } from '@/lib/data/articles'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = getArticleById(slug)
  const relatedArticles = article ? getRelatedArticles(slug, 3) : []

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/insights">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link
              href="/insights"
              className="inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-brand-500 transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Link>

            {/* Category Badge */}
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 max-w-4xl">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
                {/* Render markdown content */}
                <ArticleContent content={article.content} />
              </div>

              {/* Author Box */}
              <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {article.author.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                      {article.author.role}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      Helping enterprises turn AI experiments into production value through deep technical expertise in AI, React, and DevOps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Share this article:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
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
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24 space-y-8"
              >
                {/* CTA Box */}
                <div className="p-6 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready to Move Beyond POC?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Take our AI Readiness Assessment to discover where you stand and get personalized recommendations.
                  </p>
                  <Button variant="secondary" size="sm" asChild className="w-full">
                    <Link href="/assessment">Take Free Assessment</Link>
                  </Button>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/insights/${related.id}`}
                          className="block p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Badge variant="outline" className="text-xs mb-2">
                            {related.category}
                          </Badge>
                          <h4 className="font-medium text-zinc-900 dark:text-white text-sm leading-snug">
                            {related.title}
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                            {related.readTime}
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

      {/* More Articles CTA */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Explore More Insights
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Stay ahead of the AI curve with our latest research, case studies, and practical guides.
          </p>
          <Button asChild>
            <Link href="/insights">View All Articles</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

// Simple markdown-to-JSX renderer for article content
function ArticleContent({ content }: { content: string }) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | 'checklist' | null = null
  let inCodeBlock = false
  let codeContent: string[] = []
  let inTable = false
  let tableRows: string[][] = []

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      if (listType === 'ul' || listType === 'checklist') {
        elements.push(
          <ul key={elements.length} className="my-4 space-y-2">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                {listType === 'checklist' ? (
                  <>
                    <input type="checkbox" disabled className="mt-1" />
                    <span>{item}</span>
                  </>
                ) : (
                  <>
                    <span className="text-brand-500 mt-1.5">•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                  </>
                )}
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
          <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
            <thead>
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {body.filter(row => !row[0].startsWith('---')).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300">
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
      .replace(/`(.+?)`/g, '<code class="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">$1</code>')
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={elements.length} className="my-4 p-4 bg-zinc-900 dark:bg-zinc-800 rounded-lg overflow-x-auto">
            <code className="text-sm text-zinc-100">{codeContent.join('\n')}</code>
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
        <h2 key={elements.length} className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-zinc-900 dark:text-white mt-6 mb-3">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    if (line.startsWith('#### ')) {
      flushList()
      elements.push(
        <h4 key={elements.length} className="text-lg font-semibold text-zinc-900 dark:text-white mt-4 mb-2">
          {line.slice(5)}
        </h4>
      )
      continue
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushList()
      elements.push(<hr key={elements.length} className="my-8 border-zinc-200 dark:border-zinc-700" />)
      continue
    }

    // Lists
    if (line.match(/^- \[[ x]\] /)) {
      if (listType !== 'checklist') {
        flushList()
        listType = 'checklist'
      }
      currentList.push(line.slice(6))
      continue
    }

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
      <p key={elements.length} className="my-4 text-zinc-600 dark:text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
    )
  }

  flushList()
  flushTable()

  return <>{elements}</>
}
