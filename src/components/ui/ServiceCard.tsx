import { ArrowRight } from 'lucide-react'

import type { Service } from '../../data/services'
import { openServiceDetails } from '../../utils/contact'
import { serviceEnquiryMessage, whatsappUrl } from '../../utils/whatsapp'
import { ButtonLink } from './Button'
import { WhatsAppIcon } from './WhatsAppButton'

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  const headingId = `card-${service.slug}`
  return (
    <article
      aria-labelledby={headingId}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={service.card.src}
          alt={service.card.alt}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-fire-50 text-fire-600">
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 id={headingId} className="text-lg font-bold tracking-tight">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{service.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <ButtonLink
            href={whatsappUrl(serviceEnquiryMessage(service.name))}
            external
            variant="primary"
            size="md"
            aria-label={`Enquire now about ${service.name} on WhatsApp (opens in a new tab)`}
          >
            <WhatsAppIcon className="size-4" />
            Enquire Now
          </ButtonLink>
          <a
            href={`#${service.slug}`}
            onClick={(e) => {
              e.preventDefault()
              openServiceDetails(service.slug)
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Learn More
            <span className="sr-only"> about {service.name}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
