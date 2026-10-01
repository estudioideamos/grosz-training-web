# Seguridad, actualización y performance — Grosz Training

## Alcance real

El despliegue verificado en el repositorio es un export estático de Next para GitHub Pages. No utiliza cuentas, base de datos, sesiones, APIs de escritura ni recepción de formularios. El contacto prepara un mensaje para WhatsApp, que el visitante confirma allí. No se agregaron endpoints, CAPTCHA ni almacenamiento de información personal sin necesidad.

Se aplicó [OWASP Top 10 2025](https://top10.owasp.org/2025/) según este alcance; no es una certificación ni una prueba de penetración del WordPress/hosting actualmente activo en el dominio del cliente.

## Implementación

- Next y React actualizados; lockfile actualizado y dependencias fijadas. Retirados Vinext, Worker, Drizzle, ejemplos D1 y autenticación de plantilla sin referencias en las páginas ni en el workflow real. Las instrucciones de Sites previas dejan de ser un destino soportado: el artefacto de entrega es `out/`.
- CSP generada después de cada compilación con hashes SHA-256 de los scripts exactos del HTML. Sin `unsafe-inline` ni `unsafe-eval` en scripts. `style-src 'unsafe-inline'` se conserva deliberadamente para los estilos dinámicos del comparador y React; imágenes y fuentes locales, conexiones al mismo origen, objetos y formularios HTML bloqueados.
- CSP en meta para Pages y configuraciones `_headers` / `.htaccess` para hosts compatibles: CSP completa con `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. No se usa un nonce fijo. Cualquier modificación de scripts del HTML exige recompilar, no editar el export a mano.
- Formulario con límites de longitud, nombre no vacío, opciones permitidas y URL de destino fija. El texto se codifica como un único parámetro; React lo trata como texto. Mensaje de estado honesto, enlace alternativo si el navegador bloquea la apertura, enlace sin JavaScript y aviso de transferencia a WhatsApp. No envía consultas durante QA.
- Imágenes WebP responsive con `srcset`, `sizes`, dimensiones para reservar espacio y carga diferida fuera de la portada. Se mantienen las fotos y su encuadre. Fuentes locales con `display: swap`.
- Botón de WhatsApp oculto mientras se aproxima o se ve el crédito del pie; reaparece al subir. Crédito con el logo oficial local de Ideamos, obtenido de https://ideamos.com.ar/logos/ideamos-light.webp.
- Renderizado de secciones fuera de pantalla diferido con `content-visibility`, preservando los movimientos y retirando el desenfoque costoso de la entrada principal. El pie conserva su altura real para evitar saltos al llegar al crédito.
- Galería con diálogo modal nativo, navegación por teclado, foco contenido y restaurado al cerrar; enlace para saltar al contenido, foco visible y reducción de transiciones. Carrusel con pausa, respeto a movimiento reducido y sin avance fuera de pantalla o pestaña oculta.
- Canonical, sitemap, robots y favicon compatibles con subruta. Demo con `noindex` por defecto para no competir con el sitio del cliente.
- Pruebas de entradas hostiles, CSP del HTML generado, recursos, headers, ausencia de mapas de código/archivos de entorno en el export y pruebas reales de navegador. CI exige lint, auditoría, build y pruebas antes de publicar.

## Riesgos OWASP pertinentes

A01/A07: no hay recursos privados ni autenticación. No confundir contenido estático público con autorización; cualquier futura área privada necesita diseño de acceso en servidor.

A02/A04: headers preparados, HTTPS verificado por separado; HSTS requiere confirmación del hosting. A03/A08: dependencias fijadas, lockfile, auditoría y acciones de CI fijadas a commits. A05/A06: no existe intérprete SQL ni HTML generado desde entradas; destino WhatsApp fijo y codificación de datos. A09/A10: no se registran consultas en el navegador ni se exponen trazas de aplicación; errores del formulario son comprensibles. El monitoreo HTTP, alertas y registros de acceso corresponden al proveedor.

## Publicación y hosting

1. `npm ci --ignore-scripts` y `npm run check`. Las variantes de imágenes están versionadas; después de reemplazar fotos, ejecutar `npm run images` y revisar encuadres.
2. Demo Pages: `NEXT_PUBLIC_BASE_PATH=/grosz-training-web`, `SITE_URL=https://estudioideamos.github.io/grosz-training-web/`, sin `SITE_INDEXABLE`. Publicar solamente `out/`.
3. Dominio del cliente: compilar con `NEXT_PUBLIC_BASE_PATH` vacío, `SITE_URL=https://grosztraining.com.ar/` (barra final), `SITE_INDEXABLE=true`. No reutilizar una compilación de la demo.
4. GitHub Pages no admite los headers personalizados de `_headers` ni `.htaccess`. La CSP meta protege recursos, pero no sustituye `frame-ancestors`, HSTS ni otros headers HTTP. Para cobertura completa hace falta un hosting con headers o un proxy/CDN configurado. `_headers` es una salida para hosts compatibles; verificar sus reglas/límites antes de usarlo.
5. En Apache, habilitar mod_headers/mod_deflate y AllowOverride apropiado, confirmar que `.htaccess` se incluye al subir y probarlo en staging. Configurar la redirección HTTP → HTTPS en el hosting/CDN (considerando terminación TLS/proxy). Brotli si el proveedor lo permite. Archivos con hash de `_next/static` tienen caché inmutable; HTML se revalida y fotos tienen caché de un día.
6. Solo después de confirmar certificado, redirecciones y renovación automática: recompilar con `ENABLE_HSTS=true`. No se activa `includeSubDomains` ni `preload` sin auditar todos los subdominios.
7. Configurar alertas por errores HTTP y disponibilidad en hosting, con retención y acceso adecuados. No registrar parámetros ni contenidos de WhatsApp. No hay backend para rate limiting/CSRF; si se agrega envío por email/API serán necesarios validación en servidor, límites de tamaño/frecuencia, control de origen y gestión de secretos del lado servidor.
8. Los tres enlaces de artículos existentes devolvieron 404. Las tarjetas conservan su diseño y ahora ofrecen consultas temáticas por WhatsApp, con etiquetas explícitas. Si se recuperan esos artículos, volver a enlazarlos y definir redirecciones de las URL antiguas antes de migrar. La revisión local no acredita cambios en DNS, WordPress ni plugins del sitio público actual.

## Evidencia

Los resultados finales de pruebas y mediciones se resumen en `validation.md`. Lighthouse local es una medición de laboratorio, no datos de campo CrUX ni garantía de resultados idénticos en hosting. El informe de npm está en `audit-after.json` y los headers generados en `export-headers.json`.
