"use client";
import { ResponsiveImage } from "./ResponsiveImage";


import { useEffect, useRef, useState } from "react";

const results = [
  ...Array.from({ length: 7 }, (_, index) => ({
    src: `resultado-original-${String(index + 1).padStart(2, "0")}.webp`,
    source: "Archivo original Grosz",
  })),
  ...Array.from({ length: 4 }, (_, index) => ({
    src: `cambio-0${index + 1}.webp`,
    source: "Proceso Grosz Training",
  })),
];

export function ResultsGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const isOpen = active !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen) { dialog.close(); return; }
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; opener?.focus(); };
  }, [isOpen]);

  useEffect(() => {
    function navigateWithKeyboard(event: KeyboardEvent) {
      if (active !== null && event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (buttons?.length) {
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
      if (event.key === "Escape") setActive(null);
      if (active !== null && event.key === "ArrowRight") setActive((active + 1) % results.length);
      if (active !== null && event.key === "ArrowLeft") setActive((active - 1 + results.length) % results.length);
    }
    window.addEventListener("keydown", navigateWithKeyboard);
    return () => window.removeEventListener("keydown", navigateWithKeyboard);
  }, [active]);

  return (
    <>
      <div className="results-masonry">
        {results.map((result, index) => (
          <button className="result-gallery-card" type="button" onClick={() => setActive(index)} key={result.src} aria-label={`Ampliar caso ${index + 1}`}>
            <figure>
              <ResponsiveImage src={`${basePath}/assets/${result.src}`} alt={`Transformación Grosz Training, caso ${String(index + 1).padStart(2, "0")}`} loading="lazy" decoding="async" />
              <figcaption><span>Caso {String(index + 1).padStart(2, "0")}</span><b>{result.source}</b><i>Ampliar ↗</i></figcaption>
            </figure>
          </button>
        ))}
      </div>
      {active !== null && (
        <dialog ref={dialogRef} className="results-lightbox" onCancel={() => setActive(null)} aria-label={`Caso ${active + 1} ampliado`} onClick={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Cerrar">×</button>
          <button className="lightbox-arrow prev" type="button" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + results.length) % results.length); }} aria-label="Caso anterior">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <ResponsiveImage src={`${basePath}/assets/${results[active].src}`} alt={`Transformación Grosz Training, caso ${active + 1}`} decoding="async" />
            <figcaption><span>Caso {String(active + 1).padStart(2, "0")}</span><b>{results[active].source}</b></figcaption>
          </figure>
          <button className="lightbox-arrow next" type="button" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % results.length); }} aria-label="Caso siguiente">→</button>
        </dialog>
      )}
    </>
  );
}
