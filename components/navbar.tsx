'use client'

import { motion } from 'framer-motion'
import { Menu, X, Phone, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { label: 'Home', href: '/', section: 'home' },
  { label: 'Products', href: '/#products', section: 'products' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
]

const BROCHURE_HREF = '/products/SAV.pdf'
const BROCHURE_FILENAME = 'SAV-Life-Sciences-Brochure.pdf'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome || !window.location.hash) return

    const sectionId = window.location.hash.replace('#', '')
    const el = document.getElementById(sectionId)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [isHome, pathname])

  function scrollToSection(section: string) {
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
      return true
    }
    return false
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, section: string) {
    if (isHome) {
      e.preventDefault()
      scrollToSection(section)
    } else {
      setIsOpen(false)
    }
  }

  function handleOrderClick() {
    if (isHome) {
      scrollToSection('contact')
    } else {
      router.push('/#contact')
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-base leading-none">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-foreground tracking-tight">SAV Life Sciences</span>
              <span className="text-[10px] text-muted-foreground font-normal">Pharmaceuticals</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.section)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={BROCHURE_HREF}
              download={BROCHURE_FILENAME}
              className="flex items-center gap-2 border border-border hover:border-foreground/30 text-foreground hover:bg-muted px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-150"
            >
              <Download size={15} />
              Download Brochure
            </a>
            <button
              onClick={handleOrderClick}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors duration-150"
            >
              <Phone size={15} />
              Order Karein
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 pb-3 border-t border-border pt-3 space-y-1"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.section)}
                className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <a
                href={BROCHURE_HREF}
                download={BROCHURE_FILENAME}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-border hover:border-foreground/30 text-foreground hover:bg-muted py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                <Download size={15} />
                Download Brochure
              </a>
              <button
                onClick={handleOrderClick}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                <Phone size={15} />
                Order Karein
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}