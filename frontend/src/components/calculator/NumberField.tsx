type NumberFieldProps = {
   label: string
   value: string
   onChange: (value: string) => void
   min?: number
   max?: number
   step?: number
}

const inputClassName =
   'mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 tabular-nums outline-none ring-teal-900/20 focus:border-teal-800 focus:ring-2'

export function NumberField({ label, value, onChange, min = 0, max, step = 1 }: NumberFieldProps) {
   return (
      <label className="block">
         <span className="text-sm font-medium text-stone-700">{label}</span>
         <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(e.target.value)}
            className={inputClassName}
         />
      </label>
   )
}
