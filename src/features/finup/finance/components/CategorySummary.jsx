import { formatCurrency } from "../../../../utils/currency"
import { getCategoryLabel } from "../../../../utils/category"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/* Componente só apresenta os totais calculados pela camada de negócio. */
export default function CategorySummary({ expensesByCategory }) {
  const categories = Object.entries(expensesByCategory)
  const reduceMotion = useReducedMotion()
  return (
    <section className="category-panel">
      <div className="category-header">
        <span className="section-label">FinUp</span>
        <h2>Despesas por categoria</h2>
      </div>
      {categories.length === 0 ? <p>Nenhuma despesa registrada.</p> : (
        <div className="category-list">
          <AnimatePresence initial={false}>
            {categories.map(([category, amount]) => (
              <motion.div
                className="category-item"
                key={category}
                layout={reduceMotion ? false : "position"}
                initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -2 }}
                transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{getCategoryLabel(category)}</span>
                <strong>{formatCurrency(amount)}</strong>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
