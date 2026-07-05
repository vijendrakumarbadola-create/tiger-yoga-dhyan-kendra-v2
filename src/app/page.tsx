/**
 * src/app/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full website assembly — Part 1 sections preserved exactly.
 * Part 2 sections inserted in logical narrative order.
 *
 * Scroll order:
 *   Hero            ← Part 1 (unchanged)
 *   AboutRetreats   ← Part 2: cinematic split + feature cards
 *   WhyChooseUs     ← Part 2: 6 glassmorphism cards
 *   CottageShowcase ← Part 2: alternating left-right cottage reveal
 *   GalleryLightbox ← Part 2: masonry gallery + lightbox
 *   Activities      ← Part 2: 6 activity cards
 *   FoodExperience  ← Part 2: farm to table full-bleed
 *   Packages        ← Part 1 (unchanged)
 *   Contact         ← Part 1 (unchanged)
 */

'use client'

import { useLenis }         from '@/hooks/useLenis'
import Navbar               from '@/components/layout/Navbar'
import Footer               from '@/components/layout/Footer'

/* ── Part 1 sections (files untouched) ──────────────────────────────── */
import Hero                 from '@/components/sections/Hero'
import Packages             from '@/components/sections/Packages'
import Contact              from '@/components/sections/Contact'

/* ── Part 2 sections (new files) ────────────────────────────────────── */
import AboutRetreats        from '@/components/sections/AboutRetreats'
import WhyChooseUs          from '@/components/sections/WhyChooseUs'
import CottageShowcase      from '@/components/sections/CottageShowcase'
import GalleryLightbox      from '@/components/sections/GalleryLightbox'
import Activities           from '@/components/sections/Activities'
import FoodExperience       from '@/components/sections/FoodExperience'

export default function HomePage() {
  useLenis()

  return (
    <>
      <Navbar />
      <main id="main">
        {/* ── Hero: full-screen cinematic (Part 1) ─────────── */}
        <Hero />

        {/* ── About: cinematic split + feature cards ────────── */}
        <AboutRetreats />

        {/* ── Why Choose Us: 6 glassmorphism cards ──────────── */}
        <WhyChooseUs />

        {/* ── Cottage: alternating left-right showcase ──────── */}
        <CottageShowcase />

        {/* ── Gallery: masonry grid + lightbox ──────────────── */}
        <GalleryLightbox />

        {/* ── Activities: 6 animated activity cards ─────────── */}
        <Activities />

        {/* ── Food: farm to table full-bleed section ────────── */}
        <FoodExperience />

        {/* ── Packages: 3-tier cards (Part 1) ───────────────── */}
        <Packages />

        {/* ── Contact: inquiry form (Part 1) ────────────────── */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
