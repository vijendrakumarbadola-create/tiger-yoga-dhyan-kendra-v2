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
    icon:     [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple:    '/logo.png',
  },
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://tigerdhyankendra.in',
    siteName:    'Tiger Yoga Dhyan Kendra',
    title:       'Tiger Yoga Dhyan Kendra | Luxury Nature Retreat, Laldhang Uttarakhand',
    description: 'Escape the noise. Find peace in the heart of nature at Tiger Yoga Dhyan Kendra, Laldhang.',
    images: [{ url: '/cottage-1.jpeg', width: 1200, height: 630, alt: 'Tiger Yoga Dhyan Kendra — Cottage' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiger Yoga Dhyan Kendra | Luxury Nature Retreat',
    description: 'A luxury yoga and nature retreat in Laldhang, Uttarakhand.',
    images: ['/cottage-1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  metadataBase: new URL('https://www.tigerdhyankendra.in'),
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
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://tigerdhyankendra.in" />
      </head>
      <body className="font-body bg-void text-pearl antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-gold-DEFAULT focus:text-void focus:rounded focus:text-sm"
        >
          Skip to main content
        </a>
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "Tiger Yoga Dhyan Kendra",
                "url": "https://www.tigerdhyankendra.in",
                "logo": "https://tigerdhyankendra.in/logo.png"
              },
              {
                "@type": "LocalBusiness",
                "name": "Tiger Yoga Dhyan Kendra",
                "image": ["https://tigerdhyankendra.in/cottage-1.jpeg"],
                "@id": "https://www.tigerdhyankendra.in",
                "url": "https://www.tigerdhyankendra.in",
                "telephone": "+91 78954 28914",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Laldhang Road, Pathari Forest Range",
                  "addressLocality": "Laldhang",
                  "addressRegion": "Uttarakhand",
                  "postalCode": "249408",
                  "addressCountry": "IN"
                },
                "geo": { "@type": "GeoCoordinates", "latitude": 29.0, "longitude": 78.7 },
                "priceRange": "₹₹",
              },
              {
                "@type": "LodgingBusiness",
                "name": "Tiger Yoga Dhyan Kendra",
                "url": "https://www.tigerdhyankendra.in",
                "telephone": "+91 78954 28914",
                "address": { "@type": "PostalAddress", "streetAddress": "Laldhang Road, Pathari Forest Range", "addressLocality": "Laldhang", "addressRegion": "Uttarakhand", "postalCode": "249408", "addressCountry": "IN" }
              },
              {
                "@type": "WebSite",
                "url": "https://www.tigerdhyankendra.in",
                "name": "Tiger Yoga Dhyan Kendra",
                "publisher": { "@id": "https://www.tigerdhyankendra.in" }
              }
            ]
          }) }}
        />
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  )
}
