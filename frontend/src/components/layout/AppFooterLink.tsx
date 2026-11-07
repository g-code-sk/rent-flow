import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type AppFooterLinkProps = {
   to: string
   children: ReactNode
}

export function AppFooterLink({ to, children }: AppFooterLinkProps) {
   return (
      <Link to={to} className="hover:text-stone-800">
         {children}
      </Link>
   )
}
