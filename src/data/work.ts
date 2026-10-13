/**
 * Photos from SK Fire Protection project sites (supplied by the business).
 * Source files: src/assets/work/work-NN.webp (full size) and work-NN-thumb.webp (grid).
 * To add a photo: export it with the same naming and add an entry below.
 */

export type WorkCategory = 'sprinkler' | 'facility'

export const workCategories: { id: 'all' | WorkCategory; label: string }[] = [
  { id: 'all', label: 'All photos' },
  { id: 'sprinkler', label: 'Sprinkler pipework' },
  { id: 'facility', label: 'Clean-room facilities' },
]

const urls = import.meta.glob<string>('../assets/work/*.webp', { eager: true, import: 'default' })
const url = (file: string) => urls[`../assets/work/${file}`]

type Meta = { alt: string; category: WorkCategory; portrait?: boolean; narrow?: boolean }

const meta: Meta[] = [
  { alt: 'Sprinkler head fitted to a red branch pipe, next to a ceiling smoke detector', category: 'sprinkler' },
  { alt: 'Clean-room corridor with blue doors and pass boxes, with a team member on site', category: 'facility', portrait: true },
  { alt: 'Red sprinkler mains and branch lines installed across an exposed ceiling', category: 'sprinkler' },
  { alt: 'Blue clean-room door with a door closer and a pressure gauge mounted above', category: 'facility', portrait: true },
  { alt: 'Cable tray and red sprinkler pipes running above an open-plan floor', category: 'sprinkler' },
  { alt: 'Clean-room ceiling with a light panel, air vent and smoke detector', category: 'facility', portrait: true },
  { alt: 'Red sprinkler main running across a large commercial floor', category: 'sprinkler', portrait: true },
  { alt: 'Stainless steel pass box set into a clean-room wall', category: 'facility', portrait: true },
  { alt: 'Sprinkler pipe network and lighting across an open floor', category: 'sprinkler' },
  { alt: 'Long clean-room corridor with blue doors', category: 'facility', portrait: true },
  { alt: 'Red sprinkler drop pipe with a hanger support at ceiling level', category: 'sprinkler' },
  { alt: 'Clean-room work area with ceiling lights, smoke detector and air vents', category: 'facility', portrait: true },
  { alt: 'Open industrial floor with red sprinkler pipes along the ceiling', category: 'sprinkler' },
  { alt: 'Red sprinkler pipe and ceiling-mounted detector above an open floor', category: 'sprinkler', portrait: true },
  { alt: 'Clean-room corridor lined with pass boxes and blue doors', category: 'facility', portrait: true },
  { alt: 'Wide floor with sprinkler pipework and ceiling lights', category: 'sprinkler' },
  { alt: 'Clean-room office area with ceiling smoke detectors and lighting', category: 'facility', portrait: true, narrow: true },
  { alt: 'Sprinkler pipework near the windows of an open floor', category: 'sprinkler' },
  { alt: 'Sprinkler branch lines across a partitioned floor', category: 'sprinkler' },
  { alt: 'Sprinkler mains above an open floor with columns', category: 'sprinkler' },
  { alt: 'Red sprinkler pipes and lighting across a ceiling', category: 'sprinkler' },
  { alt: 'Sprinkler pipework above an open floor with service ducts', category: 'sprinkler' },
  { alt: 'Sprinkler main running the length of a large floor', category: 'sprinkler' },
]

export type WorkPhoto = Meta & { id: string; thumb: string; full: string; width: number; height: number }

export const workPhotos: WorkPhoto[] = meta.map((m, i) => {
  const id = `work-${String(i + 1).padStart(2, '0')}`
  return {
    ...m,
    id,
    thumb: url(`${id}-thumb.webp`),
    full: url(`${id}.webp`),
    width: m.portrait ? (m.narrow ? 427 : 570) : 760,
    height: m.portrait ? 760 : 570,
  }
})
