type ResultRowProps = {
   label: string
   value: string
   muted?: boolean
}

export function ResultRow({ label, value, muted }: ResultRowProps) {
   return (
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-3 last:border-0 last:pb-0">
         <dt className="text-sm text-stone-600">{label}</dt>
         <dd className={`text-sm font-medium tabular-nums ${muted ? 'text-stone-500' : 'text-stone-900'}`}>{value}</dd>
      </div>
   )
}
