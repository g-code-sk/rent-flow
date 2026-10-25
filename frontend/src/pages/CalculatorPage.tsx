import { ExpenseLineItem } from '@/components/calculator/ExpenseLineItem'
import { NumberField } from '@/components/calculator/NumberField'
import { Card } from '@/components/ui/Card'
import { expenses, type Expense } from '@/data/expenses'
import { useState } from 'react'

type Form = Record<string, number>

function setupForm(expenses: Expense[]): Form {
   const form: Form = {
      rentMonthly: 850,
   }

   expenses.forEach(expense => {
      form[expense.id] = expense.defaultValue
   })

   return form
}

export function CalculatorPage() {
   const [form, setForm] = useState<Form>(setupForm(expenses))

   function setFormStateValue(id: string, value: number) {
      setForm(prev => ({ ...prev, [id]: value }))
   }

   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Kalkulačka príjmu</h1>
            <p className="mt-3 text-stone-600">Zadajte očakávaný mesačný nájom a upravte výdavky podľa katalógu — položky pribúdajú postupne.</p>
         </div>

         <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
            <Card as="form" className="!p-5 sm:!p-6" onSubmit={e => e.preventDefault()}>
               <fieldset>
                  <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Príjem</legend>
                  <div className="mt-2">
                     <NumberField label="Mesačný nájom (EUR)" value={form.rentMonthly} onChange={value => setFormStateValue('rentMonthly', value)} step={10} />
                  </div>
               </fieldset>

               <fieldset className="mt-6">
                  <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Výdavky</legend>
                  <div className="mt-1">
                     {expenses.map(expense => (
                        <ExpenseLineItem
                           key={expense.id}
                           expense={expense}
                           value={form[expense.id]}
                           rentMonthly={form.rentMonthly}
                           onInputChange={value => setFormStateValue(expense.id, value)}
                        />
                     ))}
                  </div>
               </fieldset>
            </Card>

            {/* <aside className="lg:sticky lg:top-24">
               <Card className="!p-5 sm:!p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Súhrn</p>
                  <p className="mt-0.5 text-xs text-stone-600">Odhad pred ďalšími položkami katalógu</p>

                  <dl className="mt-4 space-y-2">
                     <ResultRow label="Nájom (mesačne)" value={formatEur(expectedMonthlyIncome)} />
                     <ResultRow label="Nájom (ročne)" value={formatEur(expectedAnnualIncome)} muted />
                     {computedExpenses.map(expense => (
                        <ResultRow
                           key={expense.inputKey}
                           label={expense.catalog.nameSk}
                           value={`− ${formatEur(expense.monthlyAmount)}`}
                           muted
                        />
                     ))}
                  </dl>

                  <div className="mt-4 rounded-xl bg-teal-950/5 px-3.5 py-2.5 ring-1 ring-teal-900/10">
                     <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-stone-700">Po zadaných výdavkoch</p>
                        <p className="text-xl font-semibold tracking-tight tabular-nums text-teal-900">{formatEur(netMonthlyIncome)}</p>
                     </div>
                     <p className="mt-0.5 text-[11px] tabular-nums text-stone-500">{formatEur(netAnnualIncome)} ročne</p>
                  </div>
               </Card>

               <p className="mt-3 text-[11px] leading-relaxed text-stone-500">Toto nie je daňové poradenstvo.</p>
            </aside> */}
         </div>
      </div>
   )
}
