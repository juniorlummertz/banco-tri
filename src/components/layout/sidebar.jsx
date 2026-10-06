import { NavLink } from "react-router-dom"

import { Home, ChartNoAxesCombined } from "lucide-react"

const menuItems = [{
    name: "Início",
    path: "/dashboard",
    icon: Home}, {
    name: "FinUp",
    path: "/finup",
    icon: ChartNoAxesCombined}
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
        <div className="brand">
        <div className="brand-symbol">
          TRI
        </div>
        <div>
          <strong>Banco Tri</strong>
          <span>Banco digital</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon
            return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"}>
              <Icon size={20} />
                <span>
                {item.name}
                </span>
            </NavLink>
          )
        })}
      </nav>
      </aside>
  )
}
