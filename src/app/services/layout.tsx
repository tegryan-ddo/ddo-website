import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AWS infrastructure setup, DevOps automation, security audits, and managed services. End-to-end DevAIOps consulting with fixed pricing.',
  openGraph: {
    title: 'Services | Digital DevOps',
    description: 'AWS infrastructure setup, DevOps automation, security audits, and managed services.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
