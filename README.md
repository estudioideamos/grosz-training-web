# Grosz Training — sitio web estático

Rediseño de Grosz Training Group, enfocado en conversión, claridad de servicios y experiencia mobile.

**Sitio público:** [estudioideamos.github.io/grosz-training-web](https://estudioideamos.github.io/grosz-training-web/).

## Experiencia

Presentación institucional, servicios, metodología, carrusel de procesos, imágenes responsive, contacto por WhatsApp y animaciones con soporte para movimiento reducido. Crédito con logo oficial de Estudio Ideamos; el botón flotante se oculta al llegar al crédito.

## Tecnología y desarrollo

Next.js 16, React 19 y TypeScript, con exportación estática para GitHub Pages. Requiere una versión actualizada de Node.js 22 o superior.

- Desarrollo: `npm ci --ignore-scripts`, `npm run dev`.
- Verificar y compilar: `npm run check`.
- Vista del export con headers: `npm start`.
- QA desktop/mobile: `npm run test:browser` (Chrome instalado y preview iniciado).
- Regenerar variantes al cambiar fotos: `npm run images`.

El contenido principal está en `app/page.tsx`, los estilos en `app/globals.css` y los recursos en `public/`.

## Publicación

La carpeta `out/` contiene el sitio para publicar. Cada actualización de `main` se publica en GitHub Pages mediante `.github/workflows/deploy-pages.yml`, después de superar los controles. El formulario no envía emails ni almacena datos.

Variables de compilación: `NEXT_PUBLIC_BASE_PATH` (vacío en dominio raíz), `SITE_URL` (URL absoluta con barra final), `SITE_INDEXABLE=true` solo para producción, `ENABLE_HSTS=true` solo después de verificar HTTPS estable. La demo queda en noindex por defecto.

Ver [seguridad y hosting](docs/security-performance.md) y [validación](docs/validation.md). GitHub Pages no aplica headers personalizados; para la política HTTP completa se necesita hosting/CDN compatible. La medición móvil mantiene trabajo pendiente, detallado en el informe.

## Estructura

- `app/`: páginas y componentes.
- `public/`: imágenes y fuentes locales.
- `scripts/`: optimización, exportación y QA.
- `tests/`: verificaciones del HTML y seguridad.
- `docs/`: configuración, alcance y evidencia.
- `out/`: salida generada de publicación.
- `.github/`: automatización.

## Créditos

Diseño y desarrollo por [Estudio Ideamos](https://ideamos.com.ar/).
