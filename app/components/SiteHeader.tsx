const whatsapp = "https://wa.me/5491160162831?text=Hola%20Grosz%20Training%2C%20quiero%20empezar%20mi%20plan";

export function SiteHeader({ subpage = false }: { subpage?: boolean }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const links = [
    ["Método", `${basePath}/#metodo`],
    ["Servicios", `${basePath}/#servicios`],
    ["Resultados", `${basePath}/resultados/`],
    ["Planes", `${basePath}/#planes`],
    ["Cristian", `${basePath}/#cristian`],
    ["Contacto", `${basePath}/contacto/`],
  ];

  return (
    <header className={`nav-shell ${subpage ? "subpage-nav" : ""}`}>
      <div className="scroll-progress" aria-hidden="true"></div>
      <a className="brand" href={`${basePath}/`} aria-label="Grosz Training, inicio">
        <img src={`${basePath}/assets/grosz-logo.png`} alt="Grosz Training Group" />
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </nav>
      <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">
        Empezá hoy <span aria-hidden="true">↗</span>
      </a>
      <details className="mobile-menu">
        <summary aria-label="Abrir menú"><span></span><span></span></summary>
        <nav aria-label="Navegación mobile">
          <a href={`${basePath}/`}>Inicio</a>
          {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          <a href={whatsapp} target="_blank" rel="noreferrer">Quiero empezar ↗</a>
        </nav>
      </details>
    </header>
  );
}
