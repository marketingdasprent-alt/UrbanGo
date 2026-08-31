export const cookieShell = `
<div class="cookie-banner" data-cookie-banner role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
  <div><strong id="cookie-title">Cookies e privacidade</strong><p id="cookie-desc">Utilizamos cookies essenciais para o site funcionar e, com a sua autorização, cookies que nos ajudam a melhorar a sua experiência.</p></div>
  <div class="cookie-actions"><button class="button button-sm button-dark" data-cookie-accept>Aceitar todos</button><button class="button button-sm button-outline-dark" data-cookie-reject>Usar só os necessários</button><button class="button button-sm button-outline-dark" data-cookie-settings>Gerir preferências</button></div>
</div>
<dialog class="cookie-preferences" data-cookie-preferences aria-labelledby="preferences-title" aria-describedby="preferences-desc">
  <div class="preferences-heading"><h2 id="preferences-title">Preferências de cookies</h2><button type="button" class="preferences-close" data-cookie-close aria-label="Fechar preferências">×</button></div>
  <p id="preferences-desc">Escolha os cookies opcionais que autoriza. Pode alterar a sua escolha a qualquer momento.</p>
  <div class="cookie-category"><label><input type="checkbox" checked disabled><strong>Estritamente necessários</strong></label><p>Permitem a navegação e guardam as suas preferências. Estão sempre ativos.</p></div>
  <div class="cookie-category"><label><input type="checkbox" data-cookie-analytics><strong>Estatísticas opcionais</strong></label><p>Ajudam-nos a compreender a utilização do site e a melhorar a experiência, apenas com a sua autorização.</p></div>
  <p><a class="text-link" href="/legal/cookies.html">Política de Cookies</a></p>
  <div class="preferences-actions"><button class="button button-outline-dark" data-cookie-necessary>Usar só os necessários</button><button class="button button-dark" data-cookie-save>Guardar preferências</button></div>
</dialog>`;
