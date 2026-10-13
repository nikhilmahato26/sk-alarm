import { business, fullAddressQuery } from '../config/business'

export const telHref = (e164: string = business.phoneE164) => `tel:${e164}`

export function mailtoHref(subject?: string, body?: string) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${business.email}${query ? `?${query}` : ''}`
}

/** Google Maps search link built from the supplied address (no invented coordinates). */
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressQuery)}`

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddressQuery)}&output=embed`

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

/** Lets "Learn More" links open a specific tab in the service details section. */
export const SELECT_SERVICE_EVENT = 'sk:select-service'

export function openServiceDetails(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: slug }))
  history.replaceState(null, '', `#${slug}`)
  scrollToId('fire-safety-systems')
}
