import { Link } from 'react-router-dom'

export function AppFooter() {
   return (
      <footer className="mt-auto border-t border-stone-400/25 bg-stone-100/80 backdrop-blur-sm">
         <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-stone-500 sm:flex-row sm:px-8 sm:text-left">
            <p>© {new Date().getFullYear()} Ostane z nájmu</p>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1" aria-label="Pätička">
               <Link to="/" className="hover:text-stone-800">
                  Domov
               </Link>
               <Link to="/kalkulacka" className="hover:text-stone-800">
                  Kalkulačka
               </Link>
               <Link to="/plan" className="hover:text-stone-800">
                  Plán
               </Link>
               <Link to="/ochrana-udajov" className="hover:text-stone-800">
                  Ochrana údajov
               </Link>
            </nav>
            <p>Informačný nástroj, nie daňové poradenstvo.</p>
         </div>
      </footer>
   )
}
