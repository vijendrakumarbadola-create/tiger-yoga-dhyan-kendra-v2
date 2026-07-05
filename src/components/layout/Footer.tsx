/**
 * src/components/layout/Footer.tsx
 */
import Image from 'next/image'

const LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Stay',     href: '#stay' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact',  href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{ background: '#070A08', borderTop: '1px solid rgba(201,169,110,0.08)' }}
    >
      <div className="section-container py-16 sm:py-20">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <Image src="/logo.png" alt="Tiger Yoga Dhyan Kendra" width={140} height={56} className="w-auto h-9 object-contain" />
            <p className="font-body font-light text-ash text-[13px] leading-relaxed">
              A sanctuary for yoga, meditation, and quiet immersion in the forests of Laldhang,
              Uttarakhand — steps from Jim Corbett National Park.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-luxury uppercase mb-4" style={{ color: '#C9A96E' }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {LINKS.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] tracking-luxury uppercase mb-4" style={{ color: '#C9A96E' }}>
              Reach Us
            </p>
            <address className="not-italic flex flex-col gap-2.5">
              <a href="mailto:vijendrakumarbadola@gmail.com"
                className="font-body text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300">
                vijendrakumarbadola@gmail.com
              </a>
              <a
                href="https://wa.me/917895428914?text=Hello%2C%20I%20am%20interested%20in%20Tiger%20Yoga%20Dhyan%20Kendra%2C%20Jageetpur.%20Please%20provide%20more%20information."
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300"
              >
                +91 78954 28914
              </a>
              <a href="tel:+9199997318133"
                className="font-body text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300">
                +91 99973 18133
              </a>
              <a href="tel:+918395895523"
                className="font-body text-[13px] text-pearl/60 hover:text-pearl transition-colors duration-300">
                +91 83958 95523
              </a>
            </address>
          </div>

          {/* Location */}
          <div>
            <p className="font-body text-[10px] tracking-luxury uppercase mb-4" style={{ color: '#C9A96E' }}>
              Location
            </p>
            <address className="not-italic">
              <p className="font-body text-[13px] text-pearl/60 leading-relaxed">
                Tiger Yoga Dhyan Kendra<br />
                Laldhang Road,<br />
                Pathari Forest Range,<br />
                Uttarakhand 249408
              </p>
            </address>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-body text-[11px] text-pearl/25">
            © {new Date().getFullYear()} Tiger Yoga Dhyan Kendra. All rights reserved.
          </p>
          <p className="font-body text-[10px] tracking-luxury uppercase text-pearl/18" style={{ color: 'rgba(248,244,238,0.18)' }}>
            Tiger Yoga Dhyan Kendra&nbsp;·&nbsp;Laldhang Road&nbsp;·&nbsp;Pathari Forest Range&nbsp;·&nbsp;Uttarakhand 249408
          </p>
        </div>
      </div>
    </footer>
  )
}
