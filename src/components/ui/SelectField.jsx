import { useEffect, useId, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"

// Lista compartilhada pelo banco e pelo FinUp; mantém os códigos de dados existentes.
export default function SelectField({ label, value, options, onChange }) {
  const id = useId()
  const root = useRef(null)
  const trigger = useRef(null)
  const optionRefs = useRef([])
  const [open, setOpen] = useState(false)
  const [above, setAbove] = useState(false)
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))

  useEffect(() => {
    if (!open) return undefined
    function dismiss(event) { if (!root.current?.contains(event.target)) setOpen(false) }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [open])

  function show() {
    const bounds = root.current.getBoundingClientRect()
    setAbove(window.innerHeight - bounds.bottom < 270 && bounds.top > window.innerHeight - bounds.bottom)
    setOpen(true)
    requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus())
  }

  function choose(option) {
    onChange(option.value)
    setOpen(false)
    trigger.current?.focus()
  }

  function handleKeys(event) {
    if (event.key === "Escape" && open) {
      event.preventDefault()
      setOpen(false)
      trigger.current?.focus()
      return
    }
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault()
      show()
      return
    }
    if (!open || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const current = optionRefs.current.findIndex((node) => node === document.activeElement)
    const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1
      : (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length
    optionRefs.current[next]?.focus()
  }

  return (
    <div className={`field-control${open ? " field-open" : ""}`} ref={root} onKeyDown={handleKeys}>
      <span className="field-label" id={`${id}-label`}>{label}</span>
      <button ref={trigger} type="button" className={`field-trigger${open ? " is-open" : ""}`} role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`} aria-labelledby={`${id}-label ${id}-value`} onClick={() => open ? setOpen(false) : show()}>
        <span id={`${id}-value`}>{options[selectedIndex].label}</span><ChevronDown size={17} aria-hidden="true" />
      </button>
      {open && <div className={`field-popover select-popover${above ? " popover-above" : ""}`} role="listbox" id={`${id}-options`} aria-labelledby={`${id}-label`}>
        <span className="popover-caption">SELECIONE UMA OPÇÃO</span>
        {options.map((option, index) => (
          <button key={option.value} ref={(node) => { optionRefs.current[index] = node }} type="button" role="option" aria-selected={option.value === value} className={`select-option${option.value === value ? " selected" : ""}`} onClick={() => choose(option)}>
            {option.label}{option.value === value && <Check size={16} aria-hidden="true" />}
          </button>
        ))}
      </div>}
    </div>
  )
}
