import './globals.css'
import { Suspense } from 'react'
import AmplifyProvider from '@/components/AmplifyProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@/components/Analytics'
import { PerformanceMonitor } from '@/components/PerformanceMonitor'

export const metadata = {
  title: 'Digital DevOps',
  description: 'AI Enablement Consulting',
  generator: 'Next.js',
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
      <body className="min-h-screen bg-white font-sans antialiased dark:bg-zinc-950">
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
        </ThemeProvider>
      </body>
    </html>
  )
}
