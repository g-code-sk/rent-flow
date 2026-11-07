import { useState, type FormEvent } from 'react'
import type { ZodForm } from '@/hooks/useZodForm'
import { postJson, readFieldErrors } from '@/lib/api'

export function useFormSubmit(form: ZodForm, url: string) {
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [error, setError] = useState<string | undefined>()

   async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      form.markSubmitted()
      if (!form.isValid) {
         return
      }

      setIsSubmitting(true)
      setError(undefined)

      const result = await postJson<null>(url, form.values)

      setIsSubmitting(false)

      if (result.ok) {
         setIsSubmitted(true)
         return
      }

      const fieldErrors = readFieldErrors(result.error.details)
      form.setServerErrors(fieldErrors)
      if (Object.keys(fieldErrors).length === 0) {
         setError(result.error.message)
      }
   }

   return { isSubmitting, isSubmitted, error, onSubmit }
}
