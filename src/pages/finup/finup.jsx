import { useState } from "react"
import { formatCurrency } from "../../utils/currency"
import { useFinancialEntries } from "../../features/finup/finance/hooks/useFinancialEntries"
import { calculateFinancialSummary, calculateExpensesByCategory } from "../../features/finup/finance/services/financialService"
import CategorySummary from "../../features/finup/finance/components/CategorySummary"
import FinancialEntryForm from "../../features/finup/finance/components/FinancialEntryForm"

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T12:00:00`))
}

/* O FinUp combina transações fictícias do banco e lançamentos próprios.
   Somente registros manuais podem ser alterados neste módulo. */
export default function FinUp() {
  const { entries, loading, error, addEntry, updateEntry, deleteEntry } = useFinancialEntries()
  const [editingEntry, setEditingEntry] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [feedback, setFeedback] = useState("")

  if (loading) return <p role="status">Carregando dados financeiros...</p>
  if (error) return <p role="alert">Erro: {error}</p>

  const { totalIncome, totalExpenses, balance } = calculateFinancialSummary(entries)
  const expensesByCategory = calculateExpensesByCategory(entries)

  function saveEntry(values) {
    if (editingEntry) {
      updateEntry(editingEntry, values)
      setEditingEntry(null)
      setFeedback("Lançamento atualizado no FinUp.")
    } else {
      addEntry(values)
      setFeedback("")
    }
  }

  function confirmDelete(id) {
    try {
      deleteEntry(id)
      if (editingEntry?.id === id) setEditingEntry(null)
      setPendingDeleteId(null)
      setFeedback("Lançamento excluído do FinUp.")
    } catch (err) {
      setFeedback(err.message)
    }
  }

  return (
    <div className="finup-page">
      <header className="dashboard-header">
        <span className="section-label">FinUp · organização financeira</span>
        <h1>Visão financeira</h1>
        <p>Acompanhe receitas, despesas e decisões de orçamento em uma demonstração.</p>
      </header>

      <section className="financial-summary" aria-label="Resumo financeiro">
        <article className="financial-card income">
          <span>Receitas consideradas</span><strong>{formatCurrency(totalIncome)}</strong>
        </article>
        <article className="financial-card expense">
          <span>Despesas consideradas</span><strong>{formatCurrency(totalExpenses)}</strong>
        </article>
        <article className="financial-card balance">
          <span>Resultado do recorte</span><strong>{formatCurrency(balance)}</strong>
        </article>
      </section>
      <p className="summary-note">O resultado soma o extrato fictício e seus lançamentos locais; não é o saldo da conta do Banco TRI.</p>

      <FinancialEntryForm
        key={editingEntry?.id ?? "new"}
        entry={editingEntry}
        onSave={saveEntry}
        onCancel={() => setEditingEntry(null)}
      />
      {feedback && <p className="action-feedback" role="status">{feedback}</p>}
      <CategorySummary expensesByCategory={expensesByCategory} />

      <section className="financial-entries-panel" aria-labelledby="entries-title">
        <h2 id="entries-title">Lançamentos considerados</h2>
        <p className="list-description">Os itens do Banco TRI são apenas demonstrativos. Você pode corrigir ou remover os que adicionou ao FinUp.</p>
        {entries.length === 0 ? <p className="empty-state">Nenhum lançamento registrado.</p> : (
          <ul className="financial-entries-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <span className="entry-description">
                  <strong>{entry.description}</strong>
                  <small>{formatDate(entry.date)} · {entry.source === "bank" ? "Banco TRI" : "FinUp"}</small>
                </span>
                <span className="entry-side">
                  <strong className={entry.type === "income" ? "entry-income" : "entry-expense"}>
                    {entry.type === "income" ? "+" : "−"}{formatCurrency(entry.amount)}
                  </strong>
                  {entry.source === "manual" && (
                    <span className="entry-actions">
                      <button type="button" aria-label={`Editar ${entry.description}`} onClick={() => {
                        setEditingEntry(entry)
                        setPendingDeleteId(null)
                        setFeedback("")
                      }}>Editar</button>
                      <button type="button" aria-label={`Excluir ${entry.description}`} onClick={() => setPendingDeleteId(entry.id)}>Excluir</button>
                    </span>
                  )}
                </span>
                {pendingDeleteId === entry.id && (
                  <div className="delete-confirmation" role="group" aria-label={`Confirmar exclusão de ${entry.description}`}>
                    <span>Excluir “{entry.description}”?</span>
                    <button type="button" onClick={() => setPendingDeleteId(null)}>Cancelar</button>
                    <button type="button" className="danger-button" onClick={() => confirmDelete(entry.id)}>Confirmar exclusão</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
