import { TaxDeductibilityBadge } from '@/components/calculator/TaxDeductibilityBadge'

type ResultRowProps = {
   label: string
   value: string
   muted?: boolean
   secondary?: string
   taxDeductible?: boolean
}

export function ResultRow({ label, value, muted, secondary, taxDeductible }: ResultRowProps) {
   return (
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/70 p-1 last:border-0 last:pb-0">
         <dt className="flex min-w-0 items-center gap-2 text-sm text-stone-600">
            {taxDeductible !== undefined ? <TaxDeductibilityBadge deductible={taxDeductible} /> : null}
            <span className="min-w-0">{label}</span>
         </dt>
         <dd className="text-right">
            <p className={`text-sm font-medium tabular-nums ${muted ? 'text-stone-500' : 'text-stone-900'}`}>{value}</p>
            {secondary ? <p className="mt-0.5 text-[11px] tabular-nums text-stone-400">{secondary}</p> : null}
         </dd>
      </div>
   )
}
