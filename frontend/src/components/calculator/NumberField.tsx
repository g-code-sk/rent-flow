import { Input } from '@/components/ui/Input'
import { parseAmount } from '@/lib/utils'

type NumberFieldProps = {
   label: string
   value: number
   onChange: (value: number) => void
   min?: number
   max?: number
   step?: number
}

export function NumberField({ label, value, onChange, min = 0, max, step = 1 }: NumberFieldProps) {
   return (
      <label className="block">
         <span className="text-sm font-medium text-stone-700">{label}</span>
         <Input
            variant="field"
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(parseAmount(e.target.value))}
         />
      </label>
   )
}
