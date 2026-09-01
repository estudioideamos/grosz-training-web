# Grosz Training — sitio web

Rediseño de la landing de Grosz Training Group, enfocado en conversión, claridad de servicios y experiencia mobile.

**Sitio público:** [estudioideamos.github.io/grosz-training-web](https://estudioideamos.github.io/grosz-training-web/)

## Experiencia

Presentación institucional, servicios, metodología, carrusel de procesos para mobile, recursos optimizados, contacto y animaciones con soporte para movimiento reducido.

## Tecnología

Next.js 16, React 19, TypeScript, Vinext/Vite y exportación estática para GitHub Pages.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run build:pages
```

El contenido principal se encuentra en `app/page.tsx`, los estilos en `app/globals.css` y los recursos en `public/`.

## Publicación

Cada actualización de `main` se compila y publica mediante `.github/workflows/deploy-pages.yml`.

## Estructura

- `app/`: páginas y componentes.
- `public/`: imágenes.
- `tests/`: verificaciones del HTML.
- `build/`: salida de publicación.
- `.github/`: automatización.

## Créditos

Diseño y desarrollo por [Estudio Ideamos](https://ideamos.com.ar/).
