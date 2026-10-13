import { Helmet } from 'react-helmet-async'

import { business } from '../config/business'
import { services } from '../data/services'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { ContactBar } from '../components/sections/ContactBar'
import { EnquiryForm } from '../components/sections/EnquiryForm'
import { FireSafetyAwareness } from '../components/sections/FireSafetyAwareness'
import { Hero } from '../components/sections/Hero'
import { OurWork } from '../components/sections/OurWork'
import { ServiceDetails } from '../components/sections/ServiceDetails'
import { Services } from '../components/sections/Services'
import { WhyChoose } from '../components/sections/WhyChoose'

const title = 'SK Fire Protection | Fire Hydrant, Sprinkler & Alarm Systems in Ludhiana'
const description =
  'SK Fire Protection, based in Ludhiana, Punjab, provides fire hydrant, fire sprinkler, fire alarm and fire maintenance services for projects across India.'

// LocalBusiness data built only from supplied details: no ratings, reviews, hours or coordinates.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  description,
  telephone: business.phoneE164,
  contactPoint: [business.phoneE164, `+${business.whatsappNumber}`].map((telephone) => ({
    '@type': 'ContactPoint',
    telephone,
    contactType: 'customer service',
    areaServed: 'IN',
  })),
  email: business.email,
  taxID: business.gstin,
  foundingDate: String(business.registeredSince),
  ...(business.siteUrl ? { url: business.siteUrl } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.countryCode,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  founder: business.people.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fire protection services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.summary },
    })),
  },
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_IN" />
        {business.siteUrl && <link rel="canonical" href={business.siteUrl} />}
        {business.siteUrl && <meta property="og:url" content={business.siteUrl} />}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Hero />
      <ContactBar />
      <About />
      <Services />
      <ServiceDetails />
      <OurWork />
      <WhyChoose />
      <FireSafetyAwareness />
      <EnquiryForm />
      <Contact />
    </>
  )
}
