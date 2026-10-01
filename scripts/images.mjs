import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/assets/responsive',{recursive:true});
const manifest={};
for(const name of await readdir('public/assets')) {
  if(!/\.(webp|jpg|png)$/.test(name)) continue;
  const input=`public/assets/${name}`;
  const {width,height}=await sharp(input).metadata();
  const variants=[];
  for(const w of [320,640,960,1440].filter(w=>w<width)) {
    const file=`assets/responsive/${name.replace(/\.[^.]+$/,'')}-${w}.webp`;
    await sharp(input).resize({width:w,withoutEnlargement:true}).webp({quality:82}).toFile(`public/${file}`);
    variants.push({src:file,width:w});
  }
  manifest[name]={width,height,variants};
}
await writeFile('app/image-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Generated responsive variants for ${Object.keys(manifest).length} images.`);
