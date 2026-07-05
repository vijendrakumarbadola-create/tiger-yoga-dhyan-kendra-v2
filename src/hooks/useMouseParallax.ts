/**
 * src/hooks/useMouseParallax.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Tracks mouse position and drives smooth GSAP parallax across multiple refs.
 * Each ref pair gets a different amplitude so they appear at different depths.
 *
 * Usage:
 *   const { containerRef, bind } = useMouseParallax()
 *   bind(imageRef,   { x: 25, y: 15 })  // moves more → feels closer
 *   bind(contentRef, { x: 6,  y: 4  })  // moves less → feels further back
 */

'use client'

import { useRef, useEffect, useCallback, RefObject } from 'react'
import { gsap } from 'gsap'

interface ParallaxLayer {
  ref: RefObject<HTMLElement>
  amplitude: { x: number; y: number }
  invert?: boolean // true = moves opposite to cursor (receding layer)
}

export function useMouseParallax() {
  const containerRef = useRef<HTMLElement>(null)
  const layers = useRef<ParallaxLayer[]>([])
  const rafId  = useRef<number>(0)
  const pos    = useRef({ x: 0, y: 0 })

  const bind = useCallback(
    (
      ref: RefObject<HTMLElement>,
      amplitude: { x: number; y: number },
      invert = false
    ) => {
      layers.current.push({ ref, amplitude, invert })
    },
    []
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Disable on touch devices — parallax feels wrong without a cursor
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      // Normalised -0.5 → +0.5 within the container
      pos.current.x = ((e.clientX - rect.left) / rect.width)  - 0.5
      pos.current.y = ((e.clientY - rect.top)  / rect.height) - 0.5
    }

    const tick = () => {
      layers.current.forEach(({ ref, amplitude, invert }) => {
        if (!ref.current) return
        const dir = invert ? 1 : -1
        gsap.to(ref.current, {
          x: dir * pos.current.x * amplitude.x,
          y: dir * pos.current.y * amplitude.y,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
      rafId.current = requestAnimationFrame(tick)
    }

    container.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { containerRef, bind }
}
