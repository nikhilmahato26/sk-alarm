import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Check, Mail, Phone } from 'lucide-react'

import { business } from '../../config/business'
import { projectSteps, services } from '../../data/services'
import { SELECT_SERVICE_EVENT, mailtoHref, scrollToId } from '../../utils/contact'
import { serviceEnquiryMessage, whatsappUrl } from '../../utils/whatsapp'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const slugs = services.map((s) => s.slug)

export function ServiceDetails() {
  const [active, setActive] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    return slugs.includes(hash) ? hash : slugs[0]
  })
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const reduce = useReducedMotion()

  const select = useCallback((slug: string) => {
    if (slugs.includes(slug)) setActive(slug)
  }, [])

  // Service cards dispatch a custom event; footer links change the URL hash.
  useEffect(() => {
    const onSelect = (e: Event) => select((e as CustomEvent<string>).detail)
    const onHash = () => {
      const slug = window.location.hash.slice(1)
      if (slugs.includes(slug)) {
        select(slug)
        scrollToId('fire-safety-systems')
      }
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect)
    window.addEventListener('hashchange', onHash)
    if (slugs.includes(window.location.hash.slice(1))) onHash()
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, onSelect)
      window.removeEventListener('hashchange', onHash)
    }
  }, [select])

  // WAI-ARIA tabs keyboard support: arrows, Home, End.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = slugs.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? index === last ? 0 : index + 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? index === 0 ? last : index - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    setActive(slugs[next])
    tabRefs.current[slugs[next]]?.focus()
  }

  return (
    <section id="fire-safety-systems" aria-labelledby="details-title" className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading
          id="details-title"
          title="Fire safety systems in detail"
          intro="Select a system to see what it involves and the work SK Fire Protection covers."
        />

        <div
          role="tablist"
          aria-label="Fire safety systems"
          className="-mx-4 mt-10 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {services.map((s, i) => {
            const selected = s.slug === active
            const Icon = s.icon
            return (
              <button
                key={s.slug}
                ref={(el) => {
                  tabRefs.current[s.slug] = el
                }}
                id={`tab-${s.slug}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${s.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(s.slug)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`inline-flex h-12 shrink-0 snap-start items-center gap-2 rounded-lg border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-line bg-white text-ink-soft hover:border-brand-500 hover:text-brand-700'
                }`}
              >
                <Icon className={`size-4 ${selected ? 'text-white' : 'text-fire-600'}`} aria-hidden="true" />
                {s.name}
              </button>
            )
          })}
        </div>

        {services.map((s) => {
          const selected = s.slug === active
          return (
            <div
              key={s.slug}
              id={`panel-${s.slug}`}
              role="tabpanel"
              aria-labelledby={`tab-${s.slug}`}
              hidden={!selected}
              tabIndex={0}
              className="mt-8 rounded-2xl focus-visible:outline-offset-4"
            >
              {selected && (
                <motion.div
                  key={s.slug}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
                >
                  <div className="overflow-hidden rounded-2xl bg-mist">
                    <img
                      src={s.detail.src}
                      alt={s.detail.alt}
                      loading="lazy"
                      decoding="async"
                      width={1100}
                      height={1100}
                      className="aspect-[4/3] size-full object-cover lg:aspect-auto lg:max-h-[520px]"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">{s.name}</h3>
                    <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink-soft md:text-lg">{s.overview}</p>

                    <h4 className="mt-8 text-sm font-bold text-ink">{s.scopeLabel}</h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {s.scope.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-fire-50">
                            <Check className="size-3.5 text-fire-600" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <ButtonLink
                        href={whatsappUrl(serviceEnquiryMessage(s.name))}
                        external
                        variant="primary"
                        size="lg"
                        aria-label={`Enquire now about ${s.name} on WhatsApp (opens in a new tab)`}
                      >
                        <WhatsAppIcon className="size-4.5" />
                        Enquire Now
                      </ButtonLink>
                      <ButtonLink href={business.phoneUri} variant="outline" size="lg">
                        <Phone className="size-4.5 text-fire-600" aria-hidden="true" />
                        Call SK Fire Protection
                      </ButtonLink>
                    </div>

                    <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                      <a href={business.phoneUri} className="inline-flex items-center gap-1.5 hover:text-brand-700">
                        <Phone className="size-3.5" aria-hidden="true" />
                        {business.phoneDisplay}
                      </a>
                      <a
                        href={mailtoHref(`Enquiry: ${s.name}`)}
                        className="inline-flex items-center gap-1.5 break-all hover:text-brand-700"
                      >
                        <Mail className="size-3.5" aria-hidden="true" />
                        {business.email}
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}

        <div className="mt-20 border-t border-line pt-12">
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">How a turnkey project runs</h3>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {projectSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.07} className="relative">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-extrabold text-brand-700"
                  >
                    {i + 1}
                  </span>
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
                </div>
                <p className="mt-4 font-display text-base font-bold text-ink">{step.title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
