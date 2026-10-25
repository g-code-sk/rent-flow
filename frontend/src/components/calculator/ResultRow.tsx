type ResultRowProps = {
   label: string
   value: string
   muted?: boolean
   secondary?: string
}

export function ResultRow({ label, value, muted, secondary }: ResultRowProps) {
   return (
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/70 p-1 last:border-0 last:pb-0">
         <dt className="text-sm text-stone-600">{label}</dt>
         <dd className="text-right">
            <p className={`text-sm font-medium tabular-nums ${muted ? 'text-stone-500' : 'text-stone-900'}`}>{value}</p>
            {secondary ? <p className="mt-0.5 text-[11px] tabular-nums text-stone-400">{secondary}</p> : null}
         </dd>
      </div>
   )
}
