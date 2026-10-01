import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  const url = process.env.SITE_URL || 'https://estudioideamos.github.io/grosz-training-web/';
  return { rules: { userAgent: '*', allow: '/' }, sitemap: new URL('sitemap.xml', url).href };
}
