/**
 * Central business configuration.
 *
 * Every contact detail on the site is read from here. Update this file
 * (not individual components) when the business confirms a change.
 */

export type Person = {
  name: string
  role: string
  focus: string
  phoneDisplay: string
  phoneE164: string
}

export const business = {
  name: 'SK Fire Protection',
  tagline: 'Fire protection systems & maintenance services',

  /** Primary contact number, shown across the site. */
  phoneDisplay: '98152-62757',
  phoneE164: '+919815262757',
  phoneUri: 'tel:+919815262757',

  /**
   * WhatsApp number that receives every enquiry (country code + number, digits only).
   * All WhatsApp buttons and the enquiry form send to this number.
   */
  whatsappNumber: '919646396707',
  whatsappDisplay: '96463-96707',

  /** Primary email, used for every mailto link, the enquiry fallback and structured data. */
  email: 'director@skfireprotection.online',

  /**
   * Secondary email preserved exactly as originally supplied.
   * NOTE: the domain reads "gamil.com", which may be a typo of "gmail.com".
   */
  secondaryEmail: 'shravankushwaha65@gamil.com',

  address: {
    street: 'St. No. 8, Near Universal Convent International School, Captain Nagar, Lohara',
    city: 'Ludhiana',
    postalCode: '141016',
    region: 'Punjab',
    country: 'India',
    countryCode: 'IN',
  },
  addressLine:
    'St. No. 8, Near Universal Convent International School, Captain Nagar, Lohara, Ludhiana - 141016, Punjab, India.',
  locationShort: 'Ludhiana, Punjab',
  location: 'Ludhiana, Punjab, India',

  /** From the SK Fire Protection company profile. */
  gstin: '03BFMPK5275F1ZF',
  fieldWorkSince: 2014,
  yearsOfFieldWork: '10+',
  registeredSince: 2023,
  completedProjects: '12+',

  people: [
    {
      name: 'Shravan Kumar',
      role: 'Co-Owner & Technical Lead',
      focus: 'Electrical design standards, sprinkler work and testing.',
      phoneDisplay: '98152-62757',
      phoneE164: '+919815262757',
    },
    {
      name: 'Prabhdeep Singh',
      role: 'Co-Owner & Operations Director',
      focus: 'Site deployment, workforce management and client coordination.',
      phoneDisplay: '96463-96707',
      phoneE164: '+919646396707',
    },
  ] satisfies Person[],

  services: [
    'Fire Hydrant System',
    'Fire Sprinkler System',
    'Fire Alarm System',
    'Fire Maintenance Service',
  ],

  /** Set to an imported image path (e.g. from src/assets/logo) to replace the text wordmark. */
  logoSrc: null as string | null,

  /** Live domain, used for canonical/OG URLs. Leave empty until the domain is confirmed. */
  siteUrl: '',
} as const

export const fullAddressQuery = `${business.name}, ${business.addressLine}`
