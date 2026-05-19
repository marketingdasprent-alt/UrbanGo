import { navigate } from '../router'

export function Cookies() {
  const updated = '19 de maio de 2026'

  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault()
    const w = window as unknown as { CookieScript?: { instance?: { show?: () => void } } }
    if (w.CookieScript?.instance?.show) {
      w.CookieScript.instance.show()
    }
  }

  return (
    <main>
      <section className="legal-hero">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Início</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Cookies</span>
        </nav>
        <p className="eyebrow center">Documento legal</p>
        <h1 className="title legal-title">
          Política de <span className="title-accent">Cookies</span>
        </h1>
        <p className="subtitle legal-subtitle">
          Como utilizamos cookies e tecnologias semelhantes no site da UrbanGo,
          e como pode controlar a sua utilização.
        </p>
        <p className="legal-updated">Última atualização: {updated}</p>
      </section>

      <section className="section legal">
        <article className="legal-content">
          <h2>1. O que são cookies</h2>
          <p>
            Cookies são pequenos ficheiros de texto que os sites colocam no seu
            dispositivo enquanto navega. Servem para que o site funcione
            corretamente, se lembre das suas preferências e nos ajudem a
            perceber como pode ser melhorado.
          </p>

          <h2>2. Tipos de cookies que utilizamos</h2>

          <div className="cookie-table">
            <div className="cookie-row cookie-row--head">
              <div>Categoria</div>
              <div>Finalidade</div>
              <div>Consentimento</div>
            </div>
            <div className="cookie-row">
              <div><strong>Estritamente necessários</strong></div>
              <div>Garantem o funcionamento básico do site (sessão, segurança, preferências de cookies).</div>
              <div><span className="badge badge--green">Não exigido</span></div>
            </div>
            <div className="cookie-row">
              <div><strong>Preferências</strong></div>
              <div>Memorizam escolhas do utilizador, como idioma ou tema.</div>
              <div><span className="badge">Exigido</span></div>
            </div>
            <div className="cookie-row">
              <div><strong>Estatísticos</strong></div>
              <div>Permitem-nos medir o desempenho do site de forma agregada e anónima.</div>
              <div><span className="badge">Exigido</span></div>
            </div>
            <div className="cookie-row">
              <div><strong>Marketing</strong></div>
              <div>Utilizados para mostrar conteúdos e campanhas mais relevantes.</div>
              <div><span className="badge">Exigido</span></div>
            </div>
          </div>

          <h2>3. Cookies de terceiros</h2>
          <p>
            Algumas funcionalidades do site recorrem a serviços de terceiros que
            podem instalar os seus próprios cookies — designadamente para
            análise de tráfego, fontes tipográficas e plataformas de redes
            sociais. Esses cookies regem-se pelas políticas de privacidade dos
            respetivos fornecedores.
          </p>

          <h2>4. Gestão de cookies</h2>
          <p>
            A qualquer momento pode rever ou alterar o seu consentimento através
            do painel de definições de cookies disponível no nosso site.
          </p>

          <div className="legal-cta">
            <p>Quer ajustar agora as suas preferências de cookies?</p>
            <a
              href="#"
              onClick={openCookieSettings}
              className="legal-cta-btn"
            >
              Abrir definições de cookies
            </a>
          </div>

          <p>
            Em alternativa, pode bloquear ou apagar cookies diretamente nas
            definições do seu navegador. Note que, ao fazê-lo, algumas
            funcionalidades do site podem deixar de funcionar corretamente.
          </p>

          <h2>5. Mais informação</h2>
          <p>
            Para mais detalhes sobre o tratamento de dados pessoais, consulte a
            nossa{' '}
            <a href="/privacidade" onClick={(e) => { e.preventDefault(); navigate('/privacidade') }}>
              Política de Privacidade
            </a>.
          </p>
          <p>
            Para qualquer questão adicional, contacte-nos por email para{' '}
            <a href="mailto:geral@urbango.pt">geral@urbango.pt</a>.
          </p>
        </article>
      </section>
    </main>
  )
}
