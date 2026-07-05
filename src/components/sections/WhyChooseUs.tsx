/**
 * src/components/sections/WhyChooseUs.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Six-card glassmorphism grid answering "Why Tiger Yoga Dhyan Kendra?"
 *
 * Desktop: 3×2 grid
 * Tablet:  2×3 grid
 * Mobile:  1×6 grid
 *
 * Cards:
 *   • Glass background + subtle border
 *   • Single-stroke SVG icon in gold
 *   • Cormorant Garamond title
 *   • Inter body description
 *   • Hover: lift (-8px) + gold box-shadow glow
 *   • Staggered scroll-triggered reveal (GSAP)
 */

'use client'

import { useRef } from 'react'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

/* ── SVG icon set ─────────────────────────────────────────────────────── */
const IconNature = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M16 28V14"/>
    <path d="M16 14C16 14 9 11 8 4c3.5.5 6 2 8 5 2-3 4.5-4.5 8-5-1 7-8 10-8 10Z"/>
    <path d="M11 24c-3-1.5-5-4-5-7 2.5.5 4.5 2 5.5 3.5"/>
    <path d="M21 24c3-1.5 5-4 5-7-2.5.5-4.5 2-5.5 3.5"/>
  </svg>
)
const IconMeditation = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="16" cy="6" r="2.5"/>
    <path d="M16 9v5"/>
    <path d="M8 16a8 8 0 0 0 8 5 8 8 0 0 0 8-5"/>
    <path d="M10 21c-2 0-4 1-4 3h20c0-2-2-3-4-3"/>
    <path d="M9 16h14"/>
  </svg>
)
const IconYogaPose = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="16" cy="5" r="2.5"/>
    <path d="M16 8v7"/>
    <path d="M16 15l-6 5M16 15l6 5"/>
    <path d="M10 20l-3 5M22 20l3 5"/>
    <path d="M13 28h6"/>
  </svg>
)
const IconCottage = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M4 26V14L16 4l12 10v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
    <path d="M12 26v-8h8v8"/>
    <path d="M16 4v22"/>
  </svg>
)
const IconAdventure = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M2 26l8-14 6 8 5-7 9 13H2Z"/>
    <path d="M22 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
    <path d="M28 4l-3 3"/>
  </svg>
)
const IconHealth = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M16 28C16 28 4 20 4 12a6 6 0 0 1 12-0c0-3.3 2.7-6 6-6a6 6 0 0 1 6 6c0 8-12 16-12 16Z"/>
    <path d="M16 11v6M13 14h6"/>
  </svg>
)

const CARDS = [
  {
    Icon:  IconNature,
    title: 'Pure Nature',
    desc:  'Surrounded by sal forests and the Kosi River — wildlife, birdsong, and clean mountain air every morning.',
  },
  {
    Icon:  IconMeditation,
    title: 'Deep Meditation',
    desc:  'Guided sessions in stillness — learn to quiet the mind in an environment built for inner listening.',
  },
  {
    Icon:  IconYogaPose,
    title: 'Authentic Yoga',
    desc:  'Traditional practice adapted to every body — from first-timers to advanced students of the self.',
  },
  {
    Icon:  IconCottage,
    title: 'Luxury Cottage',
    desc:  'A private cottage designed for deep rest — not a hotel room, but a home in the forest.',
  },
  {
    Icon:  IconAdventure,
    title: 'Wild Adventure',
    desc:  'Jungle walks, Corbett safaris, river mornings, village visits — the world beyond the mat awaits.',
  },
  {
    Icon:  IconHealth,
    title: 'Healthy Living',
    desc:  'Organic meals, clean air, digital rest, and rhythms aligned with sunrise and sunset.',
  },
]

/* ── Individual card ─────────────────────────────────────────────────── */
function WhyCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 38,
      duration: 0.80,
      ease: 'power2.out',
      delay: index * 0.085,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 87%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className="glass-card rounded-[4px] p-7 sm:p-8 flex flex-col gap-5 cursor-default"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s ease, border-color 0.45s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform    = 'translateY(-8px)'
        el.style.boxShadow    = '0 12px 48px rgba(201,169,110,0.12), 0 0 0 1px rgba(201,169,110,0.14)'
        el.style.borderColor  = 'rgba(201,169,110,0.18)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform    = ''
        el.style.boxShadow    = ''
        el.style.borderColor  = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* Icon */}
      <span style={{ color: '#C9A96E' }}>
        <card.Icon />
      </span>

      {/* Title */}
      <h3
        className="font-display font-light text-pearl leading-tight"
        style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)' }}
      >
        {card.title}
      </h3>

      {/* Micro divider */}
      <div className="w-8 h-px" style={{ background: 'rgba(201,169,110,0.35)' }} aria-hidden />

      {/* Description */}
      <p className="font-body font-light text-ash text-[13px] sm:text-[14px] leading-[1.78] flex-1">
        {card.desc}
      </p>
    </div>
  )
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 30,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      aria-label="Why choose Tiger Yoga Dhyan Kendra"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{ background: '#111815' }}
    >
      {/* Ambient forest-green glow — centred, very subtle */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(28,59,43,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-14 sm:mb-18">
          <SectionTitle
            eyebrow="Why Choose Us"
            heading="Where luxury meets nature."
            sub="Six reasons guests return to Tiger Yoga Dhyan Kendra year after year."
            align="center"
          />
        </div>

        {/* 3-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CARDS.map((card, i) => (
            <WhyCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
