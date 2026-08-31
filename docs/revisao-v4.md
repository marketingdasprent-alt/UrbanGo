# UrbanGO — revisão V4 (continuação Claude Code)

Continuação do trabalho V4 iniciado pelo Codex e interrompido por limite de créditos (ver `HANDOFF-CLAUDE-V4.md`). Sem commit, push, merge ou publicação nesta rodada. Nenhuma reconstrução do site: apenas concluídas as pendências indicadas no handoff (traduções EN, testes automatizados, build e validação visual).

## O que já vinha implementado (herdado do Codex, apenas validado agora)

- Cookies: ordem `Aceitar todos` (verde) / `Usar só os necessários` (outline) na primeira linha, `Gerir preferências` full-width abaixo — em PT e EN, desktop e mobile.
- Título "Como funciona": `Comece já a trabalhar, o infinito aguarda-te`; indicadores `01`/`02` removidos dos dois cards; timeline manteve os quatro `step-number`.
- Hover/foco: card escuro com borda branca suave `rgba(255,255,255,.35)`; card claro com borda azul `rgba(25,174,212,.6)`; ambos via `:hover,:focus-within`.
- Nova secção `#modalidades` (Modalidades TVDE) entre "Como funciona" e "Porquê UrbanGO", com três cards informativos (UberX, Uber Comfort, Uber Black) baseados nas fontes oficiais Uber listadas no handoff, aviso explícito de que não é oferta de viaturas UrbanGO, e CTA de registo apontando para o destino configurável.
- Secções principais com `min-height: calc(100svh - var(--header-height))`, crescimento natural sem `height` fixo nem scroll interno.
- Confiança verificável: estrutura full-bleed (`proof-media` fora do `.container`), imagem 52/48 no desktop, `object-position: 60% center`, sem faixa azul lateral; mobile com imagem 100% da largura acima do texto.
- Botão "Voltar ao topo" acima do WhatsApp, seta SVG sem fundo/círculo, threshold de exibição.
- Footer com "Livro de Reclamações" na coluna Legal.

## O que foi concluído nesta rodada

### A. Traduções EN (`assets/locales/en.json`)

Adicionadas/corrigidas todas as chaves que faltavam para o V4:

- Título: `"Comece já a trabalhar,"` → `"Start working today,"` / `"o infinito aguarda-te"` → `"the road ahead is yours."` (as duas antigas chaves do título anterior foram substituídas, não deixadas como lixo morto).
- Secção Modalidades TVDE: eyebrow, H2, parágrafo introdutório, as três descrições de card, os três links "Consultar a fonte …", o aviso (`modality-note`), o H3 e o CTA do bloco final (`Registar-me com a minha viatura` → `Register with my vehicle`, exatamente o texto pedido).
- Footer: `"Livro de Reclamações"` → `"Complaints Book"`.
- Botão voltar ao topo: ver decisão abaixo.

Marcas (`UberX`, `Uber Comfort`, `Uber Black`, `Uber · Portugal`) foram mantidas iguais nos dois idiomas — são nomes de categoria, não texto a traduzir.

**Decisão registada — colisão de tradução resolvida:** o pedido original sugeria `aria-label="Voltar ao início"` (PT) / `"Back to top"` (EN) para o botão de voltar ao topo. Esse texto PT já existe no dicionário como chave para o link "Voltar ao início" da página 404, traduzido corretamente como `"Back to home"`. Como o mecanismo de tradução do `build.mjs` funciona por correspondência exata de texto PT→EN (uma chave, um valor, aplicado globalmente), usar a mesma frase para os dois elementos quebraria uma das duas traduções. Alterei o `aria-label` do botão para `"Voltar ao topo"` (mais preciso semanticamente — a ação é subir ao topo da página atual, não voltar à Home) e criei uma chave própria `"Voltar ao topo"` → `"Back to top"`. Ficheiro alterado: [build.mjs:22](build.mjs).

### B. Testes automatizados

**`tests.mjs`** — [tests.mjs](tests.mjs):
- Contagem de secções da Home atualizada de 5 para 6.
- Novas asserções: ordem `processo → modalidades → benefits → proof`; presença de 3 `.modality-card`; textos do novo título (PT/EN); ausência de `path-number`; CTA de modalidades aponta para o destino real configurado em `site.config.mjs` (`ownerDriverRegistrationUrl || ownerDriverInformationUrl`, com o prefixo `/en` correto na versão inglesa); botão voltar ao topo presente com `aria-label` traduzido; link do Livro de Reclamações com `target="_blank" rel="noopener noreferrer"` e texto traduzido; ordem dos botões de cookies (`Aceitar todos` → `Usar só os necessários` → `Gerir preferências`) validada dentro do próprio banner (isolando-o do botão "Gerir cookies" do footer, que usa o mesmo atributo `data-cookie-settings`).
- A verificação genérica já existente de "todo texto PT conhecido tem de aparecer traduzido nas páginas EN" cobre automaticamente todos os nós novos, porque as chaves foram todas acrescentadas ao dicionário.

