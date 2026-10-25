import { Card } from '@/components/ui/Card'

export function PreviewCard() {
   const rows = [
      { label: 'Mesačný nájom', value: '850 €', tone: 'default' as const },
      { label: 'Náklady a rezerva', value: '−142 €', tone: 'muted' as const },
      { label: 'Odhad dane', value: '−98 €', tone: 'muted' as const },
   ]

   return (
      <Card>
         <div className="flex items-start justify-between gap-4">
            <div>
               <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Náhľad kalkulačky</p>
               <p className="mt-1 text-sm text-stone-600">Byt · dlhodobý nájom</p>
            </div>
            <span className="rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600">2026</span>
         </div>

         <dl className="mt-6 space-y-3">
            {rows.map(row => (
               <div key={row.label} className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-3 last:border-0 last:pb-0">
                  <dt className="text-sm text-stone-600">{row.label}</dt>
                  <dd className={`text-sm font-medium tabular-nums ${row.tone === 'muted' ? 'text-stone-500' : 'text-stone-900'}`}>{row.value}</dd>
               </div>
            ))}
         </dl>

         <div className="mt-6 rounded-xl bg-teal-950/5 px-4 py-3 ring-1 ring-teal-900/10">
            <div className="flex items-end justify-between gap-4">
               <p className="text-sm font-medium text-stone-700">Čistý mesačný príjem</p>
               <p className="text-2xl font-semibold tracking-tight tabular-nums text-teal-900">610 €</p>
            </div>
            <p className="mt-1 text-xs text-stone-500">Po nákladoch a odhadovanej dani (skutočné výdavky)</p>
         </div>
      </Card>
   )
}
