import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { WhyUsSection } from '@/components/why-us-section'
import { HowToOrderSection } from '@/components/how-to-order'
import { AboutSection } from '@/components/about-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'SAV Life Sciences Pharmaceuticals – Trusted Animal Healthcare',
  description: 'High-quality animal healthcare products for better growth, health and productivity. Trusted by 1000+ customers since 2022.',
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <WhyUsSection />
      <HowToOrderSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}