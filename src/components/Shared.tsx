import { CSSProperties, ReactNode, useState } from 'react'
import { Episode, LOGO_URL, PastEvent, YOUTUBE_CHANNEL_URL } from '../data/platformData'
import { Icon, IconName } from './Icons'

export type RouteKey =
  | 'home'
  | 'podcast'
  | 'episode'
  | 'events'
  | 'event-detail'
  | 'next-event'
  | 'system'

export function BrandLogo({ showWordmark = true }: { showWordmark?: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <span className="inline-flex items-center gap-3">
      <span className="brand-logo-plain">
        {!imgError ? (
          <img
            src={LOGO_URL}
            alt="Logo Immobilier d’Afrique"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 700,
              fontSize: 17,
              color: 'var(--white)',
              letterSpacing: '-0.03em',
            }}
          >
            IMMOBILIER D’AFRIQUE
          </span>
        )}
      </span>
      {showWordmark && (
        <span className="brand-wordmark">
          <strong>Immobilier d’Afrique</strong>
          <span>Podcast &amp; Média</span>
        </span>
      )}
    </span>
  )
}

export function YouTubeCoverEmbed({
  youtubeId,
  coverImage,
  title,
  autoplay = false,
  onStartPlay,
}: {
  youtubeId: string
  coverImage?: string
  title: string
  autoplay?: boolean
  onStartPlay?: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [imgSrc, setImgSrc] = useState(
    coverImage || `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  )

  return (
    <div className="yt-cover-frame">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="yt-cover-btn"
          onClick={() => {
            setIsPlaying(true)
            onStartPlay?.()
          }}
          aria-label={`Lire la vidéo YouTube : ${title}`}
        >
          <img
            className="photo-color"
            src={imgSrc}
            alt={title}
            loading="lazy"
            onError={() => {
              const fallback = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
              if (imgSrc !== fallback) setImgSrc(fallback)
            }}
          />
          <span className="yt-play-pill" aria-hidden="true">
            <Icon name="play" />
          </span>
        </button>
      )}
    </div>
  )
}

export function Waveform({
  light = false,
  playing = false,
  barsCount = 24,
}: {
  light?: boolean
  playing?: boolean
  barsCount?: number
}) {
  const pattern = [10, 22, 14, 34, 46, 26, 38, 48, 30, 42, 18, 34, 46, 24, 36, 16, 28, 12, 22, 10]
  const bars = Array.from({ length: barsCount }, (_, i) => pattern[i % pattern.length])

  return (
    <div
      className={`waveform${light ? ' waveform--light' : ''}${playing ? ' waveform--playing' : ''}`}
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <i key={index} style={{ '--bar': `${height}px` } as CSSProperties} />
      ))}
    </div>
  )
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{children}</p>
}

export function Button({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  onClick,
  type = 'button',
  full = false,
  disabled = false,
  className = '',
}: {
  children: ReactNode
  variant?: 'primary' | 'dark' | 'secondary' | 'secondary-light' | 'ghost'
  icon?: IconName
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit'
  full?: boolean
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn--${variant}${full ? ' btn--full' : ''} ${className}`.trim()}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} />}
    </button>
  )
}

