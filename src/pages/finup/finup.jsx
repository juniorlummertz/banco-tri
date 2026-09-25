import { useAccount } from "../../hooks/useAccount"
import { formatCurrency } from "../../utils/currency"

export default function FinUp() {
    const {transactions, loading, error} = useAccount()
        if (loading) {
        return <p>Carregando dados financeiros...</p>
        }
        if (error) {
        return <p>Erro: {error}</p>
        }
    const totalIncome = transactions.filter((transaction) =>transaction.direction === "credit")
        .reduce((total, transaction) => total + transaction.amount, 0)
    const totalExpenses = transactions.filter((transaction) => transaction.direction === "debit" )
        .reduce((total, transaction) =>total + transaction.amount, 0)
    const monthlyBalance =totalIncome - totalExpenses
        return (<div className="finup-page">
            <header className="dashboard-header">
                <span className="section-label">FinUp</span>
                <h1>
                Visão financeira
                </h1>
                <p>
                Acompanhe suas receitas, despesas
                e o resultado do período.
                </p>
            </header>
            <section className="financial-summary">
             <article className="financial-card income">
              <span>Receitas</span>
                <strong>
                {formatCurrency(totalIncome)}
                </strong>
             </article>
             <article className="financial-card expense">
              <span>Despesas</span>
               <strong>
               {formatCurrency(totalExpenses)}
               </strong>
             </article>
             <article className="financial-card balance">
              <span>Resultado</span>
               <strong>
               {formatCurrency(monthlyBalance)}
               </strong>
             </article>
            </section>
        </div>)
}