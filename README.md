# Tiger Yoga Dhyan Kendra — Full Website

Awwwards-quality luxury nature retreat website.  
Next.js 14 · TypeScript · Tailwind CSS · GSAP · Lenis · Framer Motion

---

## Quick Start

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # production build
```

---

## Place Your Assets

Copy all files into the `/public` directory:

```
public/
  logo.png          ← Navbar logo + favicon  (required)
  cottage-1.jpeg     ← Hero background         (required — largest + best image)
  cottage-2.jpeg     ← Stay section (secondary)
  gate.jpeg          ← About section (arrival image)
  farm.jpeg          ← Contact section accent
  washroom.jpeg      ← Stay section (interior)
  video/
    hero-bg.mp4     ← (Optional — swap in when ready, see below)
```

### Graceful fallbacks
Every `<Image>` has an `onError` chain:
- If `cottage-1.jpeg` is missing → falls back to `cottage-2.jpeg` → `farm.jpeg`
- If `gate.jpeg` is missing → falls back to `farm.jpeg`
- If `washroom.jpeg` is missing → falls back to `gate.jpeg`
The layout never breaks regardless of which images are present.

---

## Add the Hero Video (Later)

When you have `hero-bg.mp4` ready, open `src/components/sections/Hero.tsx`
and replace the `<Image>` background with a `<video>` element:

```tsx
// 1. Remove the <Image> component in Layer 0
// 2. Add inside imageWrapRef div:
<video
  muted autoPlay loop playsInline preload="auto"
  poster="/cottage-1.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/video/hero-bg.webm" type="video/webm" />
  <source src="/video/hero-bg.mp4"  type="video/mp4"  />
</video>
```

The rest of the animations (GSAP zoom, parallax, particles, overlays) all work
identically with video. No other changes needed.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        Root CSS, Lenis, scrollbar, keyframes
│   ├── layout.tsx         SEO metadata, fonts, favicon
│   └── page.tsx           Page assembly + Lenis boot
│
├── lib/
│   └── fonts.ts           Cormorant Garamond + Inter (next/font)
│
├── hooks/
│   ├── useLenis.ts        Lenis ↔ GSAP ScrollTrigger bridge
│   ├── useScrolled.ts     Scroll position → navbar state
│   └── useMouseParallax.ts  Multi-layer GSAP parallax
│
└── components/
    ├── layout/
    │   ├── Navbar.tsx      Floating glass nav (shrinks on scroll)
    │   └── Footer.tsx      Dark minimal footer
    ├── sections/
    │   ├── Hero.tsx        Cinematic hero (zoom + parallax + GSAP)
    │   ├── About.tsx       Philosophy + stats counter
    │   ├── Stay.tsx        Cottage gallery + amenities
    │   ├── Gallery.tsx     Asymmetric masonry gallery
    │   ├── Packages.tsx    Three-tier package cards
    │   └── Contact.tsx     Split layout inquiry form
    └── ui/
        ├── SectionTitle.tsx  Reusable eyebrow+heading+divider
        ├── ParticleCanvas.tsx  Canvas particle system
        └── ScrollIndicator.tsx  Animated scroll hint
```

---

## Animation Architecture

| What                  | Library        | Detail                                      |
|-----------------------|----------------|---------------------------------------------|
| Smooth scroll         | Lenis          | Physics wheel/touch inertia                 |
| Hero entry sequence   | GSAP timeline  | zoom → eyebrow → words → buttons (2.5 s)   |
| Mouse parallax        | GSAP + rAF     | Image −28px, content +7px (depth layers)    |
| Navbar mount          | GSAP           | Slides down from above                      |
| Section text reveals  | GSAP ST        | clip-path wipe, fade-up, stagger            |
| Stats counter         | GSAP ST        | Counts from 0 to target value               |
| Image reveals         | GSAP ST        | clip-path inset wipe (left/bottom)          |
| Scroll parallax       | GSAP ST scrub  | Hero content drifts up as page scrolls      |
| Mobile menu           | Framer Motion  | clip-path wipe + staggered link reveals     |
| Package card hover    | CSS transform  | subtle −4px lift                            |
| Gallery image hover   | CSS + GSAP ST  | scale + caption slide from bottom           |
| Particles             | Canvas rAF     | 55 warm gold particles, wind simulation     |
| Reduced motion        | All disabled   | `prefers-reduced-motion` respected globally |

---

## Customise

| What                  | File                                    |
|-----------------------|-----------------------------------------|
| Brand colours         | `tailwind.config.ts` → `colors`        |
| Headline copy         | `Hero.tsx` → `HEADLINE` array          |
| Packages & pricing    | `Packages.tsx` → `PACKAGES` array      |
| Nav links             | `Navbar.tsx` → `NAV_LINKS` array       |
| Stats numbers         | `About.tsx` → `STATS` array            |
| Amenities             | `Stay.tsx` → `AMENITIES` array         |
| Contact info          | `Contact.tsx` → contact details block  |
| Form action           | `Contact.tsx` → `handleSubmit()`       |

---

## Deployment (Vercel)

```bash
vercel deploy
```

Set environment variable `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
for full OpenGraph metadata activation.
