import { annualAmountFromIncomePercent, annualFromMonthlyAmount } from '@/lib/amount'
import { CALCULATOR_EXPENSE_CONFIG, type ComputedCalculatorExpense, type ExpenseInputKey } from '@/lib/calculatorExpenseConfig'
import type { CalculatorInputs } from '@/lib/calculatorInputs'
import { getExpenseById } from '@/data/expenseCatalog'

const MONTH_IN_YEAR = 12

export function computeCalculatorExpenses(inputs: CalculatorInputs, expectedAnnualIncome: number): ComputedCalculatorExpense[] {
   return CALCULATOR_EXPENSE_CONFIG.map(config => {
      const inputKey = config.inputKey as ExpenseInputKey
      const inputValue = inputs[inputKey]
      const annualAmount =
         config.kind === 'annualPercent'
            ? annualAmountFromIncomePercent(expectedAnnualIncome, inputValue)
            : annualFromMonthlyAmount(inputValue)
      const monthlyAmount = config.kind === 'annualPercent' ? annualAmount / MONTH_IN_YEAR : inputValue

      return {
         ...config,
         catalog: getExpenseById(config.catalogId),
         monthlyAmount,
         annualAmount,
      }
   })
}
