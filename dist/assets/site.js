(() => {
  'use strict';
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 12);
  onScroll(); addEventListener('scroll', onScroll, {passive:true});
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open); document.body.classList.toggle('menu-open', open);
  });
  nav?.addEventListener('click', e => { if(e.target.closest('a')) { menuButton?.setAttribute('aria-expanded','false'); nav.classList.remove('open'); document.body.classList.remove('menu-open'); }});
  window.dataLayer = window.dataLayer || [];
  const track = (event, data={}) => window.dataLayer.push({event, ...data});
  document.addEventListener('click', e => { const item=e.target.closest('[data-event]'); if(item) track(item.dataset.event,{link_url:item.href||''}); });
  const form = document.querySelector('[data-lead-form]');
  if(form){ let started=false, submitting=false;
    form.addEventListener('input',()=>{if(!started){started=true;track('form_start')}} ,{once:true});
    form.addEventListener('submit', async e => {e.preventDefault(); if(submitting)return; const status=form.querySelector('.form-status'); form.querySelectorAll('.field-error').forEach(x=>x.textContent='');
      if(!form.checkValidity()){ form.querySelectorAll(':invalid').forEach(field=>{const err=field.closest('label')?.querySelector('.field-error');if(err)err.textContent=field.validity.valueMissing?'Campo obrigatório.':'Verifique este campo.'}); form.querySelector(':invalid')?.focus(); status.textContent='Corrija os campos assinalados.'; track('form_error',{reason:'validation'}); return; }
      const endpoint=form.dataset.endpoint; if(!endpoint){status.textContent='O formulário ainda não está ligado ao sistema de candidaturas. Contacte-nos por telefone ou email.';track('form_error',{reason:'endpoint_not_configured'});return;}
      submitting=true; const button=form.querySelector('button[type=submit]');button.disabled=true;button.textContent='A enviar…';track('form_submit');
      try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!response.ok)throw new Error('request_failed');form.reset();status.textContent='Pedido enviado. A equipa entrará em contacto consigo.';track('form_success');}catch{status.textContent='Não foi possível enviar. Tente novamente ou contacte-nos diretamente.';track('form_error',{reason:'network'});}finally{submitting=false;button.disabled=false;button.innerHTML='Enviar candidatura <span aria-hidden="true">→</span>';}
    });
  }
  const banner=document.querySelector('[data-cookie-banner]'); const consent=localStorage.getItem('urbango_consent'); if(!consent) setTimeout(()=>banner?.classList.add('show'),500);
  const saveConsent=value=>{localStorage.setItem('urbango_consent',value);banner?.classList.remove('show');track('consent_update',{analytics:value==='analytics'});};
  document.querySelector('[data-cookie-accept]')?.addEventListener('click',()=>saveConsent('analytics'));
  document.querySelector('[data-cookie-reject]')?.addEventListener('click',()=>saveConsent('necessary'));
  document.querySelector('[data-cookie-settings]')?.addEventListener('click',()=>banner?.classList.add('show'));
  root.classList.add('js');
})();
