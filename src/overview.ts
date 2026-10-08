import { text, type Localized } from "./content";

// Short, visitor-facing copy. Detailed facts remain in content.ts.
export const sectionOrder = [
  "experience",
  "projects",
  "research",
  "education",
  "skills",
] as const;
export type SectionId = (typeof sectionOrder)[number];
export const sectionInfo: Record<
  SectionId,
  { title: Localized; subtitle: Localized; preview: Localized }
> = {
  experience: {
    title: text("Experience", "Expérience"),
    subtitle: text(
      "Four internships. Real problems to solve.",
      "Quatre stages. Des problèmes concrets à résoudre.",
    ),
    preview: text(
      "L3M Holding · Hepta Lab · XAI · Hyatt Regency",
      "L3M Holding · Hepta Lab · XAI · Hyatt Regency",
    ),
  },
  projects: {
    title: text("Projects", "Projets"),
    subtitle: text(
      "From a shared model to an AI that takes action.",
      "Du modèle partagé à l’IA qui passe à l’action.",
    ),
    preview: text(
      "FASA · Attendance AI · Chifaa + 6 more",
      "FASA · Assistant de présence · Chifaa + 6 autres",
    ),
  },
  research: {
    title: text("Research", "Recherche"),
    subtitle: text(
      "I like building. I also like asking why.",
      "J’aime construire. Et comprendre pourquoi.",
    ),
    preview: text(
      "Arabic NLP · Model robustness · Digital twins",
      "TAL arabe · Robustesse des modèles · Jumeaux numériques",
    ),
  },
  education: {
    title: text("Education", "Formation"),
    subtitle: text(
      "Engineering, a club, and a team win.",
      "Un cycle ingénieur, un club et une victoire en équipe.",
    ),
    preview: text(
      "ENSIASD ’27 · EST Safi ’24 · AI Summer School",
      "ENSIASD ’27 · EST Safi ’24 · AI Summer School",
    ),
  },
  skills: {
    title: text("Skills", "Compétences"),
    subtitle: text(
      "The tools I reach for when it’s time to build.",
      "Les outils que j’utilise pour passer à l’action.",
    ),
    preview: text(
      "Python · PyTorch · React · LLMs · Docker",
      "Python · PyTorch · React · LLM · Docker",
    ),
  },
};

export const projectOverview: Record<
  string,
  { summary: Localized; badge: Localized }
> = {
  fasa: {
    summary: text(
      "Train Arabic sentiment models across three simulated clients. Compare what changes when the data stays distributed.",
      "Entraîner des modèles de sentiments en arabe sur trois clients simulés. Comparer les résultats quand les données restent distribuées.",
    ),
    badge: text("3 simulated clients", "3 clients simulés"),
  },
  attendance: {
    summary: text(
      "Ask about attendance. Update a record. Check it worked. An AI assistant with manager-specific access.",
      "Consulter les présences. Modifier une fiche. Vérifier le succès. Un assistant IA avec des accès propres à chaque responsable.",
    ),
    badge: text("Tools + access control", "Outils + contrôle d’accès"),
  },
  chifaa: {
    summary: text(
      "Bring OCR, clinical risk prediction, and MRI classification into one Flutter prototype.",
      "Réunir OCR, prédiction des risques cliniques et classification d’IRM dans un prototype Flutter.",
    ),
    badge: text("OCR → models → app", "OCR → modèles → appli"),
  },
  swin: {
    summary: text(
      "Put a face anti-spoofing model through FGSM and PGD attacks, then explore adversarial training.",
      "Tester un modèle anti-usurpation faciale avec FGSM et PGD, puis explorer l’entraînement adversarial.",
    ),
    badge: text("Robustness under attack", "Robustesse face aux attaques"),
  },
  foundercopilot: {
    summary: text(
      "Help Moroccan founders find administrative information using an agentic RAG assistant.",
      "Aider les entrepreneurs marocains à trouver les informations administratives avec un assistant RAG agentique.",
    ),
    badge: text("Context-aware answers", "Réponses contextualisées"),
  },
  cvfit: {
    summary: text(
      "Give tailored CV feedback and connect it to collected, ranked job opportunities.",
      "Proposer des retours personnalisés sur les CV et les relier à des offres collectées et classées.",
    ),
    badge: text("CV feedback + job matching", "Conseils CV + offres ciblées"),
  },
  hotel: {
    summary: text(
      "Predict booking cancellations with Random Forest alongside a mobile reservation application.",
      "Prédire les annulations avec Random Forest, en parallèle d’une application mobile de réservation.",
    ),
    badge: text("Prediction meets software", "Prédiction + logiciel"),
  },
  emotion: {
    summary: text(
      "Fine-tune BERT for text emotions. Use TRILL and CNN-LSTM to explore emotion in voice.",
      "Affiner BERT pour les émotions textuelles. Explorer les émotions vocales avec TRILL et CNN-LSTM.",
    ),
    badge: text("Text + voice", "Texte + voix"),
  },
  elasticsearch: {
    summary: text(
      "Move sales CSVs through Logstash, a two-node Elasticsearch cluster, and Kibana.",
      "Faire passer les CSV de ventes par Logstash, un cluster Elasticsearch à deux nœuds et Kibana.",
    ),
    badge: text("Ingest → index → explore", "Ingérer → indexer → explorer"),
  },
};

