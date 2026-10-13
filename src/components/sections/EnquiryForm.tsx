import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CircleAlert, CircleCheck, Loader, Mail, Phone, RotateCcw, Send } from 'lucide-react'

import { business } from '../../config/business'
import { mailtoHref } from '../../utils/contact'
import { enquiryMessage, whatsappUrl } from '../../utils/whatsapp'
import { Button, ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Other'] as const
const serviceOptions = [...business.services, 'Multiple Services', 'Other Enquiry'] as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(80, 'Please keep the name under 80 characters.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter a phone number so we can reach you.')
    .refine((v) => /^\+?[\d\s-]+$/.test(v), 'Use digits only, with an optional + country code.')
    .refine((v) => {
      const digits = v.replace(/\D/g, '').length
      return digits >= 10 && digits <= 13
    }, 'Please enter a 10-digit mobile number, with or without +91.'),
  email: z
    .string()
    .trim()
    .refine((v) => v === '' || emailPattern.test(v), 'Please enter a valid email address, or leave it blank.'),
  company: z.string().trim().max(100),
  propertyType: z.string(),
  service: z.string().refine((v) => (serviceOptions as readonly string[]).includes(v), 'Please choose the service you need.'),
  location: z.string().trim().max(120),
  message: z
    .string()
    .trim()
    .min(10, 'Please describe your requirement in a few words (at least 10 characters).')
    .max(1000, 'Please keep the message under 1000 characters.'),
})

type FormValues = z.infer<typeof schema>

const defaults: FormValues = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  propertyType: '',
  service: '',
  location: '',
  message: '',
}

type Result = { status: 'opened' | 'blocked'; message: string; service: string }

