import { FormEvent, useEffect, useState } from 'react'
import { LOGO_URL } from '../data/platformData'
import { Icon } from './Icons'
import { Button, Eyebrow } from './Shared'

export type FormVisualState =
  | 'empty'
  | 'filled'
  | 'error'
  | 'loading'
  | 'confirmed'
  | 'double-optin'

export type UserProfileType =
  | 'Investisseur'
  | 'Professionnel'
  | 'Diaspora'
  | 'Partenaire / Sponsor'

const INTEREST_OPTIONS = [
  'Financement',
  'Juridique',
  'Construction',
  'Diaspora',
  'Partenariat',
]

const COUNTRY_DIAL_CODES = [
  { code: '+221', label: '🇸🇳 +221 (SN)' },
  { code: '+33', label: '🇫🇷 +33 (FR)' },
  { code: '+225', label: '🇨🇮 +225 (CI)' },
  { code: '+212', label: '🇲🇦 +212 (MA)' },
  { code: '+229', label: '🇧🇯 +229 (BJ)' },
  { code: '+1', label: '🇨🇦 +1 (CA/US)' },
  { code: '+32', label: '🇧🇪 +32 (BE)' },
  { code: '+41', label: '🇨🇭 +41 (CH)' },
]

const RESIDENCE_COUNTRIES = [
  'Sénégal',
  'France',
  'Côte d’Ivoire',
  'Canada',
  'Belgique',
  'Suisse',
  'Maroc',
  'Bénin',
  'Royaume-Uni',
  'États-Unis',
  'Autre pays',
]

interface FormValues {
  firstName: string
  lastName: string
  email: string
  dialCode: string
  whatsapp: string
  country: string
  profile: UserProfileType | ''
  interests: string[]
  consent: boolean
}

const EMPTY_FORM: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  dialCode: '+221',
  whatsapp: '',
  country: '',
  profile: '',
  interests: [],
  consent: false,
}

const SAMPLE_DIASPORA_FORM: FormValues = {
  firstName: 'Cheikh',
  lastName: 'Diallo',
  email: 'cheikh.diallo@exemple-diaspora.fr',
  dialCode: '+33',
  whatsapp: '6 45 12 89 00',
  country: 'France',
  profile: 'Diaspora',
  interests: ['Financement', 'Diaspora'],
  consent: true,
}

