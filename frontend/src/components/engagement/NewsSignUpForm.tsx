import { Link } from 'react-router-dom'
import { waitlistSchema } from '@/schemas/engagementSchemas'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { FormProvider } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useZodForm } from '@/hooks/useZodForm'

type NewsSignUpFormProps = {
   onClose: () => void
}

export function NewsSignUpForm({ onClose }: NewsSignUpFormProps) {
   const form = useZodForm(waitlistSchema, { email: '', consent: false, website: '' })
   const { isSubmitting, isSubmitted, error, onSubmit } = useFormSubmit(form, '/api/waitlist')

   if (isSubmitted) {
      return (
         <p className="mt-4 text-sm leading-relaxed text-stone-600">
            E-mail máme. Ozveme sa, keď pribudne niečo nové - bez spamu. Odhlásiť sa môžete na stránke{' '}
            <Link to="/ochrana-udajov" className="text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900" onClick={onClose}>
               ochrany údajov
            </Link>
            .
         </p>
      )
   }

   return (
      <FormProvider form={form}>
         <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
            <label className="block text-sm font-medium text-stone-700">
               E-mail
               <Input variant="field" type="email" name="email" autoComplete="email" />
            </label>

            <label className="sr-only">
               Web
               <Input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <Checkbox name="consent">
               <span>
                  Súhlasím so zasielaním e-mailov o nových funkciách.{' '}
                  <Link to="/ochrana-udajov" className="text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900" onClick={onClose}>
                     Ochrana údajov
                  </Link>
               </span>
            </Checkbox>

            {error ? <p className="text-sm text-rose-800">{error}</p> : null}

            <Button type="submit" disabled={isSubmitting || !form.isValid}>
               {isSubmitting ? 'Odosielam…' : 'Novinky e-mailom'}
            </Button>
         </form>
      </FormProvider>
   )
}
