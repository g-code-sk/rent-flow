import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react'
import { FieldError, useFormContext } from '@/components/ui/Form'

export const inputBaseClassName =
   'border border-stone-300 bg-white text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2 aria-invalid:border-rose-800'

const variantClassNames = {
   compact: 'w-[6.5rem] rounded-md px-2.5 py-1 text-left text-sm',
   field: 'mt-1.5 w-full rounded-lg px-3 py-2.5',
} as const

export type InputVariant = keyof typeof variantClassNames

export const inputClassName = `${inputBaseClassName} ${variantClassNames.compact}`

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
   variant?: InputVariant
}

export function Input({ variant = 'compact', className = '', name, value, onChange, onBlur, ...props }: InputProps) {
   const form = useFormContext()
   const bound = Boolean(form && name)
   const fieldError = bound && name ? form?.error(name) : undefined
   const classes = [inputBaseClassName, variantClassNames[variant], className].filter(Boolean).join(' ')

   function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (bound && name) {
         form?.setValue(name, event.target.value)
      }
      onChange?.(event)
   }

   function handleBlur(event: FocusEvent<HTMLInputElement>) {
      if (bound && name) {
         form?.touch(name)
      }
      onBlur?.(event)
   }

   const showFieldError = bound && variant === 'field'

   return (
      <>
         <input
            name={name}
            className={classes}
            aria-invalid={fieldError ? true : undefined}
            value={bound && name ? String(form?.values[name] ?? '') : value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
         />
         {showFieldError ? <FieldError message={fieldError} /> : null}
      </>
   )
}
