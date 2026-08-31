# UrbanGO — revisão visual da homepage

Implementação local de 31/08/2026. Sem commit, push, merge ou alterações à PR nesta rodada.

## Como funciona e primeira dobra

- Novo H2 PT: “Comece a trabalhar agora, o infinito te aguarda”. Em EN: “Start working now, infinite possibilities await”. Duas linhas sem palavras isoladas nas referências inspecionadas, incluindo 320 px.
- Hero responsivo entre 520 e 680 px em desktop. Exceção deliberada à sugestão de 620–700 px: em 1366×768 são necessários 520 px para apresentar também o título seguinte. Não se alterou a estrutura principal do hero.
- Em 1366×768: H2 termina a aproximadamente 718 px; fotografias dos cards começam a 761 px, já na borda inferior da primeira dobra. Altura total de “Como funciona”: aproximadamente 1056 px.
- Em 1920×1080: hero de 680 px; H2 termina a 909 px; cards começam a 967 px. Altura total de “Como funciona”: aproximadamente 1101 px.
- Padding da seção: 28 px superior / 44 px inferior. Desktop com altura até 800 px usa 20 px superior; margem antes dos cards cai de 24 para 12 px.
- Cards verticais equivalentes com fotografia 3:2, número, título, descrição curta, três informações e link. Corpo com padding de 24×28 px no desktop e aproximadamente 21 px em tablet/mobile. No mobile, os cards empilham-se; a altura da seção cresce naturalmente para cerca de 1,8 mil px a 390 px.
- Fotografias: `assets/images/driver-own-car.jpg` e `assets/images/driver-car-handover.jpg`, 1200×800. Geradas com a ferramenta integrada de imagem e revistas visualmente. Prompts completos em `home-visual-assets.md`.
- Timeline integrada à mesma seção: quatro pontos verdes e linha azul suave. Horizontal acima de 800 px; vertical abaixo desse limite. Hover discreto nos cards e respeito por `prefers-reduced-motion`.

## Confiança

- Desktop: fotografia 52% / texto 48%, sem intervalo, fade ou overlay. Altura de 560 px e largura máxima de 1600 px.
- Fotografia existente `urbango-driver-vehicle.jpg` preservada, com `object-fit: cover`.
- Texto branco sobre azul-marinho; destaques verdes e divisórias discretas. IMT, 24/7 e Uber + Bolt permanecem empilhados.
- Até 800 px: fotografia primeiro, com proporção 4:3; texto abaixo. Carregamento lazy confirmado ao chegar à seção.

## Cookies

- Banner com Gerir cookies / Usar só os necessários / Aceitar todos, e equivalentes EN.
- Painel nativo `<dialog>` com título acessível, foco, fecho por botão ou Escape e retorno ao controlo de origem.
- Necessários: sempre ativos, checkbox marcado e desativado. Estatísticas opcionais: ativáveis/desativáveis; escolha guardada e reposta ao reabrir.
- Mantidos a chave `urbango_consent`, os valores `necessary` / `analytics` e o evento `consent_update`. Nenhum novo fornecedor de tracking foi instalado.
- Rejeitar, aceitar, guardar, revogar e reabrir cobertos por testes. Preferência inicial da prévia reposta após os testes.
- Banner inspecionado numa fixture temporária para não apagar o consentimento do utilizador. A fixture não contém submissões e foi removida do `dist` pelo build final.

## Footer

- Removidos fundo branco, padding e arredondamento do bloco do logótipo.
- Novo `urbango-logo-dark.svg`: SVG híbrido com PNG oficial incorporado, máscara e filtro. Apenas lettering preto passa a branco; símbolo e cores preservados. Não se trata de um redesenho vetorial da marca.
- As versões experimentais do logo geradas por IA foram rejeitadas e não estão nos assets do site.
- Cinco colunas acima de 1000 px; duas colunas com bloco de marca centrado em tablet; uma coluna até 640 px, com contactos logo após a marca.
- Títulos partilham a mesma altura/alinhamento no desktop; descrição limitada a 280 px; telefone e email continuam clicáveis.
- Padding compacto existente preservado. Até 900 px, reserva inferior de 88 px impede sobreposição do copyright pelo CTA fixo.

## Validação

- 24 rotas PT/EN × 11 larguras = **264 combinações únicas verificadas**: 320, 360, 375, 390, 430, 768, 1024, 1280, 1366, 1440 e 1920 px. Sem overflow horizontal, cortes de conteúdo do rodapé ou desalinhamento dos títulos desktop.
- Centramento do bloco da marca em tablet confirmado separadamente nas 24 rotas.
- Primeira dobra inspecionada em 1366×768 e 1920×1080; comparações visuais mobile e tablet, incluindo título, fotografias, timeline, confiança e footer.
- Banner PT/EN verificado nas 11 larguras; modal verificado nas 11 larguras, incluindo 320×640, sem overflow horizontal e com categoria necessária bloqueada.
- `npm test`: build, verificações das 24 páginas, traduções, recursos locais, anchors e testes unitários de navegação/menu/cookies passaram.
- `node --check`: JavaScript de runtime, build, componente de cookies, fixture e testes passou.
- Sem erros ou avisos no console das interações inspecionadas.
- Lint e typecheck não estão configurados no projeto; não foram apresentados como executados.
- Dados de verificação: `qa-home/browser-checks.json`. Capturas: `qa-home/desktop-1366.png`, `qa-home/desktop-1920.png`, `qa-home/mobile-390.png` e `qa-home/footer-tablet.png`.

## Arquivos desta rodada

`index.html`, `assets/home.css`, `assets/styles.css`, `assets/site.js`, `assets/locales/en.json`, `build.mjs`, `components/cookies.mjs`, os três novos assets, `tests.mjs`, `tests-runtime.mjs`, scripts de preparação/QA, documentação e saída reconstruída em `dist/`.

Os textos das páginas internas, FAQ, conteúdos legais, rotas e estrutura do menu não foram redesenhados nesta rodada. As páginas internas receberam os componentes compartilhados de footer/cookies. Alterações locais de rodadas anteriores foram preservadas.
