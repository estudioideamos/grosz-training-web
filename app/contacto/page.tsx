import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contacto | Grosz Training",
  description: "Contactá a Grosz Training y encontrá el plan de entrenamiento, alimentación y seguimiento adecuado para tu objetivo.",
};

export default function ContactoPage() {
  return (
    <main className="contact-page">
      <SiteHeader subpage />
      <section className="contact-hero">
        <div className="contact-heading">
          <p className="kicker"><span></span> Empecemos por tu objetivo</p>
          <h1>Hablemos de tu <em>próximo nivel.</em></h1>
          <p>Completá estos datos y abrimos WhatsApp con tu consulta preparada. Sin formularios perdidos ni respuestas automáticas.</p>
          <div className="contact-channels">
            <a href="tel:+5491160162831"><small>Teléfono</small><strong>+54 9 11 6016-2831</strong><span>↗</span></a>
            <a href="mailto:contacto@grosztraining.com.ar"><small>Email</small><strong>contacto@grosztraining.com.ar</strong><span>↗</span></a>
          </div>
        </div>
        <div className="contact-form-wrap"><ContactForm /></div>
      </section>
      <section className="contact-proof">
        <p>Online</p><p>Videollamada</p><p>Presencial</p><p>Seguimiento mensual</p>
      </section>
      <SiteFooter />
    </main>
  );
}
