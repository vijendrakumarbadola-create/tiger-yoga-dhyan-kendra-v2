/**
 * src/components/sections/Packages.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Three retreat packages in glass-morphism cards.
 * The middle "Forest Immersion" card is the featured/recommended option.
 *
 * Cards reveal with staggered slide-up on scroll.
 */

'use client'

import { useRef } from 'react'
import { gsap }   from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

interface Package {
  name:     string
  nights:   number
  price:    string
  per:      string
  tag?:     string          // "Most popular" badge
  features: string[]
  featured: boolean
}

const PACKAGES: Package[] = [
  {
    name:    'Weekend Escape',
    nights:  2,
    price:   '₹11,999',
    per:     'for 2 Persons',
    features: [
      'Private Cooler Cottage',
      'Private cottage, 2 nights',
      'Daily sunrise yoga',
      'Forest walk at dawn',
      'Organic breakfast & dinner',
      'Bonfire evening',
      'Rajaji National Park Visit',
    ],
    featured: false,
  },
  {
    name:    'Forest Immersion',
    nights:  5,
    price:   '₹22,999',
    per:     'for 2 Persons',
    tag:     'Most popular',
    features: [
      'Private Cooler Cottage',
      'Private cottage, 5 nights',
      'Daily sunrise yoga + meditation',
      'Guided forest & village walks',
      'All organic meals included',
      'Bonfire ceremony',
      'Rajaji National Park Visit',
      'Ayurvedic herbal sessions',
      'Personalised wellness plan',
    ],
    featured: true,
  },
  {
    name:    'Complete Sanctuary',
    nights:  7,
    price:   '₹30,999',
    per:     'for 2 Persons',
    features: [
      'Private Cooler Cottage',
      'Private cottage, 7 nights',
      'Twice-daily yoga & meditation',
      'Jungle safari (full day)',
      'All meals + evening snacks',
      'Riverside sit & sound bath',
      'Rajaji National Park Visit',
      'Ayurvedic & wellness therapy',
      'Personalised retreat journal',
      'Farewell fire ceremony',
    ],
    featured: false,
  },
]

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0, y: 40,
      duration: 0.85, ease: 'power2.out',
      delay: index * 0.12,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className={`
        relative flex flex-col rounded-[4px] overflow-hidden
        transition-transform duration-400 ease-luxury hover:-translate-y-1
        ${pkg.featured ? 'glass-card-gold' : 'glass-card'}
      `}
    >
      {/* Featured badge */}
      {pkg.tag && (
        <div
          className="absolute top-5 right-5 font-body text-[9px] tracking-luxury uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(201,169,110,0.15)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.30)' }}
        >
          {pkg.tag}
        </div>
      )}

      {/* Card header */}
      <div className="px-7 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="font-body text-[10px] tracking-luxury uppercase mb-2 text-pearl/40">
          {pkg.nights} nights
        </p>
        <h3 className="font-display font-light text-pearl mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)' }}>
          {pkg.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-light" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', color: pkg.featured ? '#C9A96E' : '#F8F4EE' }}>
            {pkg.price}
          </span>
          <span className="font-body text-[11px] text-pearl/40">{pkg.per}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 px-7 py-6 flex-1">
        {pkg.features.map(f => (
          <li key={f} className="flex items-start gap-3">
            <span
              className="mt-1 w-1 h-1 rounded-full shrink-0"
              style={{ background: '#C9A96E' }}
              aria-hidden
            />
            <span className="font-body font-light text-[13px] text-pearl/70 leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-7 pb-7 pt-3">
        <a
          href="#contact"
          className={`
            block w-full text-center rounded-[2px] px-6 py-3.5
            font-body text-[10px] tracking-luxury uppercase font-medium
            transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
            ${pkg.featured
              ? 'btn-gold'
              : 'border text-pearl/70 hover:text-pearl border-pearl/15 hover:border-pearl/40'
            }
          `}
        >
          Book {pkg.name}
        </a>
      </div>
    </div>
  )
}

export default function Packages() {
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
      id="packages"
      aria-label="Retreat packages"
      className="relative py-24 sm:py-32 md:py-40"
      style={{ background: '#0B0F0C' }}
    >
      {/* Background forest green glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(28,59,43,0.10) 0%, transparent 70%)', filter: 'blur(100px)' }}
      />

      <div className="section-container relative z-10">
        <div ref={headingRef} className="mb-14 sm:mb-18">
          <SectionTitle
            eyebrow="Retreat Packages"
            heading="Choose your practice."
            sub="Every package includes private cottage accommodation, guided yoga, and three organic meals a day."
            align="center"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 items-start">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Fine print */}
        <p className="font-body text-[11px] text-pearl/25 text-center mt-10">
          All packages subject to availability. Rates for single occupancy.
          Group and couple rates on request.
        </p>
      </div>
    </section>
  )
}