export const experienceOverview: Record<string, Localized> = {
  l3m: text(
    "AI agents for everyday operations. Attendance tools, scoped access, and reliable updates.",
    "Des agents IA pour les opérations quotidiennes : présences, accès limités et modifications fiables.",
  ),
  hepta: text(
    "Industrial digital twins, safe scenario simulations, and the FedTwin vision paper.",
    "Jumeaux numériques industriels, simulations de scénarios et papier de vision FedTwin.",
  ),
  xai: text(
    "Emotion recognition from text and voice, built around real-time constraints.",
    "Reconnaissance des émotions par texte et voix, avec des contraintes de temps réel.",
  ),
  hyatt: text(
    "Booking cancellation prediction and a mobile reservation app.",
    "Prédiction des annulations et application mobile de réservation.",
  ),
};

export const researchOverview = [
  text(
    "Can Arabic sentiment models learn with distributed data?",
    "Les modèles de sentiments en arabe peuvent-ils apprendre sur des données distribuées ?",
  ),
  text(
    "What happens to face anti-spoofing models under attack?",
    "Comment les modèles anti-usurpation faciale réagissent-ils aux attaques ?",
  ),
  text(
    "How could federated digital twins support predictive maintenance?",
    "Comment les jumeaux numériques fédérés pourraient-ils aider la maintenance prédictive ?",
  ),
];

export const overviewCopy = {
  en: {
    hello: "HEY, I’M MOUHSIN TANANI",
    heroFirst: "AI ideas.",
    heroSecond: "Real things.",
    intro:
      "I build models, agents, and apps. Final-year AI & Data engineering student, curious about what comes next.",
    note: "ENSIASD · Morocco · Graduating 2027",
    available: "PFE internship · January 2027",
    experienceAction: "See my experience",
    projectsAction: "Explore projects",
    quickTitle: "A quick look at what I do",
    tileModel: "Train a model.",
    tileModelNote: "Arabic NLP & federated learning",
    tileAgent: "Build an agent.",
    tileAgentNote: "Tools, APIs & useful automation",
    tileApp: "Make it usable.",
    tileAppNote: "From prediction to an interface",
    proofInternships: "internships",
    proofProjects: "projects",
    proofLanguages: "languages, one portfolio",
    explore: "THE SHORT VERSION. THE DETAILS IF YOU WANT THEM.",
    expand: "Open section",
    collapse: "Close section",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    experienceDetails: "What I worked on",
    highlights: "Highlights",
    projectDetails: "Take a look",
    deeper: "Go a little deeper",
    contribution: "What I built",
    results: "What’s documented",
    researchNote:
      "Reports and a vision paper—not claims of peer-reviewed publication.",
    skillsNote:
      "Different tools, different levels of experience. Follow a project to see how I used them.",
    contactTitle: "Something in mind?",
    contactText: "Let’s talk AI, internships, or a good idea.",
    opportunity:
      "Looking for a six-month PFE internship from January 2027, preferably in France or Europe.",
    email: "Say hello",
    contact: "Contact",
    allCount: "in total",
  },
  fr: {
    hello: "SALUT, MOI C’EST MOUHSIN TANANI",
    heroFirst: "Des idées IA.",
    heroSecond: "Des projets concrets.",
    intro:
      "Je construis des modèles, des agents et des applications. Élève ingénieur en dernière année en IA & Data, curieux de la suite.",
    note: "ENSIASD · Maroc · Diplôme en 2027",
    available: "Stage PFE · Janvier 2027",
    experienceAction: "Voir mon expérience",
    projectsAction: "Explorer les projets",
    quickTitle: "Un aperçu de ce que je fais",
    tileModel: "Entraîner un modèle.",
    tileModelNote: "TAL arabe & apprentissage fédéré",
    tileAgent: "Créer un agent.",
    tileAgentNote: "Outils, API & automatisation utile",
    tileApp: "Le rendre utile.",
    tileAppNote: "De la prédiction à l’interface",
    proofInternships: "stages",
    proofProjects: "projets",
    proofLanguages: "langues, un portfolio",
    explore: "L’ESSENTIEL. LES DÉTAILS SI VOUS LE SOUHAITEZ.",
    expand: "Ouvrir la section",
    collapse: "Fermer la section",
    expandAll: "Tout ouvrir",
    collapseAll: "Tout fermer",
    experienceDetails: "Ce que j’ai fait",
    highlights: "À la une",
    projectDetails: "Découvrir",
    deeper: "Un peu plus en détail",
    contribution: "Ce que j’ai construit",
    results: "Les résultats documentés",
    researchNote:
      "Des rapports et un papier de vision, sans revendiquer de publication évaluée par les pairs.",
    skillsNote:
      "Des outils et des niveaux d’expérience différents. Les projets montrent leurs usages concrets.",
    contactTitle: "Une idée en tête ?",
    contactText: "Parlons IA, stage ou projet à explorer.",
    opportunity:
      "Je cherche un stage PFE de six mois dès janvier 2027, de préférence en France ou en Europe.",
    email: "Échangeons",
    contact: "Contact",
    allCount: "au total",
  },
};
