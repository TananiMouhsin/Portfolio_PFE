// Edit portfolio facts and both language versions here. Empty fields stay private.
export type Language = "en" | "fr";
export type Localized = { en: string; fr: string };
export const text = (en: string, fr: string): Localized => ({ en, fr });

export const profile = {
  name: "Mouhsin Tanani",
  email: "tananimouhsin@gmail.com",
  github: "https://github.com/TananiMouhsin",
  linkedin: "https://www.linkedin.com/in/mouhsin-tanani-692b87263/",
  phone: "+212 6 87 01 14 68",
  // Add the real PDF to public/ and set its path, e.g. './mouhsin-tanani-cv.pdf'.
  cvPath: "",
};

export const categories = [
  {
    id: "ai",
    label: text("Applied AI & Generative AI", "IA appliquée & générative"),
  },
  {
    id: "ml",
    label: text(
      "Data Science & Machine Learning",
      "Science des données & apprentissage automatique",
    ),
  },
  {
    id: "multimodal",
    label: text(
      "Computer Vision & Multimodal Learning",
      "Vision par ordinateur & apprentissage multimodal",
    ),
  },
  {
    id: "research",
    label: text(
      "Research & Federated Learning",
      "Recherche & apprentissage fédéré",
    ),
  },
  {
    id: "data",
    label: text(
      "Data Engineering & Analytics",
      "Ingénierie & analyse des données",
    ),
  },
] as const;
export type Category = (typeof categories)[number]["id"];
export type ProjectLink = {
  label: Localized;
  url: string;
  available: boolean;
  editingNote?: string;
};
export type Project = {
  id: string;
  number: string;
  title: Localized;
  subtitle: Localized;
  category: Category;
  tags: Localized[];
  context: Localized;
  description: Localized;
  problem: Localized;
  contribution: Localized;
  approach: Localized;
  results: Localized;
  limitations: Localized;
  technologies: string[];
  links: ProjectLink[];
  featured?: boolean;
  editing?: Record<string, string>;
};
const repoLink = (url: string): ProjectLink => ({
  label: text("View repository", "Voir le dépôt"),
  url,
  available: true,
});
const reportLink = (url: string): ProjectLink => ({
  label: text("Read research report", "Lire le rapport de recherche"),
  url,
  available: true,
});

