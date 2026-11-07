import {
   createEmptyCalculatorForm,
   getDemoActiveExpenseIds,
   setupCalculatorForm,
   setupYearlyCounts,
   type FormValues,
   type FormYearlyCounts,
} from '@/lib/calculator'
import { loadCalculatorDraft } from '@/lib/calculatorDraft'
import { expenses, type Expense } from '@/lib/expenses'

export type CalculatorState = {
   formValues: FormValues
   formYearlyCounts: FormYearlyCounts
   activeExpenseIds: string[]
   taxDetailsOpen: boolean
}

export type CalculatorAction =
   | { type: 'setValue'; id: string; value: number }
   | { type: 'setYearlyCount'; id: string; value: number }
   | { type: 'addExpense'; id: string }
   | { type: 'removeExpense'; id: string }
   | { type: 'loadDemo' }
   | { type: 'reset' }
   | { type: 'setTaxDetailsOpen'; open: boolean }

export function createInitialCalculatorState(catalog: Expense[] = expenses): CalculatorState {
   const draft = loadCalculatorDraft(catalog)
   if (draft) {
      return draft
   }

   return {
      formValues: createEmptyCalculatorForm(catalog),
      formYearlyCounts: setupYearlyCounts(catalog),
      activeExpenseIds: [],
      taxDetailsOpen: false,
   }
}

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
   switch (action.type) {
      case 'setValue':
         return { ...state, formValues: { ...state.formValues, [action.id]: action.value } }
      case 'setYearlyCount':
         return { ...state, formYearlyCounts: { ...state.formYearlyCounts, [action.id]: action.value } }
      case 'addExpense':
         if (state.activeExpenseIds.includes(action.id)) {
            return state
         }
         return { ...state, activeExpenseIds: [...state.activeExpenseIds, action.id] }
      case 'removeExpense':
         return {
            ...state,
            formValues: { ...state.formValues, [action.id]: 0 },
            formYearlyCounts: { ...state.formYearlyCounts, [action.id]: 1 },
            activeExpenseIds: state.activeExpenseIds.filter(id => id !== action.id),
         }
      case 'loadDemo':
         return {
            formValues: setupCalculatorForm(expenses),
            formYearlyCounts: setupYearlyCounts(expenses),
            activeExpenseIds: getDemoActiveExpenseIds(expenses),
            taxDetailsOpen: true,
         }
      case 'reset':
         return {
            formValues: createEmptyCalculatorForm(expenses),
            formYearlyCounts: setupYearlyCounts(expenses),
            activeExpenseIds: [],
            taxDetailsOpen: false,
         }
      case 'setTaxDetailsOpen':
         return { ...state, taxDetailsOpen: action.open }
      default:
         return state
   }
}
