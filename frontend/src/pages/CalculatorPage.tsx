import { useMemo, useState } from 'react'
import { NumberField } from '@/components/calculator/NumberField'
import { ResultRow } from '@/components/calculator/ResultRow'
import { Card } from '@/components/ui/Card'

const TAX_RATE = 0.19

function parseAmount(value: string): number {
   const n = Number.parseFloat(value.replace(',', '.'))
   return Number.isFinite(n) && n >= 0 ? n : 0
}

function formatEur(value: number): string {
   return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value)
}

function dummyCalculate(input: { rent: number; vacancyPct: number; monthlyCosts: number; annualCostsMonthly: number }) {
   const effectiveRent = input.rent * (1 - input.vacancyPct / 100)
   const monthlyCashCosts = input.monthlyCosts + input.annualCostsMonthly
   const monthlyCashNet = effectiveRent - monthlyCashCosts

   const annualIncome = effectiveRent * 12
   const annualActualExpenses = monthlyCashCosts * 12
   const annualDeductible = Math.min(annualActualExpenses, annualIncome)
   const taxableBase = Math.max(0, annualIncome - annualDeductible)
   const annualTax = taxableBase * TAX_RATE
   const monthlyTax = annualTax / 12
   const monthlyNetAfterTax = monthlyCashNet - monthlyTax

   return {
      effectiveRent,
      monthlyCashCosts,
      monthlyCashNet,
      annualTax,
      monthlyTax,
      monthlyNetAfterTax,
      taxableBase,
   }
}

export function CalculatorPage() {
   const [rent, setRent] = useState('850')
   const [vacancyPct, setVacancyPct] = useState('5')
   const [management, setManagement] = useState('45')
   const [insurance, setInsurance] = useState('12')
   const [otherMonthly, setOtherMonthly] = useState('35')
   const [propertyTaxMonthly, setPropertyTaxMonthly] = useState('50')

   const result = useMemo(() => {
      return dummyCalculate({
         rent: parseAmount(rent),
         vacancyPct: parseAmount(vacancyPct),
         monthlyCosts: parseAmount(management) + parseAmount(insurance) + parseAmount(otherMonthly),
         annualCostsMonthly: parseAmount(propertyTaxMonthly),
      })
   }, [rent, vacancyPct, management, insurance, otherMonthly, propertyTaxMonthly])

   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Kalkulačka príjmu</h1>
            <p className="mt-3 text-stone-600">
               Zadajte údaje o súkromnom prenájme (§ 6 ods. 3). Výpočet je zjednodušený — daňové výdavky podľa zadaných nákladov; plné slovenské pravidlá doplníme v
               ďalšej fáze.
            </p>
         </div>

         <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
            <Card as="form" onSubmit={e => e.preventDefault()}>
               <fieldset className="space-y-6">
                  <legend className="text-xs font-medium uppercase tracking-wider text-stone-500">Príjem</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                     <NumberField label="Mesačný nájom (EUR)" value={rent} onChange={setRent} step={10} />
                     <NumberField label="Neobsadenosť (%)" value={vacancyPct} onChange={setVacancyPct} max={100} />
                  </div>
               </fieldset>

               <fieldset className="mt-8 space-y-4">
                  <legend className="text-xs font-medium uppercase tracking-wider text-stone-500">Mesačné náklady</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                     <NumberField label="Správa / SVJ" value={management} onChange={setManagement} />
                     <NumberField label="Poistenie" value={insurance} onChange={setInsurance} />
                     <NumberField label="Ostatné" value={otherMonthly} onChange={setOtherMonthly} />
                     <NumberField label="Daň z nehnuteľností (÷12)" value={propertyTaxMonthly} onChange={setPropertyTaxMonthly} />
                  </div>
               </fieldset>
            </Card>

            <aside className="lg:sticky lg:top-24">
               <Card>
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Výsledok (mesačne)</p>
                  <p className="mt-1 text-sm text-stone-600">Po neobsadenosti · odhad</p>

                  <dl className="mt-6 space-y-3">
                     <ResultRow label="Efektívny nájom" value={formatEur(result.effectiveRent)} />
                     <ResultRow label="Náklady spolu" value={`− ${formatEur(result.monthlyCashCosts)}`} muted />
                     <ResultRow label="Cashflow pred dane" value={formatEur(result.monthlyCashNet)} />
                     <ResultRow label="Odhad dane" value={`− ${formatEur(result.monthlyTax)}`} muted />
                  </dl>

                  <div className="mt-6 rounded-xl bg-teal-950/5 px-4 py-3 ring-1 ring-teal-900/10">
                     <div className="flex items-end justify-between gap-4">
                        <p className="text-sm font-medium text-stone-700">Čistý mesačný príjem</p>
                        <p className="text-2xl font-semibold tracking-tight tabular-nums text-teal-900">{formatEur(result.monthlyNetAfterTax)}</p>
                     </div>
                     <p className="mt-1 text-xs text-stone-500">
                        Zdaniteľný základ (ročne): {formatEur(result.taxableBase)} · sadzba {TAX_RATE * 100} % (dummy)
                     </p>
                  </div>
               </Card>

               <p className="mt-4 text-xs leading-relaxed text-stone-500">
                  Toto nie je daňové poradenstvo. Hodnoty slúžia na otestovanie rozhrania pred napojením na slovenský daňový modul.
               </p>
            </aside>
         </div>
      </div>
   )
}
