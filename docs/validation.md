# Verificación — 1 de octubre de 2026

## Resultados confirmados

- Dependencias: npm audit pasó de 24 hallazgos (1 crítico, 16 altos, 6 moderados y 1 bajo) a 0. Ver JSON de auditoría antes/después. Esto no demuestra ausencia de vulnerabilidades desconocidas.
- Next 16.3.8 y React/React DOM 19.3.0. Versiones directas fijadas y manifiesto consistente con lockfile.
- Lint sin errores y compilación estática con TypeScript aprobada para la subruta de Pages.
- 7 pruebas aprobadas: validación/entrada hostil de contacto, integridad de hashes CSP, URL canonical exactas, imágenes locales/dimensiones, headers y ausencia de archivos de entorno/mapas de código en el export.
- Escaneo heurístico de archivos versionados y nuevos no ignorados: 0 coincidencias de los patrones de credenciales comprobados. No se inspeccionó todo el historial de Git ni el servidor del cliente.

## Red pública (sin modificar producción)

Solicitudes HEAD realizadas con validación normal de certificado, sin omitir TLS:

| Dirección | Resultado |
| --- | --- |
| https://grosztraining.com.ar/ | 200, conexión HTTPS aceptada; Apache |
| http://grosztraining.com.ar/ | 200; falta redirección a HTTPS |
| https://estudioideamos.github.io/grosz-training-web/ | 200; HSTS gestionado por GitHub |

En la respuesta del dominio del cliente no aparecieron CSP, HSTS, X-Content-Type-Options, Referrer-Policy ni Permissions-Policy. Corregir y verificar en hosting antes de dar el despliegue por endurecido. Estas respuestas pertenecen a lo actualmente publicado, no a estos cambios locales.

## Navegador y rendimiento

La revisión final pasó en 390 y 1366 px para portada, contacto y resultados: sin desbordamiento horizontal, imágenes rotas, errores de consola ni incidencias en axe WCAG A/AA. Formulario, menú, galería, teclado y movimiento reducido comprobados. WhatsApp se oculta al llegar al crédito de Ideamos y reaparece al subir en ambos tamaños.

Lighthouse 13.5.0 local sobre el export de producción, con compresión y headers de la vista local:

| Perfil | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| mobile | 59 | 100 | 100 | 100 | 3.6 s | 4,070 ms | 0 |
| desktop | 99 | 100 | 100 | 100 | 0.9 s | 60 ms | 0 |

El rendimiento móvil aún necesita atención: esta medición no permite dar por cumplidos los objetivos de rendimiento móvil. La máquina mostró unos 714 MiB de RAM física libre durante el diagnóstico y los resultados locales variaron entre corridas. Se necesita una medición independiente sobre staging publicado y continuar reduciendo trabajo de hilo principal si el TBT se confirma. No se midieron datos de campo CrUX.

Se conservaron las animaciones; se optimizaron imágenes, renderizado fuera de pantalla y filtros de entrada. El perfil móvil mantuvo su CPU/red estándar y el perfil desktop final fue verificado como desktop real.

Evidencia: docs/lighthouse-summary.json, docs/browser-production.json y reportes/capturas en outputs/qa/. El ZIP outputs/grosz-produccion.zip contiene los archivos finales para el dominio raíz; no es un artefacto para la subruta de GitHub Pages.

## Estado de publicación

Este informe recoge la validación local previa a la publicación. El usuario solicitó posteriormente publicar en GitHub Pages; el estado de cada despliegue se consulta en las ejecuciones de Deploy to GitHub Pages del repositorio. El dominio del cliente no forma parte de ese despliegue. La publicación debe respetar los pasos de `security-performance.md`, incluida la conservación/redirección de las URL de artículos existentes.
