import { useEffect, useRef, useState } from "react";
import {
  Asterisk,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  categories,
  copy,
  education,
  experiences,
  leadership,
  profile,
  projects,
  research,
  skills,
  type Language,
  type Project,
} from "./content";

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function Workflow({ lang }: { lang: Language }) {
  const c = copy[lang];
  return (
    <div className="workflow" aria-label={c.diagramCaption}>
      <div className="workflow-top">
        <span className="micro">{c.diagramLabel}</span>
        <span className="tiny-cross">+</span>
      </div>
      <svg
        className="workflow-art"
        viewBox="0 0 440 260"
        role="img"
        aria-label={`${c.data} → ${c.models} → ${c.impact}`}
      >
        <defs>
          <pattern
            id="dots"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".9" fill="#bcc4b9" />
          </pattern>
        </defs>
        <rect width="440" height="260" fill="url(#dots)" />
        <g fill="none" stroke="#9fab9c" strokeWidth="1">
          <path d="M55 74H123L189 130M55 130H189M55 186H123L189 130M251 130H315L358 76M251 130H370M251 130H315L358 184" />
        </g>
        <g fill="#f7f7f2" stroke="#83937f">
          <rect x="33" y="62" width="25" height="25" rx="4" />
          <rect x="33" y="118" width="25" height="25" rx="4" />
          <rect x="33" y="174" width="25" height="25" rx="4" />
        </g>
        <circle
          cx="220"
          cy="130"
          r="74"
          fill="#eef0e8"
          fillOpacity=".6"
          stroke="#c5cdbe"
        />
        <circle
          cx="220"
          cy="130"
          r="56"
          fill="none"
          stroke="#c5cdbe"
          strokeDasharray="3 7"
        />
        <rect x="189" y="99" width="62" height="62" rx="16" fill="#284add" />
        <g stroke="#fff" fill="none" strokeWidth="1.4">
          <path d="M207 120l13-8 13 8v17l-13 8-13-8zM207 120l13 8 13-8M220 128v17" />
        </g>
        <g fill="#f7f7f2" stroke="#83937f">
          <rect x="358" y="62" width="28" height="28" rx="14" />
          <rect x="367" y="117" width="28" height="28" rx="6" />
          <path d="M372 174l15 13-15 13-15-13z" />
        </g>
        <g fontFamily="Arial, sans-serif" fontSize="12" fill="#687264">
          <text x="25" y="236">
            {c.data}
          </text>
          <text x="220" y="236" textAnchor="middle">
            {c.models}
          </text>
          <text x="412" y="236" textAnchor="end">
            {c.impact}
          </text>
        </g>
      </svg>
      <div className="workflow-bottom">
        <span>{c.diagramCaption}</span>
        <span className="micro">MT / 2026</span>
      </div>
    </div>
  );
}

