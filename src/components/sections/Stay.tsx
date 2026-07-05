/**
 * src/components/sections/Stay.tsx
 * Images: /cottage-1.jpeg, /cottage-2.jpeg, /washroom.jpeg — plain <img> tags
 */

'use client'

import { useRef } from 'react'
import { gsap }   from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

const AMENITIES = [
  { icon: '🌿', label: 'Forest view'     },
  { icon: '🧘', label: 'Yoga space'      },
  { icon: '🔥', label: 'Evening bonfire' },
  { icon: '🌄', label: 'Sunrise deck'    },
  { icon: '🚿', label: 'Hot water'       },
  { icon: '🌾', label: 'Organic meals'   },
  { icon: '📵', label: 'Digital detox'   },
  { icon: '🦜', label: 'Bird walks'      },
]

export default function Stay() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const img1Ref     = useRef<HTMLDivElement>(null)
  const img2Ref     = useRef<HTMLDivElement>(null)
  const img3Ref     = useRef<HTMLDivElement>(null)
  const amenityRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const st = { toggleActions: 'play none none none' }

    gsap.from(headingRef.current, {
      opacity: 0, y: 32, duration: 1.0, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%', ...st },
    })
    gsap.from(img1Ref.current, {
      opacity: 0, y: 40, duration: 1.1, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: img1Ref.current, start: 'top 80%', ...st },
    })
    ;[img2Ref.current, img3Ref.current].filter(Boolean).forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', delay: 0.12 * (i + 1), immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 80%', ...st },
      })
    })
    if (amenityRef.current) {
      gsap.from(amenityRef.current.children, {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.07, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: amenityRef.current, start: 'top 85%', ...st },
      })
    }
    gsap.from(ctaRef.current, {
      opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', ...st },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="stay-detail"
      aria-label="Stay at Tiger Yoga Dhyan Kendra"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{ background: '#0B0F0C' }}
    >
      <div aria-hidden className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(28,59,43,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="section-container">
        <div ref={headingRef} className="mb-14 sm:mb-18">
          <SectionTitle
            eyebrow="The Cottage"
            heading="Your private sanctuary in the wild."
            sub="A hand-crafted retreat nestled among the trees — designed for stillness, not spectacle."
          />
        </div>

        {/* Image grid */}
        <div className="grid md:grid-cols-[58fr_42fr] gap-3 sm:gap-4 mb-14 sm:mb-18">
          {/* Main image */}
          <div ref={img1Ref} className="relative aspect-[4/3] md:aspect-auto md:h-[520px] lg:h-[600px] rounded-[3px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cottage-1.jpeg"
              alt="Tiger Yoga Dhyan Kendra — The Cottage exterior"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              onError={e => { const i = e.currentTarget; i.onerror=null; i.src='/cottage-2.jpeg' }}
            />
            <div className="absolute bottom-0 inset-x-0 p-5"
              style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.8) 0%, transparent 100%)' }}>
              <p className="font-body text-[10px] tracking-luxury uppercase" style={{ color: '#C9A96E' }}>The Cottage</p>
              <p className="font-display font-light text-pearl text-lg mt-0.5">A room with roots, not walls.</p>
            </div>
          </div>

          {/* Right stacked */}
          <div className="grid grid-rows-2 gap-3 sm:gap-4">
            <div ref={img2Ref} className="relative rounded-[3px] overflow-hidden" style={{ minHeight: '200px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cottage-2.jpeg"
                alt="Tiger Yoga Dhyan Kendra — Cottage view"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
                onError={e => { const i = e.currentTarget; i.onerror=null; i.src='/farm.jpeg' }}
              />
            </div>
            <div ref={img3Ref} className="relative rounded-[3px] overflow-hidden" style={{ minHeight: '200px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/washroom.jpeg"
                alt="Tiger Yoga Dhyan Kendra — Washroom"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
                onError={e => { const i = e.currentTarget; i.onerror=null; i.src='/gate.jpeg' }}
              />
              <div className="absolute bottom-0 inset-x-0 p-4"
                style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.75) 0%, transparent 100%)' }}>
                <p className="font-body text-[10px] tracking-luxury uppercase text-pearl/60">Private Washroom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div ref={amenityRef} className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-12 sm:mb-16"
          style={{ background: 'rgba(201,169,110,0.08)' }}>
          {AMENITIES.map(a => (
            <div key={a.label} className="flex flex-col items-center justify-center py-7 px-4 text-center gap-2.5"
              style={{ background: '#0B0F0C' }}>
              <span className="text-2xl" role="img" aria-label={a.label}>{a.icon}</span>
              <span className="font-body text-[11px] tracking-wide text-pearl/55">{a.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
          <a href="#contact"
            className="inline-flex items-center justify-center rounded-[2px] px-8 py-4 font-body text-[10px] tracking-luxury uppercase font-medium btn-gold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
            Enquire About Availability
          </a>
          <p className="font-body text-[12px] text-pearl/35 leading-relaxed">
            Minimum stay: 2 nights.&nbsp;
            <span style={{ color: '#C9A96E' }}>Personalised itinerary</span>&nbsp;on request.
          </p>
        </div>
      </div>
    </section>
  )
}