export const projects: Project[] = [
  {
    id: "fasa",
    number: "01",
    title: text("FASA", "FASA"),
    subtitle: text(
      "Federated Arabic Sentiment Analysis",
      "Analyse fédérée des sentiments en arabe",
    ),
    category: "research",
    tags: [
      text("NLP", "TAL"),
      text("Federated learning", "Apprentissage fédéré"),
    ],
    context: text("Research study", "Étude de recherche"),
    featured: true,
    description: text(
      "One research question. Three clients. A shared model, without bringing their data together.",
      "Une question de recherche. Trois clients. Un modèle partagé, sans regrouper leurs données.",
    ),
    problem: text(
      "How does federated AraBERT training compare with centralized training under common experimental conditions?",
      "Comment l’entraînement fédéré d’AraBERT se compare-t-il à l’entraînement centralisé dans des conditions expérimentales communes ?",
    ),
    contribution: text(
      "I built an experimental comparison of centralized and federated Arabic sentiment analysis, including external-corpus evaluation and a study of text cleaning.",
      "J’ai construit une comparaison expérimentale de l’analyse des sentiments en arabe, centralisée et fédérée, avec une évaluation sur des corpus externes et une étude du nettoyage des textes.",
    ),
    approach: text(
      "Simulate three clients with Flower and FedAvg. Exchange model updates rather than centralizing client data. Evaluate on two external corpora and compare the effect of removing emojis and mentions.",
      "Simuler trois clients avec Flower et FedAvg. Échanger les mises à jour du modèle plutôt que centraliser les données. Évaluer sur deux corpus externes et comparer l’effet de la suppression des émojis et mentions.",
    ),
    results: text(
      "The study compares training settings and external generalization. The linked materials contain the experiments; no numerical results are reproduced here without their source data.",
      "L’étude compare les modes d’entraînement et la généralisation externe. Les documents associés présentent les expériences ; aucun résultat chiffré n’est reproduit ici sans les données sources.",
    ),
    limitations: text(
      "Federation does not guarantee privacy or better accuracy. Simulated clients are a controlled experiment, not evidence of a deployed distributed system.",
      "La fédération ne garantit ni la confidentialité ni une meilleure précision. Les clients simulés constituent une expérience contrôlée, pas la preuve d’un système distribué déployé.",
    ),
    technologies: ["Python", "AraBERT", "Flower", "FedAvg"],
    links: [
      repoLink("https://github.com/TananiMouhsin/FASA"),
      reportLink(
        "https://drive.google.com/drive/folders/1pQfGc5Q-gkM25zULDfh4VB2HXGGHpJwM?hl=fr",
      ),
    ],
  },
  {
    id: "attendance",
    number: "02",
    title: text(
      "Attendance AI Assistant",
      "Assistant IA de gestion des présences",
    ),
    subtitle: text(
      "Tools with purpose. Access with boundaries.",
      "Des outils utiles. Des accès maîtrisés.",
    ),
    category: "ai",
    tags: [
      text("AI agents", "Agents IA"),
      text("Automation", "Automatisation"),
    ],
    context: text("Internship · L3M Holding", "Stage · L3M Holding"),
    featured: true,
    description: text(
      "A conversational bridge between managers, attendance data, and everyday operations.",
      "Un lien conversationnel entre les responsables, les données de présence et les opérations quotidiennes.",
    ),
    problem: text(
      "How can a manager retrieve and update attendance information conversationally while respecting employee access permissions?",
      "Comment un responsable peut-il consulter et modifier les présences par conversation tout en respectant les droits d’accès aux employés ?",
    ),
    contribution: text(
      "I analyzed operational needs and designed AI architectures for internal process automation, connecting conversational tools to attendance APIs and interfaces.",
      "J’ai analysé les besoins opérationnels et conçu des architectures IA pour automatiser les processus internes, en reliant les outils conversationnels aux API et interfaces de présence.",
    ),
    approach: text(
      "Use n8n and Gemini to orchestrate retrieval and update tools. Scope access to each manager’s employees, retrieve records before updates, and check the operation result. The broader dashboard covers monthly views, employee administration, summaries, and notifications.",
      "Utiliser n8n et Gemini pour orchestrer les outils de consultation et de modification. Limiter l’accès aux employés de chaque responsable, consulter les données avant modification et vérifier le résultat. Le tableau de bord comprend des vues mensuelles, l’administration des employés, des synthèses et des notifications.",
    ),
    results: text(
      "The documented workflow connects agent tools, attendance data, and a React interface. The schematic is illustrative; it does not display real employee records or imply every feature is in production.",
      "Le flux documenté relie les outils de l’agent, les données de présence et une interface React. Le schéma est illustratif : il ne présente aucune donnée réelle d’employé et ne suppose pas que toutes les fonctionnalités sont en production.",
    ),
    limitations: text(
      "Reliable updates need authorization and explicit success checks. No adoption figures or business savings have been measured here.",
      "Des modifications fiables nécessitent une autorisation et une vérification explicite du succès. Aucun chiffre d’adoption ou d’économie n’est présenté ici.",
    ),
    technologies: [
      "n8n",
      "Gemini",
      "REST APIs",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "WhatsApp Cloud API",
    ],
    links: [],
  },
  {
    id: "chifaa",
    number: "03",
    title: text("Chifaa", "Chifaa"),
    subtitle: text(
      "Clinical data meets medical imaging.",
      "Données cliniques et imagerie médicale.",
    ),
    category: "ml",
    tags: [
      text("Computer vision", "Vision par ordinateur"),
      text("Health AI", "IA en santé"),
    ],
    context: text("Prototype", "Prototype"),
    featured: true,
    description: text(
      "Exploring risk prediction and MRI classification in one accessible application.",
      "Explorer la prédiction des risques et la classification d’IRM dans une application accessible.",
    ),
    problem: text(
      "How can extracted clinical information and medical images support an experimental prediction workflow?",
      "Comment des informations cliniques extraites et des images médicales peuvent-elles alimenter un flux de prédiction expérimental ?",
    ),
    contribution: text(
      "I worked on a prototype combining OCR extraction, stroke and heart-failure risk prediction, and Alzheimer-related MRI classification with a Flutter interface.",
      "J’ai travaillé sur un prototype combinant extraction OCR, prédiction des risques d’AVC et d’insuffisance cardiaque, et classification d’IRM liées à Alzheimer, avec une interface Flutter.",
    ),
    approach: text(
      "Extract clinical information through OCR. Use SVM and Random Forest for risk prediction, and a ResNet model for MRI classification. Connect the components through an application workflow.",
      "Extraire les informations cliniques par OCR. Utiliser SVM et Random Forest pour la prédiction des risques, et ResNet pour la classification des IRM. Relier ces composants dans un parcours applicatif.",
    ),
    results: text(
      "My research CV reports recall above 90% for risk prediction and accuracy above 85% for MRI classification. These are experimental model results, not clinical validation.",
      "Mon CV de recherche indique un rappel supérieur à 90 % pour la prédiction des risques et une exactitude supérieure à 85 % pour la classification des IRM. Il s’agit de résultats expérimentaux, pas d’une validation clinique.",
    ),
    limitations: text(
      "The prototype is not a clinically validated diagnostic product. Dataset and validation details should be reviewed before interpreting the reported metrics.",
      "Le prototype n’est pas un produit diagnostique validé cliniquement. Les détails des jeux de données et de la validation doivent être examinés avant d’interpréter ces métriques.",
    ),
    technologies: [
      "Python",
      "TensorFlow",
      "ResNet",
      "OCR",
      "Flutter",
      "SVM",
      "Random Forest",
    ],
    links: [repoLink("https://github.com/TananiMouhsin/Chifaa")],
  },
  {
    id: "swin",
    number: "04",
    title: text("Swin Transformer", "Swin Transformer"),
    subtitle: text(
      "Face anti-spoofing & adversarial robustness",
      "Anti-usurpation faciale & robustesse adversariale",
    ),
    category: "research",
    tags: [
      text("Computer vision", "Vision par ordinateur"),
      text("Robustness", "Robustesse"),
    ],
    context: text("Research study", "Étude de recherche"),
    description: text(
      "Testing what a face anti-spoofing model learns—and how it behaves under attack.",
      "Étudier ce qu’apprend un modèle anti-usurpation faciale et son comportement face aux attaques.",
    ),
    problem: text(
      "Which transfer-learning strategies help adapt a Swin Transformer to face anti-spoofing, and how resistant is it to adversarial perturbations?",
      "Quelles stratégies de transfert adaptent un Swin Transformer à l’anti-usurpation faciale, et quelle est sa résistance aux perturbations adversariales ?",
    ),
    contribution: text(
      "I compared transfer-learning strategies on LCC FASD, evaluated FGSM and PGD attacks, and implemented adversarial training.",
      "J’ai comparé des stratégies de transfert sur LCC FASD, évalué les attaques FGSM et PGD et mis en œuvre un entraînement adversarial.",
    ),
    approach: text(
      "Adapt the pretrained architecture, compare training strategies, then examine detection quality and robustness under FGSM and PGD perturbations.",
      "Adapter l’architecture préentraînée, comparer les stratégies d’entraînement, puis examiner la qualité de détection et la robustesse aux perturbations FGSM et PGD.",
    ),
    results: text(
      "The research report documents the comparison. Numerical scores and experimental conclusions are not reproduced without the underlying results.",
      "Le rapport de recherche documente la comparaison. Les scores et conclusions expérimentales ne sont pas reproduits sans les résultats sources.",
    ),
    limitations: text(
      "Robustness depends on the attack and evaluation setup. Adversarial training does not establish resistance to every possible attack.",
      "La robustesse dépend de l’attaque et du protocole d’évaluation. L’entraînement adversarial ne prouve pas une résistance à toutes les attaques possibles.",
    ),
    technologies: ["Python", "Swin Transformer", "FGSM", "PGD"],
    links: [
      repoLink("https://github.com/TananiMouhsin/swin-spoof-detection"),
      reportLink(
        "https://drive.google.com/file/d/1BxORZ_4S6Ih499ufgap42cfk5tR8yUWR/view?usp=sharing",
      ),
    ],
  },
  {
    id: "foundercopilot",
    number: "05",
    title: text("FounderCopilot", "FounderCopilot"),
    subtitle: text(
      "An information companion for entrepreneurs",
      "Un assistant d’information pour les entrepreneurs",
    ),
    category: "ai",
    tags: [text("RAG", "RAG"), text("AI agents", "Agents IA")],
    context: text("Full-stack project", "Projet full-stack"),
    description: text(
      "Contextual answers to help young Moroccan entrepreneurs navigate administrative procedures.",
      "Des réponses contextualisées pour aider les jeunes entrepreneurs marocains à comprendre les démarches administratives.",
    ),
    problem: text(
      "How can an assistant make administrative information easier to find and understand for young Moroccan entrepreneurs?",
      "Comment un assistant peut-il faciliter la recherche et la compréhension des informations administratives pour les jeunes entrepreneurs marocains ?",
    ),
    contribution: text(
      "I built a full-stack assistant using an agentic retrieval-augmented generation pipeline for contextual answers.",
      "J’ai construit un assistant full-stack avec un pipeline agentique de génération augmentée par récupération pour des réponses contextualisées.",
    ),
    approach: text(
      "Retrieve relevant material with ChromaDB, orchestrate the workflow with LangChain and LangGraph, and use Gemini to generate an answer grounded in retrieved context.",
      "Retrouver les documents pertinents avec ChromaDB, orchestrer le parcours avec LangChain et LangGraph, puis utiliser Gemini pour générer une réponse à partir du contexte récupéré.",
    ),
    results: text(
      "The project connects retrieval, orchestration, and answer generation in a full-stack workflow. No answer-quality benchmark is supplied.",
      "Le projet relie récupération, orchestration et génération de réponses dans un parcours full-stack. Aucun benchmark de qualité des réponses n’est fourni.",
    ),
    limitations: text(
      "Retrieved context can be incomplete or outdated. Generated answers do not guarantee correctness and should be checked against official information.",
      "Le contexte récupéré peut être incomplet ou obsolète. Les réponses générées ne garantissent pas l’exactitude et doivent être vérifiées auprès des sources officielles.",
    ),
    technologies: ["Gemini", "LangChain", "LangGraph", "ChromaDB"],
    links: [repoLink("https://github.com/TananiMouhsin/FounderCopilot")],
  },
  {
    id: "cvfit",
    number: "06",
    title: text("CVFit", "CVFit"),
    subtitle: text(
      "CV improvement & job matching",
      "Amélioration de CV & recherche d’offres",
    ),
    category: "ai",
    tags: [
      text("LLMs", "Grands modèles de langage"),
      text("REST APIs", "API REST"),
    ],
    context: text("Application project", "Projet applicatif"),
    description: text(
      "Personalized CV recommendations, connected to collected and ranked job opportunities.",
      "Des recommandations personnalisées pour les CV, reliées à des offres d’emploi collectées et classées.",
    ),
    problem: text(
      "How can structured AI recommendations and relevant job offers support a more focused application process?",
      "Comment des recommandations IA structurées et des offres pertinentes peuvent-elles faciliter les candidatures ?",
    ),
    contribution: text(
      "I implemented structured prompting with the OpenAI API for personalized CV recommendations, job-offer collection, relevance ranking, and REST API integration.",
      "J’ai mis en œuvre des prompts structurés avec l’API OpenAI pour des recommandations personnalisées, la collecte d’offres, leur classement par pertinence et l’intégration d’API REST.",
    ),
    approach: text(
      "Use Java and Spring Boot for the API, Jsoup for collecting job offers, and structured OpenAI prompts for CV feedback. Rank offers by relevance to the candidate.",
      "Utiliser Java et Spring Boot pour l’API, Jsoup pour collecter les offres, et des prompts OpenAI structurés pour les retours sur le CV. Classer les offres selon leur pertinence pour le candidat.",
    ),
    results: text(
      "The workflow combines recommendations and job matching. No measured hiring or conversion outcomes are supplied.",
      "Le parcours combine recommandations et recherche d’offres. Aucun résultat mesuré sur les recrutements ou les conversions n’est fourni.",
    ),
    limitations: text(
      "Recommendations need human review; job-offer availability and relevance depend on the collected sources.",
      "Les recommandations nécessitent une relecture humaine ; la disponibilité et la pertinence des offres dépendent des sources collectées.",
    ),
    technologies: ["Java", "Spring Boot", "OpenAI API", "Jsoup"],
    links: [repoLink("https://github.com/TananiMouhsin/CVFit")],
  },
  {
    id: "hotel",
    number: "07",
    title: text(
      "Hotel Booking Prediction",
      "Prédiction des annulations hôtelières",
    ),
    subtitle: text(
      "From booking data to application development",
      "Des réservations au développement applicatif",
    ),
    category: "ml",
    tags: [text("Classification", "Classification")],
    context: text("Internship · Hyatt Regency", "Stage · Hyatt Regency"),
    description: text(
      "Connecting cancellation prediction with a mobile hotel reservation application.",
      "Relier la prédiction des annulations à une application mobile de réservation hôtelière.",
    ),
    problem: text(
      "How can booking data help anticipate cancellations and inform hotel reservation workflows?",
      "Comment les données de réservation peuvent-elles aider à anticiper les annulations et éclairer les parcours de réservation ?",
    ),
    contribution: text(
      "During my Hyatt Regency internship, I worked on a Random Forest cancellation model and a mobile hotel reservation application.",
      "Pendant mon stage au Hyatt Regency, j’ai travaillé sur un modèle Random Forest de prédiction des annulations et une application mobile de réservation.",
    ),
    approach: text(
      "Model the cancellation question as a classification task with Random Forest, alongside development of the reservation application.",
      "Modéliser la question des annulations comme une tâche de classification avec Random Forest, en parallèle du développement de l’application de réservation.",
    ),
    results: text(
      "The internship connects predictive analysis with application development. Quantitative performance and business impact are not supplied.",
      "Le stage relie l’analyse prédictive au développement applicatif. Les performances chiffrées et l’impact métier ne sont pas fournis.",
    ),
    limitations: text(
      "Dataset, preprocessing, validation, and interpretation details are not available for this public case study.",
      "Les détails du jeu de données, du prétraitement, de la validation et de l’interprétation ne sont pas disponibles pour cette étude publique.",
    ),
    technologies: ["Random Forest"],
    links: [],
    editing: {
      dataset: "",
      preprocessing: "",
      validation: "",
      metrics: "",
      interpretation: "",
      repository: "",
    },
  },
  {
    id: "emotion",
    number: "08",
    title: text(
      "Multimodal Emotion Recognition",
      "Reconnaissance multimodale des émotions",
    ),
    subtitle: text(
      "Two modalities. Distinct representations.",
      "Deux modalités. Des représentations distinctes.",
    ),
    category: "multimodal",
    tags: [text("NLP", "TAL"), text("Audio", "Audio")],
    context: text("Internship · XAI", "Stage · XAI"),
    description: text(
      "Text and voice emotion recognition, designed around real-time constraints.",
      "Reconnaissance des émotions textuelles et vocales, avec des contraintes de temps réel.",
    ),
    problem: text(
      "How can text and vocal signals support real-time emotion recognition while limiting latency and raw media storage?",
      "Comment les signaux textuels et vocaux peuvent-ils permettre une reconnaissance des émotions en temps réel tout en limitant la latence et le stockage des médias bruts ?",
    ),
    contribution: text(
      "At XAI, I fine-tuned BERT for six text emotion classes and worked with TRILL embeddings plus a CNN-LSTM for three vocal emotion categories.",
      "Chez XAI, j’ai affiné BERT pour six classes d’émotions textuelles et travaillé avec des embeddings TRILL et un CNN-LSTM pour trois catégories d’émotions vocales.",
    ),
    approach: text(
      "BERT represents text semantics. TRILL embeddings and CNN-LSTM use speech prosody for audio classification. The branches have different representations and label sets; they were not trained end to end together.",
      "BERT représente la sémantique des textes. Les embeddings TRILL et le CNN-LSTM exploitent la prosodie pour la classification audio. Les branches ont des représentations et étiquettes différentes ; elles n’ont pas été entraînées ensemble de bout en bout.",
    ),
    results: text(
      "My research CV reports text classification accuracy above 90%. No combined multimodal score or audio accuracy is supplied.",
      "Mon CV de recherche indique une exactitude supérieure à 90 % pour la classification textuelle. Aucun score multimodal combiné ni score audio n’est fourni.",
    ),
    limitations: text(
      "Low latency and avoiding raw media storage are practical constraints. Separate label sets limit direct comparison between the two branches.",
      "Une faible latence et l’absence de stockage des médias bruts sont des contraintes pratiques. Les étiquettes distinctes limitent la comparaison directe entre les deux branches.",
    ),
    technologies: ["BERT", "TRILL", "CNN-LSTM"],
    links: [],
  },
  {
    id: "elasticsearch",
    number: "09",
    title: text(
      "Elasticsearch Sales Analytics",
      "Analyse des ventes avec Elasticsearch",
    ),
    subtitle: text(
      "From CSV ingestion to data exploration",
      "De l’ingestion CSV à l’exploration des données",
    ),
    category: "data",
    tags: [
      text("Big data", "Big data"),
      text("Analytics", "Analyse de données"),
    ],
    context: text("Academic lab", "Travaux pratiques académiques"),
    description: text(
      "A two-node cluster and a reproducible ingestion workflow for exploring sales data.",
      "Un cluster à deux nœuds et un flux d’ingestion reproductible pour explorer les ventes.",
    ),
    problem: text(
      "How can sales records be ingested and explored through a containerized Elasticsearch stack?",
      "Comment ingérer et explorer des données de ventes avec une infrastructure Elasticsearch conteneurisée ?",
    ),
    contribution: text(
      "I worked on an academic big-data lab using a two-node Elasticsearch cluster, Logstash CSV ingestion, Kibana exploration, and Docker.",
      "J’ai réalisé des travaux pratiques de big data avec un cluster Elasticsearch à deux nœuds, l’ingestion CSV par Logstash, l’exploration Kibana et Docker.",
    ),
    approach: text(
      "Ingest date, product, city, quantity, and price fields from CSV through Logstash. Index records in Elasticsearch and explore them in Kibana.",
      "Ingérer les champs date, produit, ville, quantité et prix depuis un CSV via Logstash. Indexer les données dans Elasticsearch et les explorer avec Kibana.",
    ),
    results: text(
      "The lab establishes an ingestion and exploration workflow. No finished dashboard or production-scale benchmark is claimed.",
      "Les travaux établissent un flux d’ingestion et d’exploration. Aucun tableau de bord finalisé ni benchmark à l’échelle de la production n’est revendiqué.",
    ),
    limitations: text(
      "This is academic lab work, not a production deployment. Genuine Kibana screenshots can be added when available.",
      "Il s’agit de travaux académiques, pas d’un déploiement en production. De véritables captures Kibana pourront être ajoutées lorsqu’elles seront disponibles.",
    ),
    technologies: ["Elasticsearch", "Logstash", "Kibana", "Docker"],
    links: [],
    editing: { screenshots: "", repository: "" },
  },
];

