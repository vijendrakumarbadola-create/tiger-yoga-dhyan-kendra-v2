/**
 * src/components/sections/About.tsx
 * Image: /gate.jpeg — plain <img> for reliable rendering
 */

'use client'

import { useRef } from 'react'
import { gsap }   from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 2020,  suffix: '',  label: 'Established' },
  { value: 500,   suffix: '+', label: 'Guests hosted' },
  { value: 3,     suffix: '',  label: 'Acres of forest' },
  { value: 365,   suffix: '',  label: 'Days of nature' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef   = useRef<HTMLQuoteElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(() => {
    const trigger = { start: 'top 80%', toggleActions: 'play none none none' }

    gsap.from(quoteRef.current, {
      opacity: 0, x: -30,
      duration: 1.3, ease: 'power3.out', immediateRender: false,
      scrollTrigger: { trigger: quoteRef.current, ...trigger },
    })

    if (textRef.current) {
      gsap.from(textRef.current.children, {
        opacity: 0, y: 28,
        duration: 0.85, stagger: 0.12, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: textRef.current, ...trigger },
      })
    }

    gsap.from(imageRef.current, {
      opacity: 0, y: 40,
      duration: 1.2, ease: 'power3.out', immediateRender: false,
      scrollTrigger: { trigger: imageRef.current, start: 'top 78%', toggleActions: 'play none none none' },
    })

    statsRef.current.filter(Boolean).forEach((el, i) => {
      const target = STATS[i].value
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target, duration: 1.6, ease: 'power2.out', delay: i * 0.1,
        onUpdate() { if (el) el.textContent = Math.round(obj.val).toString() },
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about-story"
      aria-label="About Tiger Yoga Dhyan Kendra"
      className="relative py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{ background: '#0E1310' }}
    >
      <div className="absolute left-0 top-0 h-full w-1"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(28,59,43,0.6), transparent)' }}
        aria-hidden />

      <div className="section-container">
        <div className="grid md:grid-cols-[55fr_45fr] gap-16 lg:gap-24 items-start">

          <div>
            <SectionTitle eyebrow="Our Philosophy" heading="Where the forest breathes, the mind finds rest." className="mb-10 sm:mb-12" />

            <blockquote
              ref={quoteRef}
              className="font-display italic font-light leading-[1.3] mb-8 sm:mb-10"
              style={{ color: '#C9A96E', fontSize: 'clamp(1.4rem, 3vw, 2rem)', borderLeft: '2px solid rgba(201,169,110,0.30)', paddingLeft: '1.5rem' }}
            >
              "Silence is not the absence of sound. It is the presence of everything
              that matters — the forest, the breath, the moment."
            </blockquote>

            <div ref={textRef} className="flex flex-col gap-5">
              <p className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.80]">
                Nestled in Laldhang at the foothills of the Himalayas, Tiger Yoga Dhyan Kendra
                was founded on a simple belief: the natural world is the greatest teacher.
              </p>
              <p className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.80]">
                We are steps from Jim Corbett National Park, surrounded by sal forests,
                paddy fields, and the Kosi River. Guests stay in a private cottage immersed
                in greenery, guided through yoga and meditation by practitioners who have
                lived here for years.
              </p>
              <p className="font-body font-light text-ash text-[14px] sm:text-[15px] leading-[1.80]">
                This is not a resort. It is a return.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Image */}
            <div ref={imageRef} className="relative aspect-[4/5] rounded-[4px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gate.jpeg"
                alt="Entrance to Tiger Yoga Dhyan Kendra"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
                onError={e => { const i = e.currentTarget; i.onerror=null; i.src='/farm.jpeg' }}
              />
              <div className="absolute inset-0" style={{ background: 'rgba(11,15,12,0.18)' }} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(201,169,110,0.10)' }}>
              {STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col items-center justify-center py-7 px-4 text-center" style={{ background: '#0E1310' }}>
                  <p className="font-display font-light text-pearl mb-1" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                    <span ref={el => { statsRef.current[i] = el }} aria-label={`${s.value}${s.suffix}`}>0</span>
                    <span style={{ color: '#C9A96E' }}>{s.suffix}</span>
                  </p>
                  <p className="font-body text-[10px] tracking-premium uppercase text-pearl/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
