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
  ["02", "Método", "Entrenamiento y nutrición trabajan juntos, con decisiones basadas en tu evolución."],
  ["03", "Seguimiento", "No recibís un PDF y quedás solo: medimos, ajustamos y avanzamos con vos."],
];

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#inicio" aria-label="Grosz Training, inicio">
          <img src="assets/grosz-logo.png" alt="Grosz Training Group" />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#metodo">Método</a>
          <a href="#resultados">Resultados</a>
          <a href="#planes">Planes</a>
          <a href="#faq">Preguntas</a>
        </nav>
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">
          Empezá hoy <span aria-hidden="true">↗</span>
        </a>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú"><span></span><span></span></summary>
          <nav aria-label="Navegación mobile">
            <a href="#metodo">Método</a>
            <a href="#resultados">Resultados</a>
            <a href="#planes">Planes</a>
            <a href="#faq">Preguntas</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">Quiero empezar ↗</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-noise" aria-hidden="true"></div>
        <div className="hero-copy">
          <p className="kicker"><span></span> Asesoramiento integral online y presencial</p>
          <h1>
            Tu cambio.<br />
            <em>Con método.</em>
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
          <div className="experience-card">
            <strong>100%</strong>
            <span>personalizado<br />a tu objetivo</span>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">01 — 06</div>
      </section>

      <div className="ticker" aria-label="Servicios incluidos">
        <div className="ticker-track">
          <span>ENTRENAMIENTO PERSONALIZADO</span><b>✦</b><span>NUTRICIÓN</span><b>✦</b><span>SEGUIMIENTO REAL</span><b>✦</b>
          <span>ENTRENAMIENTO PERSONALIZADO</span><b>✦</b><span>NUTRICIÓN</span><b>✦</b><span>SEGUIMIENTO REAL</span><b>✦</b>
        </div>
      </div>

      <section className="method section" id="metodo">
        <div className="section-heading">
          <p className="kicker dark"><span></span> El método Grosz</p>
          <h2>No es una rutina.<br /><em>Es un sistema.</em></h2>
        </div>
        <div className="method-layout">
          <p className="method-lead">
            Construimos hábitos que duran. Cada decisión nace de tu punto de partida y se ajusta con tu progreso.
          </p>
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
      </section>

      <section className="results" id="resultados">
        <div className="results-copy">
          <p className="kicker"><span></span> Trabajo real. Resultados reales.</p>
          <h2>La prueba está<br /><em>en el proceso.</em></h2>
          <p>No vendemos atajos. Aplicamos un sistema claro, acompañamos cada etapa y dejamos que el resultado hable.</p>
          <a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer">Quiero lograr mi cambio <span>↗</span></a>
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

      <section className="quote-section">
        <div className="quote-mark" aria-hidden="true">“</div>
        <blockquote>
          “La atención a toda hora, la variedad en el entrenamiento y, sobre todo, la constancia y responsabilidad que te enseñan sirven también para la vida cotidiana.”
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
            <h2>Tu plan.<br /><em>Tu próximo nivel.</em></h2>
          </div>
          <p>Todos los planes integran entrenamiento, alimentación y seguimiento. Lo que cambia es la modalidad de tu evaluación inicial.</p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "featured" : ""}`} key={plan.number}>
              {plan.featured && <span className="popular">Más elegido</span>}
              <span className="plan-number">{plan.number}</span>
              <p className="plan-eyebrow">{plan.eyebrow}</p>
              <h3>{plan.title}</h3>
              <ul>
                {plan.features.map(feature => <li key={feature}><span>✓</span>{feature}</li>)}
              </ul>
              <a href={whatsapp} target="_blank" rel="noreferrer">Consultar este plan <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about">
        <div className="about-image"><img src="assets/poster.jpg" alt="Cristian Grosz entrenando" /></div>
        <div className="about-copy">
          <p className="kicker"><span></span> Grosz Training Group</p>
          <h2>Entrenamos cuerpos.<br /><em>Formamos hábitos.</em></h2>
          <p>Te damos herramientas simples de aplicar y altamente efectivas para lograr un cuerpo atlético, funcional, simétrico y saludable.</p>
          <div className="about-stats">
            <div><strong>1:1</strong><span>Planificación<br />individual</span></div>
            <div><strong>360°</strong><span>Entrenamiento<br />+ nutrición</span></div>
          </div>
          <a className="text-link light" href={whatsapp} target="_blank" rel="noreferrer">Hablar con el equipo <span>↗</span></a>
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

      <section className="final-cta">
        <p>El mejor momento para empezar fue ayer.</p>
        <h2>El segundo mejor<br />es <em>hoy.</em></h2>
        <a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer">Quiero empezar ahora <span>↗</span></a>
      </section>

      <footer>
        <div className="footer-main">
          <img src="assets/grosz-logo.png" alt="Grosz Training Group" />
          <p>Resultados reales a través de entrenamiento, nutrición y seguimiento personalizado.</p>
          <div className="footer-contact">
            <a href="tel:+5491160162831">+54 9 11 6016-2831</a>
            <a href="mailto:contacto@grosztraining.com.ar">contacto@grosztraining.com.ar</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Grosz Training Group</span>
          <a href="https://www.instagram.com/grosztraininggroup/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://www.youtube.com/@cristiangrosz" target="_blank" rel="noreferrer">YouTube ↗</a>
          <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
        <span>WA</span><b>Hablemos</b>
      </a>
    </main>
  );
}
