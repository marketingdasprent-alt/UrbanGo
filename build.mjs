import { cp, mkdir, rm } from 'node:fs/promises';
const out='dist'; await rm(out,{recursive:true,force:true}); await mkdir(out);
for (const item of ['index.html','404.html','robots.txt','sitemap.xml','assets','motoristas','veiculos','como-funciona','requisitos-tvde','sobre','contactos','faq','legal']) await cp(item,`${out}/${item}`,{recursive:true});
console.log('Build concluído em dist/');
