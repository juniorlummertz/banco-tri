import { formatCurrency } from "../../../../utils/currency"
import { getCategoryLabel } from "../../../../utils/category"

/* Componente só apresenta os totais calculados pela camada de negócio. */
export default function CategorySummary({ expensesByCategory }) {
  const categories = Object.entries(expensesByCategory)
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
              <span>{getCategoryLabel(category)}</span>
              <strong>{formatCurrency(amount)}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
