import type { InputHTMLAttributes } from 'react'

export const inputBaseClassName =
   'border border-stone-300 bg-white text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2'

const variantClassNames = {
   compact: 'w-[6.5rem] rounded-md px-2.5 py-1 text-left text-sm',
   field: 'mt-1.5 w-full rounded-lg px-3 py-2.5',
} as const

export type InputVariant = keyof typeof variantClassNames

export const inputClassName = `${inputBaseClassName} ${variantClassNames.compact}`

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
   variant?: InputVariant
}

export function Input({ variant = 'compact', className = '', ...props }: InputProps) {
   const classes = [inputBaseClassName, variantClassNames[variant], className].filter(Boolean).join(' ')
   return <input className={classes} {...props} />
}
