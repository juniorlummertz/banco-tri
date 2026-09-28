import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import PageSkeleton from "./PageSkeleton"

/* Troca carregamento, erro e conteúdo sem salto visual. O texto continua
   acessível quando o usuário prefere movimento reduzido. */
export default function PageState({ loading, error, variant, onRetry, children }) {
  const reduceMotion = useReducedMotion()
  const state = loading ? "loading" : error ? "error" : "ready"

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={state}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -3 }}
        transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        {loading ? <PageSkeleton variant={variant} /> : error ? (
          <section className="state-panel" role="alert">
            <h2>Não foi possível carregar</h2>
            <p>{error}</p>
            <button type="button" onClick={onRetry}>Tentar novamente</button>
          </section>
        ) : children}
      </motion.div>
    </AnimatePresence>
  )
}
