import { useState } from 'react'
import { Episode, episodes, PastEvent, pastEvents } from './data/platformData'
import { NextEventPage, PastEventDetailPage, PastEventsListPage } from './components/EventsPages'
import { HomePage } from './components/HomePage'
import { Icon } from './components/Icons'
import { EpisodeDetailPage, PodcastCatalogPage } from './components/PodcastPages'
import { Button, Footer, Header, PrivacyModal, RouteKey } from './components/Shared'
import { UserProfileType } from './components/SignupForm'
import { SystemAndBriefPage } from './components/SystemAndBriefPage'

export default function App() {
  const [route, setRoute] = useState<RouteKey>('home')
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(episodes[0])
  const [selectedEvent, setSelectedEvent] = useState<PastEvent>(pastEvents[0])
  const [eventBannerState, setEventBannerState] = useState<'A' | 'B'>('A')
  const [defaultFormProfile, setDefaultFormProfile] = useState<UserProfileType | ''>('')
  const [viewportMode, setViewportMode] = useState<'fluid' | 'desktop' | 'mobile'>('fluid')
  const [lang, setLang] = useState<'FR' | 'EN'>('FR')
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navigate = (next: RouteKey) => {
    setRoute(next)
    scrollTop()
  }

  const openEpisode = (ep: Episode) => {
    setSelectedEpisode(ep)
    navigate('episode')
  }

  const openEvent = (ev: PastEvent) => {
    setSelectedEvent(ev)
    navigate('event-detail')
  }

  const goNotify = (profile?: UserProfileType) => {
    setDefaultFormProfile(profile ?? '')
    setRoute('next-event')
    window.setTimeout(() => {
      document.querySelector('#inscription')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <div className="studio-shell">
      {/* Barre de revue des livrables (Desktop 1440 / Mobile 375 + Parcours + Note de synthèse) */}
      <div className="studio-bar" role="region" aria-label="Outils de prévisualisation maquette">
        <div className="studio-bar__group">
          <span className="studio-bar__label">Format :</span>
          <button
            className={`studio-pill${viewportMode === 'fluid' ? ' studio-pill--active' : ''}`}
            onClick={() => setViewportMode('fluid')}
          >
            Fluide
          </button>
          <button
            className={`studio-pill${viewportMode === 'desktop' ? ' studio-pill--active' : ''}`}
            onClick={() => setViewportMode('desktop')}
          >
            <Icon name="monitor" /> 1440 px
          </button>
          <button
            className={`studio-pill${viewportMode === 'mobile' ? ' studio-pill--active' : ''}`}
            onClick={() => setViewportMode('mobile')}
          >
            <Icon name="smartphone" /> 375 px
          </button>
          <span className="studio-bar__label" style={{ marginLeft: 8 }}>Événement :</span>
          <button
            className={`studio-pill${eventBannerState === 'A' ? ' studio-pill--active' : ''}`}
            onClick={() => setEventBannerState('A')}
          >
            État A
          </button>
          <button
            className={`studio-pill${eventBannerState === 'B' ? ' studio-pill--active' : ''}`}
            onClick={() => setEventBannerState('B')}
          >
            État B
          </button>
        </div>

        <div className="studio-bar__group">
          <span className="studio-bar__label">Parcours :</span>
          <button
            className="studio-pill"
            onClick={() => openEpisode(episodes[0])}
          >
            1. Diaspora → Inscription
          </button>
          <button
            className="studio-pill"
            onClick={() => openEvent(pastEvents[0])}
          >
            2. Replay → Contact
          </button>
          <button
            className="studio-pill"
            onClick={() => {
              setDefaultFormProfile('Partenaire / Sponsor')
              navigate('events')
            }}
          >
            3. Sponsor → Dossier
          </button>
          <button
            className={`studio-pill${route === 'system' ? ' studio-pill--active' : ''}`}
            onClick={() => navigate('system')}
          >
            Design System &amp; Synthèse
          </button>
        </div>
      </div>

      <div className={`viewport-stage${viewportMode !== 'fluid' ? ' viewport-stage--framed' : ''}`}>
        <div
          className={`app-frame${
            viewportMode === 'desktop'
              ? ' app-frame--desktop'
              : viewportMode === 'mobile'
                ? ' app-frame--mobile'
                : ''
          }`}
        >
          <Header
            route={route}
            lang={lang}
            onToggleLang={() => setLang((l) => (l === 'FR' ? 'EN' : 'FR'))}
            onNavigate={navigate}
            onNotify={() => goNotify()}
          />

          {route === 'home' && (
            <HomePage
              eventBannerState={eventBannerState}
              onOpenEpisode={openEpisode}
              onOpenEvent={openEvent}
              onNavigate={navigate}
              onNotify={goNotify}
              onOpenPrivacy={() => setPrivacyOpen(true)}
            />
          )}

          {route === 'podcast' && <PodcastCatalogPage onOpenEpisode={openEpisode} />}

          {route === 'episode' && (
            <EpisodeDetailPage
              episode={selectedEpisode}
              onBack={() => navigate('podcast')}
              onOpenEpisode={openEpisode}
              onOpenPrivacy={() => setPrivacyOpen(true)}
            />
          )}

          {route === 'events' && (
            <PastEventsListPage
              onOpenEvent={openEvent}
              onRequestPartner={() => goNotify('Partenaire / Sponsor')}
            />
          )}

          {route === 'event-detail' && (
            <PastEventDetailPage
              event={selectedEvent}
              onBack={() => navigate('events')}
              onOpenPrivacy={() => setPrivacyOpen(true)}
              onRequestPartner={() => goNotify('Partenaire / Sponsor')}
            />
          )}

          {route === 'next-event' && (
            <NextEventPage
              eventState={eventBannerState}
              onChangeState={setEventBannerState}
              defaultProfile={defaultFormProfile}
              onOpenPrivacy={() => setPrivacyOpen(true)}
            />
          )}

          {route === 'system' && (
            <SystemAndBriefPage
              onLaunchJourney1={() => openEpisode(episodes[0])}
              onLaunchJourney2={() => openEvent(pastEvents[0])}
              onLaunchJourney3={() => {
                setDefaultFormProfile('Partenaire / Sponsor')
                navigate('events')
              }}
              onNavigate={navigate}
            />
          )}

          <Footer
            lang={lang}
            onToggleLang={() => setLang((l) => (l === 'FR' ? 'EN' : 'FR'))}
            onNavigate={navigate}
            onOpenPrivacy={() => setPrivacyOpen(true)}
            onRequestPartner={() => goNotify('Partenaire / Sponsor')}
          />

          {route !== 'next-event' && (
            <div className="mobile-sticky-cta">
              <Button variant="dark" full icon="arrow" onClick={() => goNotify()}>
                Être informé·e du prochain événement
              </Button>
            </div>
          )}

          <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        </div>
      </div>
    </div>
  )
}
