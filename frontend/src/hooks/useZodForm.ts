import { useState } from 'react'
import type { ZodType } from 'zod'

export type FormValues = Record<string, string | boolean>

export type ZodForm = {
   values: FormValues
   isValid: boolean
   setValue: (name: string, value: string | boolean) => void
   touch: (name: string) => void
   error: (name: string) => string | undefined
   markSubmitted: () => void
   setServerErrors: (errors: Record<string, string>) => void
}

function clientFieldErrors(schema: ZodType, values: FormValues): Record<string, string> {
   const parsed = schema.safeParse(values)
   if (parsed.success) {
      return {}
   }

   const messages: Record<string, string> = {}
   for (const [field, fieldMessages] of Object.entries(parsed.error.flatten().fieldErrors)) {
      const message = Array.isArray(fieldMessages) ? fieldMessages[0] : undefined
      if (typeof message === 'string') {
         messages[field] = message
      }
   }
   return messages
}

export function useZodForm(schema: ZodType, initial: FormValues): ZodForm {
   const [values, setValues] = useState<FormValues>(initial)
   const [dirty, setDirty] = useState<Set<string>>(() => new Set())
   const [submitted, setSubmitted] = useState(false)
   const [serverErrors, setServerErrorsState] = useState<Record<string, string>>({})

   const parsed = schema.safeParse(values)
   const clientErrors = clientFieldErrors(schema, values)

   function markDirty(name: string) {
      setDirty(current => {
         if (current.has(name)) {
            return current
         }
         const next = new Set(current)
         next.add(name)
         return next
      })
   }

   return {
      values,
      isValid: parsed.success,
      setValue(name, value) {
         setValues(current => ({ ...current, [name]: value }))
         markDirty(name)
         setServerErrorsState(current => {
            if (!(name in current)) {
               return current
            }
            const next = { ...current }
            delete next[name]
            return next
         })
      },
      touch: markDirty,
      error(name) {
         if (!submitted && !dirty.has(name)) {
            return undefined
         }
         return serverErrors[name] ?? clientErrors[name]
      },
      markSubmitted() {
         setSubmitted(true)
      },
      setServerErrors(errors) {
         setServerErrorsState(errors)
      },
   }
}
