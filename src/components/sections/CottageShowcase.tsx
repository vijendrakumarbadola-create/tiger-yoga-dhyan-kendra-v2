/**
 * src/components/sections/CottageShowcase.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two alternating showcase blocks, each occupying the full viewport width.
 *
 * Block 1 — IMAGE LEFT   / TEXT RIGHT  — cottage-1.jpeg
 * Block 2 — TEXT LEFT    / IMAGE RIGHT — cottage-2.jpeg
 *
 * Each block:
 *   Image: hover scale(1.04), clip-path reveal on scroll enter
 *   Text:  eyebrow · title · feature tags · description · "Explore Stay" button
 *
 * Design intent:
 *   Breathing alternate rhythm — like turning pages of a luxury hotel catalogue.
 *   No borders between blocks; the background and image edges create separation.
 */

'use client'

import { useRef } from 'react'
import Image       from 'next/image'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Showcase {
  image:    string
  fallback: string
  alt:      string
  eyebrow:  string
  title:    string
  subtitle: string
  tags:     string[]
  desc:     string
  reversed: boolean  // true = image on RIGHT
}

const SHOWCASES: Showcase[] = [
  {
    image:    '/cottage-1.jpeg',
    fallback: '/cottage-2.jpeg',
    alt:      'Luxury cottage exterior at Tiger Yoga Dhyan Kendra',
    eyebrow:  'Private Accommodation',
    title:    'Luxury Cottage',
    subtitle: 'Your forest sanctuary',
    tags:     ['Private Stay', 'Beautiful Interiors', 'Mountain Air', 'Forest Views'],
    desc:
      'Step into a handcrafted cottage that feels like a natural extension of the forest itself. ' +
      'Wide windows frame the canopy. Mornings arrive with birdsong before your alarm does. ' +
      'Designed for absolute rest — no distractions, only presence.',
    reversed: false,
  },
  {
    image:    '/cottage-2.jpeg',
    fallback: '/cottage-1.jpeg',
    alt:      'Cottage surroundings and outdoor space',
    eyebrow:  'The Experience',
    title:    'Private Stay',
    subtitle: 'Life at a gentler pace',
    tags:     ['Sunrise Deck', 'Organic Garden', 'Bonfire Evenings', 'Wildlife Sightings'],
    desc:
      'The outdoor spaces are as considered as the interior. A private deck for morning yoga, ' +
      'a garden where herbs grow without permission, and evenings lit only by fire. ' +
      'This is not a stay — it is a remembering of how to live.',
    reversed: true,
  },
]

/* ── Individual showcase block ───────────────────────────────────────── */
function ShowcaseBlock({ item, index }: { item: Showcase; index: number }) {
  const blockRef  = useRef<HTMLDivElement>(null)
  const imgWrap   = useRef<HTMLDivElement>(null)
  const textWrap  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const start = 'top 80%'
    const acts  = 'play none none none'

    /* Image: clip-path reveal */
    gsap.from(imgWrap.current, {
      clipPath: item.reversed ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
      duration: 1.3,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: imgWrap.current, start, toggleActions: acts },
    })

    /* Text: fade-up */
    if (textWrap.current) {
      gsap.from(textWrap.current.children, {
        opacity: 0,
        y: 28,
        duration: 0.80,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: { trigger: textWrap.current, start, toggleActions: acts },
      })
    }
  }, { scope: blockRef })

  const imageEl = (
    <div
      ref={imgWrap}
      className="img-reveal-wrap relative h-72 sm:h-96 md:h-auto md:min-h-[560px] lg:min-h-[640px] overflow-hidden"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        className="object-cover object-center transition-transform duration-700 ease-luxury hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={e => { (e.currentTarget as HTMLImageElement).src = item.fallback }}
      />
      {/* Edge fade toward text column */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: item.reversed
            ? 'linear-gradient(to left, transparent 55%, rgba(11,15,12,0.6) 100%)'
            : 'linear-gradient(to right, transparent 55%, rgba(11,15,12,0.6) 100%)',
        }}
        aria-hidden
      />
    </div>
  )

  const textEl = (
    <div className="flex items-center py-16 sm:py-20 md:py-0">
      <div
        ref={textWrap}
        className={`
          section-container flex flex-col gap-5
          ${item.reversed ? 'md:pr-14 lg:pr-20' : 'md:pl-14 lg:pl-20'}
        `}
        style={{ maxWidth: '100%' }}
      >
        {/* Eyebrow */}
        <p className="font-body text-[10px] tracking-luxury uppercase" style={{ color: '#C9A96E' }}>
          {item.eyebrow}
        </p>

        {/* Title */}
        <h2
          className="font-display font-light text-pearl leading-[1.06]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          {item.title}
        </h2>

        {/* Italic subtitle */}
        <p
          className="font-display italic font-light"
          style={{ color: '#C9A96E', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          {item.subtitle}
        </p>

        {/* Gold divider */}
        <div className="gold-line" aria-hidden />

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="font-body text-[10px] tracking-wide uppercase px-3 py-1.5 rounded-[2px]"
              style={{
                border: '1px solid rgba(201,169,110,0.22)',
                color: '#C9A96E',
                background: 'rgba(201,169,110,0.04)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.82] max-w-[480px]">
          {item.desc}
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className="
            self-start inline-flex items-center gap-3
            font-body text-[10px] tracking-luxury uppercase font-medium
            rounded-[2px] px-7 py-3.5
            btn-gold
            transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]
          "
        >
          Explore Stay
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  )

  return (
    <div
      ref={blockRef}
      className="grid md:grid-cols-2"
    >
      {item.reversed ? (
        <>
          {textEl}
          {imageEl}
        </>
      ) : (
        <>
          {imageEl}
          {textEl}
        </>
      )}
    </div>
  )
}

export default function CottageShowcase() {
  return (
    <section
      id="stay"
      aria-label="Cottage showcase"
      className="relative overflow-hidden"
      style={{ background: '#0B0F0C' }}
    >
      {/* Thin gold rule at top */}
      <div
        aria-hidden
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.20), transparent)' }}
      />

      {SHOWCASES.map((item, i) => (
        <ShowcaseBlock key={item.title} item={item} index={i} />
      ))}

      {/* Thin gold rule at bottom */}
      <div
        aria-hidden
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.20), transparent)' }}
      />
    </section>
  )
}
