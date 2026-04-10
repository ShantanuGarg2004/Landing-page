'use client'

import { motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Nav items ─────────────────────────────────────────────── */
const navItems = [
  { label: 'Home',     href: '/',          section: 'home'     },
  { label: 'Products', href: '/#products', section: 'products' },
  { label: 'About',    href: '/#about',    section: 'about'    },
  { label: 'Contact',  href: '/#contact',  section: 'contact'  },
]

/* ─── Hero Navbar ───────────────────────────────────────────── */
function HeroNavbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#e05e00' }}>
              <span className="text-white font-bold text-base leading-none">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight" style={{ color: scrolled ? '#2d1a00' : '#ffffff', textShadow: scrolled ? 'none' : '0 1px 6px rgba(60,20,0,0.4)' }}>
                SAV Life Sciences
              </span>
              <span className="text-[10px] font-normal" style={{ color: scrolled ? '#8a6030' : 'rgba(255,238,190,0.85)' }}>
                Pharmaceuticals
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl"
            style={scrolled ? { background: 'transparent' } : { background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.section)}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                style={{ color: scrolled ? '#5a3a10' : 'rgba(255,245,210,0.95)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = scrolled ? 'rgba(240,190,60,0.18)' : 'rgba(255,255,255,0.15)'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled ? '#2d1a00' : '#ffffff'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled ? '#5a3a10' : 'rgba(255,245,210,0.95)'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={handleOrderClick}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm text-white transition-opacity duration-150 hover:opacity-90"
            style={{ background: '#e05e00', boxShadow: '0 2px 0 #a84000' }}
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
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 pb-3 pt-3 space-y-1 rounded-xl px-2"
            style={{ background: 'rgba(255,248,220,0.96)', backdropFilter: 'blur(12px)', border: '1px solid rgba(240,190,60,0.35)' }}
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

/* ─── Hero Section ──────────────────────────────────────────── */
export function HeroSection() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffeaaa 0%, #ffca55 35%, #f5a800 58%, #6db82e 72%, #3e7a12 100%)',
        paddingTop: '44px',
        paddingBottom: '0',
      }}
    >
      <HeroNavbar />

      {/* Left-side warm overlay */}
      <div
        className="absolute top-0 left-0 bottom-0 pointer-events-none z-[1]"
        style={{ width: '52%', background: 'linear-gradient(to right,rgba(120,60,0,0.38) 0%,rgba(120,60,0,0.22) 70%,rgba(120,60,0,0) 100%)' }}
      />

      {/* ── Shared SVG defs ── */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="rh-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffeaaa" />
            <stop offset="45%"  stopColor="#ffca55" />
            <stop offset="100%" stopColor="#f5a800" />
          </linearGradient>
          <linearGradient id="rh-sarson" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f7d820" />
            <stop offset="100%" stopColor="#e8a400" />
          </linearGradient>
          <linearGradient id="rh-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6db82e" />
            <stop offset="100%" stopColor="#3e7a12" />
          </linearGradient>
          <radialGradient id="rh-sunglow-m" cx="50%" cy="15%" r="45%">
            <stop offset="0%"   stopColor="#ffb020" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0"   />
          </radialGradient>
          <radialGradient id="rh-sunglow-d" cx="65%" cy="18%" r="38%">
            <stop offset="0%"   stopColor="#ffb020" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffb020" stopOpacity="0"   />
          </radialGradient>
        </defs>
      </svg>

      {/* ── MOBILE SVG background ── */}
      <svg
        className="md:hidden"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 540 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="540" height="900" fill="url(#rh-sky)" />
        <rect x="0" y="560" width="540" height="340" fill="#3e7a12" />

        <ellipse cx="270" cy="120" rx="200" ry="160" fill="url(#rh-sunglow-m)">
          <animate attributeName="rx" values="200;220;200" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="160;178;160" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" />
        </ellipse>

        <circle cx="270" cy="110" r="52" fill="#ffdd00" opacity="0.95" />
        <circle cx="270" cy="110" r="72" fill="#ffdd00" opacity="0.12">
          <animate attributeName="r" values="72;84;72" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3s" repeatCount="indefinite" />
        </circle>

        <g stroke="#ffdd00" strokeWidth="2.5" opacity="0.55" strokeLinecap="round"
           style={{ transformOrigin: '270px 110px', transformBox: 'fill-box' }}>
          <animateTransform attributeName="transform" type="rotate" from="0 270 110" to="360 270 110" dur="30s" repeatCount="indefinite" />
          <line x1="270" y1="46"  x2="270" y2="24"  />
          <line x1="322" y1="64"  x2="340" y2="46"  />
          <line x1="342" y1="110" x2="366" y2="110" />
          <line x1="322" y1="156" x2="340" y2="174" />
          <line x1="270" y1="176" x2="270" y2="198" />
          <line x1="218" y1="156" x2="200" y2="174" />
          <line x1="198" y1="110" x2="174" y2="110" />
          <line x1="218" y1="64"  x2="200" y2="46"  />
        </g>

        <path d="M0,460 Q80,420 160,440 Q240,400 320,425 Q400,395 460,415 Q500,400 540,410 L540,900 L0,900 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,530 Q90,510 180,522 Q270,505 360,518 Q450,502 540,514 L540,900 L0,900 Z" fill="url(#rh-sarson)" />
        <path d="M0,600 Q135,584 270,594 Q405,580 540,590 L540,900 L0,900 Z" fill="url(#rh-ground)" />

        <g fill="#e05e00" opacity="0.35">
          {[30,66,102,138,174,210,248,286,324,362,400,438,476,512].map(
            (x, i) => <circle key={x} cx={x} cy="893" r={i % 2 === 0 ? 4 : 3} />
          )}
        </g>
        <path d="M0,12 Q135,40 270,18 Q405,40 540,12" fill="none" stroke="#e05e00" strokeWidth="2.5" opacity="0.2" strokeDasharray="7,6" />
      </svg>

      {/* ── DESKTOP SVG background ── */}
      <svg
        className="hidden md:block"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 900 540"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="900" height="540" fill="url(#rh-sky)" />
        <rect x="0" y="380" width="900" height="160" fill="#3e7a12" />

        <ellipse cx="585" cy="98" rx="240" ry="160" fill="url(#rh-sunglow-d)">
          <animate attributeName="rx" values="240;270;240" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="160;182;160" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.65;1" dur="4s" repeatCount="indefinite" />
        </ellipse>

        <circle cx="585" cy="90" r="46" fill="#ffdd00" opacity="0.95" />
        <circle cx="585" cy="90" r="64" fill="#ffdd00" opacity="0.13">
          <animate attributeName="r" values="64;78;64" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.13;0.24;0.13" dur="3s" repeatCount="indefinite" />
        </circle>

        <g stroke="#ffdd00" strokeWidth="2.2" opacity="0.55" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 585 90" to="360 585 90" dur="30s" repeatCount="indefinite" />
          <line x1="585" y1="30"  x2="585" y2="10"  />
          <line x1="637" y1="46"  x2="653" y2="30"  />
          <line x1="655" y1="90"  x2="677" y2="90"  />
          <line x1="637" y1="134" x2="653" y2="150" />
          <line x1="585" y1="152" x2="585" y2="172" />
          <line x1="533" y1="134" x2="517" y2="150" />
          <line x1="515" y1="90"  x2="493" y2="90"  />
          <line x1="533" y1="46"  x2="517" y2="30"  />
        </g>

        <path d="M0,310 Q100,268 200,288 Q310,248 420,272 Q510,238 620,260 Q710,235 800,252 Q860,240 900,248 L900,540 L0,540 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,360 Q120,340 240,352 Q360,336 480,348 Q600,332 720,345 Q810,330 900,340 L900,540 L0,540 Z" fill="url(#rh-sarson)" />
        <path d="M0,424 Q200,408 450,418 Q660,406 900,416 L900,540 L0,540 Z" fill="url(#rh-ground)" />

        <rect x="55" y="295" width="12" height="110" fill="#7a4a18" rx="4" />
        <ellipse cx="61" cy="282" rx="52" ry="40" fill="#2e6e0e" opacity="0.9"  />
        <ellipse cx="61" cy="272" rx="40" ry="30" fill="#3a8a14"                />
        <ellipse cx="88" cy="288" rx="30" ry="24" fill="#2e6e0e" opacity="0.85" />
        <ellipse cx="34" cy="288" rx="28" ry="22" fill="#3a8a14" opacity="0.9"  />
        <ellipse cx="61" cy="258" rx="28" ry="22" fill="#46a018"                />

        <rect x="26" y="408" width="50" height="22" fill="#c8901a" rx="2" opacity="0.85" />

        <g fill="#e05e00" opacity="0.35">
          {[50,92,134,176,218,260,302,344,386,428,470,512,554,596,638,680,722,764,806,848].map(
            (x, i) => <circle key={x} cx={x} cy="533" r={i % 2 === 0 ? 4 : 3} />
          )}
        </g>
        <path d="M0,12 Q225,48 450,20 Q675,48 900,12" fill="none" stroke="#e05e00" strokeWidth="2.5" opacity="0.2" strokeDasharray="7,6" />
      </svg>

      {/* ── Content ── */}
      <div className="relative z-[2] max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* Left: Text */}
          <div className="space-y-5">

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white"
              style={{ background: '#e05e00' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
              Trusted by 1000+ Customers
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight"
              style={{ textShadow: '0 1px 8px rgba(80,30,0,0.45)' }}
            >
              <span style={{ color: '#ffffff' }}>Trusted Animal </span>
              <span style={{ color: '#ffd966' }}>Healthcare Solutions</span>
              <span style={{ color: '#ffffff' }}>{' '}for Better Productivity</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed"
              style={{ color: '#ffe8c0', textShadow: '0 1px 4px rgba(60,20,0,0.5)' }}
            >
              Milk production badhane, animals ki sehat sudharne aur unhe strong banane ke liye
              effective aur reliable products.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="space-y-2"
            >
              {[
                'Quality products since 2022',
                'Proven results, real feedback',
                'Direct support via Call & WhatsApp',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-medium"
                  style={{ color: '#fff3dc', textShadow: '0 1px 4px rgba(60,20,0,0.45)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{ background: 'rgba(74,140,24,0.9)', border: '1.5px solid #6ab830', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </motion.ul>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <button
                onClick={() => scrollTo('products')}
                className="flex-1 sm:flex-none text-white px-7 py-3 rounded-lg font-semibold text-sm transition-opacity duration-150 hover:opacity-90"
                style={{ background: '#e05e00', boxShadow: '0 3px 0 #a84000' }}
              >
                View Products
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-colors duration-150 hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid #6ab830', color: '#d4f09a', backdropFilter: 'blur(4px)' }}
              >
                <Phone size={14} />
                Call Now
              </button>
            </motion.div>

            {/* Phone hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-xs flex items-center gap-1.5"
              style={{ color: '#ffd499' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: '#6ab830' }} />
              No online payment required – directly connect and order with confidence
            </motion.p>
          </div>

          {/* Right: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div
              className="relative w-full h-72 md:h-[380px] rounded-2xl overflow-hidden"
              style={{ border: '2px solid #f0c060', boxShadow: '0 5px 0 #b87a10' }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-aIxlS5IZixFEujgYg1p1fk4JjT4RX3.jpg"
                alt="SAV Life Sciences Pharmaceuticals – Animal Healthcare Products"
                fill
                className="object-cover"
                priority
                onError={(e) => { ;(e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">SAV Life Sciences Pharmaceuticals</p>
                <p className="text-white/75 text-xs mt-0.5">Trusted animal healthcare since 2022</p>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1000+',   label: 'Happy Customers' },
                { value: 'Since 2022', label: 'Trusted Brand'   },
                { value: 'Fast',    label: 'Delivery'        },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl px-3 py-3 text-center"
                  style={{ background: 'rgba(255,248,220,0.88)', border: '1.5px solid #f0c060', boxShadow: '0 2px 0 #d4a020' }}
                >
                  <p className="text-sm font-bold" style={{ color: '#3d2200' }}>{stat.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#8a6030' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}