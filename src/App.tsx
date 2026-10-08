import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Asterisk,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Menu,
  Minus,
  Network,
  Plus,
  Sparkles,
  Workflow,
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
import {
  experienceOverview,
  overviewCopy,
  projectOverview,
  researchOverview,
  sectionInfo,
  sectionOrder,
  type SectionId,
} from "./overview";

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
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
  const c = copy[lang],
    o = overviewCopy[lang];
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
            "a[href], button:not(:disabled), summary",
          ),
        ].filter((el) => el.getClientRects().length);
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
            <span className="eyebrow">{project.context[lang]}</span>
            <button
              className="icon-button close-dialog"
              onClick={onClose}
              aria-label={c.close}
              autoFocus
            >
              <X size={22} />
            </button>
          </div>
          <h2 id="dialog-title">{project.title[lang]}</h2>
          <p className="dialog-subtitle">
            {projectOverview[project.id].summary[lang]}
          </p>
          <div className="tags">
            {project.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {project.featured && <ProjectVisual id={project.id} lang={lang} />}
          <div className="case-content">
            <section>
              <h3>{o.contribution}</h3>
              <p>{project.contribution[lang]}</p>
            </section>
            <section className="result-note">
              <h3>{o.results}</h3>
              <p>{project.results[lang]}</p>
            </section>
          </div>
          <details className="technical-details">
            <summary>
              {o.deeper}
              <ChevronDown size={17} />
            </summary>
            <div className="case-content">
              {(["problem", "context", "approach", "limitations"] as const).map(
                (field) => (
                  <section key={field}>
                    <h3>{c[field]}</h3>
                    <p>{project[field][lang]}</p>
                  </section>
                ),
              )}
            </div>
          </details>
          <div className="resource-links">
            {project.links
              .filter((l) => l.available)
              .map((l) => (
                <ExternalLink href={l.url} className="text-link" key={l.url}>
                  {l.label[lang]}
                  <ArrowUpRight size={16} />
                </ExternalLink>
              ))}
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

const sectionIcons = {
  experience: BriefcaseBusiness,
  projects: Code2,
  research: BookOpen,
  education: GraduationCap,
  skills: Sparkles,
};
function FoldSection({
  id,
  lang,
  open,
  toggle,
  children,
}: {
  id: SectionId;
  lang: Language;
  open: boolean;
  toggle: () => void;
  children: ReactNode;
}) {
  const info = sectionInfo[id],
    o = overviewCopy[lang],
    Icon = sectionIcons[id];
  return (
    <section
      id={id}
      className={`fold-section fold-${id} ${open ? "is-open" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`}>
        <button
          className="fold-toggle"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={toggle}
        >
          <span className="section-symbol">
            <Icon size={23} strokeWidth={1.6} />
          </span>
          <span className="fold-name">
            <span className="fold-label">
              <span className="section-number">
                0{sectionOrder.indexOf(id) + 1}
              </span>
              {info.title[lang]}
            </span>
            <span className="fold-subtitle">{info.subtitle[lang]}</span>
          </span>
          <span className="fold-preview">{info.preview[lang]}</span>
          <span className="fold-control">
            <span>{open ? o.collapse : o.expand}</span>
            {open ? <Minus size={21} /> : <Plus size={21} />}
          </span>
        </button>
      </h2>
      <div id={`${id}-panel`} className="fold-panel" hidden={!open}>
        {children}
      </div>
    </section>
  );
}

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
function hashSection(): SectionId | undefined {
  const hash = window.location.hash.slice(1);
  return hash === "work" ? "projects" : sectionOrder.find((id) => id === hash);
}

export default function App() {
  const [lang, setLang] = useState<Language>(getLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("highlights");
  const [projectId, setProjectId] = useState<string | null>(readProjectHash);
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    () => new Set(["experience", ...(hashSection() ? [hashSection()!] : [])]),
  );
  const triggerRef = useRef<HTMLElement | null>(null);
  const c = copy[lang],
    o = overviewCopy[lang];
  const selectedProject = projects.find((p) => p.id === projectId);
  const visibleProjects = projects.filter(
    (p) =>
      category === "all" ||
      (category === "highlights" ? p.featured : p.category === category),
  );
  const publicExperiences = experiences.filter(
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
  );
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `Mouhsin Tanani — ${lang === "en" ? "Applied AI & Data" : "IA appliquée & données"}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${o.intro} ${o.opportunity}`);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", o.intro);
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch {
      /* Optional storage. */
    }
  }, [lang, o]);
  useEffect(() => {
    const sync = () => {
      setProjectId(readProjectHash());
      const id = hashSection();
      if (id) setOpenSections((previous) => new Set([...previous, id]));
    };
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
  const visitSection = (id: SectionId) => {
    setOpenSections((previous) => new Set([...previous, id]));
    setMenuOpen(false);
  };
  const toggleSection = (id: SectionId) =>
    setOpenSections((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
        `${window.location.pathname}${window.location.search}#projects`,
      );
    if (triggerRef.current?.isConnected)
      triggerRef.current.focus({ preventScroll: true });
    else setOpenSections((previous) => new Set([...previous, "projects"]));
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
              mt
              <span>
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </span>
            </span>
            <span className="brand-name">
              {profile.name}
              <small>{c.discipline}</small>
            </span>
          </a>
          <nav
            id="main-navigation"
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            aria-label={
              lang === "en" ? "Main navigation" : "Navigation principale"
            }
          >
            {sectionOrder.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => visitSection(id)}>
                {sectionInfo[id].title[lang]}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {o.contact}
              <ArrowUpRight size={13} />
            </a>
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
          <div className="hero-copy">
            <span className="eyebrow hero-hello">
              {o.hello}
              <span className="hello-line" />
            </span>
            <h1 id="hero-heading">
              {o.heroFirst}
              <br />
              <span>{o.heroSecond}</span>
              <Asterisk
                className="hero-asterisk"
                size={42}
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </h1>
            <p className="hero-intro">{o.intro}</p>
            <p className="hero-note">{o.note}</p>
            <div className="hero-actions">
              <a
                href="#experience"
                className="button primary"
                onClick={() => visitSection("experience")}
              >
                {o.experienceAction}
                <ArrowDown size={17} />
              </a>
              <a
                href="#projects"
                className="text-link"
                onClick={() => visitSection("projects")}
              >
                {o.projectsAction}
                <ArrowUpRight size={17} />
              </a>
              {profile.cvPath && (
                <a href={profile.cvPath} className="text-link" download>
                  {c.cv}
                  <FileText size={17} />
                </a>
              )}
            </div>
          </div>
          <div className="hero-playground">
            <div className="playground-top">
              <span className="status-dot" />
              {o.available}
              <span className="playground-code">MT.01</span>
            </div>
            <p className="playground-label">{o.quickTitle}</p>
            <div className="capability-stack">
              {[
                {
                  id: "fasa",
                  title: o.tileModel,
                  note: o.tileModelNote,
                  Icon: Network,
                },
                {
                  id: "attendance",
                  title: o.tileAgent,
                  note: o.tileAgentNote,
                  Icon: Workflow,
                },
                {
                  id: "chifaa",
                  title: o.tileApp,
                  note: o.tileAppNote,
                  Icon: Code2,
                },
              ].map(({ id, title, note, Icon }, i) => (
                <button
                  className={`capability capability-${i}`}
                  onClick={() => openProject(id)}
                  key={id}
                >
                  <span className="capability-icon">
                    <Icon size={25} strokeWidth={1.5} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{note}</small>
                  </span>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <div className="playground-bottom">
              <span>01 / 02 / 03</span>
              <span>
                {lang === "en" ? "CLICK. EXPLORE." : "CLIQUEZ. EXPLOREZ."}
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </section>
        <div className="proof-strip container">
          <span>
            <strong>
              {publicExperiences.length.toString().padStart(2, "0")}
            </strong>
            {o.proofInternships}
          </span>
          <span>
            <strong>{projects.length.toString().padStart(2, "0")}</strong>
            {o.proofProjects}
          </span>
          <span className="proof-location">
            <strong>EN / FR</strong>
            {o.proofLanguages}
          </span>
          <a href="#contact">
            <span className="status-dot" />
            {o.available}
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="portfolio-sections container">
          <div className="section-toolbar">
            <span className="eyebrow">{o.explore}</span>
            <button
              className="expand-all"
              onClick={() =>
                setOpenSections(
                  openSections.size === sectionOrder.length
                    ? new Set()
                    : new Set(sectionOrder),
                )
              }
            >
              {openSections.size === sectionOrder.length
                ? o.collapseAll
                : o.expandAll}
              {openSections.size === sectionOrder.length ? (
                <Minus size={14} />
              ) : (
                <Plus size={14} />
              )}
            </button>
          </div>
          <FoldSection
            id="experience"
            lang={lang}
            open={openSections.has("experience")}
            toggle={() => toggleSection("experience")}
          >
            <div className="experience-grid">
              {publicExperiences.map((e) => (
                <article className="experience-card" key={e.id}>
                  <div className="experience-top">
                    <span className={`company-mark company-${e.id}`}>
                      {e.company.split(" ")[0].slice(0, 2).toUpperCase()}
                    </span>
                    <span className="experience-date">{e.dates[lang]}</span>
                  </div>
                  <h3>{e.company}</h3>
                  <p className="experience-role">{e.role[lang]}</p>
                  <p className="experience-summary">
                    {experienceOverview[e.id]?.[lang] || e.summary[lang]}
                  </p>
                  <span className="experience-location">
                    {e.location[lang]}
                  </span>
                  <details className="experience-details">
                    <summary>
                      {o.experienceDetails}
                      <Plus size={14} />
                    </summary>
                    <ul>
                      {e.contributions.map((item) => (
                        <li key={item.en}>{item[lang]}</li>
                      ))}
                    </ul>
                    {e.technologies.length > 0 && (
                      <div className="tags">
                        {e.technologies.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="experience-links">
                      {e.relatedProjects.map((id) => (
                        <button
                          className="text-link"
                          key={id}
                          onClick={() => openProject(id)}
                        >
                          {projects.find((p) => p.id === id)?.title[lang]}
                          <ArrowUpRight size={14} />
                        </button>
                      ))}
                      {e.id === "hepta" && (
                        <a
                          href="#research"
                          className="text-link"
                          onClick={() => visitSection("research")}
                        >
                          FedTwin
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </FoldSection>

          <FoldSection
            id="projects"
            lang={lang}
            open={openSections.has("projects")}
            toggle={() => toggleSection("projects")}
          >
            <div className="project-toolbar">
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
                  aria-pressed={category === "highlights"}
                  onClick={() => setCategory("highlights")}
                >
                  {o.highlights}
                  <Asterisk size={12} />
                </button>
                <button
                  aria-pressed={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  {c.all}
                  <span>09</span>
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
              <span className="project-count" aria-live="polite">
                {visibleProjects.length} / {projects.length}
              </span>
            </div>
            <div className="project-grid">
              {visibleProjects.map((p) => (
                <article className={`project-card project-${p.id}`} key={p.id}>
                  <button
                    className="project-card-open"
                    onClick={() => openProject(p.id)}
                    aria-label={`${o.projectDetails}: ${p.title[lang]}`}
                  >
                    <span className="project-art" aria-hidden="true">
                      {p.id === "fasa" ? (
                        <>
                          <Network size={54} strokeWidth={1} />
                          <span className="art-orbit" />
                        </>
                      ) : p.id === "attendance" ? (
                        <Workflow size={54} strokeWidth={1} />
                      ) : p.id === "chifaa" ? (
                        <Plus size={54} strokeWidth={1} />
                      ) : (
                        <Code2 size={42} strokeWidth={1} />
                      )}
                      <span className="project-art-badge">
                        {projectOverview[p.id].badge[lang]}
                      </span>
                      <ArrowUpRight className="project-art-arrow" size={20} />
                    </span>
                    <span className="project-card-body">
                      <span className="project-context">{p.context[lang]}</span>
                      <strong>{p.title[lang]}</strong>
                      <span className="project-summary">
                        {projectOverview[p.id].summary[lang]}
                      </span>
                      <span className="project-tech">
                        {p.technologies.slice(0, 3).join(" · ")}
                      </span>
                      <span className="project-action">
                        {o.projectDetails}
                        <ArrowUpRight size={15} />
                      </span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </FoldSection>

          <FoldSection
            id="research"
            lang={lang}
            open={openSections.has("research")}
            toggle={() => toggleSection("research")}
          >
            <div className="research-grid">
              {research.map((r, i) => (
                <article className="research-card" key={r.title.en}>
                  <div className="research-top">
                    <FileText size={22} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <span className="eyebrow">{r.type[lang]}</span>
                  <h3>{r.title[lang]}</h3>
                  <p>{researchOverview[i][lang]}</p>
                  {r.link.available ? (
                    <ExternalLink className="text-link" href={r.link.url}>
                      {r.link.label[lang]}
                      <ArrowUpRight size={15} />
                    </ExternalLink>
                  ) : r.project ? (
                    <button
                      className="text-link"
                      onClick={() => openProject(r.project!)}
                    >
                      {o.projectDetails}
                      <ArrowUpRight size={15} />
                    </button>
                  ) : null}
                </article>
              ))}
            </div>
            <p className="section-footnote">{o.researchNote}</p>
          </FoldSection>

          <FoldSection
            id="education"
            lang={lang}
            open={openSections.has("education")}
            toggle={() => toggleSection("education")}
          >
            <div className="education-grid">
              <div className="education-list">
                {education.map((e, i) => (
                  <article className="education-card" key={e.dates}>
                    <span className="education-date">{e.dates}</span>
                    <h3>{i === 0 ? "ENSIASD" : "EST Safi"}</h3>
                    <p>{e.degree[lang]}</p>
                    <details>
                      <summary>
                        {lang === "en"
                          ? "School details"
                          : "Détails de la formation"}
                        <ChevronDown size={14} />
                      </summary>
                      <p>{e.institution}</p>
                      {e.note && <small>{e.note[lang]}</small>}
                    </details>
                  </article>
                ))}
              </div>
              <div className="leadership">
                <span className="eyebrow">{c.leadership}</span>
                {leadership.map((item, i) => (
                  <div key={item.title.en}>
                    {i === 0 ? (
                      <ArrowUpRight size={22} />
                    ) : (
                      <Asterisk size={23} />
                    )}
                    <span>
                      <h3>{item.title[lang]}</h3>
                      <p>{item.description[lang]}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FoldSection>

          <FoldSection
            id="skills"
            lang={lang}
            open={openSections.has("skills")}
            toggle={() => toggleSection("skills")}
          >
            <div className="skills-grid">
              {skills.map((s) => (
                <article className="skill-group" key={s.name.en}>
                  <h3>{s.name[lang]}</h3>
                  <div className="tags">
                    {(typeof s.items === "string" ? s.items : s.items[lang])
                      .split(" · ")
                      .map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                  </div>
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
            <p className="section-footnote">{o.skillsNote}</p>
          </FoldSection>
        </div>

        <section
          className="contact-section container"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div>
            <span className="eyebrow">{o.available}</span>
            <h2 id="contact-heading">
              {o.contactTitle}
              <Asterisk size={27} strokeWidth={1.4} />
            </h2>
            <p>{o.contactText}</p>
            <p className="opportunity-note">{o.opportunity}</p>
          </div>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              {o.email}
              <ArrowUpRight size={19} />
            </a>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="social-links">
              <ExternalLink href={profile.github}>
                <Github size={16} />
                GitHub
                <ArrowUpRight size={13} />
              </ExternalLink>
              <ExternalLink href={profile.linkedin}>
                <Linkedin size={16} />
                LinkedIn
                <ArrowUpRight size={13} />
              </ExternalLink>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <span>
          {profile.name}
          <small>
            © {new Date().getFullYear()} ·{" "}
            {lang === "en" ? "Made in Morocco" : "Créé au Maroc"}
          </small>
        </span>
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
