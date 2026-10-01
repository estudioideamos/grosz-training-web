import { chromium } from 'playwright';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { mkdir, writeFile } from 'node:fs/promises';
const root='http://127.0.0.1:'+(process.env.PORT||'4173')+(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/';
await mkdir('outputs/qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--remote-debugging-port=9225']});
const summary=[];
try {
 for(const mode of ['mobile','desktop']) {
  const settings={port:9225,logLevel:'error',output:['json','html'],onlyCategories:['performance','accessibility','best-practices','seo'],...(mode==='desktop'?{preset:'desktop'}:{})};
  const result=await lighthouse(root,settings,mode==='desktop'?desktopConfig:undefined);
  await writeFile(`outputs/qa/lighthouse-${mode}.json`,result.report[0]);
  await writeFile(`outputs/qa/lighthouse-${mode}.html`,result.report[1]);
  summary.push({mode,formFactor:result.lhr.configSettings.formFactor,benchmarkIndex:result.lhr.environment.benchmarkIndex,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,result.lhr.audits[k].displayValue])),issues:Object.values(result.lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue})),runtimeError:result.lhr.runtimeError});
 }
 await writeFile('outputs/qa/lighthouse-summary.json',JSON.stringify(summary,null,2));
 console.log(JSON.stringify(summary,null,2));
} finally {await browser.close();}
