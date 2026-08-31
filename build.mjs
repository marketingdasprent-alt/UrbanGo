import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { cookieShell } from './components/cookies.mjs';
import { siteConfig } from './site.config.mjs';

const out='dist';
const pageFiles=['index.html','404.html','motoristas/index.html','veiculos/index.html','como-funciona/index.html','requisitos-tvde/index.html','sobre/index.html','contactos/index.html','faq/index.html','legal/privacidade.html','legal/cookies.html','legal/termos.html'];
const english=JSON.parse(await readFile('assets/locales/en.json','utf8'));
const version='20260831-v4';
const navItems=[['/motoristas/','Motoristas'],['/veiculos/','Veículos'],['/#processo','Como funciona'],['/requisitos-tvde/','Requisitos TVDE'],['/sobre/','Sobre'],['/faq/','Ajuda']];
const active=(route,href)=>route===href?' aria-current="page"':'';

const header=route=>{
  const cta='/contactos/';
  const desktop=navItems.map(([href,label])=>`<a${active(route,href)} href="${href}">${label}</a>`).join('');
  const mobile=[...navItems.slice(0,4),['/sobre/','Sobre a UrbanGO'],['/faq/','Ajuda / FAQ'],['/contactos/','Contactos']].map(([href,label])=>`<a${active(route,href)} href="${href}">${label} <span>→</span></a>`).join('');
  return `<header class="site-header" data-header><div class="container nav-wrap"><a class="brand" href="/" aria-label="UrbanGO — início"><img src="/assets/images/urbango-logo.png" width="883" height="201" alt="UrbanGO"></a><nav id="main-nav" class="main-nav" aria-label="Navegação principal">${desktop}<span class="language-switch" aria-label="Idioma"><a href="${route}" lang="pt" aria-current="page" data-lang="pt">PT</a><span>|</span><a href="/en${route}" lang="en" data-lang="en">EN</a></span><a class="button button-sm" href="${cta}" data-event="cta_driver_click">Quero ser motorista</a></nav><button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></header><div class="menu-backdrop" data-menu-backdrop hidden></div><aside id="mobile-menu" class="mobile-menu" aria-hidden="true" aria-label="Menu mobile"><div class="mobile-menu-head"><a class="brand" href="/"><img src="/assets/images/urbango-logo.png" width="883" height="201" alt="UrbanGO"></a><button class="menu-close" type="button" aria-label="Fechar menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><nav class="mobile-menu-nav" aria-label="Navegação mobile">${mobile}</nav><div class="mobile-language"><strong>Idioma</strong><a href="${route}" lang="pt" aria-current="page" data-lang="pt">Português (PT)</a><a href="/en${route}" lang="en" data-lang="en">English (EN)</a></div><div class="mobile-menu-actions"><a class="button" href="${cta}">Quero ser motorista</a><a href="https://wa.me/351910128228" target="_blank" rel="noopener">Falar no WhatsApp</a><a href="tel:+351910128228">Ligar agora</a></div></aside>`;
};

const footer=`<footer class="site-footer"><div class="container footer-grid"><div class="footer-about"><a class="brand brand-footer" href="/"><img src="/assets/images/urbango-logo-dark.svg" width="883" height="201" alt="UrbanGO"></a><p>Mobilidade e logística em Portugal.<br>TVDE, entrega expresso e aluguer de viaturas.</p></div><div><h2>Motoristas</h2><a href="/motoristas/">Começar</a><a href="/requisitos-tvde/">Requisitos</a><a href="/como-funciona/">Como funciona</a></div><div><h2>Empresa</h2><a href="/sobre/">Sobre</a><a href="/contactos/">Contactos</a><a href="/faq/">FAQ</a></div><div><h2>Legal</h2><a href="/legal/privacidade.html">Privacidade</a><a href="/legal/cookies.html">Cookies</a><a href="/legal/termos.html">Informação legal</a><button class="link-button" data-cookie-settings>Gerir cookies</button></div><div class="footer-contact"><h2>Contactos</h2><span>Telefone</span><a href="tel:+351910128228">+351 910 128 228</a><span>Email</span><a href="mailto:geral@urbango.pt">geral@urbango.pt</a></div></div><div class="container footer-bottom"><span>© <span data-year></span> UrbanGO. <span>Todos os direitos reservados.</span></span><span>Operador TVDE licenciado pelo IMT</span></div></footer>`;
const whatsapp=`<a class="whatsapp" href="https://wa.me/351910128228?text=Ol%C3%A1%20UrbanGO%2C%20gostaria%20de%20saber%20mais%20sobre%20trabalhar%20como%20motorista%20TVDE." target="_blank" rel="noopener" aria-label="Falar com a UrbanGO no WhatsApp" data-event="whatsapp_click"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.35-4.28A8.5 8.5 0 1 1 20.5 11.7Z"/><path class="wa-fill" d="M8.2 7.35c.2-.46.4-.47.72-.48h.61c.2 0 .4.08.5.39l.78 1.88c.08.23.05.43-.08.62l-.58.72c-.17.2-.13.39 0 .59.64 1.1 1.53 1.98 2.63 2.62.2.12.39.16.58-.02l.82-.96c.18-.22.4-.27.65-.17l1.82.86c.27.13.42.29.42.51 0 .35-.18 1.55-1.02 2.12-.52.36-1.2.55-1.9.46-1.05-.14-2.43-.63-4.12-2.12-2.05-1.81-3.36-4.03-3.46-5.54-.05-.65.17-1.12.43-1.48Z"/></svg></a>`;
const cookie=cookieShell;
const backToTop=`<button type="button" class="back-to-top" data-back-to-top aria-label="Voltar ao topo" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4M5 11l7-7 7 7"/></svg></button>`;
const mobileCta=route=>`<nav class="mobile-cta" aria-label="Ação rápida"><a href="/contactos/" data-event="cta_driver_click">Quero ser motorista <span>→</span></a></nav>`;

