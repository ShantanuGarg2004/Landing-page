'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ProductsPage() {
  const allProducts = getAllProducts()

  // Derive unique categories from data
  const categories = ['Sab', ...Array.from(new Set(allProducts.map((p) => p.category)))]

  const [activeCategory, setActiveCategory] = useState('Sab')

  const filtered =
    activeCategory === 'Sab'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Sab Products</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Mukhya Prishtha par Wapas
          </Link>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Hamare Sabhi Products
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Gaon ki zaroorat ke liye{' '}
                <span className="gradient-text">sahi cheezein</span>
              </h1>
              <p className="text-sm text-muted-foreground sm:text-right">
                {allProducts.length} products available
              </p>
            </div>
          </motion.div>

          <div className="border-t border-border mb-8" />

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-150 ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Product grid */}
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
              >
                <ProductCard product={product} index={idx} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">
                Is category mein abhi koi product nahi hai.
              </p>
            </div>
          )}

          {/* Bottom contact nudge */}
          <div className="mt-12 bg-white border border-border rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground font-medium text-center sm:text-left">
              Koi product pasand aaya? Order karne ke liye seedha sampark karein.
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+919876543210"
                className="text-xs font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
              >
                Call Karein
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-white bg-secondary hover:bg-secondary/90 px-4 py-2 rounded-lg transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}