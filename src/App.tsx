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
          <a href="#frota" onClick={() => setMenuOpen(false)}>Frota</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a href="#contacto" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Quero uma viatura
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
            Viaturas TVDE para <br />
            <span className="title-accent">quem quer trabalhar.</span>
          </h1>
          <p className="subtitle">
            A UrbanGo é o novo operador TVDE em Portugal.
            Estamos a preparar uma forma mais rápida, 
            mais próxima e mais segura de circular pela cidade.
          </p>

          <form id="contacto" className="signup" onSubmit={onSubmit}>
            {!submitted ? (
              <>
                <input
                  type="email"
                  placeholder="O seu email ou telemóvel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email ou telemóvel"
                />
                <button type="submit">Quero uma viatura</button>
              </>
            ) : (
              <div className="signup-success">
                Recebemos o seu contacto. Falamos consigo em breve.
              </div>
            )}
          </form>
        </section>

        <section id="sobre" className="section">
          <div className="section-grid">
            <div>
              <p className="eyebrow">Sobre nós</p>
              <h2 className="section-title">
                Uma operadora TVDE feita por quem conhece a estrada.
              </h2>
            </div>
            <div className="section-body">
              <p>
                A UrbanGo é uma operadora TVDE licenciada que disponibiliza
                viaturas a motoristas profissionais em Portugal. Trabalhamos
                como ponte entre o motorista e as principais plataformas do
                mercado — Uber e Bolt — para que se concentre apenas no que
                faz melhor: conduzir.
              </p>
              <p>
                Cuidamos da viatura, dos seguros, das inspeções e da gestão
                administrativa. O motorista escolhe o slot que melhor se
                ajusta à sua disponibilidade e começa a trabalhar.
              </p>
            </div>
          </div>
        </section>

        <section id="frota" className="section section--alt">
          <p className="eyebrow center">Frota</p>
          <h2 className="section-title center">Viaturas prontas a trabalhar</h2>
          <ul className="cards">
            <li className="card">
              <FeatureIcon type="city" />
              <h3>Viaturas elegíveis</h3>
              <p>Modelos aprovados pela Uber e Bolt, recentes, com baixa quilometragem e em ótimo estado.</p>
            </li>
            <li className="card">
              <FeatureIcon type="shield" />
              <h3>Tudo incluído</h3>
              <p>Seguro, manutenção, IUC, inspeção e assistência em viagem — sem custos surpresa.</p>
            </li>
            <li className="card">
              <FeatureIcon type="business" />
              <h3>Slots flexíveis</h3>
              <p>Turnos diurnos, noturnos ou 24h. Adapte-se ao seu ritmo e ao que dá mais retorno.</p>
            </li>
          </ul>
        </section>

        <section id="como-funciona" className="section">
          <p className="eyebrow center">Como funciona</p>
          <h2 className="section-title center">Comece em 3 passos</h2>
          <ul className="features">
            <li>
              <FeatureIcon type="route" />
              <div>
                <h3>1. Candidate-se</h3>
                <p>Envie os seus dados e certificado TVDE. Validamos a sua candidatura em 24h.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="business" />
              <div>
                <h3>2. Escolha o seu slot</h3>
                <p>Selecione a viatura e o turno que melhor se ajustam ao seu objetivo de rendimento.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="price" />
              <div>
                <h3>3. Comece a faturar</h3>
                <p>Levante a viatura, ligue-se à Uber/Bolt e comece já no mesmo dia a trabalhar.</p>
              </div>
            </li>
            <li>
              <FeatureIcon type="clock" />
              <div>
                <h3>Apoio sempre</h3>
                <p>Equipa disponível 7 dias por semana para qualquer dúvida ou imprevisto.</p>
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
                Operadora TVDE em Portugal. <br />
                Viaturas para motoristas Uber e Bolt.
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
                  <li><a href="#frota">Frota</a></li>
                  <li><a href="#como-funciona">Como funciona</a></li>
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
