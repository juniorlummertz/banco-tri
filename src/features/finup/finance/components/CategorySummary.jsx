import { formatCurrency } from "../../../../utils/currency"
import { getCategoryLabel } from "../../../../utils/category"

/* Componente só apresenta os totais calculados pela camada de negócio. */
export default function CategorySummary({ expensesByCategory }) {
  const categories = Object.entries(expensesByCategory)
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0)
  return (
    <section className="category-panel">
      <div className="category-header">
        <span className="section-label">FinUp</span>
        <h2>Despesas por categoria</h2>
      </div>
      {categories.length === 0 ? <p>Nenhuma despesa registrada.</p> : (
        <div className="category-list">
          {categories.map(([category, amount]) => (
            <div className="category-item" key={category}>
              <div className="category-line"><span>{getCategoryLabel(category)}</span><strong>{formatCurrency(amount)}</strong></div>
              <div className="category-track" role="img" aria-label={`${getCategoryLabel(category)}: ${Math.round((amount / total) * 100)}% das despesas`}><span style={{ transform: `scaleX(${amount / total})` }} /></div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
