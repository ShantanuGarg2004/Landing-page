'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* Left: Text */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
              Trusted by 1000+ Customers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight text-foreground"
            >
              Trusted Animal{' '}
              <span className="gradient-text">Healthcare Solutions</span>
              {' '}for Better Productivity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed text-muted-foreground"
            >
              Milk production badhane, animals ki sehat sudharne aur unhe strong banane ke liye
              effective aur reliable products.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="space-y-2"
            >
              {[
                'Quality products since 2022',
                'Proven results, real feedback',
                'Direct support via Call & WhatsApp',
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white bg-primary">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <button
                onClick={() => scrollTo('products')}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                View Products
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-2 border-foreground text-foreground hover:bg-foreground hover:text-white px-7 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                <Phone size={14} />
                Call Now
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-xs flex items-center gap-1.5 text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0 bg-muted-foreground" />
              No online payment required – directly connect and order with confidence
            </motion.p>
          </div>

          {/* Right: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="relative w-full h-72 md:h-[380px] rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-aIxlS5IZixFEujgYg1p1fk4JjT4RX3.jpg"
                alt="SAV Life Sciences Pharmaceuticals – Animal Healthcare Products"
                fill
                className="object-cover"
                priority
                onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">SAV Life Sciences Pharmaceuticals</p>
                <p className="text-white/80 text-xs mt-0.5">Trusted animal healthcare since 2022</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1000+',      label: 'Happy Customers' },
                { value: 'Since 2022', label: 'Trusted Brand'   },
                { value: 'Fast',       label: 'Delivery'        },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl px-3 py-3 text-center bg-white border border-border"
                >
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] mt-0.5 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
