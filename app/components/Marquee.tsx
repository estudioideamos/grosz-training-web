"use client";
import { useState } from "react";
const primary = ["Entrenamiento personalizado", "Nutricion", "Seguimiento real"];
const secondary = ["Evaluar", "Planificar", "Entrenar", "Medir", "Ajustar", "Avanzar"];

export function Marquee({ alternate = false }: { alternate?: boolean }) {
  const [paused, setPaused] = useState(false);
  const items = alternate ? secondary : primary;
  const group = (hidden = false) => (
    <div className="ticker-group" aria-hidden={hidden || undefined}>
      {items.map((item) => <span key={item}>{item}<b>≫</b></span>)}
    </div>
  );
  return (
    <div className={`ticker ${alternate ? "ticker-secondary" : ""}`} aria-label={alternate ? "Etapas del proceso" : "Servicios incluidos"}>
      <button type="button" className="ticker-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Reanudar" : "Pausar"}<span className="sr-only"> cinta animada</span></button>
      <div className="ticker-track" style={paused ? { animationPlayState: "paused" } : undefined}>{group()}{group(true)}</div>
    </div>
  );
}
