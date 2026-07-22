"use client";

import { useState, type CSSProperties } from "react";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const style = { "--reveal": `${position}%`, "--comparison-image": `url(${basePath}/assets/cambio-03.jpg)` } as CSSProperties;

  return (
    <div className="before-after" style={style}>
      <div className="comparison-image comparison-before" role="img" aria-label="Antes del proceso Grosz"></div>
      <div className="comparison-image comparison-after" role="img" aria-label="Después del proceso Grosz"></div>
      <div className="comparison-divider" aria-hidden="true"><span>↔</span></div>
      <span className="comparison-label before">Antes</span>
      <span className="comparison-label after">Después</span>
      <input
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Deslizar para comparar antes y después"
      />
    </div>
  );
}
