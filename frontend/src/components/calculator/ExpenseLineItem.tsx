import { ExpenseType, type Expense } from '@/data/expenses'
import { formatEur, parseAmount } from '@/lib/amount'
import { useState } from 'react'

const inputClassName =
   'w-[6.5rem] rounded-md border border-stone-300 bg-white px-2.5 py-1 text-left text-sm tabular-nums text-stone-900 outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2'

const MONTHS_PER_YEAR = 12

function calculateMonthlyAmount(rentMonthly: number, inputValue: number, expenseType: ExpenseType, yearlyCount: number) {
   if (!rentMonthly || rentMonthly <= 0) {
      return 0
   }

   if (!inputValue || inputValue <= 0) {
      return 0
   }

   if (expenseType === ExpenseType.PERCENTAGE) {
      return rentMonthly * (inputValue / 100)
   }

   if (expenseType === ExpenseType.MONTHLY) {
      return inputValue
   }

   if (expenseType === ExpenseType.YEARLY) {
      return inputValue / MONTHS_PER_YEAR
   }

   if (expenseType === ExpenseType.EXACT) {
      return (inputValue * yearlyCount) / MONTHS_PER_YEAR
   }

   return 0
}

function getInputUnit(expenseType: ExpenseType) {
   if (expenseType === ExpenseType.PERCENTAGE) {
      return '% z nájmu'
   }

   if (expenseType === ExpenseType.MONTHLY) {
      return 'EUR / mesiac'
   }

   if (expenseType === ExpenseType.YEARLY) {
      return 'EUR / rok'
   }

   if (expenseType === ExpenseType.EXACT) {
      return 'EUR'
   }

   return ''
}

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
               <input
                  type="number"
                  min={inputMin}
                  max={inputMax ?? undefined}
                  step={inputStep}
                  value={value}
                  onChange={e => onInputChange(parseAmount(e.target.value))}
                  className={inputClassName}
                  aria-label={`${nameSk}, ${inputStep}`}
               />
               <span className="whitespace-nowrap tabular-nums">{inputUnit}</span>
               {expense.type === ExpenseType.EXACT && (
                  <>
                     <input
                        type="number"
                        min="0"
                        max="10"
                        step="1"
                        value={yearlyCount}
                        onChange={e => setYearlyCount(parseInt(e.target.value))}
                        className={inputClassName}
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
