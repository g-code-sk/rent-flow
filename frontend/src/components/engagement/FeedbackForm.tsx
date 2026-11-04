import { Link } from 'react-router-dom'
import { feedbackSchema } from '@schemas/engagementSchemas'
import { Button } from '@/components/ui/Button'
import { FormProvider } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useZodForm } from '@/hooks/useZodForm'

type FeedbackFormProps = {
   onClose: () => void
}

export function FeedbackForm({ onClose }: FeedbackFormProps) {
   const form = useZodForm(feedbackSchema, { body: '', email: '', website: '' })
   const { isSubmitting, isSubmitted, error, onSubmit } = useFormSubmit(form, '/api/feedback')

   const email = typeof form.values.email === 'string' ? form.values.email.trim() : ''

   if (isSubmitted) {
      return (
         <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Ďakujeme. Prečítame si to.
            {email ? (
               <>
                  {' '}
                  Odhlásiť e-mail môžete na stránke{' '}
                  <Link to="/ochrana-udajov" className="text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900" onClick={onClose}>
                     ochrany údajov
                  </Link>
                  .
               </>
            ) : null}
         </p>
      )
   }

   return (
      <FormProvider form={form}>
         <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
            <label className="block text-sm font-medium text-stone-700">
               Čo by ste použili ako prvé?
               <TextArea name="body" rows={4} maxLength={5000} />
            </label>

            <label className="block text-sm font-medium text-stone-700">
               E-mail <span className="font-normal text-stone-500">(voliteľné)</span>
               <Input variant="field" type="email" name="email" autoComplete="email" />
            </label>

            <label className="sr-only">
               Web
               <Input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>

            {error ? <p className="text-sm text-rose-800">{error}</p> : null}

            <Button type="submit" disabled={isSubmitting || !form.isValid}>
               {isSubmitting ? 'Odosielam…' : 'Poslať nápad'}
            </Button>
         </form>
      </FormProvider>
   )
}
