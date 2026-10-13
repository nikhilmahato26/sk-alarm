import { motion, useReducedMotion } from 'motion/react'
import { Phone } from 'lucide-react'

import heroImage from '../../assets/images/hero-hydrant-valves.webp'
import { business } from '../../config/business'
import { whatsappUrl } from '../../utils/whatsapp'
import { ButtonLink } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        }

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      {/* Soft brand wash behind the image column, desktop only */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[34%] bg-mist lg:block" />

      <div className="container-page relative grid items-center gap-10 pt-10 pb-14 md:pt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-20 xl:py-24">
        <div>
          <motion.p
            {...rise(0)}
            className="mb-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-fire-600 uppercase"
          >
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-fire-600" />
            SK Fire Protection · Ludhiana, Punjab
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            id="hero-title"
            className="max-w-[22ch] text-[2.3rem] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-[2.9rem] xl:text-[3.3rem]"
          >
            Complete fire protection solutions for your <span className="text-brand-600">safety</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            Fire hydrant, sprinkler and alarm systems, plus fire maintenance services, from SK Fire Protection in
            Ludhiana, Punjab.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl()}
              external
              variant="primary"
              size="lg"
              aria-label="Enquire now on WhatsApp (opens in a new tab)"
            >
              <WhatsAppIcon className="size-4.5" />
              Enquire Now
            </ButtonLink>
            <ButtonLink href={business.phoneUri} variant="outline" size="lg">
              <Phone className="size-4.5 text-fire-600" aria-hidden="true" />
              Call Us: {business.phoneDisplay}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <img
              src={heroImage}
              alt="Red fire hydrant landing valves with brass outlets and red hand wheels outside a building"
              width={1400}
              height={959}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-[50%_25%] lg:aspect-[5/4.2]"
            />
          </div>
          {/* Brand accent bar echoing the logo swoosh */}
          <div aria-hidden="true" className="absolute -bottom-3 left-6 flex h-1.5 w-40 overflow-hidden rounded-full">
            <span className="w-3/5 bg-fire-600" />
            <span className="w-2/5 bg-brand-500" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
