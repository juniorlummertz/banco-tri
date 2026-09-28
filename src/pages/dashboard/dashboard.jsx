import { useAccount } from "../../hooks/useAccount"
import BalanceCard from "../../components/account/balanceCard"
import TransactionList from "../../components/transactions/transactionList"
import PageState from "../../components/feedback/PageState"

/* Página bancária: carrega a conta, mostra estados de espera/erro e apresenta
   apenas transações do Banco TRI. O FinUp mantém seus registros separados. */
export default function Dashboard() {
  const { user, account, transactions, loading, error, retry } = useAccount()
  const pageError = error || (!loading && (!user || !account) ? "Dados da conta não encontrados." : null)

  return (
    <PageState loading={loading} error={pageError} variant="dashboard" onRetry={retry}>
      {user && account && (
        <div className="dashboard-page">
          <header className="dashboard-header">
            <span className="section-label">Visão geral</span>
            <h1>Olá, {user.name}</h1>
            <p>Acompanhe sua conta e suas movimentações.</p>
          </header>

          {/* O card recebe dados prontos; não acessa a fonte de dados. */}
          <BalanceCard account={account} />

          <section className="transactions-panel" aria-labelledby="transactions-title">
            <div className="transactions-header">
              <div>
                <span className="section-label">Extrato</span>
                <h2 id="transactions-title">Últimas movimentações</h2>
              </div>
              <span className="transaction-count">{transactions.length} movimentações</span>
            </div>
            <TransactionList transactions={transactions} />
          </section>
        </div>
      )}
    </PageState>
  )
}
