import { Link } from 'react-router-dom'
import { CheckIcon } from '@/components/CheckIcon'
import { PreviewCard } from '@/components/PreviewCard'

export function HomePage() {
   return (
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
         <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
               Dlhodobý prenájom · Slovensko
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.25rem]">
               Viete, koľko vám z nájmu <span className="text-teal-900">reálne ostane?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-stone-600 lg:mx-0">
               Spočítajte čistý príjem po nákladoch a dani — paušálne aj skutočné výdavky. Bez tabuliek a hádania.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
               <Link
                  to="/kalkulacka"
                  className="w-full rounded-xl bg-teal-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-teal-950/20 transition hover:bg-teal-800 sm:w-auto"
               >
                  Spočítať príjem
               </Link>
               <p className="text-sm text-stone-500">Ukážková kalkulačka · zatiaľ bez uloženia</p>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-600 lg:justify-start">
               <li className="flex items-center gap-2">
                  <CheckIcon />
                  Pre fyzické osoby
               </li>
               <li className="flex items-center gap-2">
                  <CheckIcon />
                  Paušál vs. skutočné výdavky
               </li>
               <li className="flex items-center gap-2">
                  <CheckIcon />
                  Export pre účtovníka
               </li>
            </ul>
         </div>

         <div className="mx-auto w-full max-w-md lg:max-w-none">
            <PreviewCard />
            <p className="mt-4 text-center text-xs text-stone-500 lg:text-left">Ukážkové čísla — ilustrácia produktu</p>
         </div>
      </div>
   )
}
