import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
async function walk(dir) { const entries = await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat(); }
const files = await walk(root);
const hashes = new Set();
const pages = [];
for (const file of files.filter(f=>f.endsWith('.html'))) {
  let html = await readFile(file,'utf8');
  html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/g,'');
  const localHashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(m=>! /\bsrc=/.test(m[1])).map(m=>`'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`);
  localHashes.forEach(h=>hashes.add(h));
  pages.push({file,html,localHashes});
}
export function policy(hashes, header = false) {
  return [`default-src 'none'`, `script-src 'self' ${[...new Set(hashes)].join(' ')}`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data:`, `font-src 'self'`, `connect-src 'self'`, `manifest-src 'self'`, `base-uri 'none'`, `object-src 'none'`, `form-action 'none'`, ...(header ? [`frame-ancestors 'none'`, 'upgrade-insecure-requests'] : [])].join('; ');
}
for (const {file,html,localHashes} of pages) await writeFile(file,html.replace('<head>',`<head><meta http-equiv="Content-Security-Policy" content="${policy(localHashes)}">`));
const headers = {
  'Content-Security-Policy':policy(hashes,true),
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'X-Frame-Options':'DENY',
};
// Enable only after the production hostname has stable HTTPS. No subdomain preload.
if (process.env.ENABLE_HSTS === 'true') headers['Strict-Transport-Security'] = 'max-age=31536000';
await writeFile(path.join(root,'_headers'),`/*\n${Object.entries(headers).map(([k,v])=>`  ${k}: ${v}`).join('\n')}\n  Cache-Control: public, max-age=0, must-revalidate\n\n/*/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/assets/*\n  Cache-Control: public, max-age=86400\n`);
await writeFile(path.join(root,'.htaccess'),`Options -Indexes\n<IfModule mod_headers.c>\n${Object.entries(headers).map(([k,v])=>`Header always set ${k} "${v}"`).join('\n')}\n<FilesMatch "\\.html$">\nHeader set Cache-Control "public, max-age=0, must-revalidate"\n</FilesMatch>\n<FilesMatch "\\.(?:webp|png|jpg|svg|woff2)$">\nHeader set Cache-Control "public, max-age=86400"\n</FilesMatch>\n</IfModule>\n<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml\n</IfModule>\n`);
await writeFile(path.join(root,'_next','static','.htaccess'),'<IfModule mod_headers.c>\nHeader set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n');
await writeFile(path.join(root,'.nojekyll'),'');
await writeFile('docs/export-headers.json',JSON.stringify(headers,null,2)+'\n');
console.log(`Hardened ${pages.length} HTML documents using exact script hashes; generated hosting headers.`);
