/**
 * src/components/sections/Hero.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen premium luxury hero.
 *
 * IMAGE   /cottage-1.jpeg — object-cover, fills 100 % of viewport.
 *         Parallax container moves ±18 px on mouse; content ±6 px opposite.
 *
 * OVERLAYS (bottom → top)
 *   1. Base dark tint            rgba(10,15,12,0.55)
 *   2. Left-heavy gradient       heavy left → transparent right  (text contrast)
 *   3. Bottom gradient           near-black bottom → transparent mid
 *   4. Top gradient              semi-dark top → transparent (navbar contrast)
 *   5. Gold glow                 warm radial centred right-of-centre
 *   6. Green forest tint         multiply blend, very low opacity
 *
 * CONTENT — left-aligned, vertically centred
 *   Eyebrow → H1 line 1 → H1 line 2 (italic gold) → Tagline →
 *   Divider → Subtitle → CTA buttons → Footnote
 *
 * GSAP SEQUENCE (delay 0.4 s)
 *   t=0.00  Image: scale 1.07 → 1.0  cinematic pull-back
 *   t=0.50  Eyebrow fades up
 *   t=0.90  "Tiger Yoga" slides up
 *   t=1.06  "Dhyan Kendra" slides up
 *   t=1.55  Tagline fades up
 *   t=1.68  Gold divider grows left → right
 *   t=1.82  Subtitle fades up
 *   t=2.00  Buttons stagger in
 *   t=2.30  Footnote fades in
 *   Scroll  Content drifts up (scrub parallax)
 */

'use client'

