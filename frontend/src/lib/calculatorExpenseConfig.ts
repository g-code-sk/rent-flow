import type { ExpenseCatalogItem } from '@/types/expense'

type CalculatorExpenseKind = 'annualPercent' | 'monthlyFixed'

export type CalculatorExpenseConfig = {
   inputKey: string
   catalogId: string
   kind: CalculatorExpenseKind
   inputUnit: string
   inputStep: number
   inputMax?: number
}

export const CALCULATOR_EXPENSE_CONFIG = [
   { inputKey: 'vacancyReserve', catalogId: 'vacancyReserve', kind: 'annualPercent', inputUnit: '% z ročného nájmu', inputStep: 0.01, inputMax: 100 },
   { inputKey: 'capexReserve', catalogId: 'capexReserve', kind: 'annualPercent', inputUnit: '% z ročného nájmu', inputStep: 0.1, inputMax: 100 },
   { inputKey: 'hoaBuildingFee', catalogId: 'hoaBuildingFee', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
   { inputKey: 'repairFund', catalogId: 'repairFund', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
   { inputKey: 'electricity', catalogId: 'electricity', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
   { inputKey: 'gas', catalogId: 'gas', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
   { inputKey: 'internet', catalogId: 'internet', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
   { inputKey: 'tv', catalogId: 'tv', kind: 'monthlyFixed', inputUnit: 'EUR / mesiac', inputStep: 1 },
] as const satisfies readonly CalculatorExpenseConfig[]

export type ExpenseInputKey = (typeof CALCULATOR_EXPENSE_CONFIG)[number]['inputKey']

export type ComputedCalculatorExpense = (typeof CALCULATOR_EXPENSE_CONFIG)[number] & {
   catalog: ExpenseCatalogItem
   monthlyAmount: number
   annualAmount: number
}
