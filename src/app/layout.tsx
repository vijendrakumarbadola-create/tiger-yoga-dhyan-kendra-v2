/**
 * src/app/layout.tsx
 */

import type { Metadata, Viewport } from 'next'
import { cormorant, inter } from '@/lib/fonts'
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Tiger Yoga Dhyan Kendra | Luxury Nature Retreat — Laldhang, Uttarakhand',
    template: '%s | Tiger Yoga Dhyan Kendra',
  },
  description:
    'A luxury yoga and nature retreat in Laldhang, Uttarakhand, at the foothills of the Himalayas near Jim Corbett National Park. Experience yoga, meditation, forest walks, and mindful living.',
  keywords: [
    'Tiger Yoga Dhyan Kendra',
    'yoga retreat Uttarakhand',
    'Laldhang nature retreat',
    'luxury retreat near Corbett',
    'meditation cottage Uttarakhand',
    'Himalayan yoga',
    'Jim Corbett wellness retreat',
    'forest retreat India',
  ],
  authors: [{ name: 'Tiger Yoga Dhyan Kendra' }],
  creator: 'Tiger Yoga Dhyan Kendra',
  icons: {
    icon:     [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple:    '/logo.png',
  },
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://tigeryogadhyankendra.com',
    siteName:    'Tiger Yoga Dhyan Kendra',
    title:       'Tiger Yoga Dhyan Kendra | Luxury Nature Retreat, Laldhang Uttarakhand',
    description: 'Escape the noise. Find peace in the heart of nature at Tiger Yoga Dhyan Kendra, Laldhang.',
    images: [{ url: '/cottage-1.jpeg', width: 1200, height: 630, alt: 'Tiger Yoga Dhyan Kendra — Cottage' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  metadataBase: new URL('https://tigeryogadhyankendra.com'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0F0C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-void text-pearl antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-gold-DEFAULT focus:text-void focus:rounded focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  )
}
