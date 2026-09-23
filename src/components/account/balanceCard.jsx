import { formatCurrency } from "../../utils/currency"

export default function BalanceCard({ account }) {
  return (
    <section className="balance-card">

      <span className="balance-label">
        Saldo disponível
      </span>

      <h2 className="balance-value">
        {formatCurrency(account.balance)}
      </h2>

      <div className="account-info">
        <span>
          Agência: {account.agency}
        </span>

        <span>
          Conta: {account.number}
        </span>
      </div>

    </section>
  )
}