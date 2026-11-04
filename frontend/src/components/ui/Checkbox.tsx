import type { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from 'react'
import { FieldError, useFormContext } from '@/components/ui/Form'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> & {
   children?: ReactNode
}

export function Checkbox({ className = '', name, checked, onChange, onBlur, children, ...props }: CheckboxProps) {
   const form = useFormContext()
   const bound = Boolean(form && name)
   const fieldError = bound && name ? form?.error(name) : undefined

   function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (bound && name) {
         form?.setValue(name, event.target.checked)
      }
      onChange?.(event)
   }

   function handleBlur(event: FocusEvent<HTMLInputElement>) {
      if (bound && name) {
         form?.touch(name)
      }
      onBlur?.(event)
   }

   return (
      <label className="block text-sm leading-relaxed text-stone-600">
         <span className="flex items-center gap-2">
            <input
               type="checkbox"
               name={name}
               className={['mt-0.5 rounded border-stone-300 text-teal-900 focus:ring-teal-900/20 aria-invalid:border-rose-800', className].filter(Boolean).join(' ')}
               aria-invalid={fieldError ? true : undefined}
               checked={bound && name ? Boolean(form?.values[name]) : checked}
               onChange={handleChange}
               onBlur={handleBlur}
               {...props}
            />
            {children}
         </span>
         {bound ? <FieldError message={fieldError} /> : null}
      </label>
   )
}
