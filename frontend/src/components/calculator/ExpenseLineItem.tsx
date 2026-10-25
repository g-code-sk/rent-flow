import { formatEur, parseAmount } from '@/lib/amount'

const inputClassName =
   'w-[6.5rem] rounded-md border border-stone-300 bg-white px-2.5 py-1 text-left text-sm tabular-nums text-stone-900 outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2'

type ExpenseLineItemProps = {
   name: string
   description: string
   note?: string
   inputValue: number
   onInputChange: (value: number) => void
   inputUnit: string
   inputMin?: number
   inputMax?: number
   inputStep?: number
   monthlyAmount: number
   annualAmount: number
}

export function ExpenseLineItem({
   name,
   description,
   note,
   inputValue,
   onInputChange,
   inputUnit,
   inputMin = 0,
   inputMax,
   inputStep = 0.01,
   monthlyAmount,
   annualAmount,
}: ExpenseLineItemProps) {
   return (
      <article className="border-b border-stone-200/80 py-3 last:border-b-0">
         <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug text-stone-900">{name}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{description}</p>
            {note ? (
               <p className="mt-1.5 text-[11px] leading-relaxed text-stone-400">
                  <span className="font-medium text-stone-500">Poznámka: </span>
                  {note}
               </p>
            ) : null}
         </div>

         <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <label className="flex items-center gap-1.5 text-xs text-stone-500">
               <span className="sr-only">{name}</span>
               <input
                  type="number"
                  min={inputMin}
                  max={inputMax}
                  step={inputStep}
                  value={inputValue}
                  onChange={e => onInputChange(parseAmount(e.target.value))}
                  className={inputClassName}
                  aria-label={`${name}, ${inputUnit}`}
               />
               <span className="whitespace-nowrap tabular-nums">{inputUnit}</span>
            </label>
            {inputValue > 0 && (
               <div className="text-right">
                  <p className="text-sm font-medium tabular-nums text-stone-900">− {formatEur(monthlyAmount)}</p>
                  <p className="text-[11px] tabular-nums text-stone-500">{formatEur(annualAmount)} / rok</p>
               </div>
            )}
         </div>
      </article>
   )
}
