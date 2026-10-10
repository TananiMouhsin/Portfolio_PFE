import { text, type Category, type Localized } from "./content";

export const categoryLabels: Record<Category, Localized> = {
  ai: text("AI assistants", "Assistants IA"),
  ml: text("Predictions", "Prédictions"),
  multimodal: text("Text & voice", "Texte & voix"),
  research: text("Experiments", "Expériences"),
  data: text("Data tools", "Outils de données"),
};

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
      "Where I’ve learned by doing.",
      "Là où j’ai appris en pratiquant.",
    ),
    preview: text(
      "L3M Holding · Hepta Lab · XAI · Hyatt Regency",
      "L3M Holding · Hepta Lab · XAI · Hyatt Regency",
    ),
  },
  projects: {
    title: text("Projects", "Projets"),
    subtitle: text(
      "A few things I’ve built and tried.",
      "Quelques idées que j’ai mises en pratique.",
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
      "What I’m learning, in and out of class.",
      "Ce que j’apprends, en cours et en dehors.",
    ),
    preview: text(
      "ENSIASD ’27 · EST Safi ’24 · AI Summer School",
      "ENSIASD ’27 · EST Safi ’24 · AI Summer School",
    ),
  },
  skills: {
    title: text("Skills", "Compétences"),
    subtitle: text(
      "What’s in my toolbox.",
      "Ce qu’il y a dans ma boîte à outils.",
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
      "Teaching AI to recognize sentiment in Arabic text. I compared training together with training across three simulated clients.",
      "Apprendre à l’IA à reconnaître les sentiments dans les textes arabes. J’ai comparé un entraînement centralisé à trois clients simulés.",
    ),
    badge: text("Understanding Arabic text", "Comprendre les textes arabes"),
  },
  attendance: {
    summary: text(
      "An assistant managers can ask about attendance. It checks permissions before updating records, then checks the result.",
      "Un assistant auquel les responsables peuvent poser des questions sur les présences. Il vérifie les accès avant de modifier les données, puis le résultat.",
    ),
    badge: text("A helper for everyday work", "Un assistant pour le quotidien"),
  },
  chifaa: {
    summary: text(
      "A health-tech prototype that reads clinical information and explores risk prediction and medical scan classification.",
      "Un prototype en santé qui lit des informations cliniques et explore la prédiction des risques et la classification d’images médicales.",
    ),
    badge: text("Exploring AI for health", "Explorer l’IA en santé"),
  },
  swin: {
    summary: text(
      "Can a face anti-spoofing AI be fooled? I tested how it responds to manipulated images and explored ways to train it against attacks.",
      "Peut-on tromper une IA anti-usurpation faciale ? J’ai testé sa réaction aux images modifiées et exploré un entraînement contre ces attaques.",
    ),
    badge: text("Testing what can go wrong", "Tester ce qui peut mal tourner"),
  },
  foundercopilot: {
    summary: text(
      "An assistant that helps Moroccan entrepreneurs find answers about administrative steps, using information it retrieves.",
      "Un assistant qui aide les entrepreneurs marocains à trouver des réponses sur les démarches administratives, à partir des informations qu’il retrouve.",
    ),
    badge: text("Context-aware answers", "Réponses contextualisées"),
  },
  cvfit: {
    summary: text(
      "Personalized CV feedback and job suggestions, brought together in one application.",
      "Des conseils personnalisés pour le CV et des suggestions d’offres, réunis dans une application.",
    ),
    badge: text("CV feedback + job matching", "Conseils CV + offres ciblées"),
  },
  hotel: {
    summary: text(
      "Using booking data to predict cancellations, alongside a mobile hotel reservation app.",
      "Utiliser les données de réservation pour prédire les annulations, en parallèle d’une application mobile de réservation hôtelière.",
    ),
    badge: text("Prediction meets software", "Prédiction + logiciel"),
  },
  emotion: {
    summary: text(
      "Exploring emotions in messages and voice, with separate AI approaches for text and audio.",
      "Explorer les émotions dans les messages et la voix, avec des approches IA distinctes pour le texte et l’audio.",
    ),
    badge: text("Text + voice", "Texte + voix"),
  },
  elasticsearch: {
    summary: text(
      "Turning a CSV of sales into data I can search and explore with Elasticsearch and Kibana.",
      "Transformer un CSV de ventes en données que je peux rechercher et explorer avec Elasticsearch et Kibana.",
    ),
    badge: text("Ingest → index → explore", "Ingérer → indexer → explorer"),
  },
};

