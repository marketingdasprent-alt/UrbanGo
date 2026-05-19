import { useEffect, useState } from 'react'
import { navigate } from '../router'

export function Navbar({ variant = 'home' }: { variant?: 'home' | 'page' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = (e: React.MouseEvent, hash?: string) => {
    e.preventDefault()
    setMenuOpen(false)
    if (variant === 'home') {
      if (hash) {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate('/')
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      }
    }
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="/" onClick={(e) => goHome(e)} aria-label="UrbanGo home">
        <img src="/UrbanGo.png" alt="" className="logo" />
        <span className="brand-name">UrbanGo</span>
      </a>

      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <a href="/#sobre" onClick={(e) => goHome(e, '#sobre')}>Sobre</a>
        <a href="/#frota" onClick={(e) => goHome(e, '#frota')}>Frota</a>
        <a href="/#como-funciona" onClick={(e) => goHome(e, '#como-funciona')}>Como funciona</a>
        <a href="/#contacto" onClick={(e) => goHome(e, '#contacto')}>Contacto</a>
        <a href="/#contacto" className="nav-cta" onClick={(e) => goHome(e, '#contacto')}>
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
  )
}
