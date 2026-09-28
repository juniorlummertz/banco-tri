import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { formatCurrency } from "../../utils/currency"
import PageState from "../../components/feedback/PageState"
import { useFinancialEntries } from "../../features/finup/finance/hooks/useFinancialEntries"
import { calculateFinancialSummary, calculateExpensesByCategory } from "../../features/finup/finance/services/financialService"
import CategorySummary from "../../features/finup/finance/components/CategorySummary"
import FinancialEntryForm from "../../features/finup/finance/components/FinancialEntryForm"

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T12:00:00`))
}

/* Página do FinUp: reúne o extrato adaptado e os registros manuais, sem
   modificar o saldo ou o extrato da conta bancária. */
export default function FinUp() {
  const { entries, loading, error, addEntry, retry } = useFinancialEntries()
  const reduceMotion = useReducedMotion()
  const { totalIncome, totalExpenses, balance } = calculateFinancialSummary(entries)
  const expensesByCategory = calculateExpensesByCategory(entries)

  return (
    <PageState loading={loading} error={error} variant="finup" onRetry={retry}>
      <div className="finup-page">
        <header className="dashboard-header">
          <span className="section-label">FinUp</span>
          <h1>Visão financeira</h1>
          <p>Acompanhe suas receitas, despesas e o resultado dos lançamentos exibidos.</p>
        </header>

        {/* Valores chegam calculados do serviço, sem regra de negócio na UI. */}
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

        <FinancialEntryForm onAdd={addEntry} />
        <CategorySummary expensesByCategory={expensesByCategory} />

        {/* Só itens adicionados após a abertura da página entram suavemente.
            A lista inicial permanece instantânea para leitura rápida. */}
        <section className="financial-entries-panel" aria-labelledby="entries-title">
          <h2 id="entries-title">Lançamentos considerados</h2>
          {entries.length === 0 ? <p className="empty-state">Nenhum lançamento registrado.</p> : (
            <ul className="financial-entries-list">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.li
                    key={entry.id}
                    layout={reduceMotion ? false : "position"}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -3 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span>
                      <strong>{entry.description}</strong>
                      <small>{formatDate(entry.date)} · {entry.source === "bank" ? "Banco TRI" : "FinUp"}</small>
                    </span>
                    <strong className={entry.type === "income" ? "entry-income" : "entry-expense"}>
                      {entry.type === "income" ? "+" : "−"}{formatCurrency(entry.amount)}
                    </strong>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      </div>
    </PageState>
  )
}
