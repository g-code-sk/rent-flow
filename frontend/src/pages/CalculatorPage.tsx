import { CalculatorSummary } from '@/components/calculator/CalculatorSummary'
import { ExpenseLineItem } from '@/components/calculator/ExpenseLineItem'
import { NumberField } from '@/components/calculator/NumberField'
import { PlusIcon } from '@/components/ui/icons/PlusIcon'
import { ResetIcon } from '@/components/ui/icons/ResetIcon'
import { SparklesIcon } from '@/components/ui/icons/SparklesIcon'
import { Card } from '@/components/ui/Card'
import { TextButton } from '@/components/ui/TextButton'
import { createEmptyCalculatorForm, getDemoActiveExpenseIds, setupCalculatorForm, setupYearlyCounts, type FormValues, type FormYearlyCounts } from '@/lib/calculator'
import { expenses } from '@/lib/expenses'
import { useState } from 'react'

export function CalculatorPage() {
   const [formValues, setFormValues] = useState<FormValues>(() => createEmptyCalculatorForm(expenses))
   const [formYearlyCounts, setFormYearlyCounts] = useState<FormYearlyCounts>(() => setupYearlyCounts(expenses))
   const [activeExpenseIds, setActiveExpenseIds] = useState<string[]>([])
   const [taxDetailsOpen, setTaxDetailsOpen] = useState(false)

   function setFormStateValue(id: string, value: number) {
      setFormValues(prev => ({ ...prev, [id]: value }))
   }

   function setFormYearlyCount(id: string, value: number) {
      setFormYearlyCounts(prev => ({ ...prev, [id]: value }))
   }

   function addExpense(id: string) {
      setActiveExpenseIds(prev => (prev.includes(id) ? prev : [...prev, id]))
   }

   function removeExpense(id: string) {
      setFormValues(prev => ({ ...prev, [id]: 0 }))
      setFormYearlyCounts(prev => ({ ...prev, [id]: 1 }))
      setActiveExpenseIds(prev => prev.filter(activeId => activeId !== id))
   }

   function loadDemo() {
      setFormValues(setupCalculatorForm(expenses))
      setFormYearlyCounts(setupYearlyCounts(expenses))
      setActiveExpenseIds(getDemoActiveExpenseIds(expenses))
      setTaxDetailsOpen(true)
   }

   function resetCalculator() {
      setFormValues(createEmptyCalculatorForm(expenses))
      setFormYearlyCounts(setupYearlyCounts(expenses))
      setActiveExpenseIds([])
      setTaxDetailsOpen(false)
   }

   const hasStarted = formValues.rentMonthly > 0 || activeExpenseIds.length > 0

   const activeExpenses = activeExpenseIds
      .map(id => expenses.find(expense => expense.id === id))
      .filter((expense): expense is (typeof expenses)[number] => Boolean(expense))
   const catalogExpenses = expenses.filter(expense => !activeExpenseIds.includes(expense.id))

   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Kalkulačka príjmu</h1>
            <p className="mt-3 text-stone-600">Zadajte očakávaný mesačný nájom a upravte výdavky podľa katalógu — položky pribúdajú postupne.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
               <TextButton icon={<SparklesIcon />} onClick={loadDemo}>
                  Načítať ukážku
               </TextButton>
               {hasStarted ? (
                  <TextButton color="red" icon={<ResetIcon />} onClick={resetCalculator}>
                     Vymazať a začať znova
                  </TextButton>
               ) : null}
            </div>
            <p className="mt-1.5 text-xs text-stone-500">Ukážkové čísla — ilustrácia</p>
         </div>

         <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-6">
            <form className="grid gap-4 lg:gap-6" onSubmit={e => e.preventDefault()}>
               <Card className="!p-5 sm:!p-6">
                  <fieldset>
                     <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Príjem</legend>
                     <div className="mt-2">
                        <NumberField
                           label="Mesačný nájom (EUR)"
                           value={formValues.rentMonthly}
                           onChange={value => setFormStateValue('rentMonthly', value)}
                           step={10}
                           placeholder="750"
                           emptyWhenZero
                        />
                     </div>
                  </fieldset>
               </Card>

               <Card className="!p-5 sm:!p-6">
                  <fieldset>
                     <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Výdavky</legend>
                     {activeExpenses.length === 0 ? (
                        <p className="mt-2 text-sm text-stone-500">Pridajte výdavky, ktoré platíte vy (nie nájomník).</p>
                     ) : (
                        <div className="mt-1">
                           {activeExpenses.map(expense => (
                              <ExpenseLineItem
                                 key={expense.id}
                                 expense={expense}
                                 value={formValues[expense.id]}
                                 yearlyCount={formYearlyCounts[expense.id]}
                                 rentMonthly={formValues.rentMonthly}
                                 onInputChange={value => setFormStateValue(expense.id, value)}
                                 onYearlyCountChange={value => setFormYearlyCount(expense.id, value)}
                                 onRemove={() => removeExpense(expense.id)}
                              />
                           ))}
                        </div>
                     )}

                     {catalogExpenses.length > 0 ? (
                        <div className={activeExpenses.length > 0 ? 'mt-5 border-t border-stone-200/80 pt-4' : 'mt-4'}>
                           <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">Katalóg</p>
                           <ul className="mt-2 divide-y divide-stone-200/80">
                              {catalogExpenses.map(expense => (
                                 <li key={expense.id} className="flex items-start justify-between gap-3 py-2.5">
                                    <div className="min-w-0">
                                       <p className="text-sm font-medium text-stone-800">{expense.nameSk}</p>
                                       <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{expense.descriptionSk}</p>
                                    </div>
                                    <TextButton icon={<PlusIcon />} onClick={() => addExpense(expense.id)}>
                                       Pridať
                                    </TextButton>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ) : null}
                  </fieldset>
               </Card>
            </form>

            <CalculatorSummary formValues={formValues} yearlyCounts={formYearlyCounts} taxDetailsOpen={taxDetailsOpen} onTaxDetailsOpenChange={setTaxDetailsOpen} />
         </div>
      </div>
   )
}
