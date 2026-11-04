import { useEffect, useId, useRef, type ReactNode } from 'react'

type DialogProps = {
   open: boolean
   title: string
   onClose: () => void
   children: ReactNode
}

export function Dialog({ open, title, onClose, children }: DialogProps) {
   const dialogRef = useRef<HTMLDialogElement>(null)
   const titleId = useId()

   useEffect(() => {
      const dialog = dialogRef.current

      if (!dialog) {
         return
      }

      if (open && !dialog.open) {
         dialog.showModal()
         return
      }

      if (!open && dialog.open) {
         dialog.close()
         return
      }
   }, [open])

   return (
      <dialog
         ref={dialogRef}
         aria-labelledby={titleId}
         className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-stone-300/70 bg-white p-0 text-stone-800 shadow-xl shadow-stone-900/15 backdrop:bg-stone-900/40"
         onClose={onClose}
         onClick={event => {
            if (event.target === event.currentTarget) {
               event.currentTarget.close()
            }
         }}
      >
         <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
               <h2 id={titleId} className="text-lg font-semibold tracking-tight text-stone-900">
                  {title}
               </h2>
               <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                  onClick={() => dialogRef.current?.close()}
               >
                  Zavrieť
               </button>
            </div>
            {children}
         </div>
      </dialog>
   )
}
