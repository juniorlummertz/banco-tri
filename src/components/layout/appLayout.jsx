import { Suspense } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Sidebar from "./sidebar"
import PageSkeleton from "../feedback/PageSkeleton"

export default function AppLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduceMotion = useReducedMotion()
  const variant = location.pathname === "/finup" ? "finup" : "dashboard"

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content" id="main-content">
        {/* A página anterior sai discretamente antes da próxima entrar. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<PageSkeleton variant={variant} />}>
              {outlet}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