**`tests-runtime.mjs`** — [tests-runtime.mjs](tests-runtime.mjs):
- Mocks novos no sandbox `vm`: `window.scrollTo`, `window.matchMedia` (controlável para simular `prefers-reduced-motion`), `window.IntersectionObserver` (classe mock que regista instâncias e permite disparar `isIntersecting` manualmente) e `addEventListener` global a registar handlers reais (antes era um no-op, o que impedia testar o listener de `scroll`).
- Testes novos: botão voltar ao topo escondido em `scrollY=500`, visível em `501` (limite exato); clique dispara `scrollTo({top:0, behavior:'smooth'})`, e `'instant'` quando `matchMedia('(prefers-reduced-motion: reduce)').matches` é verdadeiro; o observer do footer é criado uma única vez e alterna `body.footer-visible` conforme a interseção; `body.cookie-banner-open` e `body.cookie-modal-open` alternam corretamente (classes de que o CSS depende para esconder as ações flutuantes).
- Nota técnica: a primeira tentativa comparou objetos com `assert.deepEqual` entre um valor criado dentro do `vm` e um literal do Node "normal" — falhou por terem protótipos de realms diferentes, mesmo com os mesmos valores. Corrigido comparando propriedades individualmente (`top`, `behavior`).

`npm test` (build + `tests.mjs` + `tests-runtime.mjs`) passa sem falhas. `node --check` confirmado em todos os `.mjs`/`.js` alterados. Lint/typecheck continuam não configurados no projeto (não há scripts nem dependências para isso); não finjo tê-los executado.

### C. Validação visual (Browser do Claude Code, servidor `http://127.0.0.1:4175/`)

Percorridas as 9 resoluções pedidas (1366×768, 1440×900, 1920×1080, 2560×1440, 360×800, 390×844, 430×932, 768×1024, 1024×1366), em PT e/ou EN conforme relevante. Dados brutos em [docs/qa-v4/browser-checks.json](qa-v4/browser-checks.json).

- **Sem overflow horizontal** em nenhuma das 9 resoluções (PT e EN confirmados nas larguras principais).
- **Secções em ecrã inteiro:** a 1280×720, `hero`/`benefits`/`proof` ocupam exatamente `100svh - header` (643px); `processo` e `modalidades` crescem para além disso por terem mais conteúdo (1083px e 871px), sem cortes nem scroll interno; `final-cta` fica compacto por design (não precisa de viewport inteira, conforme item 22 do pedido original).
- **Altura real do header:** 79px no desktop e 75px em ≤640px. O CSS assume 77px/75px. A diferença de 2px no desktop é cosmética (folga residual de 2px por secção) e não produz corte de conteúdo nem scroll indevido; reporto o valor medido para eventual ajuste fino, mas não é um defeito visível.
- **Confiança verificável:** imagem encostada em `x=0` confirmado em 1280px e 2560px (sem faixa azul), proporção ≈52/48 no desktop, `object-position: 60% center`, sem fade. Em 390px a imagem ocupa 100% da largura, acima do texto, sem margens laterais.
- **Hover/foco dos cards:** confirmado por simulação de `:focus-within` via `element.focus()` — card escuro muda de `rgb(8,59,76)` para `rgba(255,255,255,.35)`; card claro muda de `rgb(217,226,223)` para `rgba(25,174,212,.6)`.
- **Modalidades responsivo:** 3 colunas ≥1920px; 2 colunas em 1024px com o terceiro card centrado numa linha própria; 1 coluna em 430px. Sem slider (conforme pedido, item 48).
- **Botão voltar ao topo:** aparece só acima de 500px de scroll, centrado sobre o WhatsApp, `aria-label` corretamente traduzido nas duas línguas; testado também via automação (ver secção B).
- **Footer:** grelha de 5 colunas alinhadas ao mesmo topo no desktop, 1 coluna no mobile; link "Livro de Reclamações" presente em PT/EN, aponta para `https://www.livroreclamacoes.pt/Inicio/` com `target="_blank" rel="noopener noreferrer"`.
- **Cookies:** banner e ordem dos botões confirmados visualmente em desktop (1440px) e mobile (360px, com "Usar só os necessários" a quebrar em duas linhas naturalmente); consentimento limpo e testado de novo para reproduzir a primeira visita sem afetar dados reais do utilizador.
- **Console:** sem erros em nenhuma das interações/resoluções inspecionadas.

**Limitação a registar:** o painel do browser esteve oculto durante parte da sessão (fora do foco visível da UI), o que fez a maioria das capturas de ecrã falharem ou virem em branco; a validação foi então feita principalmente por leitura de DOM/`getComputedStyle`/`getBoundingClientRect` via JavaScript, que é determinística e não depende da renderização visual do painel — e complementada por capturas quando o painel respondeu (hero, modalidades no mobile, confiança no mobile, footer no mobile, banner de cookies no mobile). Não guardei novos ficheiros `.png` em `docs/qa-v4/`; os dados numéricos de cada verificação estão no `browser-checks.json`. Se quiser um conjunto de capturas `.png` para o repositório, digo já e gero.

## Pendências que continuam por confirmar (não resolvidas nesta rodada, por não serem tarefas técnicas)

- **Rota real de registo com viatura própria:** `site.config.mjs` continua com `ownerDriverRegistrationUrl: null`, pelo que o CTA "Registar-me com a minha viatura" usa o fallback `/motoristas/#veiculo-proprio`. Falta decisão comercial da UrbanGO sobre o fluxo real de registo.
- **Confirmação comercial das modalidades:** a secção mostra três categorias Uber (UberX, Comfort, Black) com fontes oficiais, mas nenhuma foi confirmada como efetivamente compatível com a frota UrbanGO nem foi validada qualquer categoria Bolt — a secção é explicitamente informativa, como já assinalado durante o trabalho do Codex.

## Ficheiros alterados nesta rodada

`assets/locales/en.json`, `build.mjs` (1 linha, aria-label do botão voltar ao topo), `tests.mjs`, `tests-runtime.mjs`, `docs/revisao-v4.md` (novo), `docs/qa-v4/browser-checks.json` (novo). Nenhum outro ficheiro de fonte foi tocado; `dist/` foi regenerado pelo `npm test`.
