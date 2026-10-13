import { business } from '../../config/business'

/**
 * Temporary text wordmark. When the real SK logo file is available, put it in
 * src/assets/logo, import it in config/business.ts and set `logoSrc`.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  if (business.logoSrc) {
    return <img src={business.logoSrc} alt={business.name} className="h-10 w-auto" width={160} height={40} />
  }

  return (
    <span role="img" className="inline-flex items-center gap-2.5" aria-label={business.name}>
      <span aria-hidden="true" className="relative inline-flex flex-col items-start leading-none">
        <span className="font-display text-[26px] font-extrabold tracking-[-0.06em] text-brand-500 italic">SK</span>
        <span className="mt-0.5 flex h-[3px] w-full overflow-hidden rounded-full">
          <span className="w-3/5 bg-fire-600" />
          <span className="w-2/5 bg-brand-500" />
        </span>
      </span>
      {!compact && (
        <span aria-hidden="true" className="flex flex-col font-display leading-[1.05]">
          <span className="text-[13px] font-extrabold tracking-[0.08em] text-ink">FIRE</span>
          <span className="text-[13px] font-extrabold tracking-[0.08em] text-ink">PROTECTION</span>
        </span>
      )}
    </span>
  )
}
