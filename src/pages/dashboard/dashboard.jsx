import { useState } from "react"
import { useAccount } from "../../hooks/useAccount"
import BalanceCard from "../../components/account/balanceCard"
import TransactionList from "../../components/transactions/transactionList"
import { filterTransactions, summarizeTransactions } from "../../services/transactionService"
import { formatCurrency } from "../../utils/currency"
import { ArrowDownLeft, ArrowUpRight, Activity, ShieldCheck, Sparkles } from "lucide-react"
import LoadingScreen from "../../components/layout/LoadingScreen"
import SelectField from "../../components/ui/SelectField"

/* O Dashboard organiza a conta e o extrato; regras e acesso a dados ficam fora da página. */
export default function Dashboard() {
  const { user, account, transactions, loading, error } = useAccount()
  const [query, setQuery] = useState("")
  const [direction, setDirection] = useState("all")

  if (loading) return <LoadingScreen />
  if (error) return <p role="alert">Erro: {error}</p>
  if (!user || !account) return <p role="alert">Dados da conta não encontrados.</p>

  // Os indicadores descrevem somente o recorte fictício do extrato.
  const summary = summarizeTransactions(transactions)
  const visibleTransactions = filterTransactions(transactions, query, direction)

  return (
    <div className="dashboard-page">
      <div className="page-topline"><span>ÁREA DO CLIENTE <span className="topline-slash">/</span> VISÃO GERAL</span><span className="demo-badge"><span className="status-dot" /> DEMONSTRAÇÃO</span></div>
      <header className="dashboard-header">
        <div><span className="section-label">SUA CONTA, NO SEU RITMO</span><h1>Olá, {user.name} <span className="wave" aria-hidden="true">✳</span></h1><p>Veja seu panorama financeiro em um só lugar.</p></div>
        <span className="header-mark" aria-hidden="true"><Sparkles size={25} /></span>
      </header>

      <BalanceCard account={account} />

      <section className="bank-summary" aria-label="Resumo do extrato demonstrativo">
        <article className="bank-summary-card">
          <span className="summary-icon income-icon"><ArrowDownLeft size={20} aria-hidden="true" /></span><span>Entradas no extrato</span>
          <strong className="entry-income">{formatCurrency(summary.credits)}</strong>
          <small>Créditos do período</small>
        </article>
        <article className="bank-summary-card">
          <span className="summary-icon expense-icon"><ArrowUpRight size={20} aria-hidden="true" /></span><span>Saídas no extrato</span>
          <strong className="entry-expense">{formatCurrency(summary.debits)}</strong>
          <small>Débitos do período</small>
        </article>
        <article className="bank-summary-card">
          <span className="summary-icon activity-icon"><Activity size={20} aria-hidden="true" /></span><span>Movimentações</span>
          <strong>{summary.count}</strong>
          <small>Registros exibidos</small>
        </article>
      </section>
      <p className="summary-note"><ShieldCheck size={16} aria-hidden="true" /> Valores demonstrativos. O saldo da conta não é calculado a partir desta lista.</p>

      <section className="transactions-panel" aria-labelledby="transactions-title">
        <div className="transactions-header">
          <div>
            <span className="section-label">ACOMPANHE SEU DINHEIRO</span>
            <h2 id="transactions-title">Movimentações</h2>
          </div>
          <span className="transaction-count">{visibleTransactions.length} de {summary.count}</span>
        </div>

        <div className="transaction-filters">
          <label>
            Buscar movimentação
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: supermercado" />
          </label>
          <SelectField label="Tipo de movimentação" value={direction} onChange={setDirection} options={[{ value: "all", label: "Todas" }, { value: "credit", label: "Entradas" }, { value: "debit", label: "Saídas" }]} />
        </div>

        <TransactionList transactions={visibleTransactions} />
      </section>
    </div>
  )
}
