import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'

export const metadata: Metadata = {
  title: 'Resources & Documentation',
  description: 'Tools, guides, and resources for AWS, DevOps, and AI transformation. Free assessments, calculators, and industry insights.',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
