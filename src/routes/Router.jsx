import { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "../components/layout/appLayout"
// Cada tela é baixada quando o usuário a acessa pela primeira vez.
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"))
const FinUp = lazy(() => import("../pages/finup/finup"))
 /* Centraliza as rotas da aplicação.

  As páginas declaradas dentro de AppLayout compartilham
  elementos estruturais, como a Sidebar.
*/

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<AppLayout />}>
          <Route path= "/" element={
            <Navigate to= "/dashboard" replace/>}/>
          <Route path= "/dashboard" element={<Dashboard />}/>
          <Route path="/finup" element={<FinUp />}/>
          <Route path="*" element={<Navigate to="/dashboard" replace />}/>
        </Route>
    </Routes>
  )
}
