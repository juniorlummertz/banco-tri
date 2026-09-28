// Persistência provisória no navegador. Não altera database.json nem a conta TRI.
const storageKey = "finup:manual-entries:v1"

export const manualEntryRepository = {
  list() {
    const entries = JSON.parse(localStorage.getItem(storageKey) || "[]")
    if (!Array.isArray(entries)) throw new Error("Lançamentos salvos inválidos.")
    return entries
  },
  add(entry) {
    const entries = [...this.list(), entry]
    localStorage.setItem(storageKey, JSON.stringify(entries))
    return entries
  },
}
