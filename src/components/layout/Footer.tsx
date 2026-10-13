import { Mail, MapPin, Phone } from 'lucide-react'

import { business } from '../../config/business'
import { navLinks } from '../../config/navigation'
import { services } from '../../data/services'
import { mapsSearchUrl } from '../../utils/contact'
import { whatsappUrl } from '../../utils/whatsapp'
import { Logo } from '../ui/Logo'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const heading = 'text-sm font-bold tracking-tight text-ink'
const link = 'text-[15px] text-muted transition-colors hover:text-brand-700'

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-20 md:pb-0">
      <div aria-hidden="true" className="flex h-1">
        <span className="w-2/3 bg-brand-500" />
        <span className="w-1/3 bg-fire-600" />
      </div>

      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.5fr] lg:gap-12">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
            Fire hydrant, sprinkler and alarm systems, plus maintenance services, in {business.locationShort}.
          </p>
          <p className="mt-4 text-xs text-muted">
            GSTIN <span className="font-semibold tracking-wide text-ink">{business.gstin}</span>
          </p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={heading}>
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className={heading}>
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className={link}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a href={business.phoneUri} className={`${link} inline-flex items-center gap-2.5`}>
                <Phone className="size-4 shrink-0 text-fire-600" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} inline-flex items-center gap-2.5`}
              >
                <WhatsAppIcon className="size-4 shrink-0 text-[#1f8a4c]" />
                {business.whatsappDisplay}
                <span className="sr-only"> (WhatsApp, opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={`${link} inline-flex items-center gap-2.5 break-all`}>
                <Mail className="size-4 shrink-0 text-fire-600" aria-hidden="true" />
                {business.email}
              </a>
            </li>
            <li>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} inline-flex gap-2.5 leading-relaxed`}
              >
                <MapPin className="mt-1 size-4 shrink-0 text-fire-600" aria-hidden="true" />
                <span>
                  {business.addressLine}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <p>Photographs are illustrative and do not show SK Fire Protection projects.</p>
        </div>
      </div>
    </footer>
  )
}
