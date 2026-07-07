/**
 * src/components/sections/AboutRetreats.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Cinematic split-layout about section.
 *
 * Desktop:
 *   LEFT  50%  — /gate.jpeg with GSAP scroll parallax (image drifts -12% Y)
 *   RIGHT 50%  — eyebrow · heading · description · 4 feature cards (2×2 grid)
 *
 * Mobile: stacked (image above, text below)
 *
 * GSAP animations:
 *   • Image: clip-path reveal bottom-to-top on scroll enter
 *   • Image: slow vertical parallax (scrub) while scrolling through section
 *   • Right text block: fade-up on scroll
 *   • Feature cards: staggered fade-up with 0.1s between each
 */

'use client'

import { useRef } from 'react'
import Image       from 'next/image'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Inline SVG icons — single-stroke, gold-coloured ─────────────────── */
const IconStay = () => (
  <svg aria-hidden viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M4 22V12L14 4l10 8v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/>
    <path d="M10 22v-6h8v6"/>
  </svg>
)
const IconYoga = () => (
  <svg aria-hidden viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="14" cy="5" r="2"/>
    <path d="M14 8v6l-4 4M14 14l4 4M10 22h8M6 14l4-2M22 14l-4-2"/>
  </svg>
)
const IconFood = () => (
  <svg aria-hidden viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12 2a7 7 0 0 0 0 14M12 16v8M8 24h8"/>
    <path d="M20 2v6a2 2 0 0 1-2 2h-1"/>
    <path d="M20 8v16"/>
  </svg>
)
const IconJungle = () => (
  <svg aria-hidden viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M14 22V10"/>
    <path d="M14 10c0 0-5-2-6-7 3 0 5 1 6 3 1-2 3-3 6-3-1 5-6 7-6 7Z"/>
    <path d="M10 22h8"/>
    <path d="M7 17c-2-1-4-3-4-6 2 0 4 1 5 2"/>
    <path d="M21 17c2-1 4-3 4-6-2 0-4 1-5 2"/>
  </svg>
)

const FEATURES = [
  {
    Icon: IconStay,
    title: 'Peaceful Stay',
    desc:  'A private cottage immersed in forest — built for silence and morning birdsong.',
  },
  {
    Icon: IconYoga,
    title: 'Daily Yoga',
    desc:  'Sunrise and golden-hour sessions guided by experienced practitioners.',
  },
  {
    Icon: IconFood,
    title: 'Organic Food',
    desc:  'Farm-fresh Uttarakhand cuisine — harvested within miles of your plate.',
  },
  {
    Icon: IconJungle,
    title: 'Jungle Experience',
    desc:  'Guided walks through sal forests at the edge of Corbett Tiger Reserve.',
  },
]

export default function AboutRetreats() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null) // overflow-hidden clip
  const imageRef    = useRef<HTMLDivElement>(null)  // moves for parallax
  const textRef     = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* ── Image: clip-path reveal (bottom→top) ─────────────────── */
    gsap.from(imageWrapRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.4,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: imageWrapRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })

    /* ── Image: vertical parallax while section is in view ────── */
    gsap.to(imageRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    /* ── Right text block: fade-up ────────────────────────────── */
    gsap.from(textRef.current, {
      opacity: 0,
      y: 36,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })

    /* ── Feature cards: staggered ─────────────────────────────── */
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Tiger Yoga Dhyan Kendra"
      className="relative overflow-hidden"
      style={{ background: '#0B0F0C' }}
    >
      <div className="grid md:grid-cols-2 md:min-h-0">

        {/* ── LEFT: full-height image ─────────────────────────── */}
        <div
          ref={imageWrapRef}
          className="img-reveal-wrap relative h-64 sm:h-80 md:h-auto md:min-h-[680px] overflow-hidden"
        >
          <div ref={imageRef} className="absolute inset-[-8%]">
            <Image
              src="/gate.jpeg"
              alt="Entrance to Tiger Yoga Dhyan Kendra"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={e => { (e.currentTarget as HTMLImageElement).src = '/cottage-1.jpeg' }}
            />
            {/* Subtle right-edge gradient so image dissolves into the text column */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, transparent 55%, rgba(11,15,12,0.7) 100%)',
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* ── RIGHT: text + cards ─────────────────────────────── */}
        <div className="flex items-center py-20 sm:py-28 md:py-32">
          <div
            ref={textRef}
            className="section-container md:pl-14 lg:pl-20 md:pr-8"
            style={{ maxWidth: '100%' }}
          >
            {/* Eyebrow */}
            <p
              className="font-body text-[10px] tracking-luxury uppercase mb-4"
              style={{ color: '#C9A96E' }}
            >
              About the Retreat
            </p>

            {/* Heading */}
            <h2
              className="font-display font-light text-pearl leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Experience Mindfulness in the Heart of Nature
            </h2>

            {/* Gold divider */}
            <div className="gold-line mb-6" aria-hidden />

            {/* Description */}
            <p className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.82] mb-10 max-w-[500px]">
              Tiger Yoga Dhyan Kendra is a sanctuary of quiet power, set among
              the sal forests and paddy fields of Laldhang, Uttarakhand — at
              the very edge of Jim Corbett National Park. We believe the
              deepest healing comes not from a spa, but from standing barefoot
              in forest soil at dawn, breathing air that hasn&apos;t been filtered
              by a city.
            </p>

            {/* 4 Feature cards — 2×2 grid */}
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {FEATURES.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-card rounded-[3px] p-5 sm:p-6 group
                    transition-all duration-400 ease-luxury
                    hover:-translate-y-1
                    hover:border-gold-DEFAULT/20"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.4s ease',
                  }}
                >
                  <span
                    className="block mb-4 transition-colors duration-300"
                    style={{ color: '#C9A96E' }}
                  >
                    <Icon />
                  </span>
                  <h3
                    className="font-display font-light text-pearl mb-2 leading-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
                  >
                    {title}
                  </h3>
                  <p className="font-body font-light text-ash text-[12px] sm:text-[13px] leading-[1.70]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
