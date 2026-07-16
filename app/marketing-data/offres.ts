/* Extra Services — Marketing & Data: the 7 consulting packages.
   Content sourced from the Txuz consulting offer (French copy). */

/* Marketing & Data has its own ground: same darkness, but a cool
   blue-slate undertone instead of the site's green — a distinct
   room in the same house. The basil accent stays for brand unity. */
export const MD_BG = "#0C0F13";
export const MD_BG_ALT = "#10141B";

export interface Offre {
  slug: string;
  number: string;
  title: string;
  price: string;
  duration: string;
  goal: string;
  description: string;
  deliverables: string[];
}

export const OFFRES: Offre[] = [
  {
    slug: "go-to-market-direction",
    number: "01",
    title: "Stratégie Go-To-Market",
    price: "€1,900+",
    duration: "2–4 semaines",
    goal: "Nous vous aidons à clarifier votre stratégie go-to-market pour concentrer vos ressources sur les canaux et audiences les plus pertinents.",
    description: "Que vous lanciez un nouveau produit ou repositionniez votre offre, ce package vous donne une feuille de route claire et fondée sur les données. Nous auditerons votre approche actuelle, définirons vos profils clients idéaux et cartographierons les canaux les plus efficaces pour votre croissance.",
    deliverables: [
      "Analyse du marché et du paysage concurrentiel",
      "Définition du profil client idéal (ICP)",
      "Matrice de priorisation des canaux",
      "Feuille de route go-to-market avec jalons",
      "Présentation finale de la stratégie et accompagnement",
    ],
  },
  {
    slug: "multichannel-strategy",
    number: "02",
    title: "Stratégie Multicanale",
    price: "€1,500+",
    duration: "3–4 semaines",
    goal: "Nous vous aidons à créer une stratégie de communication connectée entre canaux payants, organiques et propriétaires pour une croissance régulière.",
    description: "Des efforts marketing fragmentés gaspillent le budget et brouillent votre audience. Ce package crée une stratégie unifiée sur tous vos canaux — publicité payante, réseaux organiques, email, contenu — pour que chaque point de contact contribue aux résultats.",
    deliverables: [
      "Audit des canaux actuels et revue de performance",
      "Cadre de messaging unifié",
      "Stratégie canal par canal avec allocation budgétaire",
      "Template de calendrier éditorial",
      "Recommandations pour la mise en place de dashboards KPI",
    ],
  },
  {
    slug: "website-acquisition",
    number: "03",
    title: "Acquisition Web",
    price: "€1,800+",
    duration: "3–4 semaines",
    goal: "Nous vous aidons à comprendre comment votre site web contribue à l'acquisition et à identifier les opportunités pour améliorer la conversion et la qualité du trafic.",
    description: "Votre site web est votre actif marketing le plus important. Ce package analyse en profondeur vos données pour comprendre les sources de trafic, le comportement utilisateur et les freins à la conversion — puis livre des recommandations actionnables pour améliorer la performance.",
    deliverables: [
      "Audit complet des analytics du site",
      "Évaluation de la qualité des sources de trafic",
      "Analyse du tunnel de conversion avec identification des abandons",
      "Recommandations UX et CRO",
      "Feuille de route de mise en œuvre priorisée",
    ],
  },
  {
    slug: "crm-activation",
    number: "04",
    title: "Activation CRM",
    price: "€1,700+",
    duration: "3–4 semaines",
    goal: "Nous vous aidons à structurer votre communication et la rétention de leads via l'email, les parcours lifecycle et les bonnes pratiques CRM.",
    description: "Les leads coûtent cher à acquérir — ne les perdez pas à cause d'un mauvais suivi. Ce package conçoit votre architecture CRM, vos séquences email et vos campagnes lifecycle pour nourrir les prospects et fidéliser les clients efficacement.",
    deliverables: [
      "Structure de données CRM et stratégie de segmentation",
      "Conception de séquences email (bienvenue, nurturing, ré-engagement)",
      "Cartographie des parcours lifecycle",
      "Framework de lead scoring",
      "Recommandations d'outils et d'intégrations",
    ],
  },
  {
    slug: "linkedin-enablement",
    number: "05",
    title: "Activation LinkedIn",
    price: "€1,200+",
    duration: "2–3 semaines",
    goal: "Nous vous aidons à construire une présence LinkedIn qui génère des leads entrants grâce à une stratégie de contenu, l'optimisation de profil et des cadres de prospection.",
    description: "LinkedIn est la plateforme B2B la plus puissante — mais la plupart des entreprises la sous-exploitent. Ce package optimise vos profils personnel et entreprise, conçoit une stratégie de contenu et crée un cadre de prospection qui génère de vraies conversations.",
    deliverables: [
      "Audit et optimisation de profil (personnel + entreprise)",
      "Stratégie de contenu avec piliers thématiques",
      "Calendrier de publication et templates",
      "Conception de séquences de prospection",
      "Framework de suivi de l'engagement",
    ],
  },
  {
    slug: "measurement-confidence",
    number: "06",
    title: "Fiabilité de la Mesure",
    price: "€1,400+",
    duration: "2–4 semaines",
    goal: "Nous vous aidons à mettre en place un tracking fiable, des dashboards et des KPIs pour que vous puissiez faire confiance à vos données et prendre des décisions marketing éclairées.",
    description: "On ne peut pas améliorer ce qu'on ne mesure pas — et de mauvaises données mènent à de mauvaises décisions. Ce package audite votre configuration de tracking, comble les lacunes et construit des dashboards qui vous donnent une vision claire de ce qui fonctionne.",
    deliverables: [
      "Audit tracking et analytics (GA4, Tag Manager, etc.)",
      "Plan de mesure avec hiérarchie de KPIs",
      "Conception et mise en place de dashboards",
      "Recommandations de modèle d'attribution",
      "Documentation et guide de formation pour l'équipe",
    ],
  },
  {
    slug: "website-creation-revamp",
    number: "07",
    title: "Création / Refonte de Site Web",
    price: "€970+",
    duration: "3–6 semaines",
    goal: "Il est temps de moderniser votre site ? Nous vous aidons à créer ou refondre votre présence web avec un site moderne, rapide et optimisé pour la conversion, construit avec les dernières technologies.",
    description: "Votre site web est souvent la première impression que les prospects ont de votre entreprise — et un design obsolète ou des performances lentes peuvent vous coûter des leads. Ce package livre un site web moderne, responsive et optimisé SEO, construit avec les dernières technologies (Next.js, Tailwind CSS, TypeScript). Que vous ayez besoin d'un nouveau site ou d'une refonte complète, nous gérons tout, du design au déploiement.",
    deliverables: [
      "Design sur mesure aligné avec votre identité de marque",
      "Stack technique moderne (Next.js, Tailwind CSS, TypeScript)",
      "Développement responsive mobile-first",
      "Optimisation SEO (balises meta, données structurées, sitemap, performance)",
      "Support bilingue si nécessaire (EN/FR)",
      "Mise en ligne et configuration de l'hébergement",
    ],
  },
  {
    slug: "conseil-ia-gouvernance",
    number: "08",
    title: "Conseil IA & Gouvernance",
    price: "€1,900+",
    duration: "3–5 semaines",
    goal: "Nous vous aidons à identifier les cas d'usage IA pertinents pour votre organisation et à les déployer avec les garde-fous d'un secteur réglementé.",
    description: "L'IA n'a de valeur que branchée sur vos processus réels. Ce package cartographie vos données disponibles, sélectionne les cas d'usage à fort impact et encadre leur mise en œuvre — avec la documentation et la gouvernance exigées par le règlement européen sur l'IA (AI Act).",
    deliverables: [
      "Cartographie des données et des processus existants",
      "Sélection de cas d'usage IA priorisés par impact",
      "Mise en œuvre encadrée des outils retenus",
      "Cadre de gouvernance et politique d'usage interne",
      "Documentation de conformité AI Act",
    ],
  },
];

export function getOffre(slug: string) {
  return OFFRES.find((o) => o.slug === slug);
}
