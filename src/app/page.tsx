import { Navbar } from '@/components/Navbar'
import { HeroSectionNew } from '@/components/HeroSectionNew'
import { ServicesGrid } from '@/components/ServicesGrid'
import { WhyDevAIOps } from '@/components/WhyDevAIOps'
import { CTASectionNew } from '@/components/CTASectionNew'
import { Footer } from '@/components/FooterNew'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSectionNew />
        <ServicesGrid />
        <WhyDevAIOps />
        <CTASectionNew />
      </main>
      <Footer />
    </>
  )
}