export type Experience = {
  id: string;
  published: boolean;
  company: string;
  role: Localized;
  dates: Localized;
  location: Localized;
  summary: Localized;
  contributions: Localized[];
  technologies: string[];
  relatedProjects: string[];
};
export const experiences: Experience[] = [
  {
    id: "l3m",
    published: true,
    company: "L3M Holding",
    role: text(
      "AI & Innovation Project Manager Intern",
      "Stagiaire Chef de projet IA & Innovation",
    ),
    dates: text("Jul — Oct 2026", "Juil. — oct. 2026"),
    location: text("Paris, France · Remote", "Paris, France · À distance"),
    summary: text(
      "Turning operational needs into AI architectures for internal business automation.",
      "Transformer les besoins opérationnels en architectures IA pour automatiser les processus internes.",
    ),
    contributions: [
      text(
        "Designed an attendance assistant with scoped employee access, retrieval before updates, and operation checks.",
        "Conception d’un assistant de présence avec accès limité aux employés autorisés, consultation avant modification et vérification des opérations.",
      ),
    ],
    technologies: [
      "n8n",
      "Gemini",
      "React",
      "TypeScript",
      "Supabase",
      "REST APIs",
    ],
    relatedProjects: ["attendance"],
  },
  {
    id: "hepta",
    published: true,
    company: "Hepta Lab Advisory",
    role: text(
      "Systems & Architecture Intern",
      "Stagiaire — Systèmes & Architecture",
    ),
    dates: text("Jun — Aug 2026", "Juin — août 2026"),
    location: text("Paris, France · Remote", "Paris, France · À distance"),
    summary: text(
      "Needs analysis, specifications, and modeling for an industrial digital twin.",
      "Analyse des besoins, spécifications et modélisation d’un jumeau numérique industriel.",
    ),
    contributions: [
      text(
        "Contributed to in-memory scenario simulation without modifying production data.",
        "Contribution à la simulation de scénarios en mémoire sans modifier les données de production.",
      ),
      text(
        "Co-wrote the FedTwin vision paper: prior-work review and a research agenda for federated cognitive digital twins in predictive maintenance.",
        "Corédaction du papier de vision FedTwin : revue des travaux existants et programme de recherche sur les jumeaux numériques cognitifs fédérés pour la maintenance prédictive.",
      ),
    ],
    technologies: [],
    relatedProjects: [],
  },
  {
    id: "xai",
    published: true,
    company: "XAI / XAI.ma",
    role: text("AI & Data Science Intern", "Stagiaire IA & Data Science"),
    dates: text("Jul — Aug 2025", "Juil. — août 2025"),
    location: text("Rabat, Morocco", "Rabat, Maroc"),
    summary: text(
      "Real-time emotion recognition through text and audio, with distinct modeling approaches.",
      "Reconnaissance des émotions en temps réel à partir du texte et de l’audio, avec des approches distinctes.",
    ),
    contributions: [
      text(
        "Fine-tuned BERT for six text classes; explored TRILL and CNN-LSTM for three vocal emotion categories.",
        "Affinage de BERT pour six classes textuelles ; utilisation de TRILL et CNN-LSTM pour trois catégories vocales.",
      ),
    ],
    technologies: ["BERT", "TRILL", "CNN-LSTM"],
    relatedProjects: ["emotion"],
  },
  {
    id: "hyatt",
    published: true,
    company: "Hyatt Regency",
    role: text(
      "AI & Software Engineering Intern",
      "Stagiaire IA & Génie logiciel",
    ),
    dates: text("Apr — Jun 2024", "Avr. — juin 2024"),
    location: text("Casablanca, Morocco", "Casablanca, Maroc"),
    summary: text(
      "Connecting predictive analysis with a mobile hotel reservation experience.",
      "Relier l’analyse prédictive à une application mobile de réservation hôtelière.",
    ),
    contributions: [
      text(
        "Worked on Random Forest cancellation prediction and mobile reservation application development.",
        "Travail sur la prédiction des annulations avec Random Forest et le développement d’une application mobile de réservation.",
      ),
    ],
    technologies: ["Random Forest"],
    relatedProjects: ["hotel"],
  },
  {
    id: "experience-five",
    published: false,
    company: "[ADD_COMPANY]",
    role: text("[ADD_ROLE]", "[AJOUTER_POSTE]"),
    dates: text("[ADD_DATES]", "[AJOUTER_DATES]"),
    location: text("[ADD_LOCATION]", "[AJOUTER_LIEU]"),
    summary: text("[ADD_SUMMARY]", "[AJOUTER_RÉSUMÉ]"),
    contributions: [text("[ADD_CONTRIBUTIONS]", "[AJOUTER_CONTRIBUTIONS]")],
    technologies: ["[ADD_TECHNOLOGIES]"],
    relatedProjects: [],
  },
];

