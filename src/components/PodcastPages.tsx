import { useMemo, useState } from 'react'
import { CountryTag, Episode, episodes, ThemeTag, YOUTUBE_CHANNEL_URL } from '../data/platformData'
import { Icon } from './Icons'
import { Button, EpisodeCard, Eyebrow, Waveform, YouTubeCoverEmbed } from './Shared'
import { SignupForm } from './SignupForm'

const THEMES: ('Tous' | ThemeTag)[] = [
  'Tous',
  'Diaspora',
  'Hôtellerie',
  'Financement',
  'Juridique',
]

const COUNTRIES: ('Tous' | CountryTag)[] = [
  'Tous',
  'Sénégal',
  'Côte d’Ivoire',
  'Île Maurice',
  'France / Diaspora',
]

export function PodcastCatalogPage({
  onOpenEpisode,
}: {
  onOpenEpisode: (ep: Episode) => void
}) {
  const [query, setQuery] = useState('')
  const [themeFilter, setThemeFilter] = useState<'Tous' | ThemeTag>('Tous')
  const [countryFilter, setCountryFilter] = useState<'Tous' | CountryTag>('Tous')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return episodes.filter((ep) => {
      const matchTheme = themeFilter === 'Tous' || ep.theme === themeFilter
      const matchCountry = countryFilter === 'Tous' || ep.country === countryFilter
      const matchQuery =
        !q ||
        ep.title.toLowerCase().includes(q) ||
        ep.subtitle.toLowerCase().includes(q) ||
        ep.guest.toLowerCase().includes(q) ||
        ep.theme.toLowerCase().includes(q) ||
        ep.country.toLowerCase().includes(q)
      return matchTheme && matchCountry && matchQuery
    })
  }, [query, themeFilter, countryFilter])

  return (
    <main>
      <section className="section section--dark" style={{ paddingBottom: 56 }}>
        <Eyebrow light>Pilier 01 · Catalogue Podcast &amp; Chaîne YouTube</Eyebrow>
        <h1 className="display-serif" style={{ margin: '0 0 16px', fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 0.94 }}>
          Toutes les <em>conversations</em>
        </h1>
        <p style={{ margin: '0 0 22px', maxWidth: 620, color: 'var(--gray-300)', fontSize: 15, lineHeight: 1.65 }}>
          Filtrez par thématique ou par marché pour visionner et écouter les entretiens animés par Mark Saint-Julien.
        </p>
        <a className="btn btn--secondary-light" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
          Chaîne YouTube officielle <Icon name="external" />
        </a>
      </section>

      <section className="section section--paper" style={{ paddingTop: 40 }}>
        <div className="filters-bar">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 460 }}>
              <span
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--gray-500)',
                  pointerEvents: 'none',
                }}
              >
                <Icon name="search" />
              </span>
              <input
                type="search"
                aria-label="Rechercher un épisode ou un invité"
                className="input-control"
                style={{ paddingLeft: 42 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher Salamata, Souadou, Kardiatou, Dakar, Abidjan…"
              />
            </div>

            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-600)' }}>
              {filtered.length} épisode{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="filter-pills">
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray-600)', textTransform: 'uppercase', marginRight: 6 }}>
                Thème :
              </span>
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`filter-pill${themeFilter === t ? ' is-active' : ''}`}
                  onClick={() => setThemeFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="filter-pills">
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray-600)', textTransform: 'uppercase', marginRight: 6 }}>
                Pays :
              </span>
              {COUNTRIES.map((c) => (
                <button
                  key={c}
                  className={`filter-pill${countryFilter === c ? ' is-active' : ''}`}
                  onClick={() => setCountryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
            <h3 className="display-serif" style={{ fontSize: 30, margin: '0 0 10px' }}>
              Aucun épisode ne correspond à cette recherche.
            </h3>
            <p style={{ margin: '0 0 20px', color: 'var(--gray-600)', fontSize: 14 }}>
              Réinitialisez les filtres pour parcourir l’ensemble du catalogue.
            </p>
            <Button
              variant="dark"
              onClick={() => {
                setQuery('')
                setThemeFilter('Tous')
                setCountryFilter('Tous')
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="episode-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {filtered.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onOpen={onOpenEpisode} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function formatSec(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function EpisodeDetailPage({
  episode,
  onBack,
  onOpenEpisode,
  onOpenPrivacy,
}: {
  episode: Episode
  onBack: () => void
  onOpenEpisode: (ep: Episode) => void
  onOpenPrivacy: () => void
}) {
  const [mode, setMode] = useState<'video' | 'audio'>('video')
  const [playing, setPlaying] = useState(false)
  const [currentSec, setCurrentSec] = useState(0)
  const [copied, setCopied] = useState(false)

  const related = episodes.filter((e) => episode.relatedIds.includes(e.id))

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(episode.youtubeUrl).catch(() => {})
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const progressPct = Math.min(100, Math.max(2, Math.round((currentSec / episode.durationSeconds) * 100)))

  return (
    <main>
      <section className="episode-hero">
        <button
          onClick={onBack}
          style={{
            minHeight: 44,
            background: 'transparent',
            border: 0,
            color: 'var(--gray-300)',
            fontSize: 13,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Icon name="arrowLeft" /> Retour au catalogue podcast
        </button>

        <div className="episode-hero__grid">
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span className="badge">{episode.number}</span>
              <span className="badge badge--outline-light">{episode.theme}</span>
              <span className="badge badge--outline-light">{episode.country}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-300)' }}>
                {episode.duration} · {episode.date}
              </span>
            </div>

            <h1>{episode.title}</h1>
            <p style={{ margin: '0 0 26px', color: 'var(--gray-300)', fontSize: 16, lineHeight: 1.65 }}>
              {episode.subtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <Button
                variant="primary"
                icon={mode === 'video' ? 'headphones' : 'video'}
                onClick={() => setMode((m) => (m === 'video' ? 'audio' : 'video'))}
              >
                {mode === 'video' ? 'Mode lecteur audio' : 'Mode vidéo YouTube'}
              </Button>

              <a
                className="btn btn--secondary-light"
                href={episode.youtubeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Voir sur YouTube <Icon name="external" />
              </a>

              <button
                className="icon-btn icon-btn--light"
                onClick={handleShare}
                aria-label="Partager cet épisode"
                title="Copier le lien de l’épisode"
              >
                <Icon name={copied ? 'check' : 'share'} />
              </button>
              {copied && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--white)' }}>
                  Lien YouTube copié !
                </span>
              )}
            </div>
          </div>

          <div>
            {mode === 'video' ? (
              <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--graphite)' }}>
                <YouTubeCoverEmbed
                  key={episode.youtubeId}
                  youtubeId={episode.youtubeId}
                  coverImage={episode.image}
                  title={`${episode.number} | ${episode.guest} : ${episode.title}`}
                  onStartPlay={() => setPlaying(true)}
                />
              </div>
            ) : (
              <div className="hero__portrait-card" style={{ maxHeight: 360 }}>
                <img className="photo-color" src={episode.image} alt={episode.guest} />
              </div>
            )}
          </div>
        </div>

        {/* BARRE LECTEUR AUDIO COMPLET */}
        <div
          style={{
            margin: '0 -5.5vw',
            padding: '16px 5.5vw',
            background: 'var(--charcoal)',
            borderTop: '1px solid var(--graphite)',
            display: 'grid',
            gridTemplateColumns: '48px 54px 1fr 54px',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <button
            className="player-circle"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Lecture'}
          >
            <Icon name={playing ? 'pause' : 'play'} />
          </button>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-300)' }}>
            {formatSec(currentSec)}
          </span>
          <div style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'var(--graphite)' }} />
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: `${progressPct}%`,
                height: 2,
                background: 'var(--white)',
              }}
            />
            <div style={{ width: '100%', opacity: 0.28 }}>
              <Waveform light playing={playing} barsCount={40} />
            </div>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-300)', textAlign: 'right' }}>
            {formatSec(episode.durationSeconds)}
          </span>
        </div>
      </section>

      <section className="section section--paper">
        <div className="episode-detail-grid">
          <aside style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', padding: 24 }}>
            <Eyebrow>L’invité·e</Eyebrow>
            <h3 className="display-serif" style={{ margin: '0 0 6px', fontSize: 28 }}>
              {episode.guest}
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.6, color: 'var(--gray-700)' }}>
              {episode.role}
              <br />
              <strong>{episode.organization}</strong> · {episode.city}
            </p>

            <div style={{ paddingTop: 18, borderTop: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-600)' }}>
                Écouter &amp; regarder sur
              </span>
              <a className="btn btn--secondary btn--full" href={episode.youtubeUrl} target="_blank" rel="noreferrer">
                YouTube <Icon name="external" />
              </a>
              <a className="btn btn--secondary btn--full" href={episode.spotifyUrl} target="_blank" rel="noreferrer">
                Spotify <Icon name="external" />
              </a>
              <a className="btn btn--secondary btn--full" href={episode.appleUrl} target="_blank" rel="noreferrer">
                Apple Podcasts <Icon name="external" />
              </a>
            </div>
          </aside>

          <div>
            <Eyebrow>Résumé de l’épisode</Eyebrow>
            <h2 className="display-serif" style={{ margin: '0 0 18px', fontSize: 'clamp(32px, 3.6vw, 46px)', lineHeight: 1.02 }}>
              Ce que vous allez apprendre dans cet échange.
            </h2>

            {episode.summary.map((p, i) => (
              <p key={i} style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.75, color: 'var(--gray-700)' }}>
                {p}
              </p>
            ))}

            <div style={{ margin: '32px 0', padding: 24, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
              <Eyebrow>Points clés à retenir</Eyebrow>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, lineHeight: 1.6 }}>
                {episode.keyPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow>Chapitres horodatés (cliquez pour caler le lecteur)</Eyebrow>
              <div style={{ borderTop: '1px solid var(--gray-200)' }}>
                {episode.chapters.map((ch) => {
                  const active = currentSec === ch.seconds && playing
                  return (
                    <button
                      key={ch.time}
                      className={`chapter-btn${active ? ' is-active' : ''}`}
                      onClick={() => {
                        setCurrentSec(ch.seconds)
                        setPlaying(true)
                      }}
                    >
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--gray-600)' }}>
                        {ch.time}
                      </span>
                      <strong style={{ fontFamily: 'var(--serif)', fontSize: 21, fontWeight: 600 }}>
                        {ch.title}
                      </strong>
                      <Icon name={active ? 'pause' : 'play'} />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--white" style={{ borderTop: '1px solid var(--gray-200)' }}>
          <Eyebrow>Poursuivre l’écoute</Eyebrow>
          <h2 className="display-serif" style={{ margin: '0 0 28px', fontSize: 38 }}>
            Épisodes liés
          </h2>
          <div className="episode-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {related.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onOpen={onOpenEpisode} />
            ))}
          </div>
        </section>
      )}

      {/* PARCOURS 1 : ÉPISODE -> INSCRIPTION -> CONFIRMATION */}
      <section className="section section--paper" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <SignupForm
          eyebrow="Parcours 1 · Passer de l’écoute à la rencontre"
          title="Vous investissez depuis la diaspora ou sur place ?"
          subtitle="Inscrivez-vous pour être prévenu·e en priorité du prochain événement Immobilier d’Afrique et recevoir nos ressources pratiques."
          defaultProfile="Diaspora"
          onOpenPrivacy={onOpenPrivacy}
        />
      </section>
    </main>
  )
}
