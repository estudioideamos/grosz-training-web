import { BeforeAfter } from "./components/BeforeAfter";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TrainingIcon, type TrainingIconName } from "./components/TrainingIcon";
import { Marquee } from "./components/Marquee";

const whatsapp = "https://wa.me/5491160162831?text=Hola%20Grosz%20Training%2C%20quiero%20empezar%20mi%20plan";

const plans = [
  {
    number: "01",
    title: "Plan online",
    eyebrow: "Entrená desde cualquier lugar",
    features: [
      "Plan de alimentación personalizado",
      "Rutina de entrenamiento a medida",
      "Plan de suplementación deportiva",
      "Soporte por WhatsApp todo el mes",
      "Chequeo y ajustes mes a mes",
    ],
  },
  {
    number: "02",
    title: "Online + videollamada",
    eyebrow: "Con entrevista junto a Cristian Grosz",
    featured: true,
    features: [
      "Entrevista inicial por videollamada",
      "Plan de alimentación personalizado",
      "Rutina de entrenamiento a medida",
      "Plan de suplementación deportiva",
      "Seguimiento y ajustes mensuales",
    ],
  },
  {
    number: "03",
    title: "Presencial premium",
    eyebrow: "Evaluación en nuestras oficinas",
    features: [
      "Entrevista presencial con Cristian Grosz",
      "Plan integral de alimentación",
      "Entrenamiento 100% personalizado",
      "Soporte por WhatsApp todo el mes",
      "Chequeo y ajustes mes a mes",
    ],
  },
];

const principles = [
  ["01", "Individualidad", "Un plan construido para tu cuerpo, tus tiempos y tu objetivo."],
  ["02", "Metodo", "Entrenamiento y nutrición trabajan juntos, con decisiones basadas en tu evolución."],
  ["03", "Seguimiento", "No recibís un PDF y quedás solo: medimos, ajustamos y avanzamos con vos."],
];

const services: Array<[string, string, string, TrainingIconName]> = [
  ["01", "Entrenamiento a medida", "Una planificación específica para tu nivel, tus tiempos y el cuerpo que querés construir.", "training"],
  ["02", "Alimentacion aplicable", "Educación alimenticia y un plan claro, pensado para sostenerse fuera del gimnasio.", "nutrition"],
  ["03", "Suplementacion deportiva", "Recomendaciones integradas al objetivo, al entrenamiento y a tu alimentación.", "capsule"],
  ["04", "Seguimiento diario", "Soporte por WhatsApp, motivación, respuestas y ajustes durante todo el proceso.", "chat"],
  ["05", "Evaluacion real", "Chequeos mensuales para medir grasa, masa muscular, rendimiento y evolución.", "chart"],
  ["06", "Online o presencial", "La misma metodología Grosz, estés donde estés o vengas a una consulta en nuestras oficinas.", "location"],
];

const processSteps: Array<[string, string, string, TrainingIconName]> = [
  ["01", "Evaluamos", "Punto de partida, objetivo y contexto.", "search"],
  ["02", "Planificamos", "Nutrición y entrenamiento integrados.", "plan"],
  ["03", "Entrenamos", "Ejecución clara, progresiva y medible.", "training"],
  ["04", "Ajustamos", "Chequeos mensuales según tu evolución.", "adjust"],
];

const values: Array<{ title: string; text: string; icon: TrainingIconName }> = [
  { title: "Trabajo en equipo", text: "Entrenador y alumno avanzan con un objetivo compartido y comunicación constante.", icon: "chat" },
  { title: "Planes especificos", text: "Cada decisión responde a tu cuerpo, tu contexto y el resultado que buscás.", icon: "target" },
  { title: "Educacion alimenticia", text: "Entender qué comés te permite sostener el cambio más allá de una dieta.", icon: "nutrition" },
  { title: "Sistemas avanzados", text: "Medimos, registramos y ajustamos con método para no depender de la improvisación.", icon: "adjust" },
  { title: "Resultados reales", text: "El progreso se vuelve visible cuando el plan, la ejecución y la constancia se alinean.", icon: "chart" },
];

