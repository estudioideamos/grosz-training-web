import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ResultsGallery } from "../components/ResultsGallery";

export const metadata: Metadata = {
  title: "Resultados reales | Grosz Training",
  description: "Conocé transformaciones y procesos reales acompañados por Grosz Training.",
};

const whatsapp = "https://wa.me/5491160162831?text=Hola%20Grosz%20Training%2C%20vi%20los%20resultados%20y%20quiero%20empezar";

export default function ResultadosPage() {
  return (
    <main className="results-page">
      <SiteHeader subpage />
      <section className="results-hero">
        <div>
          <p className="kicker"><span></span> Antes y después</p>
          <h1>Trabajo real.<br /><em>Resultados reales.</em></h1>
        </div>
        <div className="results-hero-copy">
          <p>Cada cuerpo responde de una manera distinta. Lo que se repite es el sistema: evaluación, planificación, constancia y ajustes.</p>
          <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Quiero empezar mi proceso <span>↗</span></a>
        </div>
      </section>

      <section className="results-data" aria-label="Resumen de la galería">
        <div><strong>11</strong><span>Registros visuales</span></div>
        <div><strong>1:1</strong><span>Planificación individual</span></div>
        <div><strong>360°</strong><span>Entrenamiento + nutrición</span></div>
        <div><strong>Mes a mes</strong><span>Chequeo y ajustes</span></div>
      </section>

      <section className="results-gallery-section">
        <div className="results-gallery-heading">
          <p className="kicker dark"><span></span> Procesos documentados</p>
          <h2>El resultado<br />no se promete.<br /><em>Se trabaja.</em></h2>
          <p>Reunimos en un solo lugar el material del “Antes y Después” original de Grosz Training y las transformaciones destacadas de la página principal.</p>
        </div>
        <ResultsGallery />
        <p className="results-disclaimer">Las imágenes corresponden a procesos publicados por Grosz Training. Los resultados son individuales y dependen del punto de partida, la constancia y el seguimiento.</p>
      </section>

      <section className="results-cta">
        <p>Tu objetivo necesita un punto de partida.</p>
        <h2>El proximo caso<br />puede ser <em>el tuyo.</em></h2>
        <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Hablar con Grosz Training <span>↗</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
