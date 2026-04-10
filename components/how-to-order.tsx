'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShoppingBag, Phone, MessageCircle, Package } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Product Select Karein',
    description: 'Apni requirement ke according product choose karein. Hamare products dairy animals, pets aur general livestock ke liye available hain.',
    tip: 'View all products on our website',
    tipColor: 'bg-primary/10 text-primary',
  },
  {
    number: '02',
    icon: Phone,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Call ya WhatsApp Karein',
    description: 'Direct humse connect karein – call karein ya WhatsApp par message karein. Hum aapko product details, dosage aur pricing ki poori jaankari denge.',
    tip: 'Direct support – no middleman',
    tipColor: 'bg-secondary/10 text-secondary',
  },
  {
    number: '03',
    icon: MessageCircle,
    iconBg: 'bg-[var(--accent-blue)]/10',
    iconColor: 'text-[var(--accent-blue)]',
    title: 'Order Confirm Karein',
    description: 'Hum aapko complete information aur price batayenge. Order confirm hone ke baad aapka product immediately dispatch ho jaata hai.',
    tip: 'No online payment required',
    tipColor: 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  },
  {
    number: '04',
    icon: Package,
    iconBg: 'bg-[var(--accent-teal)]/10',
    iconColor: 'text-[var(--accent-teal)]',
    title: 'Delivery Paayein',
    description: 'Fast delivery directly aapke paas. Hum ensure karte hain ki aapka product safe aur timely pahunche – bina kisi tension ke.',
    tip: 'Fast & safe delivery guaranteed',
    tipColor: 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]',
  },
]

export function HowToOrderSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              How to Order
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Simple process,{' '}
              <span className="gradient-text">zero confusion</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Simple process – no confusion, no risk. Sirf connect karein aur order karein
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Steps */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4"
              >
                {/* Top: icon + number */}
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${step.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={step.iconColor} />
                  </div>
                  <span className="text-3xl font-bold text-border select-none tabular-nums">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug">
                  {step.title}
                </h3>

                <div className="border-t border-border" />

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Tip chip */}
                <span className={`self-start text-[11px] font-semibold px-3 py-1.5 rounded-lg ${step.tipColor}`}>
                  ✓ {step.tip}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 bg-foreground rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-semibold text-sm">Ready to order? Connect with us now</p>
            <p className="text-white/50 text-xs mt-0.5">Monday – Saturday, 10 AM – 6 PM</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+917452897444"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Phone size={14} />
              Call Now
            </a>
            <a
              href="https://wa.me/917452897444?text=Namaste!%20Mujhe%20SAV%20Life%20Sciences%20products%20ke%20baare%20mein%20jaankari%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}