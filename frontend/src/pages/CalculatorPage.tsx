import { useMemo, useState } from 'react'
import { ExpenseLineItem } from '@/components/calculator/ExpenseLineItem'
import { NumberField } from '@/components/calculator/NumberField'
import { ResultRow } from '@/components/calculator/ResultRow'
import { Card } from '@/components/ui/Card'
import { getExpenseById } from '@/data/expenseCatalog'
import { annualAmountFromIncomePercent, annualFromMonthlyAmount, formatEur, parseAmount } from '@/lib/amount'

const MONTH_IN_YEAR = 12
const vacancyExpense = getExpenseById('vacancyReserve')
const capexExpense = getExpenseById('capexReserve')
const hoaExpense = getExpenseById('hoaBuildingFee')
const repairFundExpense = getExpenseById('repairFund')

export function CalculatorPage() {
   const [rent, setRent] = useState('850')
   const [vacancyRate, setVacancyRate] = useState(String(vacancyExpense.defaultValue))
   const [capexRate, setCapexRate] = useState(String(capexExpense.defaultValue))
   const [hoaMonthly, setHoaMonthly] = useState(String(hoaExpense.defaultValue))
   const [repairFundMonthly, setRepairFundMonthly] = useState(String(repairFundExpense.defaultValue))

   const expectedMonthlyIncome = parseAmount(rent)
   const expectedAnnualIncome = expectedMonthlyIncome * MONTH_IN_YEAR
   const vacancyPercent = parseAmount(vacancyRate)
   const capexPercent = parseAmount(capexRate)
   const hoaMonthlyAmount = parseAmount(hoaMonthly)
   const repairFundMonthlyAmount = parseAmount(repairFundMonthly)

   const vacancyAnnual = useMemo(() => annualAmountFromIncomePercent(expectedAnnualIncome, vacancyPercent), [expectedAnnualIncome, vacancyPercent])
   const vacancyMonthly = vacancyAnnual / MONTH_IN_YEAR

   const capexAnnual = useMemo(() => annualAmountFromIncomePercent(expectedAnnualIncome, capexPercent), [expectedAnnualIncome, capexPercent])
   const capexMonthly = capexAnnual / MONTH_IN_YEAR

   const hoaAnnual = useMemo(() => annualFromMonthlyAmount(hoaMonthlyAmount), [hoaMonthlyAmount])
   const repairFundAnnual = useMemo(() => annualFromMonthlyAmount(repairFundMonthlyAmount), [repairFundMonthlyAmount])

   const netMonthlyIncome = expectedMonthlyIncome - vacancyMonthly - capexMonthly - hoaMonthlyAmount - repairFundMonthlyAmount
   const netAnnualIncome = expectedAnnualIncome - vacancyAnnual - capexAnnual - hoaAnnual - repairFundAnnual

   const expenseSummaryRows = [
      { id: vacancyExpense.id, label: vacancyExpense.nameSk, monthly: vacancyMonthly },
      { id: capexExpense.id, label: capexExpense.nameSk, monthly: capexMonthly },
      { id: hoaExpense.id, label: hoaExpense.nameSk, monthly: hoaMonthlyAmount },
      { id: repairFundExpense.id, label: repairFundExpense.nameSk, monthly: repairFundMonthlyAmount },
   ]

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
                     <NumberField label="Mesačný nájom (EUR)" value={rent} onChange={setRent} step={10} />
                  </div>
               </fieldset>

               <fieldset className="mt-6">
                  <legend className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Výdavky</legend>
                  <div className="mt-1">
                     <ExpenseLineItem
                        name={vacancyExpense.nameSk}
                        description={vacancyExpense.descriptionSk}
                        note={vacancyExpense.notesSk}
                        inputValue={vacancyRate}
                        onInputChange={setVacancyRate}
                        inputUnit="% z ročného nájmu"
                        inputMax={100}
                        inputStep={0.01}
                        monthlyAmount={vacancyMonthly}
                        annualAmount={vacancyAnnual}
                     />
                     <ExpenseLineItem
                        name={capexExpense.nameSk}
                        description={capexExpense.descriptionSk}
                        note={capexExpense.notesSk}
                        inputValue={capexRate}
                        onInputChange={setCapexRate}
                        inputUnit="% z ročného nájmu"
                        inputMax={100}
                        inputStep={0.1}
                        monthlyAmount={capexMonthly}
                        annualAmount={capexAnnual}
                     />
                     <ExpenseLineItem
                        name={hoaExpense.nameSk}
                        description={hoaExpense.descriptionSk}
                        note={hoaExpense.notesSk}
                        inputValue={hoaMonthly}
                        onInputChange={setHoaMonthly}
                        inputUnit="EUR / mesiac"
                        inputStep={1}
                        monthlyAmount={hoaMonthlyAmount}
                        annualAmount={hoaAnnual}
                     />
                     <ExpenseLineItem
                        name={repairFundExpense.nameSk}
                        description={repairFundExpense.descriptionSk}
                        note={repairFundExpense.notesSk}
                        inputValue={repairFundMonthly}
                        onInputChange={setRepairFundMonthly}
                        inputUnit="EUR / mesiac"
                        inputStep={1}
                        monthlyAmount={repairFundMonthlyAmount}
                        annualAmount={repairFundAnnual}
                     />
                  </div>
               </fieldset>
            </Card>

            <aside className="lg:sticky lg:top-24">
               <Card className="!p-5 sm:!p-6">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Súhrn</p>
                  <p className="mt-0.5 text-xs text-stone-600">Odhad pred ďalšími položkami katalógu</p>

                  <dl className="mt-4 space-y-2">
                     <ResultRow label="Nájom (mesačne)" value={formatEur(expectedMonthlyIncome)} />
                     <ResultRow label="Nájom (ročne)" value={formatEur(expectedAnnualIncome)} muted />
                     {expenseSummaryRows.map(row => (
                        <ResultRow key={row.id} label={row.label} value={`− ${formatEur(row.monthly)}`} muted />
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
            </aside>
         </div>
      </div>
   )
}
