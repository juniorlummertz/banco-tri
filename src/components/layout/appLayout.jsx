import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./sidebar"

export default function AppLayout({ onExit }) {
  const isFinup = useLocation().pathname.startsWith("/finup")
  return (
    <div className={`app-layout ${isFinup ? "theme-finup" : "theme-bank"}`}>
      <Sidebar onExit={onExit} />
      <main className="app-content" id="main-content"><Outlet /></main>
    </div>
  )
}
