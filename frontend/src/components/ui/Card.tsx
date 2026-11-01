import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

/** Shared surface styles for panels, forms, and metric cards. */
export const cardClassName =
   'rounded-2xl border border-stone-300/70 bg-white/85 p-6 shadow-xl shadow-stone-900/8 backdrop-blur-sm sm:p-7'

type CardProps = {
   children: ReactNode
   className?: string
} & (
   | ({ as?: 'div' } & HTMLAttributes<HTMLDivElement>)
   | ({ as: 'form' } & FormHTMLAttributes<HTMLFormElement>)
)

export function Card({ children, className = '', as = 'div', ...rest }: CardProps) {
   const classes = [cardClassName, className].filter(Boolean).join(' ')

   if (as === 'form') {
      const formRest = rest as FormHTMLAttributes<HTMLFormElement>
      return (
         <form className={classes} {...formRest}>
            {children}
         </form>
      )
   }

   const divRest = rest as HTMLAttributes<HTMLDivElement>
   return (
      <div className={classes} {...divRest}>
         {children}
      </div>
   )
}
