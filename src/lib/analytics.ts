/**
 * Analytics Library for Digital DevOps
 *
 * Supports both Google Analytics 4 (GA4) and Plausible Analytics.
 * Configure by setting the appropriate environment variables.
 *
 * Environment Variables:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: GA4 Measurement ID (e.g., G-XXXXXXXXXX)
 * - NEXT_PUBLIC_PLAUSIBLE_DOMAIN: Plausible domain (e.g., digitaldevops.io)
 */

// Types for analytics events
export type AnalyticsEvent = {
  name: string
  properties?: Record<string, string | number | boolean>
}

export type ConversionEvent =
  | 'contact_form_submit'
  | 'assessment_start'
  | 'assessment_complete'
  | 'newsletter_signup'
  | 'resource_download'
  | 'consultation_booked'
  | 'case_study_view'
  | 'service_inquiry'

export type PageViewEvent = {
  url: string
  referrer?: string
  title?: string
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// Get analytics configuration
export const getAnalyticsConfig = () => ({
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  isProduction: process.env.NODE_ENV === 'production',
})

/**
 * Initialize Google Analytics 4
 */
export const initGA4 = (measurementId: string): void => {
  if (!isBrowser) return

  // Add gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send page views manually
  })
}

/**
 * Track page view
 */
export const trackPageView = (event: PageViewEvent): void => {
  if (!isBrowser) return

  const config = getAnalyticsConfig()

  // GA4 page view
  if (config.gaId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: event.url,
      page_title: event.title || document.title,
      page_referrer: event.referrer,
    })
  }

  // Plausible page view (automatic, but can be triggered manually)
  if (config.plausibleDomain && window.plausible) {
    window.plausible('pageview', { props: { url: event.url } })
  }

  // Development logging
  if (!config.isProduction) {
    console.log('[Analytics] Page View:', event)
  }
}

/**
 * Track custom event
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isBrowser) return

  const config = getAnalyticsConfig()

  // GA4 event
  if (config.gaId && window.gtag) {
    window.gtag('event', event.name, event.properties || {})
  }

  // Plausible event
  if (config.plausibleDomain && window.plausible) {
    window.plausible(event.name, { props: event.properties })
  }

  // Development logging
  if (!config.isProduction) {
    console.log('[Analytics] Event:', event)
  }
}

/**
 * Track conversion event with predefined types
 */
export const trackConversion = (
  conversionType: ConversionEvent,
  properties?: Record<string, string | number | boolean>
): void => {
  trackEvent({
    name: conversionType,
    properties: {
      ...properties,
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Track form submission
 */
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  properties?: Record<string, string | number | boolean>
): void => {
  trackEvent({
    name: 'form_submission',
    properties: {
      form_name: formName,
      success,
      ...properties,
    },
  })
}

/**
 * Track CTA click
 */
export const trackCTAClick = (
  ctaName: string,
  location: string,
  destination?: string
): void => {
  trackEvent({
    name: 'cta_click',
    properties: {
      cta_name: ctaName,
      location,
      destination: destination || 'unknown',
    },
  })
}

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number, page: string): void => {
  trackEvent({
    name: 'scroll_depth',
    properties: {
      depth_percentage: depth,
      page,
    },
  })
}

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number, page: string): void => {
  trackEvent({
    name: 'time_on_page',
    properties: {
      time_seconds: seconds,
      page,
    },
  })
}

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string): void => {
  trackEvent({
    name: 'outbound_link',
    properties: {
      url,
    },
  })
}

// Extend Window interface for gtag and plausible
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    plausible: (event: string, options?: { props?: Record<string, unknown> }) => void
  }
}
