/**
 * src/components/sections/Contact.tsx
 * Image: /farm.jpeg — plain <img> tag
 */

'use client'

import { useRef, FormEvent, useState, type ChangeEvent, type MouseEvent } from 'react'
import { gsap }   from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

function Field({ label, name, type = 'text', as, value, onChange }: { label: string; name: string; type?: string; as?: 'textarea'; value: string; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) {
  const Tag = as ?? 'input'
  return (
    <div className="flex flex-col gap-1.5 field-border pb-3">
      <label htmlFor={name} className="font-body text-[10px] tracking-luxury uppercase text-pearl/35">{label}</label>
      {Tag === 'textarea' ? (
        <textarea id={name} name={name} rows={4}
          value={value}
          onChange={onChange}
          className="font-body font-light text-[14px] text-pearl bg-transparent resize-none focus:outline-none leading-relaxed" />
      ) : (
        <input id={name} name={name} type={type}
          value={value}
          onChange={onChange}
          className="font-body font-light text-[14px] text-pearl bg-transparent focus:outline-none" />
      )}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({
    name: '',
    dates: '',
    guests: '',
    packageName: '',
    message: '',
  })

  useGSAP(() => {
    const st = { toggleActions: 'play none none none' }
    gsap.from(leftRef.current, {
      opacity: 0, x: -30, duration: 1.1, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: leftRef.current, start: 'top 80%', ...st },
    })
    gsap.from(rightRef.current, {
      opacity: 0, x: 30, duration: 1.1, ease: 'power2.out', delay: 0.12, immediateRender: false,
      scrollTrigger: { trigger: rightRef.current, start: 'top 80%', ...st },
    })
  }, { scope: sectionRef })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const sendWhatsAppMessage = () => {
    const text = `Hello Tiger Yoga Dhyan Kendra,\n\nName: ${form.name}\nPreferred Dates: ${form.dates}\nGuests: ${form.guests}\nSelected Package: ${form.packageName}\nMessage: ${form.message}\n\nI would like to book my stay.`
    const url = `https://wa.me/917895428914?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendWhatsAppMessage()
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    sendWhatsAppMessage()
  }

  return (
    <section ref={sectionRef} id="contact" aria-label="Contact and booking inquiry"
      className="relative py-24 sm:py-32 md:py-40" style={{ background: '#0E1310' }}>
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)' }} />

      <div className="section-container">
        <div className="grid md:grid-cols-[45fr_55fr] gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div ref={leftRef} className="flex flex-col gap-10">
            <SectionTitle eyebrow="Begin Your Journey" heading="We'd love to welcome you."
              sub="Write to us, tell us when you'd like to come, and we'll take care of everything else." />

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-body text-[10px] tracking-luxury uppercase mb-1" style={{ color: '#C9A96E' }}>WhatsApp</p>
                <a href="https://wa.me/917895428914?text=Hello%20Tiger%20Yoga%20Dhyan%20Kendra%2C%20I%20would%20like%20to%20enquire%20about%20booking."
                  className="font-body font-light text-[14px] text-pearl/70 hover:text-pearl transition-colors duration-300" target="_blank" rel="noreferrer noopener">+91 78954 28914</a>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-luxury uppercase mb-1" style={{ color: '#C9A96E' }}>Call</p>
                <a href="tel:+9199997318133"
                  className="font-body font-light text-[14px] text-pearl/70 hover:text-pearl transition-colors duration-300">+91 99973 18133</a>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-luxury uppercase mb-1" style={{ color: '#C9A96E' }}>Additional Contact</p>
                <a href="tel:+918395895523"
                  className="font-body font-light text-[14px] text-pearl/70 hover:text-pearl transition-colors duration-300">+91 83958 95523</a>
              </div>
              <div>
                <p className="font-body text-[10px] tracking-luxury uppercase mb-1" style={{ color: '#C9A96E' }}>Location</p>
                <div className="inline-flex items-start gap-3">
                  <span className="mt-[3px] text-pearl/70">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                      <path d="M7 1C4.23858 1 2 3.23858 2 6C2 10.5 7 17 7 17C7 17 12 10.5 12 6C12 3.23858 9.76142 1 7 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="7" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <p className="font-body font-light text-[14px] text-pearl/70 whitespace-pre-line leading-relaxed">
                    Tiger Yoga Dhyan Kendra
                    Laldhang Road,
                    Pathari Forest Range,
                    Uttarakhand 249408
                  </p>
                </div>
                <a href="https://maps.google.com/?q=Tiger%20Yoga%20Dhyan%20Kendra%20Laldhang%20Road%2C%20Pathari%20Forest%20Range%2C%20Uttarakhand%20249408"
                  target="_blank" rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 rounded-[2px] px-8 py-4 font-body text-[10px] tracking-luxury uppercase font-medium btn-gold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Accent image */}
            <div className="relative h-48 sm:h-56 rounded-[3px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/farm.jpeg"
                alt="The farm and nature at Tiger Yoga Dhyan Kendra"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                onError={e => { const i = e.currentTarget; i.onerror=null; i.src='/gate.jpeg' }}
              />
              <div className="absolute inset-0" style={{ background: 'rgba(11,15,12,0.25)' }} />
            </div>
          </div>

          {/* Right: form */}
          <div ref={rightRef}>
            <form onSubmit={handleSubmit} noValidate aria-label="Retreat enquiry form" className="flex flex-col gap-7">
              <div className="grid sm:grid-cols-2 gap-7">
                <Field label="Your name" name="name" value={form.name} onChange={handleInputChange} />
                <Field label="Preferred dates" name="dates" value={form.dates} onChange={handleInputChange} />
              </div>
              <div className="grid sm:grid-cols-2 gap-7">
                <Field label="Number of guests" name="guests" type="number" value={form.guests} onChange={handleInputChange} />
                <Field label="Package" name="packageName" value={form.packageName} onChange={handleInputChange} />
              </div>
              <Field label="Message" name="message" as="textarea" value={form.message} onChange={handleInputChange} />
              <button type="button" onClick={handleButtonClick}
                className="self-start inline-flex items-center gap-3 rounded-[2px] px-8 py-4 font-body text-[10px] tracking-luxury uppercase font-medium btn-gold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
                Send Enquiry <span aria-hidden>→</span>
              </button>
              <p className="font-body text-[11px] text-pearl/25 leading-relaxed">Your enquiry will open directly in WhatsApp with your details included.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
