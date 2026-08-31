(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const isEnglish = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const locale = isEnglish ? 'en' : 'pt';
  const basePath = isEnglish ? location.pathname.replace(/^\/en(?=\/|$)/, '') || '/' : location.pathname;
  const localePath = lang => lang === 'en' ? `/en${basePath === '/' ? '/' : basePath}` : basePath;
  const ui = { pt: {openMenu:'Abrir menu',closeMenu:'Fechar menu'}, en: {openMenu:'Open menu',closeMenu:'Close menu'} }[locale];
  if(!document.querySelector('[data-lang]')){const switcher=document.createElement('nav');switcher.className='page-language';switcher.setAttribute('aria-label',locale==='en'?'Language':'Idioma');switcher.innerHTML='<a data-lang="pt" lang="pt">PT</a><span>|</span><a data-lang="en" lang="en">EN</a>';document.body.prepend(switcher)}
  function applyLocaleNavigation(){
    document.documentElement.lang=isEnglish?'en':'pt-PT';
    $$('[data-lang]').forEach(link=>{const lang=link.dataset.lang;link.href=localePath(lang);if(lang===locale)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');link.addEventListener('click',()=>localStorage.setItem('urbango_language',lang))});
  }
  const header=$('[data-header]'),menuButton=$('.menu-toggle'),menu=$('#mobile-menu'),closeButton=$('.menu-close'),backdrop=$('[data-menu-backdrop]');let previousFocus;
  const focusable=()=>$$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])',menu);
  const setMenu=open=>{if(!menu||!menuButton)return;menuButton.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));menu.classList.toggle('open',open);backdrop.hidden=!open;requestAnimationFrame(()=>backdrop.classList.toggle('open',open));document.body.classList.toggle('menu-open',open);if(open){previousFocus=document.activeElement;setTimeout(()=>closeButton?.focus(),250)}else if(previousFocus)menuButton.focus()};
  menuButton?.addEventListener('click',()=>setMenu(true));closeButton?.addEventListener('click',()=>setMenu(false));backdrop?.addEventListener('click',()=>setMenu(false));menu?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});document.addEventListener('keydown',e=>{if(menu?.getAttribute('aria-hidden')==='true')return;if(e.key==='Escape'){setMenu(false);return}if(e.key==='Tab'){const items=focusable(),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});addEventListener('resize',()=>{if(innerWidth>1100&&menu?.classList.contains('open'))setMenu(false)});
  const backToTop=$('[data-back-to-top]');
  const onScroll=()=>{header?.classList.toggle('scrolled',scrollY>12);if(backToTop)backToTop.hidden=scrollY<=500};onScroll();addEventListener('scroll',onScroll,{passive:true});
  backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
  const footer=$('.site-footer');
  if(footer&&'IntersectionObserver' in window)new window.IntersectionObserver(entries=>document.body.classList.toggle('footer-visible',entries.some(entry=>entry.isIntersecting))).observe(footer);
  window.dataLayer=window.dataLayer||[];const track=(event,data={})=>window.dataLayer.push({event,...data});document.addEventListener('click',e=>{const item=e.target.closest('[data-event]');if(item)track(item.dataset.event,{link_url:item.href||''})});
  const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
  const banner=$('[data-cookie-banner]'), preferences=$('[data-cookie-preferences]'), analyticsToggle=$('[data-cookie-analytics]');
  let consent=null, cookieTrigger=null;
  try{consent=localStorage.getItem('urbango_consent')}catch{/* Consent still works for this visit when storage is unavailable. */}
  const showBanner=show=>{if(!banner)return;banner.classList.toggle('show',show);document.body.classList.toggle('cookie-banner-open',show);banner.inert=!show;banner.setAttribute('aria-hidden',String(!show))};
  showBanner(false);
  if(!consent)setTimeout(()=>{if(!consent&&!preferences?.open)showBanner(true)},500);
  const closePreferences=()=>{preferences?.close();document.body.classList.remove('cookie-modal-open');showBanner(!consent);if(cookieTrigger?.isConnected&&cookieTrigger.offsetParent!==null)cookieTrigger.focus();else $('.brand')?.focus()};
  const saveConsent=value=>{consent=value;try{localStorage.setItem('urbango_consent',value)}catch{}showBanner(false);track('consent_update',{analytics:value==='analytics'});if(preferences?.open)closePreferences()};
  const openPreferences=event=>{if(!preferences)return;cookieTrigger=event.currentTarget;analyticsToggle.checked=consent==='analytics';showBanner(false);preferences.showModal();document.body.classList.add('cookie-modal-open')};
  $('[data-cookie-accept]')?.addEventListener('click',()=>saveConsent('analytics'));
  $('[data-cookie-reject]')?.addEventListener('click',()=>saveConsent('necessary'));
  $$('[data-cookie-settings]').forEach(button=>button.addEventListener('click',openPreferences));
  $('[data-cookie-save]')?.addEventListener('click',()=>saveConsent(analyticsToggle.checked?'analytics':'necessary'));
  $('[data-cookie-necessary]')?.addEventListener('click',()=>saveConsent('necessary'));
  $('[data-cookie-close]')?.addEventListener('click',closePreferences);
  preferences?.addEventListener('cancel',event=>{event.preventDefault();closePreferences()});
  preferences?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closePreferences()}});
  menuButton?.setAttribute('aria-label',ui.openMenu);closeButton?.setAttribute('aria-label',ui.closeMenu);applyLocaleNavigation();document.documentElement.classList.add('js');
})();
