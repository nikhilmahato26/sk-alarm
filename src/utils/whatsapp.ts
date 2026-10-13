import { business } from '../config/business'

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello SK Fire Protection, I would like to enquire about your fire protection services. Please contact me to discuss my requirements.'

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function serviceEnquiryMessage(serviceName: string) {
  return `Hello SK Fire Protection,\n\nI would like to enquire about the following service: ${serviceName}.\n\nPlease contact me to discuss the requirements.`
}

export type EnquiryDetails = {
  service: string
  propertyType?: string
  location?: string
  name: string
  phone: string
  email?: string
  company?: string
  message: string
}

const orDash = (value?: string) => (value && value.trim() ? value.trim() : '-')

export function enquiryMessage(d: EnquiryDetails) {
  const lines = [
    'Hello SK Fire Protection,',
    '',
    'I would like to enquire about the following service:',
    '',
    `Service Required: ${d.service}`,
    `Property / Project Type: ${orDash(d.propertyType)}`,
    `Project Location: ${orDash(d.location)}`,
    `Name: ${d.name.trim()}`,
    `Phone: ${d.phone.trim()}`,
  ]
  if (d.email?.trim()) lines.push(`Email: ${d.email.trim()}`)
  if (d.company?.trim()) lines.push(`Company / Organization: ${d.company.trim()}`)
  lines.push(`Message: ${d.message.trim()}`, '', 'Please contact me to discuss the requirements.')
  return lines.join('\n')
}
