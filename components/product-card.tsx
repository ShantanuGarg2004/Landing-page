'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { type Product, getWhatsAppUrl } from '@/lib/products'

const accentColors = [
  'border-l-[var(--accent-blue)]',
  'border-l-[var(--accent-teal)]',
  'border-l-[var(--accent-gold)]',
  'border-l-[var(--accent-coral)]',
  'border-l-primary',
  'border-l-secondary',
]

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white border border-border rounded-xl overflow-hidden h-full hover:border-primary/40 transition-colors duration-200"
    >
      {/* Image */}
      <div className="relative bg-muted/30 h-48 flex items-center justify-center p-4 border-b border-border">
        <Image
          src={product.image}
          alt={product.name}
          width={220}
          height={180}
          className="object-contain h-full w-auto max-h-40"
        />

        {/* Category pill */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold text-muted-foreground bg-white border border-border rounded-full px-2.5 py-0.5 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Badge (Best Seller / New / etc) */}
        {product.badge && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-primary text-white px-2.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-5 border-l-4 ${accentColors[index % accentColors.length]}`}>

        {/* Name */}
        <h3 className="text-base font-bold text-foreground leading-snug mb-1.5">
          {product.name}
        </h3>

        {/* Headline */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
          {product.headline}
        </p>

        {/* Price */}
        <p className="text-sm font-bold text-primary mb-3">
          {product.price.display}
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 2).map((f) => (
            <span
              key={f}
              className="text-[11px] bg-muted text-foreground px-2.5 py-1 rounded-md font-medium"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            {product.inStock ? (
              <span className="flex items-center gap-1 text-[10px] text-secondary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                Stock mein hai
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground font-semibold">
                Stock khatam
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-primary">
            <span className="text-xs font-semibold">Dekhein</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-150"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}