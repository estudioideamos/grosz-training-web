"use client";

import { useEffect, useRef, useState } from "react";
import { TrainingIcon, type TrainingIconName } from "./TrainingIcon";

type ProcessStep = [string, string, string, TrainingIconName];

export function ProcessCarousel({ steps }: { steps: ProcessStep[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const desktop = window.matchMedia("(min-width: 901px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const advance = () => {
      if (!desktop.matches || reducedMotion.matches || pausedRef.current) return;
      const card = viewport.querySelector<HTMLElement>(".process-step");
      if (!card) return;

      indexRef.current += 1;
      viewport.scrollTo({ left: card.offsetWidth * indexRef.current, behavior: "smooth" });

      if (indexRef.current === steps.length) {
        resetTimerRef.current = setTimeout(() => {
          viewport.scrollTo({ left: 0, behavior: "auto" });
          indexRef.current = 0;
        }, 720);
      }
    };

    const interval = window.setInterval(advance, 2800);
    return () => {
      window.clearInterval(interval);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [steps.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    pausedRef.current = true;
    dragRef.current = { active: true, startX: event.clientX, scrollLeft: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current.active) return;
    viewport.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current.active) return;
    dragRef.current.active = false;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    window.setTimeout(() => { pausedRef.current = false; }, 900);
  };

  const renderedSteps = [...steps, ...steps];

  const goToStep = (nextIndex: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".process-step");
    if (!viewport || !card) return;
    const normalizedIndex = (nextIndex + steps.length) % steps.length;
    indexRef.current = normalizedIndex;
    setActiveIndex(normalizedIndex);
    viewport.scrollTo({ left: card.offsetWidth * normalizedIndex, behavior: "smooth" });
  };

  const syncActiveStep = () => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".process-step");
    if (!viewport || !card || card.offsetWidth === 0) return;
    const current = Math.round(viewport.scrollLeft / card.offsetWidth) % steps.length;
    setActiveIndex(current);
  };

  return (
    <div className="process-carousel">
      <div
        ref={viewportRef}
        className="process-flow"
        aria-label="Las cuatro etapas del método Grosz"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { if (!dragRef.current.active) pausedRef.current = false; }}
        onFocus={() => { pausedRef.current = true; }}
        onBlur={() => { pausedRef.current = false; }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onScroll={syncActiveStep}
      >
        <div className="process-track">
          {renderedSteps.map(([number, title, text, icon], index) => (
            <article className="process-step" key={`${number}-${index}`} aria-hidden={index >= steps.length ? true : undefined}>
              <div className="process-icon"><TrainingIcon name={icon} /></div>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="process-controls" aria-label="Navegación de las etapas">
        <strong><span>{String(activeIndex + 1).padStart(2, "0")}</span> / {String(steps.length).padStart(2, "0")}</strong>
        <div>
          <button type="button" onClick={() => goToStep(activeIndex - 1)} aria-label="Etapa anterior">←</button>
          <button type="button" onClick={() => goToStep(activeIndex + 1)} aria-label="Etapa siguiente">→</button>
        </div>
      </div>
    </div>
  );
}
