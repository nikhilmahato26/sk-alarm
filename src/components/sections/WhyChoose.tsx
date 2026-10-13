import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, Layers, MapPin, PhoneCall, ShieldCheck, Wrench } from 'lucide-react'

import corridorImage from '../../assets/images/corridor-smoke-detector.webp'
import { business } from '../../config/business'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const points: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: 'Dedicated fire protection services',
    body: 'The business lists four core fire protection service categories.',
  },
  {
    icon: Layers,
    title: 'Multiple system categories',
    body: 'Enquire about hydrant, sprinkler and alarm systems in one conversation.',
  },
  {
    icon: Wrench,
    title: 'Maintenance services',
    body: 'Discuss maintenance requirements for fire protection systems.',
  },
  {
    icon: MapPin,
    title: 'Local contact',
    body: `Contact the business in ${business.locationShort}.`,
  },
  {
    icon: PhoneCall,
    title: 'Direct communication',
    body: 'Call or email to discuss your requirements. The co-owners lead project work on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Clear service enquiries',
    body: 'Send a message describing your property, project or service needs.',
  },
]

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="section-pad bg-mist">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-title"
            title="Why contact SK Fire Protection?"
            intro="Electrical, fire fighting and alarm work handled by one team, with the owners directly involved."
          />
          <div className="mt-8 hidden overflow-hidden rounded-2xl lg:block">
            <img
              src={corridorImage}
              alt="Building corridor with a ceiling-mounted smoke detector"
              loading="lazy"
              decoding="async"
              width={1000}
              height={1333}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 0.06} className="border-t border-line py-7">
              <Icon className="size-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
