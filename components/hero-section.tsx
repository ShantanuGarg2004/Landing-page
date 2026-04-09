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

/* ─── Hero Navbar (lives inside the hero) ───────────────────── */
function HeroNavbar() {
  const [isOpen, setIsOpen]   = useState(false)
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
          ? {
              background: 'rgba(255,248,220,0.96)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(240,190,60,0.35)',
            }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: '#e05e00' }}
            >
              <span className="text-white font-bold text-base leading-none">स</span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-bold text-lg tracking-tight"
                style={{
                  color: scrolled ? '#2d1a00' : '#ffffff',
                  textShadow: scrolled ? 'none' : '0 1px 6px rgba(60,20,0,0.4)',
                }}
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
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-xl"
            style={
              scrolled
                ? { background: 'transparent' }
                : {
                    background: 'rgba(0,0,0,0.22)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }
            }
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.section)}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150"
                style={{ color: scrolled ? '#5a3a10' : 'rgba(255,245,210,0.95)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = scrolled
                    ? 'rgba(240,190,60,0.18)'
                    : 'rgba(255,255,255,0.15)'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled ? '#2d1a00' : '#ffffff'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = scrolled
                    ? '#5a3a10'
                    : 'rgba(255,245,210,0.95)'
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
        paddingTop: '64px',
        paddingBottom: '0',
      }}
    >
      {/* Navbar sits inside the hero */}
      <HeroNavbar />

      {/* Left-side warm overlay for text readability */}
      <div
        className="absolute top-0 left-0 bottom-0 pointer-events-none z-[1]"
        style={{
          width: '52%',
          background:
            'linear-gradient(to right,rgba(120,60,0,0.38) 0%,rgba(120,60,0,0.22) 70%,rgba(120,60,0,0) 100%)',
        }}
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

        {/* Sun glow — pulses */}
        <ellipse cx="270" cy="120" rx="200" ry="160" fill="url(#rh-sunglow-m)">
          <animate attributeName="rx" values="200;220;200" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="160;178;160" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.7;1" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* Sun core */}
        <circle cx="270" cy="110" r="52" fill="#ffdd00" opacity="0.95" />
        {/* Sun halo — breathes */}
        <circle cx="270" cy="110" r="72" fill="#ffdd00" opacity="0.12">
          <animate attributeName="r" values="72;84;72" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Sun rays — rotate slowly */}
        <g stroke="#ffdd00" strokeWidth="2.5" opacity="0.55" strokeLinecap="round"
           style={{ transformOrigin: '270px 110px', transformBox: 'fill-box' }}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 270 110"
            to="360 270 110"
            dur="30s"
            repeatCount="indefinite"
          />
          <line x1="270" y1="46"  x2="270" y2="24"  />
          <line x1="322" y1="64"  x2="340" y2="46"  />
          <line x1="342" y1="110" x2="366" y2="110" />
          <line x1="322" y1="156" x2="340" y2="174" />
          <line x1="270" y1="176" x2="270" y2="198" />
          <line x1="218" y1="156" x2="200" y2="174" />
          <line x1="198" y1="110" x2="174" y2="110" />
          <line x1="218" y1="64"  x2="200" y2="46"  />
          {/* extra diagonal rays for fullness */}
          <line x1="246" y1="48"  x2="238" y2="28"  />
          <line x1="294" y1="48"  x2="302" y2="28"  />
          <line x1="335" y1="79"  x2="352" y2="62"  />
          <line x1="335" y1="141" x2="352" y2="158" />
          <line x1="294" y1="172" x2="302" y2="192" />
          <line x1="246" y1="172" x2="238" y2="192" />
          <line x1="205" y1="141" x2="188" y2="158" />
          <line x1="205" y1="79"  x2="188" y2="62"  />
        </g>

        <path d="M0,460 Q80,420 160,440 Q240,400 320,425 Q400,395 460,415 Q500,400 540,410 L540,900 L0,900 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,530 Q90,510 180,522 Q270,505 360,518 Q450,502 540,514 L540,900 L0,900 Z" fill="url(#rh-sarson)" />
        <g stroke="#c89010" strokeWidth="0.8" opacity="0.25">
          <line x1="0" y1="545" x2="540" y2="545" />
          <line x1="0" y1="560" x2="540" y2="560" />
          <line x1="0" y1="575" x2="540" y2="575" />
        </g>
        <g stroke="#e8a800" strokeWidth="1" opacity="0.4">
          {[20,55,90,130,170,210,255,300,345,390,435,480,520].map((x) => (
            <line key={x} x1={x} y1="534" x2={x - 2} y2="520" />
          ))}
        </g>
        <path d="M0,600 Q135,584 270,594 Q405,580 540,590 L540,900 L0,900 Z" fill="url(#rh-ground)" />
        <path d="M248,900 Q258,820 268,795 Q278,820 288,900 Z" fill="#c8901a" opacity="0.4" />

        {/* ── MOBILE: Animated Cart — moves right to left ── */}
        {/* Cart enters from right edge, exits left — only cart moves */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="170 0; -900 0"
            dur="12s"
            repeatCount="indefinite"
            calcMode="linear"
          />
          {/* Cart body */}
          <rect x="370" y="480" width="76" height="52" fill="#c8781a" rx="2" />
          <polygon points="360,480 456,480 436,450 378,450" fill="#a06010" />
          <polygon points="360,480 456,480 436,454 378,454" fill="#b87218" opacity="0.5" />
          <rect x="400" y="506" width="17" height="26" fill="#6b3a08" rx="2" />
          <rect x="428" y="492" width="13" height="12" fill="#f0d080" rx="1" />
          {/* Chimney smoke */}
          <path d="M424,450 Q427,438 422,428 Q426,418 422,408" fill="none" stroke="#ccc" strokeWidth="2" opacity="0.45" strokeLinecap="round">
            <animate attributeName="d" values="M424,450 Q427,438 422,428 Q426,418 422,408;M424,450 Q430,436 424,425 Q428,414 424,403;M424,450 Q427,438 422,428 Q426,418 422,408" dur="2s" repeatCount="indefinite" />
          </path>
          {/* Cart pole */}
          <rect x="456" y="468" width="6" height="60" fill="#6b3a08" rx="2" />
          {/* Tree on cart */}
          <ellipse cx="459" cy="457" rx="19" ry="23" fill="#3a8010" opacity="0.88" />
          <ellipse cx="459" cy="448" rx="14" ry="18" fill="#4a9c18" />
          {/* Wheel — spins */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 362 536" to="360 362 536" dur="1.2s" repeatCount="indefinite" />
            <ellipse cx="362" cy="536" rx="8" ry="10" fill="none" stroke="#6b3a08" strokeWidth="2" />
            <line x1="362" y1="526" x2="362" y2="546" stroke="#6b3a08" strokeWidth="1.5" />
            <line x1="352" y1="536" x2="372" y2="536" stroke="#6b3a08" strokeWidth="1.5" />
          </g>
          <ellipse cx="362" cy="544" rx="8" ry="10" fill="#c8681a" />
          <ellipse cx="362" cy="536" rx="6" ry="3" fill="#a85010" />
        </g>

        {/* Static tree — rendered AFTER cart so it stays in front */}
        <rect x="28" y="460" width="11" height="100" fill="#7a4a18" rx="3" />
        <line x1="28" y1="555" x2="14" y2="568" stroke="#7a4a18" strokeWidth="3" strokeLinecap="round" />
        <line x1="39" y1="555" x2="52" y2="568" stroke="#7a4a18" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="33" cy="448" rx="42" ry="32" fill="#2e6e0e" opacity="0.9" />
        <ellipse cx="33" cy="440" rx="32" ry="24" fill="#3a8a14" />
        <ellipse cx="56" cy="454" rx="24" ry="19" fill="#2e6e0e" opacity="0.85" />
        <ellipse cx="10" cy="454" rx="22" ry="18" fill="#3a8a14" opacity="0.9" />
        <ellipse cx="33" cy="428" rx="22" ry="18" fill="#46a018" />

        {/* Static hay bales — rendered AFTER cart */}
        <rect x="10" y="570" width="46" height="18" fill="#c8901a" rx="2" opacity="0.85" />
        <g stroke="#e8a860" strokeWidth="0.7" opacity="0.6">
          <line x1="14" y1="574" x2="52" y2="574" />
          <line x1="14" y1="579" x2="52" y2="579" />
          <line x1="14" y1="584" x2="52" y2="584" />
          <line x1="22" y1="570" x2="22" y2="588" />
          <line x1="34" y1="570" x2="34" y2="588" />
          <line x1="46" y1="570" x2="46" y2="588" />
        </g>

        {/* Pot — rendered AFTER cart */}
        <ellipse cx="480" cy="566" rx="20" ry="7" fill="#8b6a30" />
        <rect x="460" y="542" width="40" height="24" fill="#a07840" rx="2" />
        <ellipse cx="480" cy="542" rx="20" ry="7" fill="#b89050" />
        <line x1="480" y1="542" x2="480" y2="524" stroke="#8b5a10" strokeWidth="1.5" />
        <rect x="469" y="520" width="22" height="5" fill="#8b5a10" rx="1" />
        <rect x="466" y="520" width="4" height="24" fill="#7a4a18" rx="1" />
        <rect x="490" y="520" width="4" height="24" fill="#7a4a18" rx="1" />

        {/* Birds — each bird bobs independently */}
        <g stroke="#c87010" strokeWidth="1.8" fill="none" opacity="0.5">
          {/* Bird 1 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.2s" begin="0s" repeatCount="indefinite" />
            <path d="M80,100 Q88,93 96,100" />
          </g>
          {/* Bird 2 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="4.5s" begin="0.8s" repeatCount="indefinite" />
            <path d="M110,82 Q118,75 126,82" />
          </g>
          {/* Bird 3 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3.8s" begin="1.4s" repeatCount="indefinite" />
            <path d="M200,115 Q208,108 216,115" />
          </g>
          {/* Bird 4 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="5.1s" begin="0.3s" repeatCount="indefinite" />
            <path d="M380,90 Q388,83 396,90" />
          </g>
          {/* Bird 5 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="2.9s" begin="1.9s" repeatCount="indefinite" />
            <path d="M440,72 Q448,65 456,72" />
          </g>
        </g>

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

        {/* Sun glow — pulses */}
        <ellipse cx="585" cy="98" rx="240" ry="160" fill="url(#rh-sunglow-d)">
          <animate attributeName="rx" values="240;270;240" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="160;182;160" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.65;1" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* Sun core */}
        <circle cx="585" cy="90" r="46" fill="#ffdd00" opacity="0.95" />

        {/* Sun halo — breathes */}
        <circle cx="585" cy="90" r="64" fill="#ffdd00" opacity="0.13">
          <animate attributeName="r" values="64;78;64" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.13;0.24;0.13" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Sun rays — rotate slowly */}
        <g stroke="#ffdd00" strokeWidth="2.2" opacity="0.55" strokeLinecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 585 90"
            to="360 585 90"
            dur="30s"
            repeatCount="indefinite"
          />
          {/* 8 main rays */}
          <line x1="585" y1="30"  x2="585" y2="10"  />
          <line x1="637" y1="46"  x2="653" y2="30"  />
          <line x1="655" y1="90"  x2="677" y2="90"  />
          <line x1="637" y1="134" x2="653" y2="150" />
          <line x1="585" y1="152" x2="585" y2="172" />
          <line x1="533" y1="134" x2="517" y2="150" />
          <line x1="515" y1="90"  x2="493" y2="90"  />
          <line x1="533" y1="46"  x2="517" y2="30"  />
          {/* 8 diagonal rays (shorter, fill gaps) */}
          <line x1="559" y1="33"  x2="551" y2="14"  />
          <line x1="611" y1="33"  x2="619" y2="14"  />
          <line x1="648" y1="68"  x2="666" y2="52"  />
          <line x1="648" y1="112" x2="666" y2="128" />
          <line x1="611" y1="147" x2="619" y2="166" />
          <line x1="559" y1="147" x2="551" y2="166" />
          <line x1="522" y1="112" x2="504" y2="128" />
          <line x1="522" y1="68"  x2="504" y2="52"  />
        </g>

        <path d="M0,310 Q100,268 200,288 Q310,248 420,272 Q510,238 620,260 Q710,235 800,252 Q860,240 900,248 L900,540 L0,540 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,360 Q120,340 240,352 Q360,336 480,348 Q600,332 720,345 Q810,330 900,340 L900,540 L0,540 Z" fill="url(#rh-sarson)" />
        <g stroke="#c89010" strokeWidth="0.8" opacity="0.28">
          <line x1="0" y1="375" x2="900" y2="375" />
          <line x1="0" y1="390" x2="900" y2="390" />
          <line x1="0" y1="405" x2="900" y2="405" />
          <line x1="0" y1="420" x2="900" y2="420" />
        </g>
        <g stroke="#e8a800" strokeWidth="1" opacity="0.45">
          {[30,80,130,185,240,300,360,420,480,545,610,675,740,800,858].map((x) => (
            <line key={x} x1={x} y1="363" x2={x - 2} y2="349" />
          ))}
        </g>
        <path d="M0,424 Q200,408 450,418 Q660,406 900,416 L900,540 L0,540 Z" fill="url(#rh-ground)" />
        <path d="M410,540 Q422,478 432,458 Q442,478 454,540 Z" fill="#c8901a" opacity="0.4" />

        {/* ── DESKTOP: Animated Cart — moves right to left ── */}
        {/* Cart enters from right edge (x=900+) and exits left edge */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="330 0; -900 0"
            dur="16s"
            repeatCount="indefinite"
            calcMode="linear"
          />
          {/* Cart body */}
          <rect    x="570"  y="352" width="84" height="56" fill="#c8781a" rx="2" />
          <polygon points="558,352 666,352 644,318 580,318" fill="#a06010" />
          <polygon points="558,352 666,352 644,323 580,323" fill="#b87218" opacity="0.5" />
          <rect x="602" y="380" width="19" height="28" fill="#6b3a08" rx="2" />
          <rect x="632" y="366" width="15" height="13" fill="#f0d080" rx="1" />
          {/* Animated chimney smoke */}
          <path d="M638,318 Q641,305 635,294 Q640,283 636,272" fill="none" stroke="#ccc" strokeWidth="2" opacity="0.5" strokeLinecap="round">
            <animate attributeName="d" values="M638,318 Q641,305 635,294 Q640,283 636,272;M638,318 Q644,303 638,291 Q643,279 639,268;M638,318 Q641,305 635,294 Q640,283 636,272" dur="2s" repeatCount="indefinite" />
          </path>
          {/* Pole and tree */}
          <rect    x="668" y="342" width="7"  height="66" fill="#6b3a08" rx="2" />
          <ellipse cx="671" cy="330" rx="22" ry="26" fill="#3a8010" opacity="0.88" />
          <ellipse cx="671" cy="320" rx="16" ry="20" fill="#4a9c18" />
          <circle  cx="666" cy="325" r="3"            fill="#f5a800" opacity="0.75" />
          <circle  cx="676" cy="332" r="2.5"          fill="#e8900a" opacity="0.7"  />
          {/* Cart frame at translate(730,364) */}
          <g transform="translate(730,364)">
            <rect x="0" y="18" width="62" height="22" fill="#8b4a10" rx="2" />
            <line x1="-32" y1="30" x2="0" y2="30" stroke="#6b3a08" strokeWidth="3" />
            {/* Back wheel spins */}
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 10 40" to="360 10 40" dur="1.5s" repeatCount="indefinite" />
              <circle cx="10" cy="40" r="13" fill="none" stroke="#5a2a08" strokeWidth="2" />
              <line x1="10" y1="27" x2="10" y2="53" stroke="#5a2a08" strokeWidth="1.5" />
              <line x1="-3" y1="40" x2="23" y2="40" stroke="#5a2a08" strokeWidth="1.5" />
            </g>
            <circle cx="10" cy="40" r="13" fill="none" stroke="#5a2a08" strokeWidth="3" />
            <circle cx="10" cy="40" r="4"  fill="#5a2a08" />
            {/* Front wheel spins */}
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 52 40" to="360 52 40" dur="1.5s" repeatCount="indefinite" />
              <circle cx="52" cy="40" r="13" fill="none" stroke="#5a2a08" strokeWidth="2" />
              <line x1="52" y1="27" x2="52" y2="53" stroke="#5a2a08" strokeWidth="1.5" />
              <line x1="39" y1="40" x2="65" y2="40" stroke="#5a2a08" strokeWidth="1.5" />
            </g>
            <circle cx="52" cy="40" r="13" fill="none" stroke="#5a2a08" strokeWidth="3" />
            <circle cx="52" cy="40" r="4"  fill="#5a2a08" />
            <ellipse cx="-18" cy="26" rx="17" ry="9" fill="#c8901a" />
            <circle  cx="-6"  cy="22" r="7"           fill="#c8901a" />
            <path d="M-4,16 Q0,9 2,13"     fill="none" stroke="#8b5a10" strokeWidth="1.5" />
            <path d="M-8,16 Q-12,9 -14,13" fill="none" stroke="#8b5a10" strokeWidth="1.5" />
          </g>
          <ellipse cx="564" cy="404" rx="9" ry="11" fill="#c8681a" />
          <ellipse cx="564" cy="395" rx="7" ry="3"  fill="#a85010" />
        </g>

        {/* Tree (static) — rendered AFTER cart so it stays in front */}
        <rect x="55" y="295" width="12" height="110" fill="#7a4a18" rx="4" />
        <line x1="55" y1="400" x2="38" y2="415" stroke="#7a4a18" strokeWidth="4" strokeLinecap="round" />
        <line x1="67" y1="400" x2="82" y2="415" stroke="#7a4a18" strokeWidth="4" strokeLinecap="round" />
        <line x1="61" y1="395" x2="61" y2="415" stroke="#7a4a18" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="61" cy="282" rx="52" ry="40" fill="#2e6e0e" opacity="0.9"  />
        <ellipse cx="61" cy="272" rx="40" ry="30" fill="#3a8a14"                />
        <ellipse cx="88" cy="288" rx="30" ry="24" fill="#2e6e0e" opacity="0.85" />
        <ellipse cx="34" cy="288" rx="28" ry="22" fill="#3a8a14" opacity="0.9"  />
        <ellipse cx="61" cy="258" rx="28" ry="22" fill="#46a018"                />
        <line x1="50" y1="308" x2="46" y2="340" stroke="#7a4a18" strokeWidth="1.5" opacity="0.5" />
        <line x1="70" y1="310" x2="74" y2="342" stroke="#7a4a18" strokeWidth="1.5" opacity="0.5" />
        <line x1="60" y1="315" x2="58" y2="348" stroke="#7a4a18" strokeWidth="1"   opacity="0.4" />

        {/* Hay bale (static) — rendered AFTER cart */}
        <rect x="26" y="408" width="50" height="22" fill="#c8901a" rx="2" opacity="0.85" />
        <line x1="26" y1="408" x2="26" y2="430" stroke="#8b5a10" strokeWidth="2" />
        <line x1="76" y1="408" x2="76" y2="430" stroke="#8b5a10" strokeWidth="2" />
        <g stroke="#e8a860" strokeWidth="0.8" opacity="0.6">
          <line x1="30" y1="412" x2="72" y2="412" /><line x1="30" y1="416" x2="72" y2="416" />
          <line x1="30" y1="420" x2="72" y2="420" /><line x1="30" y1="424" x2="72" y2="424" />
          <line x1="38" y1="408" x2="38" y2="430" /><line x1="50" y1="408" x2="50" y2="430" />
          <line x1="62" y1="408" x2="62" y2="430" />
        </g>

        {/* Pot (static) — rendered AFTER cart */}
        <ellipse cx="200" cy="416" rx="22" ry="8"  fill="#8b6a30" />
        <rect    x="178"  y="390" width="44" height="26" fill="#a07840" rx="2" />
        <ellipse cx="200" cy="390" rx="22" ry="8"  fill="#b89050" />
        <line x1="200" y1="390" x2="200" y2="370" stroke="#8b5a10" strokeWidth="1.5" />
        <rect x="188" y="366" width="24" height="6" fill="#8b5a10" rx="1" />
        <rect x="185" y="366" width="4"  height="28" fill="#7a4a18" rx="1" />
        <rect x="211" y="366" width="4"  height="28" fill="#7a4a18" rx="1" />

        {/* Birds — each bird bobs independently */}
        <g stroke="#c87010" strokeWidth="1.8" fill="none" opacity="0.5">
          {/* Bird 1 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3.3s" begin="0s" repeatCount="indefinite" />
            <path d="M150,68 Q158,61 166,68" />
          </g>
          {/* Bird 2 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="5.0s" begin="1.1s" repeatCount="indefinite" />
            <path d="M178,55 Q186,48 194,55" />
          </g>
          {/* Bird 3 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="3.7s" begin="0.5s" repeatCount="indefinite" />
            <path d="M320,80 Q328,73 336,80" />
          </g>
          {/* Bird 4 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="4.4s" begin="2.0s" repeatCount="indefinite" />
            <path d="M350,62 Q358,55 366,62" />
          </g>
          {/* Bird 5 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.8s" begin="0.7s" repeatCount="indefinite" />
            <path d="M680,72 Q688,65 696,72" />
          </g>
          {/* Bird 6 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="4.1s" begin="1.6s" repeatCount="indefinite" />
            <path d="M710,54 Q718,47 726,54" />
          </g>
          {/* Bird 7 */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.5s" begin="2.3s" repeatCount="indefinite" />
            <path d="M760,80 Q768,73 776,80" />
          </g>
        </g>

        <g fill="#e05e00" opacity="0.35">
          {[50,92,134,176,218,260,302,344,386,428,470,512,554,596,638,680,722,764,806,848].map(
            (x, i) => <circle key={x} cx={x} cy="533" r={i % 2 === 0 ? 4 : 3} />
          )}
        </g>
        <path d="M0,55 Q22,28 54,48 Q32,72 0,55 Z"  fill="#e05e00" opacity="0.1"  />
        <path d="M0,88 Q34,52 72,74 Q42,102 0,88 Z" fill="#f5a800" opacity="0.08" />
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
              1000+ Khush Customers
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight"
              style={{ textShadow: '0 1px 8px rgba(80,30,0,0.45)' }}
            >
              <span style={{ color: '#ffffff' }}>Gaon ke liye </span>
              <span style={{ color: '#ffd966' }}>sahi products,</span>
              <span style={{ color: '#ffffff' }}>{' '}sahi daam mein</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed"
              style={{ color: '#ffe8c0', textShadow: '0 1px 4px rgba(60,20,0,0.5)' }}
            >
              Simple ordering, fast delivery, no drama.
              Sirf call ya WhatsApp karein — hum kaam kar denge.
            </motion.p>

            {/* Checklist */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="space-y-2"
            >
              {[
                'Simple aur easy ordering',
                'Fast delivery, no tension',
                'Sahi price, full quality',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2.5 text-sm font-medium"
                  style={{ color: '#fff3dc', textShadow: '0 1px 4px rgba(60,20,0,0.45)' }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{
                      background: 'rgba(74,140,24,0.9)',
                      border: '1.5px solid #6ab830',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                    }}
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
                Dekho Products
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-colors duration-150 hover:bg-white/10"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid #6ab830',
                  color: '#d4f09a',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Phone size={14} />
                Order Karein
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
              +91 7452897444 &nbsp;·&nbsp; Somvar–Shanivar, 10AM–6PM
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
                alt="Gaon ke logon ke liye Sushima products"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">Sushima Products</p>
                <p className="text-white/75 text-xs mt-0.5">Hazaaron gaon ke ghar mein istemal</p>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1000+',   label: 'Khush Customers' },
                { value: '5+ Saal', label: 'Trusted Since'   },
                { value: 'Fast',    label: 'Delivery'        },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl px-3 py-3 text-center"
                  style={{
                    background: 'rgba(255,248,220,0.88)',
                    border: '1.5px solid #f0c060',
                    boxShadow: '0 2px 0 #d4a020',
                  }}
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