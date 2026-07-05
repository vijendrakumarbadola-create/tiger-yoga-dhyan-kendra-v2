/**
 * src/components/sections/Gallery.tsx
 * All 5 images: plain <img> tags — reliable in any context
 */

'use client'

import { useRef } from 'react'
import { gsap }   from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { src: '/cottage-1.jpeg', alt: 'The cottage at Tiger Yoga Dhyan Kendra',  label: 'The Cottage',      spanClass: 'md:row-span-2', fallback: '/cottage-2.jpeg' },
  { src: '/gate.jpeg',      alt: 'Entrance gate to the retreat',            label: 'The Arrival',      spanClass: '',              fallback: '/farm.jpeg'      },
  { src: '/farm.jpeg',      alt: 'Farm and nature surrounding the retreat',  label: 'Forest & Farm',    spanClass: '',              fallback: '/cottage-1.jpeg' },
  { src: '/cottage-2.jpeg', alt: 'Cottage exterior angle two',              label: 'Quiet Corner',     spanClass: '',              fallback: '/cottage-1.jpeg' },
  { src: '/washroom.jpeg',  alt: 'Private washroom in the cottage',         label: 'Private Comforts', spanClass: '',              fallback: '/gate.jpeg'      },
]

function GalleryImg({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0, scale: 0.96,
      duration: 0.9, ease: 'power2.out', delay: index * 0.07, immediateRender: false,
      scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={`group relative overflow-hidden rounded-[3px] cursor-pointer ${item.spanClass}`}
      style={{ minHeight: '220px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
        loading="lazy"
        onError={e => { const i = e.currentTarget; i.onerror=null; i.src=item.fallback }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'rgba(201,169,110,0.08)' }} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury"
        style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.88) 0%, transparent 100%)' }} aria-hidden>
        <p className="font-display font-light text-pearl text-lg leading-tight">{item.label}</p>
        <p className="font-body text-[9px] tracking-luxury uppercase mt-1" style={{ color: '#C9A96E' }}>Tiger Yoga Dhyan Kendra</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(headingRef.current, {
      opacity: 0, y: 28, duration: 0.9, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="gallery-basic" aria-label="Photo gallery"
      className="relative py-24 sm:py-32 md:py-40" style={{ background: '#111815' }}>
      <div className="section-container">
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <SectionTitle eyebrow="The World of Tiger Yoga" heading="A life lived at nature's pace." align="center" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          style={{ gridAutoRows: '260px' }}>
          {ITEMS.map((item, i) => <GalleryImg key={item.src} item={item} index={i} />)}
        </div>
        <p className="font-body text-[11px] tracking-wide text-pearl/25 text-center mt-10">
          Laldhang, Uttarakhand — where Jim Corbett's forests begin.
        </p>
      </div>
    </section>
  )
}
