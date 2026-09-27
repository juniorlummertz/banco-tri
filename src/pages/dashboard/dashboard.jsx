import { useAccount } from "../../hooks/useAccount"
import BalanceCard from "../../components/account/balanceCard"
import TransactionList from "../../components/transactions/transactionList"
/*
  Página principal da área bancária.

  Responsabilidades:
  - obter os dados da conta através do useAccount;
  - controlar estados de carregamento e erro;
  - organizar os componentes visuais da página.

  A página não acessa diretamente o JSON ou banco de dados.
  Essa responsabilidade fica nas camadas inferiores.
*/
export default function Dashboard() {
    /*
    Desestrutura os dados disponibilizados
    pelo hook customizado useAccount.
    */
    const {
        user,
        account,
        transactions,
        loading,
        error
    } = useAccount()
    /*
    Renderização condicional.

    Enquanto os dados ainda estão sendo carregados,
    não tentamos mostrar conta ou transações.
  */
    if(loading) {
        return(
            <div>
                <p>Carregando  dados...</p>
            </div>
        )
    } 
    /*
    Se ocorrer algum problema durante
    o carregamento dos dados,
    apresentamos a mensagem de erro.
    */

    if (error) {
        return(
            <div>
                <p>Erro: {error}</p>
            </div>
        )
    }
    /*
    Proteção adicional.

    Mesmo sem erro, verificamos se os dados
    fundamentais realmente foram encontrados.
  */
    if (!user || !account){
        return(
            <div>
                <p>Dados da conta não encontrado.</p>
            </div>
        )
    }
    return (
        <div>
            {/*
        Cabeçalho da página.

        O nome do usuário vem dos dados carregados
        pelo useAccount.
      */}
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
        {/*
        Componente responsável apenas
        por apresentar informações da conta.

        O objeto account é enviado através de props.
      */}
            <BalanceCard account={account}/>
            {/*
        Painel responsável pela área de extrato.
      */}

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
            {/*
            O tamanho do array informa
            quantas movimentações foram carregadas.
          */}
    <span className="transaction-count">
      {transactions.length} movimentações
    </span>

  </div>
        {/*
          O Dashboard não precisa saber
          como cada transação será desenhada.

          Ele envia a lista para TransactionList,
          que delega cada item para TransactionItem.
        */}
  <TransactionList
    transactions={transactions}
  />

</section>
        </div>    
    )
}