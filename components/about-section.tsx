'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '1000+',
    label: 'Khush Customers',
    description: 'Hazaaron ghar jahan Sushima products roz kaam aate hain.',
    accentBorder: 'border-l-[var(--accent-blue)]',
    color: 'text-[var(--accent-blue)]',
  },
  {
    value: '5+',
    label: 'Saal Ka Sath',
    description: 'Paanch saalon se gaon ke logon ke saath – bharosemand aur pakka.',
    accentBorder: 'border-l-[var(--accent-teal)]',
    color: 'text-[var(--accent-teal)]',
  },
  {
    value: '100%',
    label: 'Transparency',
    description: 'Koi hidden charge nahi, koi dhoka nahi – seedha aur saaf.',
    accentBorder: 'border-l-primary',
    color: 'text-primary',
  },
]

const promises = [
  'Gaon ke logon ke liye trusted brand',
  'Simple ordering – sirf ek call ya WhatsApp',
  'Koi bhi problem ho, hum saath hain',
  'Products jo saalon tak chalte hain',
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
              Hamari Kahani
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Sushima ke <span className="gradient-text">Baare Mein</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
            Paanch saalon ki mehnat aur hazaaron logon ka bharosa
          </p>
        </motion.div>

        <div className="border-t border-border mb-10" />

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">

          {/* Left col (3/5) */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Story card — natural height, no flex-1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border border-border rounded-xl p-6"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Hum simple aur useful products provide karte hain jo gaon ke log easily use kar
                sakein. Hamara goal hai quality cheezein sahi price par dena – bina kisi chaal-baazi ke.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Har product hum careful se check karte hain. Sab kuch seedha aur transparent –
                bilkul koi hidden charges ya drama nahi. Aapki bharosa hi hamara sabse bada asset hai.
              </p>
              {/* Pull quote — adds content weight to balance the card */}
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-semibold text-foreground italic leading-relaxed">
                  "Gaon ka har ghar hamara parivaar hai – aur unki zaroorat hamari zimmedaari."
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">— Sushima Team</p>
              </div>
            </motion.div>

            {/* Promises card — flex-1 so it fills remaining column height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-1 bg-white border border-border rounded-xl p-6 flex flex-col justify-center"
            >
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Hamara Vaada
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

          {/* Right col (2/5) — stat cards each flex-1 */}
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