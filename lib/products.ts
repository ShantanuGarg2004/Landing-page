import productsData from '@/data/products.json'

export type Product = {
  id: number
  slug: string
  name: string
  category: string
  headline: string
  description: string
  price: {
    display: string
    range: string
    note: string
  }
  image: string
  badge?: string
  inStock: boolean
  deliveryDays: string
  cashOnDelivery: boolean

  features: string[]

  specifications: {
    label: string
    value: string
  }[]

  composition?: string[]
  usage?: string[]
  directions?: string

  useCases: string[]
}

// ✅ All products
export function getAllProducts(): Product[] {
  return productsData
}

// ✅ Get by slug
export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug)
}

// ✅ 🔥 IMPORTANT: ADD THIS (THIS IS YOUR ERROR FIX)
export function getBestSellers(): Product[] {
  return productsData.slice(0, 4)
}

// ✅ WhatsApp URL
export function getWhatsAppUrl(product: Product): string {
  const phone = '917452897444'

  const message = `Namaste 🙏

Mujhe *${product.name}* ke baare mein jaankari chahiye.

Price: ${product.price.display}

Kripya details share karein.`

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}