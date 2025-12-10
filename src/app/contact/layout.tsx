import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Digital DevOps. Schedule a free AWS review or discuss your infrastructure and DevOps needs.',
  openGraph: {
    title: 'Contact Us | Digital DevOps',
    description: 'Get in touch with Digital DevOps. Schedule a free AWS review.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
