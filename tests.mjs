import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {siteConfig} from './site.config.mjs';
const pages=['index.html','404.html','motoristas/index.html','veiculos/index.html','como-funciona/index.html','requisitos-tvde/index.html','sobre/index.html','contactos/index.html','faq/index.html','legal/privacidade.html','legal/cookies.html','legal/termos.html'];
const translations=JSON.parse(await readFile('assets/locales/en.json','utf8')).translations;
const compiled=new Map();
for(const lang of ['','en/'])for(const page of pages)compiled.set(lang+page,await readFile(`dist/${lang}${page}`,'utf8'));
for(const [page,html] of compiled){
  for(const token of ['<title>','meta name="description"','hreflang="pt-PT"','hreflang="en"','id="conteudo"','/assets/images/urbango-favicon.png'])assert(html.includes(token),`${page}: falta ${token}`);
  assert(html.includes(page.startsWith('en/')?'lang="en"':'lang="pt-PT"'),`${page}: idioma errado`);
  for(const marker of ['data-header','id="mobile-menu"','class="site-footer"','data-cookie-banner'])assert.equal(html.split(marker).length,2,`${page}: componente ausente/duplicado: ${marker}`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${page}: IDs duplicados`);
  const visible=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
  assert(!/incluíd[oa]s?|\bincluded\b|including insurance/i.test(visible),`${page}: promessa de serviços automáticos`);
  assert(!/candidatura|intl-tel-input|data-lead-form/.test(html),`${page}: referência ao formulário removido`);
  const cookie=html.match(/<div class="cookie-banner"[\s\S]*?<\/div>\s*<\/div>/)?.[0];
  assert(cookie&&!/analytics|configurad/i.test(cookie),`${page}: banner técnico ou ausente`);
  assert(html.includes(page.startsWith('en/')?'Essential only':'Usar só os necessários'),`${page}: opção de recusa ausente`);
  assert(html.includes('data-cookie-preferences')&&html.includes('data-cookie-save')&&html.includes('checked disabled'),`${page}: preferências incompletas`);
  // Verify every local link, including fragments across locale-specific pages.
  for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(!raw.startsWith('/')&&!raw.startsWith('#'))continue;
    const url=new URL(raw,`https://local.test/${page}`);
    let target=decodeURIComponent(url.pathname).slice(1);
    if(!target||target.endsWith('/'))target+='index.html';
    await stat(`dist/${target}`).catch(()=>{throw new Error(`${page}: recurso inexistente ${raw}`)});
    if(url.hash){const destination=compiled.get(target)||await readFile(`dist/${target}`,'utf8');assert(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${page}: anchor inválido ${raw}`);}
  }
  if(page.startsWith('en/')){
    const markup=html.replace(/<script[\s\S]*?<\/script>/g,'');
    for(const [,text] of markup.matchAll(/>([^<>]+)</g)){const key=text.trim();assert(!translations[key]||translations[key]===key,`${page}: texto PT sem tradução: ${key}`);}
    assert(html.includes('href="/en/#processo"'),`${page}: navegação perdeu idioma`);
  }
}
const ownerDestination=siteConfig.ownerDriverRegistrationUrl||siteConfig.ownerDriverInformationUrl;
for(const lang of ['','en/']){
  const html=compiled.get(lang+'index.html');
  const en=lang==='en/';
  assert.equal((html.match(/<section\b/g)||[]).length,5,'Home deve ter cinco seções (Porquê UrbanGO e Confiança estão fundidas)');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'Home deve ter um H1');
  for(const token of ['hero-backdrop','proof-media','proof-points','id="processo"','id="preciso-veiculo"','24/7','/assets/home.css','process-timeline','driver-own-car.jpg','driver-car-handover.jpg'])assert(html.includes(token),`Home sem ${token}`);
  assert.equal((html.match(/class="step-number"/g)||[]).length,4,'Timeline deve ter quatro passos');
  for(const token of ['vehicle-feature','media-note','form-grid','faq-section','requirement-grid','Mobilidade · TVDE · Portugal','path-number'])assert(!html.includes(token),`Home contém componente removido: ${token}`);
  // Ordem das seções: processo -> modalidades -> benefícios -> confiança.
  const idx=marker=>html.indexOf(marker);
  assert(idx('id="processo"')<idx('id="modalidades"'),'Modalidades deve vir depois de Como funciona');
  assert(idx('id="modalidades"')<idx('benefits-title'),'Modalidades deve vir antes de Porquê UrbanGO');
  assert(idx('benefits-title')<idx('proof-title'),'Confiança deve vir depois de Porquê UrbanGO');
  // Título novo "Comece já a trabalhar, o infinito aguarda-te" (PT) / tradução natural (EN).
  assert(html.includes(en?'Start working today,':'Comece já a trabalhar,'),'Home sem novo título (parte 1)');
  assert(html.includes(en?'the road ahead is yours.':'o infinito aguarda-te'),'Home sem novo título (parte 2)');
  // Modalidades TVDE: seis cards informativos (3 Uber + 3 Bolt, escopo das duas plataformas).
  assert.equal((html.match(/class="modality-card"/g)||[]).length,6,'Modalidades deve ter seis cards (Uber e Bolt)');
  assert(html.includes('Uber · Portugal')&&html.includes('Bolt · Portugal'),'Modalidades deve cobrir Uber e Bolt');
  assert(html.includes(en?'TVDE options':'Modalidades TVDE'),'Modalidades sem eyebrow');
  assert(html.includes(en?'Register with my vehicle':'Registar-me com a minha viatura'),'Modalidades sem CTA de registo');
  // CTA de registo aponta para o destino configurado (registo real ainda pendente).
  const expectedHref=en&&ownerDestination.startsWith('/')?`/en${ownerDestination}`:ownerDestination;
  assert(html.includes(`href="${expectedHref}"`)&&html.includes('data-owner-registration'),'CTA de registo sem destino configurado');
  // Botão voltar ao topo, acima do WhatsApp.
  assert(html.includes('data-back-to-top'),'Home sem botão voltar ao topo');
  assert(html.includes(en?'aria-label="Back to top"':'aria-label="Voltar ao topo"'),'Botão voltar ao topo sem aria-label traduzida');
  // Footer: Livro de Reclamações com destino oficial.
  assert(html.includes('https://www.livroreclamacoes.pt/Inicio/'),'Footer sem link do Livro de Reclamações');
  assert(html.includes(en?'Complaints Book':'Livro de Reclamações'),'Footer sem texto do Livro de Reclamações');
  assert(/href="https:\/\/www\.livroreclamacoes\.pt\/Inicio\/" target="_blank" rel="noopener noreferrer"/.test(html),'Link do Livro de Reclamações sem target/rel seguros');
  // Cookies: ordem Aceitar todos / Só necessários / Gerir preferências.
  const cookieBanner=html.match(/<div class="cookie-banner"[\s\S]*?<\/div>\s*<\/div>/)[0];
  const bidx=marker=>cookieBanner.indexOf(marker);
  assert(bidx('data-cookie-accept')<bidx('data-cookie-reject')&&bidx('data-cookie-reject')<bidx('data-cookie-settings'),'Ordem dos botões de cookies incorreta');
}
const js=await readFile('assets/site.js','utf8');
assert(!/phoneInput|FormData|form_submit|intlTelInput/.test(js),'JavaScript do formulário ainda presente');
console.log(`OK: ${compiled.size} páginas PT/EN; estrutura, traduções, conteúdo, assets e todos os anchors validados.`);
