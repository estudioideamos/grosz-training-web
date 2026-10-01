import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\bAKIA[0-9A-Z]{16}\b/,/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/\bsk-[A-Za-z0-9]{30,}\b/];
const hits=[];
for(const f of files) {try {const s=await readFile(f,'utf8');if(patterns.some(p=>p.test(s)))hits.push(f);}catch{}}
await writeFile('docs/secret-scan.json',JSON.stringify({scope:'Tracked and untracked non-ignored files; heuristic scan, not full Git history',matchedFiles:hits},null,2));
console.log('Possible credential patterns in tracked working tree:',hits.length);
