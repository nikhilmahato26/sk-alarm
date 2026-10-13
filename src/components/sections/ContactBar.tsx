import type { LucideIcon } from 'lucide-react'
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'

import { business } from '../../config/business'

type Item = { icon: LucideIcon; label: string; value: string; href?: string }

const items: Item[] = [
  { icon: Phone, label: 'Phone', value: business.phoneDisplay, href: business.phoneUri },
  { icon: MapPin, label: 'Location', value: business.locationShort },
  { icon: ShieldCheck, label: 'Services', value: 'Fire Protection Systems' },
  { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
]

export function ContactBar() {
  return (
    <section aria-label="Quick contact details" className="border-y border-line bg-brand-900 text-white">
      <ul className="container-page grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <>
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium tracking-wide text-white/70">{label}</span>
                <span className="block truncate text-[15px] font-semibold">{value}</span>
              </span>
            </>
          )
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
