import productsData from '@/data/products.json'

export interface ProductPrice {
  display: string   // "₹299 se shuru" — shown on card
  range: string     // "₹299 – ₹599" — shown on detail page
  note: string      // "Size ke hisaab se daam alag ho sakta hai"
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: number
  slug: string
  name: string
  shortDescription: string
  image: string
  category: string
  badge: string | null        // "Best Seller", "New", null
  bestSeller: boolean         // true = shown on homepage
  headline: string
  description: string
  price: ProductPrice
  inStock: boolean
  deliveryDays: string        // "3-5 din"
  cashOnDelivery: boolean
  features: string[]
  specifications: ProductSpec[]
  useCases: string[]
  whatsappMessage: string     // pre-filled WhatsApp message for this product
}

export const products: Product[] = productsData as Product[]

/** All products — used on the /products page */
export function getAllProducts(): Product[] {
  return products
}

/** Only bestSeller=true products — used on the homepage */
export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller)
}

/** Lookup by slug — used on detail page */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** Build WhatsApp URL with product-specific pre-filled message */
export function getWhatsAppUrl(product: Product): string {
  const phone = '917452897444'
  const message = encodeURIComponent(product.whatsappMessage)
  return `https://wa.me/${phone}?text=${message}`
}

/** Generic WhatsApp URL — used in sections without a specific product */
export function getGenericWhatsAppUrl(): string {
  return 'https://wa.me/917452897444'
}