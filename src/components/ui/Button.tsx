import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { buttonClasses } from './buttonStyles'
import type { ButtonSize, ButtonVariant } from './buttonStyles'

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode }

export function ButtonLink({
  variant,
  size,
  className,
  children,
  external,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean }) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
