import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
const url='http://127.0.0.1:'+(process.env.PORT||'4173')+base;
const browser=await chromium.launch({channel:'chrome',headless:true});
const report=[];
await mkdir('outputs/qa',{recursive:true});
try {
for(const width of [390,1366]) {
 const context=await browser.newContext({viewport:{width,height:900}});
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 for(const route of ['/','/contacto/','/resultados/']) {
  await page.goto(url+route,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=750){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,55));}window.scrollTo(0,0);});
  await page.waitForTimeout(700);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width} ${route}`);
  assert.equal(await page.locator('img').evaluateAll(imgs=>imgs.some(i=>i.complete && i.naturalWidth===0)),false,'broken images');
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  report.push({width,route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});
  await page.screenshot({path:`outputs/qa/${width}-${route.replaceAll('/','')||'home'}-viewport.png`});
  await page.screenshot({path:`outputs/qa/${width}-${route.replaceAll('/','')||'home'}.png`,fullPage:true});
 }
 await page.goto(url+'/contacto/',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Continuar en WhatsApp'}).click();
 assert.equal(await page.locator('input[name=nombre]').evaluate(el=>el.validity.valueMissing),true);
 await page.locator('[name=nombre]').fill('Ana López');
 await page.locator('[name=objetivo]').selectOption({label:'Ganar masa muscular'});
 await page.locator('[name=mensaje]').fill('<script>alert(1)</script>&x=1');
 // Stub opening only during QA: never send a real consultation.
 await page.evaluate(()=>{window.open=(url)=>{window.__contactUrl=String(url);return null;};});
 await page.getByRole('button',{name:'Continuar en WhatsApp'}).click();
 const contactUrl=new URL(await page.evaluate(()=>window.__contactUrl));
 assert.equal(contactUrl.hostname,'wa.me'); assert.ok(contactUrl.searchParams.get('text').includes('<script>alert(1)</script>&x=1'));
 assert.equal(await page.getByRole('link',{name:'Abrir mi consulta en WhatsApp'}).count(),1);
 await page.goto(url+'/resultados/',{waitUntil:'networkidle'});
 const opener=page.getByRole('button',{name:'Ampliar caso 1',exact:true});
 await opener.click(); await page.getByRole('dialog').waitFor();
 await page.keyboard.press('ArrowRight'); assert.equal(await page.getByRole('dialog').getAttribute('aria-label'),'Caso 2 ampliado');
 for(let i=0;i<6;i++) {await page.keyboard.press('Tab'); assert.equal(await page.evaluate(()=>!!document.activeElement.closest('dialog')),true);}
 await page.keyboard.press('Escape'); assert.equal(await page.getByRole('dialog').count(),0); await assert.equal(await opener.evaluate(el=>document.activeElement===el),true);
 await page.goto(url+'/',{waitUntil:'networkidle'});
 if(width===390){await page.getByLabel('Abrir menú').click();await page.getByRole('navigation',{name:'Navegación mobile'}).getByRole('link',{name:'Contacto',exact:true}).click();await page.waitForURL('**/contacto/');}
 await page.emulateMedia({reducedMotion:'reduce'}); await page.goto(url+'/',{waitUntil:'networkidle'});
 const duration=await page.locator('.ticker-track').first().evaluate(el=>getComputedStyle(el).animationDuration);
 assert.equal(duration,'1e-05s');
 report.push({width,interactionChecks:'passed',consoleErrors:errors});
 assert.equal(errors.length,0,errors.join('\n'));
 await context.close();
}
await writeFile('outputs/qa/browser-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
assert.equal(report.filter(r=>r.violations?.length).length,0,'Accessibility violations remain');
}finally{await writeFile('outputs/qa/browser-report.json',JSON.stringify(report,null,2));await browser.close();}
