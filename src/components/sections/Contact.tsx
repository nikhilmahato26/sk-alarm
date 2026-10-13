import { useState } from 'react'
import { ExternalLink, FileText, Mail, MapPin, Phone, UserRound } from 'lucide-react'

import { business } from '../../config/business'
import { mailtoHref, mapsEmbedUrl, mapsSearchUrl } from '../../utils/contact'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const row = 'flex gap-4 py-5'
const iconWrap = 'inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-fire-50 text-fire-600'

export function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading id="contact-title" title="Contact SK Fire Protection" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <dl className="divide-y divide-line border-y border-line">
              <div className={row}>
                <span className={iconWrap}>
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd>
                    <a href={business.phoneUri} className="font-display text-lg font-bold text-ink hover:text-brand-700">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className={row}>
                <span className={iconWrap}>
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-muted">Email</dt>
                  <dd>
                    <a href={mailtoHref()} className="font-semibold break-all text-ink hover:text-brand-700">
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className={row}>
                <span className={iconWrap}>
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-muted">Address</dt>
                  <dd className="mt-0.5 max-w-[46ch] leading-relaxed text-ink">{business.addressLine}</dd>
                </div>
              </div>
              <div className={row}>
                <span className={iconWrap}>
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-muted">GSTIN</dt>
                  <dd className="font-semibold tracking-wide text-ink">{business.gstin}</dd>
                </div>
              </div>
            </dl>

            <h3 className="mt-10 text-lg font-bold tracking-tight">Speak to the owners</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {business.people.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 0.06} className="rounded-2xl border border-line p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <UserRound className="size-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-display font-bold text-ink">{p.name}</p>
                  <p className="text-sm font-medium text-fire-600">{p.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.focus}</p>
                  <a
                    href={`tel:${p.phoneE164}`}
                    className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 hover:underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {p.phoneDisplay}
                    <span className="sr-only"> (call {p.name})</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-2xl border border-line bg-mist">
              {mapLoaded ? (
                <iframe
                  title={`Map showing the address of ${business.name}`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-fire-600 shadow-card">
                    <MapPin className="size-7" aria-hidden="true" />
                  </span>
                  <p className="mt-5 font-display text-lg font-bold">Captain Nagar, Lohara, Ludhiana</p>
                  <p className="mt-1 max-w-[36ch] text-sm leading-relaxed text-muted">
                    Load the map here, or open the address directly in Google Maps.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMapLoaded(true)}
                    className="mt-5 inline-flex h-11 items-center rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-700"
                  >
                    Show map
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={mapsSearchUrl} external variant="primary" size="lg">
                <ExternalLink className="size-4.5" aria-hidden="true" />
                Open in Google Maps
              </ButtonLink>
              <ButtonLink href={business.phoneUri} variant="outline" size="lg">
                <Phone className="size-4.5 text-fire-600" aria-hidden="true" />
                Call SK Fire Protection
              </ButtonLink>
            </div>
            <p className="mt-3 text-xs text-muted">Map results come from a Google Maps search of the address above.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
