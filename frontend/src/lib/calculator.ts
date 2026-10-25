import { ExpenseType, type Expense } from './expenses'

export type Form = Record<string, number>

export function setupCalculatorForm(expenses: Expense[]): Form {
   const form: Form = {
      rentMonthly: 850,
   }

   expenses.forEach(expense => {
      form[expense.id] = expense.defaultValue
   })

   return form
}

export const MONTHS_PER_YEAR = 12

export function calculateMonthlyAmount(rentMonthly: number, inputValue: number, expenseType: ExpenseType, yearlyCount: number) {
   if (!rentMonthly || rentMonthly <= 0) {
      return 0
   }

   if (!inputValue || inputValue <= 0) {
      return 0
   }

   if (expenseType === ExpenseType.PERCENTAGE) {
      return rentMonthly * (inputValue / 100)
   }

   if (expenseType === ExpenseType.MONTHLY) {
      return inputValue
   }

   if (expenseType === ExpenseType.YEARLY) {
      return inputValue / MONTHS_PER_YEAR
   }

   if (expenseType === ExpenseType.EXACT) {
      return (inputValue * yearlyCount) / MONTHS_PER_YEAR
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
