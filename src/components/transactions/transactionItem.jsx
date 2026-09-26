import { formatCurrency } from "../../utils/currency"
import { getCategoryLabel } from "../../utils/category"

export default function TransactionItem({ transaction }) {
  const isCredit =
    transaction.direction === "credit"

  const typeLabels = {
    pix: "Pix",
    purchase: "Compra",
    transfer: "Transferência",
    payment: "Pagamento"
  }
  return (
    <div className="transaction-item">

      <div className="transaction-details">
        <strong>
          {transaction.description}
        </strong>

        <span>
          {getCategoryLabel(transaction.category)}
        </span>
      </div> //trocado para exibir a categoria da transação

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

    </div>
  )
}