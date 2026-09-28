import TransactionItem from "./transactionItem"

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty-state">Nenhuma movimentação encontrada neste período.</p>
  }
  return (
    <div className="transaction-list">

      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}

    </div>
  )
}
