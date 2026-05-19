export type IconType = 'route' | 'shield' | 'clock' | 'price' | 'city' | 'airport' | 'business'

export function FeatureIcon({ type }: { type: IconType }) {
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
