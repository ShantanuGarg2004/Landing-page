'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, MessageCircle, Package } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Phone,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Call ya Missed Call Karein',
    description: 'Hamare number +91 98765 43210 par call karein. Agar balance nahi hai toh sirf missed call de dein — hum khud call karke wapas baat karenge.',
    tip: 'Missed call bhi kaam karega!',
    tipColor: 'bg-primary/10 text-primary',
  },
  {
    number: '02',
    icon: MessageCircle,
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'WhatsApp par Message Karein',
    description: 'WhatsApp par message karein — product ka naam aur apna address batayein. Hum aapko price aur delivery ki poori jaankari denge.',
    tip: 'Seedha message bhejein, koi app download nahi karni',
    tipColor: 'bg-secondary/10 text-secondary',
  },
  {
    number: '03',
    icon: Package,
    iconBg: 'bg-[var(--accent-blue)]/10',
    iconColor: 'text-[var(--accent-blue)]',
    title: 'Ghar Baithe Paayein',
    description: 'Aapka samaan 3-5 dinon mein ghar pahunch jaata hai. Cash on Delivery available hai — paisa sirf tab dein jab samaan haath mein aa jaaye.',
    tip: 'Cash on Delivery available',
    tipColor: 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
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
              Order Kaise Karein
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Teen aasaan{' '}
              <span className="gradient-text">steps mein order</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Koi internet ya app ki zaroorat nahi — sirf ek call kaafi hai
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Steps */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
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
            <p className="text-white font-semibold text-sm">Abhi order karna chahte hain?</p>
            <p className="text-white/50 text-xs mt-0.5">Somvar – Shanivar, Subah 10 – Shaam 6 baje</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Phone size={14} />
              Call Karein
            </a>
            <a
              href="https://wa.me/919876543210?text=Namaste!%20Mujhe%20Sushima%20products%20ke%20baare%20mein%20jaankari%20chahiye."
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