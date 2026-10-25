import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const navItemClass = 'rounded-md px-3 py-2 text-sm'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
   `${navItemClass} ${isActive ? 'font-medium text-stone-900' : 'text-stone-600 hover:text-stone-900'}`

type AppNavLinkProps =
   | { to: string; end?: boolean; disabled?: false; children: ReactNode }
   | { disabled: true; children: ReactNode; to?: never; end?: never }

export function AppNavLink(props: AppNavLinkProps) {
   if (props.disabled) {
      return (
         <span className={`${navItemClass} cursor-default text-stone-400`} aria-disabled="true">
            {props.children}
         </span>
      )
   }

   const { to, end, children } = props

   return (
      <NavLink to={to} end={end} className={navLinkClass}>
         {children}
      </NavLink>
   )
}
