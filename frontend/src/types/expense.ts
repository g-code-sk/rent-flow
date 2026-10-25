export const EXPENSE_PERIODICITY = {
   annual: 'annual',
   monthly: 'monthly',
   perLease: 'perLease',
} as const

export type ExpensePeriodicity = (typeof EXPENSE_PERIODICITY)[keyof typeof EXPENSE_PERIODICITY]

export const EXPENSE_CALCULATION_TYPE = {
   percentage: 'percentage',
   percentageOrFixed: 'percentageOrFixed',
   fixedAmount: 'fixedAmount',
   formula: 'formula',
} as const

export type ExpenseCalculationType = (typeof EXPENSE_CALCULATION_TYPE)[keyof typeof EXPENSE_CALCULATION_TYPE]

export type ExpenseCatalogItem = {
   id: string
   nameSk: string
   nameEn: string
   descriptionSk: string
   descriptionEn: string
   category: string
   periodicity: ExpensePeriodicity
   calculationType: ExpenseCalculationType
   defaultValue: number
   calculationFormula: string
   notesSk: string
}
