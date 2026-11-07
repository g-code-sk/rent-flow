import { AppNavLink } from '@/components/layout/AppNavLink'

export function AppMainNav() {
   return (
      <nav className="hidden items-center gap-1 sm:flex" aria-label="Hlavná navigácia">
         <AppNavLink to="/" end>
            Domov
         </AppNavLink>
         <AppNavLink to="/kalkulacka">Kalkulačka</AppNavLink>
         <AppNavLink to="/plan">Plán</AppNavLink>
         <AppNavLink to="/metodika">Metodika</AppNavLink>
      </nav>
   )
}
