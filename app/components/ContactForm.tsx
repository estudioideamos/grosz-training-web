"use client";
import { useState, type FormEvent } from "react";
import { buildContactUrl, objectives, modalities } from "../contact-url";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const link = buildContactUrl({nombre: String(data.get("nombre") || ""), objetivo: String(data.get("objetivo") || ""), modalidad: String(data.get("modalidad") || ""), mensaje: String(data.get("mensaje") || "")});
      setUrl(link);
      window.open(link, "_blank", "noopener,noreferrer");
      setStatus("Tu consulta está preparada. Si WhatsApp no se abrió, usá el enlace de abajo. El mensaje se envía cuando lo confirmás allí.");
    } catch {
      setUrl("");
      setStatus("Revisá tu nombre, objetivo y modalidad. El mensaje admite hasta 1.000 caracteres.");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} onChange={() => { setUrl(""); setStatus(""); }} aria-describedby="contact-privacy">
      <span>Solicitud de asesoramiento</span><h2>Contanos<br />sobre vos.</h2>
      <div className="form-grid">
        <label className="form-field"><span>01 / Nombre</span><input name="nombre" type="text" autoComplete="given-name" minLength={2} maxLength={80} placeholder="¿Cómo te llamás?" required /></label>
        <label className="form-field"><span>02 / Objetivo principal</span><select name="objetivo" defaultValue="" required><option value="" disabled>Elegí una opción</option>{objectives.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className="form-field"><span>03 / Modalidad</span><select name="modalidad" defaultValue="Online" required>{modalities.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className="form-field full"><span>04 / Contanos un poco más</span><textarea name="mensaje" rows={4} maxLength={1000} placeholder="Tu experiencia, disponibilidad o cualquier duda" /></label>
      </div>
      <p id="contact-privacy">Al continuar, estos datos se comparten con WhatsApp para preparar tu consulta. Evitá incluir información médica o sensible.</p>
      <button className="button button-primary" type="submit">Continuar en WhatsApp <span aria-hidden="true">↗</span></button>
      <noscript><p>Para preparar tu consulta activá JavaScript o <a href="https://wa.me/5491160162831" target="_blank" rel="noopener noreferrer">escribinos directamente por WhatsApp</a>.</p></noscript>
      <p className="form-status" role="status">{status}</p>
      {url && <a href={url} target="_blank" rel="noopener noreferrer">Abrir mi consulta en WhatsApp ↗</a>}
    </form>
  );
}
