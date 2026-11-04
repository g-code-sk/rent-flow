import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { postJson } from '@/lib/api'

export function FeedbackForm() {
   const [body, setBody] = useState('')
   const [email, setEmail] = useState('')
   const [website, setWebsite] = useState('')
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [error, setError] = useState<string | undefined>()

   async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsSubmitting(true)
      setError(undefined)

      const result = await postJson<null>('/api/feedback', {
         body,
         email: email.trim() ? email : undefined,
         website,
      })

      setIsSubmitting(false)

      if (result.ok) {
         setIsSubmitted(true)
         return
      }

      setError(result.error.message)
   }

   if (isSubmitted) {
      return <p className="mt-4 text-sm leading-relaxed text-stone-600">Ďakujeme. Prečítame si to.</p>
   }

   return (
      <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
         <label className="block text-sm font-medium text-stone-700">
            Čo by ste použili ako prvé?
            <textarea
               name="body"
               required
               rows={4}
               maxLength={5000}
               value={body}
               onChange={event => setBody(event.target.value)}
               className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2"
            />
         </label>

         <label className="block text-sm font-medium text-stone-700">
            E-mail <span className="font-normal text-stone-500">(voliteľné)</span>
            <Input variant="field" type="email" name="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} />
         </label>

         <label className="sr-only">
            Web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
         </label>

         {error ? <p className="text-sm text-rose-800">{error}</p> : null}

         <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Odosielam…' : 'Poslať nápad'}
         </Button>
      </form>
   )
}
