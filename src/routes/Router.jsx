import {Navigate, Route, Routes} from "react-router-dom"
import FinUp from "../pages/finup/finup"
import AppLayout from "../components/layout/appLayout"
import Dashboard from "../pages/dashboard/dashboard"
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
        </Route>
    </Routes>
  )
}