'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { articles } from '@/lib/data/articles'

const categories = [
  'All',
  'Industry Insights',
  'Technical Deep Dive',
  'Strategy',
  'Case Studies',
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

export default function InsightsPage() {
  const [filter, setFilter] = React.useState('All')
  const [search, setSearch] = React.useState('')

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = filter === 'All' || article.category === filter
    const matchesSearch =
      search === '' ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredArticles = filteredArticles.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-white dark:bg-zinc-950">
          <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Insights & Resources
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
              >
                Thought Leadership &{' '}
                <span className="text-gradient">Deep Dives</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-zinc-600 dark:text-zinc-400 mb-8"
              >
                Expert insights on AI strategy, implementation, and best practices from
                the Digital DevOps team.
              </motion.p>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-md mx-auto relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
          <div className="container-wide">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category
                      ? 'bg-brand-600 text-white'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="section bg-white dark:bg-zinc-950">
            <div className="container-wide">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
                Featured
              </h2>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {featuredArticles.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={item}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-brand-500/5 to-accent-500/5"
                  >
                    <div className="p-8">
                      <Badge variant="secondary" className="mb-4">
                        {article.category}
                      </Badge>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        <Link href={`/insights/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <Link
                          href={`/insights/${article.id}`}
                          className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:gap-2 transition-all"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section className="section bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">
              All Articles
            </h2>
            {regularArticles.length === 0 && featuredArticles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-zinc-600 dark:text-zinc-400">
                  No articles found matching your criteria.
                </p>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {regularArticles.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={item}
                    className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {article.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                        <Link href={`/insights/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {article.date} • {article.readTime}
                        </span>
                        <Link
                          href={`/insights/${article.id}`}
                          className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section bg-zinc-900 dark:bg-zinc-950">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Stay Ahead of the Curve
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-zinc-400 mb-8"
              >
                Get the latest AI insights, strategies, and best practices delivered
                to your inbox monthly.
              </motion.p>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault()
                  // Handle newsletter signup
                }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  required
                />
                <Button variant="gradient" type="submit">
                  Subscribe
                </Button>
              </motion.form>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xs text-zinc-500 mt-4"
              >
                No spam. Unsubscribe anytime.
              </motion.p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