export const research = [
  {
    title: text(
      "Federated Arabic Sentiment Analysis",
      "Analyse fédérée des sentiments en arabe",
    ),
    type: text("Experimental report", "Rapport expérimental"),
    description: text(
      "Centralized and federated AraBERT, compared under common conditions.",
      "AraBERT centralisé et fédéré, comparés dans des conditions communes.",
    ),
    link: projects[0].links[1],
    project: "fasa",
  },
  {
    title: text(
      "Face Anti-Spoofing & Robustness",
      "Anti-usurpation faciale & robustesse",
    ),
    type: text("Research report", "Rapport de recherche"),
    description: text(
      "Transfer learning, adversarial attacks, and a Swin Transformer.",
      "Apprentissage par transfert, attaques adversariales et Swin Transformer.",
    ),
    link: projects[3].links[1],
    project: "swin",
  },
  {
    title: text("FedTwin", "FedTwin"),
    type: text("Co-written vision paper", "Papier de vision corédigé"),
    description: text(
      "A research agenda for federated cognitive digital twins in predictive maintenance. Written at Hepta Lab Advisory; not a peer-reviewed publication or completed federated implementation.",
      "Un programme de recherche sur les jumeaux numériques cognitifs fédérés pour la maintenance prédictive. Rédigé chez Hepta Lab Advisory ; il ne s’agit ni d’une publication évaluée par les pairs ni d’une implémentation fédérée achevée.",
    ),
    link: {
      label: text("Read vision paper", "Lire le papier de vision"),
      url: "https://drive.google.com/file/d/1W5K_3f0TdbP8fjLbBU4mRwhgV7J4kwVu/view?usp=sharing",
      available: true,
    },
    project: null,
  },
];

