import { readFile, stat } from 'node:fs/promises';
const pages=['index.html','404.html','motoristas/index.html','veiculos/index.html','como-funciona/index.html','requisitos-tvde/index.html','sobre/index.html','contactos/index.html','faq/index.html','legal/privacidade.html','legal/cookies.html','legal/termos.html'];
for(const page of pages){
  const pt=await readFile(`dist/${page}`,'utf8'); const en=await readFile(`dist/en/${page}`,'utf8');
  for(const token of ['<title>','meta name="description"','lang="pt-PT"'])if(!pt.includes(token))throw new Error(`${page}: falta ${token}`);
  for(const token of ['<title>','meta name="description"','lang="en"','hreflang="pt-PT"','hreflang="en"'])if(!en.includes(token))throw new Error(`en/${page}: falta ${token}`);
  for(const html of [pt,en]){
    for(const token of ['data-header','id="mobile-menu"','class="site-footer"','class="whatsapp"','data-cookie-banner'])if(!html.includes(token))throw new Error(`${page}: estrutura partilhada incompleta (${token})`);
    for(const marker of ['id="mobile-menu"','class="site-footer"'])if(html.split(marker).length!==2)throw new Error(`${page}: estrutura duplicada (${marker})`);
    for(const [,href] of html.matchAll(/href="([^"]+)"/g)){if(!href.startsWith('/')||href.startsWith('//')||href.startsWith('/en/assets/'))continue;const clean=href.split('#')[0].split('?')[0];if(!clean)continue;const target=clean.endsWith('/')?`${clean.slice(1)}index.html`:clean.slice(1);await stat(`dist/${target}`).catch(()=>{throw new Error(`${page}: link local quebrado ${href}`)});}
  }
}
for(const asset of ['dist/favicon.ico','dist/assets/images/urbango-driver-hero.webp','dist/assets/images/urbango-logo.png','dist/assets/vendor/intl-tel-input/js/intlTelInputWithUtils.min.js','dist/assets/locales/en.json'])await stat(asset);
console.log(`OK: ${pages.length*2} páginas PT/EN, links e assets essenciais validados.`);
