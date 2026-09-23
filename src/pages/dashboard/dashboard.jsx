import { useAccount } from "../../hooks/useAccount"
import BalanceCard from "../../components/account/balanceCard"
import TransactionList from "../../components/transactions/transactionList"
export default function Dashboard() {
    const {
        user,
        account,
        transactions,
        loading,
        error
    } = useAccount()
    if(loading) {
        return(
            <div>
                <p>Carregando  dados...</p>
            </div>
        )
    }   
    if (error) {
        return(
            <div>
                <p>Erro: {error}</p>
            </div>
        )
    }
    if (!user || !account){
        return(
            <div>
                <p>Dados da conta não encontrado.</p>
            </div>
        )
    }
    return (
        <div>
         <header className="dashboard-header">

            <span className="section-label">
                Visão geral
            </span>

            <h1>
                Olá, {user.name}
            </h1>

            <p>
                Acompanhe sua conta e suas movimentações.
            </p>

        </header>
            <h2> <BalanceCard account={account}/> </h2>
           <section className="transactions-panel">

  <div className="transactions-header">

    <div>
      <span className="section-label">
        Extrato
      </span>

      <h2>
        Últimas movimentações
      </h2>
    </div>

    <span className="transaction-count">
      {transactions.length} movimentações
    </span>

  </div>

  <TransactionList
    transactions={transactions}
  />

</section>
        </div>    
    )
}