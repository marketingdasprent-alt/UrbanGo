import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
const out='dist'; await rm(out,{recursive:true,force:true}); await mkdir(out);
const pageFiles=['index.html','404.html','motoristas/index.html','veiculos/index.html','como-funciona/index.html','requisitos-tvde/index.html','sobre/index.html','contactos/index.html','faq/index.html','legal/privacidade.html','legal/cookies.html','legal/termos.html'];
for (const item of ['index.html','404.html','favicon.ico','robots.txt','sitemap.xml','assets','motoristas','veiculos','como-funciona','requisitos-tvde','sobre','contactos','faq','legal']) await cp(item,`${out}/${item}`,{recursive:true});
const english=JSON.parse(await readFile('assets/locales/en.json','utf8'));
for(const file of pageFiles){
  let html=await readFile(file,'utf8');
  html=html.replaceAll('/assets/icons/favicon.svg','/assets/images/urbango-logo.png');
  html=html.replace(/(<a class="brand[^"]*" href="[^"]*">)(?!<img)/g,'$1<img src="/assets/images/urbango-logo.png" width="48" height="48" alt="">');
  if(!html.includes('/assets/site.js')) html=html.replace('</head>','<script defer src="/assets/site.js"></script></head>');
  const route=file==='index.html'?'/':`/${file.replace(/index\.html$/,'')}`;
  const absolute=`https://www.urbango.pt${route}`;
  if(!html.includes('hreflang="pt-PT"')) html=html.replace('</head>',`<link rel="alternate" hreflang="pt-PT" href="${absolute}"><link rel="alternate" hreflang="en" href="https://www.urbango.pt/en${route}"><link rel="alternate" hreflang="x-default" href="${absolute}"></head>`);
  await writeFile(`${out}/${file}`,html);
  html=html.replace(/>([^<>]+)</g,(match,text)=>{const key=text.trim();return english.translations[key]?`>${text.replace(key,english.translations[key])}<`:match});
  html=html.replace(/(aria-label|alt)="([^"]*)"/g,(match,name,value)=>english.translations[value]?`${name}="${english.translations[value]}"`:match);
  html=html.replace('lang="pt-PT"','lang="en"').replace(/href="\/(?!\/|en\/|assets\/|#)/g,'href="/en/');
  const meta=english.meta[route];
  if(meta){html=html.replace(/<title>.*?<\/title>/,`<title>${meta.title}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${meta.description}">`).replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${meta.title}">`).replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${meta.description}">`)}
  html=html.replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="https://www.urbango.pt/en${route}">`).replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="https://www.urbango.pt/en${route}">`);
  const target=`${out}/en/${file}`;await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await writeFile(target,html);
}
console.log('Build concluído em dist/');
