'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneCall, Sprout, ShieldCheck, Truck } from 'lucide-react'

const reasons = [
  {
    id: 1,
    icon: PhoneCall,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Simple aur Easy Process',
    description: 'Koi form nahi, koi jhanjhat nahi. Bas call ya WhatsApp karein aur kaam ho jaata hai.',
  },
  {
    id: 2,
    icon: Sprout,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Gaon ke Logon ke liye Bana',
    description: 'Hum samajhte hain gaon ki zaroorat. Isliye products simple, durable, aur useful hain.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    iconBg: 'bg-[var(--accent-blue)]/10',
    iconColor: 'text-[var(--accent-blue)]',
    title: 'Quality ka Full Bharosa',
    description: 'Har product check kiya jaata hai. Quality mein koi compromise nahi – kabhi nahi.',
  },
  {
    id: 4,
    icon: Truck,
    iconBg: 'bg-[var(--accent-teal)]/10',
    iconColor: 'text-[var(--accent-teal)]',
    title: 'Fast Delivery, Bina Tension',
    description: 'Order karo aur chinta khatam. Samay par delivery guaranteed hai.',
  },
]

export function WhyUsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header row — label left, description right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Hum ko kyun Choose Karein
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Hazaaron gaon walon ka <span className="gradient-text">bharosa</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Inhi karanon ki wajah se log baar baar hamare paas aate hain
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* 2×2 tile grid — clean window-pane */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {reasons.map((reason, idx) => {
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