import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

import { workCategories, workPhotos } from '../../data/work'
import type { WorkCategory } from '../../data/work'
import { SectionHeading } from '../ui/SectionHeading'

const INITIAL_COUNT = 9

export function OurWork() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<'all' | WorkCategory>('all')
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? workPhotos : workPhotos.filter((p) => p.category === filter)),
    [filter],
  )
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - visible.length

  const open = (index: number, opener: HTMLElement) => {
    openerRef.current = opener
    setActive(index)
  }
  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  )

  // Native <dialog> gives focus trapping, Escape to close and an inert page behind it.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active !== null && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (active === null && dialog.open) dialog.close()
  }, [active])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      document.body.style.overflow = ''
      setActive(null)
      openerRef.current?.focus()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    dialog.addEventListener('close', onClose)
    dialog.addEventListener('keydown', onKey)
    return () => {
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('keydown', onKey)
    }
  }, [step])

  const current = active === null ? null : filtered[active]

  return (
    <section id="our-work" aria-labelledby="work-title" className="section-pad border-t border-line bg-white">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          title="Our work on site"
          intro="Photos from SK Fire Protection project sites, including sprinkler pipe networks on open floors and clean-room facilities."
        />

        <div role="group" aria-label="Filter photos" className="mt-8 flex flex-wrap gap-2">
          {workCategories.map((c) => {
            const count = c.id === 'all' ? workPhotos.length : workPhotos.filter((p) => p.category === c.id).length
            const selected = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(c.id)
                  setExpanded(false)
                }}
                className={`inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-colors ${
                  selected
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-line bg-white text-ink-soft hover:border-brand-500 hover:text-brand-700'
                }`}
              >
                {c.label}
                <span className={`text-xs ${selected ? 'text-white/75' : 'text-muted'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <ul key={filter} className="mt-8 columns-1 gap-4 min-[480px]:columns-2 lg:columns-3">
          {visible.map((photo, i) => (
            <motion.li
              key={photo.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-mist"
                aria-label={`View larger: ${photo.alt}`}
              >
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-lg bg-white/90 text-ink opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex h-12 items-center rounded-lg border border-line bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-700"
            >
              {expanded ? 'Show fewer photos' : `Show all ${filtered.length} photos (${hiddenCount} more)`}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-brand-900/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
            className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 px-4 py-6 sm:px-16"
          >
            <img
              src={current.full}
              alt={current.alt}
              className="max-h-[78dvh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="max-w-[60ch] text-center text-sm text-white/85">{current.alt}</p>

            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 sm:left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 sm:right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </section>
  )
}
