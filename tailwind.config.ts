import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colour Tokens ──────────────────────────────────────────────
      colors: {
        void:    '#0B0F0C',   // Kaali Raat  — base background
        forest:  '#1C3B2B',   // Baans Jangal — forest green
        gold: {
          DEFAULT: '#C9A96E', // Sone ki Dhup — signature gold
          light:   '#E8C87A', // Bhor ki Roshni — morning gold
          deep:    '#A07840', // Dhoop Chhaon — deep amber
          muted:   '#7A5A30', // Mitti — earth tone
        },
        pearl:  '#F8F4EE',    // Chandni — primary text
        ash:    '#C8BCA8',    // Dhool — secondary text
        glass:  'rgba(255,255,255,0.08)',
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['var(--font-inter)',      'Inter', 'system-ui', 'sans-serif'],
      },

      // ─── Spacing scale for sections ───────────────────────────────────────
      spacing: {
        section:    '120px',
        'section-sm': '80px',
      },

      // ─── Gradients ────────────────────────────────────────────────────────
      backgroundImage: {
        'gold-shimmer':
          'linear-gradient(135deg, #A07840 0%, #C9A96E 30%, #E8C87A 55%, #D4AF72 75%, #C9A96E 100%)',
        'gold-border':
          'linear-gradient(90deg, transparent, #C9A96E, transparent)',
        'section-fade-up':
          'linear-gradient(to top, #0B0F0C 0%, transparent 100%)',
        'hero-vignette':
          'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 30%, rgba(11,15,12,0.7) 100%)',
      },

      // ─── Keyframes & Animations ───────────────────────────────────────────
      keyframes: {
        'gold-shimmer': {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'scroll-wheel': {
          '0%':   { transform: 'translateY(0)', opacity: '1' },
          '60%':  { transform: 'translateY(10px)', opacity: '0.15' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'fog-drift': {
          '0%':   { transform: 'translateX(-6%) scale(1.06)', opacity: '0.22' },
          '50%':  { transform: 'translateX(4%) scale(1.03)',  opacity: '0.30' },
          '100%': { transform: 'translateX(-6%) scale(1.06)', opacity: '0.22' },
        },
        'particle-rise': {
          '0%':   { transform: 'translateY(0) translateX(0)',   opacity: '0' },
          '15%':  { opacity: '1' },
          '85%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(-200px) translateX(30px)', opacity: '0' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.55' },
          '50%':      { opacity: '0.85' },
        },
        'line-grow': {
          '0%':   { scaleX: '0' },
          '100%': { scaleX: '1' },
        },
      },
      animation: {
        'gold-shimmer': 'gold-shimmer 5s linear infinite',
        'scroll-wheel': 'scroll-wheel 2.2s ease-in-out infinite',
        'fog-drift':    'fog-drift 25s ease-in-out infinite',
        'breathe':      'breathe 8s ease-in-out infinite',
        'line-grow':    'line-grow 1.2s ease-in-out forwards',
      },

      // ─── Transition Easing ────────────────────────────────────────────────
      transitionTimingFunction: {
        luxury:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        premium:  'cubic-bezier(0.16, 1, 0.3, 1)',
        cinematic:'cubic-bezier(0.76, 0, 0.24, 1)',
      },

      // ─── Letter Spacing ───────────────────────────────────────────────────
      letterSpacing: {
        luxury:  '0.22em',
        premium: '0.12em',
        wide:    '0.08em',
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        luxury: '2px',
      },
    },
  },
  plugins: [],
}
export default config
