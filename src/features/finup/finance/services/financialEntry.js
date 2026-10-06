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
  // Aceita ponto ou vírgula decimal, sem arredondar silenciosamente centavos.
  const amountText = String(values.amount).trim()
  const amount = Number(amountText.replace(",", "."))
  const description = values.description.trim()
  const date = values.date
  const [year, month, day] = date.split("-").map(Number)
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10) === date
  const validCategory = values.type === "income" ||
    ["food", "housing", "transport", "health", "education", "leisure", "subscriptions", "other"].includes(values.category)
  if (!description || !["income", "expense"].includes(values.type) ||
      !/^\d+(?:[.,]\d{1,2})?$/.test(amountText) || !Number.isFinite(amount) || amount <= 0 ||
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

export function reviseManualEntry(entry, values) {
  if (entry.source !== "manual" || !entry.id.startsWith("manual:")) {
    throw new Error("Apenas lançamentos do FinUp podem ser editados.")
  }
  return createManualEntry(values, entry.id.slice("manual:".length))
}
