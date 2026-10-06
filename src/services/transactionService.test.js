import test from "node:test"
import assert from "node:assert/strict"
import { filterTransactions, summarizeTransactions } from "./transactionService.js"

const transactions = [
  { id: "1", description: "Farmácia", amount: 12.10, direction: "debit", createdAt: "2026-09-02T10:00:00" },
  { id: "2", description: "Salário", amount: 100.20, direction: "credit", createdAt: "2026-09-03T10:00:00" },
  { id: "3", description: "Farmácia do bairro", amount: 3.20, direction: "debit", createdAt: "2026-09-04T10:00:00" },
]

test("resumo do extrato mantém centavos e os filtros preservam os dados", () => {
  assert.deepEqual(summarizeTransactions(transactions), { credits: 100.2, debits: 15.3, count: 3 })
  assert.deepEqual(filterTransactions(transactions, "farmacia", "debit").map((item) => item.id), ["3", "1"])
  assert.deepEqual(filterTransactions(transactions, "", "credit").map((item) => item.id), ["2"])
  assert.deepEqual(filterTransactions(transactions, "sem resultado"), [])
  assert.equal(transactions[0].id, "1")
})
