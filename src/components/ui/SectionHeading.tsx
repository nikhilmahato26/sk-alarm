import type { ReactNode } from 'react'

type Props = {
  id?: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', className = '' }: Props) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-fire-600 uppercase">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-fire-600" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl leading-[1.1] font-extrabold tracking-tight md:text-[2.6rem]">
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg ${centered ? 'mx-auto' : ''}`}>
          {intro}
        </p>
      )}
    </div>
  )
}
