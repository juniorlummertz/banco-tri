import { useAccount } from "../../hooks/useAccount"
import { formatCurrency } from "../../utils/currency"
import { calculateFinancialSummary, calculateExpensesByCategory } from "../../services/finup/financialService"
import CategorySummary from "../../components/finup/categorySummary"
/*
  Página inicial do módulo FinUp.

  Diferente do Dashboard bancário,
  o FinUp interpreta as movimentações
  para produzir informações financeiras.

  Exemplo:
  Banco Tri -> registra uma compra
  FinUp     -> interpreta essa compra como despesa.
*/
export default function FinUp() {
  /*
    Reutilizamos o mesmo hook usado pelo Dashboard.

    Isso significa que Banco Tri e FinUp
    trabalham sobre a mesma fonte de transações.
  */
    const {transactions, loading, error} = useAccount()  
   /*
    Enquanto os dados ainda não chegaram,
    mostramos uma mensagem temporária.
  */
        if (loading) {
        return <p>Carregando dados financeiros...</p>
        }
        /*
    Caso ocorra erro no carregamento,
    interrompemos a renderização normal.
  */
        if (error) {
        return <p>Erro: {error}</p>
        }
       /*
    A página não realiza os cálculos financeiros.

    Ela envia as transações para financialService,
    que devolve:

    - total de receitas;
    - total de despesas;
    - resultado.

    Isso separa apresentação de regra de negócio.
  */
        const { totalIncome, totalExpenses, balance } = calculateFinancialSummary(transactions)
        /*o mesmo conjunto de transações também é enviado para outra regra do financialService.
          Dessa vez queremos descobrir quanto foi gasto em cada categoria. */
        const expensesByCategory = calculateExpensesByCategory(transactions)
        {formatCurrency(balance)} /*adicionado para exibir o saldo formatado*/
        return (<div className="finup-page"> {/* Cabeçalho principal do módulo FinUp */}
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
            {/*
        Resumo financeiro.

        Cada article representa um indicador
        independente da visão financeira.
            */}
            <section className="financial-summary">
              {/* Total de entradas financeiras */}
             <article className="financial-card income">
              <span>Receitas</span>
                <strong>
                {formatCurrency(totalIncome)}
                </strong>
             </article>
              {/* Total de saídas financeiras */}
             <article className="financial-card expense">
              <span>Despesas</span>
               <strong>
               {formatCurrency(totalExpenses)}
               </strong>
             </article>
              {/*Diferença entre receitas e despesas: resultado = receitas - despesas*/}
             <article className="financial-card balance">
              <span>Resultado</span>
               <strong>
               {formatCurrency(balance)}
               </strong>
             </article>
            </section>
            {/*a página entrega ao componente os valores que já foram calculados pelo financialService.
              CategorySummary não precisa conhecer a lista original de transações.*/}
          <CategorySummary expensesByCategory={expensesByCategory}/>
        </div>)
}