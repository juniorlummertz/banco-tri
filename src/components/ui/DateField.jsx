import { useEffect, useId, useRef, useState } from "react"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

const shortDate = new Intl.DateTimeFormat("pt-BR")
const longDate = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" })
const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" })
const weekdays = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"]

function fromValue(value) {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day, 12)
}
function toValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

// Calendário de demonstração: a regra financeira continua recebendo YYYY-MM-DD.
export default function DateField({ label, value, onChange }) {
  const id = useId()
  const root = useRef(null)
  const trigger = useRef(null)
  const selectedRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [above, setAbove] = useState(false)
  const [month, setMonth] = useState(() => {
    const date = fromValue(value)
    return new Date(date.getFullYear(), date.getMonth(), 1, 12)
  })
  const chosen = fromValue(value)
  const today = new Date()
  const startOffset = (month.getDay() + 6) % 7
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()

  useEffect(() => {
    if (!open) return undefined
    function dismiss(event) { if (!root.current?.contains(event.target)) setOpen(false) }
    function escape(event) { if (event.key === "Escape") { setOpen(false); trigger.current?.focus() } }
    document.addEventListener("pointerdown", dismiss)
    document.addEventListener("keydown", escape)
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape) }
  }, [open])

  function show() {
    const bounds = root.current.getBoundingClientRect()
    setAbove(window.innerHeight - bounds.bottom < 365 && bounds.top > window.innerHeight - bounds.bottom)
    setMonth(new Date(chosen.getFullYear(), chosen.getMonth(), 1, 12))
    setOpen(true)
    requestAnimationFrame(() => selectedRef.current?.focus())
  }
  function moveMonth(delta) { setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1, 12)) }
  function choose(date) { onChange(toValue(date)); setOpen(false); trigger.current?.focus() }
  function moveDay(event, date) {
    const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key]
    if (!offset) return
    event.preventDefault()
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset, 12)
    if (next.getMonth() !== month.getMonth() || next.getFullYear() !== month.getFullYear()) {
      setMonth(new Date(next.getFullYear(), next.getMonth(), 1, 12))
    }
    requestAnimationFrame(() => root.current?.querySelector(`[data-date="${toValue(next)}"]`)?.focus())
  }

  return (
    <div className={`field-control${open ? " field-open" : ""}`} ref={root}>
      <span className="field-label" id={`${id}-label`}>{label}</span>
      <button ref={trigger} type="button" className={`field-trigger${open ? " is-open" : ""}`} aria-haspopup="dialog" aria-expanded={open} aria-labelledby={`${id}-label ${id}-value`} onClick={() => open ? setOpen(false) : show()}>
        <span id={`${id}-value`}>{shortDate.format(chosen)}</span><CalendarDays size={18} aria-hidden="true" />
      </button>
      {open && <div role="dialog" aria-label="Escolher data" className={`field-popover calendar-popover${above ? " popover-above" : ""}`}>
        <div className="calendar-top"><span>{monthName.format(month).replace(/^./, (letter) => letter.toUpperCase())}</span><div><button type="button" aria-label="Mês anterior" onClick={() => moveMonth(-1)}><ChevronLeft size={18} /></button><button type="button" aria-label="Próximo mês" onClick={() => moveMonth(1)}><ChevronRight size={18} /></button></div></div>
        <div className="calendar-grid">{weekdays.map((name) => <span key={name} className="calendar-weekday">{name}</span>)}
          {Array.from({ length: startOffset }, (_, index) => <span key={`empty-${index}`} />)}
          {Array.from({ length: days }, (_, index) => {
            const date = new Date(month.getFullYear(), month.getMonth(), index + 1, 12)
            const selected = toValue(date) === value
            const isToday = date.toDateString() === today.toDateString()
            const currentMonth = chosen.getFullYear() === month.getFullYear() && chosen.getMonth() === month.getMonth()
            return <button key={index + 1} ref={selected ? selectedRef : null} type="button" data-date={toValue(date)} tabIndex={selected || (!currentMonth && index === 0) ? 0 : -1} aria-label={longDate.format(date)} aria-pressed={selected} className={`calendar-day${selected ? " selected" : ""}${isToday ? " today" : ""}`} onKeyDown={(event) => moveDay(event, date)} onClick={() => choose(date)}>{index + 1}</button>
          })}
        </div>
        <div className="calendar-footer"><button type="button" onClick={() => choose(today)}>Ir para hoje</button><span>Escolha o dia do lançamento</span></div>
      </div>}
    </div>
  )
}
