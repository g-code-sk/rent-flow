import type { ChangeEvent, FocusEvent, TextareaHTMLAttributes } from 'react'
import { FieldError, useFormContext } from '@/components/ui/Form'
import { inputBaseClassName } from '@/components/ui/Input'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ className = '', name, value, onChange, onBlur, ...props }: TextAreaProps) {
   const form = useFormContext()
   const bound = Boolean(form && name)
   const fieldError = bound && name ? form?.error(name) : undefined
   const classes = [inputBaseClassName, 'mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm', className].filter(Boolean).join(' ')

   function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      if (bound && name) {
         form?.setValue(name, event.target.value)
      }
      onChange?.(event)
   }

   function handleBlur(event: FocusEvent<HTMLTextAreaElement>) {
      if (bound && name) {
         form?.touch(name)
      }
      onBlur?.(event)
   }

   return (
      <>
         <textarea
            name={name}
            className={classes}
            aria-invalid={fieldError ? true : undefined}
            value={bound && name ? String(form?.values[name] ?? '') : value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...props}
         />
         {bound ? <FieldError message={fieldError} /> : null}
      </>
   )
}