const articles = [
  {
    title: "Manifestaciones de la fuerza",
    category: "Entrenamiento de potencia",
    image: "assets/blog-fuerza.jpg",
    href: "https://grosztraining.com.ar/potencia-muscular-manifestaciones-de-la-fuerza-parte-2/",
  },
  {
    title: "Tipos de musculo y funciones",
    category: "Rendimiento y anatomía",
    image: "assets/blog-musculo.jpg",
    href: "https://grosztraining.com.ar/potencia-muscular-tipos-de-musculo-y-funciones-1ra-parte/",
  },
  {
    title: "Los mitos mas comunes del fitness",
    category: "Fitness sin atajos",
    image: "assets/blog-mitos.jpg",
    href: "https://grosztraining.com.ar/los-mitos-mas-comunes-del-fitness/",
  },
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="inicio">
        <div className="hero-noise" aria-hidden="true"></div>
        <div className="hero-copy">
          <p className="kicker"><span></span> Asesoramiento integral online y presencial</p>
          <h1>
            Tu cambio.<br />
            <em>Con metodo.</em>
          </h1>
          <p className="hero-intro">
            Entrenamiento, alimentación y seguimiento real para construir una versión más fuerte, atlética y saludable de vos.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">
              Quiero mi plan <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#resultados">Ver cambios reales <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-media">
          <img src="assets/gym.jpg" alt="Cristian Grosz y el equipo de Grosz Training" />
          <div className="hero-media-shade"></div>
          <p className="vertical-word" aria-hidden="true">DISCIPLINA</p>
          <div className="experience-orbit" aria-label="Plan cien por ciento personalizado a tu objetivo">
            <svg className="experience-orbit-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="hero-orbit-path" d="M100 14a86 86 0 1 1-.01 0" />
              </defs>
              <text>
                <textPath href="#hero-orbit-path">100% PERSONALIZADO · A TU OBJETIVO · 100% PERSONALIZADO · </textPath>
              </text>
            </svg>
            <div className="experience-orbit-center">
              <img src={`${basePath}/assets/mancuernas.svg`} alt="" />
              <span>con vos</span>
            </div>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">01 — 06</div>
      </section>

      <Marquee />

      <section className="authority-strip" aria-label="Credenciales Grosz Training">
        <p><span>Dirección</span><strong>Cristian Grosz</strong></p>
        <p><span>Trayectoria</span><strong>Atleta IFBB</strong></p>
        <p><span>Especialidad</span><strong>Men&apos;s Physique</strong></p>
        <p><span>Modalidad</span><strong>Online + presencial</strong></p>
      </section>

      <section className="method section" id="metodo">
        <div className="section-heading">
          <p className="kicker dark"><span></span> El método Grosz</p>
          <h2>No es una rutina.<br /><em>Es un sistema.</em></h2>
        </div>
        <div className="method-layout">
          <aside className="method-aside">
            <p className="method-lead">
              Construimos hábitos que duran. Cada decisión nace de tu punto de partida y se ajusta con tu progreso.
            </p>
            <div className="method-orbit" aria-hidden="true">
              <span>Proceso Grosz</span>
              <strong>04</strong>
              <small>etapas conectadas</small>
            </div>
          </aside>
          <div className="method-core">
            <div className="principles">
              {principles.map(([n, title, text]) => (
                <article className="principle" key={n}>
                  <span>{n}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <i aria-hidden="true">↗</i>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="process-flow" aria-label="Las cuatro etapas del método Grosz">
          {processSteps.map(([number, title, text, icon], index) => (
            <article className="process-step" key={number}>
              <div className="process-icon"><TrainingIcon name={icon} /></div>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < processSteps.length - 1 && <i aria-hidden="true">→</i>}
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="services-intro">
          <p className="kicker"><span></span> Asesoramiento integral</p>
          <h2>Todo lo que tu progreso <em>necesita.</em></h2>
          <p>Un sistema completo para entrenar con intención, comer con criterio y avanzar con alguien del otro lado.</p>
        </div>
        <div className="service-grid">
          {services.map(([number, title, text, icon]) => (
            <article className="service-card" key={number}>
              <div className="service-card-top"><span>{number}</span><div className="service-icon"><TrainingIcon name={icon} /></div></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="training-mosaic" aria-label="Entrenamiento y comunidad Grosz">
        <figure className="mosaic-wide">
          <img src="assets/poster.jpg" alt="Entrenamiento de fuerza en Grosz Training" />
          <figcaption><span>01</span><strong>Entrena con intencion.</strong><i>Fuerza</i></figcaption>
        </figure>
        <figure className="mosaic-tall">
          <img src="assets/footer.jpg" alt="Entrenamiento personalizado de una alumna Grosz" />
          <figcaption><span>02</span><strong>Cada repeticion cuenta.</strong><i>Tecnica</i></figcaption>
        </figure>
        <figure className="mosaic-square">
          <img src="assets/cambio-hero.jpg" alt="Cristian Grosz, entrenador y atleta IFBB" />
          <figcaption><span>03</span><strong>Experiencia aplicada.</strong><i>Metodo</i></figcaption>
        </figure>
        <div className="mosaic-statement"><small>Grosz Training Group</small><p>Mas que entrenar.<br /><em>Construir.</em></p></div>
      </section>

      <section className="results" id="resultados">
        <div className="results-copy">
          <p className="kicker"><span></span> Trabajo real. Resultados reales.</p>
          <h2><span>La prueba esta</span><br /><em>en el proceso.</em></h2>
          <p>No vendemos atajos. Aplicamos un sistema claro, acompañamos cada etapa y dejamos que el resultado hable.</p>
          <div className="results-actions">
            <a className="button button-light" href={`${basePath}/resultados/`}>Ver todos los casos <span>↗</span></a>
            <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Quiero lograr mi cambio <span>↗</span></a>
          </div>
        </div>
        <div className="transformations" aria-label="Transformaciones reales de alumnos Grosz">
          {[
            ["assets/cambio-01.jpg", "Cambio real de alumno Grosz, frente y espalda"],
            ["assets/cambio-02.jpg", "Evolución física real de alumno Grosz"],
            ["assets/cambio-03.jpg", "Transformación real con el método Grosz"],
            ["assets/cambio-04.jpg", "Resultado real de entrenamiento personalizado"],
          ].map(([src, alt], index) => (
            <figure key={src}>
              <img src={src} alt={alt} />
              <figcaption><span>CASO {String(index + 1).padStart(2, "0")}</span><b>DESLIZÁ →</b></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="comparison-section" aria-labelledby="comparison-title">
        <div className="comparison-copy">
          <p className="kicker dark"><span></span> Compará el proceso</p>
          <h2 id="comparison-title">Un cambio que podes <em>ver.</em></h2>
          <p>Deslizá la barra para entender visualmente cómo cambia la composición corporal manteniendo exactamente la misma pose y encuadre.</p>
          <div className="comparison-facts" aria-label="Datos de la comparación">
            <div><TrainingIcon name="target" /><span><small>01</small>Misma identidad</span></div>
            <div><TrainingIcon name="training" /><span><small>02</small>Misma pose</span></div>
            <div><TrainingIcon name="adjust" /><span><small>03</small>Misma cámara</span></div>
          </div>
          <small className="comparison-note">Visual generado con fines ilustrativos; no corresponde a un caso real. Cada proceso es individual y sus resultados dependen del punto de partida, la constancia y el seguimiento.</small>
        </div>
        <BeforeAfter />
      </section>

      <section className="quote-section">
        <div className="quote-mark" aria-hidden="true">“</div>
        <blockquote>
          “La atencion a toda hora, la variedad en el entrenamiento y, sobre todo, la constancia y responsabilidad que te enseñan sirven tambien para la vida cotidiana.”
        </blockquote>
        <div className="quote-person">
          <span>DW</span>
          <p><strong>David Wagner</strong><small>Alumno Grosz Training</small></p>
        </div>
      </section>

      <section className="plans section" id="planes">
        <div className="plans-header">
          <div>
            <p className="kicker dark"><span></span> Elegí cómo empezar</p>
            <h2>Tu plan.<br /><em>Tu proximo nivel.</em></h2>
          </div>
          <p>Todos los planes integran entrenamiento, alimentación y seguimiento. Lo que cambia es la modalidad de tu evaluación inicial.</p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "featured" : ""}`} key={plan.number}>
              <div className="plan-poster">
                {plan.featured && <span className="popular">Más elegido</span>}
                <span className="plan-number">Modalidad {plan.number}</span>
                <p className="plan-eyebrow">{plan.eyebrow}</p>
                <h3>{plan.title}</h3>
              </div>
              <div className="plan-details">
                <span className="plan-includes">Incluye</span>
                <ul>
                  {plan.features.map(feature => <li key={feature}><span>✓</span>{feature}</li>)}
                </ul>
                <a href={whatsapp} target="_blank" rel="noreferrer">Consultar este plan <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="founder" id="cristian">
        <div className="founder-visual">
          <img className="founder-main" src="assets/cambio-hero.jpg" alt="Cristian Grosz, atleta IFBB y entrenador personal" />
          <img className="founder-detail" src="assets/poster.jpg" alt="Cristian Grosz entrenando" />
          <div className="founder-orbit" aria-label="Cristian Grosz, atleta IFBB y fundador de Grosz Training Group">
            <svg className="founder-orbit-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="founder-orbit-path" d="M100 14a86 86 0 1 1-.01 0" /></defs>
              <text><textPath href="#founder-orbit-path">ATLETA IFBB · EXPERIENCIA REAL · METODO GROSZ · </textPath></text>
            </svg>
            <div className="founder-orbit-center"><strong>GTG</strong><span>IFBB</span></div>
          </div>
        </div>
        <div className="founder-copy">
          <p className="kicker"><span></span> Grosz Training Group</p>
          <h2>Experiencia que se convierte en <em>metodo.</em></h2>
          <p className="founder-lead">Cristian Grosz es atleta IFBB, entrenador personal y competidor de Men&apos;s Physique. Grosz Training nace de años de llevar cuerpos trabajados a su mejor versión de fuerza, simetría y definición.</p>
          <p>Su enfoque no busca copiar la rutina de otro atleta. Parte de la individualidad, combina entrenamiento con alimentación y acompaña cada ajuste hasta volver el progreso visible y sostenible.</p>
          <div className="founder-stats">
            <div><strong>1:1</strong><span>Planificación individual</span></div>
            <div><strong>360°</strong><span>Entrenamiento + nutrición</span></div>
            <div><strong>IFBB</strong><span>Experiencia competitiva</span></div>
          </div>
          <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Quiero entrenar con Grosz <span>↗</span></a>
        </div>
      </section>

      <section className="values-band" aria-label="Valores Grosz Training">
        <div className="values-heading">
          <div>
            <p className="kicker"><span></span> Nuestros valores</p>
            <h2>Lo que no<br /><em>negociamos.</em></h2>
          </div>
          <p>Principios simples, aplicados todos los días. La base para construir un proceso serio y un resultado que se sostenga.</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <article className="value-card" key={value.title}>
              <span>0{index + 1}</span>
              <div className="value-icon"><TrainingIcon name={value.icon} /></div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-title">
          <p className="kicker dark"><span></span> Antes de empezar</p>
          <h2>Preguntas<br /><em>frecuentes.</em></h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>¿Necesito experiencia previa?<span>+</span></summary>
            <p>No. El plan parte de tu nivel actual, tu contexto y tus posibilidades reales. Cada progresión se adapta a vos.</p>
          </details>
          <details>
            <summary>¿Puedo hacer el plan desde cualquier lugar?<span>+</span></summary>
            <p>Sí. Los planes online te permiten entrenar donde estés, con seguimiento continuo por WhatsApp.</p>
          </details>
          <details>
            <summary>¿Cada cuánto se actualiza mi planificación?<span>+</span></summary>
            <p>Mes a mes solicitamos un chequeo y ajustamos tanto el entrenamiento como la alimentación según tu evolución.</p>
          </details>
          <details>
            <summary>¿Cómo sé qué plan elegir?<span>+</span></summary>
            <p>Escribinos por WhatsApp. Te ayudamos a elegir la modalidad que mejor se adapta a tu objetivo y disponibilidad.</p>
          </details>
        </div>
      </section>

      <section className="insights section" id="contenido">
        <div className="insights-heading">
          <div>
            <p className="kicker dark"><span></span> Conocimiento aplicado</p>
            <h2>Entrenar mejor tambien es <em>entender.</em></h2>
          </div>
          <p>Ideas sobre fuerza, anatomía, alimentación y fitness escritas por el equipo Grosz para separar el método de los mitos.</p>
        </div>
        <div className="article-grid">
          {articles.map((article, index) => (
            <a className="article-card" href={article.href} target="_blank" rel="noreferrer" key={article.title}>
              <figure><img src={article.image} alt="" /></figure>
              <span>0{index + 1} / {article.category}</span>
              <h3>{article.title}</h3>
              <b>Leer artículo ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p>El mejor momento para empezar fue ayer.</p>
        <h2>El segundo mejor<br />es <em>hoy.</em></h2>
        <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Quiero empezar ahora <span>↗</span></a>
      </section>

      <Marquee alternate />

      <SiteFooter />

      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
        <span><img src={`${basePath}/assets/whatsapp.svg`} alt="" /></span><b>Hablemos</b>
      </a>
    </main>
  );
}
