'use client'
import { useRef, useEffect } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  opacity: number; maxOpacity: number
  color: string
  life: number; lifeSpeed: number
}

const COLORS = [
  'rgba(201,169,110,%o)', 'rgba(232,200,122,%o)',
  'rgba(248,244,238,%o)', 'rgba(160,120,64,%o)',
]
const rand = (a: number, b: number) => Math.random() * (b - a) + a
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

function makeParticle(W: number, H: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x: rand(0, W), y: rand(H * 0.4, H + 40),
    vx: rand(-0.2, 0.2), vy: rand(-0.5, -0.15),
    size: rand(0.8, 2.6),
    opacity: 0, maxOpacity: rand(0.10, 0.42),
    color,
    life: 0, lifeSpeed: rand(0.0008, 0.002),
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Skip particle rendering on small screens for performance
    if (window.matchMedia && window.matchMedia('(max-width: 640px)').matches) return

    let raf: number
    let particles: Particle[] = []
    let wind = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const W = window.innerWidth, H = window.innerHeight
      canvas.width  = W * dpr; canvas.height = H * dpr
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`
      ctx.scale(dpr, dpr)
      const count = W <= 768 ? 25 : 55
      particles = Array.from({ length: count }, () => makeParticle(W, H))
      particles.forEach(p => { p.life = Math.random(); p.y = rand(0, H) })
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const tick = () => {
      const W = window.innerWidth, H = window.innerHeight
      ctx.clearRect(0, 0, W, H)
      wind += 0.007
      const drift = Math.sin(wind) * 0.055

      particles.forEach((p, i) => {
        p.life += p.lifeSpeed
        if (p.life >= 1) { particles[i] = makeParticle(W, H); return }

        p.x += p.vx + drift; p.y += p.vy
        const t = p.life
        const o = t < 0.18 ? (t/0.18) * p.maxOpacity
                : t < 0.72 ? p.maxOpacity
                : ((1-t)/0.28) * p.maxOpacity
        p.opacity = clamp(o, 0, p.maxOpacity)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('%o', p.opacity.toFixed(3))
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-[3] pointer-events-none" />
}
