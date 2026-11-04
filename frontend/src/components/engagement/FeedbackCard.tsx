import { useState } from 'react'
import { FeedbackForm } from '@/components/engagement/FeedbackForm'
import { NewsSignUpForm } from '@/components/engagement/NewsSignUpForm'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'

export function FeedbackCard() {
   const [feedbackOpen, setFeedbackOpen] = useState(false)
   const [signupOpen, setSignupOpen] = useState(false)

   return (
      <Card className="!p-5 sm:!p-6">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
               <p className="text-sm font-medium text-stone-900">Chýba vám niečo?</p>
               <p className="mt-1.5 text-sm leading-relaxed text-stone-600">Plán nie je uzavretý. Napíšte, čo by ste použili ako prvé.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
               <Button className="w-full sm:w-auto" onClick={() => setFeedbackOpen(true)}>
                  Poslať nápad
               </Button>
               <Button className="w-full sm:w-auto" onClick={() => setSignupOpen(true)}>
                  Novinky e-mailom
               </Button>
            </div>
         </div>
         <Dialog open={feedbackOpen} title="Poslať nápad" onClose={() => setFeedbackOpen(false)}>
            <FeedbackForm />
         </Dialog>
         <Dialog open={signupOpen} title="Novinky e-mailom" onClose={() => setSignupOpen(false)}>
            <NewsSignUpForm onClose={() => setSignupOpen(false)} />
         </Dialog>
      </Card>
   )
}