export const skills = [
  {
    name: text("Programming", "Programmation"),
    items: "Python · R · SQL · Java · JavaScript · TypeScript",
    evidence: "cvfit",
  },
  {
    name: text(
      "Data Science & Machine Learning",
      "Science des données & apprentissage automatique",
    ),
    items: text(
      "Preprocessing · Feature engineering · Classification · Regression · Evaluation · Cross-validation · Class imbalance · SHAP",
      "Prétraitement · Ingénierie des variables · Classification · Régression · Évaluation · Validation croisée · Déséquilibre des classes · SHAP",
    ),
    evidence: "chifaa",
  },
  {
    name: text("Deep Learning & Research", "Apprentissage profond & recherche"),
    items: text(
      "PyTorch · TensorFlow · Keras · Transformers · BERT / AraBERT · CNN-LSTM · Computer vision · NLP · Fine-tuning · Multimodal learning · Flower · Adversarial robustness",
      "PyTorch · TensorFlow · Keras · Transformers · BERT / AraBERT · CNN-LSTM · Vision par ordinateur · TAL · Affinage · Apprentissage multimodal · Flower · Robustesse adversariale",
    ),
    evidence: "fasa",
  },
  {
    name: text("Generative AI & Automation", "IA générative & automatisation"),
    items: text(
      "LLMs · RAG · AI agents · Tool integration · Prompt engineering · OpenAI / Gemini APIs · LangChain · LangGraph · n8n",
      "Grands modèles de langage · RAG · Agents IA · Intégration d’outils · Ingénierie de prompts · API OpenAI / Gemini · LangChain · LangGraph · n8n",
    ),
    evidence: "attendance",
  },
  {
    name: text("Data & Databases", "Données & bases de données"),
    items: "MySQL · PostgreSQL · Supabase · MongoDB · ChromaDB · Elasticsearch",
    evidence: "elasticsearch",
  },
  {
    name: text("Applications & APIs", "Applications & API"),
    items: "React · FastAPI · Spring Boot · Flutter · REST APIs",
    evidence: "cvfit",
  },
  {
    name: text("Tools & Deployment", "Outils & déploiement"),
    items: "Git / GitHub · Docker · AWS · Logstash · Kibana",
    evidence: "elasticsearch",
  },
  {
    name: text("Supporting Libraries", "Bibliothèques"),
    items: "Pandas · NumPy · Scikit-learn · OpenCV",
    evidence: "chifaa",
  },
];