export function SignupForm({
  title = 'Prochaine édition.',
  subtitle = 'Recevez la date d’annonce, les replays et les nouveaux épisodes.',
  eyebrow = 'Rester informé·e',
  defaultProfile = '',
  showStateToolbar = true,
  onOpenPrivacy,
}: {
  title?: string
  subtitle?: string
  eyebrow?: string
  defaultProfile?: UserProfileType | ''
  showStateToolbar?: boolean
  onOpenPrivacy: () => void
}) {
  const [visualState, setVisualState] = useState<FormVisualState>('empty')
  const [values, setValues] = useState<FormValues>(() =>
    defaultProfile === 'Partenaire / Sponsor'
      ? {
          ...EMPTY_FORM,
          profile: 'Partenaire / Sponsor',
          interests: ['Partenariat'],
        }
      : { ...EMPTY_FORM, profile: defaultProfile },
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})

  useEffect(() => {
    if (defaultProfile) {
      setValues((prev) => ({
        ...prev,
        profile: defaultProfile,
        interests:
          defaultProfile === 'Partenaire / Sponsor' &&
          !prev.interests.includes('Partenariat')
            ? [...prev.interests, 'Partenariat']
            : prev.interests,
      }))
    }
  }, [defaultProfile])

  const validate = (form: FormValues) => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'Indiquez votre prénom.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Indiquez votre nom.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Saisissez une adresse e-mail valide (ex. nom@domaine.com).'
    }
    if (!form.country) nextErrors.country = 'Sélectionnez votre pays de résidence.'
    if (!form.profile) nextErrors.profile = 'Choisissez votre profil.'
    if (!form.consent) {
      nextErrors.consent = 'Votre consentement explicite est requis (Loi n° 2008-12 & RGPD).'
    }
    return nextErrors
  }

  const applyMockState = (state: FormVisualState) => {
    setVisualState(state)
    if (state === 'empty') {
      setValues({ ...EMPTY_FORM, profile: defaultProfile })
      setErrors({})
    } else if (state === 'filled') {
      setValues(SAMPLE_DIASPORA_FORM)
      setErrors({})
    } else if (state === 'error') {
      const partial: FormValues = {
        ...EMPTY_FORM,
        firstName: 'Cheikh',
        lastName: '',
        email: 'cheikh@invalide',
        country: '',
        profile: '',
        consent: false,
      }
      setValues(partial)
      setErrors(validate(partial))
    } else if (state === 'loading' || state === 'confirmed' || state === 'double-optin') {
      setValues((prev) => (prev.email ? prev : SAMPLE_DIASPORA_FORM))
      setErrors({})
    }
  }

  const toggleInterest = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter((item) => item !== tag)
        : [...prev.interests, tag],
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setVisualState('error')
      return
    }
    setVisualState('loading')
    window.setTimeout(() => {
      setVisualState('confirmed')
    }, 650)
  }

  const stateLabels: { key: FormVisualState; label: string }[] = [
    { key: 'empty', label: 'Vide' },
    { key: 'filled', label: 'Saisie' },
    { key: 'error', label: 'Erreur validation' },
    { key: 'loading', label: 'Envoi…' },
    { key: 'confirmed', label: 'Confirmation' },
    { key: 'double-optin', label: 'E-mail Double Opt-In' },
  ]

  const isPartner = values.profile === 'Partenaire / Sponsor'

  return (
    <div className="signup-box" id="inscription">
      {showStateToolbar && (
        <div
          style={{
            marginBottom: 28,
            paddingBottom: 18,
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gray-600)',
            }}
          >
            États du formulaire (maquette interactive) :
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {stateLabels.map((st) => (
              <button
                key={st.key}
                type="button"
                className={`filter-pill${visualState === st.key ? ' is-active' : ''}`}
                style={{ minHeight: 32, fontSize: 11, padding: '0 11px' }}
                onClick={() => applyMockState(st.key)}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {visualState === 'confirmed' ? (
        <div style={{ display: 'grid', gap: 24, maxWidth: 680 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--ink)',
                color: 'var(--white)',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
            >
              <Icon name="check" />
            </span>
            <div>
              <Eyebrow>Presque terminé (Étape 1/2)</Eyebrow>
              <h2 className="display-serif" style={{ margin: 0 }}>
                Confirmez votre adresse e-mail.
              </h2>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--gray-700)' }}>
            Merci <strong>{values.firstName || 'cher lecteur'}</strong>. Un e-mail de confirmation (double opt-in) vient d’être envoyé à{' '}
            <strong>{values.email || 'votre adresse'}</strong>. Cliquez sur le lien reçu pour activer votre alerte
            {isPartner
              ? ' et télécharger immédiatement le Dossier Partenaire / Sponsor 2027.'
              : ' pour la prochaine édition et les nouveaux épisodes.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button variant="dark" icon="mail" onClick={() => setVisualState('double-optin')}>
              Aperçu de l’e-mail Double Opt-In
            </Button>
            <Button variant="secondary" onClick={() => applyMockState('empty')}>
              Nouvelle inscription
            </Button>
          </div>
        </div>
      ) : visualState === 'double-optin' ? (
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <Eyebrow>Maquette e-mail transactionnel</Eyebrow>
              <h2 className="display-serif" style={{ margin: 0, fontSize: 32 }}>
                E-mail de confirmation (Double Opt-In)
              </h2>
            </div>
            <Button variant="secondary" onClick={() => setVisualState('confirmed')}>
              Retour à l’écran de confirmation
            </Button>
          </div>

          <div className="email-preview">
            <div className="email-preview__chrome">
              <span><strong>De :</strong> Immobilier d’Afrique &lt;bonjour@immobilierdafrique.com&gt;</span>
              <span><strong>À :</strong> {values.email || 'cheikh.diallo@exemple-diaspora.fr'}</span>
              <span><strong>Objet :</strong> Confirmez votre inscription aux alertes Immobilier d’Afrique</span>
            </div>
            <div className="email-preview__body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '1px solid var(--gray-200)', marginBottom: 24 }}>
                <img src={LOGO_URL} alt="Immobilier d’Afrique" style={{ height: 32, width: 'auto' }} />
                <span className="badge">Double Opt-In</span>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: 15 }}>
                Bonjour <strong>{values.firstName || 'Cheikh'}</strong>,
              </p>
              <p style={{ margin: '0 0 18px', fontSize: 14, lineHeight: 1.7, color: 'var(--gray-700)' }}>
                Vous venez de demander à être informé·e en priorité de la prochaine édition d’<strong>Immobilier d’Afrique</strong>
                {isPartner ? ' et à recevoir le Dossier Partenaire / Sponsor' : ''}. Pour finaliser votre inscription et confirmer votre consentement, cliquez sur le bouton ci-dessous :
              </p>
              <div style={{ margin: '24px 0' }}>
                <Button variant="dark" icon="check" onClick={() => applyMockState('filled')}>
                  Oui, confirmer mon inscription
                </Button>
              </div>
              <p style={{ margin: '18px 0 0', fontSize: 11, lineHeight: 1.6, color: 'var(--gray-500)', borderTop: '1px solid var(--gray-100)', paddingTop: 14 }}>
                Profil enregistré : {values.profile || 'Diaspora'} · Pays : {values.country || 'France'}.<br />
                Conformément à la loi sénégalaise n° 2008-12 et au RGPD, si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="signup-grid">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--gray-700)', maxWidth: 360 }}>
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label" htmlFor="signup-firstname">
                  Prénom *
                </label>
                <input
                  id="signup-firstname"
                  className={`input-control${errors.firstName ? ' input-control--error' : ''}`}
                  value={values.firstName}
                  onChange={(e) => {
                    setValues({ ...values, firstName: e.target.value })
                    if (errors.firstName) setErrors({ ...errors, firstName: undefined })
                  }}
                  placeholder="Aminata"
                />
                {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="signup-lastname">
                  Nom *
                </label>
                <input
                  id="signup-lastname"
                  className={`input-control${errors.lastName ? ' input-control--error' : ''}`}
                  value={values.lastName}
                  onChange={(e) => {
                    setValues({ ...values, lastName: e.target.value })
                    if (errors.lastName) setErrors({ ...errors, lastName: undefined })
                  }}
                  placeholder="Diallo"
                />
                {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
              </div>

              <div className="form-field form-field--full">
                <label className="form-label" htmlFor="signup-email">
                  E-mail *
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className={`input-control${errors.email ? ' input-control--error' : ''}`}
                  value={values.email}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  placeholder="nom@exemple.com"
                />
                {errors.email && <p className="error-msg">{errors.email}</p>}
              </div>

              <div className="form-field form-field--full">
                <label className="form-label" htmlFor="signup-whatsapp">
                  WhatsApp <span>Facultatif</span>
                </label>
                <div className="phone-group">
                  <select
                    aria-label="Indicatif pays WhatsApp"
                    className="select-control"
                    value={values.dialCode}
                    onChange={(e) => setValues({ ...values, dialCode: e.target.value })}
                  >
                    {COUNTRY_DIAL_CODES.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <input
                    id="signup-whatsapp"
                    type="tel"
                    className="input-control"
                    value={values.whatsapp}
                    onChange={(e) => setValues({ ...values, whatsapp: e.target.value })}
                    placeholder="77 000 00 00"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="signup-country">
                  Pays *
                </label>
                <select
                  id="signup-country"
                  className={`select-control${errors.country ? ' select-control--error' : ''}`}
                  value={values.country}
                  onChange={(e) => {
                    setValues({ ...values, country: e.target.value })
                    if (errors.country) setErrors({ ...errors, country: undefined })
                  }}
                >
                  <option value="">Choisir un pays</option>
                  {RESIDENCE_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="error-msg">{errors.country}</p>}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="signup-profile">
                  Profil *
                </label>
                <select
                  id="signup-profile"
                  className={`select-control${errors.profile ? ' select-control--error' : ''}`}
                  value={values.profile}
                  onChange={(e) => {
                    const profile = e.target.value as UserProfileType | ''
                    setValues({ ...values, profile })
                    if (errors.profile) setErrors({ ...errors, profile: undefined })
                  }}
                >
                  <option value="">Choisir un profil</option>
                  <option value="Investisseur">Investisseur</option>
                  <option value="Professionnel">Professionnel</option>
                  <option value="Diaspora">Diaspora</option>
                  <option value="Partenaire / Sponsor">Partenaire / Sponsor</option>
                </select>
                {errors.profile && <p className="error-msg">{errors.profile}</p>}
              </div>

              <div className="form-field form-field--full">
                <span className="form-label">
                  Centres d’intérêt <span>Facultatif</span>
                </span>
                <div className="interest-pills">
                  {INTEREST_OPTIONS.map((tag) => {
                    const selected = values.interests.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`interest-pill${selected ? ' is-selected' : ''}`}
                        onClick={() => toggleInterest(tag)}
                        aria-pressed={selected}
                      >
                        {selected ? '✓ ' : ''}
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

              {isPartner && (
                <div
                  className="form-field form-field--full"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--ink)',
                    background: 'var(--white)',
                    fontSize: 12,
                  }}
                >
                  Dossier Partenaire / Sponsor inclus après confirmation.
                </div>
              )}

              <div className="form-field form-field--full">
                <label className="consent-row">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => {
                      setValues({ ...values, consent: e.target.checked })
                      if (errors.consent) setErrors({ ...errors, consent: undefined })
                    }}
                  />
                  <span>
                    J’accepte de recevoir les actualités d’Immobilier d’Afrique (Loi n° 2008-12 &amp; RGPD).{' '}
                    <button type="button" className="consent-link" onClick={onOpenPrivacy}>
                      Confidentialité
                    </button>
                    .
                  </span>
                </label>
                {errors.consent && <p className="error-msg">{errors.consent}</p>}
              </div>

              <div className="form-field form-field--full" style={{ marginTop: 4 }}>
                <Button
                  type="submit"
                  variant="dark"
                  icon="arrow"
                  full
                  disabled={visualState === 'loading'}
                >
                  {visualState === 'loading'
                    ? 'Envoi…'
                    : isPartner
                      ? 'Recevoir le dossier partenaire'
                      : 'Me prévenir'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
