/**
 * src/components/sections/GalleryLightbox.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium masonry-style gallery with an elegant lightbox.
 *
 * GRID LAYOUT (CSS Grid with explicit placement):
 *
 *   Desktop (3 cols, auto rows 260px):
 *   ┌─────────────┬──────────┬──────────┐
 *   │             │ cottage2 │ farm     │
 *   │ cottage1    ├──────────┴──────────┤
 *   │  (row×2)   │ gate (col×2)        │
 *   ├─────────────┴─────────────────────┤
 *   │ washroom   (full width below)     │
 *   └───────────────────────────────────┘
 *
 * HOVER: dark glass overlay fades in + scale up
 * CLICK: Framer Motion full-screen lightbox
 *
 * LIGHTBOX:
 *   • backdrop: rgba(0,0,0,0.94) + blur(10px)
 *   • full-size image centred with object-contain
 *   • prev / next navigation buttons
 *   • image index counter (1 / 5)
 *   • close on backdrop click or × button
 *   • keyboard: Escape → close, ArrowLeft/Right → navigate
 */

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap }    from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { src: '/cottage-1.jpeg', alt: 'The cottage at Tiger Yoga Dhyan Kendra',  label: 'The Cottage',   gridClass: 'md:row-span-2' },
  { src: '/cottage-2.jpeg', alt: 'Cottage exterior — second angle',         label: 'Quiet Corner',  gridClass: '' },
  { src: '/farm.jpeg',      alt: 'Farm and forest surrounding the retreat',  label: 'Forest & Farm', gridClass: '' },
  { src: '/gate.jpeg',      alt: 'Entrance gate to Tiger Yoga',             label: 'The Arrival',   gridClass: 'md:col-span-2' },
  { src: '/washroom.jpeg',  alt: 'Private washroom in the cottage',         label: 'Private Comforts', gridClass: '' },
]

/* ── Close icon ──────────────────────────────────────────────────────── */
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
)
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M15 18 9 12l6-6"/>
  </svg>
)
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M9 18l6-6-6-6"/>
  </svg>
)

/* ── Gallery grid item ───────────────────────────────────────────────── */
function GalleryItem({
  item, index, onOpen,
}: {
  item: typeof IMAGES[0]
  index: number
  onOpen: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.9,
      ease: 'power2.out',
      delay: index * 0.07,
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
      className={`img-reveal-wrap group relative overflow-hidden rounded-[3px] cursor-pointer ${item.gridClass}`}
      style={{ minHeight: '220px' }}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.label} in full screen`}
      onClick={() => onOpen(index)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen(index)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={e => {
          const img = e.currentTarget as HTMLImageElement
          const fallbacks = ['/cottage-1.jpeg', '/cottage-2.jpeg', '/gate.jpeg']
          const next = fallbacks.find(f => f !== img.src)
          if (next) img.src = next
        }}
      />

      {/* Glass hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'rgba(11,15,12,0.52)', backdropFilter: 'blur(2px)' }}
        aria-hidden
      />

      {/* Caption — rises on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury"
        aria-hidden
      >
        <p className="font-display font-light text-pearl text-xl leading-tight">{item.label}</p>
        <p className="font-body text-[9px] tracking-luxury uppercase mt-1" style={{ color: '#C9A96E' }}>
          Tiger Yoga Dhyan Kendra — tap to view
        </p>
      </div>

      {/* Zoom indicator */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
        style={{ background: 'rgba(201,169,110,0.20)', border: '1px solid rgba(201,169,110,0.40)' }}
        aria-hidden
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="#C9A96E" strokeWidth="1.5" className="w-4 h-4">
          <path d="M6 2H2v4M14 2h-4M2 10v4h4M10 14h4v-4"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({
  index, onClose, onPrev, onNext,
}: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = IMAGES[index]

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(7,10,8,0.94)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery — ${item.label}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full flex items-center justify-center text-pearl/70 hover:text-pearl transition-colors z-10"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        aria-label="Close gallery"
      >
        <XIcon />
      </button>

      {/* Counter */}
      <p
        className="absolute top-6 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-luxury uppercase z-10"
        style={{ color: '#C9A96E' }}
      >
        {index + 1} / {IMAGES.length}
      </p>

      {/* Image container */}
      <div
        className="relative w-full max-w-5xl"
        style={{ height: 'calc(100vh - 7rem)' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.32 }}
            className="absolute inset-0"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-0 inset-x-0 text-center pb-2">
          <p className="font-display font-light text-pearl text-xl">{item.label}</p>
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-pearl/70 hover:text-pearl transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        aria-label="Previous image"
      >
        <ChevronLeft />
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-pearl/70 hover:text-pearl transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
        aria-label="Next image"
      >
        <ChevronRight />
      </button>
    </motion.div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────── */
export default function GalleryLightbox() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const open  = useCallback((i: number) => setSelected(i), [])
  const close = useCallback(() => setSelected(null), [])
  const prev  = useCallback(() => setSelected(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : 0), [])
  const next  = useCallback(() => setSelected(i => i !== null ? (i + 1) % IMAGES.length : 0), [])

  useGSAP(() => {
    gsap.from(headingRef.current, {
      opacity: 0, y: 30, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: sectionRef })

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        aria-label="Gallery — Tiger Yoga Dhyan Kendra"
        className="relative py-24 sm:py-32 md:py-40 overflow-hidden"
        style={{ background: '#0E1310' }}
      >
        <div className="section-container">
          <div ref={headingRef} className="mb-12 sm:mb-16">
            <SectionTitle
              eyebrow="Gallery"
              heading="A glimpse of your stay."
              sub="Every corner of Tiger Yoga Dhyan Kendra — captured in morning light."
              align="center"
            />
          </div>

          {/*
            Asymmetric CSS Grid:
            Mobile:  1 column stack
            sm:      2 columns
            md:      3 columns · cottage-1 spans 2 rows · gate spans 2 cols
          */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
            style={{ gridAutoRows: 'minmax(220px, 1fr)' }}
          >
            {IMAGES.map((item, i) => (
              <GalleryItem key={item.src} item={item} index={i} onOpen={open} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox — rendered outside section to escape overflow constraints */}
      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            index={selected}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
