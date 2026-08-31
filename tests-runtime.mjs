import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const code=await readFile('assets/site.js','utf8');
function element(){
  const classes=new Set(),attrs=new Map(),events=new Map();
  return {dataset:{},hidden:false,open:false,checked:false,isConnected:true,offsetParent:{},events,attrs,showModal(){this.open=true},close(){this.open=false},focus(){this.focused=true;},classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k),toggle(k,flag){if(flag)classes.add(k);else classes.delete(k);}},setAttribute:(k,v)=>attrs.set(k,v),getAttribute:k=>attrs.get(k),removeAttribute:k=>attrs.delete(k),addEventListener:(k,fn)=>events.set(k,fn)};
}
for(const pathname of ['/','/en/','/en/legal/cookies']){
  const selectors=['[data-lang]','[data-header]','.menu-toggle','#mobile-menu','.menu-close','[data-menu-backdrop]','[data-year]','[data-cookie-banner]','[data-cookie-accept]','[data-cookie-reject]','[data-cookie-preferences]','[data-cookie-analytics]','[data-cookie-save]','[data-cookie-necessary]','[data-cookie-close]','[data-back-to-top]','.site-footer'];
  const nodes=Object.fromEntries(selectors.map(k=>[k,element()]));
  const langs=[element(),element()];langs[0].dataset.lang='pt';langs[1].dataset.lang='en';
  const settings=[element(),element()],docEvents=new Map(),globalEvents=new Map(),storage=new Map();
  const menu=nodes['#mobile-menu'];menu.setAttribute('aria-hidden','true');
  menu.querySelectorAll=()=>[nodes['.menu-close'],...langs];
  const document={querySelector:s=>nodes[s]||null,querySelectorAll:s=>s==='[data-lang]'?langs:s==='[data-cookie-settings]'?settings:[],addEventListener:(k,fn)=>docEvents.set(k,fn),body:element(),documentElement:element(),activeElement:nodes['.menu-toggle']};
  const scrollCalls=[];let reducedMotionMatches=false;const ioInstances=[];
  class MockIntersectionObserver{constructor(cb){this.cb=cb;ioInstances.push(this)}observe(target){this.target=target}}
  const window={scrollTo:opts=>scrollCalls.push(opts),matchMedia:q=>({matches:reducedMotionMatches}),IntersectionObserver:MockIntersectionObserver};
  const ctx={document,window,location:{pathname},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},scrollY:0,innerWidth:390,addEventListener:(type,fn)=>globalEvents.set(type,fn),setTimeout:fn=>fn(),requestAnimationFrame:fn=>fn(),Date};
  vm.runInNewContext(code,ctx);
  const banner=nodes['[data-cookie-banner]'];
  assert(banner.classList.contains('show'),'First visit displays consent');
  assert(document.body.classList.contains('cookie-banner-open'),'Body should flag cookie banner as open');
  nodes['[data-cookie-reject]'].events.get('click')();
  assert.equal(storage.get('urbango_consent'),'necessary');
  assert(!banner.classList.contains('show'));
  assert(!document.body.classList.contains('cookie-banner-open'),'Body should clear cookie banner flag once dismissed');
  const modal=nodes['[data-cookie-preferences]'],toggle=nodes['[data-cookie-analytics]'];
  for(const button of settings){button.events.get('click')({currentTarget:button});assert(modal.open);assert(!banner.classList.contains('show'));assert(document.body.classList.contains('cookie-modal-open'));toggle.checked=true;nodes['[data-cookie-save]'].events.get('click')();assert.equal(storage.get('urbango_consent'),'analytics');assert(!modal.open);assert(!document.body.classList.contains('cookie-modal-open'));assert(button.focused);}
  settings[0].events.get('click')({currentTarget:settings[0]});assert(toggle.checked);toggle.checked=false;nodes['[data-cookie-save]'].events.get('click')();assert.equal(storage.get('urbango_consent'),'necessary');assert(!modal.open);
  settings[0].events.get('click')({currentTarget:settings[0]});toggle.checked=true;modal.events.get('cancel')({preventDefault(){}});assert.equal(storage.get('urbango_consent'),'necessary');assert(!modal.open);
  settings[0].events.get('click')({currentTarget:settings[0]});modal.events.get('keydown')({key:'Escape',preventDefault(){},stopPropagation(){}});assert(!modal.open);assert(settings[0].focused);
  settings[0].events.get('click')({currentTarget:settings[0]});assert(!toggle.checked);nodes['[data-cookie-necessary]'].events.get('click')();assert.equal(storage.get('urbango_consent'),'necessary');assert(!modal.open);
  nodes['[data-cookie-accept]'].events.get('click')();assert.equal(storage.get('urbango_consent'),'analytics');
  assert(window.dataLayer.some(e=>e.event==='consent_update'&&e.analytics===false));
  assert(window.dataLayer.some(e=>e.event==='consent_update'&&e.analytics===true));
  nodes['.menu-toggle'].events.get('click')();assert.equal(menu.getAttribute('aria-hidden'),'false');assert(document.body.classList.contains('menu-open'));assert(nodes['.menu-close'].focused);
  docEvents.get('keydown')({key:'Escape'});assert.equal(menu.getAttribute('aria-hidden'),'true');assert(!document.body.classList.contains('menu-open'));assert(nodes['.menu-toggle'].focused);
  assert.equal(document.documentElement.lang,pathname.startsWith('/en')?'en':'pt-PT');
  assert.equal(langs[pathname.startsWith('/en')?1:0].getAttribute('aria-current'),'page');
  // Back-to-top: hidden until past the 500px threshold, visible after, hidden again below it.
  const backToTop=nodes['[data-back-to-top]'];
  assert.equal(backToTop.hidden,true,'Back-to-top must stay hidden at the top of the page');
  ctx.scrollY=501;globalEvents.get('scroll')();
  assert.equal(backToTop.hidden,false,'Back-to-top must appear past the 500px threshold');
  ctx.scrollY=500;globalEvents.get('scroll')();
  assert.equal(backToTop.hidden,true,'Back-to-top must hide again at the 500px threshold');
  ctx.scrollY=800;globalEvents.get('scroll')();
  backToTop.events.get('click')();
  assert.equal(scrollCalls.at(-1).top,0);assert.equal(scrollCalls.at(-1).behavior,'smooth','Back-to-top should scroll smoothly by default');
  reducedMotionMatches=true;
  backToTop.events.get('click')();
  assert.equal(scrollCalls.at(-1).top,0);assert.equal(scrollCalls.at(-1).behavior,'instant','Back-to-top must respect prefers-reduced-motion');
  reducedMotionMatches=false;
  // Footer visibility toggles a body flag the floating actions CSS reacts to.
  assert.equal(ioInstances.length,1,'Footer visibility observer must be created once');
  assert.equal(ioInstances[0].target,nodes['.site-footer'],'Observer must watch the site footer');
  ioInstances[0].cb([{isIntersecting:true}]);
  assert(document.body.classList.contains('footer-visible'),'Body must flag footer as visible on intersection');
  ioInstances[0].cb([{isIntersecting:false}]);
  assert(!document.body.classList.contains('footer-visible'),'Body must clear footer flag once it leaves the viewport');
}
console.log('OK: unit tests for PT/EN navigation, mobile menu, focus, cookie preference controls, back-to-top threshold/motion and footer visibility.');
