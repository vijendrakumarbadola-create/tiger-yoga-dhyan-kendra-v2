/**
 * src/components/ui/SectionTitle.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable luxury section heading block.
 *
 * Renders:
 *   [eyebrow]  — small gold tracked-out label
 *   [heading]  — large Cormorant Garamond heading
 *   [divider]  — animated gold horizontal rule
 *   [sub]      — optional Inter body subtitle
 *
 * Props:
 *   eyebrow   string         — "OUR PHILOSOPHY"
 *   heading   string         — "Where silence is the teacher"
 *   sub?      string         — optional short descriptor
 *   align?    'left'|'center'— text alignment (default 'left')
 *   light?    boolean        — pearl text on dark bg (default true)
 */

'use client'

interface SectionTitleProps {
  eyebrow:  string
  heading:  string
  sub?:     string
  align?:   'left' | 'center'
  className?: string
}

export default function SectionTitle({
  eyebrow,
  heading,
  sub,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const centred = align === 'center'

  return (
    <div className={`${centred ? 'text-center items-center' : 'items-start'} flex flex-col ${className}`}>
      {/* Eyebrow */}
      <p
        className="font-body text-[10px] sm:text-[11px] tracking-luxury uppercase mb-3 sm:mb-4"
        style={{ color: '#C9A96E' }}
      >
        {eyebrow}
      </p>

      {/* Heading */}
      <h2
        className={`
          font-display font-light text-pearl leading-[1.08]
          text-[28px] sm:text-[36px] md:text-[56px] lg:text-[64px]
          max-w-3xl mb-5 sm:mb-6
          ${centred ? 'mx-auto' : ''}
        `}
      >
        {heading}
      </h2>

      {/* Gold divider */}
      <div
        className={`gold-line mb-5 sm:mb-6 ${centred ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      {/* Optional subtitle */}
      {sub && (
        <p
          className={`
            font-body font-light leading-relaxed text-ash
            text-[14px] sm:text-[15px] max-w-xl
            ${centred ? 'mx-auto text-center' : ''}
          `}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
