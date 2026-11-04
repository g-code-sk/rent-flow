import { CalculatorSummary } from '@/components/calculator/CalculatorSummary'
import { NewsSignUpCard } from '@/components/engagement/NewsSignUpCard'
import { ExpenseCatalogRow } from '@/components/calculator/ExpenseCatalogRow'
import { ExpenseLineItem } from '@/components/calculator/ExpenseLineItem'
import { NumberField } from '@/components/calculator/NumberField'
import { ResetIcon } from '@/components/ui/icons/ResetIcon'
import { SparklesIcon } from '@/components/ui/icons/SparklesIcon'
import { Card } from '@/components/ui/Card'
import { TextButton } from '@/components/ui/TextButton'
import { useCalculator } from '@/hooks/useCalculator'

export function CalculatorPage() {
   const {
      formValues,
      formYearlyCounts,
      taxDetailsOpen,
      hasStarted,
      activeExpenses,
      catalogExpenses,
      setFormStateValue,
      setFormYearlyCount,
      addExpense,
      removeExpense,
      loadDemo,
      resetCalculator,
      setTaxDetailsOpen,
   } = useCalculator()

   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Kalkulačka príjmu</h1>
            <p className="mt-3 text-stone-600">Zadajte očakávaný mesačný nájom a upravte výdavky podľa katalógu - položky pribúdajú postupne.</p>
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
            <p className="mt-1.5 text-xs text-stone-500">Ukážkové čísla - ilustrácia</p>
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
                                 <ExpenseCatalogRow key={expense.id} expense={expense} onAdd={added => addExpense(added.id)} />
                              ))}
                           </ul>
                        </div>
                     ) : null}
                  </fieldset>
               </Card>
            </form>

            <aside className="grid gap-4 lg:gap-6">
               <NewsSignUpCard />
               <div className="grid gap-4 lg:sticky lg:top-24 lg:gap-6">
                  <CalculatorSummary formValues={formValues} yearlyCounts={formYearlyCounts} taxDetailsOpen={taxDetailsOpen} onTaxDetailsOpenChange={setTaxDetailsOpen} />
                  <p className="text-[11px] leading-relaxed text-stone-500">Toto nie je daňové poradenstvo.</p>
               </div>
            </aside>
         </div>
      </div>
   )
}
