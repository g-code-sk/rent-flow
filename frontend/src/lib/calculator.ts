import { ExpenseType, type Expense } from './expenses'

export const MONTHS_PER_YEAR = 12
export const TAX_ALLOWANCE = 500
export const INCOME_TAX_RATE = 0.19
export const HEALTH_INSURANCE_RATE = 0.15

export type FormValues = {
   rentMonthly: number
} & Record<string, number>

export type FormYearlyCounts = Record<string, number>
export type FormSummary = Record<string, number>

export function setupCalculatorForm(expenses: Expense[]): FormValues {
   const form: FormValues = {
      rentMonthly: 850,
   }

   expenses.forEach(expense => {
      form[expense.id] = expense.defaultValue
   })

   return form
}

export function calculateSummary(formValues: FormValues, yearlyCounts: FormYearlyCounts, expenses: Expense[]) {
   const summary: FormSummary = {}

   expenses.forEach(expense => {
      summary[expense.id] = calculateMonthlyAmount(formValues.rentMonthly, formValues[expense.id], expense.type, yearlyCounts[expense.id])
   })

   return summary
}

export function setupYearlyCounts(expenses: Expense[]) {
   const yearlyCounts: FormYearlyCounts = {}

   expenses.forEach(expense => {
      yearlyCounts[expense.id] = 1
   })

   return yearlyCounts
}

export function calculateMonthlyAmount(rentMonthly: number, value: number, expenseType: ExpenseType, yearlyCount: number) {
   if (!rentMonthly || rentMonthly <= 0) {
      return 0
   }

   if (!value || value <= 0) {
      return 0
   }

   if (expenseType === ExpenseType.PERCENTAGE) {
      return rentMonthly * (value / 100)
   }

   if (expenseType === ExpenseType.MONTHLY) {
      return value
   }

   if (expenseType === ExpenseType.YEARLY) {
      return value / MONTHS_PER_YEAR
   }

   if (expenseType === ExpenseType.EXACT) {
      return (value * yearlyCount) / MONTHS_PER_YEAR
   }

   return 0
}

export function getInputUnit(expenseType: ExpenseType) {
   if (expenseType === ExpenseType.PERCENTAGE) {
      return '% z nájmu'
   }

   if (expenseType === ExpenseType.MONTHLY) {
      return 'EUR / mesiac'
   }

   if (expenseType === ExpenseType.YEARLY) {
      return 'EUR / rok'
   }

   if (expenseType === ExpenseType.EXACT) {
      return 'EUR'
   }

   return ''
}
