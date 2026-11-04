import { useState } from 'react'
import { FeedbackForm } from '@/components/engagement/FeedbackForm'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'

export function FeedbackCard() {
   const [open, setOpen] = useState(false)

   return (
      <Card className="!p-5 sm:!p-6">
         <p className="text-sm font-medium text-stone-900">Chýba vám niečo?</p>
         <p className="mt-1.5 text-sm leading-relaxed text-stone-600">Plán nie je uzavretý. Napíšte, čo by ste použili ako prvé.</p>
         <Button className="mt-4 w-full sm:w-auto" onClick={() => setOpen(true)}>
            Poslať nápad
         </Button>
         <Dialog open={open} title="Poslať nápad" onClose={() => setOpen(false)}>
            <FeedbackForm />
         </Dialog>
      </Card>
   )
}
