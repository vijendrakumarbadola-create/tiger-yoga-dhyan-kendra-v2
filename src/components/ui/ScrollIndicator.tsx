'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.from(ref.current, { opacity: 0, y: 14, duration: 0.9, ease: 'power2.out', delay: 2.9 })

    const onScroll = () => {
      if (!ref.current) return
      const p = Math.min(window.scrollY / 200, 1)
      ref.current.style.opacity = String(1 - p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
    >
      <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
        <rect x="1" y="1" width="22" height="36" rx="11" stroke="rgba(248,244,238,0.5)" strokeWidth="1.2" />
        <rect
          x="10.4" y="7" width="3.2" height="6" rx="1.6"
          fill="rgba(201,169,110,0.9)"
          className="scroll-wheel"
          style={{ transformOrigin: '50% 10px' }}
        />
      </svg>
      <p className="font-body text-[9px] tracking-luxury uppercase text-pearl/30">
        Scroll to Explore
      </p>
    </div>
  )
}
