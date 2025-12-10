import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Digital DevOps team. We\'re looking for talented engineers passionate about AI, DevOps, and cloud infrastructure.',
}

export default function CareersLayout({
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
