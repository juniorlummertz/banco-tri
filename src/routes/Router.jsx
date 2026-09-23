import {
  Navigate,
  Route,
  Routes
} from "react-router-dom"

import AppLayout from "../components/layout/appLayout"
import Dashboard from "../pages/dashboard/dashboard"

export default function AppRouter() {
  return (
    <Routes>

      <Route element={<AppLayout />}>

        <Route path= "/" element={
            <Navigate to= "/dashboard" replace/>}/>
        <Route path= "/dashboard" element={<Dashboard />}/>
        </Route>
    </Routes>
  )
}