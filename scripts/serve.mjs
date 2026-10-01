import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root=path.resolve('out');

const base=process.env.NEXT_PUBLIC_BASE_PATH || '';
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.txt':'text/plain','.xml':'application/xml','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
createServer(async(req,res)=>{
  const headers=JSON.parse(await readFile('docs/export-headers.json','utf8'));
  delete headers['Strict-Transport-Security'];
  headers['Content-Security-Policy']=headers['Content-Security-Policy'].replace('; upgrade-insecure-requests','');
  try {
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(base && pathname===base) { res.writeHead(308,{Location:base+'/'}); res.end(); return; }
    if(base && !pathname.startsWith(base+'/')) throw new Error('not found');
    pathname=pathname.slice(base.length);
    if(pathname.split('/').some(part=>part.startsWith('.')) || /\\/.test(pathname)) throw new Error('not found');
    let file=path.resolve(root,'.'+pathname);
    if(file !== root && !file.startsWith(root+path.sep)) throw new Error('not found');
    if((await stat(file)).isDirectory()) file=path.join(file,'index.html');
    let body=await readFile(file);
    const compression={};
    if (/gzip/.test(req.headers['accept-encoding']||'') && /\.(html|css|js|json|svg|txt|xml)$/.test(file)) { body=gzipSync(body); compression['Content-Encoding']='gzip'; compression.Vary='Accept-Encoding'; }
    res.writeHead(200,{...headers,...compression,'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':pathname.includes('/_next/static/')?'public, max-age=31536000, immutable':'no-cache'});
    res.end(req.method==='HEAD'?undefined:body);
  } catch {res.writeHead(404,{...headers,'Content-Type':'text/plain'});res.end('Not found');}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Preview http://127.0.0.1:'+(process.env.PORT||4173)+base+'/'));

