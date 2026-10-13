export type ButtonVariant = 'primary' | 'fire' | 'outline' | 'subtle'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  fire: 'bg-fire-600 text-white shadow-sm hover:bg-fire-700',
  outline: 'border border-line bg-white text-ink hover:border-brand-500 hover:text-brand-700',
  subtle: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px] sm:h-13 sm:px-6',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

