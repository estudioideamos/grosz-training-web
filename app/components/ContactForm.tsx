"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hola Grosz Training, quiero recibir asesoramiento.",
      `Nombre: ${data.get("nombre")}`,
      `Objetivo: ${data.get("objetivo")}`,
      `Modalidad: ${data.get("modalidad")}`,
      `Mensaje: ${data.get("mensaje") || "Sin mensaje adicional"}`,
    ].join("\n");
    window.open(`https://wa.me/5491160162831?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus("Abrimos WhatsApp con tu consulta lista para enviar.");
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <span>Solicitud de asesoramiento</span>
      <h2>Contanos<br />sobre vos.</h2>
      <div className="form-grid">
        <label className="form-field"><span>01 / Nombre</span><input name="nombre" type="text" placeholder="¿Cómo te llamás?" required /></label>
        <label className="form-field"><span>02 / Objetivo principal</span><select name="objetivo" defaultValue="" required><option value="" disabled>Elegí una opción</option><option>Ganar masa muscular</option><option>Reducir grasa corporal</option><option>Mejorar rendimiento</option><option>Crear hábitos saludables</option><option>Preparación competitiva</option></select></label>
        <label className="form-field"><span>03 / Modalidad</span><select name="modalidad" defaultValue="Online"><option>Online</option><option>Videollamada con Cristian</option><option>Presencial</option><option>No estoy seguro</option></select></label>
        <label className="form-field full"><span>04 / Contanos un poco más</span><textarea name="mensaje" rows={4} placeholder="Tu experiencia, disponibilidad o cualquier duda"></textarea></label>
      </div>
      <button className="button button-primary" type="submit">Enviar por WhatsApp <span>↗</span></button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
