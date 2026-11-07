import { PlusIcon } from '@/components/ui/icons/PlusIcon'
import { TextButton } from '@/components/ui/TextButton'
import type { Expense } from '@/lib/expenses'

type ExpenseCatalogRowProps = {
   expense: Expense
   onAdd: (expense: Expense) => void
}

export function ExpenseCatalogRow({ expense, onAdd }: ExpenseCatalogRowProps) {
   return (
      <li className="flex items-start justify-between gap-3 py-2.5">
         <div className="min-w-0">
            <p className="text-sm font-medium text-stone-800">{expense.nameSk}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{expense.descriptionSk}</p>
         </div>
         <TextButton icon={<PlusIcon />} onClick={() => onAdd(expense)}>
            Pridať
         </TextButton>
      </li>
   )
}
