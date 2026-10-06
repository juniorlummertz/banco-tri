import test from "node:test"
import assert from "node:assert/strict"
import { calculateFinancialSummary, calculateExpensesByCategory } from "./financialService.js"
import { createManualEntry, mapBankTransaction, reviseManualEntry } from "./financialEntry.js"
import { manualEntryRepository } from "../repositories/manualEntryRepository.js"

test("extrato demonstrativo e registro manual usam o mesmo modelo financeiro", () => {
  const bank = mapBankTransaction({
    id: "t1", description: "Mercado", amount: 12.10,
    direction: "debit", category: "food", createdAt: "2026-09-12T10:30:00",
  })
  const manual = createManualEntry({
    description: "  Remédio  ", amount: "3.20", type: "expense",
    category: "health", date: "2026-09-13",
  }, "m1")
  const income = createManualEntry({
    description: "Salário", amount: "20.00", type: "income",
    date: "2026-09-13",
  }, "m2")

  assert.equal(bank.id, "bank:t1")
  assert.equal(manual.id, "manual:m1")
  assert.equal(manual.description, "Remédio")
  assert.deepEqual(calculateFinancialSummary([bank, manual, income]), {
    totalIncome: 20, totalExpenses: 15.3, balance: 4.7,
  })
  assert.deepEqual(calculateExpensesByCategory([bank, manual, income]), {
    food: 12.1, health: 3.2,
  })
})

test("não aceita valor inválido nem data inexistente", () => {
  const values = { description: "Compra", amount: "1.001", type: "expense", category: "food", date: "2026-09-13" }
  assert.throws(() => createManualEntry(values, "x"), /Confira/)
  assert.throws(() => createManualEntry({ ...values, amount: "1.00", date: "2026-02-31" }, "x"), /Confira/)
})

test("sem lançamentos, os totais iniciam em zero", () => {
  assert.deepEqual(calculateFinancialSummary([]), {
    totalIncome: 0, totalExpenses: 0, balance: 0,
  })
  assert.deepEqual(calculateExpensesByCategory([]), {})
})

test("um lançamento manual persiste no navegador sem alterar transações bancárias", () => {
  const previousStorage = globalThis.localStorage
  const data = new Map()
  globalThis.localStorage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }
  try {
    const entry = createManualEntry({
      description: "Transporte", amount: "6.50", type: "expense",
      category: "transport", date: "2026-09-13",
    }, "local-1")
    manualEntryRepository.add(entry)
    assert.deepEqual(manualEntryRepository.list(), [entry])
    assert.equal(manualEntryRepository.list()[0].source, "manual")

    const revised = reviseManualEntry(entry, {
      description: "Ônibus", amount: "12,50", type: "expense",
      category: "transport", date: "2026-09-14",
    })
    manualEntryRepository.update(revised)
    assert.equal(manualEntryRepository.list()[0].id, entry.id)
    assert.equal(calculateFinancialSummary(manualEntryRepository.list()).totalExpenses, 12.5)
    assert.deepEqual(calculateExpensesByCategory(manualEntryRepository.list()), { transport: 12.5 })
    assert.throws(() => reviseManualEntry({ ...entry, source: "bank" }, { amount: "1" }), /Apenas/)
    assert.throws(() => manualEntryRepository.remove("bank:transaction-001"), /Apenas/)
    assert.deepEqual(manualEntryRepository.remove(entry.id), [])
    assert.deepEqual(manualEntryRepository.list(), [])
  } finally {
    globalThis.localStorage = previousStorage
  }
})

test("recusa formatos inválidos e aceita centavos com vírgula", () => {
  const values = { description: "Material", amount: "19,90", type: "expense", category: "education", date: "2026-09-13" }
  assert.equal(createManualEntry(values, "c1").amount, 19.9)
  assert.throws(() => createManualEntry({ ...values, amount: "1e3" }, "c1"), /Confira/)
  assert.throws(() => createManualEntry({ ...values, amount: "19,999" }, "c1"), /Confira/)
})