function applyShell(html,route){
  html=html.replace(/<main(?![^>]*\bid=)/,'<main id="conteudo"');
  html=html.replace(/<header class="site-header"[\s\S]*?<\/header>/,'').replace(/<div class="menu-backdrop"[\s\S]*?<\/div>/,'').replace(/<aside id="mobile-menu"[\s\S]*?<\/aside>/,'');
  html=html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,'').replace(/<a class="whatsapp"[\s\S]*?<\/a>/,'').replace(/<div class="cookie-banner"[\s\S]*?<\/div><\/div>/,'').replace(/<nav class="mobile-cta"[\s\S]*?<\/nav>/,'');
  if(html.includes('class="skip-link"'))html=html.replace(/(<a class="skip-link"[\s\S]*?<\/a>)/,`$1${header(route)}`);else html=html.replace('<body>',`<body><a class="skip-link" href="#conteudo">Saltar para o conteúdo</a>${header(route)}`);
  return html.replace('href="OWNER_DRIVER_REGISTRATION"',`href="${siteConfig.ownerDriverRegistrationUrl || siteConfig.ownerDriverInformationUrl}"`).replace('</body>',`${footer.replace('<button class="link-button" data-cookie-settings>','<a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">Livro de Reclamações</a><button class="link-button" data-cookie-settings>')}${whatsapp}${backToTop}${cookie}${mobileCta(route)}</body>`);
}

await rm(out,{recursive:true,force:true});await mkdir(out);
for(const item of ['favicon.ico','robots.txt','sitemap.xml','assets'])await cp(item,`${out}/${item}`,{recursive:true});
for(const file of pageFiles){
  const route=file==='index.html'?'/':`/${file.replace(/index\.html$/,'')}`;
  let html=applyShell(await readFile(file,'utf8'),route);
  html=html.replaceAll('/assets/images/urbango-logo.png"',`/assets/images/urbango-logo.png?v=${version}"`).replaceAll('/assets/images/urbango-logo-dark.svg"',`/assets/images/urbango-logo-dark.svg?v=${version}"`).replace(/\/assets\/home\.css\?v=[^"]+/,`/assets/home.css?v=${version}`);
  if(!html.includes('rel="icon"'))html=html.replace('</head>','<link rel="icon" href="/assets/images/urbango-favicon.png" type="image/png"></head>');
  if(!html.includes('/assets/site.js'))html=html.replace('</head>','<script defer src="/assets/site.js"></script></head>');
  html=html.replace('/assets/styles.css"',`/assets/styles.css?v=${version}"`).replace('/assets/site.js"',`/assets/site.js?v=${version}"`);
  const absolute=`https://www.urbango.pt${route}`;
  if(!html.includes('hreflang="pt-PT"'))html=html.replace('</head>',`<link rel="alternate" hreflang="pt-PT" href="${absolute}"><link rel="alternate" hreflang="en" href="https://www.urbango.pt/en${route}"><link rel="alternate" hreflang="x-default" href="${absolute}"></head>`);
  html=html.replace(/[ \t]+$/gm,'');
  const ptTarget=`${out}/${file}`;await mkdir(ptTarget.slice(0,ptTarget.lastIndexOf('/')),{recursive:true});await writeFile(ptTarget,html);
  html=html.replace(/>([^<>]+)</g,(match,text)=>{const key=text.trim();return english.translations[key]?`>${text.replace(key,english.translations[key])}<`:match});
  html=html.replace(/(aria-label|alt)="([^"]*)"/g,(match,name,value)=>english.translations[value]?`${name}="${english.translations[value]}"`:match);
  html=html.replace('lang="pt-PT"','lang="en"').replace('content="pt_PT"','content="en_GB"').replace(/href="\/(?!\/|en\/|assets\/)/g,'href="/en/');
  html=html.replaceAll('lang="pt" aria-current="page" data-lang="pt"','lang="pt" data-lang="pt"').replaceAll('lang="en" data-lang="en"','lang="en" aria-current="page" data-lang="en"');
  html=html.replace(/<a href="[^"]*" lang="pt"([^>]*)data-lang="pt"/g,`<a href="${route}" lang="pt"$1data-lang="pt"`);
  const meta=english.meta[route];if(meta)html=html.replace(/<title>.*?<\/title>/,`<title>${meta.title}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${meta.description}">`).replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${meta.title}">`).replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${meta.description}">`);
  html=html.replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="https://www.urbango.pt/en${route}">`).replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="https://www.urbango.pt/en${route}">`);
  const target=`${out}/en/${file}`;await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await writeFile(target,html);
}
console.log('Build concluído em dist/');
