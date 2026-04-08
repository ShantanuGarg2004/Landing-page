import { HeroSection } from '@/components/hero-section'
import { ProductsSection } from '@/components/products-section'
import { WhyUsSection } from '@/components/why-us-section'
import { HowToOrderSection } from '@/components/how-to-order'
import { AboutSection } from '@/components/about-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Sushima - Gaon ke liye Simple Products',
  description: 'Simple, bharosemand, aur affordable products for village life',
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