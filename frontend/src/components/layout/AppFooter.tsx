export function AppFooter() {
   return (
      <footer className="mt-auto border-t border-stone-400/25 bg-stone-100/80 backdrop-blur-sm">
         <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs text-stone-500 sm:flex-row sm:px-8 sm:text-left">
            <p>© {new Date().getFullYear()} Rent-flow</p>
            <p>Informačný nástroj, nie daňové poradenstvo.</p>
         </div>
      </footer>
   )
}
