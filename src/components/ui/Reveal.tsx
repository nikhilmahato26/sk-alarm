import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

/** Fades content up once as it enters the viewport. Static under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </Component>
  )
}
