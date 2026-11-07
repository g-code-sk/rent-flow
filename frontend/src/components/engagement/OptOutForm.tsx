import { optOutSchema } from '@schemas/engagementSchemas'
import { Button } from '@/components/ui/Button'
import { FormProvider } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useZodForm } from '@/hooks/useZodForm'

export function OptOutForm() {
   const form = useZodForm(optOutSchema, { email: '', website: '' })
   const { isSubmitting, isSubmitted, error, onSubmit } = useFormSubmit(form, '/api/opt-out')

   if (isSubmitted) {
      return <p className="mt-4 text-sm leading-relaxed text-stone-600">E-mail sme odstránili zo zoznamu noviniek a z nápadov. Text nápadu ostáva.</p>
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

            {error ? <p className="text-sm text-rose-800">{error}</p> : null}

            <Button type="submit" disabled={isSubmitting || !form.isValid}>
               {isSubmitting ? 'Odosielam…' : 'Odhlásiť e-mail'}
            </Button>
         </form>
      </FormProvider>
   )
}