const inputBase =
  'block w-full rounded-lg border bg-white px-3.5 text-[15px] text-ink placeholder:text-[#6b7580] transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30 focus:outline-none'

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-fire-600" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-sm font-medium text-fire-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function EnquiryForm() {
  const uid = useId()
  const reduce = useReducedMotion()
  const [result, setResult] = useState<Result | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults, mode: 'onTouched' })

  const fid = (name: keyof FormValues) => `${uid}-${name}`
  const a11y = (name: keyof FormValues, hint?: boolean) => ({
    id: fid(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fid(name)}-error` : hint ? `${fid(name)}-hint` : undefined,
  })
  const border = (name: keyof FormValues) => (errors[name] ? 'border-fire-600' : 'border-[#c9d0d6]')

  const onSubmit = (values: FormValues) => {
    const message = enquiryMessage({ ...values, name: values.fullName })
    // Nothing is stored: the enquiry is handed to WhatsApp, with phone and email as fallbacks.
    // ("noopener" in the features string would make window.open return null, so detach manually.)
    const win = window.open(whatsappUrl(message), '_blank')
    if (win) win.opener = null
    setResult({ status: win === null ? 'blocked' : 'opened', message, service: values.service })
  }

  const startOver = () => {
    reset(defaults)
    setResult(null)
  }

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="section-pad bg-brand-50">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="enquiry-title"
            eyebrow="Project enquiry"
            title="Discuss your fire protection requirements"
            intro="Tell us about your property or project, and contact SK Fire Protection to discuss the services you require."
          />

          <div className="mt-8 space-y-3">
            <a
              href={business.phoneUri}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-colors hover:border-brand-500"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-fire-50 text-fire-600">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">Call SK Fire Protection</span>
                <span className="block font-display text-lg font-bold text-ink">{business.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={mailtoHref('Fire protection enquiry')}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-colors hover:border-brand-500"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email Us</span>
                <span className="block font-semibold break-all text-ink">{business.email}</span>
              </span>
            </a>
          </div>

          <p className="mt-6 max-w-[48ch] text-sm leading-relaxed text-muted">
            This website does not store your details. When you send the form, your enquiry opens in WhatsApp, ready
            for you to send.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {result ? (
              <motion.div
                key="result"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                role="status"
                aria-live="polite"
                className="flex flex-col items-start py-4"
              >
                {result.status === 'opened' ? (
                  <CircleCheck className="size-10 text-[#1f8a4c]" aria-hidden="true" />
                ) : (
                  <CircleAlert className="size-10 text-fire-600" aria-hidden="true" />
                )}
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight">
                  {result.status === 'opened' ? 'Your enquiry is ready in WhatsApp' : 'WhatsApp did not open'}
                </h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-muted">
                  {result.status === 'opened'
                    ? 'Press send in WhatsApp to deliver your message. If WhatsApp did not open, use one of the options below.'
                    : 'Your browser may have blocked the new window. Use one of the options below to send your enquiry.'}
                </p>

                <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={whatsappUrl(result.message)} external variant="primary" size="lg">
                    <WhatsAppIcon className="size-4.5" />
                    Open WhatsApp
                  </ButtonLink>
                  <ButtonLink
                    href={mailtoHref(`Enquiry: ${result.service}`, result.message)}
                    variant="outline"
                    size="lg"
                  >
                    <Mail className="size-4.5 text-fire-600" aria-hidden="true" />
                    Email Us
                  </ButtonLink>
                  <ButtonLink href={business.phoneUri} variant="outline" size="lg">
                    <Phone className="size-4.5 text-fire-600" aria-hidden="true" />
                    Call {business.phoneDisplay}
                  </ButtonLink>
                </div>

                <button
                  type="button"
                  onClick={startOver}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Start a new enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-describedby={`${uid}-required-note`}
                className="grid gap-5 sm:grid-cols-2"
              >
                <p id={`${uid}-required-note`} className="text-sm text-muted sm:col-span-2">
                  Fields marked <span className="text-fire-600">*</span> are required.
                </p>

                <Field id={fid('fullName')} label="Full Name" required error={errors.fullName?.message}>
                  <input
                    {...register('fullName')}
                    {...a11y('fullName')}
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    className={`${inputBase} h-12 ${border('fullName')}`}
                  />
                </Field>

                <Field
                  id={fid('phone')}
                  label="Phone Number"
                  required
                  error={errors.phone?.message}
                  hint="10-digit mobile number"
                >
                  <input
                    {...register('phone')}
                    {...a11y('phone', true)}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    aria-required="true"
                    className={`${inputBase} h-12 ${border('phone')}`}
                  />
                </Field>

                <Field id={fid('email')} label="Email Address" error={errors.email?.message}>
                  <input
                    {...register('email')}
                    {...a11y('email')}
                    type="email"
                    autoComplete="email"
                    className={`${inputBase} h-12 ${border('email')}`}
                  />
                </Field>

                <Field id={fid('company')} label="Company / Organization" error={errors.company?.message}>
                  <input
                    {...register('company')}
                    {...a11y('company')}
                    type="text"
                    autoComplete="organization"
                    className={`${inputBase} h-12 ${border('company')}`}
                  />
                </Field>

                <Field id={fid('propertyType')} label="Property / Project Type">
                  <select
                    {...register('propertyType')}
                    {...a11y('propertyType')}
                    className={`${inputBase} h-12 ${border('propertyType')}`}
                  >
                    <option value="">Select a type</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={fid('service')} label="Service Required" required error={errors.service?.message}>
                  <select
                    {...register('service')}
                    {...a11y('service')}
                    aria-required="true"
                    className={`${inputBase} h-12 ${border('service')}`}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    id={fid('location')}
                    label="Project Location"
                    error={errors.location?.message}
                    hint="For example: Focal Point, Ludhiana"
                  >
                    <input
                      {...register('location')}
                      {...a11y('location', true)}
                      type="text"
                      autoComplete="address-level2"
                      className={`${inputBase} h-12 ${border('location')}`}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field id={fid('message')} label="Message" required error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      {...a11y('message')}
                      rows={5}
                      aria-required="true"
                      className={`${inputBase} resize-y py-3 ${border('message')}`}
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" variant="fire" size="lg" disabled={isSubmitting} className="sm:min-w-48">
                    {isSubmitting ? (
                      <Loader className="size-4.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    ) : (
                      <Send className="size-4.5" aria-hidden="true" />
                    )}
                    Send Enquiry
                  </Button>
                  <p className="text-sm text-muted">Opens WhatsApp with your details filled in.</p>
                </div>

                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="text-sm font-medium text-fire-700 sm:col-span-2">
                    Please check the highlighted fields and try again.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
