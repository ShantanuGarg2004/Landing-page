'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, Clock } from 'lucide-react'

export function CTASection() {
  return (
    <section id="contact" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-foreground rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left: Message */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-3">Sampark Karein</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                  Aaj Hi Order Karein –<br />Easy aur Fast
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Call ya WhatsApp karein. Hum gaon ke logon ki baat samajhte hain aur seedha baat karte hain – koi complicated process nahi.
                </p>

                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80">
                  <Clock size={14} className="text-primary" />
                  <span>Somvar – Shanivar &nbsp;|&nbsp; 10 AM – 6 PM</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact buttons */}
            <div className="bg-white/5 p-8 md:p-12 flex flex-col justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Phone number display */}
                <div className="bg-white/10 rounded-xl px-5 py-4 text-center">
                  <p className="text-white/50 text-xs mb-1">Hamara Number</p>
                  <p className="text-white text-2xl font-bold tracking-wide">+91 74528 97444</p>
                </div>

                {/* Call button */}
                <a
                  href="tel:+917452897444"
                  className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary/90 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-150"
                >
                  <Phone size={18} />
                  Call Karein
                </a>

                {/* WhatsApp button */}
                <a
                  href="https://wa.me/917452897444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-150"
                >
                  <MessageCircle size={18} />
                  WhatsApp Karein
                </a>

                <p className="text-white/30 text-xs text-center">
                  Free hai – koi charge nahi
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}