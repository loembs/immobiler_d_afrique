import { ReactNode } from 'react'

export type IconName =
  | 'arrow'
  | 'arrowLeft'
  | 'calendar'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'external'
  | 'fileText'
  | 'filter'
  | 'headphones'
  | 'image'
  | 'mail'
  | 'mapPin'
  | 'menu'
  | 'monitor'
  | 'pause'
  | 'phone'
  | 'play'
  | 'search'
  | 'share'
  | 'shield'
  | 'smartphone'
  | 'video'

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14M14 6l6 6-6 6" />,
    arrowLeft: <path d="M19 12H5M10 18l-6-6 6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="M10 14 19 5" />
        <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
      </>
    ),
    fileText: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14a2 2 0 0 1 2-2h2v8H6a2 2 0 0 1-2-2v-4ZM20 14a2 2 0 0 0-2-2h-2v8h2a2 2 0 0 0 2-2v-4Z" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="m21 16-5-5-4 4-2-2-7 6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    mapPin: (
      <>
        <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.2" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
    pause: <path d="M9 7v10M15 7v10" />,
    phone: (
      <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
    ),
    play: <path d="m8 6 10 6-10 6V6Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.2" />
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="18" cy="19" r="2.2" />
        <path d="m8 11 8-5M8 13l8 5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.6 3 8.1 7 9 4-.9 7-4.4 7-9V6l-7-3Z" />
        <path d="m9.5 12 2 2 3.5-4" />
      </>
    ),
    smartphone: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3v-4Z" />
      </>
    ),
  }

  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
