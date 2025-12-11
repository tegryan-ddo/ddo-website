import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getArticleById, getRelatedArticles } from '@/lib/data/articles'
import ArticleClient from './ArticleClient'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleById(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | Digital DevOps Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    }
  }
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleById(params.slug)
  const relatedArticles = article ? getRelatedArticles(params.slug, 3) : []

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-400 mb-8">
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

  return <ArticleClient article={article} relatedArticles={relatedArticles} />
}
