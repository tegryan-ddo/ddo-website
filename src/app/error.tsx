'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center max-w-lg">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-4">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-slate-400 mb-4">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {error.digest && (
          <p className="text-sm text-slate-500 mb-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={reset}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        {/* Contact Support */}
        <p className="mt-8 text-sm text-slate-500">
          If this problem persists, please{' '}
          <Link
            href="/contact"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
