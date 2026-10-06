import { NavLink, useNavigate } from "react-router-dom"
import { ArrowLeftRight, ChartNoAxesCombined, House, LogOut } from "lucide-react"

const menuItems = [
  { name: "Visão geral", path: "/dashboard", icon: House },
  { name: "FinUp", path: "/finup", icon: ChartNoAxesCombined },
]

export default function Sidebar({ onExit }) {
  const navigate = useNavigate()
  function exit() { onExit(); navigate("/", { replace: true }) }
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <div className="brand"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span className="brand-word">tri<span>.</span></span></div>
        <span className="sidebar-caption">SEU ESPAÇO FINANCEIRO</span>
      </div>
      <div className="sidebar-nav-group"><span className="sidebar-group-label">NAVEGAÇÃO</span>
        <nav className="sidebar-menu" aria-label="Navegação principal">
          {menuItems.map(({ name, path, icon: Icon }) => <NavLink key={path} to={path} className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}><Icon size={19} strokeWidth={1.9} aria-hidden="true" /><span>{name}</span></NavLink>)}
        </nav>
      </div>
      <div className="sidebar-bottom"><div className="sidebar-info"><ArrowLeftRight size={19} aria-hidden="true" /><span>Um banco para explorar.<br /><strong>Um futuro para planejar.</strong></span></div><button type="button" className="logout-button" onClick={exit}><LogOut size={18} aria-hidden="true" /> Sair da demonstração</button></div>
    </aside>
  )
}
