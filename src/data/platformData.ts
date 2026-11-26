export const LOGO_URL =
  'https://res.cloudinary.com/dprbhsvxl/image/upload/v1795645192/imo_dafrique_hv3zzo.png'

export const HERO_BANNER_URL =
  'https://res.cloudinary.com/dprbhsvxl/image/upload/v1795652571/channels4_banner_bft8fe.jpg'

export const YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/channel/UCPClbg_6jwtZrVH0rdJuWQQ'

export const EXAMPLE_IMAGE_URL =
  'https://res.cloudinary.com/dprbhsvxl/image/upload/v1795658653/imgi_2_arch-plan-1-1_yz4dav.png'

export type ThemeTag =
  | 'Financement'
  | 'Juridique'
  | 'Diaspora'
  | 'Hôtellerie'

export type CountryTag =
  | 'Sénégal'
  | 'Côte d’Ivoire'
  | 'Île Maurice'
  | 'France / Diaspora'

export interface Chapter {
  time: string
  seconds: number
  title: string
}

export interface Episode {
  id: string
  number: string
  theme: ThemeTag
  country: CountryTag
  title: string
  subtitle: string
  guest: string
  role: string
  organization: string
  city: string
  duration: string
  durationSeconds: number
  date: string
  image: string
  youtubeId: string
  youtubeUrl: string
  summary: string[]
  keyPoints: string[]
  chapters: Chapter[]
  spotifyUrl: string
  appleUrl: string
  relatedIds: string[]
  isExample: boolean
}

export interface Panelist {
  name: string
  role: string
  organization: string
  city: string
  image: string
  topic?: string
  episodeId?: string
  isExample?: boolean
}

