'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '1000+',
    label: 'Happy Customers',
    description: 'Hazaaron farmers aur animal owners jo SAV products par trust karte hain.',
    accentBorder: 'border-l-[var(--accent-blue)]',
    color: 'text-[var(--accent-blue)]',
  },
  {
    value: 'Since 2022',
    label: 'Trusted Brand',
    description: '2022 se quality animal healthcare products provide kar rahe hain – bharosemand aur pakka.',
    accentBorder: 'border-l-[var(--accent-teal)]',
    color: 'text-[var(--accent-teal)]',
  },
  {
    value: '100%',
    label: 'Quality Focus',
    description: 'Har product carefully tested aur quality-checked – koi compromise nahi.',
    accentBorder: 'border-l-primary',
    color: 'text-primary',
  },
]

const promises = [
  'Quality you can trust – always',
  'Proven results, real feedback',
  'Expert formulations, scientifically designed',
  'Direct support via Call & WhatsApp',
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 px-4 sm:px-6">
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
              About Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              About{' '}
              <span className="gradient-text">SAV Life Sciences</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Trusted animal healthcare solutions since 2022
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* Left col (3/5) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Story card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border border-border rounded-xl p-6"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                SAV Life Sciences Pharmaceuticals animal healthcare products provide karta hai jo
                productivity, health aur performance improve karte hain. Hamare products
                scientifically designed hain aur real-world use ke liye banaye gaye hain – taaki
                aapko actual results milein.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Hum directly customers ke saath kaam karte hain taaki unhe best solution mile.
                Koi complicated process nahi – sirf connect karein aur sahi product paayein.
              </p>
              {/* Pull quote */}
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-semibold text-foreground italic leading-relaxed">
                  "Hamare animals ki sehat hi hamari priority hai – aur SAV Life Sciences yahi
                  ensure karta hai."
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">— SAV Life Sciences Team</p>
              </div>
            </motion.div>

            {/* Promises card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-1 bg-white border border-border rounded-xl p-6 flex flex-col justify-center"
            >
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Our Commitment
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {promises.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm text-foreground leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right col (2/5) — stat cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`
                  flex-1 flex flex-col justify-center gap-1.5 p-6
                  bg-white
                  border-t border-r border-b border-border
                  border-l-4 ${stat.accentBorder}
                  rounded-r-xl
                `}
              >
                <p className={`text-3xl md:text-4xl font-bold leading-none ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}