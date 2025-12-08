/**
 * Web Vitals Performance Monitoring
 *
 * Tracks Core Web Vitals and sends them to analytics.
 * Uses Next.js built-in web-vitals reporting.
 */

import { trackEvent } from './analytics'

export type WebVitalsMetric = {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

/**
 * Get rating for each metric based on thresholds
 * https://web.dev/vitals/
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor'
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
    default:
      return 'good'
  }
}

/**
 * Report Web Vitals to analytics
 * Call this from your app with the metric from Next.js
 */
export function reportWebVitals(metric: {
  id: string
  name: string
  value: number
  delta: number
  navigationType?: string
}): void {
  const rating = getRating(metric.name, metric.value)

  // Send to analytics
  trackEvent({
    name: 'web_vitals',
    properties: {
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: rating,
      metric_delta: Math.round(metric.delta),
      navigation_type: metric.navigationType || 'navigate',
    },
  })

  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating,
      id: metric.id,
    })
  }
}

/**
 * Initialize performance observer for custom metrics
 */
export function initPerformanceObserver(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return
  }

  // Track long tasks (potential jank)
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          trackEvent({
            name: 'long_task',
            properties: {
              duration: Math.round(entry.duration),
              start_time: Math.round(entry.startTime),
            },
          })
        }
      }
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  } catch {
    // Long task observer not supported
  }

  // Track resource loading performance
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming
        // Only track slow resources (> 1 second)
        if (resourceEntry.duration > 1000) {
          trackEvent({
            name: 'slow_resource',
            properties: {
              resource_name: resourceEntry.name.split('/').pop() || 'unknown',
              resource_type: resourceEntry.initiatorType,
              duration: Math.round(resourceEntry.duration),
            },
          })
        }
      }
    })
    resourceObserver.observe({ entryTypes: ['resource'] })
  } catch {
    // Resource timing observer not supported
  }
}

/**
 * Track First Contentful Paint manually if needed
 */
export function trackFCP(): void {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        trackEvent({
          name: 'fcp',
          properties: {
            value: Math.round(entry.startTime),
            rating: getRating('FCP', entry.startTime),
          },
        })
      }
    }
  })

  try {
    observer.observe({ type: 'paint', buffered: true })
  } catch {
    // Paint observer not supported
  }
}

/**
 * Track page load performance
 */
export function trackPageLoad(): void {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    // Wait for everything to settle
    setTimeout(() => {
      const timing = performance.timing
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart
      const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      const firstByte = timing.responseStart - timing.navigationStart

      trackEvent({
        name: 'page_load_timing',
        properties: {
          page_load_time: pageLoadTime,
          dom_content_loaded: domContentLoaded,
          first_byte: firstByte,
          path: window.location.pathname,
        },
      })
    }, 0)
  })
}
