import { useEffect, useState } from "react"
import { api } from "../../../../services/api"
import { createManualEntry, mapBankTransaction } from "../services/financialEntry"
import { manualEntryRepository } from "../repositories/manualEntryRepository"

/* Coordena as duas fontes de dados. Só o FinUp conhece os lançamentos manuais. */
export function useFinancialEntries() {
  const [bankEntries, setBankEntries] = useState([])
  const [manualEntries, setManualEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const transactions = await api.getTransactions()
        const savedEntries = manualEntryRepository.list()
        if (active) {
          setBankEntries(transactions.map(mapBankTransaction))
          setManualEntries(savedEntries)
        }
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  function addEntry(values) {
    const entry = createManualEntry(values, crypto.randomUUID())
    setManualEntries(manualEntryRepository.add(entry))
  }

  // O extrato mantém a própria origem; a ordenação serve só à lista do FinUp.
  const entries = [...bankEntries, ...manualEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
  return { entries, loading, error, addEntry }
}
