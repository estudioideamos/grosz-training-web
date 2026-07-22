const whatsapp = "https://wa.me/5491160162831?text=Hola%20Grosz%20Training%2C%20quiero%20empezar%20mi%20plan";

const groups = [
  {
    title: "Grosz en redes",
    links: [
      ["Instagram personal", "https://www.instagram.com/groszcris/"],
      ["Instagram asesoramientos", "https://www.instagram.com/grosztraining/"],
      ["YouTube principal", "https://youtube.com/@groszteam"],
      ["YouTube Extra", "https://youtube.com/@groszteamextra"],
      ["Kick", "https://kick.com/groszteam"],
      ["TikTok", "https://www.tiktok.com/@groszcris"],
    ],
  },
  {
    title: "Ecosistema",
    links: [
      ["IFE Capacitaciones", "https://www.ifecapacitaciones.com.ar/"],
      ["Instagram IFE", "https://www.instagram.com/ifecapacitaciones/"],
      ["Frosz Gelato Fit", "https://frosz.com.ar/"],
      ["Instagram Frosz", "https://www.instagram.com/froszgelatofit/"],
      ["Grosz Nutrition", "https://www.grosznutrition.com.ar/"],
      ["Instagram Nutrition", "https://www.instagram.com/grosznutrition/"],
    ],
  },
  {
    title: "Gimnasios",
    links: [
      ["Ballester Gym", "https://www.instagram.com/ballestergym/"],
      ["Sportivo Ballester Gym", "https://www.instagram.com/sportivoballestergym/"],
    ],
  },
];

export function SiteFooter() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <footer className="site-footer">
      <div className="footer-topline"><span>Grosz Training Group</span><b>Todo el ecosistema. Un solo método.</b></div>
      <div className="footer-main footer-expanded">
        <div className="footer-brand-column">
          <img src={`${basePath}/assets/grosz-logo.png`} alt="Grosz Training Group" />
          <p>Resultados reales a través de entrenamiento, nutrición y seguimiento personalizado.</p>
          <a className="footer-contact-cta" href={`${basePath}/contacto/`}>Contacto <span>↗</span></a>
        </div>
        <div className="footer-links-grid">
          {groups.map((group) => (
            <div className="footer-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}<span>↗</span></a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Grosz Training Group</span>
        <a href={`${basePath}/`}>Inicio</a>
        <a href={`${basePath}/resultados/`}>Resultados</a>
        <a href={`${basePath}/contacto/`}>Contacto</a>
        <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
      </div>
    </footer>
  );
}
