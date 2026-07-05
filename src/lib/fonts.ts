/**
 * src/lib/fonts.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Two-face type system for Tiger Yoga Dhyan Kendra:
 *
 * DISPLAY → Cormorant Garamond
 *   A classicist serif with deep ink-trap detail. At large display sizes
 *   on dark backgrounds it reads as old-world luxury — the typographic
 *   equivalent of hand-stitched leather. Used for all headings, pull
 *   quotes, and eyebrow labels.
 *
 * BODY → Inter
 *   The cleanest possible humanist sans at small sizes. Weight 300 keeps
 *   it from competing with Cormorant — it recedes like silk backing stone.
 *   Used for body copy, nav labels, button text, and form fields.
 */

import { Cormorant_Garamond, Inter } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
