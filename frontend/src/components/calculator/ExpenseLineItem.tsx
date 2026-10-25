import { Input } from '@/components/ui/Input'
import { calculateMonthlyAmount, getInputUnit, MONTHS_PER_YEAR } from '@/lib/calculator'
import { ExpenseType, type Expense } from '@/lib/expenses'
import { formatEur, parseAmount } from '@/lib/utils'
import { useState } from 'react'

type ExpenseLineItemProps = {
   expense: Expense
   value: number
   rentMonthly: number
   onInputChange: (value: number) => void
}

export function ExpenseLineItem({ expense, value, rentMonthly, onInputChange }: ExpenseLineItemProps) {
   const [yearlyCount, setYearlyCount] = useState(1)

   const monthlyAmount = calculateMonthlyAmount(rentMonthly, value, expense.type, yearlyCount)
   const yearlyAmount = monthlyAmount * MONTHS_PER_YEAR
   const { nameSk, descriptionSk, notesSk, inputMin, inputMax, inputStep } = expense
   const inputUnit = getInputUnit(expense.type)

   return (
      <article className="border-b border-stone-200/80 py-3 last:border-b-0">
         <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug text-stone-900">{nameSk}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{descriptionSk}</p>
            {notesSk ? (
               <p className="mt-1.5 text-[11px] leading-relaxed text-stone-400">
                  <span className="font-medium text-stone-500">Poznámka: </span>
                  {notesSk}
               </p>
            ) : null}
         </div>

         <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <label className="flex items-center gap-1.5 text-xs text-stone-500">
               <span className="sr-only">{nameSk}</span>
               <Input
                  type="number"
                  min={inputMin}
                  max={inputMax ?? undefined}
                  step={inputStep}
                  value={value}
                  onChange={e => onInputChange(parseAmount(e.target.value))}
                  aria-label={`${nameSk}, ${inputStep}`}
               />
               <span className="whitespace-nowrap tabular-nums">{inputUnit}</span>
               {expense.type === ExpenseType.EXACT && (
                  <>
                     <Input
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={yearlyCount}
                        onChange={e => setYearlyCount(parseInt(e.target.value))}
                        aria-label={`${nameSk}, ${yearlyCount}`}
                     />
                     <span className="whitespace-nowrap tabular-nums">krát za rok</span>
                  </>
               )}
            </label>
            {monthlyAmount > 0 && (
               <div className="text-right">
                  <p className="text-sm font-medium tabular-nums text-stone-900">− {formatEur(monthlyAmount)}</p>
                  <p className="text-[11px] tabular-nums text-stone-500">{formatEur(yearlyAmount)} / rok</p>
               </div>
            )}
         </div>
      </article>
   )
}