function ProjectVisual({ id, lang }: { id: string; lang: Language }) {
  const c = copy[lang];
  if (id === "fasa")
    return (
      <div
        className="project-visual fasa-visual"
        role="img"
        aria-label={`${c.illustrative}: ${c.fasaLabel}`}
      >
        <div className="visual-eyebrow">
          FLOWER / ARABERT <span>01—03</span>
        </div>
        <div className="federated-diagram">
          <svg
            viewBox="0 0 500 210"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M100 150C100 80 250 115 250 56M400 150C400 80 250 115 250 56M250 170V56"
              fill="none"
              stroke="#7486d4"
              strokeWidth="1.3"
              strokeDasharray="4 5"
            />
          </svg>
          <div className="shared-model">
            <span className="model-glyph">
              <Asterisk size={34} strokeWidth={1.3} />
            </span>
            <span>{c.fasaServer}</span>
          </div>
          <div className="clients">
            {[1, 2, 3].map((n) => (
              <div className="client" key={n}>
                <div className="client-dots" aria-hidden="true">
                  {Array.from({ length: 9 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <span>
                  {c.fasaClient} 0{n}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="visual-footer">
          <span>{c.fasaUpdates}</span>
          <span>{c.illustrative}</span>
        </div>
      </div>
    );
  if (id === "attendance")
    return (
      <div
        className="project-visual attendance-visual"
        role="img"
        aria-label={`${c.illustrative}: ${c.attendanceLabel}`}
      >
        <div className="visual-eyebrow">
          n8n × GEMINI <span>↗</span>
        </div>
        <div className="agent-request">
          <span className="request-dot" />
          <span>{c.ask}</span>
          <ArrowUpRight size={16} />
        </div>
        <div className="agent-flow">
          {[c.authorize, c.retrieve, c.update].map((v, i) => (
            <div className="flow-step" key={v}>
              <div>{i === 2 ? <Check size={19} /> : <span>0{i + 1}</span>}</div>
              <span>{v}</span>
              {i < 2 && <ChevronRight className="step-arrow" size={16} />}
            </div>
          ))}
        </div>
        <div className="visual-footer">
          <span>API → Supabase</span>
          <span>{c.illustrative}</span>
        </div>
      </div>
    );
  return (
    <div
      className="project-visual chifaa-visual"
      role="img"
      aria-label={`${c.illustrative}: ${c.chifaaLabel}`}
    >
      <div className="visual-eyebrow">
        CHIFAA / {lang === "en" ? "EXPERIMENTAL" : "EXPÉRIMENTAL"}{" "}
        <span>+</span>
      </div>
      <div className="medical-path">
        <div className="medical-icon">
          <FileText size={23} strokeWidth={1.3} />
        </div>
        <span>
          {c.clinical}
          <small>OCR · SVM · Random Forest</small>
        </span>
        <ArrowRight size={18} />
        <strong>{c.risk}</strong>
      </div>
      <div className="medical-path">
        <div className="medical-icon scan-icon" aria-hidden="true">
          <i />
        </div>
        <span>
          {c.imaging}
          <small>ResNet</small>
        </span>
        <ArrowRight size={18} />
        <strong>{c.classification}</strong>
      </div>
      <div className="visual-footer">
        <span>Python × Flutter</span>
        <span>{c.illustrative}</span>
      </div>
    </div>
  );
}

function ProjectDialog({
  project,
  lang,
  onClose,
}: {
  project: Project | undefined;
  lang: Language;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const c = copy[lang];
  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
    if (!project && dialog?.open) dialog.close();
    if (project) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const elements = [
          ...e.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not(:disabled)",
          ),
        ];
        const first = elements[0],
          last = elements.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-body">
          <div className="dialog-top">
            <span className="micro">
              {c.projectDetails} / {project.number}
            </span>
            <button
              className="icon-button close-dialog"
              onClick={onClose}
              aria-label={c.close}
              autoFocus
            >
              <X size={22} />
            </button>
          </div>
          <span className="eyebrow">{project.context[lang]}</span>
          <h2 id="dialog-title">{project.title[lang]}</h2>
          <p className="dialog-subtitle">{project.subtitle[lang]}</p>
          {project.featured && <ProjectVisual id={project.id} lang={lang} />}
          <div className="case-content">
            {(
              [
                "problem",
                "context",
                "contribution",
                "approach",
                "results",
                "limitations",
              ] as const
            ).map((field) => (
              <section key={field}>
                <h3>{c[field]}</h3>
                <p>{project[field][lang]}</p>
              </section>
            ))}
            <section>
              <h3>{c.technologies}</h3>
              <div className="tags">
                {project.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>
            <section>
              <h3>{c.resources}</h3>
              <div className="resource-links">
                {project.links.some((l) => l.available) ? (
                  project.links
                    .filter((l) => l.available)
                    .map((l) => (
                      <ExternalLink
                        href={l.url}
                        className="text-link"
                        key={l.url}
                      >
                        {l.label[lang]}
                        <ArrowUpRight size={16} />
                      </ExternalLink>
                    ))
                ) : (
                  <p>{c.noPublicResources}</p>
                )}
              </div>
            </section>
          </div>
          <button className="button secondary" onClick={onClose}>
            {c.close}
            <X size={17} />
          </button>
        </div>
      )}
    </dialog>
  );
}

const navigation = ["work", "about", "experience", "contact"];
function readProjectHash() {
  return window.location.hash.startsWith("#project/")
    ? window.location.hash.slice(9)
    : null;
}
function getLanguage(): Language {
  try {
    return localStorage.getItem("portfolio-language") === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(getLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [projectId, setProjectId] = useState<string | null>(readProjectHash);
  const triggerRef = useRef<HTMLElement | null>(null);
  const c = copy[lang];
  const selectedProject = projects.find((p) => p.id === projectId);
  const visibleProjects = projects.filter(
    (p) => category === "all" || p.category === category,
  );
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `Mouhsin Tanani — ${lang === "en" ? "Applied AI & Data" : "IA appliquée & données"}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${c.intro} ${c.seeking}`);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", c.intro);
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {
      /* Storage is optional. */
    }
  }, [lang, c]);
  useEffect(() => {
    const sync = () => setProjectId(readProjectHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const openProject = (id: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setProjectId(id);
    window.history.pushState(null, "", `#project/${id}`);
  };
  const closeProject = () => {
    setProjectId(null);
    if (readProjectHash())
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#work`,
      );
    triggerRef.current?.focus({ preventScroll: true });
  };
  return (
    <>
      <a href="#main" className="skip-link">
        {c.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#top"
            className="brand"
            aria-label={`${profile.name} — ${lang === "en" ? "Home" : "Accueil"}`}
          >
            <span className="brand-mark">
              mt<span>·</span>
            </span>
            <span className="brand-name">
              {profile.name}
              <span>{c.discipline}</span>
            </span>
          </a>
          <nav
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            aria-label={
              lang === "en" ? "Main navigation" : "Navigation principale"
            }
            id="main-navigation"
          >
            {navigation.map((id, i) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {c.nav[i]}
                {id === "contact" && <ArrowUpRight size={14} />}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <div
              className="language-switch"
              role="group"
              aria-label={lang === "en" ? "Language" : "Langue"}
            >
              {(["en", "fr"] as const).map((l) => (
                <button
                  key={l}
                  lang={l}
                  aria-pressed={lang === l}
                  aria-label={l === "en" ? "English" : "Français"}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              aria-label={menuOpen ? c.closeMenu : c.menu}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section
          className="hero container"
          id="top"
          aria-labelledby="hero-heading"
        >
          <div className="availability">
            <span className="status-dot" />
            {c.availability}
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-heading">
                {c.heroTop}
                <br />
                <em>{c.heroBottom}</em>
              </h1>
              <p className="hero-intro">{c.intro}</p>
              <p className="hero-note">{c.heroNote}</p>
              <div className="hero-actions">
                <a className="button primary" href="#work">
                  {c.viewWork}
                  <ArrowDown size={17} />
                </a>
                <a className="text-link" href="#contact">
                  {c.contactMe}
                  <ArrowUpRight size={17} />
                </a>
                {profile.cvPath && (
                  <a className="text-link" href={profile.cvPath} download>
                    {c.cv}
                    <FileText size={17} />
                  </a>
                )}
              </div>
            </div>
            <Workflow lang={lang} />
          </div>
          <div className="hero-bottom">
            <span className="micro">
              {lang === "en"
                ? "NLP / FEDERATED LEARNING"
                : "TAL / APPRENTISSAGE FÉDÉRÉ"}{" "}
              /{" "}
              {lang === "en"
                ? "INTELLIGENT AUTOMATION"
                : "AUTOMATISATION INTELLIGENTE"}
            </span>
            <a href="#work" className="scroll-note">
              {c.scroll}
              <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <section
          className="work-section container"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.selectedKicker}</span>
              <h2 id="work-heading">{c.selectedTitle}</h2>
            </div>
            <p>{c.selectedIntro}</p>
          </div>
          <div className="featured-grid">
            {projects
              .filter((p) => p.featured)
              .map((p) => (
                <article
                  className={`featured-card ${p.id === "fasa" ? "featured-main" : ""}`}
                  key={p.id}
                >
                  <button
                    className="visual-button"
                    onClick={() => openProject(p.id)}
                    aria-label={`${c.caseStudy}: ${p.title[lang]}`}
                  >
                    <ProjectVisual id={p.id} lang={lang} />
                    <span className="visual-open">
                      <ArrowUpRight size={22} />
                    </span>
                  </button>
                  <div className="featured-content">
                    <div className="card-context">
                      <span className="eyebrow">{p.context[lang]}</span>
                      <span className="micro">/{p.number}</span>
                    </div>
                    <h3>
                      <button onClick={() => openProject(p.id)}>
                        {p.title[lang]}
                      </button>
                    </h3>
                    {p.id === "fasa" && (
                      <p className="project-subtitle">{p.subtitle[lang]}</p>
                    )}
                    <p>{p.description[lang]}</p>
                    <div className="tags">
                      {p.technologies
                        .slice(0, p.id === "fasa" ? 4 : 3)
                        .map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                    </div>
                    <button
                      className="text-link"
                      onClick={() => openProject(p.id)}
                    >
                      {c.caseStudy}
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
          </div>

          <div className="project-index">
            <div className="index-heading">
              <div>
                <span className="eyebrow">{c.indexKicker}</span>
                <h3>{c.indexTitle}</h3>
              </div>
              <span className="micro index-count" aria-live="polite">
                {visibleProjects.length.toString().padStart(2, "0")}{" "}
                {c.showCount}
              </span>
            </div>
            <div
              className="filters"
              role="group"
              aria-label={
                lang === "en"
                  ? "Filter projects by category"
                  : "Filtrer les projets par catégorie"
              }
            >
              <button
                aria-pressed={category === "all"}
                onClick={() => setCategory("all")}
              >
                {c.all}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  aria-pressed={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>
            <div className="index-list">
              {visibleProjects.map((p) => (
                <button
                  className="index-row"
                  key={p.id}
                  onClick={() => openProject(p.id)}
                >
                  <span className="row-number">{p.number}</span>
                  <span className="row-title">
                    {p.title[lang]}
                    <small>{p.subtitle[lang]}</small>
                  </span>
                  <span className="row-category">
                    {
                      categories.find((cat) => cat.id === p.category)!.label[
                        lang
                      ]
                    }
                  </span>
                  <ArrowUpRight size={21} />
                </button>
              ))}
              {!visibleProjects.length && <p>{c.noProjects}</p>}
            </div>
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="container about-grid">
            <div>
              <span className="eyebrow">{c.aboutKicker}</span>
              <h2 id="about-heading" className="multiline">
                {c.aboutTitle}
              </h2>
              <div className="initials-art" aria-hidden="true">
                <span>
                  m<span className="initial-t">t</span>
                  <i>
                    <ArrowUpRight size={52} strokeWidth={1.2} />
                  </i>
                </span>
                <small>
                  {lang === "en"
                    ? "RESEARCH → SYSTEMS"
                    : "RECHERCHE → SYSTÈMES"}
                </small>
              </div>
            </div>
            <div className="about-copy">
              <p className="lead">{c.aboutFirst}</p>
              <p>{c.aboutSecond}</p>
              <p>{c.aboutThird}</p>
              <div className="seeking-note">
                <span className="eyebrow">
                  <span className="status-dot" />
                  {c.seekingTitle}
                </span>
                <p>{c.seeking}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="experience-section container"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.experienceKicker}</span>
              <h2 id="experience-heading">{c.experienceTitle}</h2>
            </div>
            <p>{c.experienceIntro}</p>
          </div>
          <div className="timeline">
            {experiences
              .filter(
                (e) =>
                  e.published &&
                  [
                    e.company,
                    ...Object.values(e.role),
                    ...Object.values(e.dates),
                    ...Object.values(e.location),
                    ...Object.values(e.summary),
                    ...e.contributions.flatMap((v) => Object.values(v)),
                    ...e.technologies,
                  ].every((v) => v.trim() && !v.includes("[")),
              )
              .map((e) => (
                <article className="experience" key={e.id}>
                  <div className="experience-date">
                    <span className="timeline-dot" />
                    {e.dates[lang]}
                    <span className="experience-location">
                      {e.location[lang]}
                    </span>
                  </div>
                  <div>
                    <h3>{e.company}</h3>
                    <p className="experience-role">{e.role[lang]}</p>
                    <p>{e.summary[lang]}</p>
                    <ul>
                      {e.contributions.map((item) => (
                        <li key={item.en}>{item[lang]}</li>
                      ))}
                    </ul>
                    <div className="experience-bottom">
                      {e.technologies.length > 0 && (
                        <span className="experience-tech">
                          {e.technologies.join(" · ")}
                        </span>
                      )}
                      {e.id === "hepta" && (
                        <a href="#research" className="text-link">
                          {lang === "en"
                            ? "FedTwin vision paper"
                            : "Papier de vision FedTwin"}
                          <ArrowDown size={15} />
                        </a>
                      )}
                      {e.relatedProjects.map((id) => (
                        <button
                          className="text-link"
                          key={id}
                          onClick={() => openProject(id)}
                        >
                          {projects.find((p) => p.id === id)?.title[lang]}
                          <ArrowUpRight size={15} />
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section
          className="skills-section container"
          aria-labelledby="skills-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.skillsKicker}</span>
              <h2 id="skills-heading">{c.skillsTitle}</h2>
            </div>
            <p>{c.skillsIntro}</p>
          </div>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <article className="skill-group" key={s.name.en}>
                <span className="skill-number">0{i + 1}</span>
                <h3>{s.name[lang]}</h3>
                <p>{typeof s.items === "string" ? s.items : s.items[lang]}</p>
                <button
                  className="text-link"
                  onClick={() => openProject(s.evidence)}
                >
                  {c.evidence}
                  <ArrowUpRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          className="research-section"
          id="research"
          aria-labelledby="research-heading"
        >
          <div className="container">
            <span className="eyebrow">{c.researchKicker}</span>
            <h2 id="research-heading">{c.researchTitle}</h2>
            <div className="research-grid">
              {research.map((r, i) => (
                <article className="research-card" key={r.title.en}>
                  <div className="research-top">
                    <FileText size={24} strokeWidth={1.3} />
                    <span className="micro">0{i + 1}</span>
                  </div>
                  <span className="eyebrow">{r.type[lang]}</span>
                  <h3>{r.title[lang]}</h3>
                  <p>{r.description[lang]}</p>
                  {r.link.available ? (
                    <ExternalLink href={r.link.url} className="text-link">
                      {r.link.label[lang]}
                      <ArrowUpRight size={16} />
                    </ExternalLink>
                  ) : r.project ? (
                    <button
                      className="text-link"
                      onClick={() => openProject(r.project!)}
                    >
                      {c.caseStudy}
                      <ArrowUpRight size={16} />
                    </button>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="education-section container"
          aria-labelledby="education-heading"
        >
          <div>
            <span className="eyebrow">{c.educationKicker}</span>
            <h2 id="education-heading">{c.educationTitle}</h2>
          </div>
          <div className="education-grid">
            <div className="education-list">
              {education.map((e) => (
                <article key={e.dates}>
                  <span className="micro">{e.dates}</span>
                  <h3>{e.degree[lang]}</h3>
                  <p>{e.institution}</p>
                  {e.note && <small>{e.note[lang]}</small>}
                </article>
              ))}
            </div>
            <div className="leadership">
              <span className="eyebrow">{c.leadership}</span>
              {leadership.map((item, i) => (
                <div key={item.title.en}>
                  <span className="leadership-symbol" aria-hidden="true">
                    {i === 0 ? (
                      <ArrowUpRight size={22} />
                    ) : (
                      <Asterisk size={23} />
                    )}
                  </span>
                  <h3>{item.title[lang]}</h3>
                  <p>{item.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">{c.contactKicker}</span>
              <h2 id="contact-heading" className="multiline">
                {c.contactTitle}
              </h2>
              <p>{c.contactIntro}</p>
              <a
                className="contact-email"
                href={`mailto:${profile.email}`}
                aria-label={`${c.emailLabel}: ${profile.email}`}
              >
                {profile.email}
                <ArrowUpRight size={26} />
              </a>
              <div className="social-links">
                <ExternalLink href={profile.github}>
                  <Github size={17} />
                  GitHub
                  <ArrowUpRight size={14} />
                </ExternalLink>
                <ExternalLink href={profile.linkedin}>
                  <Linkedin size={17} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </ExternalLink>
                {profile.cvPath && (
                  <a href={profile.cvPath} download>
                    <FileText size={17} />
                    {c.cv}
                  </a>
                )}
              </div>
            </div>
            <div className="contact-stamp" aria-hidden="true">
              <svg viewBox="0 0 220 220">
                <defs>
                  <path
                    id="circle-text"
                    d="M110 110 m-83 0 a83 83 0 1 1 166 0 a83 83 0 1 1-166 0"
                  />
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r="106"
                  fill="none"
                  stroke="currentColor"
                />
                <text fontSize="10.5" letterSpacing="3.6" fill="currentColor">
                  <textPath href="#circle-text">
                    {lang === "en"
                      ? "LET’S BUILD SOMETHING USEFUL · APPLIED AI & DATA · "
                      : "CONSTRUISONS UN PROJET UTILE · IA & DONNÉES · "}
                  </textPath>
                </text>
                <path
                  d="M72 148l75-75M73 73h74v74"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a className="footer-brand" href="#top">
          {profile.name}
          <span>© {new Date().getFullYear()}</span>
        </a>
        <span>{c.footer}</span>
        <a href="#top">
          {c.backTop}
          <ArrowUp size={15} />
        </a>
      </footer>
      <ProjectDialog
        project={selectedProject}
        lang={lang}
        onClose={closeProject}
      />
    </>
  );
}
