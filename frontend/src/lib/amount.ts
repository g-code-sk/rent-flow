export function parseAmount(value: string): number {
   const n = Number.parseFloat(value.replace(',', '.'))
   return Number.isFinite(n) && n >= 0 ? n : 0
}

export function formatEur(value: number): string {
   return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value)
}

/** Annual amount as a percentage of annual gross income (e.g. vacancy reserve). */
export function annualAmountFromIncomePercent(annualIncome: number, percent: number): number {
   if (annualIncome <= 0 || percent <= 0) return 0
   return annualIncome * (percent / 100)
}

export function annualFromMonthlyAmount(monthlyAmount: number, monthsInYear = 12): number {
   if (monthlyAmount <= 0) return 0
   return monthlyAmount * monthsInYear
}
