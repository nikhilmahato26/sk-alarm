import { BellRing, ClipboardCheck, Droplets, Info } from 'lucide-react'

import smokeDetector from '../../assets/images/smoke-detector.webp'
import sprinklerCeiling from '../../assets/images/sprinkler-ceiling.webp'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function FireSafetyAwareness() {
  return (
    <section id="fire-safety-awareness" aria-labelledby="awareness-title" className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading
          id="awareness-title"
          title="Fire safety starts with the right systems"
          intro="A short, general overview of how the main parts of a fire protection setup fit together."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          {/* Detection: large image tile */}
          <Reveal as="article" className="relative min-h-[420px] overflow-hidden rounded-2xl lg:row-span-2">
            <img
              src={smokeDetector}
              alt="Ceiling-mounted smoke detector"
              loading="lazy"
              decoding="async"
              width={1000}
              height={1000}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/55 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-9">
              <BellRing className="size-7" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">Fire detection</h3>
              <p className="mt-2 max-w-[48ch] leading-relaxed text-white/90">
                Fire alarm systems are intended to help identify potential fire incidents and alert the people
                in a building, using detectors, call points and a central panel.
              </p>
            </div>
          </Reveal>

          {/* Suppression: split tile with image */}
          <Reveal as="article" delay={0.08} className="grid overflow-hidden rounded-2xl bg-mist sm:grid-cols-[1fr_0.8fr]">
            <div className="p-7 sm:p-8">
              <Droplets className="size-7 text-fire-600" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tight">Fire suppression infrastructure</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Hydrant and sprinkler systems are components of fire protection infrastructure that deliver water
                where it is needed.
              </p>
            </div>
            <img
              src={sprinklerCeiling}
              alt="Fire sprinkler head in a ceiling"
              loading="lazy"
              decoding="async"
              width={1100}
              height={1100}
              className="hidden size-full object-cover sm:block"
            />
          </Reveal>

          {/* Maintenance: tinted tile */}
          <Reveal as="article" delay={0.14} className="rounded-2xl bg-brand-600 p-7 text-white sm:p-8">
            <ClipboardCheck className="size-7" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-extrabold tracking-tight text-white">System maintenance</h3>
            <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-white/90">
              Fire protection equipment needs appropriate inspection and maintenance, following applicable
              requirements and the manufacturer's guidance.
            </p>
          </Reveal>
        </div>

        <p className="mt-8 flex max-w-[80ch] gap-2.5 text-sm leading-relaxed text-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          This information is general. It is not a substitute for a professional fire safety assessment, engineering
          advice or guidance from your local authority.
        </p>
      </div>
    </section>
  )
}
