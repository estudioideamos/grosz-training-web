const primary = ["Entrenamiento personalizado", "Nutrición", "Seguimiento real"];
const secondary = ["Evaluar", "Planificar", "Entrenar", "Medir", "Ajustar", "Avanzar"];

export function Marquee({ alternate = false }: { alternate?: boolean }) {
  const items = alternate ? secondary : primary;
  const group = (hidden = false) => (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {items.map((item) => <span key={item}>{item}<b>≫</b></span>)}
    </div>
  );
  return (
    <div className={`ticker ${alternate ? "ticker-secondary" : ""}`} aria-label={alternate ? "Etapas del proceso" : "Servicios incluidos"}>
      <div className="ticker-track">{group()}{group(true)}</div>
    </div>
  );
}
