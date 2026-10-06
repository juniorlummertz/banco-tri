// Persistência provisória no navegador. Não altera database.json nem a conta TRI.
const storageKey = "finup:manual-entries:v1"

function assertManual(id) {
  if (!id?.startsWith("manual:")) {
    throw new Error("Apenas lançamentos do FinUp podem ser alterados.")
  }
}

export const manualEntryRepository = {
  list() {
    const entries = JSON.parse(localStorage.getItem(storageKey) || "[]")
    if (!Array.isArray(entries)) throw new Error("Lançamentos salvos inválidos.")
    return entries
  },
  add(entry) {
    assertManual(entry.id)
    if (entry.source !== "manual") throw new Error("Origem inválida do lançamento.")
    const entries = [...this.list(), entry]
    localStorage.setItem(storageKey, JSON.stringify(entries))
    return entries
  },
  update(entry) {
    assertManual(entry.id)
    if (entry.source !== "manual") throw new Error("Origem inválida do lançamento.")
    const entries = this.list()
    if (!entries.some((saved) => saved.id === entry.id)) {
      throw new Error("Lançamento não encontrado.")
    }
    const updated = entries.map((saved) => saved.id === entry.id ? entry : saved)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    return updated
  },
  remove(id) {
    assertManual(id)
    const entries = this.list()
    if (!entries.some((saved) => saved.id === id)) {
      throw new Error("Lançamento não encontrado.")
    }
    const remaining = entries.filter((saved) => saved.id !== id)
    localStorage.setItem(storageKey, JSON.stringify(remaining))
    return remaining
  },
}
