import './globals.css'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import AmplifyProvider from '@/components/AmplifyProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@/components/Analytics'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'
import { RootJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://digitaldevops.io'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Digital DevOps | AI-Augmented AWS & DevOps Consulting',
    template: '%s | Digital DevOps',
  },
  description:
    'Enterprise AWS infrastructure and DevOps consulting powered by AI. Fixed pricing, fast delivery, senior engineers only. Starting at $2,999.',
  keywords: [
    'AWS consulting',
    'DevOps consulting',
    'cloud infrastructure',
    'Terraform',
    'AWS migration',
    'DevOps as a service',
    'cloud security',
    'SOC 2 compliance',
    'managed AWS services',
    'AI-augmented DevOps',
  ],
  authors: [{ name: 'Digital DevOps, Inc.' }],
  creator: 'Digital DevOps, Inc.',
  publisher: 'Digital DevOps, Inc.',
  generator: 'Next.js',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Digital DevOps',
    title: 'Digital DevOps | AI-Augmented AWS & DevOps Consulting',
    description:
      'Enterprise AWS infrastructure and DevOps consulting powered by AI. Fixed pricing, fast delivery, senior engineers only.',
    // Images are auto-generated from opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital DevOps | AI-Augmented AWS & DevOps Consulting',
    description:
      'Enterprise AWS infrastructure and DevOps consulting powered by AI. Fixed pricing, fast delivery.',
    // Images are auto-generated from twitter-image.tsx
    creator: '@digitaldevops',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-950 font-sans antialiased text-slate-50">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AmplifyProvider>
            {children}
          </AmplifyProvider>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <PerformanceMonitor />
          <RootJsonLd />
        </ThemeProvider>
      </body>
    </html>
  )
}
