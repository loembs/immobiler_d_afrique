import { useRef, useState } from 'react'
import {
  Episode,
  episodes,
  featuredGuests,
  HERO_BANNER_URL,
  hostProfile,
  PastEvent,
  pastEvents,
} from '../data/platformData'
import { Icon } from './Icons'
import { Button, EpisodeCard, EventCard, Eyebrow, RouteKey, Waveform, YouTubeCoverEmbed } from './Shared'
import { SignupForm, UserProfileType } from './SignupForm'

export function HomePage({
  eventBannerState,
  onOpenEpisode,
  onOpenEvent,
  onNavigate,
  onNotify,
  onOpenPrivacy,
}: {
  eventBannerState: 'A' | 'B'
  onOpenEpisode: (ep: Episode) => void
  onOpenEvent: (ev: PastEvent) => void
  onNavigate: (r: RouteKey) => void
  onNotify: (profile?: UserProfileType) => void
  onOpenPrivacy: () => void
}) {
  const [playing, setPlaying] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const latest = episodes[0]

  const scrollCarousel = (dir: -1 | 1) => {
    const el = carouselRef.current
    if (!el) return
    el.scrollBy({ left: dir * 380, behavior: 'smooth' })
  }

  return (
    <main id="accueil">
      {/* 1. HERO AVEC BANNIÈRE EN ARRIÈRE-PLAN + VIDÉO EN COVER À DROITE */}
      <section className="hero">
        <div className="hero__bg-banner" aria-hidden="true">
          <img src={HERO_BANNER_URL} alt="" />
        </div>
        <div className="hero__wave-bg">
          <Waveform light barsCount={36} />
        </div>

        <div className="hero__grid">
          <div>
            <Eyebrow light>Podcast &amp; Plateforme Média</Eyebrow>
            <h1 className="display-serif">
              Comprendre.
              <br />
              <em>Financer.</em> Bâtir.
            </h1>
            <p className="hero__lede">
              La voix de celles et ceux qui financent, construisent et investissent dans l’immobilier africain : hôteliers, banquiers, notaires, promoteurs et investisseurs.
            </p>
            <div className="hero__cta-row">
              <Button variant="primary" icon="headphones" onClick={() => onOpenEpisode(latest)}>
                Écouter le dernier épisode
              </Button>
              <Button
                variant="secondary-light"
                icon="arrow"
                onClick={() => onNavigate('next-event')}
              >
                Prochain événement
              </Button>
            </div>
          </div>

          {/* VIDÉO À DROITE EN COVER + EMBED YOUTUBE */}
          <div className="hero-video-panel">
            <YouTubeCoverEmbed
              youtubeId={latest.youtubeId}
              coverImage={latest.image}
              title={`${latest.number} | ${latest.guest} : ${latest.title}`}
              onStartPlay={() => setPlaying(true)}
            />
            <div className="hero-video-panel__meta">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <span className="badge">{latest.number}</span>
                <span className="badge badge--outline-light">{latest.theme}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-300)' }}>
                  {latest.duration}
                </span>
              </div>
              <strong style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.15 }}>
                {latest.guest} : {latest.title}
              </strong>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--gray-300)' }}>
                  Cliquez sur la cover pour lancer la vidéo YouTube
                </span>
                <Button variant="secondary-light" icon="arrow" onClick={() => onOpenEpisode(latest)}>
                  Fiche &amp; chapitres
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mini-player">
          <button
            className="player-circle"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Mettre en pause le dernier épisode' : 'Lire le dernier épisode'}
          >
            <Icon name={playing ? 'pause' : 'play'} />
          </button>

          <button className="mini-player__info" onClick={() => onOpenEpisode(latest)}>
            <span>À la une · {latest.number}</span>
            <strong>{latest.title}</strong>
            <small>
              Avec {latest.guest} · {latest.duration}
            </small>
          </button>

          <div className="mini-player__wave">
            <Waveform light playing={playing} barsCount={32} />
          </div>

          <span className="mini-player__time">
            {playing ? '08:14' : '00:00'} / 46:00
          </span>
        </div>
      </section>

      {/* 2. BANDEAU PROCHAIN ÉVÉNEMENT : CONCIS (DATE, VILLE, CTA) */}
      <section className="event-banner" aria-label="Prochain événement">
        <div className="event-banner__stamp">
          <span>{eventBannerState === 'A' ? 'Dakar' : 'Pullman Dakar'}</span>
          <strong>{eventBannerState === 'A' ? 'Bientôt annoncé' : '17 avr. 2027'}</strong>
        </div>

        <div className="event-banner__copy">
          <span className="event-banner__kicker">Prochain événement</span>
          <h2>
            {eventBannerState === 'A'
              ? 'Masterclass Immobilier d’Afrique : Prochaine édition'
              : 'Masterclass Immobilier d’Afrique (3e Édition)'}
          </h2>
        </div>

        <div className="event-banner__actions">
          <Button
            variant="dark"
            icon="arrow"
            onClick={() =>
              eventBannerState === 'A' ? onNotify() : onNavigate('next-event')
            }
          >
            {eventBannerState === 'A' ? 'Être informé·e' : 'Programme & billets'}
          </Button>
        </div>
      </section>

      {/* 3. DERNIERS ÉPISODES DU PODCAST EN CARROUSEL */}
      <section className="section section--paper">
        <div className="section-header">
          <div>
            <Eyebrow>Pilier 01 · Écouter &amp; Voir</Eyebrow>
            <h2 className="display-serif">
              Les derniers <em>épisodes</em>
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="icon-btn"
              onClick={() => scrollCarousel(-1)}
              aria-label="Épisodes précédents"
            >
              <Icon name="arrowLeft" />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => scrollCarousel(1)}
              aria-label="Épisodes suivants"
            >
              <Icon name="arrow" />
            </button>
            <Button variant="secondary" icon="arrow" onClick={() => onNavigate('podcast')}>
              Tout voir ({episodes.length})
            </Button>
          </div>
        </div>

        <div className="episode-carousel" ref={carouselRef}>
          {episodes.map((ep) => (
            <div className="episode-carousel__item" key={ep.id}>
              <EpisodeCard episode={ep} onOpen={onOpenEpisode} />
            </div>
          ))}
        </div>
      </section>

      {/* MOTIF ONDE SONORE */}
      <div className="wave-divider">
        <Waveform barsCount={44} />
      </div>

      {/* 4. DERRIÈRE LA VOIX : MARK SAINT-JULIEN */}
      <section className="section host-section" id="derriere-la-voix">
        <div className="host-grid">
          <div className="host-visual">
            <img
              className="host-visual__img"
              src={hostProfile.photoImage}
              alt="Mark Saint-Julien, fondateur et animateur d’Immobilier d’Afrique"
              loading="lazy"
            />
            <div className="host-visual__content">
              <Eyebrow light>{hostProfile.eyebrow}</Eyebrow>
              <h2 className="display-serif" style={{ margin: '0 0 6px', fontSize: 42, lineHeight: 0.96 }}>
                {hostProfile.name}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--gray-300)' }}>
                {hostProfile.role} · {hostProfile.city}
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>{hostProfile.eyebrow}</Eyebrow>
            <h2 className="display-serif" style={{ margin: '0 0 18px', fontSize: 'clamp(36px, 3.8vw, 52px)', lineHeight: 0.96 }}>
              Une voix de terrain entre <em>hôtellerie</em> et immobilier africain.
            </h2>
            <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', fontWeight: 500 }}>
              {hostProfile.bio}
            </p>
            <p style={{ margin: '0 0 28px', fontSize: 14, lineHeight: 1.7, color: 'var(--gray-700)' }}>
              {hostProfile.details}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                className="btn btn--dark"
                href={hostProfile.channelUrl}
                target="_blank"
                rel="noreferrer"
              >
                Découvrir la chaîne YouTube <Icon name="external" />
              </a>
              <Button variant="secondary" icon="arrow" onClick={() => onNavigate('podcast')}>
                Explorer les interviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APERÇU DES ÉVÉNEMENTS PASSÉS */}
      <section className="section section--white">
        <div className="archive-split">
          <div className="archive-split__sticky">
            <Eyebrow>Pilier 02 · Se souvenir</Eyebrow>
            <h2 className="display-serif">
              Des éditions qui restent <em>accessibles.</em>
            </h2>
            <p>
              Contrairement à un site événementiel éphémère, chaque Masterclass conserve son programme réel, ses replays, ses photos et ses chiffres clés pour les participant·es, les absents et les futurs sponsors.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="dark" icon="arrow" onClick={() => onNavigate('events')}>
                Explorer les éditions passées
              </Button>
              <Button
                variant="secondary"
                icon="fileText"
                onClick={() => onNotify('Partenaire / Sponsor')}
              >
                Dossier sponsor
              </Button>
            </div>
          </div>

          <div className="event-cards-stack">
            {pastEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} onOpen={onOpenEvent} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. INVITÉS & PANÉLISTES MARQUANTS */}
      <section className="section section--dark">
        <div className="section-header section-header--dark">
          <div>
            <Eyebrow light>Voix du continent</Eyebrow>
            <h2 className="display-serif" style={{ color: 'var(--white)' }}>
              Invités &amp; <em>panélistes</em> marquants
            </h2>
          </div>
          <p className="section-header__copy" style={{ color: 'var(--gray-300)' }}>
            Investisseures diaspora, fondatrices d’hôtels et d’agences, et entrepreneurs bâtisseurs qui partagent des chiffres réels.
          </p>
        </div>

        <div
          className="guests-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}
        >
          {featuredGuests.map((guest) => {
            const linkedEpisode = episodes.find((e) => e.id === guest.episodeId)
            return (
              <article className="guest-card" key={guest.name}>
                <div className="guest-card__img" style={{ aspectRatio: '16 / 9' }}>
                  <img className="photo-color" src={guest.image} alt={guest.name} loading="lazy" />
                </div>
                <div className="guest-card__body">
                  <h3>{guest.name}</h3>
                  <p>
                    {guest.role} · {guest.organization} ({guest.city})
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 10, borderTop: '1px solid var(--graphite)' }}>
                    <span className="guest-card__topic" style={{ borderTop: 0, paddingTop: 0 }}>
                      {guest.topic}
                    </span>
                    {linkedEpisode && (
                      <button
                        type="button"
                        onClick={() => onOpenEpisode(linkedEpisode)}
                        style={{
                          background: 'transparent',
                          border: 0,
                          color: 'var(--white)',
                          fontSize: 12,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          minHeight: 36,
                        }}
                      >
                        Voir
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="editorial-quote">
          <div>
            <Eyebrow light>L’esprit Immobilier d’Afrique</Eyebrow>
            <blockquote className="display-serif">
              « D’employée au Ritz ou banquière à Paris à la tête d’hôtels et de 50 appartements : l’immobilier africain récompense celles et ceux qui apprennent les règles du terrain. »
            </blockquote>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--gray-300)' }}>
              <strong>Mark Saint-Julien</strong>, fondateur &amp; animateur d’Immobilier d’Afrique
            </p>
          </div>
          <Button variant="primary" icon="play" onClick={() => onOpenEpisode(latest)}>
            Voir l’ÉP. 22
          </Button>
        </div>
      </section>

      {/* 7. BLOC D'INSCRIPTION CONCIS */}
      <section className="section section--paper">
        <SignupForm
          eyebrow="Rester informé"
          title="Prochaine édition."
          subtitle="Recevez la date d’annonce, les replays et les nouveaux épisodes."
          showStateToolbar={false}
          onOpenPrivacy={onOpenPrivacy}
        />
      </section>
    </main>
  )
}
