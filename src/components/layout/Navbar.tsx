import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'

import { business } from '../../config/business'
import { navLinks } from '../../config/navigation'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  // Close on Escape, return focus to the toggle, lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85 ${
        scrolled ? 'border-transparent shadow-nav' : 'border-line'
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-lg bg-brand-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="shrink-0 rounded-md" aria-label={`${business.name} home`}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-[15px] font-medium whitespace-nowrap text-ink-soft transition-colors hover:text-brand-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={business.phoneUri}
            className="hidden items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:text-brand-700 xl:inline-flex"
          >
            <Phone className="size-4 text-fire-600" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <ButtonLink href="#enquiry" variant="primary" size="md">
            Request an Enquiry
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-lg px-2 text-lg font-semibold text-ink hover:bg-mist"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3 border-t border-line pt-6">
                <ButtonLink href="#enquiry" onClick={() => setOpen(false)} variant="primary" size="lg">
                  Request an Enquiry
                </ButtonLink>
                <ButtonLink href={business.phoneUri} variant="outline" size="lg">
                  <Phone className="size-4 text-fire-600" aria-hidden="true" />
                  Call {business.phoneDisplay}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
