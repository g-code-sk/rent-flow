import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getFieldErrorMessage, postJson } from '@/lib/api'

type NewsSignUpFormProps = {
   onClose: () => void
}

export function NewsSignUpForm({ onClose }: NewsSignUpFormProps) {
   const [email, setEmail] = useState('')
   const [consent, setConsent] = useState(false)
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

      const result = await postJson<null>('/api/waitlist', {
         email,
         consent,
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
      return <p className="mt-4 text-sm leading-relaxed text-stone-600">E-mail máme. Ozveme sa, keď pribudne niečo nové — bez spamu.</p>
   }

   return (
      <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
         <label className="block text-sm font-medium text-stone-700">
            E-mail
            <Input variant="field" type="email" name="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} />
            {emailError ? <p className="mt-1 text-xs text-rose-800">{emailError}</p> : null}
         </label>

         <label className="sr-only">
            Web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
         </label>

         <label className="flex items-center gap-2 text-sm leading-relaxed text-stone-600">
            <input
               type="checkbox"
               className="mt-0.5 rounded border-stone-300 text-teal-900 focus:ring-teal-900/20"
               checked={consent}
               onChange={event => setConsent(event.target.checked)}
               required
            />
            <span>
               Súhlasím so zasielaním e-mailov o nových funkciách.{' '}
               <Link to="/ochrana-udajov" className="text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900" onClick={onClose}>
                  Ochrana údajov
               </Link>
            </span>
         </label>

         {error ? <p className="text-sm text-rose-800">{error}</p> : null}

         <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Odosielam…' : 'Novinky e-mailom'}
         </Button>
      </form>
   )
}
