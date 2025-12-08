'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { initGA4, trackPageView, getAnalyticsConfig } from '@/lib/analytics'

/**
 * Analytics Provider Component
 *
 * Add this to your root layout to enable analytics tracking.
 * Supports both GA4 and Plausible based on environment variables.
 */
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const config = getAnalyticsConfig()

  // Initialize GA4 on mount
  useEffect(() => {
    if (config.gaId) {
      initGA4(config.gaId)
    }
  }, [config.gaId])

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView({
      url,
      referrer: document.referrer,
      title: document.title,
    })
  }, [pathname, searchParams])

  return (
    <>
      {/* Google Analytics 4 */}
      {config.gaId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${config.gaId}`}
          strategy="afterInteractive"
        />
      )}

      {/* Plausible Analytics */}
      {config.plausibleDomain && (
        <Script
          defer
          data-domain={config.plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

/**
 * Hook to track scroll depth
 * Call this in page components to track how far users scroll
 */
export function useScrollTracking(pageName: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const depths = [25, 50, 75, 100]
    const trackedDepths = new Set<number>()

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth)
          import('@/lib/analytics').then(({ trackScrollDepth }) => {
            trackScrollDepth(depth, pageName)
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pageName])
}

/**
 * Hook to track time spent on page
 * Call this in page components to track engagement time
 */
export function useTimeTracking(pageName: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    const intervals = [30, 60, 120, 300] // seconds
    const trackedIntervals = new Set<number>()

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)

      intervals.forEach((seconds) => {
        if (elapsedSeconds >= seconds && !trackedIntervals.has(seconds)) {
          trackedIntervals.add(seconds)
          import('@/lib/analytics').then(({ trackTimeOnPage }) => {
            trackTimeOnPage(seconds, pageName)
          })
        }
      })
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [pageName])
}
