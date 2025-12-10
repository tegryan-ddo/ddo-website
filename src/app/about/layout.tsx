import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Digital DevOps is an AI-augmented DevOps consultancy. Senior engineers, fixed pricing, fast delivery on AWS infrastructure and DevOps projects.',
  openGraph: {
    title: 'About Us | Digital DevOps',
    description: 'AI-augmented DevOps consultancy. Senior engineers, fixed pricing, fast delivery.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
