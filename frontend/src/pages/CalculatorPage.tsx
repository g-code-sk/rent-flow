import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'

type ExpenseMethod = 'flat' | 'actual'

const FLAT_EXPENSE_RATE = 0.4
const TAX_RATE = 0.19

function parseAmount(value: string): number {
   const n = Number.parseFloat(value.replace(',', '.'))
   return Number.isFinite(n) && n >= 0 ? n : 0
}

function formatEur(value: number): string {
   return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

function dummyCalculate(input: { rent: number; vacancyPct: number; monthlyCosts: number; annualCostsMonthly: number; method: ExpenseMethod }) {
   const effectiveRent = input.rent * (1 - input.vacancyPct / 100)
   const monthlyCashCosts = input.monthlyCosts + input.annualCostsMonthly
   const monthlyCashNet = effectiveRent - monthlyCashCosts

   const annualIncome = effectiveRent * 12
   const annualActualExpenses = monthlyCashCosts * 12
   const annualDeductible = input.method === 'flat' ? annualIncome * FLAT_EXPENSE_RATE : Math.min(annualActualExpenses, annualIncome)
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
   const [method, setMethod] = useState<ExpenseMethod>('flat')

   const result = useMemo(() => {
      return dummyCalculate({
         rent: parseAmount(rent),
         vacancyPct: parseAmount(vacancyPct),
         monthlyCosts: parseAmount(management) + parseAmount(insurance) + parseAmount(otherMonthly),
         annualCostsMonthly: parseAmount(propertyTaxMonthly),
         method,
      })
   }, [rent, vacancyPct, management, insurance, otherMonthly, propertyTaxMonthly, method])

   return (
      <div className="w-full">
         <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Kalkulačka príjmu</h1>
            <p className="mt-3 text-stone-600">
               Zadajte údaje o prenájme. Výpočet je zatiaľ zjednodušený ukážkový model — skutočné slovenské pravidlá doplníme v ďalšej fáze.
            </p>
         </div>

         <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
            <Card as="form" onSubmit={e => e.preventDefault()}>
               <fieldset className="space-y-6">
                  <legend className="text-xs font-medium uppercase tracking-wider text-stone-500">Príjem</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                     <label className="block">
                        <span className="text-sm font-medium text-stone-700">Mesačný nájom (EUR)</span>
                        <input
                           type="number"
                           min={0}
                           step={10}
                           value={rent}
                           onChange={e => setRent(e.target.value)}
                           className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2"
                        />
                     </label>
                     <label className="block">
                        <span className="text-sm font-medium text-stone-700">Neobsadenosť (%)</span>
                        <input
                           type="number"
                           min={0}
                           max={100}
                           step={1}
                           value={vacancyPct}
                           onChange={e => setVacancyPct(e.target.value)}
                           className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2"
                        />
                     </label>
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

               <fieldset className="mt-8">
                  <legend className="text-xs font-medium uppercase tracking-wider text-stone-500">Výdavky pre daň</legend>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                     <MethodToggle active={method === 'flat'} onClick={() => setMethod('flat')} title="Paušálne výdavky" description="Ukážka: 40 % z príjmu" />
                     <MethodToggle active={method === 'actual'} onClick={() => setMethod('actual')} title="Skutočné výdavky" description="Podľa zadaných nákladov" />
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

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
   return (
      <label className="block">
         <span className="text-sm font-medium text-stone-700">{label}</span>
         <input
            type="number"
            min={0}
            step={1}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2"
         />
      </label>
   )
}

function MethodToggle({ active, onClick, title, description }: { active: boolean; onClick: () => void; title: string; description: string }) {
   return (
      <button
         type="button"
         onClick={onClick}
         className={`flex-1 rounded-xl border px-4 py-3 text-left transition ${
            active ? 'border-teal-800 bg-teal-900/5 ring-2 ring-teal-900/15' : 'border-stone-300 bg-white hover:border-stone-400'
         }`}
      >
         <span className="block text-sm font-medium text-stone-900">{title}</span>
         <span className="mt-0.5 block text-xs text-stone-500">{description}</span>
      </button>
   )
}
function ResultRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
   return (
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-3 last:border-0 last:pb-0">
         <dt className="text-sm text-stone-600">{label}</dt>
         <dd className={`text-sm font-medium tabular-nums ${muted ? 'text-stone-500' : 'text-stone-900'}`}>{value}</dd>
      </div>
   )
}
