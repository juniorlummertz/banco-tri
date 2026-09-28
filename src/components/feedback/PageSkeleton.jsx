/* O esqueleto mantém a forma aproximada da tela durante download ou busca.
   É estático para não competir com o conteúdo financeiro. */
export default function PageSkeleton({ variant = "dashboard" }) {
  return (
    <div className="page-skeleton" role="status" aria-label="Carregando página">
      <span className="sr-only">Carregando informações...</span>
      <div aria-hidden="true">
        <div className="skeleton-line skeleton-eyebrow" />
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-subtitle" />
        {variant === "finup" ? (
          <>
            <div className="skeleton-grid">
              <div className="skeleton-card" /><div className="skeleton-card" /><div className="skeleton-card" />
            </div>
            <div className="skeleton-panel skeleton-form" />
            <div className="skeleton-panel" />
          </>
        ) : (
          <>
            <div className="skeleton-balance" />
            <div className="skeleton-panel" />
          </>
        )}
      </div>
    </div>
  )
}
