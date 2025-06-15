import Slider from '@/components/Slider'
import IntroSection from '@/components/IntroSection'
import FeatureSection from '@/components/FeatureSection'
import ServicesSection from '@/components/ServicesSection'

export default function Home() {
  return (
    <>
      <Slider />
      <IntroSection />
      <FeatureSection />
      <hr />
      <ServicesSection />
    </>
  )
}