'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { reportWebVitals, initPerformanceObserver, trackPageLoad } from '@/lib/web-vitals'

/**
 * Performance Monitor Component
 *
 * Add this to your root layout to enable performance monitoring.
 * Tracks Core Web Vitals and custom performance metrics.
 */
export function PerformanceMonitor() {
  // Use Next.js built-in web vitals hook
  useReportWebVitals((metric) => {
    reportWebVitals(metric)
  })

  // Initialize custom performance observers
  useEffect(() => {
    initPerformanceObserver()
    trackPageLoad()
  }, [])

  return null
}
