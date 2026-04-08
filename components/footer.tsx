'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10"
        >
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-base leading-none">स</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base">Sushima</span>
                <span className="text-[10px] text-white/50 font-normal">Gaon ke liye</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Simple, bharosemand, aur affordable products – seedha gaon ke logon ke liye.
            </p>
            {/* Contact quick links */}
            <div className="space-y-2">
              <a href="tel:+917452897444" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <Phone size={14} />
                +91 74528 97444
              </a>
              <a href="https://wa.me/917452897444" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                <MessageCircle size={14} />
                WhatsApp Karein
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white/90 uppercase tracking-wide">Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/#products' },
                { label: 'About', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white/90 uppercase tracking-wide">Sampark</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Phone size={14} className="mt-0.5 shrink-0" />
                +91 74528 97444
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MessageCircle size={14} className="mt-0.5 shrink-0" />
                hello@sushima.com
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Gaon, India
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white/90 uppercase tracking-wide">Samay</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Clock size={14} className="mt-0.5 shrink-0" />
                <span>
                  Somvar – Shanivar<br />
                  10 AM – 6 PM
                </span>
              </li>
              <li className="text-sm text-white/40 pl-5">Ravivar: Band</li>
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40"
          >
            <p>© 2026 Sushima. Sab kuch simple.</p>
            <p>Made with care for gaon ke log 🌾</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}