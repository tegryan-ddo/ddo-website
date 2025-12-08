'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, captureEvent, getPostHogConfig } from '@/lib/posthog'

/**
 * PostHog Provider Component
 *
 * Add this to your root layout to enable PostHog tracking.
 * Only initializes if NEXT_PUBLIC_POSTHOG_KEY is set.
 */
export function PostHogProvider({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const config = getPostHogConfig()

  // Initialize PostHog on mount
  useEffect(() => {
    if (config.isEnabled) {
      initPostHog()
    }
  }, [config.isEnabled])

  // Track page views
  useEffect(() => {
    if (!config.isEnabled) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    captureEvent('$pageview', {
      $current_url: url,
    })
  }, [pathname, searchParams, config.isEnabled])

  return <>{children}</>
}

/**
 * Hook for tracking user interactions with PostHog
 */
export function usePostHogTrack() {
  const config = getPostHogConfig()

  const track = (event: string, properties?: Record<string, unknown>) => {
    if (config.isEnabled) {
      captureEvent(event, properties)
    }
  }

  return { track, isEnabled: config.isEnabled }
}
