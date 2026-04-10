'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FlaskConical, Star, Microscope, Leaf, PhoneCall } from 'lucide-react'

const reasons = [
  {
    id: 1,
    icon: FlaskConical,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Quality You Can Trust',
    description: 'Har product carefully tested aur effective ingredients ke saath banaya gaya hai. No compromise on quality – kabhi nahi.',
  },
  {
    id: 2,
    icon: Star,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Proven Results',
    description: 'Farmers aur animal owners ke real results aur positive feedback ke saath. Hazaaron customers ka bharosa hamare saath hai.',
  },
  {
    id: 3,
    icon: Microscope,
    iconBg: 'bg-[var(--accent-blue)]/10',
    iconColor: 'text-[var(--accent-blue)]',
    title: 'Expert Formulations',
    description: 'Scientific aur practical approach ka perfect combination. Har product vet experts ke saath develop kiya gaya hai.',
  },
  {
    id: 4,
    icon: Leaf,
    iconBg: 'bg-[var(--accent-teal)]/10',
    iconColor: 'text-[var(--accent-teal)]',
    title: 'Easy to Use',
    description: 'Simple usage, clear instructions – kisi bhi user ke liye easy. Koi confusion nahi, seedha results.',
  },
  {
    id: 5,
    icon: PhoneCall,
    iconBg: 'bg-[var(--accent-gold)]/10',
    iconColor: 'text-[var(--accent-gold)]',
    title: 'Direct Support',
    description: 'Call aur WhatsApp par direct guidance available hai. Hum seedha aapke saath hain – koi middleman nahi.',
  },
]

export function WhyUsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Why Choose{' '}
              <span className="gradient-text">SAV Life Sciences?</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Inhi karanon ki wajah se 1000+ customers hamare products par trust karte hain
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Tile grid — 2 cols on sm, 3 on lg */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                }}
                className="bg-white border border-border rounded-xl p-6 md:p-7 flex flex-col gap-4"
              >
                {/* Top row: icon + number */}
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${reason.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={reason.iconColor} />
                  </div>
                  <span className="text-3xl font-bold text-border tabular-nums select-none">
                    0{reason.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {reason.title}
                </h3>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}