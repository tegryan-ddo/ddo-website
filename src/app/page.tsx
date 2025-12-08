import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServicesPreview } from '@/components/ServicesPreview'
import { SocialProof } from '@/components/SocialProof'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/FooterNew'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <ServicesPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
