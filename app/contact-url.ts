export const objectives = ['Ganar masa muscular', 'Reducir grasa corporal', 'Mejorar rendimiento', 'Crear hábitos saludables', 'Preparación competitiva'];
export const modalities = ['Online', 'Videollamada con Cristian', 'Presencial', 'No estoy seguro'];
export function buildContactUrl(values: {nombre: string; objetivo: string; modalidad: string; mensaje: string}) {
  const name = values.nombre.trim();
  const message = values.mensaje.trim();
  if (name.length < 2 || name.length > 80 || message.length > 1000 || /[\u0000-\u001f\u007f]/.test(name) || !objectives.includes(values.objetivo) || !modalities.includes(values.modalidad)) throw new Error('Revisá tu nombre, objetivo y modalidad. El mensaje admite hasta 1.000 caracteres.');
  const text = ['Hola Grosz Training, quiero recibir asesoramiento.', `Nombre: ${name}`, `Objetivo: ${values.objetivo}`, `Modalidad: ${values.modalidad}`, `Mensaje: ${message || 'Sin mensaje adicional'}`].join('\n');
  return `https://wa.me/5491160162831?text=${encodeURIComponent(text)}`;
}
