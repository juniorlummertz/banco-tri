export default function LoadingScreen({ finup = false }) {
  return (
    <div className={`loading-screen ${finup ? "loading-finup" : ""}`} role="status" aria-label="Carregando informações">
      <span className="skeleton skeleton-kicker" /><span className="skeleton skeleton-title" />
      <span className="skeleton skeleton-subtitle" /><span className="skeleton skeleton-hero" />
      <div className="skeleton-grid"><span className="skeleton" /><span className="skeleton" /><span className="skeleton" /></div>
      <span className="sr-only">Carregando informações...</span>
    </div>
  )
}
