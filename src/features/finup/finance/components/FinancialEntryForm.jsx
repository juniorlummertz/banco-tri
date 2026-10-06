import { useState } from "react"

// Categorias disponíveis na interface; os códigos são estáveis nos dados.
const expenseCategories = [
  ["food", "Alimentação"], ["housing", "Moradia"],
  ["transport", "Transporte"], ["health", "Saúde"],
  ["education", "Educação"], ["leisure", "Lazer"],
  ["subscriptions", "Assinaturas"], ["other", "Outros"],
]

function initialValues(entry) {
  if (entry) return {
    description: entry.description,
    amount: entry.amount.toFixed(2).replace(".", ","),
    type: entry.type,
    category: entry.type === "expense" ? entry.category : "food",
    date: entry.date,
  }
  const now = new Date()
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return { description: "", amount: "", type: "expense", category: "food", date: localDate.toISOString().slice(0, 10) }
}

/* Formulário controlado: validação final e armazenamento ficam fora da interface. */
export default function FinancialEntryForm({ onSave, entry = null, onCancel }) {
  const [values, setValues] = useState(() => initialValues(entry))
  const [message, setMessage] = useState("")

  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setMessage("")
  }

  function submit(event) {
    event.preventDefault()
    try {
      onSave(values)
      if (!entry) {
        setValues(initialValues())
        setMessage("Lançamento adicionado ao FinUp.")
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <section className="financial-entry-panel" aria-labelledby="add-entry-title">
      <h2 id="add-entry-title">{entry ? "Editar lançamento do FinUp" : "Adicionar receita ou despesa"}</h2>
      <p>Os lançamentos ficam salvos neste navegador e não alteram a conta do Banco TRI.</p>
      <form onSubmit={submit} className="financial-entry-form">
        <label>Tipo
          <select name="type" value={values.type} onChange={change}>
            <option value="expense">Despesa</option><option value="income">Receita</option>
          </select>
        </label>
        <label>Descrição
          <input name="description" value={values.description} onChange={change} maxLength="100" required placeholder="Ex.: aluguel" autoFocus={Boolean(entry)} />
        </label>
        <label>Valor (R$)
          <input name="amount" value={values.amount} onChange={change} type="text" inputMode="decimal" required placeholder="0,00" />
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
        <button type="submit">{entry ? "Salvar alterações" : "Adicionar lançamento"}</button>
        {entry && <button type="button" className="secondary-button" onClick={onCancel}>Cancelar edição</button>}
      </form>
      {message && <p role="status">{message}</p>}
    </section>
  )
}
