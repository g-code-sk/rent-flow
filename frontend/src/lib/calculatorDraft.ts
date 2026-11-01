import { createEmptyCalculatorForm, setupYearlyCounts, type FormValues, type FormYearlyCounts } from '@/lib/calculator'
import { expenses, type Expense } from '@/lib/expenses'

export const CALCULATOR_DRAFT_KEY = 'rentflow.calculator.draft'
export const CALCULATOR_DRAFT_TTL_MS = 60 * 60 * 1000

export type CalculatorDraftState = {
   formValues: FormValues
   formYearlyCounts: FormYearlyCounts
   activeExpenseIds: string[]
   taxDetailsOpen: boolean
}

type StoredDraft = CalculatorDraftState & {
   savedAt: number
}

function finiteNumber(value: unknown): number | null {
   return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null
}

function mergeFormValues(raw: unknown, catalog: Expense[]): FormValues {
   const form = createEmptyCalculatorForm(catalog)
   if (!raw || typeof raw !== 'object') {
      return form
   }

   const source = raw as Record<string, unknown>
   const rent = finiteNumber(source.rentMonthly)
   if (rent !== null) {
      form.rentMonthly = rent
   }

   catalog.forEach(expense => {
      const value = finiteNumber(source[expense.id])
      if (value !== null) {
         form[expense.id] = value
      }
   })

   return form
}

function mergeYearlyCounts(raw: unknown, catalog: Expense[]): FormYearlyCounts {
   const counts = setupYearlyCounts(catalog)
   if (!raw || typeof raw !== 'object') {
      return counts
   }

   const source = raw as Record<string, unknown>
   catalog.forEach(expense => {
      const value = finiteNumber(source[expense.id])
      if (value !== null) {
         counts[expense.id] = value
      }
   })

   return counts
}

export function loadCalculatorDraft(catalog: Expense[] = expenses): CalculatorDraftState | null {
   try {
      const raw = localStorage.getItem(CALCULATOR_DRAFT_KEY)
      if (!raw) {
         return null
      }

      const parsed = JSON.parse(raw) as Partial<StoredDraft>
      if (typeof parsed.savedAt !== 'number' || !Number.isFinite(parsed.savedAt) || Date.now() - parsed.savedAt > CALCULATOR_DRAFT_TTL_MS) {
         clearCalculatorDraft()
         return null
      }

      const knownIds = new Set(catalog.map(expense => expense.id))
      const activeExpenseIds = Array.isArray(parsed.activeExpenseIds)
         ? [...new Set(parsed.activeExpenseIds.filter((id): id is string => typeof id === 'string' && knownIds.has(id)))]
         : []

      return {
         formValues: mergeFormValues(parsed.formValues, catalog),
         formYearlyCounts: mergeYearlyCounts(parsed.formYearlyCounts, catalog),
         activeExpenseIds,
         taxDetailsOpen: parsed.taxDetailsOpen === true,
      }
   } catch {
      clearCalculatorDraft()
      return null
   }
}

export function saveCalculatorDraft(state: CalculatorDraftState) {
   try {
      const payload: StoredDraft = {
         savedAt: Date.now(),
         ...state,
      }
      localStorage.setItem(CALCULATOR_DRAFT_KEY, JSON.stringify(payload))
   } catch {
      // Private mode or quota — draft is best-effort.
   }
}

export function clearCalculatorDraft() {
   try {
      localStorage.removeItem(CALCULATOR_DRAFT_KEY)
   } catch {
      // Ignore storage failures.
   }
}
