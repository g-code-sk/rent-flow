import { ResultRow } from '@/components/calculator/ResultRow'
import { Card } from '@/components/ui/Card'
import { calculateSummary, INCOME_TAX_RATE, MONTHS_PER_YEAR, TAX_ALLOWANCE, type FormValues, type FormYearlyCounts } from '@/lib/calculator'
import { expenses } from '@/lib/expenses'
import { formatEur } from '@/lib/utils'

type CalculatorSummaryProps = {
   formValues: FormValues
   yearlyCounts: FormYearlyCounts
   taxDetailsOpen: boolean
   onTaxDetailsOpenChange: (open: boolean) => void
}

export function CalculatorSummary({ formValues, yearlyCounts, taxDetailsOpen, onTaxDetailsOpenChange }: CalculatorSummaryProps) {
   const hasRent = formValues.rentMonthly > 0
   const summary = calculateSummary(formValues, yearlyCounts, expenses)

   const expensesMonthly = expenses.filter(expense => summary[expense.id] > 0).reduce((acc, expense) => acc + summary[expense.id], 0)

   const incomeYearly = formValues.rentMonthly * MONTHS_PER_YEAR
   const expensesYearly = expensesMonthly * MONTHS_PER_YEAR
   const expensesDeductibleYearly =
      expenses.filter(expense => summary[expense.id] > 0 && expense.taxDeductible).reduce((acc, expense) => acc + summary[expense.id], 0) * MONTHS_PER_YEAR

   const incomeBeforeTaxes = incomeYearly - expensesYearly
   const allowance = Math.min(TAX_ALLOWANCE, incomeYearly)
   const taxableIncomeYearly = incomeYearly - allowance
   const expenseRatio = incomeYearly > 0 ? taxableIncomeYearly / incomeYearly : 0
   const proportionatelyReducedExpenses = expenseRatio * expensesDeductibleYearly
   const taxableIncome = Math.max(0, taxableIncomeYearly - proportionatelyReducedExpenses)
   const taxPayable = taxableIncome * INCOME_TAX_RATE
   const netIncome = incomeBeforeTaxes - taxPayable

   return (
      <Card className="!p-5 sm:!p-6">
            <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Súhrn</p>
            <p className="mt-0.5 text-xs text-stone-600">{hasRent ? 'Podľa zadaných údajov' : 'Zadajte mesačný nájom alebo načítajte ukážku.'}</p>

            {hasRent ? (
               <>
                  <dl className="mt-4 space-y-0">
                     <ResultRow label="Nájom" value={formatEur(formValues.rentMonthly)} secondary={`${formatEur(incomeYearly)} / rok`} />
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
                        <ResultRow
                           label="Príjem pred daňou"
                           value={formatEur(incomeBeforeTaxes / MONTHS_PER_YEAR)}
                           secondary={`${formatEur(incomeBeforeTaxes)} / rok`}
                        />
                     </dl>

                     <details
                        className="mt-3.5 border-t border-stone-200/80 pt-3.5"
                        open={taxDetailsOpen}
                        onToggle={event => onTaxDetailsOpenChange(event.currentTarget.open)}
                     >
                        <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-wider text-stone-400">Daň a odvody</summary>
                        <dl className="mt-2.5 space-y-0">
                           <ResultRow label="Základ dane" value={formatEur(taxableIncome)} muted />
                           <ResultRow label="Daň z príjmu (19 %)" value={`− ${formatEur(taxPayable)}`} muted />
                        </dl>
                     </details>
                  </div>

                  <div className="mt-3 rounded-xl bg-teal-950/5 px-3.5 py-3 ring-1 ring-teal-900/10">
                     <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-stone-700">Čistý príjem</p>
                        <p className="text-xl font-semibold tracking-tight tabular-nums text-teal-900">{formatEur(netIncome / MONTHS_PER_YEAR)}</p>
                     </div>
                     <p className="mt-0.5 text-right text-[11px] tabular-nums text-stone-500">{formatEur(netIncome)} / rok</p>
                  </div>
               </>
            ) : null}
      </Card>
   )
}
