import { navigate, type Route } from '../router'

export function Footer() {
  const goTo = (e: React.MouseEvent, to: Route) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="/" onClick={(e) => goTo(e, '/')} className="brand brand--foot" aria-label="UrbanGo home">
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
                <li><a href="/#sobre" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Sobre</a></li>
                <li><a href="/#frota" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#frota')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Frota</a></li>
                <li><a href="/#como-funciona" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#como-funciona')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Como funciona</a></li>
                <li><a href="/#contacto" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 0) }}>Contacto</a></li>
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
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=R.+do+Mourato+70A+9600-224+Ribeira+Grande"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>
                      R. do Mourato n.º 70A<br />
                      9600-224 Ribeira Grande
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacidade" onClick={(e) => goTo(e, '/privacidade')}>Política de Privacidade</a></li>
                <li><a href="/cookies" onClick={(e) => goTo(e, '/cookies')}>Política de Cookies</a></li>
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
  )
}
