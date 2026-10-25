export function parseAmount(value: string): number {
   const n = Number.parseFloat(value.replace(',', '.'))
   return Number.isFinite(n) && n >= 0 ? n : 0
}

export function formatEur(value: number): string {
   return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value)
}
