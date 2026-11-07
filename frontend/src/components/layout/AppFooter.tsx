import { AppFooterLink } from '@/components/layout/AppFooterLink'

export function AppFooter() {
   return (
      <footer className="mt-auto border-t border-stone-400/25 bg-stone-100/80 backdrop-blur-sm">
         <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-stone-500 sm:flex-row sm:px-8 sm:text-left">
            <p>© {new Date().getFullYear()} Ostane z nájmu</p>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1" aria-label="Pätička">
               <AppFooterLink to="/">Domov</AppFooterLink>
               <AppFooterLink to="/kalkulacka">Kalkulačka</AppFooterLink>
               <AppFooterLink to="/plan">Plán</AppFooterLink>
               <AppFooterLink to="/metodika">Metodika</AppFooterLink>
               <AppFooterLink to="/ochrana-udajov">Ochrana údajov</AppFooterLink>
            </nav>
            <p>Informačný nástroj, nie daňové poradenstvo.</p>
         </div>
      </footer>
   )
}