export interface ScheduleSlot {
  time: string
  format: string
  title: string
  speakers: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface PastEvent {
  id: string
  edition: string
  year: string
  dateLabel: string
  city: string
  venue: string
  theme: string
  participants: string
  headline: string
  summary: string
  heroImage: string
  metrics: { value: string; label: string }[]
  schedule: ScheduleSlot[]
  panelists: Panelist[]
  gallery: { src: string; caption: string }[]
  replays: { title: string; duration: string; speaker: string; youtubeId: string }[]
  testimonials: Testimonial[]
  sponsors: { name: string; tier: string }[]
  isExample: boolean
}

export const hostProfile = {
  eyebrow: 'Derrière la voix',
  name: 'Mark Saint-Julien',
  role: 'Fondateur & Animateur, Immobilier d’Afrique',
  city: 'Dakar, Sénégal',
  bio: 'Mark Saint-Julien est un dirigeant hôtelier, entrepreneur et coach d’origine haïtienne basé à Dakar (Sénégal), reconnu pour son ascension rapide dans l’hôtellerie de luxe et son engagement dans le développement immobilier et le leadership en Afrique.',
  details:
    'À la tête du podcast bimensuel et de la chaîne YouTube Immobilier d’Afrique, il donne la parole aux entrepreneurs, investisseurs, hôteliers, promoteurs, notaires et banquiers qui transforment concrètement l’immobilier sur le continent.',
  channelUrl: YOUTUBE_CHANNEL_URL,
  photoImage:
    'https://res.cloudinary.com/dprbhsvxl/image/upload/v1795656802/mark_xgkloq.jpg',
}

export const episodes: Episode[] = [
  {
    id: 'ep-22-salamata-konte',
    number: 'ÉP. 22',
    theme: 'Diaspora',
    country: 'France / Diaspora',
    title: 'Ex-banquière à Paris, elle génère 200.000€ de CA & 50 appartements meublés',
    subtitle:
      'Avec Salamata KONTE : quitter la banque, structurer un parc de 50 lots meublés et bâtir une vision patrimoniale entre Paris et l’Afrique.',
    guest: 'Salamata KONTE',
    role: 'Ex-banquière & Investisseure immobilière',
    organization: '50 appartements meublés',
    city: 'Paris / Diaspora',
    duration: '46 min',
    durationSeconds: 2760,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/6rxBR7iEHxo/hqdefault.jpg',
    youtubeId: '6rxBR7iEHxo',
    youtubeUrl: 'https://www.youtube.com/watch?v=6rxBR7iEHxo',
    summary: [
      'Dans cet épisode d’Immobilier d’Afrique, Mark Saint-Julien reçoit Salamata KONTE, ancienne banquière à Paris devenue investisseure et opératrice immobilière à fort impact avec 50 appartements meublés et 200 000 € de chiffre d’affaires.',
      'Elle partage sans détour les leviers bancaires qu’elle maîtrise de l’intérieur, son passage à l’échelle dans la location meublée et les enseignements clés pour les membres de la diaspora qui souhaitent investir avec rigueur.',
    ],
    keyPoints: [
      'Structurer son profil bancaire pour enchaîner les acquisitions.',
      'Passer d’un premier bien meublé à une gestion industrialisée de 50 appartements.',
      'Transposer la discipline financière entre l’Europe et l’Afrique.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'De la banque parisienne à l’entrepreneuriat immobilier' },
      { time: '12:30', seconds: 750, title: 'Comment financer et exploiter 50 appartements meublés' },
      { time: '26:15', seconds: 1575, title: 'Atteindre 200 000 € de chiffre d’affaires avec méthode' },
      { time: '38:00', seconds: 2280, title: 'Conseils à la diaspora qui investit en Afrique' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-20-souadou-niang', 'ep-19-kardiatou-ndiaye'],
    isExample: false,
  },
  {
    id: 'ep-20-souadou-niang',
    number: 'ÉP. 20',
    theme: 'Hôtellerie',
    country: 'Sénégal',
    title: 'De femme de ménage au RITZ à fondatrice de 2 hôtels & 1 Agence immobilière',
    subtitle:
      'Avec Souadou NIANG : résilience, standards d’excellence hôtelière et création d’actifs au Sénégal.',
    guest: 'Souadou NIANG',
    role: 'Fondatrice de 2 hôtels & 1 Agence immobilière',
    organization: 'Hôtellerie & Immobilier',
    city: 'Dakar / Paris',
    duration: '52 min',
    durationSeconds: 3120,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/Xx0AA2dOWsg/hqdefault.jpg',
    youtubeId: 'Xx0AA2dOWsg',
    youtubeUrl: 'https://www.youtube.com/watch?v=Xx0AA2dOWsg',
    summary: [
      'Un parcours hors norme raconté au micro de Mark Saint-Julien : partie comme femme de ménage au Ritz, Souadou NIANG a appris les plus hauts standards de l’hôtellerie avant de fonder deux hôtels et sa propre agence immobilière.',
      'Elle revient sur la réalité opérationnelle de l’investissement hôtelier, l’exigence de service et les opportunités concrètes du secteur entre la France et le Sénégal.',
    ],
    keyPoints: [
      'Transformer l’expérience terrain du luxe en avantage concurrentiel.',
      'Lancer et rentabiliser des projets hôteliers indépendants.',
      'Allier agence immobilière et exploitation hôtelière.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Les années au Ritz et l’école de l’exigence' },
      { time: '14:20', seconds: 860, title: 'Basculer vers la propriété et l’exploitation hôtelière' },
      { time: '31:10', seconds: 1870, title: 'Créer 2 hôtels et une agence immobilière' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-22-salamata-konte', 'ep-17-fabrice-sawegnon'],
    isExample: false,
  },
  {
    id: 'ep-19-kardiatou-ndiaye',
    number: 'ÉP. 19',
    theme: 'Juridique',
    country: 'Sénégal',
    title: 'Appartements Vides, Loyers en chute : Vérités sur l’immobilier à Dakar',
    subtitle:
      'Avec Kardiatou NDIAYE : état réel du marché locatif dakarois, copropriété, offre et demande.',
    guest: 'Kardiatou NDIAYE',
    role: 'Fondatrice',
    organization: 'Indépendance Immobilière',
    city: 'Dakar',
    duration: '48 min',
    durationSeconds: 2880,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/FXpkxSf3pVc/hqdefault.jpg',
    youtubeId: 'FXpkxSf3pVc',
    youtubeUrl:
      'https://www.youtube.com/watch?v=FXpkxSf3pVc&list=PLoOlxQwkT7DK7AdvS_kNpNnN4TPlcajSg&index=3',
    summary: [
      'Pourquoi certains immeubles neufs à Dakar peinent-ils à se remplir ? Kardiatou NDIAYE, fondatrice d’Indépendance Immobilière, décrypte sans langue de bois la réalité des loyers, la vacance locative et les erreurs de positionnement prix.',
      'Un épisode essentiel pour tout investisseur local ou de la diaspora qui veut comprendre le vrai rendement locatif à Dakar avant d’acheter.',
    ],
    keyPoints: [
      'Analyser l’écart entre loyers espérés sur plan et loyers réels du marché à Dakar.',
      'Comprendre les enjeux de copropriété et de gestion locative.',
      'Cibler les typologies et quartiers où la demande reste solide.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Le constat terrain sur les appartements vides à Dakar' },
      { time: '15:40', seconds: 940, title: 'Pourquoi certains loyers chutent et comment calculer juste' },
      { time: '29:50', seconds: 1790, title: 'Copropriété, charges et gestion professionnelle' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-22-salamata-konte', 'ep-18-ashees-maunick'],
    isExample: false,
  },
  {
    id: 'ep-18-ashees-maunick',
    number: 'ÉP. 18',
    theme: 'Hôtellerie',
    country: 'Île Maurice',
    title: 'Immobilier à l’Île Maurice : fiscalité douce, rendement 10% et LCD hôtelière',
    subtitle:
      'Avec Ashees MAUNICK : régimes d’investissement à Maurice, location courte durée hôtelière et rentabilité nette.',
    guest: 'Ashees MAUNICK',
    role: 'Spécialiste immobilier & LCD hôtelière',
    organization: 'Investissement Île Maurice',
    city: 'Port-Louis, Île Maurice',
    duration: '49 min',
    durationSeconds: 2940,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/Pc2G0tJaJg8/hqdefault.jpg',
    youtubeId: 'Pc2G0tJaJg8',
    youtubeUrl: 'https://www.youtube.com/watch?v=Pc2G0tJaJg8',
    summary: [
      'Avec Ashees MAUNICK, Mark Saint-Julien explore les atouts du marché immobilier mauricien : cadre fiscal attractif, sécurité juridique et performance de la location courte durée à gestion hôtelière.',
      'L’épisode décrypte comment atteindre des rendements autour de 10 % tout en ciblant une clientèle internationale exigeante.',
    ],
    keyPoints: [
      'Comprendre les dispositifs d’acquisition accessibles aux investisseurs étrangers à Maurice.',
      'Comparer rendement brut et net en location courte durée hôtelière.',
      'Structurer la fiscalité et la gestion déléguée à distance.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Pourquoi l’Île Maurice attire les investisseurs' },
      { time: '15:10', seconds: 910, title: 'Fiscalité douce et régimes d’achat' },
      { time: '31:45', seconds: 1905, title: 'Viser 10 % de rendement avec la LCD hôtelière' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-20-souadou-niang', 'ep-17-fabrice-sawegnon'],
    isExample: false,
  },
  {
    id: 'ep-17-fabrice-sawegnon',
    number: 'ÉP. 17',
    theme: 'Financement',
    country: 'Côte d’Ivoire',
    title: 'Investir en Côte d’Ivoire : immobilier locatif, hôtels, centre commercial',
    subtitle:
      'Avec Fabrice SAWEGNON : vision entrepreneuriale, actifs commerciaux et dynamique ivoirienne.',
    guest: 'Fabrice SAWEGNON',
    role: 'Entrepreneur & Investisseur',
    organization: 'Groupe Voodoo / Actifs immobiliers',
    city: 'Abidjan',
    duration: '55 min',
    durationSeconds: 3300,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/Y4kSKt_oxmM/hqdefault.jpg',
    youtubeId: 'Y4kSKt_oxmM',
    youtubeUrl:
      'https://www.youtube.com/watch?v=Y4kSKt_oxmM&list=PLoOlxQwkT7DK7AdvS_kNpNnN4TPlcajSg&index=5',
    summary: [
      'Mark Saint-Julien échange avec Fabrice SAWEGNON sur le dynamisme immobilier d’Abidjan et de la Côte d’Ivoire : du locatif résidentiel aux projets hôteliers et centres commerciaux.',
      'Une conversation stratégique sur la structuration de projets d’envergure, le financement en Afrique de l’Ouest et l’importance du positionnement de marque dans l’immobilier.',
    ],
    keyPoints: [
      'Comprendre les moteurs de croissance de l’immobilier commercial et hôtelier à Abidjan.',
      'Diversifier entre immobilier locatif, hôtellerie et retail.',
      'S’entourer d’équipes techniques et financières fiables.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Pourquoi investir dans l’immobilier en Côte d’Ivoire' },
      { time: '18:15', seconds: 1095, title: 'Immobilier locatif vs hôtels et centres commerciaux' },
      { time: '36:40', seconds: 2200, title: 'Financement, exécution et vision à long terme' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-20-souadou-niang', 'ep-18-ashees-maunick'],
    isExample: false,
  },
  {
    id: 'ep-15-fatou-mballo',
    number: 'ÉP. 15',
    theme: 'Juridique',
    country: 'Sénégal',
    title: 'Notaire, VEFA, Terrains, Héritage, Litige : Éviter les pièges en immobilier',
    subtitle:
      'Avec Me Fatou MBALLO : sécuriser vos acquisitions, comprendre la VEFA, prévenir les litiges fonciers et successoraux.',
    guest: 'Me Fatou MBALLO',
    role: 'Notaire',
    organization: 'Étude notariale',
    city: 'Dakar',
    duration: '54 min',
    durationSeconds: 3240,
    date: 'Épisode récent',
    image: 'https://i.ytimg.com/vi/ikDTWEwPxwM/hqdefault.jpg',
    youtubeId: 'ikDTWEwPxwM',
    youtubeUrl: 'https://www.youtube.com/watch?v=ikDTWEwPxwM',
    summary: [
      'Maître Fatou MBALLO passe en revue tous les points juridiques sensibles lors d’un achat immobilier au Sénégal : vérification des terrains, contrats en VEFA, indivision, héritage et résolution des litiges.',
      'Un guide pratique indispensable pour acheter sereinement sur place ou depuis la diaspora en passant par les vérifications notariales.',
    ],
    keyPoints: [
      'Vérifier la nature du titre avant tout versement d’acompte sur un terrain.',
      'Encadrer l’achat sur plan (VEFA) et anticiper les clauses de livraison.',
      'Régler en amont les questions d’héritage et de copropriété pour éviter les blocages.',
    ],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Le rôle central du notaire pour sécuriser son bien' },
      { time: '14:40', seconds: 880, title: 'Terrains et VEFA : les vérifications obligatoires' },
      { time: '32:10', seconds: 1930, title: 'Héritage, indivision et litiges immobiliers' },
    ],
    spotifyUrl: 'https://open.spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    relatedIds: ['ep-19-kardiatou-ndiaye', 'ep-22-salamata-konte'],
    isExample: false,
  },
]

export const pastEvents: PastEvent[] = [
  {
    id: 'masterclass-dakar-2',
    edition: '2e Édition · Masterclass',
    year: '2025',
    dateLabel: '18 octobre 2025',
    city: 'Dakar',
    venue: 'Hôtel Pullman Teranga, Dakar',
    theme: 'Financer, sécuriser et livrer des actifs rentables en Afrique de l’Ouest',
    participants: '380 participant·es',
    headline: 'La Masterclass de référence au Pullman Dakar.',
    summary:
      'Pendant une journée complète au Pullman Teranga de Dakar, investisseurs locaux, membres de la diaspora, banquiers, notaires et promoteurs ont confronté leurs méthodes autour de cas réels d’acquisition, de financement et de construction.',
    heroImage: EXAMPLE_IMAGE_URL,
    metrics: [
      { value: '380', label: 'Participant·es sur place' },
      { value: '12', label: 'Panélistes & experts' },
      { value: '94 %', label: 'Taux de satisfaction (exemple)' },
      { value: '6 h', label: 'De masterclasses & Q&R' },
    ],
    schedule: [
      {
        time: '08:30 - 09:15',
        format: 'Accueil',
        title: 'Enregistrement des participant·es & café networking',
        speakers: 'Hall Pullman Teranga',
      },
      {
        time: '09:15 - 10:45',
        format: 'Panel 1',
        title: 'Sécuriser le foncier et les contrats VEFA au Sénégal',
        speakers: 'Maître Aïssatou Fall (Notaire, ex.), Cheikh Tidiane Sarr (Juriste, ex.)',
      },
      {
        time: '11:00 - 12:30',
        format: 'Panel 2',
        title: 'Structurer son crédit immobilier depuis Dakar ou la diaspora',
        speakers: 'Moussa Ndao (Banquier, ex.), Salamata KONTE',
      },
      {
        time: '14:00 - 15:45',
        format: 'Atelier pratique',
        title: 'Marché locatif, hôtellerie et maîtrise des coûts de construction',
        speakers: 'Kardiatou NDIAYE, Souadou NIANG',
      },
      {
        time: '16:00 - 17:30',
        format: 'Table ronde',
        title: 'Retours d’expérience d’investisseurs & vision de Mark Saint-Julien',
        speakers: 'Mark Saint-Julien & panélistes invités',
      },
    ],
    panelists: [
      {
        name: 'Maître Aïssatou Fall',
        role: 'Notaire associée',
        organization: 'Étude Fall & Associés',
        city: 'Dakar',
        image: EXAMPLE_IMAGE_URL,
        topic: 'Titres fonciers & VEFA',
        isExample: true,
      },
      {
        name: 'Moussa Ndao',
        role: 'Directeur financements structurés',
        organization: 'Banque Atlantique Conseil',
        city: 'Dakar',
        image: EXAMPLE_IMAGE_URL,
        topic: 'Crédit diaspora & effet de levier',
        isExample: true,
      },
      {
        name: 'Aminata Diop',
        role: 'Architecte fondatrice',
        organization: 'Atelier AD',
        city: 'Dakar',
        image: EXAMPLE_IMAGE_URL,
        topic: 'Conception bioclimatique & coûts',
        isExample: true,
      },
    ],
    gallery: [
      { src: EXAMPLE_IMAGE_URL, caption: 'Plénière d’ouverture dans la salle Teranga (contenu d’exemple)' },
      { src: EXAMPLE_IMAGE_URL, caption: 'Intervention notariale sur la sécurisation des actes (contenu d’exemple)' },
      { src: EXAMPLE_IMAGE_URL, caption: 'Session questions-réponses financement & diaspora (contenu d’exemple)' },
      { src: EXAMPLE_IMAGE_URL, caption: 'Étude de cas : programme résidentiel sur la Corniche (contenu d’exemple)' },
    ],
    replays: [
      {
        title: 'Replay : Vérités sur le marché locatif à Dakar (Kardiatou NDIAYE)',
        duration: '48 min',
        speaker: 'Kardiatou NDIAYE',
        youtubeId: 'FXpkxSf3pVc',
      },
      {
        title: 'Replay : 50 appartements meublés & stratégie diaspora (Salamata KONTE)',
        duration: '46 min',
        speaker: 'Salamata KONTE',
        youtubeId: '6rxBR7iEHxo',
      },
    ],
    testimonials: [
      {
        quote:
          'En une journée au Pullman, j’ai obtenu plus de réponses concrètes sur la VEFA et le financement bancaire qu’en deux ans de recherches isolées depuis Lyon.',
        author: 'Ibrahima Gueye (exemple)',
        role: 'Investisseur diaspora, Lyon / Dakar',
      },
      {
        quote:
          'La qualité du public (notaires, promoteurs et acheteurs avertis) rend les échanges directs et immédiatement actionnables.',
        author: 'Mariama Ba (exemple)',
        role: 'Directrice commerciale, Groupe Immobilier Dakar',
      },
    ],
    sponsors: [
      { name: 'Banque Partenaire UEMOA (exemple)', tier: 'Partenaire Principal' },
      { name: 'Étude Notariale Conseil (exemple)', tier: 'Partenaire Juridique' },
      { name: 'Teranga Développement (exemple)', tier: 'Sponsor Or' },
      { name: 'Wave / Orange Money (Billetterie)', tier: 'Solution de paiement' },
    ],
    isExample: true,
  },
  {
    id: 'rencontre-diaspora-paris',
    edition: 'Édition Spéciale Diaspora',
    year: '2024',
    dateLabel: '14 juin 2024',
    city: 'Paris',
    venue: 'Espace Élysée, Paris 8e',
    theme: 'Diaspora : investir au Sénégal et en Afrique de l’Ouest avec méthode',
    participants: '240 participant·es',
    headline: 'Connecter la diaspora européenne aux acteurs fiables du terrain.',
    summary:
      'Une soirée de conférences et de rendez-vous qualifiés réunissant des investisseurs basés en France, Belgique et Suisse autour de notaires, architectes et gestionnaires venus de Dakar et d’Abidjan.',
    heroImage: EXAMPLE_IMAGE_URL,
    metrics: [
      { value: '240', label: 'Participant·es à Paris' },
      { value: '8', label: 'Intervenant·es' },
      { value: '45', label: 'Rendez-vous qualifiés' },
      { value: '100 %', label: 'Guichet complet' },
    ],
    schedule: [
      {
        time: '18:30 - 19:15',
        format: 'Keynote',
        title: 'État des lieux des marchés de Dakar et Abidjan',
        speakers: 'Mark Saint-Julien (Immobilier d’Afrique)',
      },
      {
        time: '19:15 - 20:30',
        format: 'Panel',
        title: 'Déléguer l’achat, le crédit et la gestion locative à distance',
        speakers: 'Panélistes finance & notariat',
      },
      {
        time: '20:30 - 22:00',
        format: 'Networking',
        title: 'Rencontres individuelles avec les experts invités',
        speakers: 'Espace partenaires',
      },
    ],
    panelists: [
      {
        name: 'Moussa Ndao',
        role: 'Directeur financements structurés',
        organization: 'Banque Atlantique Conseil',
        city: 'Paris / Dakar',
        image: EXAMPLE_IMAGE_URL,
        isExample: true,
      },
      {
        name: 'Maître Aïssatou Fall',
        role: 'Notaire associée',
        organization: 'Étude Fall & Associés',
        city: 'Dakar',
        image: EXAMPLE_IMAGE_URL,
        isExample: true,
      },
    ],
    gallery: [
      { src: EXAMPLE_IMAGE_URL, caption: 'Échanges avec le public parisien (contenu d’exemple)' },
      { src: EXAMPLE_IMAGE_URL, caption: 'Décryptage des montages bancaires diaspora (contenu d’exemple)' },
    ],
    replays: [
      {
        title: 'Replay : Investir en Côte d’Ivoire (Fabrice SAWEGNON)',
        duration: '55 min',
        speaker: 'Fabrice SAWEGNON',
        youtubeId: 'Y4kSKt_oxmM',
      },
    ],
    testimonials: [
      {
        quote:
          'Un format sobre, exigeant, sans discours commercial agressif. On y parle chiffres réels et risques concrets.',
        author: 'Ndeye Fatou Diagne (exemple)',
        role: 'Cadre finance, Paris',
      },
    ],
    sponsors: [
      { name: 'Diaspora Invest Advisory (exemple)', tier: 'Partenaire Officiel' },
      { name: 'Atelier AD Architecture (exemple)', tier: 'Partenaire Technique' },
    ],
    isExample: true,
  },
  {
    id: 'masterclass-dakar-1',
    edition: '1re Édition · Masterclass',
    year: '2023',
    dateLabel: '21 octobre 2023',
    city: 'Dakar',
    venue: 'Radisson Blu, Corniche Ouest',
    theme: 'Poser les bases d’un investissement immobilier rentable et conforme',
    participants: '290 participant·es',
    headline: 'La première rencontre fondatrice à Dakar.',
    summary:
      'L’édition inaugurale qui a posé les bases de la communauté Immobilier d’Afrique : réunir dans une même salle ceux qui conçoivent, financent, encadrent juridiquement et investissent.',
    heroImage: EXAMPLE_IMAGE_URL,
    metrics: [
      { value: '290', label: 'Participant·es' },
      { value: '9', label: 'Intervenant·es' },
      { value: '4', label: 'Ateliers thématiques' },
      { value: '18', label: 'Médias & relais' },
    ],
    schedule: [
      {
        time: '09:00 - 12:00',
        format: 'Conférences',
        title: 'Fondamentaux du marché résidentiel dakarois',
        speakers: 'Mark Saint-Julien & invités',
      },
      {
        time: '14:00 - 17:00',
        format: 'Tables rondes',
        title: 'De l’acquisition du terrain à la mise en location',
        speakers: 'Panel pluridisciplinaire',
      },
    ],
    panelists: [
      {
        name: 'Aminata Diop',
        role: 'Architecte & fondatrice',
        organization: 'Atelier AD',
        city: 'Dakar',
        image: EXAMPLE_IMAGE_URL,
        isExample: true,
      },
    ],
    gallery: [
      { src: EXAMPLE_IMAGE_URL, caption: 'Prise de parole inaugurale à Dakar (contenu d’exemple)' },
    ],
    replays: [
      {
        title: 'Replay : De femme de ménage au RITZ à 2 hôtels (Souadou NIANG)',
        duration: '52 min',
        speaker: 'Souadou NIANG',
        youtubeId: 'Xx0AA2dOWsg',
      },
    ],
    testimonials: [
      {
        quote: 'Une initiative nécessaire pour professionnaliser la parole autour de l’immobilier au Sénégal.',
        author: 'Ousmane Ndiaye (exemple)',
        role: 'Promoteur immobilier, Dakar',
      },
    ],
    sponsors: [{ name: 'Corniche Habitat (exemple)', tier: 'Sponsor' }],
    isExample: true,
  },
]

export const featuredGuests: Panelist[] = [
  {
    name: 'Salamata KONTE',
    role: 'Ex-banquière & Investisseure',
    organization: '50 appartements meublés (200 K€ CA)',
    city: 'Paris / Diaspora',
    image: 'https://i.ytimg.com/vi/6rxBR7iEHxo/hqdefault.jpg',
    topic: 'ÉP. 22 · Effet de levier & meublé',
    episodeId: 'ep-22-salamata-konte',
    isExample: false,
  },
  {
    name: 'Souadou NIANG',
    role: 'Fondatrice de 2 hôtels & 1 Agence',
    organization: 'Parcours Ritz → Entrepreneuriat',
    city: 'Dakar / Paris',
    image: 'https://i.ytimg.com/vi/Xx0AA2dOWsg/hqdefault.jpg',
    topic: 'ÉP. 20 · Hôtellerie & résilience',
    episodeId: 'ep-20-souadou-niang',
    isExample: false,
  },
  {
    name: 'Kardiatou NDIAYE',
    role: 'Fondatrice',
    organization: 'Indépendance Immobilière',
    city: 'Dakar',
    image: 'https://i.ytimg.com/vi/FXpkxSf3pVc/hqdefault.jpg',
    topic: 'ÉP. 19 · Réalités du marché dakarois',
    episodeId: 'ep-19-kardiatou-ndiaye',
    isExample: false,
  },
  {
    name: 'Fabrice SAWEGNON',
    role: 'Entrepreneur & Investisseur',
    organization: 'Locatif, Hôtels & Centre commercial',
    city: 'Abidjan',
    image: 'https://i.ytimg.com/vi/Y4kSKt_oxmM/hqdefault.jpg',
    topic: 'ÉP. 17 · Investir en Côte d’Ivoire',
    episodeId: 'ep-17-fabrice-sawegnon',
    isExample: false,
  },
]

export const nextEventAnnouncedData = {
  edition: '3e Édition · Masterclass',
  title: 'Masterclass Immobilier d’Afrique : Dakar 2027',
  dateIso: '2027-04-17T09:00:00Z',
  dateDisplay: '17 avril 2027',
  city: 'Dakar',
  venue: 'Hôtel Pullman Teranga, Place de l’Indépendance, Dakar',
  priceRange: 'À partir de 35 000 FCFA (53 €)',
  summary:
    'Une journée intensive animée par Mark Saint-Julien avec les banquiers, notaires, hôteliers, promoteurs et architectes qui structurent les opérations les plus solides en Afrique de l’Ouest.',
  program: [
    {
      time: '08:30',
      title: 'Accueil café & remise des badges',
      detail: 'Networking ciblé entre investisseurs, diaspora et partenaires.',
    },
    {
      time: '09:30',
      title: 'Keynote & Panel Foncier : Acheter sans risque juridique',
      detail: 'Titre foncier, bail, VEFA : la grille de vérification notariale.',
    },
    {
      time: '11:30',
      title: 'Financement & Effet de levier en zone UEMOA',
      detail: 'Monter un dossier bancaire solide depuis Dakar ou l’étranger.',
    },
    {
      time: '14:30',
      title: 'Atelier Chantier, Hôtellerie & Rendement Locatif',
      detail: 'Maîtriser les coûts au m², le suivi à distance et l’exploitation.',
    },
  ],
  panelists: featuredGuests,
  ticketingLinks: [
    { label: 'Réserver via Wave', note: 'Paiement mobile Sénégal / Côte d’Ivoire', url: '#billetterie-wave' },
    { label: 'Réserver via Orange Money', note: 'Paiement mobile instantané', url: '#billetterie-orange-money' },
    { label: 'Billetterie Carte Bancaire (Diaspora)', note: 'Visa / Mastercard (EUR & USD)', url: '#billetterie-carte' },
  ],
}
