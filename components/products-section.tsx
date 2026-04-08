'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBestSellers } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function ProductsSection() {
  const bestSellers = getBestSellers()
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="products" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Best Sellers
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Gaon ki zaroorat ke liye{' '}
              <span className="gradient-text">sahi cheezein</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right">
              Sabse zyada bikne wale products – logon ki pasand
            </p>
          </div>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Best seller cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {bestSellers.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
              }}
            >
              <ProductCard product={product} index={idx} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA row — link to /products page */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Aur bhi products available hain — sabhi dekhne ke liye click karein
          </p>
          <Link
            href="/products"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Sab Products Dekhein
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}