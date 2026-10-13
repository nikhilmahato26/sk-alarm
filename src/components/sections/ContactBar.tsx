import type { LucideIcon } from 'lucide-react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'

import { business } from '../../config/business'

type Item = { icon: LucideIcon; label: string; value: string; href?: string; extra?: { value: string; href: string } }

const items: Item[] = [
  {
    icon: Phone,
    label: 'Phone',
    value: business.phoneDisplay,
    href: business.phoneUri,
    extra: { value: business.phone2Display, href: business.phone2Uri },
  },
  { icon: MapPin, label: 'Location', value: business.locationShort },
  { icon: Globe, label: 'Service area', value: business.serviceArea },
  { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
]

export function ContactBar() {
  return (
    <section aria-label="Quick contact details" className="border-t border-white/10 bg-brand-900 text-white">
      <ul className="container-page grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-[1fr_1fr_1.1fr_1.5fr] lg:divide-x">
        {items.map(({ icon: Icon, label, value, href, extra }) => {
          const content = (
            <>
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium tracking-wide text-white/70">{label}</span>
                <span className="block text-[15px] font-semibold break-all sm:break-normal">{value}</span>
              </span>
            </>
          )
          if (extra) {
            return (
              <li key={label} className="py-4 sm:py-5 lg:px-6 lg:first:pl-0">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="size-5 text-white" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium tracking-wide text-white/70">{label}</span>
                    <span className="flex flex-col text-[15px] leading-snug font-semibold">
                      <a href={href} className="w-fit rounded-sm hover:text-brand-100">
                        {value}
                      </a>
                      <a href={extra.href} className="w-fit rounded-sm hover:text-brand-100">
                        {extra.value}
                      </a>
                    </span>
                  </span>
                </div>
              </li>
            )
          }
          return (
            <li key={label} className="py-4 sm:py-5 lg:px-6 lg:first:pl-0">
              {href ? (
                <a href={href} className="flex items-center gap-3.5 rounded-md hover:text-brand-100">
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-3.5">{content}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
