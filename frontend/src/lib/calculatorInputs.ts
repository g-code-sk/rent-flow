import { getExpenseById } from '@/data/expenseCatalog'
import { CALCULATOR_EXPENSE_CONFIG, type ExpenseInputKey } from '@/lib/calculatorExpenseConfig'

export type CalculatorInputs = {
   rent: number
} & Record<ExpenseInputKey, number>

export function createInitialCalculatorInputs(): CalculatorInputs {
   const expenseDefaults = CALCULATOR_EXPENSE_CONFIG.reduce(
      (acc, config) => {
         acc[config.inputKey] = getExpenseById(config.catalogId).defaultValue
         return acc
      },
      {} as Record<ExpenseInputKey, number>,
   )

   return {
      rent: 850,
      ...expenseDefaults,
   }
}
