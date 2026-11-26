import { useEffect, useState } from 'react'
import { HERO_BANNER_URL, nextEventAnnouncedData, PastEvent, pastEvents } from '../data/platformData'
import { Icon } from './Icons'
import { Button, EventCard, Eyebrow, YouTubeCoverEmbed } from './Shared'
import { SignupForm, UserProfileType } from './SignupForm'

export function PastEventsListPage({
  onOpenEvent,
  onRequestPartner,
}: {
  onOpenEvent: (ev: PastEvent) => void
  onRequestPartner: () => void
}) {
  return (
    <main>
      <section
        className="section section--dark"
        style={{ position: 'relative', overflow: 'hidden', paddingBottom: 64 }}
      >
        <div className="hero__bg-banner" aria-hidden="true">
          <img src={HERO_BANNER_URL} alt="" />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Eyebrow light>Pilier 02 · Archives des Masterclasses</Eyebrow>
          <h1 className="display-serif" style={{ margin: '0 0 16px', fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 0.94 }}>
            Événements <em>passés</em>
          </h1>
          <p style={{ margin: 0, maxWidth: 620, color: 'var(--gray-300)', fontSize: 15, lineHeight: 1.65 }}>
            Retrouvez le déroulé complet de nos éditions précédentes à Dakar et Paris : panélistes, chiffres clés, galeries photos, replays vidéo et partenaires.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        {/* PARCOURS 3 : SPONSOR CONSULTATION CHIFFRES -> DOSSIER PARTENAIRE */}
        <div
          style={{
            marginBottom: 36,
            padding: 28,
            background: 'var(--white)',
            border: '1px solid var(--ink)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div>
            <Eyebrow>Parcours 3 · Sponsors &amp; Partenaires</Eyebrow>
            <h2 className="display-serif" style={{ margin: '0 0 6px', fontSize: 30 }}>
              Vous souhaitez associer votre marque à la prochaine édition ?
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--gray-700)', maxWidth: 560 }}>
              Consultez les chiffres détaillés de nos éditions passées (audience qualifiée investisseurs, diaspora, promoteurs) et demandez le dossier partenaire.
            </p>
          </div>
          <Button variant="dark" icon="fileText" onClick={onRequestPartner}>
            Demander le dossier partenaire
          </Button>
        </div>

        <div className="event-cards-stack">
          {pastEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} onOpen={onOpenEvent} />
          ))}
        </div>
      </section>
    </main>
  )
}

