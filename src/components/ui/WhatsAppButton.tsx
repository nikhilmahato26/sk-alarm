import { siWhatsapp } from 'simple-icons'
import { motion, useReducedMotion } from 'motion/react'

import { whatsappUrl } from '../../utils/whatsapp'

export function WhatsAppIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d={siWhatsapp.path} />
    </svg>
  )
}

/** Floating WhatsApp shortcut, desktop and tablet only. Mobile uses the bottom action bar. */
export function WhatsAppButton() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp (opens in a new tab)"
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={reduce ? undefined : { y: -2 }}
      className="fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#1f8a4c] text-white shadow-[0_10px_30px_-8px_rgb(10_46_71/0.45)] transition-colors hover:bg-[#18733f] md:flex"
    >
      <WhatsAppIcon className="size-7" />
    </motion.a>
  )
}
