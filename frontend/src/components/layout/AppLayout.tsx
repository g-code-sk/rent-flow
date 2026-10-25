import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { AppApiStatus } from '@/components/layout/AppApiStatus'
import { AppFooter } from '@/components/layout/AppFooter'
import { AppNavLink } from '@/components/layout/AppNavLink'

const mainHome = 'mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 lg:py-20'
const mainDefault = 'mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-12'

export function AppLayout() {
   const isCalculator = Boolean(useMatch('/kalkulacka'))

   return (
      <div className="relative min-h-svh overflow-hidden bg-stone-200/70 text-stone-800">
         <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-stone-300/40 via-stone-200/30 to-teal-950/10" aria-hidden />
         <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-teal-300/25 blur-3xl" aria-hidden />
         <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
         <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(28,25,23,0.06),transparent_70%)]"
            aria-hidden
         />

         <div className="relative flex min-h-svh flex-col">
            <header className="sticky top-0 z-20 border-b border-stone-400/30 bg-stone-100/90 shadow-sm shadow-stone-900/5 backdrop-blur-md">
               <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8">
                  <NavLink to="/" className="flex items-center gap-3">
                     <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-900 text-sm font-semibold tracking-tight text-teal-50 shadow-sm">
                        RF
                     </span>
                     <span className="text-base font-semibold tracking-tight text-stone-900">Rent-flow</span>
                  </NavLink>

                  <nav className="hidden items-center gap-1 sm:flex" aria-label="Hlavná navigácia">
                     <AppNavLink to="/" end>
                        Domov
                     </AppNavLink>
                     <AppNavLink to="/kalkulacka">Kalkulačka</AppNavLink>
                     <AppNavLink disabled>Metodika</AppNavLink>
                  </nav>

                  <AppApiStatus />
               </div>
            </header>

            <main className={isCalculator ? mainDefault : mainHome}>
               <Outlet />
            </main>

            <AppFooter />
         </div>
      </div>
   )
}
