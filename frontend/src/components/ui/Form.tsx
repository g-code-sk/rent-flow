import { createContext, useContext, type ReactNode } from 'react'
import type { ZodForm } from '@/hooks/useZodForm'

const FormContext = createContext<ZodForm | null>(null)

export function FormProvider({ form, children }: { form: ZodForm; children: ReactNode }) {
   return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}

export function useFormContext() {
   return useContext(FormContext)
}

export function FieldError({ message }: { message: string | undefined }) {
   if (!message) {
      return null
   }

   return <p className="mt-1 basis-full text-xs text-rose-800">{message}</p>
}
