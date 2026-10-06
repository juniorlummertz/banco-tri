import { formatCurrency } from "../../utils/currency"
import { ArrowUpRight, Eye, CreditCard } from "lucide-react"
import { useState } from "react"

export default function BalanceCard({ account }) {
  const [visible, setVisible] = useState(true)
  return (
    <section className="balance-card">
      <div className="balance-art" aria-hidden="true"><span /><span /><span /></div>
      <div className="balance-top"><span className="balance-account-tag"><CreditCard size={17} aria-hidden="true" /> CONTA DIGITAL</span><span className="balance-brand">tri<span>.</span></span></div>
      <div className="balance-main"><span className="balance-label">Saldo disponível <button type="button" aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"} aria-pressed={!visible} onClick={() => setVisible(!visible)} className="visibility-button"><Eye size={18} aria-hidden="true" /></button></span><h2 className="balance-value">{visible ? formatCurrency(account.balance) : "R$ ••••••"}</h2><span className="balance-caption">Seu espaço para ir mais longe <ArrowUpRight size={16} aria-hidden="true" /></span></div>
      <div className="account-info"><span><small>AGÊNCIA</small>{account.agency}</span><span><small>CONTA</small>{account.number}</span><span className="account-chip" aria-hidden="true"><i /><i /></span>
      </div>
    </section>
  )
}
