import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildContactUrl } from '../app/contact-url.ts';
const valid = {nombre:'Ana López',objetivo:'Ganar masa muscular',modalidad:'Online',mensaje:'Hola & ¿podemos hablar?'};
test('WhatsApp encodes hostile input on a fixed destination',()=>{
 const values={...valid,mensaje:'<script>alert(1)</script>&text=other#fragment'};
 const url=new URL(buildContactUrl(values));
 assert.equal(url.origin,'https://wa.me'); assert.equal(url.pathname,'/5491160162831');
 assert.equal([...url.searchParams.keys()].length,1); assert.equal(url.hash,'');
 assert.ok(url.searchParams.get('text').includes(values.mensaje));
});
test('contact rejects blank names, oversized messages and tampered choices',()=>{
 for(const patch of [{nombre:'  '},{nombre:'a'.repeat(81)},{mensaje:'a'.repeat(1001)},{objetivo:'injected'},{modalidad:'other'},{nombre:'A\nB'}]) assert.throws(()=>buildContactUrl({...valid,...patch}));
 assert.doesNotThrow(()=>buildContactUrl(valid));
});
for(const route of ['','contacto/','resultados/']) test(`export ${route||'/'} CSP, metadata and local images`,async()=>{
 const html=await readFile(`out/${route}index.html`,'utf8');
 assert.match(html,/<html[^>]*lang="es"/); assert.match(html,/name="description"/); assert.match(html,/rel="canonical"/);
 assert.equal(html.match(/rel="canonical" href="([^"]+)"/)[1],new URL(route,process.env.SITE_URL || 'https://estudioideamos.github.io/grosz-training-web/').href);
 const csp=html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
 assert.match(csp,/object-src 'none'/); assert.match(csp,/form-action 'none'/);
 assert.doesNotMatch(csp,/script-src[^;]*(unsafe-inline|unsafe-eval)/);
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) if(!/\bsrc=/.test(m[1])) assert.ok(csp.includes(`'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`));
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1);
 for(const m of html.matchAll(/<img\b([^>]*)>/g)) {
  assert.match(m[1],/\balt=/);
  const src=m[1].match(/\bsrc="([^"]+)"/)?.[1];
  if(src?.includes('/assets/')) await access('public/assets/'+src.split('/assets/')[1]);
  if(src?.match(/\.(webp|png|jpg)$/)) {assert.match(m[1],/\bwidth="\d+"/);assert.match(m[1],/\bheight="\d+"/);assert.match(m[1],/\bsrcSet=/i);}
 }
});
test('hosting headers deny framing and sniffing; HSTS is opt-in',async()=>{
 const h=JSON.parse(await readFile('docs/export-headers.json','utf8'));
 assert.match(h['Content-Security-Policy'],/frame-ancestors 'none'/); assert.equal(h['X-Content-Type-Options'],'nosniff');
 if(process.env.ENABLE_HSTS!=='true') assert.equal(h['Strict-Transport-Security'],undefined);
});
test('no env files or source maps in export',async()=>{
 async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){assert.doesNotMatch(e.name,/^\.env|\.map$|\.pem$|^node_modules$|^worker$/);if(e.isDirectory())await walk(dir+'/'+e.name);}}
 await walk('out');
});