export function Header({
  route,
  lang,
  onToggleLang,
  onNavigate,
  onNotify,
}: {
  route: RouteKey
  lang: 'FR' | 'EN'
  onToggleLang: () => void
  onNavigate: (r: RouteKey) => void
  onNotify: () => void
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navItems: { key: RouteKey; label: string }[] = [
    { key: 'home', label: 'Accueil' },
    { key: 'podcast', label: 'Podcast' },
    { key: 'events', label: 'Événements passés' },
    { key: 'next-event', label: 'Prochain événement' },
    { key: 'system', label: 'Maquette & Synthèse' },
  ]

  const isNavActive = (key: RouteKey) =>
    route === key ||
    (key === 'podcast' && route === 'episode') ||
    (key === 'events' && route === 'event-detail')

  return (
    <>
      <header className="site-header">
        <button
          className="brand-lockup"
          onClick={() => onNavigate('home')}
          aria-label="Immobilier d’Afrique : Retour à l’accueil"
        >
          <BrandLogo />
        </button>

        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`main-nav__btn${isNavActive(item.key) ? ' main-nav__btn--active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="lang-toggle"
            onClick={onToggleLang}
            aria-label="Basculer de langue FR / EN"
            title="Préparé pour la version anglaise"
          >
            <span>{lang}</span>
            <Icon name="chevron" />
          </button>
          <Button variant="primary" onClick={onNotify}>
            Être informé·e
          </Button>
          <button
            className="menu-trigger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Ouvrir le menu mobile"
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {lang === 'EN' && (
        <div className="lang-notice" role="status">
          <span>
            <strong>EN preview ready :</strong> L’interface est conçue pour accueillir la version anglaise (navigation, balises <code style={{ fontFamily: 'var(--mono)' }}>hreflang</code> et formulaires localisés). Contenu actuel affiché en français selon le périmètre MVP.
          </span>
          <button
            className="studio-pill studio-pill--active"
            onClick={onToggleLang}
            style={{ minHeight: 28 }}
          >
            Revenir en FR
          </button>
        </div>
      )}

      {drawerOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Menu mobile">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <BrandLogo showWordmark={false} />
            <button
              className="icon-btn icon-btn--light"
              onClick={() => setDrawerOpen(false)}
              aria-label="Fermer le menu"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav className="mobile-drawer__nav" aria-label="Menu mobile principal">
            {navItems.map((item, idx) => (
              <button
                key={item.key}
                className="mobile-drawer__link"
                onClick={() => {
                  setDrawerOpen(false)
                  onNavigate(item.key)
                }}
              >
                <span>0{idx + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Langue du site</span>
              <button className="lang-toggle" onClick={onToggleLang}>
                {lang} <Icon name="chevron" />
              </button>
            </div>
            <Button
              variant="primary"
              full
              icon="arrow"
              onClick={() => {
                setDrawerOpen(false)
                onNotify()
              }}
            >
              Être informé·e du prochain événement
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export function EpisodeCard({
  episode,
  onOpen,
}: {
  episode: Episode
  onOpen: (ep: Episode) => void
}) {
  return (
    <article className="episode-card">
      <div className="episode-card__media">
        <YouTubeCoverEmbed
          youtubeId={episode.youtubeId}
          coverImage={episode.image}
          title={`${episode.number} | ${episode.guest} : ${episode.title}`}
        />
        {episode.isExample && <span className="example-tag">Exemple</span>}
      </div>

      <div className="episode-card__body">
        <div className="episode-card__meta">
          <span className="badge badge--dark">{episode.number}</span>
          <span className="badge">{episode.theme}</span>
          <span>{episode.duration}</span>
        </div>

        <h3 className="episode-card__title">
          <button
            type="button"
            onClick={() => onOpen(episode)}
            style={{
              background: 'transparent',
              border: 0,
              padding: 0,
              textAlign: 'left',
              color: 'inherit',
              font: 'inherit',
              cursor: 'pointer',
            }}
          >
            {episode.title}
          </button>
        </h3>

        <div className="episode-card__footer">
          <div className="episode-card__guest">
            {episode.guest}
            <span>{episode.country}</span>
          </div>
          <button
            type="button"
            className="voir-plus-link"
            onClick={() => onOpen(episode)}
          >
            <span>Voir plus</span>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  )
}

export function EventCard({
  event,
  onOpen,
}: {
  event: PastEvent
  onOpen: (ev: PastEvent) => void
}) {
  return (
    <article className="event-card-row">
      <div className="event-card-row__media">
        <img
          className="photo-bw"
          src={event.heroImage}
          alt={`${event.edition} à ${event.city}`}
          loading="lazy"
        />
        {event.isExample && <span className="example-tag">Exemple</span>}
        <span className="event-card-row__year">{event.year}</span>
      </div>

      <div className="event-card-row__body">
        <div>
          <div className="event-card-row__meta">
            <span>{event.edition}</span>
            <span>• {event.city}</span>
            <span>• {event.dateLabel}</span>
            <span>• {event.participants}</span>
          </div>
          <h3>{event.headline}</h3>
          <p>{event.theme}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-600)' }}>
            {event.venue}
          </span>
          <Button variant="secondary" icon="arrow" onClick={() => onOpen(event)}>
            Voir l’édition &amp; replays
          </Button>
        </div>
      </div>
    </article>
  )
}

export function Footer({
  lang,
  onToggleLang,
  onNavigate,
  onOpenPrivacy,
  onRequestPartner,
}: {
  lang: 'FR' | 'EN'
  onToggleLang: () => void
  onNavigate: (r: RouteKey) => void
  onOpenPrivacy: () => void
  onRequestPartner: () => void
}) {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grid">
        <div>
          <BrandLogo />
          <p style={{ marginTop: 22, maxWidth: 340, color: 'var(--gray-300)', fontSize: 13, lineHeight: 1.7 }}>
            Le podcast animé par Mark Saint-Julien et la plateforme média dédiés à celles et ceux qui financent, construisent et investissent dans l’immobilier africain.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <Button variant="secondary-light" icon="fileText" onClick={onRequestPartner}>
              Devenir sponsor / partenaire
            </Button>
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Plateforme</h4>
            <ul>
              <li><button onClick={() => onNavigate('home')}>Accueil</button></li>
              <li><button onClick={() => onNavigate('podcast')}>Tous les épisodes</button></li>
              <li><button onClick={() => onNavigate('events')}>Événements passés</button></li>
              <li><button onClick={() => onNavigate('next-event')}>Prochaine édition</button></li>
              <li><button onClick={() => onNavigate('system')}>Maquette &amp; Synthèse</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Réseaux sociaux</h4>
            <ul>
              <li><a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">YouTube <Icon name="external" /></a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Icon name="external" /></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Icon name="external" /></a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok <Icon name="external" /></a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact &amp; Partenariats</h4>
            <ul>
              <li>
                <a href="https://wa.me/221770000000" target="_blank" rel="noreferrer">
                  <Icon name="phone" /> WhatsApp Direct
                </a>
              </li>
              <li>
                <a href="mailto:bonjour@immobilierdafrique.com">
                  <Icon name="mail" /> bonjour@immobilierdafrique.com
                </a>
              </li>
              <li>
                <button onClick={onRequestPartner}>
                  <Icon name="fileText" /> Demander le dossier partenaire
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy}>
                  <Icon name="shield" /> Politique de confidentialité
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Immobilier d’Afrique · Mark Saint-Julien · Plateforme Média &amp; Masterclass.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <button
            onClick={onOpenPrivacy}
            style={{ background: 'transparent', border: 0, color: 'var(--gray-300)', cursor: 'pointer', textDecoration: 'underline', fontSize: 12 }}
          >
            Loi sénégalaise n° 2008-12 &amp; RGPD
          </button>
          <button
            onClick={onToggleLang}
            style={{ background: 'transparent', border: '1px solid var(--graphite)', borderRadius: 999, padding: '4px 10px', color: 'var(--white)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11 }}
          >
            {lang === 'FR' ? 'FR (actif) / EN (bientôt)' : 'EN (aperçu) / FR'}
          </button>
        </div>
      </div>
    </footer>
  )
}

export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Politique de confidentialité"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        background: 'rgba(10, 10, 11, 0.72)',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--white)',
          color: 'var(--ink)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: 640,
          width: '100%',
          padding: 32,
          border: '1px solid var(--ink)',
          boxShadow: 'var(--shadow)',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <Eyebrow>Protection des données</Eyebrow>
            <h2 className="display-serif" style={{ margin: 0, fontSize: 34 }}>
              Politique de confidentialité
            </h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Fermer">
            <Icon name="close" />
          </button>
        </div>

        <div style={{ marginTop: 20, fontSize: 13, lineHeight: 1.7, color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ margin: 0 }}>
            <strong>1. Finalité de la collecte :</strong> Les informations saisies (nom, e-mail, WhatsApp facultatif, pays, profil) servent exclusivement à vous avertir des prochaines éditions d’Immobilier d’Afrique, vous envoyer les nouveaux épisodes du podcast ou le dossier partenaire si vous le demandez.
          </p>
          <p style={{ margin: 0 }}>
            <strong>2. Cadre légal applicable (Sénégal &amp; Diaspora) :</strong> Le traitement est conforme à la <strong>Loi sénégalaise n° 2008-12 du 25 janvier 2008</strong> relative à la protection des données à caractère personnel (Commission des Données Personnelles, CDP) ainsi qu’au <strong>Règlement Général sur la Protection des Données (RGPD, UE 2016/679)</strong> pour les résidents de l’Espace Économique Européen.
          </p>
          <p style={{ margin: 0 }}>
            <strong>3. Double Opt-In &amp; durée de conservation :</strong> Toute inscription est confirmée par un e-mail de validation (double opt-in). Vos données ne sont jamais revendues ni cédées à des tiers et sont conservées au maximum 3 ans après le dernier contact actif.
          </p>
          <p style={{ margin: 0 }}>
            <strong>4. Vos droits :</strong> Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment via le lien de désinscription présent dans chaque e-mail ou en écrivant à{' '}
            <strong>bonjour@immobilierdafrique.com</strong>.
          </p>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="dark" onClick={onClose}>
            J’ai compris
          </Button>
        </div>
      </div>
    </div>
  )
}
