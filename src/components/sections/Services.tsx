import { Zap } from 'lucide-react'

import { services } from '../../data/services'
import { serviceEnquiryMessage, whatsappUrl } from '../../utils/whatsapp'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad bg-mist">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Fire protection systems & maintenance"
          title="Our fire protection services"
          intro="Four service categories for properties and projects. Choose a service to enquire, or read more about it below."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 0.07}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Zap className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Also available: electrical contracting</h3>
                <p className="mt-1.5 max-w-[68ch] text-[15px] leading-relaxed text-muted">
                  LT/HT distribution panels, cable tray systems and industrial earthing networks, so electrical, fire
                  fighting and alarm work can be managed by one team.
                </p>
              </div>
            </div>
            <ButtonLink
              href={whatsappUrl(serviceEnquiryMessage('Electrical Contracting'))}
              external
              variant="subtle"
              size="md"
              className="self-start md:self-center"
              aria-label="Enquire now about electrical contracting on WhatsApp (opens in a new tab)"
            >
              <WhatsAppIcon className="size-4" />
              Enquire Now
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
