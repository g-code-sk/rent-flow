import { ExpenseLineItem } from '@/components/calculator/ExpenseLineItem'
import { NumberField } from '@/components/calculator/NumberField'
import { ResultRow } from '@/components/calculator/ResultRow'
import { Card } from '@/components/ui/Card'
import {
   calculateSummary,
   HEALTH_INSURANCE_RATE,
   INCOME_TAX_RATE,
   MONTHS_PER_YEAR,
   setupCalculatorForm,
   setupYearlyCounts,
   TAX_ALLOWANCE,
   type FormValues,
   type FormYearlyCounts,
} from '@/lib/calculator'
import { expenses } from '@/lib/expenses'
import { formatEur } from '@/lib/utils'
import { useState } from 'react'

export function CalculatorPage() {
   const [formValues, setFormValues] = useState<FormValues>(setupCalculatorForm(expenses))
   const [formYearlyCounts, setFormYearlyCounts] = useState<FormYearlyCounts>(setupYearlyCounts(expenses))

   function setFormStateValue(id: string, value: number) {
      setFormValues(prev => ({ ...prev, [id]: value }))
   }

   function setFormYearlyCount(id: string, value: number) {
      setFormYearlyCounts(prev => ({ ...prev, [id]: value }))
   }

   const summary = calculateSummary(formValues, formYearlyCounts, expenses)

   const rentYearly = formValues.rentMonthly * MONTHS_PER_YEAR

   const expensesMonthly = expenses.filter(expense => summary[expense.id] > 0).reduce((acc, expense) => acc + summary[expense.id], 0)
   const expensesYearly = expensesMonthly * MONTHS_PER_YEAR

   const expensesDeductibleMonthly = expenses.filter(expense => summary[expense.id] > 0 && expense.taxDeductible).reduce((acc, expense) => acc + summary[expense.id], 0)
   const expensesDeductibleYearly = expensesDeductibleMonthly * MONTHS_PER_YEAR

   const incomeBeforeTaxes = rentYearly - expensesYearly
   const incomeTaxable = Math.max(0, rentYearly - TAX_ALLOWANCE - expensesDeductibleYearly)

   const taxPayable = incomeTaxable * INCOME_TAX_RATE
   const healthInsurancePayable = incomeTaxable * HEALTH_INSURANCE_RATE

   const netIncome = incomeBeforeTaxes - taxPayable - healthInsurancePayable

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
                     <NumberField label="Mesačný nájom (EUR)" value={formValues.rentMonthly} onChange={value => setFormStateValue('rentMonthly', value)} step={10} />
                  </div>
               </fieldset>

               <fieldset className="mt-6">
                  <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Výdavky</legend>
                  <div className="mt-1">
                     {expenses.map(expense => (
                        <ExpenseLineItem
                           key={expense.id}
                           expense={expense}
                           value={formValues[expense.id]}
                           yearlyCount={formYearlyCounts[expense.id]}
                           rentMonthly={formValues.rentMonthly}
                           onInputChange={value => setFormStateValue(expense.id, value)}
                           onYearlyCountChange={value => setFormYearlyCount(expense.id, value)}
                        />
                     ))}
                  </div>
               </fieldset>
            </Card>

            <aside className="lg:sticky lg:top-24">
               <Card className="!p-5 sm:!p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Súhrn</p>
                  <p className="mt-0.5 text-xs text-stone-600">Odhad pred ďalšími položkami katalógu</p>

                  <dl className="mt-4 space-y-0">
                     <ResultRow label="Nájom" value={formatEur(formValues.rentMonthly)} secondary={`${formatEur(formValues.rentMonthly * MONTHS_PER_YEAR)} / rok`} />
                     {expenses
                        .filter(expense => formValues[expense.id] > 0)
                        .map(expense => (
                           <ResultRow
                              key={expense.id}
                              label={expense.nameSk}
                              value={`− ${formatEur(summary[expense.id])}`}
                              secondary={`${formatEur(summary[expense.id] * MONTHS_PER_YEAR)} / rok`}
                              taxDeductible={expense.taxDeductible}
                              muted
                           />
                        ))}
                  </dl>

                  <div className="mt-5 rounded-xl bg-stone-50/90 px-3.5 py-3.5 ring-1 ring-inset ring-stone-200/80">
                     <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">Po výdavkoch</p>
                     <dl className="space-y-0">
                        <ResultRow label="Výdavky spolu" value={`− ${formatEur(expensesMonthly)}`} secondary={`${formatEur(expensesYearly)} / rok`} muted />
                        <ResultRow label="Príjem pred daňou" value={formatEur(incomeBeforeTaxes / MONTHS_PER_YEAR)} secondary={`${formatEur(incomeBeforeTaxes)} / rok`} />
                     </dl>

                     <div className="border-t border-stone-200/80 pt-3.5">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">Daň a odvody</p>
                        <dl className="mt-2.5 space-y-0">
                           <ResultRow label="Základ dane" value={formatEur(incomeTaxable)} muted />
                           <ResultRow label="Daň z príjmu (19 %)" value={`− ${formatEur(taxPayable)}`} muted />
                           <ResultRow label="Zdravotné odvody (15 %)" value={`− ${formatEur(healthInsurancePayable)}`} muted />
                        </dl>
                     </div>
                  </div>

                  <div className="mt-3 rounded-xl bg-teal-950/5 px-3.5 py-3 ring-1 ring-teal-900/10">
                     <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-stone-700">Čistý príjem</p>
                        <p className="text-xl font-semibold tracking-tight tabular-nums text-teal-900">{formatEur(netIncome / MONTHS_PER_YEAR)}</p>
                     </div>
                     <p className="mt-0.5 text-right text-[11px] tabular-nums text-stone-500">{formatEur(netIncome)} / rok</p>
                  </div>
               </Card>

               <p className="mt-3 text-[11px] leading-relaxed text-stone-500">Toto nie je daňové poradenstvo.</p>
            </aside>
         </div>
      </div>
   )
}
