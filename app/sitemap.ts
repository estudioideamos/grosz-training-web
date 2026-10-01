import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.SITE_URL || 'https://estudioideamos.github.io/grosz-training-web/';
  return ['', 'contacto/', 'resultados/'].map(route => ({ url: new URL(route, url).href }));
}
