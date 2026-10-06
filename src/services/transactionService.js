// O extrato demonstra um recorte de movimentações, sem recalcular o saldo da conta.
export function summarizeTransactions(transactions) {
  const cents = transactions.reduce((totals, transaction) => {
    const amount = Math.round(transaction.amount * 100)
    if (transaction.direction === "credit") totals.credits += amount
    if (transaction.direction === "debit") totals.debits += amount
    return totals
  }, { credits: 0, debits: 0 })

  return {
    credits: cents.credits / 100,
    debits: cents.debits / 100,
    count: transactions.length,
  }
}

export function filterTransactions(transactions, query, direction = "all") {
  const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR")
  const normalized = normalize(query.trim())
  return transactions
    .filter((transaction) =>
      (direction === "all" || transaction.direction === direction) &&
      normalize(transaction.description).includes(normalized)
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
