/**
 * src/components/sections/FoodExperience.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "Farm to Table Dining" — the food philosophy section.
 *
 * Layout:
 *   Full-width background: farm.jpeg with dark cinematic overlay
 *   Left-aligned content column (max 560px):
 *     · eyebrow
 *     · headline: "Farm to Table Dining"
 *     · gold divider
 *     · 4 feature rows with gold dot + text
 *     · description paragraph
 *     · "Book Your Retreat" CTA button
 *
 * The full-bleed image makes this section feel immersive —
 * like stepping into the farm itself.
 *
 * GSAP: text content slides up from below on scroll enter.
 *       Image slow-zoom parallax while section is visible.
 */

'use client'

import { useRef } from 'react'
import Image       from 'next/image'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOOD_FEATURES = [
  { label: 'Fresh local ingredients sourced from Laldhang villages' },
  { label: 'Seasonal organic vegetables from our own kitchen garden' },
  { label: 'Traditional Uttarakhand cuisine — bhaang ki chutney, kafuli, aloo ke gutke' },
  { label: 'Three nourishing meals a day, prepared with forest herbs' },
]

export default function FoodExperience() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* Image: slow vertical parallax (scrub) */
    gsap.to(imageRef.current, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    /* Content: staggered fade-up */
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 34,
        duration: 0.85,
        stagger: 0.10,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="food"
      aria-label="Farm to Table Dining"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: '#0B0F0C' }}
    >
      {/* ── Full-bleed background image ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div ref={imageRef} className="absolute inset-[-8%]">
          <Image
            src="/farm.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            onError={e => { (e.currentTarget as HTMLImageElement).src = '/gate.jpeg' }}
          />
        </div>

        {/* Multi-layer darkening so text stays legible over any image */}
        {/* Left-side gradient — content lives here */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(11,15,12,0.92) 0%, rgba(11,15,12,0.75) 45%, rgba(11,15,12,0.35) 70%, rgba(11,15,12,0.10) 100%)',
          }}
        />
        {/* Overall tint */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(11,15,12,0.30)' }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 section-container py-24 sm:py-32 md:py-40 w-full">
        <div
          ref={contentRef}
          className="flex flex-col gap-6 max-w-[540px]"
        >
          {/* Eyebrow */}
          <p
            className="font-body text-[10px] tracking-luxury uppercase"
            style={{ color: '#C9A96E' }}
          >
            Dining Experience
          </p>

          {/* Headline */}
          <h2
            className="font-display font-light text-pearl leading-[1.06]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Farm to Table
            <br />
            <span className="font-normal italic" style={{ color: '#E8C87A' }}>Dining</span>
          </h2>

          {/* Gold divider */}
          <div className="gold-line" aria-hidden />

          {/* Feature list */}
          <ul className="flex flex-col gap-4" role="list">
            {FOOD_FEATURES.map((f, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: '#C9A96E' }}
                  aria-hidden
                />
                <span className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.72]">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Description */}
          <p className="font-body font-light text-ash/80 text-[13px] sm:text-[14px] leading-[1.82]">
            Every ingredient is sourced within a few kilometres. Our cook — a Garhwali woman
            who has cooked with mountain herbs for forty years — prepares food that tastes
            like the forest it came from. Eating here is part of the retreat.
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="
              self-start inline-flex items-center gap-3
              rounded-[2px] px-8 py-4
              font-body text-[10px] tracking-luxury uppercase font-medium
              btn-gold mt-2
              transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
            "
          >
            Book Your Retreat
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Bottom fade — blends into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0B0F0C 0%, transparent 100%)' }}
      />
    </section>
  )
}
