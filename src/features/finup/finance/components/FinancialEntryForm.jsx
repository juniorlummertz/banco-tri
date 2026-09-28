import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

// Categorias disponíveis na interface; os códigos são estáveis nos dados.
const expenseCategories = [
  ["food", "Alimentação"], ["housing", "Moradia"],
  ["transport", "Transporte"], ["health", "Saúde"],
  ["education", "Educação"], ["leisure", "Lazer"],
  ["subscriptions", "Assinaturas"], ["other", "Outros"],
]

function initialValues() {
  const now = new Date()
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return { description: "", amount: "", type: "expense", category: "food", date: localDate.toISOString().slice(0, 10) }
}

/* Formulário controlado: validação final e armazenamento ficam fora da interface. */
export default function FinancialEntryForm({ onAdd }) {
  const [values, setValues] = useState(initialValues)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("idle")
  const reduceMotion = useReducedMotion()

  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setMessage("")
    setStatus("idle")
  }

  async function submit(event) {
    event.preventDefault()
    if (status === "saving") return
    setStatus("saving")
    setMessage("")
    try {
      await onAdd(values)
      setValues(initialValues())
      setStatus("success")
      setMessage("Lançamento adicionado ao FinUp.")
    } catch (err) {
      setStatus("error")
      setMessage(err.message)
    }
  }

  return (
    <section className="financial-entry-panel" aria-labelledby="add-entry-title">
      <h2 id="add-entry-title">Adicionar receita ou despesa</h2>
      <p>Os lançamentos ficam salvos neste navegador e não alteram a conta do Banco TRI.</p>
      <form onSubmit={submit} className="financial-entry-form" aria-busy={status === "saving"}>
        <label className="field-type">Tipo
          <select name="type" value={values.type} onChange={change}>
            <option value="expense">Despesa</option><option value="income">Receita</option>
          </select>
        </label>
        <label className="field-description">Descrição
          <input name="description" value={values.description} onChange={change} maxLength="100" required placeholder="Ex.: aluguel" />
        </label>
        <label className="field-amount">Valor (R$)
          <input name="amount" value={values.amount} onChange={change} type="text" inputMode="decimal" required placeholder="0,00" />
        </label>
        <label className="field-date">Data
          <input name="date" value={values.date} onChange={change} type="date" required />
        </label>
        {values.type === "expense" && (
          <label className="field-category">Categoria
            <select name="category" value={values.category} onChange={change}>
              {expenseCategories.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </label>
        )}
        <button type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Salvando..." : "Adicionar lançamento"}
        </button>
      </form>
      {/* A saída do aviso é mais discreta que a entrada; o texto não depende da animação. */}
      <AnimatePresence mode="wait" initial={false}>
        {(status === "saving" || message) && (
          <motion.p
            key={status}
            className={`form-feedback ${status}`}
            role={status === "error" ? "alert" : "status"}
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -2 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "saving" ? "Salvando lançamento..." : message}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
