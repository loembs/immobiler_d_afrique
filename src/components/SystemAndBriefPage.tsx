import { LOGO_URL } from '../data/platformData'
import { Button, Eyebrow, RouteKey, Waveform } from './Shared'
import { UserProfileType } from './SignupForm'

export function SystemAndBriefPage({
  onLaunchJourney1,
  onLaunchJourney2,
  onLaunchJourney3,
  onNavigate,
}: {
  onLaunchJourney1: () => void
  onLaunchJourney2: () => void
  onLaunchJourney3: () => void
  onNavigate: (r: RouteKey) => void
}) {
  const paletteTokens = [
    { name: 'Ink Black', varName: '--ink', hex: '#0A0A0B', usage: 'Fonds éditoriaux sombres, boutons primaires, bordures fortes (WCAG AAA sur blanc)' },
    { name: 'Charcoal', varName: '--charcoal', hex: '#141416', usage: 'Lecteur audio, cartes sombres, encarts de synthèse' },
    { name: 'Slate', varName: '--gray-600', hex: '#525258', usage: 'Textes secondaires, métadonnées (7.7:1 sur papier)' },
    { name: 'Hairline', varName: '--gray-200', hex: '#D6D6D2', usage: 'Séparateurs fins, bordures de cartes et grille éditoriale' },
    { name: 'Editorial Paper', varName: '--paper', hex: '#F6F6F3', usage: 'Fond principal de lecture, doux pour les yeux' },
    { name: 'Pure White', varName: '--white', hex: '#FFFFFF', usage: 'Cartes, champs de saisie, cartouche logo haute lisibilité' },
  ]

  return (
    <main>
      <section className="section section--dark" style={{ paddingBottom: 56 }}>
        <Eyebrow light>Livrables complets · Direction artistique, Design System &amp; Synthèse</Eyebrow>
        <h1 className="display-serif" style={{ margin: '0 0 16px', fontSize: 'clamp(42px, 5vw, 68px)', lineHeight: 0.95 }}>
          Dossier de conception <em>Noir &amp; Blanc</em>
        </h1>
        <p style={{ margin: 0, maxWidth: 680, color: 'var(--gray-300)', fontSize: 15, lineHeight: 1.65 }}>
          Cet espace réunit la direction artistique, le mini design system, les 3 parcours utilisateurs navigables, la note de synthèse (1 page) et les recommandations d’outillage.
        </p>
      </section>

      {/* 1. PARCOURS UTILISATEURS NAVIGABLES */}
      <section className="section section--white">
        <Eyebrow>Parcours utilisateurs à couvrir</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 24px', fontSize: 38 }}>
          Tester les 3 parcours en un clic
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          <div style={{ padding: 24, border: '1px solid var(--ink)', borderRadius: 'var(--radius)', background: 'var(--paper)' }}>
            <span className="badge badge--dark" style={{ marginBottom: 12 }}>Parcours 1 (navigable)</span>
            <h3 className="display-serif" style={{ margin: '0 0 8px', fontSize: 25 }}>
              Diaspora : Épisode → Inscription → Confirmation
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Ouvre l’épisode 27 (financement diaspora), affiche le lecteur + chapitres, puis mène directement au formulaire pré-profilé « Diaspora » et à l’e-mail double opt-in.
            </p>
            <Button variant="dark" icon="arrow" onClick={onLaunchJourney1}>
              Lancer le parcours 1
            </Button>
          </div>

          <div style={{ padding: 24, border: '1px solid var(--gray-300)', borderRadius: 'var(--radius)', background: 'var(--white)' }}>
            <span className="badge" style={{ marginBottom: 12 }}>Parcours 2</span>
            <h3 className="display-serif" style={{ margin: '0 0 8px', fontSize: 25 }}>
              Professionnel : Replay Masterclass → Contact
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Ouvre la 2e édition au Pullman Dakar avec son programme réel, sa galerie photos, ses replays vidéo et le bloc d’inscription final.
            </p>
            <Button variant="secondary" icon="arrow" onClick={onLaunchJourney2}>
              Lancer le parcours 2
            </Button>
          </div>

          <div style={{ padding: 24, border: '1px solid var(--gray-300)', borderRadius: 'var(--radius)', background: 'var(--white)' }}>
            <span className="badge" style={{ marginBottom: 12 }}>Parcours 3</span>
            <h3 className="display-serif" style={{ margin: '0 0 8px', fontSize: 25 }}>
              Sponsor : Chiffres éditions → Dossier partenaire
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>
              Affiche les métriques d’impact consolidées et pré-remplit la demande avec le profil « Partenaire / Sponsor ».
            </p>
            <Button variant="secondary" icon="arrow" onClick={onLaunchJourney3}>
              Lancer le parcours 3
            </Button>
          </div>
        </div>
      </section>

      {/* 2. DIRECTION ARTISTIQUE & MINI DESIGN SYSTEM */}
      <section className="section section--paper">
        <Eyebrow>Direction artistique &amp; Mini Design System</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 28px', fontSize: 40 }}>
          Identité visuelle : presse économique &amp; studio audio
        </h2>

        {/* Intégration du vrai logo + Motif onde sonore */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
          <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
            <Eyebrow>Logo officiel sur fond clair</Eyebrow>
            <div style={{ padding: 20, border: '1px dashed var(--gray-300)', borderRadius: 8, display: 'inline-block', background: '#FFFFFF' }}>
              <img src={LOGO_URL} alt="Logo Immobilier d’Afrique" style={{ height: 44, width: 'auto' }} />
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 12, color: 'var(--gray-600)' }}>
              Source Cloudinary intégrée dans le header, le menu mobile, le footer et les e-mails de confirmation.
            </p>
          </div>

          <div style={{ padding: 24, background: 'var(--ink)', color: 'var(--white)', borderRadius: 'var(--radius)' }}>
            <Eyebrow light>Logo sans cadre &amp; motif onde sonore</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
              <span className="brand-logo-plain">
                <img src={LOGO_URL} alt="Logo Immobilier d’Afrique" />
              </span>
              <div style={{ flex: 1 }}>
                <Waveform light playing barsCount={18} />
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--gray-300)' }}>
              Le logo officiel s’intègre directement sans contour ni fond blanc ajouté, accompagné du motif d’onde sonore identifiant la dimension podcast.
            </p>
          </div>
        </div>

        {/* Palette Noir & Blanc */}
        <h3 className="display-serif" style={{ margin: '0 0 16px', fontSize: 28 }}>
          Palette monochrome &amp; contrastes WCAG AA
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 36 }}>
          {paletteTokens.map((tok) => (
            <div key={tok.hex} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <div style={{ height: 58, background: tok.hex, borderBottom: '1px solid var(--gray-200)' }} />
              <div style={{ padding: 14 }}>
                <strong style={{ display: 'block', fontSize: 13 }}>{tok.name}</strong>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gray-600)' }}>
                  {tok.hex} · {tok.varName}
                </span>
                <p style={{ margin: '6px 0 0', fontSize: 11, lineHeight: 1.5, color: 'var(--gray-700)' }}>
                  {tok.usage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Typographies, Grille & Composants */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
            <Eyebrow>Typographies &amp; Grille</Eyebrow>
            <p className="display-serif" style={{ fontSize: 34, margin: '0 0 8px', lineHeight: 1 }}>
              Cormorant Garamond <em>Serif</em>
            </p>
            <p style={{ fontSize: 14, margin: '0 0 8px' }}>
              Inter : Corps de texte lisible (14 à 16 px, interlignage 1.65)
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, margin: '0 0 16px', color: 'var(--gray-600)' }}>
              JetBrains Mono : ÉP. 22 · 46 MIN · 17 AVR. 2027
            </p>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: 'var(--gray-700)' }}>
              <strong>Grilles :</strong> Desktop 1440 px (marge 5,5vw, gouttières 24–48 px) · Mobile 375 px (1 colonne, marges 18–20 px, cibles tactiles ≥ 44–46 px). Utilisez la barre « Studio Viewport » tout en haut pour basculer instantanément en 1440 px ou 375 px.
            </p>
          </div>

          <div style={{ padding: 24, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
            <Eyebrow>Composants transverses</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <span className="badge badge--dark">Financement</span>
              <span className="badge">Juridique</span>
              <span className="badge">Construction</span>
              <span className="badge">Diaspora</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="dark" icon="headphones" onClick={() => onNavigate('podcast')}>
                Bouton principal
              </Button>
              <Button variant="secondary" icon="arrow" onClick={() => onNavigate('events')}>
                Bouton secondaire
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOTE DE SYNTHÈSE (1 PAGE) + BONUS OUTILS */}
      <section className="section section--white">
        <Eyebrow>Livrable 2 &amp; 3 · Note de synthèse &amp; Choix techniques</Eyebrow>
        <h2 className="display-serif" style={{ margin: '0 0 28px', fontSize: 40 }}>
          Note de synthèse (1 page)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <article style={{ padding: 26, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
            <h3 className="display-serif" style={{ margin: '0 0 12px', fontSize: 26 }}>
              1. Choix de conception &amp; évolution
            </h3>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong>Monochrome strict (Noir / Blanc / Gris) :</strong> Suppression des teintes dorées précédentes au profit d’une esthétique presse/architecture intemporelle qui met en valeur les portraits N&amp;B et le logo officiel.
              </li>
              <li>
                <strong>Architecture en 3 piliers permanents :</strong> Le podcast occupe le haut de hiérarchie (lecteur direct dans le hero), les éditions passées restent indexées avec leurs replays, et la capture de contacts est présente à chaque fin de parcours.
              </li>
              <li>
                <strong>Performance connexions lentes :</strong> Portraits compressés, chargement paresseux (<code style={{ fontFamily: 'var(--mono)' }}>loading="lazy"</code>), et lecteur YouTube en façade (l’iframe lourde ne se charge qu’au clic).
              </li>
            </ul>
          </article>

          <article style={{ padding: 26, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius)' }}>
            <h3 className="display-serif" style={{ margin: '0 0 12px', fontSize: 26 }}>
              2. Hypothèses &amp; questions ouvertes
            </h3>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong>Hypothèses :</strong> Les épisodes sont hébergés sur YouTube + flux RSS (Spotify/Apple) ; la billetterie (Wave, Orange Money, carte) reste externe ; les noms et chiffres marqués « Exemple » seront remplacés par les archives réelles.
              </li>
              <li>
                <strong>Questions ouvertes :</strong> Quelle fréquence de publication du podcast (bimensuelle/mensuelle) ? Existe-t-il un flux RSS audio (Ausha/Anchor) en plus de YouTube ? Souhaitez-vous automatiser les relances WhatsApp Business lors de l’ouverture des billets ?
              </li>
              <li>
                <strong>Conformité légale :</strong> Consentement explicite + double opt-in couvrant la loi sénégalaise n° 2008-12 (CDP) et le RGPD européen.
              </li>
            </ul>
          </article>

          <article style={{ padding: 26, border: '1px solid var(--ink)', borderRadius: 'var(--radius)', background: 'var(--paper)' }}>
            <h3 className="display-serif" style={{ margin: '0 0 12px', fontSize: 26 }}>
              3. Bonus : Outils recommandés
            </h3>
            <p style={{ margin: '0 0 10px', fontSize: 13, lineHeight: 1.65, color: 'var(--gray-700)' }}>
              <strong>Mise en ligne (Webflow CMS ou Next.js + Sanity) :</strong> Webflow permet à l’équipe éditoriale de publier chaque nouvel épisode et d’archiver une Masterclass en 10 minutes sans développeur, tout en garantissant des images WebP légères et une traduction FR/EN native.
            </p>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: 'var(--gray-700)' }}>
              <strong>E-mailing &amp; WhatsApp (Brevo) :</strong> Idéal pour la double conformité RGPD / Sénégal, le <strong>double opt-in natif</strong>, la segmentation par profil (Diaspora / Investisseur / Sponsor) et l’envoi combiné e-mail + WhatsApp Business sur le même outil.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
