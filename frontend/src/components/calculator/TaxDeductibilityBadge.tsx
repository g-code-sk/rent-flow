type TaxDeductibilityBadgeProps = {
   deductible: boolean
}

const labels = {
   deductible: 'Odpočítateľný výdavok',
   notDeductible: 'Neodpočítateľný výdavok',
} as const

export function TaxDeductibilityBadge({ deductible }: TaxDeductibilityBadgeProps) {
   const label = deductible ? labels.deductible : labels.notDeductible
   const tone = deductible ? 'bg-teal-50 text-teal-800 ring-teal-900/12' : 'bg-stone-100 text-stone-500 ring-stone-300/60'

   return (
      <span className={`inline-flex shrink-0 rounded-full p-0.5 ring-1 ring-inset ${tone}`} title={label} aria-label={label}>
         <svg className="size-3" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.1" />
            {deductible ? (
               <path d="M3.75 6 5.5 7.75 8.5 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
               <path d="M4 6h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            )}
         </svg>
      </span>
   )
}
