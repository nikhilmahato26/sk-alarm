import { HardHat } from 'lucide-react'

import { business } from '../../config/business'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const facts = [
  { value: business.yearsOfFieldWork, label: `Years of field work, since ${business.fieldWorkSince}` },
  { value: business.completedProjects, label: 'Completed electrical and fire projects' },
  { value: String(business.registeredSince), label: 'Registered as a main contractor' },
]

const timeline = [
  {
    period: `${business.fieldWorkSince} to 2022`,
    title: 'Foundation years',
    body: 'Hands-on field work in pipe fitting, cabling and sub-contract projects.',
  },
  {
    period: String(business.registeredSince),
    title: 'Registered as SK Fire Protection',
    body: 'Registered as a main contractor with direct bidding capacity.',
  },
  {
    period: 'Today',
    title: 'Full project operations',
    body: 'Structured site management with dedicated technicians and supervisors.',
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad bg-white">
      <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" title="Your fire protection service partner" />
          <div className="mt-6 max-w-[62ch] space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>
              SK Fire Protection is based in Ludhiana, Punjab, and provides fire protection system services across India. Our listed services
              include fire hydrant systems, fire sprinkler systems, fire alarm systems, and fire maintenance services.
            </p>
            <p>
              Explore our services and contact us to discuss your fire protection requirements. Our team can provide
              further information about the services available for your property or project.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-extrabold tracking-tight text-brand-600">
                    {f.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-muted">{f.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl bg-mist p-6 sm:p-8">
          <h3 className="text-lg font-bold">From sub-contractor to main contractor</h3>
          <ol className="relative mt-6 space-y-8 border-l-2 border-line pl-7">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.08} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 -left-[37px] size-4 rounded-full border-4 border-mist ${
                    i === 1 ? 'bg-fire-600' : 'bg-brand-500'
                  }`}
                />
                <p className={`text-sm font-bold ${i === 1 ? 'text-fire-600' : 'text-brand-700'}`}>{t.period}</p>
                <p className="mt-1 font-display text-base font-bold text-ink">{t.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{t.body}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-8 flex gap-3 rounded-lg border border-line bg-white p-4">
            <HardHat className="mt-0.5 size-5 shrink-0 text-fire-600" aria-hidden="true" />
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Site teams include supervisors, industrial electricians, pipe fitters, welders and panel technicians.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
