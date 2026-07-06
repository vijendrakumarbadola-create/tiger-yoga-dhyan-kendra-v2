/**
 * src/components/layout/Navbar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium fixed glass navbar — stays on ONE LINE on desktop at all times.
 *
 * LAYOUT STRATEGY
 *   Flex row with three zones:
 *     [Logo — shrink-0]  [Nav — flex-1 centered]  [Book Now + Hamburger — ml-auto]
 *
 *   The nav uses `absolute left-0 right-0 justify-center` so it is ALWAYS
 *   centred in the header container, regardless of logo/button widths.
 *   `pointer-events-none` on the absolute wrapper, restored on the inner
 *   link group — so logo and Book Now remain clickable underneath.
 *
 * SCROLL STATES
 *   transparent (top)   → h-20 md:h-[84px]  no background
 *   glass (scrolled)    → h-16              dark blur background
 *
 * RESPONSIVE
 *   lg+ (≥1024px)  full desktop layout
 *   <lg            logo + hamburger, full-screen overlay menu
 *
 * ITEMS: About · Packages · Cottages · Gallery · Food · Activities · Contact
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useScrolled } from '@/hooks/useScrolled'

/* ── Navigation items ────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Packages',   href: '#packages' },
  { label: 'Cottages',   href: '#stay' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Food',       href: '#food' },
  { label: 'Activities', href: '#activities' },
  { label: 'Contact',    href: '#contact' },
]

/* ── NavLink atom ────────────────────────────────────────────────── */
function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative group whitespace-nowrap text-pearl/65 hover:text-pearl transition-colors duration-300"
      style={{ fontFamily: 'var(--font-inter)', fontSize: '10.5px', letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 400 }}
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
        style={{ background: '#C9A96E' }}
        aria-hidden
      />
    </a>
  )
}

const WHATSAPP_BOOK_URL = 'https://wa.me/917895428914?text=Hello%2C%20I%20want%20to%20book%20a%20stay%20at%20Tiger%20Yoga%20Dhyan%20Kendra%2C%20Jageetpur.%20Please%20share%20availability%2C%20prices%2C%20and%20booking%20details.'

/* ── Book Now button ─────────────────────────────────────────────── */
function BookBtn({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={WHATSAPP_BOOK_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center justify-center rounded-[2px] font-body uppercase font-semibold text-void btn-gold transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        fontSize: compact ? '9px' : '9.5px',
        letterSpacing: '0.18em',
        padding: compact ? '7px 14px' : '9px 20px',
        whiteSpace: 'nowrap',
      }}
    >
      Book Now
    </a>
  )
}

/* ── Main Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const { scrolled } = useScrolled(80)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Desktop / tablet header ──────────────────────────── */}
      <header
        ref={headerRef}
        role="banner"
        className="fixed inset-x-0 top-0 z-[9999] navbar-glass border-b border-white/10 transition-all duration-500 ease-in-out"
        style={{ height: scrolled ? '64px' : 'clamp(72px, 9vw, 84px)', opacity: 1 }}
      >
        {/*
          Inner container: relative so the absolutely-centred nav
          is positioned relative to this box.
        */}
        <div
          className="relative flex items-center h-full w-full mx-auto px-4 sm:px-6 md:px-10"
          style={{ maxWidth: '1600px' }}
        >

          {/* ── LOGO — left ──────────────────────────────────── */}
          <a href="#hero" aria-label="Tiger Yoga Dhyan Kendra — Home" className="shrink-0 z-10">
            <Image
              src="/logo.png"
              alt="Tiger Yoga Dhyan Kendra"
              width={180}
              height={72}
              priority
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-8' : 'h-9 sm:h-10 md:h-11'}`}
            />
          </a>

          {/* ── NAV — absolutely centred in the header ────────── */}
          {/*
            `absolute left-0 right-0` spans the full header width.
            `justify-center` centres the link group within that span.
            `pointer-events-none` lets clicks reach logo/button underneath.
            Inner div restores `pointer-events-auto` for the links.
          */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="absolute left-0 right-0 hidden lg:flex justify-center items-center pointer-events-none"
            style={{ height: '100%' }}
          >
            <div
              className="flex items-center pointer-events-auto"
              style={{ gap: 'clamp(1.2rem, 2.2vw, 2rem)' }}
            >
              {NAV_LINKS.map(l => (
                <NavLink key={l.label} label={l.label} href={l.href} />
              ))}
            </div>
          </nav>

          {/* ── RIGHT: Book Now + Hamburger ──────────────────── */}
          <div className="ml-auto shrink-0 z-10 flex items-center gap-3">
<div>
              <BookBtn compact={scrolled} />
            </div>

            {/* Hamburger — shown below lg */}
            <button
              className="lg:hidden flex flex-col justify-center items-center"
              style={{ width: '36px', height: '36px', gap: '5px' }}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              onClick={() => setOpen(v => !v)}
            >
              <span
                className="block bg-pearl transition-all duration-300 origin-center"
                style={{
                  width: '22px', height: '1px',
                  transform: open ? 'rotate(45deg) translateY(6px)' : 'none',
                }}
              />
              <span
                className="block bg-pearl transition-all duration-300"
                style={{
                  width: open ? '0' : '14px', height: '1px', opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block bg-pearl transition-all duration-300 origin-center"
                style={{
                  width: '22px', height: '1px',
                  transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none',
                }}
              />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ─────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{   opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(10,15,12,0.97)', backdropFilter: 'blur(24px)' }}
          >
            {/* Space for the header */}
            <div style={{ height: 'clamp(72px, 9vw, 84px)', flexShrink: 0 }} />

            {/* Thin gold rule */}
            <div
              className="mx-6 sm:mx-10"
              style={{ height: '1px', background: 'rgba(201,169,110,0.20)', flexShrink: 0 }}
            />

            {/* Links */}
            <nav
              className="flex flex-col overflow-y-auto"
              style={{ padding: '2rem 1.5rem 0', gap: 0 }}
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: -16 }}
                  transition={{ delay: 0.07 + i * 0.055, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display font-light text-pearl/80 hover:text-pearl transition-colors duration-200 border-b"
                  style={{
                    fontSize: 'clamp(1.9rem, 9vw, 3.2rem)',
                    padding: '0.65rem 0',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom: Book Now + location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
              style={{ padding: '2rem 1.5rem 2.5rem', flexShrink: 0 }}
            >
              <div style={{ height: '1px', width: '3rem', background: 'rgba(201,169,110,0.35)', marginBottom: '1.25rem' }} />
              <BookBtn />
              <p
                className="font-body uppercase text-pearl/25"
                style={{ fontSize: '9px', letterSpacing: '0.22em', marginTop: '1rem' }}
              >
                Laldhang · Uttarakhand · India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
