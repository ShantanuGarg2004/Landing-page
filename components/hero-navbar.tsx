'use client'

import { motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Home',    href: '/',         section: 'home'    },
  { label: 'Products', href: '/#products', section: 'products' },
  { label: 'About',   href: '/#about',   section: 'about'   },
  { label: 'Contact', href: '/#contact', section: 'contact' },
]

export function HeroNavbar() {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  /* Become solid once user scrolls past the hero */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, section: string) {
    e.preventDefault()
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  function handleOrderClick() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: 'rgba(255,248,220,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(240,190,60,0.35)' }
          : { background: 'transparent' }
      }
    >
      {/* Rangoli strip — only visible when NOT scrolled (blends into hero top) */}
      {!scrolled && (
        <div
          style={{
            height: '5px',
            background:
              'repeating-linear-gradient(90deg,#e05e00 0px,#e05e00 10px,#f5a800 10px,#f5a800 20px,#4a8c18 20px,#4a8c18 30px,#d4220a 30px,#d4220a 40px,#f5a800 40px,#f5a800 50px)',
            opacity: 0.85,
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: '#e05e00' }}
            >
              <span className="text-white font-bold text-base leading-none">स</span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: scrolled ? '#2d1a00' : '#ffffff', textShadow: scrolled ? 'none' : '0 1px 6px rgba(60,20,0,0.4)' }}
              >
                Sushima
              </span>
              <span
                className="text-[10px] font-normal"
                style={{ color: scrolled ? '#8a6030' : 'rgba(255,238,190,0.85)' }}
              >
                Gaon ke liye
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.section)}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                style={{
                  color:  scrolled ? '#5a3a10' : 'rgba(255,245,210,0.9)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = scrolled
                    ? 'rgba(240,190,60,0.18)'
                    : 'rgba(255,255,255,0.12)'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled ? '#2d1a00' : '#ffffff'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled
                    ? 'rgba(90,58,16,1)'
                    : 'rgba(255,245,210,0.9)'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={handleOrderClick}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-opacity duration-150 hover:opacity-90 text-white"
            style={{
              background: '#e05e00',
              boxShadow: '0 2px 0 #a84000',
            }}
          >
            <Phone size={15} />
            Order Karein
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: scrolled ? '#2d1a00' : '#ffffff' }}
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
            className="md:hidden mt-3 pb-3 pt-3 space-y-1 rounded-xl px-2"
            style={{
              background: 'rgba(255,248,220,0.96)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(240,190,60,0.35)',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.section)}
                className="block px-3 py-2.5 text-sm font-medium rounded-md transition-colors"
                style={{ color: '#2d1a00' }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 px-1">
              <button
                onClick={handleOrderClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm text-white"
                style={{ background: '#e05e00', boxShadow: '0 2px 0 #a84000' }}
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