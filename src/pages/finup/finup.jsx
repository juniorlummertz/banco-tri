import { formatCurrency } from "../../utils/currency"
import { useFinancialEntries } from "../../features/finup/finance/hooks/useFinancialEntries"
import { calculateFinancialSummary, calculateExpensesByCategory } from "../../features/finup/finance/services/financialService"
import CategorySummary from "../../features/finup/finance/components/CategorySummary"
import FinancialEntryForm from "../../features/finup/finance/components/FinancialEntryForm"

/* Página do FinUp: interpreta transações bancárias e lançamentos próprios.
   O Dashboard bancário continua lendo apenas as transações do Banco TRI. */
export default function FinUp() {
  const { entries, loading, error, addEntry } = useFinancialEntries()

  if (loading) return <p>Carregando dados financeiros...</p>
  if (error) return <p>Erro: {error}</p>

  // Cálculos ficam no serviço; esta página organiza e exibe os resultados.
  const { totalIncome, totalExpenses, balance } = calculateFinancialSummary(entries)
  const expensesByCategory = calculateExpensesByCategory(entries)

  return (
    <div className="finup-page">
      <header className="dashboard-header">
        <span className="section-label">FinUp</span>
        <h1>Visão financeira</h1>
        <p>Acompanhe suas receitas, despesas e o resultado dos lançamentos exibidos.</p>
      </header>

      {/* Indicadores recebem números já calculados, sem acessar armazenamento. */}
      <section className="financial-summary" aria-label="Resumo financeiro">
        <article className="financial-card income">
          <span>Receitas</span><strong>{formatCurrency(totalIncome)}</strong>
        </article>
        <article className="financial-card expense">
          <span>Despesas</span><strong>{formatCurrency(totalExpenses)}</strong>
        </article>
        <article className="financial-card balance">
          <span>Resultado</span><strong>{formatCurrency(balance)}</strong>
        </article>
      </section>

      {/* O formulário salva apenas lançamentos locais do FinUp. */}
      <FinancialEntryForm onAdd={addEntry} />
      <CategorySummary expensesByCategory={expensesByCategory} />

      {/* Mostrar a origem torna explícito o que entrou nos totais. */}
      <section className="financial-entries-panel" aria-labelledby="entries-title">
        <h2 id="entries-title">Lançamentos considerados</h2>
        {entries.length === 0 ? <p>Nenhum lançamento registrado.</p> : (
          <ul className="financial-entries-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <span>
                  <strong>{entry.description}</strong>
                  <small>{entry.date} · {entry.source === "bank" ? "Banco TRI" : "FinUp"}</small>
                </span>
                <strong className={entry.type === "income" ? "entry-income" : "entry-expense"}>
                  {entry.type === "income" ? "+" : "−"}{formatCurrency(entry.amount)}
                </strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