export function PastEventDetailPage({
  event,
  onBack,
  onOpenPrivacy,
  onRequestPartner,
}: {
  event: PastEvent
  onBack: () => void
  onOpenPrivacy: () => void
  onRequestPartner: () => void
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [activeReplay, setActiveReplay] = useState<string | null>(null)

  return (
    <main>
      <section className="section section--dark" style={{ paddingTop: 36, paddingBottom: 56 }}>
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
            marginBottom: 20,
          }}
        >
          <Icon name="arrowLeft" /> Retour aux éditions passées
        </button>

        <div className="episode-hero__grid" style={{ padding: 0 }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              <span className="badge">{event.edition}</span>
              <span className="badge badge--outline-light">{event.city}</span>
              <span className="badge badge--outline-light">{event.dateLabel}</span>
            </div>
            <h1 className="display-serif" style={{ margin: '0 0 16px', fontSize: 'clamp(40px, 4.6vw, 66px)', lineHeight: 0.96 }}>
              {event.headline}
            </h1>
            <p style={{ margin: '0 0 14px', color: 'var(--gray-300)', fontSize: 15, lineHeight: 1.7 }}>
              {event.summary}
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-400)' }}>
              Lieu : {event.venue}
            </p>
          </div>

          <div style={{ position: 'relative', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--graphite)', aspectRatio: '4 / 3' }}>
            <img className="photo-bw" src={event.heroImage} alt={event.headline} />
            {event.isExample && <span className="example-tag">Exemple</span>}
          </div>
        </div>
      </section>

      {/* PROGRAMME TEL QU'IL S'EST DÉROULÉ */}
      <section className="section section--white">
        <Eyebrow>Déroulé réel de l’édition</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 28px', fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
          Le programme tel qu’il s’est déroulé
        </h2>

        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {event.schedule.map((slot) => (
            <div
              key={slot.time}
              style={{
                padding: '20px 0',
                borderBottom: '1px solid var(--gray-200)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600 }}>{slot.time}</span>
                <span className="badge" style={{ marginLeft: 10 }}>
                  {slot.format}
                </span>
              </div>
              <strong style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{slot.title}</strong>
              <span style={{ fontSize: 13, color: 'var(--gray-700)' }}>{slot.speakers}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PANÉLISTES & REPLAYS */}
      <section className="section section--paper">
        <Eyebrow>Intervenant·es</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 28px', fontSize: 'clamp(32px, 3.6vw, 48px)' }}>
          Les panélistes de l’édition
        </h2>
        <div className="guests-grid" style={{ marginBottom: 48 }}>
          {event.panelists.map((p) => (
            <article key={p.name} className="episode-card">
              <div className="episode-card__media" style={{ cursor: 'default', aspectRatio: '4 / 3.6' }}>
                <img className="photo-bw" src={p.image} alt={p.name} loading="lazy" />
                {p.isExample && <span className="example-tag">Exemple</span>}
              </div>
              <div className="episode-card__body">
                <h3 style={{ marginBottom: 4 }}>{p.name}</h3>
                <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--gray-700)' }}>
                  {p.role} · {p.organization} ({p.city})
                </p>
                {p.topic && <span className="badge">{p.topic}</span>}
              </div>
            </article>
          ))}
        </div>

        {/* VIDÉOS / REPLAYS */}
        <Eyebrow>Parcours 2 · Replays vidéo</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 22px', fontSize: 'clamp(30px, 3.4vw, 44px)' }}>
          Vidéos &amp; replays de la conférence
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {event.replays.map((rep) => (
            <div
              key={rep.title}
              style={{
                background: 'var(--ink)',
                color: 'var(--white)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <YouTubeCoverEmbed
                youtubeId={rep.youtubeId}
                coverImage={`https://i.ytimg.com/vi/${rep.youtubeId}/hqdefault.jpg`}
                title={rep.title}
                onStartPlay={() => setActiveReplay(rep.title)}
              />
              <div style={{ padding: 20 }}>
                <span className="badge badge--outline-light">{rep.duration} · Replay</span>
                <h3 className="display-serif" style={{ margin: '12px 0 6px', fontSize: 23 }}>
                  {rep.title}
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--gray-300)' }}>
                  Intervenant : {rep.speaker}
                </p>
              </div>
            </div>
          ))}
        </div>

        {activeReplay && (
          <div
            style={{
              marginTop: 20,
              padding: 24,
              background: 'var(--ink)',
              color: 'var(--white)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <Eyebrow light>Lecture replay en cours (simulation maquette)</Eyebrow>
              <strong style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>{activeReplay}</strong>
            </div>
            <Button variant="secondary-light" onClick={() => setActiveReplay(null)}>
              Fermer le lecteur
            </Button>
          </div>
        )}
      </section>

      {/* GALERIE PHOTOS */}
      <section className="section section--white">
        <Eyebrow>Galerie photos</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 24px', fontSize: 'clamp(30px, 3.4vw, 44px)' }}>
          Instantanés de l’événement
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {event.gallery.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxIdx(idx)}
              style={{
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                padding: 0,
                background: 'var(--white)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
                <img className="photo-bw" src={g.src} alt={g.caption} loading="lazy" />
              </div>
              <p style={{ margin: 0, padding: 12, fontSize: 12, color: 'var(--gray-700)' }}>
                {g.caption}
              </p>
            </button>
          ))}
        </div>

        {lightboxIdx !== null && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              background: 'rgba(10, 10, 11, 0.88)',
              display: 'grid',
              placeItems: 'center',
              padding: 20,
            }}
          >
            <div style={{ maxWidth: 820, width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <img
                src={event.gallery[lightboxIdx].src}
                alt={event.gallery[lightboxIdx].caption}
                style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', filter: 'grayscale(100%)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, color: 'var(--white)' }}>
                <span style={{ fontSize: 13 }}>{event.gallery[lightboxIdx].caption}</span>
                <Button variant="primary" onClick={() => setLightboxIdx(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TÉMOIGNAGES & SPONSORS */}
      <section className="section section--paper">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          <div>
            <Eyebrow>Témoignages</Eyebrow>
            <h2 className="display-serif" style={{ margin: '0 0 20px', fontSize: 34 }}>
              Ce qu’en disent les participant·es
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {event.testimonials.map((t) => (
                <blockquote
                  key={t.author}
                  style={{
                    margin: 0,
                    padding: 22,
                    background: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <p style={{ margin: '0 0 12px', fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.25 }}>
                    « {t.quote} »
                  </p>
                  <footer style={{ fontSize: 12, color: 'var(--gray-600)' }}>
                    <strong>{t.author}</strong>, {t.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow>Sponsors &amp; Partenaires</Eyebrow>
            <h2 className="display-serif" style={{ margin: '0 0 20px', fontSize: 34 }}>
              Ils ont soutenu cette édition
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              {event.sponsors.map((s) => (
                <div
                  key={s.name}
                  style={{
                    padding: 18,
                    background: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <span className="badge" style={{ marginBottom: 8 }}>
                    {s.tier}
                  </span>
                  <strong style={{ display: 'block', fontSize: 14 }}>{s.name}</strong>
                </div>
              ))}
            </div>
            <Button variant="secondary" icon="fileText" onClick={onRequestPartner}>
              Devenir sponsor de la prochaine édition
            </Button>
          </div>
        </div>
      </section>

      {/* FIN DE PAGE ÉDITION PASSÉE : APPEL OBLIGATOIRE VERS INSCRIPTION AU PROCHAIN ÉVÉNEMENT */}
      <section className="section section--white" style={{ borderTop: '1px solid var(--ink)' }}>
        <SignupForm
          eyebrow="Ne manquez pas la prochaine édition"
          title="Vous avez manqué cette édition ? Soyez prévenu·e pour la suivante."
          subtitle="Laissez votre contact pour recevoir l’annonce officielle de la 3e édition, le programme complet et l’accès aux pré-ventes."
          defaultProfile="Professionnel"
          onOpenPrivacy={onOpenPrivacy}
        />
      </section>
    </main>
  )
}

export function NextEventPage({
  eventState,
  onChangeState,
  defaultProfile,
  onOpenPrivacy,
}: {
  eventState: 'A' | 'B'
  onChangeState: (s: 'A' | 'B') => void
  defaultProfile?: UserProfileType | ''
  onOpenPrivacy: () => void
}) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, new Date(nextEventAnnouncedData.dateIso).getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)

  return (
    <main>
      <section className="section section--dark" style={{ paddingBottom: 48 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <Eyebrow light>Pilier 03 · Prochain événement (2 états à maquetter)</Eyebrow>
          <div className="state-switch-inline" style={{ background: 'var(--charcoal)', borderColor: 'var(--graphite)' }}>
            <button
              className={eventState === 'A' ? 'is-active' : ''}
              style={{ color: eventState === 'A' ? 'var(--ink)' : 'var(--gray-300)' }}
              onClick={() => onChangeState('A')}
            >
              État A : Date non annoncée
            </button>
            <button
              className={eventState === 'B' ? 'is-active' : ''}
              style={{ color: eventState === 'B' ? 'var(--ink)' : 'var(--gray-300)' }}
              onClick={() => onChangeState('B')}
            >
              État B : Événement annoncé
            </button>
          </div>
        </div>

        {eventState === 'A' ? (
          <div>
            <span className="badge badge--outline-light" style={{ marginBottom: 14 }}>
              Prochaine édition · Date bientôt annoncée
            </span>
            <h1 className="display-serif" style={{ margin: '0 0 18px', fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 0.94 }}>
              La 3e édition se prépare. <em>Soyez prévenu·e</em> en priorité.
            </h1>
            <p style={{ margin: 0, maxWidth: 640, color: 'var(--gray-300)', fontSize: 16, lineHeight: 1.7 }}>
              Dès que le lieu et la date seront arrêtés (Dakar / Paris), les inscrits sur cette liste recevront l’annonce avant l’ouverture publique des places et les tarifs préférentiels.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              <span className="badge">{nextEventAnnouncedData.edition}</span>
              <span className="badge badge--outline-light">{nextEventAnnouncedData.dateDisplay}</span>
              <span className="badge badge--outline-light">{nextEventAnnouncedData.city}</span>
            </div>
            <h1 className="display-serif" style={{ margin: '0 0 16px', fontSize: 'clamp(40px, 5vw, 70px)', lineHeight: 0.94 }}>
              {nextEventAnnouncedData.title}
            </h1>
            <p style={{ margin: '0 0 28px', maxWidth: 660, color: 'var(--gray-300)', fontSize: 16, lineHeight: 1.65 }}>
              {nextEventAnnouncedData.summary}
            </p>

            {/* COMPTE À REBOURS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(70px, 120px))',
                gap: 12,
                marginBottom: 28,
              }}
            >
              {[
                [days, 'Jours'],
                [hours, 'Heures'],
                [mins, 'Minutes'],
                [secs, 'Secondes'],
              ].map(([n, label]) => (
                <div
                  key={String(label)}
                  style={{
                    padding: '14px 12px',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--graphite)',
                    background: 'var(--charcoal)',
                    textAlign: 'center',
                  }}
                >
                  <strong style={{ display: 'block', fontFamily: 'var(--serif)', fontSize: 38, lineHeight: 1 }}>
                    {String(n).padStart(2, '0')}
                  </strong>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a className="btn btn--primary" href="#billetterie-externe">
                Accéder à la billetterie externe <Icon name="external" />
              </a>
              <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--gray-300)' }}>
                {nextEventAnnouncedData.venue} · {nextEventAnnouncedData.priceRange}
              </span>
            </div>
          </div>
        )}
      </section>

      {eventState === 'B' && (
        <>
          <section className="section section--white">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
              <div>
                <Eyebrow>Programme prévisionnel</Eyebrow>
                <h2 className="display-serif" style={{ margin: '0 0 22px', fontSize: 36 }}>
                  Une journée pour passer à l’action
                </h2>
                <div style={{ borderTop: '1px solid var(--ink)' }}>
                  {nextEventAnnouncedData.program.map((item) => (
                    <div key={item.time} style={{ padding: '16px 0', borderBottom: '1px solid var(--gray-200)' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-600)' }}>
                        {item.time}
                      </span>
                      <strong style={{ display: 'block', fontFamily: 'var(--serif)', fontSize: 22, margin: '4px 0' }}>
                        {item.title}
                      </strong>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--gray-700)' }}>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="billetterie-externe">
                <Eyebrow>Billetterie externe (lien de sortie)</Eyebrow>
                <h2 className="display-serif" style={{ margin: '0 0 14px', fontSize: 36 }}>
                  Réserver votre place
                </h2>
                <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.65, color: 'var(--gray-700)' }}>
                  Conformément au fonctionnement actuel d’immobilierdafrique.com, le règlement s’effectue sur la billetterie externe partenaire :
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {nextEventAnnouncedData.ticketingLinks.map((lnk) => (
                    <a
                      key={lnk.label}
                      href={lnk.url}
                      onClick={(e) => {
                        e.preventDefault()
                        alert(`Maquette : redirection vers la billetterie externe (${lnk.label})`)
                      }}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 'var(--radius)',
                        border: '1px solid var(--ink)',
                        background: 'var(--paper)',
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                      }}
                    >
                      <div>
                        <strong style={{ display: 'block', fontSize: 14 }}>{lnk.label}</strong>
                        <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>{lnk.note}</span>
                      </div>
                      <Icon name="external" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* FORMULAIRE COMPLET + TOUS LES ÉTATS INSPECTABLES */}
      <section className="section section--paper">
        <SignupForm
          eyebrow={eventState === 'A' ? 'État A · Prévenez-moi' : 'Liste d’alertes & Dossier partenaire'}
          title={
            defaultProfile === 'Partenaire / Sponsor'
              ? 'Demander le dossier partenaire / sponsor.'
              : eventState === 'A'
                ? 'Prévenez-moi dès que la date est annoncée.'
                : 'Recevoir le programme PDF ou demander un partenariat.'
          }
          subtitle="Testez ci-dessus les 6 états exigés (vide, saisie, erreur de validation, envoi en cours, confirmation, e-mail double opt-in)."
          defaultProfile={defaultProfile}
          showStateToolbar={true}
          onOpenPrivacy={onOpenPrivacy}
        />
      </section>
    </main>
  )
}
