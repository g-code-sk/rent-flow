import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NewsSignUpForm } from '@/components/engagement/NewsSignUpForm'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'

export function NewsSignUpCard() {
   const [open, setOpen] = useState(false)

   return (
      <Card className="!p-5 sm:!p-6">
         <p className="text-sm font-medium text-stone-900">Toto je prvá verzia.</p>
         <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
            Zistite, čo všetko pre vás{' '}
            <Link to="/plan" className="font-medium text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900">
               plánujeme
            </Link>{' '}
            pridať. Nenechajte si ujsť novinky a zaregistrujte svoj e-mail - garantujeme nulový spam.
         </p>
         <div className="flex justify-end">
            <Button className="mt-4 w-full sm:w-auto" onClick={() => setOpen(true)}>
               Novinky e-mailom
            </Button>
         </div>
         <Dialog open={open} title="Novinky e-mailom" onClose={() => setOpen(false)}>
            <NewsSignUpForm onClose={() => setOpen(false)} />
         </Dialog>
      </Card>
   )
}
