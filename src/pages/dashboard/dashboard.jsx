import { useState } from "react"
import { useAccount } from "../../hooks/useAccount"
import BalanceCard from "../../components/account/balanceCard"
import TransactionList from "../../components/transactions/transactionList"
import { filterTransactions, summarizeTransactions } from "../../services/transactionService"
import { formatCurrency } from "../../utils/currency"

/* O Dashboard organiza a conta e o extrato; regras e acesso a dados ficam fora da página. */
export default function Dashboard() {
  const { user, account, transactions, loading, error } = useAccount()
  const [query, setQuery] = useState("")
  const [direction, setDirection] = useState("all")

  if (loading) return <p role="status">Carregando dados demonstrativos...</p>
  if (error) return <p role="alert">Erro: {error}</p>
  if (!user || !account) return <p role="alert">Dados da conta não encontrados.</p>

  // Os indicadores descrevem somente o recorte fictício do extrato.
  const summary = summarizeTransactions(transactions)
  const visibleTransactions = filterTransactions(transactions, query, direction)

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <span className="section-label">Visão geral · demonstração</span>
        <h1>Olá, {user.name}</h1>
        <p>Explore uma conta fictícia e veja como as movimentações chegam ao FinUp.</p>
      </header>

      <BalanceCard account={account} />

      <section className="bank-summary" aria-label="Resumo do extrato demonstrativo">
        <article className="bank-summary-card">
          <span>Entradas no extrato</span>
          <strong className="entry-income">{formatCurrency(summary.credits)}</strong>
        </article>
        <article className="bank-summary-card">
          <span>Saídas no extrato</span>
          <strong className="entry-expense">{formatCurrency(summary.debits)}</strong>
        </article>
        <article className="bank-summary-card">
          <span>Movimentações</span>
          <strong>{summary.count}</strong>
        </article>
      </section>
      <p className="summary-note">Valores do recorte demonstrativo; o saldo da conta não é calculado a partir desta lista.</p>

      <section className="transactions-panel" aria-labelledby="transactions-title">
        <div className="transactions-header">
          <div>
            <span className="section-label">Extrato fictício</span>
            <h2 id="transactions-title">Movimentações</h2>
          </div>
          <span className="transaction-count">{visibleTransactions.length} de {summary.count}</span>
        </div>

        <div className="transaction-filters">
          <label>
            Buscar movimentação
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: supermercado" />
          </label>
          <label>
            Tipo de movimentação
            <select value={direction} onChange={(event) => setDirection(event.target.value)}>
              <option value="all">Todas</option>
              <option value="credit">Entradas</option>
              <option value="debit">Saídas</option>
            </select>
          </label>
        </div>

        <TransactionList transactions={visibleTransactions} />
      </section>
    </div>
  )
}
