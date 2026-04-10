'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBestSellers } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function ProductsSection() {
  const products = getBestSellers()

  return (
    <section id="products" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Our Products
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              High-quality solutions for{' '}
              <span className="gradient-text">better animal health</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="border-t border-border mb-8" />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-sm text-muted-foreground mb-8 max-w-xl"
        >
          High-quality healthcare solutions for better animal health, growth and productivity
        </motion.p>

        {/* Product Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4 },
                },
              }}
            >
              <ProductCard product={product} index={idx} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}