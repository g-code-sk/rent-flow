import type { ExpenseCatalogItem } from '@/types/expense'
import catalog from '../../../docs/expenses.json'

const items = catalog as ExpenseCatalogItem[]

export function getExpenseById(id: string): ExpenseCatalogItem {
   const item = items.find(entry => entry.id === id)
   if (!item) {
      throw new Error(`Unknown expense id: ${id}`)
   }
   return item
}
