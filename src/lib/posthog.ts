/**
 * PostHog Analytics Integration
 *
 * Provides heatmaps, session recordings, and feature flags.
 * Enable by setting NEXT_PUBLIC_POSTHOG_KEY environment variable.
 *
 * Environment Variables:
 * - NEXT_PUBLIC_POSTHOG_KEY: PostHog project API key
 * - NEXT_PUBLIC_POSTHOG_HOST: PostHog host (default: https://app.posthog.com)
 */

// Types for PostHog
interface PostHogConfig {
  api_host: string
  person_profiles: 'identified_only' | 'always'
  capture_pageview: boolean
  capture_pageleave: boolean
  autocapture: boolean
  session_recording?: {
    maskTextSelector?: string
    maskAllInputs?: boolean
  }
}

interface PostHog {
  init: (apiKey: string, config: PostHogConfig) => void
  capture: (event: string, properties?: Record<string, unknown>) => void
  identify: (distinctId: string, properties?: Record<string, unknown>) => void
  reset: () => void
  isFeatureEnabled: (key: string) => boolean | undefined
  getFeatureFlag: (key: string) => unknown
  onFeatureFlags: (callback: () => void) => void
}

declare global {
  interface Window {
    posthog?: PostHog
  }
}

const isBrowser = typeof window !== 'undefined'

export const getPostHogConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  isEnabled: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
})

/**
 * Initialize PostHog
 * Should be called once in the app
 */
export async function initPostHog(): Promise<void> {
  if (!isBrowser) return

  const config = getPostHogConfig()
  if (!config.isEnabled || !config.apiKey) return

  try {
    // Dynamically import PostHog to reduce bundle size when not used
    const posthog = (await import('posthog-js')).default

    posthog.init(config.apiKey, {
      api_host: config.host,
      person_profiles: 'identified_only',
      capture_pageview: false, // We handle this manually in Analytics component
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskTextSelector: '[data-mask]',
        maskAllInputs: true, // Mask all inputs for privacy
      },
    })

    // Make available globally
    window.posthog = posthog
  } catch (error) {
    console.error('[PostHog] Failed to initialize:', error)
  }
}

/**
 * Capture a custom event in PostHog
 */
export function captureEvent(
  event: string,
  properties?: Record<string, unknown>
): void {
  if (!isBrowser || !window.posthog) return
  window.posthog.capture(event, properties)
}

/**
 * Identify a user in PostHog
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
): void {
  if (!isBrowser || !window.posthog) return
  window.posthog.identify(userId, properties)
}

/**
 * Reset user identity (on logout)
 */
export function resetUser(): void {
  if (!isBrowser || !window.posthog) return
  window.posthog.reset()
}

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(key: string): boolean {
  if (!isBrowser || !window.posthog) return false
  return window.posthog.isFeatureEnabled(key) ?? false
}

/**
 * Get feature flag value
 */
export function getFeatureFlag(key: string): unknown {
  if (!isBrowser || !window.posthog) return undefined
  return window.posthog.getFeatureFlag(key)
}

/**
 * Subscribe to feature flag changes
 */
export function onFeatureFlags(callback: () => void): void {
  if (!isBrowser || !window.posthog) return
  window.posthog.onFeatureFlags(callback)
}
