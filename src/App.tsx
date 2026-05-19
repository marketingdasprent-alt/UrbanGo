import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Privacy } from './pages/Privacy'
import { Cookies } from './pages/Cookies'
import { useRoute } from './router'

function App() {
  const route = useRoute()
  const isLegal = route === '/privacidade' || route === '/cookies'

  return (
    <div className={`page ${isLegal ? 'page--legal' : ''}`}>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--blue" aria-hidden="true" />
      <div className="bg-glow bg-glow--green" aria-hidden="true" />

      <Navbar variant={isLegal ? 'page' : 'home'} />

      {route === '/privacidade' && <Privacy />}
      {route === '/cookies' && <Cookies />}
      {route === '/' && <Home />}

      <Footer />
    </div>
  )
}

export default App
