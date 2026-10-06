import { useState } from "react"
import { formatCurrency } from "../../utils/currency"
import { useFinancialEntries } from "../../features/finup/finance/hooks/useFinancialEntries"
import { calculateFinancialSummary, calculateExpensesByCategory } from "../../features/finup/finance/services/financialService"
import CategorySummary from "../../features/finup/finance/components/CategorySummary"
import FinancialEntryForm from "../../features/finup/finance/components/FinancialEntryForm"
import LoadingScreen from "../../components/layout/LoadingScreen"
import { ArrowDownLeft, ArrowUpRight, ChartPie, Leaf, ShieldCheck } from "lucide-react"

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

  if (loading) return <LoadingScreen finup />
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
      <div className="page-topline"><span>FINUP <span className="topline-slash">/</span> ORGANIZAÇÃO FINANCEIRA</span><span className="demo-badge"><span className="status-dot" /> DEMONSTRAÇÃO</span></div>
      <header className="finup-hero">
        <div className="finup-hero-copy"><span className="finup-hero-tag"><Leaf size={15} aria-hidden="true" /> FINUP · EDUCAÇÃO FINANCEIRA</span><h1>Visão financeira<span>.</span></h1><p>Uma forma mais clara de entender receitas, despesas e planejar o que vem pela frente.</p></div><div className="finup-hero-art" aria-hidden="true"><span /><span /><span /></div>
      </header>

      <section className="financial-summary" aria-label="Resumo financeiro">
        <article className="financial-card income">
          <span className="summary-icon income-icon"><ArrowDownLeft size={20} aria-hidden="true" /></span><span>Receitas consideradas</span><strong>{formatCurrency(totalIncome)}</strong><small>Entradas do recorte</small>
        </article>
        <article className="financial-card expense">
          <span className="summary-icon expense-icon"><ArrowUpRight size={20} aria-hidden="true" /></span><span>Despesas consideradas</span><strong>{formatCurrency(totalExpenses)}</strong><small>Saídas do recorte</small>
        </article>
        <article className="financial-card balance">
          <span className="summary-icon activity-icon"><ChartPie size={20} aria-hidden="true" /></span><span>Resultado do recorte</span><strong>{formatCurrency(balance)}</strong><small>Para acompanhar de perto</small>
        </article>
      </section>
      <p className="summary-note"><ShieldCheck size={16} aria-hidden="true" /> Soma do extrato fictício e dos lançamentos locais. Não representa o saldo do Banco TRI.</p>

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
