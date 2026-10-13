import type { LucideIcon } from 'lucide-react'
import { BellRing, Droplets, ShowerHead, Wrench } from 'lucide-react'

import hydrantCard from '../assets/images/hydrant-hose-reel.webp'
import hydrantDetail from '../assets/images/hydrant-hose-cabinet.webp'
import sprinklerCard from '../assets/images/sprinkler-head.webp'
import sprinklerDetail from '../assets/images/sprinkler-ceiling.webp'
import alarmCard from '../assets/images/alarm-call-point.webp'
import alarmDetail from '../assets/images/alarm-control-panel.webp'
import maintenanceCard from '../assets/images/maintenance-extinguisher.webp'
import maintenanceDetail from '../assets/images/maintenance-cabinet.webp'

export type Service = {
  slug: string
  name: string
  icon: LucideIcon
  summary: string
  overview: string
  /** Scope items taken from the SK Fire Protection company profile. */
  scopeLabel: string
  scope: string[]
  card: { src: string; alt: string }
  detail: { src: string; alt: string }
}

export const services: Service[] = [
  {
    slug: 'fire-hydrant-system',
    name: 'Fire Hydrant System',
    icon: Droplets,
    summary:
      'Fire hydrant systems are an important part of fire protection infrastructure. Contact SK Fire Protection to discuss your fire hydrant system requirements.',
    overview:
      'A hydrant system supplies water to hose connections across a site. SK Fire Protection handles hydrant pipe networks as part of its fire fighting work. Share your site details and we can discuss what your property or project needs.',
    scopeLabel: 'Hydrant work in our scope',
    scope: ['Hydrant ring mains', 'Diesel pump sets', 'Hose reels', 'Hydrostatic pressure testing'],
    card: { src: hydrantCard, alt: 'Red fire hose reel with valve mounted on a white wall' },
    detail: { src: hydrantDetail, alt: 'Fire hose reel cabinet and hydrant valves at a building entrance' },
  },
  {
    slug: 'fire-sprinkler-system',
    name: 'Fire Sprinkler System',
    icon: ShowerHead,
    summary:
      'Explore fire sprinkler system services for properties and projects requiring fire protection infrastructure. Contact us to discuss your requirements.',
    overview:
      'Sprinkler work covers the overhead pipe network and the sprinkler heads it feeds. Tell us about your building and layout, and we can discuss the sprinkler work involved.',
    scopeLabel: 'Sprinkler work in our scope',
    scope: ['Overhead sprinkler lines', 'Steel riser mains', 'Pipe fitting and welding', 'Hydrostatic pressure testing'],
    card: { src: sprinklerCard, alt: 'Close-up of a brass fire sprinkler head with a fusible link' },
    detail: { src: sprinklerDetail, alt: 'Concealed fire sprinkler head set into a white ceiling' },
  },
  {
    slug: 'fire-alarm-system',
    name: 'Fire Alarm System',
    icon: BellRing,
    summary:
      'Fire alarm systems help alert occupants to potential fire incidents. Enquire about fire alarm system requirements for your property or project.',
    overview:
      'An alarm system links detectors and call points to a central control panel that raises the alert. SK Fire Protection works with addressable alarm setups. Contact us to discuss your property.',
    scopeLabel: 'Alarm work in our scope',
    scope: ['Addressable smoke detectors', 'Manual call points', 'Central control panel setup', 'Alarm cabling'],
    card: { src: alarmCard, alt: 'Red manual fire alarm call point on a white wall' },
    detail: { src: alarmDetail, alt: 'Wall-mounted fire alarm control panel with keypad and display' },
  },
  {
    slug: 'fire-maintenance-service',
    name: 'Fire Maintenance Service',
    icon: Wrench,
    summary:
      'Contact SK Fire Protection to discuss fire protection system maintenance requirements and the services available for your installation.',
    overview:
      'Installed fire protection equipment needs periodic attention. Tell us what is installed at your site and we can discuss the maintenance services available for it.',
    scopeLabel: 'Discuss maintenance for',
    scope: ['Fire hydrant systems', 'Fire sprinkler systems', 'Fire alarm systems'],
    card: { src: maintenanceCard, alt: 'Wall-mounted fire extinguisher inside a commercial building' },
    detail: { src: maintenanceDetail, alt: 'Fire extinguisher stored in a recessed glass-front wall cabinet' },
  },
]

export const projectSteps = [
  { title: 'Site assessment', body: 'Evaluating electrical loads and fire hazard zones.' },
  { title: 'Procurement', body: 'Sourcing cables, pipes, pumps and alarm equipment.' },
  { title: 'Installation', body: 'Fitting electrical panels and fire piping.' },
  { title: 'Handover', body: 'Hydrostatic tests, load checks and final sign-off.' },
]