import { useRef, useEffect } from 'react'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleCanvas  from '@/components/ui/ParticleCanvas'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const line1Ref    = useRef<HTMLSpanElement>(null)
  const line2Ref    = useRef<HTMLSpanElement>(null)
  const taglineRef   = useRef<HTMLDivElement>(null)
  const dividerRef   = useRef<HTMLDivElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const btnsRef      = useRef<HTMLDivElement>(null)
  const footnoteRef  = useRef<HTMLParagraphElement>(null)

  /* ── Mouse parallax ──────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    let mx = 0, my = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth  - 0.5
      my = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      if (imageRef.current)
        gsap.to(imageRef.current,  { x: -mx * 18, y: -my * 10, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
      if (contentRef.current)
        gsap.to(contentRef.current, { x:  mx * 6,  y:  my *  4, duration: 1.8, ease: 'power2.out', overwrite: 'auto' })
      rafId = requestAnimationFrame(tick)
    }
    section.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      section.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── GSAP entry timeline ─────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    /* Image: cinematic scale pull-back */
    tl.from(imageRef.current, {
      scale: 1.07, duration: 2.8, ease: 'power1.inOut',
    }, 0)

    /* Eyebrow */
    tl.from(eyebrowRef.current, {
      opacity: 0, y: 22, duration: 0.9, ease: 'power2.out',
    }, 0.5)

    /* H1 Line 1 */
    tl.from(line1Ref.current, {
      opacity: 0, y: 55, duration: 0.85, ease: 'power3.out',
    }, 0.9)

    /* H1 Line 2 */
    tl.from(line2Ref.current, {
      opacity: 0, y: 55, duration: 0.85, ease: 'power3.out',
    }, 1.06)

    /* Tagline */
    tl.from(taglineRef.current, {
      opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
    }, 1.55)

    /* Divider grows left → right */
    tl.from(dividerRef.current, {
      scaleX: 0, duration: 0.85, ease: 'power2.inOut',
    }, 1.68)

    /* Subtitle */
    tl.from(subtitleRef.current, {
      opacity: 0, y: 18, duration: 0.75, ease: 'power2.out',
    }, 1.82)

    /* Buttons stagger */
    if (btnsRef.current?.children?.length) {
      tl.from(Array.from(btnsRef.current.children), {
        opacity: 0, y: 14, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      }, 2.0)
    }

    /* Footnote */
    tl.from(footnoteRef.current, {
      opacity: 0, duration: 0.5,
    }, 2.3)

    /* Scroll: content drifts up as hero exits viewport */
    gsap.to(contentRef.current, {
      y: -60, opacity: 0.1, ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '60% top',
        scrub: 1,
      },
    })
  }, { scope: sectionRef })

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Tiger Yoga Dhyan Kendra — Hero"
      className="relative w-full overflow-hidden h-[100svh] min-h-[420px] sm:min-h-[520px] md:min-h-[600px]"
        style={{ background: '#0A0F0C' }}
    >

      {/* ══════════════════════════════════════════════════════════
          LAYER 0 — Background image (object-cover, full screen)
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cottage-1.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
            onError={e => { const img = e.currentTarget; img.onerror = null; img.src = '/cottage-2.jpeg' }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — Cinematic colour grade & overlays
          ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>

        {/* 1a. Base dark tint */}
        <div className="absolute inset-0"
          style={{ background: 'rgba(10,15,12,0.55)' }} />

        {/* 1b. Left-heavy gradient — heavy contrast behind text */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(108deg, rgba(10,15,12,0.90) 0%, rgba(10,15,12,0.68) 32%, rgba(10,15,12,0.32) 58%, rgba(10,15,12,0.08) 100%)' }} />

        {/* 1c. Bottom fade — grounds the layout */}
        <div className="absolute inset-x-0 bottom-0"
          style={{ height: '65%', background: 'linear-gradient(to top, rgba(10,15,12,0.98) 0%, rgba(10,15,12,0.65) 28%, rgba(10,15,12,0.20) 58%, transparent 100%)' }} />

        {/* 1d. Top fade — navbar readability */}
        <div className="absolute inset-x-0 top-0 h-44"
          style={{ background: 'linear-gradient(to bottom, rgba(10,15,12,0.82) 0%, rgba(10,15,12,0.28) 60%, transparent 100%)' }} />

        {/* 1e. Warm gold glow — centres slightly right of text */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 62% 44%, rgba(201,169,110,0.07) 0%, transparent 65%)' }} />

        {/* 1f. Forest green tint */}
        <div className="absolute inset-0"
          style={{ background: 'rgba(15,42,20,0.12)', mixBlendMode: 'multiply' }} />

      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2 — Atmospheric fog
          ══════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-0 hero-fog"
        style={{
          background: 'linear-gradient(to top, rgba(212,220,208,0.12) 0%, rgba(212,220,208,0.04) 40%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          LAYER 3 — Warm dust particles
          ══════════════════════════════════════════════════════════ */}
      <ParticleCanvas />

      {/* ══════════════════════════════════════════════════════════
          LAYER 4 — Left-aligned hero content, vertically centred
          ══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-10 flex items-center"
        role="region"
        aria-label="Hero content"
      >
        <div
          ref={contentRef}
          className="will-change-transform w-full max-w-[780px] px-4 sm:px-6 md:px-10 text-center sm:text-left"
        >

          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="font-body tracking-luxury uppercase mb-5 sm:mb-6"
            style={{ color: '#C9A96E', fontSize: '9.5px', letterSpacing: '0.22em' }}
          >
            Laldhang&nbsp;&nbsp;·&nbsp;&nbsp;Uttarakhand&nbsp;&nbsp;·&nbsp;&nbsp;Himalayan Foothills
          </p>

          {/* Headline — two separate lines for individual GSAP control */}
          <h1
            className="mb-5 sm:mb-7"
            aria-label="Tiger Yoga Dhyan Kendra"
          >
            <span
              ref={line1Ref}
              className="block font-display font-light text-pearl overflow-hidden"
              style={{
                fontSize: 'clamp(2.6rem, 8.5vw, 6.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
              }}
            >
              Tiger Yoga
            </span>
            <span
              ref={line2Ref}
              className="block font-display italic font-light overflow-hidden"
              style={{
                fontSize: 'clamp(2.6rem, 8.5vw, 6.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.01em',
                color: '#F0DCAA',
                marginTop: '-0.04em',
              }}
            >
              Dhyan Kendra
            </span>
          </h1>

          {/* Tagline: STAY · YOGA · NATURE */}
          <div
            ref={taglineRef}
            className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
            aria-label="Stay, Yoga, Nature"
          >
            {['Stay', 'Yoga', 'Nature'].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3 sm:gap-4">
                <span
                  className="font-body uppercase text-pearl/70"
                  style={{ fontSize: '10.5px', letterSpacing: '0.18em' }}
                >
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span
                    className="rounded-full shrink-0"
                    style={{ width: '3px', height: '3px', background: '#C9A96E' }}
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>

          {/* Gold divider — grows from left */}
          <div
            ref={dividerRef}
            aria-hidden
            style={{
              width: '3.5rem',
              height: '1px',
              background: 'linear-gradient(90deg, #C9A96E 0%, rgba(201,169,110,0.18) 100%)',
              transformOrigin: 'left center',
              marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body font-light text-ash leading-relaxed mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', maxWidth: '400px', lineHeight: '1.75' }}
          >
            Find Peace in the Heart of Nature.
          </p>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Primary — gold */}
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-[2px] font-body tracking-luxury uppercase font-semibold text-void btn-gold transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 px-4 py-3 sm:px-9 sm:py-4"
              style={{ fontSize: '10px' }}
            >
              Book Your Stay
            </a>
            {/* Secondary — ghost */}
            <a
              href="#packages"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[2px] font-body tracking-luxury uppercase font-medium text-pearl/75 hover:text-pearl transition-all duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 px-4 py-3 sm:px-9 sm:py-4"
              style={{
                fontSize: '10px',
                border: '1px solid rgba(248,244,238,0.28)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(248,244,238,0.58)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(248,244,238,0.28)')}
            >
              <span>Explore Retreat</span>
              <span
                className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                aria-hidden
              >→</span>
            </a>
          </div>

          {/* Footnote */}
          <p
            ref={footnoteRef}
            className="font-body tracking-luxury uppercase text-center sm:text-left"
            style={{ fontSize: '8.5px', color: 'rgba(248,244,238,0.20)', letterSpacing: '0.20em' }}
          >
            At the edge of Corbett Tiger Reserve&nbsp;·&nbsp;Laldhang, Uttarakhand
          </p>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 5 — Scroll indicator
          ══════════════════════════════════════════════════ */}
      <ScrollIndicator />

    </section>
  )
}
