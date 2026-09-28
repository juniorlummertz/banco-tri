/* Regras financeiras puras: recebem lançamentos do FinUp, sem depender de React
   ou da origem dos dados. Valores são arredondados a centavos ao somar. */
export function calculateFinancialSummary(entries) {
  const totals = entries.reduce((result, entry) => {
    const cents = Math.round(entry.amount * 100)
    if (entry.type === "income") result.income += cents
    if (entry.type === "expense") result.expense += cents
    return result
  }, { income: 0, expense: 0 })

  return {
    totalIncome: totals.income / 100,
    totalExpenses: totals.expense / 100,
    balance: (totals.income - totals.expense) / 100,
  }
}

/* Agrupa apenas despesas; uma categoria ausente entra em "Outros". */
export function calculateExpensesByCategory(entries) {
  const centsByCategory = entries.reduce((categories, entry) => {
    if (entry.type !== "expense") return categories
    const category = entry.category || "other"
    categories[category] = (categories[category] || 0) + Math.round(entry.amount * 100)
    return categories
  }, {})

  return Object.fromEntries(
    Object.entries(centsByCategory).map(([category, cents]) => [category, cents / 100])
  )
}
