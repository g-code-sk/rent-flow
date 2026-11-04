import type { ButtonHTMLAttributes, ComponentProps } from 'react'
import { Link } from 'react-router-dom'

const sizeClassNames = {
   md: 'px-4 py-2.5',
   lg: 'px-6 py-3',
} as const

export type ButtonSize = keyof typeof sizeClassNames

function buttonClassName({ size = 'md', className = '' }: { size?: ButtonSize; className?: string } = {}) {
   return [
      'rounded-xl bg-teal-900 text-sm font-semibold text-white shadow-md shadow-teal-950/20 transition hover:bg-teal-800 disabled:opacity-60',
      sizeClassNames[size],
      className,
   ]
      .filter(Boolean)
      .join(' ')
}

type SharedProps = {
   size?: ButtonSize
   className?: string
}

type ButtonAsButton = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: never }

type ButtonAsLink = SharedProps & Omit<ComponentProps<typeof Link>, 'className' | 'to'> & { to: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
   const classes = buttonClassName({ size: props.size, className: props.className })

   if ('to' in props && typeof props.to === 'string') {
      const { size, className, to, ...linkProps } = props
      return <Link to={to} className={classes} {...linkProps} />
   }

   const { size, className, type = 'button', ...buttonProps } = props
   return <button type={type} className={classes} {...buttonProps} />
}
