import { lazy, Suspense, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "../components/layout/appLayout"
import Login from "../pages/login/Login"
import LoadingScreen from "../components/layout/LoadingScreen"

// As páginas principais carregam quando o visitante entra em cada área.
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"))
const FinUp = lazy(() => import("../pages/finup/finup"))
const SESSION_KEY = "banco-tri-demo-session"

export default function AppRouter() {
  // A sessão guarda apenas o estado da demonstração nesta aba, sem credenciais.
  const [entered, setEntered] = useState(() => sessionStorage.getItem(SESSION_KEY) === "active")
  function enterDemo() { sessionStorage.setItem(SESSION_KEY, "active"); setEntered(true) }
  function leaveDemo() { sessionStorage.removeItem(SESSION_KEY); setEntered(false) }

  return (
    <Routes>
      <Route path="/" element={entered ? <Navigate to="/dashboard" replace /> : <Login onEnter={enterDemo} />} />
      <Route element={entered ? <AppLayout onExit={leaveDemo} /> : <Navigate to="/" replace />}>
        <Route path="/dashboard" element={<Suspense fallback={<LoadingScreen />}><Dashboard /></Suspense>} />
        <Route path="/finup" element={<Suspense fallback={<LoadingScreen finup />}><FinUp /></Suspense>} />
      </Route>
      <Route path="*" element={<Navigate to={entered ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}
