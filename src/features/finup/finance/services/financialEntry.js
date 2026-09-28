/* Forma comum usada pelo FinUp, independente de conta bancária.
   source indica se veio do extrato demonstrativo ou do formulário. */
export function mapBankTransaction(transaction) {
  return {
    id: `bank:${transaction.id}`,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.direction === "credit" ? "income" : "expense",
    category: transaction.category || "other",
    date: transaction.createdAt.slice(0, 10),
    source: "bank",
  }
}

/* Valida no domínio, além das restrições visuais do formulário. */
export function createManualEntry(values, id) {
  // Aceita vírgula decimal para o público brasileiro, sem tolerar milhares
  // ambíguos ou frações menores que um centavo.
  const rawAmount = String(values.amount).trim()
  const validAmount = /^\d+(?:[,.]\d{1,2})?$/.test(rawAmount)
  const amount = Number(rawAmount.replace(",", "."))
  const description = values.description.trim()
  const date = values.date
  const [year, month, day] = date.split("-").map(Number)
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10) === date
  const validCategory = values.type === "income" ||
    ["food", "housing", "transport", "health", "education", "leisure", "subscriptions", "other"].includes(values.category)
  if (!description || !["income", "expense"].includes(values.type) ||
      !validAmount || !Number.isFinite(amount) || amount <= 0 ||
      !validDate || !validCategory) {
    throw new Error("Confira descrição, tipo, valor e data do lançamento.")
  }

  return {
    id: `manual:${id}`,
    description,
    amount,
    type: values.type,
    category: values.type === "income" ? "income" : values.category,
    date,
    source: "manual",
  }
}
