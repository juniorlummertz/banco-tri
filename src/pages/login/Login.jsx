import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, BadgeCheck, ChartNoAxesCombined, LockKeyhole } from "lucide-react"

export default function Login({ onEnter }) {
  const [opening, setOpening] = useState(false)
  const navigate = useNavigate()

  function enter(event) {
    event.preventDefault()
    if (opening) return
    setOpening(true)
    // A transição sinaliza a troca de tela; nenhum dado ou senha é verificado.
    window.setTimeout(() => {
      onEnter()
      navigate("/dashboard", { replace: true })
    }, 220)
  }

  return (
    <main className="entry-page">
      <section className="entry-story" aria-label="Apresentação do Banco TRI">
        <div className="entry-story-inner">
          <div className="entry-brand"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span>tri<span className="brand-dot">.</span></span></div>
          <div className="entry-copy">
            <span className="eyebrow light">BANCO TRI / EXPERIÊNCIA DIGITAL</span>
            <h1>Seu dinheiro.<br /><em>Uma nova</em><br />perspectiva.</h1>
            <p>Uma experiência financeira clara, feita para enxergar cada movimento com mais confiança.</p>
          </div>
          <div className="entry-visual" aria-hidden="true">
            <div className="entry-orbit orbit-one" /><div className="entry-orbit orbit-two" />
            <div className="entry-card"><span className="entry-card-top">tri<span>.</span><small>DEMONSTRAÇÃO</small></span><span className="entry-card-chip" /><span className="entry-card-bottom">●●●● &nbsp; ●●●● &nbsp; ●●●● &nbsp; 1983</span></div>
          </div>
          <div className="entry-story-footer"><span>01 / 03</span><span>CONTROLE · CLAREZA · MOVIMENTO</span></div>
        </div>
      </section>
      <section className="entry-access" aria-labelledby="access-title">
        <div className="entry-access-top"><span className="access-tag"><span className="status-dot" /> Ambiente de demonstração</span><span>Banco TRI © 2026</span></div>
        <div className="entry-access-content">
          <div className="entry-emblem" aria-hidden="true"><span className="brand-symbol"><i /><i /><i /></span></div>
          <span className="eyebrow">BEM-VINDO AO TRI</span>
          <h2 id="access-title">Acesse sua experiência.</h2>
          <p className="entry-lead">Explore a conta fictícia e acompanhe como cada movimentação aparece no FinUp.</p>
          <form className="entry-form" onSubmit={enter}>
            <div className="demo-identity"><span className="demo-avatar">JL</span><span><strong>Conta de demonstração</strong><small>Junior Lummertz · dados fictícios</small></span><BadgeCheck size={20} aria-hidden="true" /></div>
            <button className="primary-button" type="submit" disabled={opening} aria-busy={opening}>
              {opening ? "Abrindo demonstração..." : "Entrar na conta"}<ArrowRight size={19} aria-hidden="true" />
            </button>
            <p className="entry-legal"><LockKeyhole size={15} aria-hidden="true" /> Acesso demonstrativo, sem senha ou autenticação real.</p>
          </form>
        </div>
        <div className="entry-access-footer"><ChartNoAxesCombined size={19} aria-hidden="true" /><span>FinUp: organização financeira conectada à demonstração</span></div>
      </section>
    </main>
  )
}
