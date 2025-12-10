import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { PricingPageContent } from '@/components/PricingPageContent'

export const metadata: Metadata = {
  title: 'Pricing | Digital DevOps - AWS Infrastructure & DevOps Packages',
  description: 'Transparent pricing for AWS infrastructure setup, security audits, DevOps support, and managed services. Fixed-price packages starting at $2,999.',
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-24">
        <PricingPageContent />
      </main>
      <Footer />
    </>
  )
}
