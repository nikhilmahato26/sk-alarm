import { MessageSquareText, Phone } from 'lucide-react'

import { business } from '../../config/business'
import { whatsappUrl } from '../../utils/whatsapp'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const item =
  'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors active:bg-mist'

/** Fixed bottom bar on small screens. The page reserves matching bottom padding in App. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_-12px_rgb(10_46_71/0.3)] md:hidden"
    >
      <div className="flex divide-x divide-line">
        <a href={business.phoneUri} className={`${item} text-ink`}>
          <Phone className="size-5 text-fire-600" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} text-ink`}
          aria-label="WhatsApp (opens in a new tab)"
        >
          <WhatsAppIcon className="size-5 text-[#1f8a4c]" />
          WhatsApp
        </a>
        <a href="#enquiry" className={`${item} bg-brand-600 text-white active:bg-brand-700`}>
          <MessageSquareText className="size-5" aria-hidden="true" />
          Enquire
        </a>
      </div>
    </nav>
  )
}