export const education = [
  {
    dates: "2024 — 2027",
    degree: text(
      "Engineering · Big Data, Data Science & AI",
      "Cycle ingénieur · Big Data, Data Science & IA",
    ),
    institution:
      "École Nationale Supérieure de l’Intelligence Artificielle et Sciences des Données (ENSIASD), Taroudant",
    note: text("Expected graduation: 2027", "Diplôme attendu en 2027"),
  },
  {
    dates: "2022 — 2024",
    degree: text("DUT in Computer Science", "DUT en Informatique"),
    institution: "École Supérieure de Technologie (EST), Safi",
    note: null,
  },
];

export const leadership = [
  {
    title: text(
      "President, IT Innovation Club",
      "Président du club IT Innovation",
    ),
    description: text("ENSIASD", "ENSIASD"),
  },
  {
    title: text(
      "First prize · AI Summer School 2025",
      "Premier prix · AI Summer School 2025",
    ),
    description: text(
      "Earned as part of a hackathon team.",
      "Remporté en équipe lors du hackathon.",
    ),
  },
];

export const copy = {
  en: {
    nav: ["Work", "About", "Experience", "Contact"],
    menu: "Open navigation",
    closeMenu: "Close navigation",
    skip: "Skip to content",
    availability: "OPEN TO PFE INTERNSHIPS · JAN 2027",
    heroTop: "Curiosity, translated into",
    heroBottom: "useful systems.",
    intro:
      "I’m Mouhsin Tanani, an engineering student connecting AI research, data science, and the software people actually use.",
    heroNote: "Final year at ENSIASD · Based in Morocco",
    viewWork: "Explore my work",
    contactMe: "Let’s connect",
    cv: "Download CV",
    diagramLabel: "MY WAY OF WORKING",
    data: "Data",
    models: "Models",
    impact: "Applications",
    diagramCaption: "Understand. Experiment. Build.",
    discipline: "APPLIED AI & DATA",
    scroll: "A little further down",
    selectedKicker: "01 / SELECTED WORK",
    selectedTitle: "Ideas, put to work.",
    selectedIntro:
      "Three perspectives on the same ambition: turning a good question into something useful.",
    caseStudy: "Explore case study",
    illustrative: "ILLUSTRATIVE ARCHITECTURE",
    fasaLabel: "DISTRIBUTED DATA. SHARED LEARNING.",
    fasaClient: "Client",
    fasaServer: "Shared model",
    fasaUpdates: "Model updates · FedAvg",
    attendanceLabel: "A RELIABLE PATH FROM ASK TO ACTION",
    ask: "Manager request",
    authorize: "Authorize",
    retrieve: "Retrieve",
    update: "Update & verify",
    chifaaLabel: "TWO PATHS. ONE EXPLORATORY PROTOTYPE.",
    clinical: "Clinical information",
    risk: "Risk prediction",
    imaging: "MRI images",
    classification: "Classification",
    indexKicker: "THE PROJECT INDEX",
    indexTitle: "More questions. More possibilities.",
    all: "All projects",
    showCount: "projects",
    noProjects: "No projects in this category.",
    aboutKicker: "02 / A LITTLE ABOUT ME",
    aboutTitle: "Research-minded.\nBuilder at heart.",
    aboutFirst:
      "I’m a final-year engineering student in Big Data, Data Science, and Artificial Intelligence at ENSIASD in Taroudant. I like working where an open research question meets a concrete need.",
    aboutSecond:
      "My process starts with understanding the problem. Then I prepare the data, compare methods, evaluate what holds up, and bring the model into an application. The experiment matters. So does what happens after it.",
    aboutThird:
      "I’m particularly interested in federated learning, multilingual NLP, multimodal learning, computer vision, model robustness, and agents that make everyday work easier.",
    seekingTitle: "LOOKING AHEAD",
    seeking:
      "A six-month PFE internship from January 2027 in research or applied AI, preferably on site in France or Europe.",
    experienceKicker: "03 / EXPERIENCE",
    experienceTitle: "Learning in the real world.",
    experienceIntro:
      "Four internships across intelligent automation, industrial systems, multimodal AI, and hospitality.",
    related: "Related work",
    skillsKicker: "04 / MY TOOLKIT",
    skillsTitle: "Methods first. Tools that fit.",
    skillsIntro:
      "A working toolkit built through projects and experiments. The linked work shows specific applications, not equal proficiency in every tool.",
    evidence: "See it in practice",
    researchKicker: "05 / RESEARCH & WRITING",
    researchTitle: "The thinking behind the build.",
    educationKicker: "06 / FOUNDATIONS",
    educationTitle: "Always a student.",
    degree: "Engineering · Big Data, Data Science & AI",
    degreeNote: "Expected graduation: 2027",
    dut: "DUT in Computer Science",
    leadership: "Beyond the coursework",
    president: "President, IT Innovation Club",
    school: "ENSIASD",
    award: "First prize · AI Summer School 2025",
    awardNote: "Earned as part of a hackathon team.",
    contactKicker: "07 / WHAT’S NEXT",
    contactTitle: "Have a good question?\nLet’s work on it.",
    contactIntro:
      "Research, an internship, or a useful idea to explore together. My inbox is open.",
    emailLabel: "Send me an email",
    backTop: "Back to top",
    footer: "Built with curiosity, in Morocco.",
    problem: "The question",
    context: "Context",
    contribution: "My contribution",
    approach: "The approach",
    results: "Documented results",
    limitations: "Limits & lessons",
    technologies: "Tools & technologies",
    resources: "Explore the work",
    close: "Close case study",
    projectDetails: "Project details",
    noPublicResources:
      "This case study is based on the documented work. No public resource is currently available.",
  },
  fr: {
    nav: ["Projets", "À propos", "Expérience", "Contact"],
    menu: "Ouvrir la navigation",
    closeMenu: "Fermer la navigation",
    skip: "Aller au contenu",
    availability: "DISPONIBLE POUR UN STAGE PFE · JAN. 2027",
    heroTop: "La curiosité devient",
    heroBottom: "un système utile.",
    intro:
      "Je suis Mouhsin Tanani, élève ingénieur. Je relie recherche en IA, science des données et logiciels utiles au quotidien.",
    heroNote: "Dernière année à ENSIASD · Basé au Maroc",
    viewWork: "Explorer mes projets",
    contactMe: "Échangeons",
    cv: "Télécharger le CV",
    diagramLabel: "MA FAÇON DE TRAVAILLER",
    data: "Données",
    models: "Modèles",
    impact: "Applications",
    diagramCaption: "Comprendre. Expérimenter. Construire.",
    discipline: "IA APPLIQUÉE & DONNÉES",
    scroll: "Un peu plus bas",
    selectedKicker: "01 / PROJETS CHOISIS",
    selectedTitle: "Des idées en action.",
    selectedIntro:
      "Trois perspectives, une même ambition : transformer une bonne question en quelque chose d’utile.",
    caseStudy: "Explorer le projet",
    illustrative: "ARCHITECTURE ILLUSTRATIVE",
    fasaLabel: "DONNÉES DISTRIBUÉES. APPRENTISSAGE PARTAGÉ.",
    fasaClient: "Client",
    fasaServer: "Modèle partagé",
    fasaUpdates: "Mises à jour · FedAvg",
    attendanceLabel: "DE LA DEMANDE À UNE ACTION FIABLE",
    ask: "Demande du responsable",
    authorize: "Autoriser",
    retrieve: "Consulter",
    update: "Modifier & vérifier",
    chifaaLabel: "DEUX PARCOURS. UN PROTOTYPE EXPLORATOIRE.",
    clinical: "Informations cliniques",
    risk: "Prédiction des risques",
    imaging: "Images IRM",
    classification: "Classification",
    indexKicker: "INDEX DES PROJETS",
    indexTitle: "D’autres questions. D’autres possibles.",
    all: "Tous les projets",
    showCount: "projets",
    noProjects: "Aucun projet dans cette catégorie.",
    aboutKicker: "02 / À PROPOS",
    aboutTitle: "L’esprit de recherche.\nL’envie de construire.",
    aboutFirst:
      "Je suis élève ingénieur en dernière année de Big Data, Data Science et Intelligence Artificielle à ENSIASD, Taroudant. J’aime travailler à la rencontre d’une question de recherche ouverte et d’un besoin concret.",
    aboutSecond:
      "Je commence par comprendre le problème. Ensuite, je prépare les données, compare les méthodes, évalue ce qui résiste à l’épreuve et intègre le modèle dans une application. L’expérience compte. Ce qui vient après aussi.",
    aboutThird:
      "Je m’intéresse particulièrement à l’apprentissage fédéré, au TAL multilingue, à l’apprentissage multimodal, à la vision par ordinateur, à la robustesse des modèles et aux agents qui facilitent le travail quotidien.",
    seekingTitle: "LA SUITE",
    seeking:
      "Un stage PFE de six mois à partir de janvier 2027, en recherche ou en IA appliquée, de préférence en présentiel en France ou en Europe.",
    experienceKicker: "03 / EXPÉRIENCE",
    experienceTitle: "Apprendre sur le terrain.",
    experienceIntro:
      "Quatre stages entre automatisation intelligente, systèmes industriels, IA multimodale et hôtellerie.",
    related: "Projet associé",
    skillsKicker: "04 / MA BOÎTE À OUTILS",
    skillsTitle: "La méthode d’abord. Les bons outils ensuite.",
    skillsIntro:
      "Des outils acquis au fil des projets et des expériences. Les projets associés montrent des usages précis, pas un niveau identique sur chaque outil.",
    evidence: "Voir en pratique",
    researchKicker: "05 / RECHERCHE & ÉCRITURE",
    researchTitle: "La réflexion derrière le projet.",
    educationKicker: "06 / FONDATIONS",
    educationTitle: "Toujours apprendre.",
    degree: "Cycle ingénieur · Big Data, Data Science & IA",
    degreeNote: "Diplôme attendu en 2027",
    dut: "DUT en Informatique",
    leadership: "Au-delà des cours",
    president: "Président du club IT Innovation",
    school: "ENSIASD",
    award: "Premier prix · AI Summer School 2025",
    awardNote: "Remporté en équipe lors du hackathon.",
    contactKicker: "07 / ET APRÈS ?",
    contactTitle: "Une bonne question ?\nTravaillons ensemble.",
    contactIntro:
      "Une recherche, un stage ou une idée utile à explorer ensemble. Ma boîte mail est ouverte.",
    emailLabel: "M’envoyer un email",
    backTop: "Retour en haut",
    footer: "Créé avec curiosité, au Maroc.",
    problem: "La question",
    context: "Contexte",
    contribution: "Ma contribution",
    approach: "L’approche",
    results: "Résultats documentés",
    limitations: "Limites & enseignements",
    technologies: "Outils & technologies",
    resources: "Explorer les ressources",
    close: "Fermer le projet",
    projectDetails: "Détails du projet",
    noPublicResources:
      "Cette étude présente le travail documenté. Aucune ressource publique n’est actuellement disponible.",
  },
};
