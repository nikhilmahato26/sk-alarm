import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Phone } from 'lucide-react'

import heroImage from '../../assets/images/hero-hydrant-portrait.webp'
import insetImage from '../../assets/images/alarm-call-point.webp'
import { phoneNumbers } from '../../config/business'
import { whatsappUrl } from '../../utils/whatsapp'
import { ButtonLink } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Gentle depth: the photo drifts slower than the page while the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        }

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-900 text-white"
    >
      {/* Desktop: full-height photo bleeding off the right edge */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 inset-y-[-6%]">
          <motion.img
            src={heroImage}
            alt=""
            width={1100}
            height={1125}
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease }}
            className="size-full object-cover object-[28%_center]"
          />
        </motion.div>
        {/* Fade the photo into the navy so the headline column stays clean */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-900 via-brand-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-900/70 to-transparent" />
      </div>

      <div className="container-page relative grid items-center gap-10 pt-12 pb-14 sm:pt-16 lg:min-h-160 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:py-24 xl:min-h-170">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0)}
            className="mb-6 inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-white/80 uppercase"
          >
            <span aria-hidden="true" className="flex h-1 w-8 overflow-hidden rounded-full">
              <span className="w-3/5 bg-fire-600" />
              <span className="w-2/5 bg-brand-500" />
            </span>
            SK Fire Protection · Ludhiana, Punjab
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            id="hero-title"
            className="text-[2.2rem] leading-[1.06] font-extrabold tracking-[-0.035em] text-white sm:text-5xl lg:text-[2.9rem] xl:text-[3.4rem]"
          >
            Complete fire protection solutions for your <span className="text-[#5cb8ee]">safety</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/80">
            Fire hydrant, sprinkler and alarm systems, plus fire maintenance services, from SK Fire Protection in
            Ludhiana, Punjab.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl()}
              external
              variant="fire"
              size="lg"
              className="shadow-[0_12px_28px_-12px_rgb(213_43_30/0.55)]"
              aria-label="Enquire now on WhatsApp (opens in a new tab)"
            >
              <WhatsAppIcon className="size-4.5" />
              Enquire Now
            </ButtonLink>
            <div className="flex h-12 items-stretch overflow-hidden rounded-lg border border-white/25 bg-white/5 text-[15px] font-semibold text-white sm:h-13">
              <span className="flex items-center pl-4">
                <Phone className="size-4.5 text-[#ff8a7f]" aria-hidden="true" />
              </span>
              {phoneNumbers.map((p, i) => (
                <a
                  key={p.uri}
                  href={p.uri}
                  className={`flex flex-1 items-center justify-center px-4 whitespace-nowrap transition-colors hover:bg-white/10 sm:flex-none ${
                    i > 0 ? 'border-l border-white/20' : ''
                  }`}
                >
                  {p.display}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop inset: a second system (alarm call point) layered over the hydrant photo */}
        <div className="relative hidden h-full lg:block">
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.55 }}
            className="absolute bottom-0 left-4 w-52 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgb(4_20_33/0.8)] ring-4 ring-brand-900 xl:-left-6 xl:w-60"
          >
            <img
              src={insetImage}
              alt="Red manual fire alarm call point on a white wall"
              width={1000}
              height={750}
              decoding="async"
              className="aspect-4/3 w-full object-cover"
            />
          </motion.figure>
        </div>

        {/* Mobile and tablet: photos below the copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="relative mb-4 lg:hidden"
        >
          <img
            src={heroImage}
            alt="Red fire hydrant landing valves with brass outlets and red hand wheels"
            width={1100}
            height={1125}
            decoding="async"
            className="aspect-4/3 w-full rounded-2xl object-cover object-[30%_40%] sm:aspect-16/10"
          />
          <img
            src={insetImage}
            alt="Red manual fire alarm call point on a white wall"
            width={1000}
            height={750}
            decoding="async"
            className="absolute -bottom-5 left-4 aspect-4/3 w-32 rounded-xl object-cover ring-4 ring-brand-900 sm:w-44"
          />
        </motion.div>
      </div>
    </section>
  )
}
