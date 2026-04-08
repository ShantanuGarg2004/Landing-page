'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getAllProducts, getWhatsAppUrl } from '@/lib/products'
import { Phone, MessageCircle, ChevronLeft, CheckCircle2, Truck, Banknote } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  // Other products excluding current
  const otherProducts = getAllProducts().filter((p) => p.slug !== slug).slice(0, 3)

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="text-xl font-bold text-foreground mb-3">Product nahi mila</h1>
            <p className="text-muted-foreground text-sm mb-6">Iska matlab yeh product available nahi hai</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              <ChevronLeft size={16} />
              Wapas Chalein
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const waUrl = getWhatsAppUrl(product)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Mukhya Prishtha</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/#products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">

          {/* Back */}
          <Link href="/#products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft size={16} />
            Sabhi Products Dekhein
          </Link>

          {/* Main grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10"
          >
            {/* Image */}
            <div className="flex items-center justify-center bg-white rounded-2xl p-6 md:p-10 border border-border min-h-[280px] relative">
              {product.badge && (
                <span className="absolute top-4 right-4 text-[11px] font-bold bg-primary text-white px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-auto max-w-[280px] object-contain"
              />
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <span className="self-start bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-semibold text-secondary">{product.headline}</p>

              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Price block */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-1">
                <p className="text-xl font-bold text-primary">{product.price.display}</p>
                <p className="text-xs text-muted-foreground">{product.price.range}</p>
                <p className="text-xs text-muted-foreground italic">{product.price.note}</p>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                {product.inStock && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    Stock mein available
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground bg-muted px-3 py-1.5 rounded-lg">
                  <Truck size={12} />
                  {product.deliveryDays} mein delivery
                </span>
                {product.cashOnDelivery && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground bg-muted px-3 py-1.5 rounded-lg">
                    <Banknote size={12} />
                    Cash on Delivery
                  </span>
                )}
              </div>

              <div className="border-t border-border" />

              {/* CTA */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Order karne ke liye sampark karein
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+917452897444"
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                  >
                    <Phone size={16} />
                    Call Karein
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Karein
                  </a>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  +91 74528 97444 &nbsp;·&nbsp; Somvar–Shanivar, 10AM–6PM
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-5">Khaas Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Specs */}
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Specifications</h2>
              </div>
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-white'}>
                      <td className="px-6 py-3 text-sm font-semibold text-foreground w-1/2 border-b border-border/50">{spec.label}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground border-b border-border/50">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Use Cases */}
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
              <h2 className="text-lg font-bold text-foreground mb-5">Gaon Mein Kaise Use Hota Hai</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.useCases.map((useCase, idx) => (
                  <div key={idx} className="bg-primary/5 border border-primary/15 rounded-xl p-4 text-sm text-foreground font-medium">
                    {useCase}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-foreground rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">{product.name} order karna chahte hain?</h2>
                <p className="text-sm text-white/60">Seedha call ya WhatsApp karein – hum help karenge</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a href="tel:+917452897444" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap">
                  <Phone size={16} />
                  +91 74528 97444
                </a>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap">
                  <MessageCircle size={16} />
                  WhatsApp Karein
                </a>
              </div>
            </div>
          </motion.div>

          {/* Other products */}
          {otherProducts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <div className="border-t border-border mb-8" />
              <h2 className="text-lg font-bold text-foreground mb-6">Yeh bhi dekhein</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}