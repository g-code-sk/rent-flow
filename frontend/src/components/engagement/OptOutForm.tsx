import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getFieldErrorMessage, postJson } from '@/lib/api'

export function OptOutForm() {
   const [email, setEmail] = useState('')
   const [website, setWebsite] = useState('')
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [error, setError] = useState<string | undefined>()
   const [emailError, setEmailError] = useState<string | undefined>()

   async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsSubmitting(true)
      setError(undefined)
      setEmailError(undefined)

      const result = await postJson<null>('/api/opt-out', {
         email,
         website,
      })

      setIsSubmitting(false)

      if (result.ok) {
         setIsSubmitted(true)
         return
      }

      setEmailError(getFieldErrorMessage(result.error.details, 'email'))
      setError(result.error.message)
   }

   if (isSubmitted) {
      return <p className="mt-4 text-sm leading-relaxed text-stone-600">E-mail sme odstránili zo zoznamu noviniek a z nápadov. Text nápadu ostáva.</p>
   }

   return (
      <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
         <label className="block text-sm font-medium text-stone-700">
            E-mail
            <Input variant="field" type="email" name="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} />
            {emailError ? <p className="mt-1 text-xs text-rose-800">{emailError}</p> : null}
         </label>

         <label className="sr-only">
            Web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
         </label>

         {error ? <p className="text-sm text-rose-800">{error}</p> : null}

         <Button type="submit" disabled={isSubmitting || !email.trim()}>
            {isSubmitting ? 'Odosielam…' : 'Odhlásiť e-mail'}
         </Button>
      </form>
   )
}
