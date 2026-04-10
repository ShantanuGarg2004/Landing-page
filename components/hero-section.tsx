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
      className="absolute top-0 left-0 right-0 z-50"
      style={
        scrolled
          ? { background: 'rgba(255,248,220,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(240,190,60,0.35)', transition: 'background 0.3s, border-color 0.3s' }
          : { background: 'transparent', transition: 'background 0.3s, border-color 0.3s' }
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

/*
  ══ BIRD SYSTEM — Design notes ═══════════════════════════════════════════════

  SPAWNING:  Each bird uses `begin="-Ns"` (negative offset) so it starts
             mid-cycle on page load. This distributes birds across the full
             sky immediately — no burst-spawning from one edge.

  TRAVEL:    A single animateTransform on the outer <g> carries full 2D motion:
             "startX startY; endX endY" — bakes in both X travel and Y drift,
             so birds naturally bank and glide rather than flying ruler-straight.

  FADE:      A separate <animate> on the outer <g> fades opacity: 0→full near
             the right edge, holds through flight, drops back to 0 near the
             left edge. This hides the loop seam invisibly.

  WINGS:     Inner <g> holds only the wing-beat animated paths. Wing paths
             are drawn centred at (0,0) so the parent transform positions them.
             calcMode="spline" + keySplines give gliders an easing feel;
             fast flappers use linear (default) for a snappier beat.

  FLOCKS:    Each wingman has a staggered `begin` so the flock beats in
             an organic wave, not in unison.

  DEPTH:     strokeWidth + circle radius encode distance: larger = closer.
             Higher-altitude birds are also smaller and more transparent.

  ═════════════════════════════════════════════════════════════════════════════
*/

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

      {/* ════════════════════════════════════════════
          MOBILE SVG  (viewBox 540 x 900)
      ════════════════════════════════════════════ */}
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

        {/* Sun */}
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
        <g stroke="#ffdd00" strokeWidth="2.5" opacity="0.55" strokeLinecap="round">
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

        {/* Terrain */}
        <path d="M0,460 Q80,420 160,440 Q240,400 320,425 Q400,395 460,415 Q500,400 540,410 L540,900 L0,900 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,530 Q90,510 180,522 Q270,505 360,518 Q450,502 540,514 L540,900 L0,900 Z" fill="url(#rh-sarson)" />
        <path d="M0,600 Q135,584 270,594 Q405,580 540,590 L540,900 L0,900 Z" fill="url(#rh-ground)" />

        {/* ── MOBILE BIRDS ─────────────────────────────────────────────────────────

            Each outer <g> carries the full 2D travel in its animateTransform values.
            begin="-Ns" pre-starts each bird mid-cycle so the sky is populated
            immediately on load with no simultaneous right-edge spawning.
            A separate <animate> on each outer <g> fades in/out to hide the loop seam.
        ──────────────────────────────────────────────────────────────────────────── */}

        {/* M-A: Large glider, high altitude — slow eased wing beat, gentle descent */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="590 65; -80 78" dur="38s" begin="-14s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.72;0.72;0.72;0"
            keyTimes="0;0.06;0.5;0.94;1" dur="38s" begin="-14s" repeatCount="indefinite" />
          <path fill="none" stroke="#2d1200" strokeWidth="2.6" strokeLinecap="round" d="M0,0 Q-13,-11 -26,0">
            <animate attributeName="d"
              values="M0,0 Q-13,-11 -26,0; M0,0 Q-13,8 -26,0; M0,0 Q-13,-11 -26,0"
              dur="2.8s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.6" strokeLinecap="round" d="M0,0 Q13,-11 26,0">
            <animate attributeName="d"
              values="M0,0 Q13,-11 26,0; M0,0 Q13,8 26,0; M0,0 Q13,-11 26,0"
              dur="2.8s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
          </path>
          <circle cx="0" cy="0" r="2.8" fill="#1a0800" />
        </g>

        {/* M-B: V-formation of 3 — fast flappers, slight ascent, staggered wingmen */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="590 160; -120 149" dur="22s" begin="-6s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.82;0.82;0.82;0"
            keyTimes="0;0.07;0.5;0.93;1" dur="22s" begin="-6s" repeatCount="indefinite" />
          {/* Leader */}
          <path fill="none" stroke="#1a0800" strokeWidth="2.5" strokeLinecap="round" d="M0,0 Q-10,-9 -20,0">
            <animate attributeName="d" values="M0,0 Q-10,-9 -20,0; M0,0 Q-10,7 -20,0; M0,0 Q-10,-9 -20,0" dur="0.48s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#1a0800" strokeWidth="2.5" strokeLinecap="round" d="M0,0 Q10,-9 20,0">
            <animate attributeName="d" values="M0,0 Q10,-9 20,0; M0,0 Q10,7 20,0; M0,0 Q10,-9 20,0" dur="0.48s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.4" fill="#0e0400" />
          {/* Left wingman — staggered by 0.12s */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M-36,13 Q-44,5 -52,13">
            <animate attributeName="d" values="M-36,13 Q-44,5 -52,13; M-36,13 Q-44,20 -52,13; M-36,13 Q-44,5 -52,13" dur="0.48s" begin="0.12s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M-52,13 Q-60,5 -68,13">
            <animate attributeName="d" values="M-52,13 Q-60,5 -68,13; M-52,13 Q-60,20 -68,13; M-52,13 Q-60,5 -68,13" dur="0.48s" begin="0.12s" repeatCount="indefinite" />
          </path>
          {/* Right wingman — staggered by 0.24s */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M36,13 Q44,5 52,13">
            <animate attributeName="d" values="M36,13 Q44,5 52,13; M36,13 Q44,20 52,13; M36,13 Q44,5 52,13" dur="0.48s" begin="0.24s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M52,13 Q60,5 68,13">
            <animate attributeName="d" values="M52,13 Q60,5 68,13; M52,13 Q60,20 68,13; M52,13 Q60,5 68,13" dur="0.48s" begin="0.24s" repeatCount="indefinite" />
          </path>
        </g>

        {/* M-C: Loose pair, mid-low altitude — bird 2 ahead and slightly higher */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="590 210; -90 224" dur="30s" begin="-20s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.70;0.70;0.70;0"
            keyTimes="0;0.06;0.5;0.94;1" dur="30s" begin="-20s" repeatCount="indefinite" />
          {/* Bird 1 */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.2" strokeLinecap="round" d="M0,0 Q-9,-8 -18,0">
            <animate attributeName="d" values="M0,0 Q-9,-8 -18,0; M0,0 Q-9,6 -18,0; M0,0 Q-9,-8 -18,0" dur="0.62s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.2" strokeLinecap="round" d="M0,0 Q9,-8 18,0">
            <animate attributeName="d" values="M0,0 Q9,-8 18,0; M0,0 Q9,6 18,0; M0,0 Q9,-8 18,0" dur="0.62s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.2" fill="#1a0800" />
          {/* Bird 2 — ahead and higher, half-cycle offset */}
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M48,-10 Q56,-17 64,-10">
            <animate attributeName="d" values="M48,-10 Q56,-17 64,-10; M48,-10 Q56,-4 64,-10; M48,-10 Q56,-17 64,-10" dur="0.62s" begin="0.31s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M64,-10 Q72,-17 80,-10">
            <animate attributeName="d" values="M64,-10 Q72,-17 80,-10; M64,-10 Q72,-4 80,-10; M64,-10 Q72,-17 80,-10" dur="0.62s" begin="0.31s" repeatCount="indefinite" />
          </path>
          <circle cx="64" cy="-10" r="2" fill="#2a1002" />
        </g>

        {/* M-D: Tiny distant speck — very high, faint, ultra-slow flap */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="590 48; -80 44" dur="52s" begin="-38s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.36;0.36;0.36;0"
            keyTimes="0;0.05;0.5;0.95;1" dur="52s" begin="-38s" repeatCount="indefinite" />
          <path fill="none" stroke="#8a6838" strokeWidth="1.2" strokeLinecap="round" d="M0,0 Q-4,-4 -8,0">
            <animate attributeName="d" values="M0,0 Q-4,-4 -8,0; M0,0 Q-4,3 -8,0; M0,0 Q-4,-4 -8,0" dur="1.4s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#8a6838" strokeWidth="1.2" strokeLinecap="round" d="M0,0 Q4,-4 8,0">
            <animate attributeName="d" values="M0,0 Q4,-4 8,0; M0,0 Q4,3 8,0; M0,0 Q4,-4 8,0" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* M-E: Fast solo, lower altitude — energetic quick flapper, mild ascent */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="590 238; -60 224" dur="16s" begin="-2s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.78;0.78;0.78;0"
            keyTimes="0;0.08;0.5;0.92;1" dur="16s" begin="-2s" repeatCount="indefinite" />
          <path fill="none" stroke="#2d1200" strokeWidth="2.3" strokeLinecap="round" d="M0,0 Q-9,-8 -18,0">
            <animate attributeName="d" values="M0,0 Q-9,-8 -18,0; M0,0 Q-9,7 -18,0; M0,0 Q-9,-8 -18,0" dur="0.38s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.3" strokeLinecap="round" d="M0,0 Q9,-8 18,0">
            <animate attributeName="d" values="M0,0 Q9,-8 18,0; M0,0 Q9,7 18,0; M0,0 Q9,-8 18,0" dur="0.38s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.4" fill="#1a0800" />
        </g>

        {/* Decorative dots & top arc */}
        <g fill="#e05e00" opacity="0.35">
          {[30,66,102,138,174,210,248,286,324,362,400,438,476,512].map(
            (x, i) => <circle key={x} cx={x} cy="893" r={i % 2 === 0 ? 4 : 3} />
          )}
        </g>
        <path d="M0,12 Q135,40 270,18 Q405,40 540,12" fill="none" stroke="#e05e00" strokeWidth="2.5" opacity="0.2" strokeDasharray="7,6" />
      </svg>

      {/* ════════════════════════════════════════════
          DESKTOP SVG  (viewBox 900 x 540)
          7 bird groups, each pre-started mid-cycle.
      ════════════════════════════════════════════ */}
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

        {/* Sun */}
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

        {/* Terrain */}
        <path d="M0,310 Q100,268 200,288 Q310,248 420,272 Q510,238 620,260 Q710,235 800,252 Q860,240 900,248 L900,540 L0,540 Z" fill="#7ab830" opacity="0.45" />
        <path d="M0,360 Q120,340 240,352 Q360,336 480,348 Q600,332 720,345 Q810,330 900,340 L900,540 L0,540 Z" fill="url(#rh-sarson)" />
        <path d="M0,424 Q200,408 450,418 Q660,406 900,416 L900,540 L0,540 Z" fill="url(#rh-ground)" />

        {/* Tree & hay bale */}
        <rect x="55" y="295" width="12" height="110" fill="#7a4a18" rx="4" />
        <ellipse cx="61" cy="282" rx="52" ry="40" fill="#2e6e0e" opacity="0.9"  />
        <ellipse cx="61" cy="272" rx="40" ry="30" fill="#3a8a14" />
        <ellipse cx="88" cy="288" rx="30" ry="24" fill="#2e6e0e" opacity="0.85" />
        <ellipse cx="34" cy="288" rx="28" ry="22" fill="#3a8a14" opacity="0.9"  />
        <ellipse cx="61" cy="258" rx="28" ry="22" fill="#46a018" />
        <rect x="26" y="408" width="50" height="22" fill="#c8901a" rx="2" opacity="0.85" />

        {/* ── DESKTOP BIRDS ────────────────────────────────────────────────────────── */}

        {/* D-A: Large solo glider — very high, slow eased flap, gentle descent
               begin=-32s out of 48s → starts at 67% = well past centre-right */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 55; -120 68" dur="48s" begin="-32s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.75;0.75;0.75;0"
            keyTimes="0;0.05;0.5;0.95;1" dur="48s" begin="-32s" repeatCount="indefinite" />
          <path fill="none" stroke="#1a0800" strokeWidth="3.2" strokeLinecap="round" d="M0,0 Q-16,-14 -32,0">
            <animate attributeName="d"
              values="M0,0 Q-16,-14 -32,0; M0,0 Q-16,10 -32,0; M0,0 Q-16,-14 -32,0"
              dur="3.2s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
          </path>
          <path fill="none" stroke="#1a0800" strokeWidth="3.2" strokeLinecap="round" d="M0,0 Q16,-14 32,0">
            <animate attributeName="d"
              values="M0,0 Q16,-14 32,0; M0,0 Q16,10 32,0; M0,0 Q16,-14 32,0"
              dur="3.2s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
          </path>
          <circle cx="0" cy="0" r="3.5" fill="#0e0400" />
        </g>

        {/* D-B: Grand V of 5 — mid-high, fast flappers, slight banking ascent
               begin=-8s out of 30s → starts at 27% = just entered from right */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 140; -200 128" dur="30s" begin="-8s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.88;0.88;0.88;0"
            keyTimes="0;0.06;0.5;0.94;1" dur="30s" begin="-8s" repeatCount="indefinite" />
          {/* Leader */}
          <path fill="none" stroke="#1a0800" strokeWidth="2.8" strokeLinecap="round" d="M0,0 Q-11,-10 -22,0">
            <animate attributeName="d" values="M0,0 Q-11,-10 -22,0; M0,0 Q-11,8 -22,0; M0,0 Q-11,-10 -22,0" dur="0.52s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#1a0800" strokeWidth="2.8" strokeLinecap="round" d="M0,0 Q11,-10 22,0">
            <animate attributeName="d" values="M0,0 Q11,-10 22,0; M0,0 Q11,8 22,0; M0,0 Q11,-10 22,0" dur="0.52s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="3" fill="#0e0400" />
          {/* L1 */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.4" strokeLinecap="round" d="M-42,15 Q-51,6 -60,15">
            <animate attributeName="d" values="M-42,15 Q-51,6 -60,15; M-42,15 Q-51,23 -60,15; M-42,15 Q-51,6 -60,15" dur="0.52s" begin="0.13s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.4" strokeLinecap="round" d="M-60,15 Q-69,6 -78,15">
            <animate attributeName="d" values="M-60,15 Q-69,6 -78,15; M-60,15 Q-69,23 -78,15; M-60,15 Q-69,6 -78,15" dur="0.52s" begin="0.13s" repeatCount="indefinite" />
          </path>
          {/* R1 */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.4" strokeLinecap="round" d="M42,15 Q51,6 60,15">
            <animate attributeName="d" values="M42,15 Q51,6 60,15; M42,15 Q51,23 60,15; M42,15 Q51,6 60,15" dur="0.52s" begin="0.13s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.4" strokeLinecap="round" d="M60,15 Q69,6 78,15">
            <animate attributeName="d" values="M60,15 Q69,6 78,15; M60,15 Q69,23 78,15; M60,15 Q69,6 78,15" dur="0.52s" begin="0.13s" repeatCount="indefinite" />
          </path>
          {/* L2 */}
          <path fill="none" stroke="#3a1a04" strokeWidth="2.1" strokeLinecap="round" d="M-86,30 Q-94,22 -102,30">
            <animate attributeName="d" values="M-86,30 Q-94,22 -102,30; M-86,30 Q-94,38 -102,30; M-86,30 Q-94,22 -102,30" dur="0.52s" begin="0.26s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#3a1a04" strokeWidth="2.1" strokeLinecap="round" d="M-102,30 Q-110,22 -118,30">
            <animate attributeName="d" values="M-102,30 Q-110,22 -118,30; M-102,30 Q-110,38 -118,30; M-102,30 Q-110,22 -118,30" dur="0.52s" begin="0.26s" repeatCount="indefinite" />
          </path>
          {/* R2 */}
          <path fill="none" stroke="#3a1a04" strokeWidth="2.1" strokeLinecap="round" d="M86,30 Q94,22 102,30">
            <animate attributeName="d" values="M86,30 Q94,22 102,30; M86,30 Q94,38 102,30; M86,30 Q94,22 102,30" dur="0.52s" begin="0.26s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#3a1a04" strokeWidth="2.1" strokeLinecap="round" d="M102,30 Q110,22 118,30">
            <animate attributeName="d" values="M102,30 Q110,22 118,30; M102,30 Q110,38 118,30; M102,30 Q110,22 118,30" dur="0.52s" begin="0.26s" repeatCount="indefinite" />
          </path>
        </g>

        {/* D-C: Fast nervous solo near sun height — short cycle, quick flap
               begin=-5s out of 14s → starts at 36% = near sun */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 62; -80 58" dur="14s" begin="-5s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.65;0.65;0.65;0"
            keyTimes="0;0.08;0.5;0.92;1" dur="14s" begin="-5s" repeatCount="indefinite" />
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M0,0 Q-8,-7 -16,0">
            <animate attributeName="d" values="M0,0 Q-8,-7 -16,0; M0,0 Q-8,6 -16,0; M0,0 Q-8,-7 -16,0" dur="0.34s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.1" strokeLinecap="round" d="M0,0 Q8,-7 16,0">
            <animate attributeName="d" values="M0,0 Q8,-7 16,0; M0,0 Q8,6 16,0; M0,0 Q8,-7 16,0" dur="0.34s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.1" fill="#1a0800" />
        </g>

        {/* D-D: Loose pair — bird 2 ahead and higher, staggered half-cycle flap
               begin=-22s out of 34s → starts at 65% = left-of-centre */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 220; -100 208" dur="34s" begin="-22s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.72;0.72;0.72;0"
            keyTimes="0;0.06;0.5;0.94;1" dur="34s" begin="-22s" repeatCount="indefinite" />
          {/* Bird 1 */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.3" strokeLinecap="round" d="M0,0 Q-10,-9 -20,0">
            <animate attributeName="d" values="M0,0 Q-10,-9 -20,0; M0,0 Q-10,7 -20,0; M0,0 Q-10,-9 -20,0" dur="0.58s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.3" strokeLinecap="round" d="M0,0 Q10,-9 20,0">
            <animate attributeName="d" values="M0,0 Q10,-9 20,0; M0,0 Q10,7 20,0; M0,0 Q10,-9 20,0" dur="0.58s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.4" fill="#1a0800" />
          {/* Bird 2 — ahead and above, half-beat offset */}
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M50,-14 Q59,-22 68,-14">
            <animate attributeName="d" values="M50,-14 Q59,-22 68,-14; M50,-14 Q59,-7 68,-14; M50,-14 Q59,-22 68,-14" dur="0.58s" begin="0.29s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M68,-14 Q77,-22 86,-14">
            <animate attributeName="d" values="M68,-14 Q77,-22 86,-14; M68,-14 Q77,-7 86,-14; M68,-14 Q77,-22 86,-14" dur="0.58s" begin="0.29s" repeatCount="indefinite" />
          </path>
          <circle cx="68" cy="-14" r="2" fill="#2a1002" />
        </g>

        {/* D-E: Tiny distant speck — very high, nearly invisible, ultra-slow
               begin=-44s out of 60s → starts at 73% = far left sky */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 28; -100 25" dur="60s" begin="-44s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.35;0.35;0.35;0"
            keyTimes="0;0.04;0.5;0.96;1" dur="60s" begin="-44s" repeatCount="indefinite" />
          <path fill="none" stroke="#9a7848" strokeWidth="1.1" strokeLinecap="round" d="M0,0 Q-4,-4 -8,0">
            <animate attributeName="d" values="M0,0 Q-4,-4 -8,0; M0,0 Q-4,3 -8,0; M0,0 Q-4,-4 -8,0" dur="1.6s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#9a7848" strokeWidth="1.1" strokeLinecap="round" d="M0,0 Q4,-4 8,0">
            <animate attributeName="d" values="M0,0 Q4,-4 8,0; M0,0 Q4,3 8,0; M0,0 Q4,-4 8,0" dur="1.6s" repeatCount="indefinite" />
          </path>
        </g>

        {/* D-F: Medium solo cruiser — lower sky, moderate eased flap, smooth descent
               begin=-18s out of 38s → starts at 47% = roughly centre of sky */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 270; -80 258" dur="38s" begin="-18s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.80;0.80;0.80;0"
            keyTimes="0;0.06;0.5;0.94;1" dur="38s" begin="-18s" repeatCount="indefinite" />
          <path fill="none" stroke="#1a0800" strokeWidth="2.9" strokeLinecap="round" d="M0,0 Q-12,-11 -24,0">
            <animate attributeName="d"
              values="M0,0 Q-12,-11 -24,0; M0,0 Q-12,9 -24,0; M0,0 Q-12,-11 -24,0"
              dur="0.68s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          </path>
          <path fill="none" stroke="#1a0800" strokeWidth="2.9" strokeLinecap="round" d="M0,0 Q12,-11 24,0">
            <animate attributeName="d"
              values="M0,0 Q12,-11 24,0; M0,0 Q12,9 24,0; M0,0 Q12,-11 24,0"
              dur="0.68s" repeatCount="indefinite" calcMode="spline"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          </path>
          <circle cx="0" cy="0" r="3" fill="#0e0400" />
        </g>

        {/* D-G: Loose trio — leader + 2 trailers at different heights, wave beat
               begin=-15s out of 26s → starts at 58% = just past centre */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="1000 175; -120 185" dur="26s" begin="-15s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="opacity" values="0;0.76;0.76;0.76;0"
            keyTimes="0;0.07;0.5;0.93;1" dur="26s" begin="-15s" repeatCount="indefinite" />
          {/* Lead */}
          <path fill="none" stroke="#1a0800" strokeWidth="2.5" strokeLinecap="round" d="M0,0 Q-10,-9 -20,0">
            <animate attributeName="d" values="M0,0 Q-10,-9 -20,0; M0,0 Q-10,7 -20,0; M0,0 Q-10,-9 -20,0" dur="0.55s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#1a0800" strokeWidth="2.5" strokeLinecap="round" d="M0,0 Q10,-9 20,0">
            <animate attributeName="d" values="M0,0 Q10,-9 20,0; M0,0 Q10,7 20,0; M0,0 Q10,-9 20,0" dur="0.55s" repeatCount="indefinite" />
          </path>
          <circle cx="0" cy="0" r="2.6" fill="#0e0400" />
          {/* Trailer 1 — behind and lower */}
          <path fill="none" stroke="#2d1200" strokeWidth="2.2" strokeLinecap="round" d="M-48,18 Q-57,10 -66,18">
            <animate attributeName="d" values="M-48,18 Q-57,10 -66,18; M-48,18 Q-57,25 -66,18; M-48,18 Q-57,10 -66,18" dur="0.55s" begin="0.18s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#2d1200" strokeWidth="2.2" strokeLinecap="round" d="M-66,18 Q-75,10 -84,18">
            <animate attributeName="d" values="M-66,18 Q-75,10 -84,18; M-66,18 Q-75,25 -84,18; M-66,18 Q-75,10 -84,18" dur="0.55s" begin="0.18s" repeatCount="indefinite" />
          </path>
          {/* Trailer 2 — behind lead but higher than trailer 1, different rhythm */}
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M-38,8 Q-46,1 -54,8">
            <animate attributeName="d" values="M-38,8 Q-46,1 -54,8; M-38,8 Q-46,15 -54,8; M-38,8 Q-46,1 -54,8" dur="0.55s" begin="0.36s" repeatCount="indefinite" />
          </path>
          <path fill="none" stroke="#3a1a04" strokeWidth="2" strokeLinecap="round" d="M-54,8 Q-62,1 -70,8">
            <animate attributeName="d" values="M-54,8 Q-62,1 -70,8; M-54,8 Q-62,15 -70,8; M-54,8 Q-62,1 -70,8" dur="0.55s" begin="0.36s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Decorative dots & top arc */}
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

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1000+',      label: 'Happy Customers' },
                { value: 'Since 2022', label: 'Trusted Brand'   },
                { value: 'Fast',       label: 'Delivery'        },
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