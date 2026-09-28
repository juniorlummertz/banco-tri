import { useState } from "react"

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

  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setMessage("")
  }

  function submit(event) {
    event.preventDefault()
    try {
      onAdd(values)
      setValues(initialValues())
      setMessage("Lançamento adicionado ao FinUp.")
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <section className="financial-entry-panel" aria-labelledby="add-entry-title">
      <h2 id="add-entry-title">Adicionar receita ou despesa</h2>
      <p>Os lançamentos ficam salvos neste navegador e não alteram a conta do Banco TRI.</p>
      <form onSubmit={submit} className="financial-entry-form">
        <label>Tipo
          <select name="type" value={values.type} onChange={change}>
            <option value="expense">Despesa</option><option value="income">Receita</option>
          </select>
        </label>
        <label>Descrição
          <input name="description" value={values.description} onChange={change} maxLength="100" required placeholder="Ex.: aluguel" />
        </label>
        <label>Valor (R$)
          <input name="amount" value={values.amount} onChange={change} type="number" min="0.01" step="0.01" required placeholder="0,00" />
        </label>
        <label>Data
          <input name="date" value={values.date} onChange={change} type="date" required />
        </label>
        {values.type === "expense" && (
          <label>Categoria
            <select name="category" value={values.category} onChange={change}>
              {expenseCategories.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </label>
        )}
        <button type="submit">Adicionar lançamento</button>
      </form>
      {message && <p role="status">{message}</p>}
    </section>
  )
}