export const experienceOverview: Record<string, Localized> = {
  l3m: text(
    "I worked on an AI assistant to help managers check and update attendance.",
    "J’ai travaillé sur un assistant IA pour aider les responsables à consulter et modifier les présences.",
  ),
  hepta: text(
    "I explored industrial what-if scenarios and helped write the FedTwin vision paper.",
    "J’ai exploré des scénarios industriels et participé à l’écriture du papier de vision FedTwin.",
  ),
  xai: text(
    "I worked on recognizing emotions in text and voice, with real-time use in mind.",
    "J’ai travaillé sur la reconnaissance des émotions dans le texte et la voix, avec le temps réel en tête.",
  ),
  hyatt: text(
    "I worked on booking predictions and a mobile hotel reservation app.",
    "J’ai travaillé sur la prédiction des annulations et une application mobile de réservation hôtelière.",
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
    hello: "Welcome to my little corner of the internet",
    heroFirst: "Hi, I’m Mouhsin.",
    heroSecond: "I build with AI.",
    intro:
      "I’m an AI & Data engineering student in Morocco. I like figuring things out, building them, and seeing what works. Here’s a little of what I’ve been up to.",
    note: "Final year at ENSIASD · Graduating 2027",
    available: "PFE internship · January 2027",
    experienceAction: "Where I’ve worked",
    projectsAction: "See what I’ve made",
    quickTitle: "Three things I’ve been working on",
    miniRole: "AI student. Curious builder.",
    cardHint: "Pick a card to see the project.",
    tileModel: "Understanding language",
    tileModelNote: "FASA · learning from Arabic text",
    tileAgent: "Making work easier",
    tileAgentNote: "An assistant for attendance questions",
    tileApp: "Building useful apps",
    tileAppNote: "Chifaa · exploring AI for health",
    proofInternships: "places I’ve learned",
    proofProjects: "projects to explore",
    proofLanguages: "pick your language above",
    explore: "Pick a section. Take a look around.",
    expand: "Open",
    collapse: "Close",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    experienceDetails: "What I worked on",
    highlights: "Highlights",
    projectDetails: "See the project",
    deeper: "Curious about the technical bits?",
    contribution: "My part in it",
    results: "How it turned out",
    researchNote:
      "A few questions I’ve been digging into. FedTwin is a co-written vision paper.",
    skillsNote:
      "Different tools, different levels of experience. Follow a project to see how I used them.",
    contactTitle: "Let’s say hello.",
    contactText:
      "Have a project, a question, or an internship in mind? I’d love to hear about it.",
    opportunity:
      "Looking for a six-month PFE internship from January 2027, preferably in France or Europe.",
    email: "Say hello",
    contact: "Contact",
    allCount: "in total",
  },
  fr: {
    hello: "Bienvenue dans mon petit coin d’internet",
    heroFirst: "Salut, c’est Mouhsin.",
    heroSecond: "Je crée avec l’IA.",
    intro:
      "Je suis élève ingénieur en IA & Data au Maroc. J’aime comprendre les choses, les construire et voir ce qui fonctionne. Voici un peu de ce que je fais.",
    note: "Dernière année à ENSIASD · Diplôme en 2027",
    available: "Stage PFE · Janvier 2027",
    experienceAction: "Là où j’ai travaillé",
    projectsAction: "Voir mes créations",
    quickTitle: "Trois choses sur lesquelles j’ai travaillé",
    miniRole: "Élève ingénieur. Curieux et créatif.",
    cardHint: "Choisissez une carte pour voir le projet.",
    tileModel: "Comprendre le langage",
    tileModelNote: "FASA · apprendre à partir du texte arabe",
    tileAgent: "Simplifier le quotidien",
    tileAgentNote: "Un assistant pour les présences",
    tileApp: "Créer des applis utiles",
    tileAppNote: "Chifaa · explorer l’IA en santé",
    proofInternships: "lieux où j’ai appris",
    proofProjects: "projets à découvrir",
    proofLanguages: "choisissez votre langue en haut",
    explore: "Choisissez une rubrique. Faites un tour.",
    expand: "Ouvrir",
    collapse: "Fermer",
    expandAll: "Tout ouvrir",
    collapseAll: "Tout fermer",
    experienceDetails: "Ce que j’ai fait",
    highlights: "À la une",
    projectDetails: "Découvrir",
    deeper: "Envie de voir la partie technique ?",
    contribution: "Ce que j’y ai apporté",
    results: "Ce que ça a donné",
    researchNote:
      "Quelques questions que j’ai explorées. FedTwin est un papier de vision corédigé.",
    skillsNote:
      "Des outils et des niveaux d’expérience différents. Les projets montrent leurs usages concrets.",
    contactTitle: "Et si on échangeait ?",
    contactText:
      "Un projet, une question ou un stage en tête ? Je serais ravi d’en discuter.",
    opportunity:
      "Je cherche un stage PFE de six mois dès janvier 2027, de préférence en France ou en Europe.",
    email: "Échangeons",
    contact: "Contact",
    allCount: "au total",
  },
};
