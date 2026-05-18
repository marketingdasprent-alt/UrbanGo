import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="page">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--blue" aria-hidden="true" />
      <div className="bg-glow bg-glow--green" aria-hidden="true" />

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="UrbanGo home">
          <img src="/UrbanGo.png" alt="" className="logo" />
          <span className="brand-name">UrbanGo</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#porque" onClick={() => setMenuOpen(false)}>Porquê UrbanGo</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a href="#contacto" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Avisem-me
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      <main>
        <section id="top" className="hero">
          <span className="status-pill">
            <span className="status-dot" /> Site em construção
          </span>

          <h1 className="title">
            A sua próxima viagem <br />
            <span className="title-accent">começa em breve.</span>
          </h1>
          <p className="subtitle">
            A UrbanGo é o novo operador TVDE em Portugal. Estamos a preparar
            uma forma mais rápida, mais próxima e mais segura de circular
            pela cidade.
          </p>

          <form id="contacto" className="signup" onSubmit={onSubmit}>
            {!submitted ? (
              <>
                <input
                  type="email"
                  placeholder="O seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
                <button type="submit">Avisem-me no lançamento</button>
              </>
            ) : (
              <div className="signup-success">
                Obrigado! Falamos consigo assim que estivermos prontos.
              </div>
            )}
          </form>
        </section>

        <section id="sobre" className="section">
          <div className="section-grid">
            <div>
              <p className="eyebrow">Sobre nós</p>
              <h2 className="section-title">
                Mobilidade urbana, feita para quem vive a cidade.
              </h2>
            </div>
            <div className="section-body">
              <p>
                A UrbanGo nasce com uma missão simples: tornar cada viagem
                mais rápida, mais previsível e mais humana. Combinamos
                tecnologia, motoristas certificados e um cuidado real com
                quem viaja connosco.
              </p>
              <p>
                Operamos como TVDE devidamente licenciado, com foco em
                qualidade de serviço, transparência de preços e disponibilidade
                permanente — onde estiver, à hora que precisar.
              </p>
            </div>
          </div>
        </section>

        <section id="servicos" className="section section--alt">
          <p className="eyebrow center">Serviços</p>
          <h2 className="section-title center">O que vamos oferecer</h2>
          <ul className="cards">
            <li className="card">
              <FeatureIcon type="city" />
              <h3>Viagens urbanas</h3>
              <p>Deslocações rápidas dentro da cidade, com preço justo e tempo de espera reduzido.</p>
            </li>
            <li className="card">
              <FeatureIcon type="airport" />
              <h3>Aeroporto</h3>
              <p>Transferes pontuais de e para o aeroporto, com acompanhamento de voo.</p>
            </li>
            <li className="card">
              <FeatureIcon type="business" />
              <h3>Empresas</h3>
              <p>Contas empresariais com faturação simplificada e relatórios de utilização.</p>
            </li>
          </ul>
        </section>

        <section id="porque" className="section">
          <p className="eyebrow center"><span className="keep-case">Porquê UrbanGo</span></p>
          <h2 className="section-title center">Pensado para si</h2>
          <ul className="features">
            <li>
              <FeatureIcon type="route" />
              <div>
                <h3>Rotas inteligentes</h3>
                <p>Chegue mais depressa, sem desvios desnecessários.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="shield" />
              <div>
                <h3>Motoristas certificados</h3>
                <p>Profissionais autorizados e viagens 100% seguras.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="clock" />
              <div>
                <h3>Disponível 24/7</h3>
                <p>Onde estiver, a qualquer hora, em qualquer dia.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="price" />
              <div>
                <h3>Preço transparente</h3>
                <p>Sabe quanto vai pagar antes de começar a viagem.</p>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-inner">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#top" className="brand brand--foot" aria-label="UrbanGo home">
                <img src="/UrbanGo.png" alt="" className="logo logo--foot" />
                <span className="brand-name">UrbanGo</span>
              </a>
              <p className="foot-tag">
                Operador TVDE em Portugal. <br />
                A sua viagem, com a UrbanGo.
              </p>
              <div className="socials">
                <a href="#" aria-label="Instagram" className="social">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="social">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-7h2.5l.5-3h-3V9c0-1 .3-1.5 1.5-1.5H16.5V5c-.3 0-1.3-.2-2.3-.2-2.3 0-3.7 1.4-3.7 3.9V11H8v3h2.5v7h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="social">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.5 9.5h3v11h-3v-11zM9 9.5h2.9v1.5h.04c.4-.76 1.4-1.56 2.86-1.56 3.06 0 3.6 2 3.6 4.6v6.46h-3v-5.73c0-1.37-.03-3.13-1.9-3.13s-2.2 1.5-2.2 3v5.86H9V9.5z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="foot-cols">
              <div>
                <h4>Navegação</h4>
                <ul>
                  <li><a href="#sobre">Sobre</a></li>
                  <li><a href="#servicos">Serviços</a></li>
                  <li><a href="#porque">Porquê UrbanGo</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h4>Contacto</h4>
                <ul className="foot-contact">
                  <li>
                    <a href="mailto:geral@urbango.pt">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                      geral@urbango.pt
                    </a>
                  </li>
                  <li>
                    <a href="tel:+351000000000">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                      </svg>
                      +351 000 000 000
                    </a>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    Lisboa, Portugal
                  </li>
                </ul>
              </div>
              <div>
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Termos & Condições</a></li>
                  <li><a href="#">Política de Privacidade</a></li>
                  <li><a href="#">Livro de Reclamações</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="foot-bottom">
            <p>© {new Date().getFullYear()} UrbanGo. Todos os direitos reservados.</p>
            <p className="foot-cert">Operador TVDE licenciado pelo IMT</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

type IconType = 'route' | 'shield' | 'clock' | 'price' | 'city' | 'airport' | 'business'

function FeatureIcon({ type }: { type: IconType }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (type) {
    case 'route':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="6" cy="19" r="2.5" />
          <circle cx="18" cy="5" r="2.5" />
          <path d="M8.5 19H14a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h5.5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'price':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 12l-8 8-8-8 8-8h8z" />
          <circle cx="14" cy="10" r="1.3" />
        </svg>
      )
    case 'city':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 21V9l6-4 6 4v12" />
          <path d="M15 21V13h6v8" />
          <path d="M9 12v.01M9 16v.01M9 20v.01" />
        </svg>
      )
    case 'airport':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 13l20-7-7 20-3-8-10-5z" />
        </svg>
      )
    case 'business':
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </svg>
      )
  }
}

export default App
