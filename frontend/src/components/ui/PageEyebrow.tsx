import type { ReactNode } from 'react'

type PageEyebrowProps = {
   children: ReactNode
}

export function PageEyebrow({ children }: PageEyebrowProps) {
   return (
      <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
         {children}
      </p>
   )
}
