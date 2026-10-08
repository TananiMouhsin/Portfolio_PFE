# Mouhsin Tanani — Applied AI & Data

A bilingual English/French portfolio built with React, TypeScript, and Vite. A compact overview with a bold cobalt hero, interactive capability cards, and five foldable sections: **Experience → Projects → Research → Education → Skills**. No backend, database, secret keys, analytics, or submission service required. Fonts are bundled locally. Contact uses a real email link.

Experience starts open; the other sections start folded. Navigation opens its destination, and **Expand all / Collapse all** controls the whole overview. Projects start with three highlights; visitors can select all nine or a category. Technical explanations stay behind a second disclosure inside project dialogs.

## Local development

Use Node.js 22.12+ (Node 24 was verified) and npm.

```sh
cd /workspace/Portfolio_PFE
npm ci
npm run dev -- --port 5173 --strictPort
```

From a normal local clone, use its actual directory instead. The development server binds to all interfaces. Stop it with Ctrl+C. To build and inspect the production version:

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

## Editing content

Edit **`src/content.ts`** for profile links and detailed project, experience, education, skills, and research facts. Edit **`src/overview.ts`** for short homepage summaries, hero copy, and section labels. Every localized field has `en` and `fr` values; keep both up to date. The default language is English and a visitor's selection is saved locally when storage is available.

- Projects have stable IDs, one primary filter category, extra tags, context, question, contribution, approach, documented results, limitations, technologies, and optional resources. Each appears once in the project grid. The three selected projects have illustrative architecture diagrams in their detail dialogs, not performance charts or real employee records.
- Project links use `available: true`. Set this to `false` when a link is confirmed broken or private, preserving its URL and an `editingNote` for future editing. Unavailable links are hidden in project details. Research reports without available links fall back to their case study; FedTwin's unavailable link is simply hidden.
- Direct links such as `#project/fasa` open accessible case-study dialogs. Escape, the close actions, and the backdrop close them; focus is trapped inside and restored to the originating button.
- The fifth experience has all requested fields and `published: false`. Fill in its company, localized role, dates, location, summary, contributions, technologies, and project IDs, then set `published: true`. Do not publish placeholder values. Keep the experience list in newest-first chronological order.
- Empty factual fields are reserved under a project's `editing` object. Do not invent metrics, dates, screenshots, or ownership to fill gaps.

## CV and missing material

Add the actual CV PDF to `public/mouhsin-tanani-cv.pdf`, then set `profile.cvPath` to `./mouhsin-tanani-cv.pdf`. The download actions are deliberately hidden until a path is supplied. Confirm the file exists before enabling them.

Remaining material to supply or confirm:

1. CV PDF.
2. The fifth internship's factual details in both languages.
3. Hotel model dataset, preprocessing, validation method, metrics, and interpretation (empty editable fields).
4. Genuine public Kibana screenshots; optional sanitized project screenshots and experimental source data. Current diagrams are labeled illustrative.
5. Public sharing permissions for the Google Drive reports and the supplied LinkedIn profile. All five project repositories and the GitHub profile returned HTTP 200 during setup. Drive and LinkedIn verification was blocked by the cloud egress proxy, so their supplied URLs remain unverified, not classified as broken.

The paper is described as a **vision paper**, not a peer-reviewed publication. Chifaa results and the text-emotion score are attributed to the supplied research CV and remain experimental. No combined multimodal score, clinical validation, adoption, or business-impact figures are invented.

## Validation

With the development server running:

```sh
npm run test:smoke
```

The Playwright smoke suite uses `/usr/bin/chromium`. Override `CHROMIUM_PATH` for a different installed Chromium executable, and `PORTFOLIO_TEST_URL` for another server address. It checks section order, short-page height limits, folding by keyboard, expand/collapse all, navigation opening folded destinations, filters, nine substantive dialogs, optional technical detail, focus trapping/restoration, Escape/backdrop dismissal, French translation and persistence, mobile navigation, hidden placeholders/CV, direct project and section links, viewport overflow, browser errors, and automated axe WCAG A/AA checks. Screenshots are written to ignored `test-results/` at desktop, tablet, and small-phone sizes in both languages. Automated accessibility checks complement visual and keyboard inspection; they are not a certification.

## Deployment

Run `npm ci && npm run build`, then publish **`dist/`** to any static host (GitHub Pages, Netlify, Vercel, or equivalent). Framework preset: Vite; build command: `npm run build`; output directory: `dist`. No server-side runtime is needed. Relative asset paths support a repository subpath; case-study URLs use hashes and need no server routing rules.

For GitHub Pages, upload the contents of `dist/` as a Pages artifact using your chosen Pages workflow, or deploy the build directory through your existing publishing method. This project does not automatically deploy or push changes.

Before public deployment, set `og:image` in `index.html` to the absolute deployed URL of `social-card.png`, set your canonical site URL and `og:url`, and update the default English metadata if the positioning changes. The source social artwork is `public/social-card.svg`; its ready-to-share PNG is in `public/social-card.png`. Metadata for the selected language updates in the browser; crawler-facing metadata defaults to English.

## Cloud tasks

Use the existing `/workspace/Portfolio_PFE` checkout. Each cloud task is already isolated; do not create a worktree unless explicitly requested. Dependencies and built files can be retained in a snapshot, but live server processes must be started again. Run the commands above and verify the returned HTML and the browser smoke checks. Dependency installation needs the standard npm registry; no application credentials are required.
