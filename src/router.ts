import { useEffect, useState } from 'react'

export type Route = '/' | '/privacidade' | '/cookies'

function normalize(path: string): Route {
  if (path === '/privacidade' || path === '/privacidade/') return '/privacidade'
  if (path === '/cookies' || path === '/cookies/') return '/cookies'
  return '/'
}

export function navigate(to: Route) {
  if (window.location.pathname !== to) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => normalize(window.location.pathname))

  useEffect(() => {
    const onPop = () => setRoute(normalize(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return route
}
