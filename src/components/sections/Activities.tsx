/**
 * src/components/sections/Activities.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Six activity cards arranged in a horizontal row.
 *
 * Desktop: 3-column grid
 * Tablet:  2-column grid
 * Mobile:  horizontal scroll row (snap)
 *
 * GSAP: each card slides in from the bottom with staggered delay as the
 * section enters the viewport. The stagger creates a wave-like arrival.
 *
 * Design: dark glassmorphism cards with a large Cormorant number,
 * activity name, short description, and a connecting dot-line on desktop.
 */

'use client'

import { useRef } from 'react'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

/* ── Activity SVG icons ───────────────────────────────────────────────── */
const IconSunrise = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <path d="M16 4v3M5.4 7.4l2.1 2.1M2 18h3M27 18h3M24.5 9.5l2.1-2.1"/>
    <path d="M7 18a9 9 0 0 1 18 0"/>
    <path d="M3 22h26"/>
  </svg>
)
const IconMeditate = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <circle cx="16" cy="6" r="2.5"/>
    <path d="M8 18c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    <path d="M5 22h22M11 22v2M21 22v2"/>
  </svg>
)
const IconWalk = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <circle cx="17" cy="4" r="2.5"/>
    <path d="M13 8l3 7-4 4M20 9l-2 6 4 8"/>
    <path d="M9 28l4-6M23 28l-3-5"/>
  </svg>
)
const IconFire = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <path d="M16 28c-5.5 0-9-3.5-9-9 0-4 2-7 5-9-0.5 2 0.5 4 2 5 0-3 2-6 5-8-1 3 0 5 2 6 1-1 2-3 2-5 3 2 4 6 4 10 0 5-3.5 10-11 10Z"/>
    <path d="M13 24a4 4 0 0 1 6 0"/>
  </svg>
)
const IconBird = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <path d="M4 12c3-4 7-6 12-5 5 1 8 5 10 9"/>
    <path d="M14 10c0 3-1 5-4 7"/>
    <path d="M4 12l4-2M24 18l4 2"/>
    <circle cx="10" cy="8" r="1"/>
  </svg>
)
const IconCamera = () => (
  <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-7 h-7">
    <path d="M28 24a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h3l2-3h10l2 3h3a2 2 0 0 1 2 2v12Z"/>
    <circle cx="16" cy="17" r="4"/>
  </svg>
)

const ACTIVITIES = [
  {
    Icon:  IconSunrise,
    name:  'Morning Yoga',
    time:  '6:00 AM',
    desc:  'Begin each day on the mat as the forest wakes. Led by an experienced teacher in the open air.',
  },
  {
    Icon:  IconMeditate,
    name:  'Meditation',
    time:  'Guided',
    desc:  'Silence sits differently in a forest. Daily guided sessions help you find it without effort.',
  },
  {
    Icon:  IconWalk,
    name:  'Nature Walk',
    time:  'Dawn & Dusk',
    desc:  'Walk the forest paths at the edge of Corbett — accompanied by a naturalist guide.',
  },
  {
    Icon:  IconFire,
    name:  'Bonfire Evening',
    time:  'Sunset',
    desc:  'Stories, chai, silence, and fire. The most honest end to a day in the wild.',
  },
  {
    Icon:  IconBird,
    name:  'Bird Watching',
    time:  'Early Morning',
    desc:  'Laldhang hosts over 200 species. Your mornings will never sound the same again.',
  },
  {
    Icon:  IconCamera,
    name:  'Photography',
    time:  'Golden Hour',
    desc:  'Golden light through sal canopy at dawn and dusk — a photographer\'s natural studio.',
  },
]

/* ── Activity card ────────────────────────────────────────────────────── */
function ActivityCard({ act, index }: { act: typeof ACTIVITIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 44,
      duration: 0.85,
      ease: 'power3.out',
      delay: index * 0.10,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <div
      ref={ref}
      /* mobile snap item */
      className="
        glass-card rounded-[4px] p-7 flex flex-col gap-5 shrink-0 w-[80vw] sm:w-auto
        transition-all duration-450 ease-luxury hover:-translate-y-2
      "
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        scrollSnapAlign: 'start',
        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.45s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow   = '0 16px 56px rgba(201,169,110,0.10)'
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow   = ''
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Index + icon row */}
      <div className="flex items-center justify-between">
        <span
          className="font-display font-light"
          style={{ color: 'rgba(201,169,110,0.30)', fontSize: '2.2rem', lineHeight: 1 }}
          aria-hidden
        >
          0{index + 1}
        </span>
        <span style={{ color: '#C9A96E' }}>
          <act.Icon />
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-display font-light text-pearl leading-tight"
        style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)' }}
      >
        {act.name}
      </h3>

      {/* Time badge */}
      <span
        className="self-start font-body text-[9px] tracking-luxury uppercase px-3 py-1 rounded-full"
        style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.18)', color: '#C9A96E' }}
      >
        {act.time}
      </span>

      {/* Divider */}
      <div className="h-px w-10" style={{ background: 'rgba(201,169,110,0.25)' }} aria-hidden />

      {/* Description */}
      <p className="font-body font-light text-ash text-[13px] leading-[1.78] flex-1">
        {act.desc}
      </p>
    </div>
  )
}

export default function Activities() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(headingRef.current, {
      opacity: 0, y: 30, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="activities"
      aria-label="Retreat activities"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{ background: '#111815' }}
    >
      {/* Subtle forest glow left-side */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(28,59,43,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <SectionTitle
            eyebrow="Daily Experiences"
            heading="Your days at the retreat."
            sub="No agenda — just a rhythm. Each day follows the light."
          />
        </div>

        {/*
          Mobile: horizontal scroll row with snap
          sm+:    2-column grid
          lg:     3-column grid
        */}
        <div
          className="
            flex gap-4 overflow-x-auto pb-4
            sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0
            lg:grid-cols-3
          "
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {ACTIVITIES.map((act, i) => (
            <ActivityCard key={act.name} act={act} index={i} />
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="sm:hidden font-body text-[10px] tracking-luxury uppercase text-pearl/20 text-center mt-5">
          Swipe to explore →
        </p>
      </div>
    </section>
  )
}
