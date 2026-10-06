import { formatCurrency } from "../../utils/currency"
import { getCategoryLabel } from "../../utils/category"
/*
  Representa visualmente uma única movimentação financeira.

  O componente recebe a transação por props e não altera
  os dados recebidos; apenas decide como apresentá-los.
*/
export default function TransactionItem({ transaction }) {
  const isCredit =
    transaction.direction === "credit"
  const date = new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${transaction.createdAt.slice(0, 10)}T12:00:00`)
  )
  return (
    <li className="transaction-item">

      <div className="transaction-details">
        <strong>
          {transaction.description}
        </strong>
         {/*
          O banco armazena categorias usando códigos estáveis,
          como "food". A interface converte esses códigos para
          textos amigáveis, como "Alimentação".
        */}
        <span>
          {getCategoryLabel(transaction.category)} · {date}
        </span>
      </div>

      <strong
        className={
          isCredit
            ? "transaction-value credit"
            : "transaction-value debit"
        }
      >
        {isCredit ? "+" : "-"}

        {formatCurrency(transaction.amount)}
      </strong>

    </li>
  )
}
