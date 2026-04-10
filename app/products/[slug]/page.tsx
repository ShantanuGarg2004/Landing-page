'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getProductBySlug,
  getAllProducts,
  getWhatsAppUrl,
} from '@/lib/products'
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  CheckCircle2,
  Truck,
  Banknote,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)

  const otherProducts = getAllProducts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="text-xl font-bold mb-3">Product nahi mila</h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg"
            >
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
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 text-sm">
            <Link href="/" className="text-muted-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Back */}
          <Link
            href="/#products"
            className="inline-flex items-center gap-1 text-sm mb-6"
          >
            <ChevronLeft size={16} />
            Sabhi Products
          </Link>

          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-10 mb-10">

            {/* Image */}
            <div className="bg-white rounded-2xl border border-border p-6 flex items-center justify-center h-[420px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>

              <h1 className="text-2xl font-bold">{product.name}</h1>

              <p className="text-secondary font-semibold">
                {product.headline}
              </p>

              <p className="text-muted-foreground text-sm">
                {product.description}
              </p>

              {/* Price */}
              <div className="bg-primary/5 p-4 rounded-lg border">
                <p className="text-lg font-bold text-primary">
                  {product.price.display}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.price.note}
                </p>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {product.inStock && (
                  <span className="text-xs bg-green-100 px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
                <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                  <Truck size={12} />
                  {product.deliveryDays}
                </span>
                {product.cashOnDelivery && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                    <Banknote size={12} />
                    COD
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <a
                  href="tel:+917452897444"
                  className="flex-1 bg-primary text-white py-3 rounded-lg text-center"
                >
                  <Phone size={16} className="inline mr-1" />
                  Call
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  className="flex-1 bg-secondary text-white py-3 rounded-lg text-center"
                >
                  <MessageCircle size={16} className="inline mr-1" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mb-6 bg-white p-6 rounded-xl border">
            <h2 className="font-bold mb-4">Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.features.map((f, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {f}
                </div>
              ))}
            </div>
          </section>

          {/* Specifications */}
          <section className="mb-6 bg-white p-6 rounded-xl border">
            <h2 className="font-bold mb-4">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 font-medium">{s.label}</td>
                    <td className="py-2 text-muted-foreground">
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Composition */}
          {product.composition && (
            <section className="mb-6 bg-white p-6 rounded-xl border">
              <h2 className="font-bold mb-4">Composition</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.composition.map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-3 rounded text-sm"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Usage */}
          {product.usage && (
            <section className="mb-6 bg-white p-6 rounded-xl border">
              <h2 className="font-bold mb-4">Usage / Dosage</h2>
              {product.usage.map((u, i) => (
                <div key={i} className="text-sm mb-2">
                  • {u}
                </div>
              ))}
            </section>
          )}

          {/* Directions */}
          {product.directions && (
            <section className="mb-6 bg-primary/5 p-6 rounded-xl border">
              <h2 className="font-bold text-primary mb-2">
                Directions
              </h2>
              <p className="text-sm">{product.directions}</p>
            </section>
          )}

          {/* Use Cases */}
          <section className="mb-6 bg-white p-6 rounded-xl border">
            <h2 className="font-bold mb-4">Use Cases</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.useCases.map((u, i) => (
                <div
                  key={i}
                  className="bg-primary/5 p-3 rounded text-sm"
                >
                  {u}
                </div>
              ))}
            </div>
          </section>

          {/* Other Products */}
          {otherProducts.length > 0 && (
            <>
              <h2 className="font-bold mb-4 mt-10">
                Yeh bhi dekhein
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}