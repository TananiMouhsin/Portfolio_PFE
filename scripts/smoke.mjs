import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
let checks = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  checks++;
};
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await mkdir("test-results", { recursive: true });
const toggle = (id) => page.locator(`#${id} .fold-toggle`);
const panel = (id) => page.locator(`#${id}-panel`);
const order = ["experience", "projects", "research", "education", "skills"];
async function noOverflow(label) {
  check(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    `${label}: no horizontal overflow`,
  );
}
async function accessibility(label) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  if (result.violations.length)
    console.log(
      JSON.stringify(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        null,
        2,
      ),
    );
  check(
    result.violations.length === 0,
    `${label}: automated accessibility checks`,
  );
}
async function reset() {
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
}
try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await reset();
  check(
    (await page.locator("h1").innerText()).includes("Hi, I’m Mouhsin."),
    "Short English hero",
  );
  check(
    JSON.stringify(
      await page
        .locator(".fold-section")
        .evaluateAll((nodes) => nodes.map((n) => n.id)),
    ) === JSON.stringify(order),
    "Experience → projects → research → education → skills",
  );
  check(await panel("experience").isVisible(), "Experience starts open");
  for (const id of order.slice(1))
    check(await panel(id).isHidden(), `${id} starts folded`);
  check(
    (await page.locator(".experience-card").count()) === 4,
    "Four real internships",
  );
  check(
    (await page.getByText("[ADD_COMPANY]").count()) === 0,
    "No fifth-entry placeholders",
  );
  check(
    (await page.getByRole("link", { name: "Download CV" }).count()) === 0,
    "No missing CV action",
  );
  check(
    (await page.locator('a[href="mailto:tananimouhsin@gmail.com"]').count()) >
      0,
    "Working contact action",
  );
  const desktopHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  check(desktopHeight < 2600, `Short desktop overview (${desktopHeight}px)`);
  await noOverflow("Desktop");
  await page.screenshot({
    path: "test-results/desktop-en.png",
    fullPage: true,
  });
  await accessibility("Desktop overview");

  for (let i = 0; i < 4; i++) {
    const details = page.locator(".experience-details").nth(i);
    check(
      await details.evaluate((el) => !el.open),
      "Internship details start folded",
    );
    await details.locator("summary").click();
    check(await details.evaluate((el) => el.open), "Internship detail opens");
    check(
      (await details.locator("li").count()) > 0,
      "Real contributions available",
    );
    await details.locator("summary").click();
  }
  for (const [i, title] of [
    "FASA",
    "Attendance AI Assistant",
    "Chifaa",
  ].entries()) {
    await page.locator(".capability").nth(i).click();
    check(
      (await page.locator("#dialog-title").innerText()) === title,
      "Hero capability opens matching project",
    );
    await page.keyboard.press("Escape");
    check(
      await page
        .locator(".capability")
        .nth(i)
        .evaluate((el) => el === document.activeElement),
      "Hero focus restored",
    );
  }

  for (const id of order) {
    if ((await toggle(id).getAttribute("aria-expanded")) === "true")
      await toggle(id).click();
    await toggle(id).focus();
    await page.keyboard.press("Enter");
    check(await panel(id).isVisible(), `${id}: Enter expands`);
    check(
      (await toggle(id).getAttribute("aria-expanded")) === "true",
      `${id}: expanded state`,
    );
    await page.keyboard.press("Space");
    check(await panel(id).isHidden(), `${id}: Space folds`);
  }
  await page.getByRole("button", { name: "Expand all", exact: true }).click();
  for (const id of order)
    check(await panel(id).isVisible(), `Expand all: ${id}`);
  await accessibility("All sections expanded");
  await page.getByRole("button", { name: "Collapse all", exact: true }).click();
  for (const id of order)
    check(await panel(id).isHidden(), `Collapse all: ${id}`);

  await page.locator('.main-nav a[href="#projects"]').click();
  check(
    await panel("projects").isVisible(),
    "Navigation opens folded destination",
  );
  check(
    (await page.locator(".project-card").count()) === 3,
    "Three selected projects by default",
  );
  const filters = page.locator(".filters button");
  for (const [i, count] of [3, 9, 3, 2, 1, 2, 1].entries()) {
    await filters.nth(i).click();
    check(
      (await page.locator(".project-card").count()) === count,
      `Filter ${i}: ${count} results`,
    );
    check(
      (await filters.nth(i).getAttribute("aria-pressed")) === "true",
      `Filter ${i}: selected state`,
    );
  }
  await filters.nth(1).click();
  const names = await page
    .locator(".project-card-body>strong")
    .allTextContents();
  check(new Set(names).size === 9, "All nine projects appear once");
  for (let i = 0; i < 9; i++) {
    const trigger = page.locator(".project-card-open").nth(i);
    await trigger.click();
    check(
      await page.locator("dialog").evaluate((d) => d.open),
      `Project ${i + 1} opens`,
    );
    check(
      await page.locator("dialog .technical-details").evaluate((d) => !d.open),
      "Technical detail folded by default",
    );
    check(
      await page
        .locator("dialog")
        .evaluate((d) => d.contains(document.activeElement)),
      "Focus enters dialog",
    );
    await page.locator("dialog .technical-details>summary").click();
    check(
      await page.locator("dialog .technical-details").evaluate((d) => d.open),
      "Deep detail expands",
    );
    check(
      (await page.locator("dialog .case-content section").count()) === 6,
      "Full documented contribution, results, question, context, approach, and limitations retained",
    );
    await page.keyboard.press("Escape");
    check(
      await page.locator("dialog").evaluate((d) => !d.open),
      "Escape closes dialog",
    );
    check(
      await trigger.evaluate((el) => document.activeElement === el),
      "Focus restored",
    );
  }
  await page.locator(".project-card-open").first().click();
  await accessibility("Project dialog");
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press(i % 2 ? "Shift+Tab" : "Tab");
    check(
      await page
        .locator("dialog")
        .evaluate((d) => d.contains(document.activeElement)),
      "Keyboard focus remains inside dialog",
    );
  }
  await page
    .locator("dialog")
    .click({ position: { x: -4, y: -4 }, force: true });
  check(
    await page.locator("dialog").evaluate((d) => !d.open),
    "Backdrop closes dialog",
  );

  await page.getByRole("button", { name: "Français", exact: true }).click();
  check(
    (await page.locator("html").getAttribute("lang")) === "fr",
    "French document language",
  );
  check(
    (await page.locator("h1").innerText()).includes("Salut, c’est Mouhsin."),
    "French hero",
  );
  await page.reload();
  check(
    (await page.locator("html").getAttribute("lang")) === "fr",
    "Language persists",
  );
  check(
    await panel("projects").isVisible(),
    "Direct section URL opens folded panel",
  );
  await filters.nth(1).click();
  await page.locator(".project-card-open").first().click();
  check(
    (await page.locator("dialog").innerText()).includes(
      "Ce que j’y ai apporté",
    ),
    "French summary",
  );
  await page.locator("dialog .technical-details>summary").click();
  check(
    (await page.locator("dialog").innerText()).includes(
      "Comment l’entraînement fédéré",
    ),
    "French technical content",
  );
  await page.keyboard.press("Escape");
  await accessibility("French expanded projects");

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await reset();
    await noOverflow(`${width}px French`);
    if (width <= 390) {
      const height = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      check(height < 4200, `Short mobile French overview (${height}px)`);
      await page
        .getByRole("button", { name: "Ouvrir la navigation", exact: true })
        .click();
      check(await page.locator(".main-nav").isVisible(), "Mobile menu opens");
      await page.locator('.main-nav a[href="#skills"]').click();
      check(
        await page.locator(".main-nav").isHidden(),
        "Mobile menu closes after navigation",
      );
      check(
        await panel("skills").isVisible(),
        "Mobile navigation expands section",
      );
      await toggle("skills").click();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/${width}-fr.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "English", exact: true }).click();
    await noOverflow(`${width}px English`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/${width}-en.png`,
      fullPage: true,
    });
    if (width === 390) await accessibility("Mobile overview");
    for (const id of order) {
      if ((await toggle(id).getAttribute("aria-expanded")) === "false")
        await toggle(id).click();
      await noOverflow(`${width}px ${id}`);
    }
    if (width === 390) await accessibility("Mobile all sections");
    await page.locator(".capability").first().click();
    await noOverflow(`${width}px dialog`);
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Français", exact: true }).click();
  }
  await page.goto(`${base}/#project/chifaa`);
  check(
    await page.locator("dialog").evaluate((d) => d.open),
    "Direct project URL opens dialog",
  );
  check(
    (await page.locator("dialog").innerText()).includes("90 %") &&
      (await page.locator("dialog").innerText()).includes(
        "validation clinique",
      ),
    "Experimental metrics stay qualified",
  );
  await page.keyboard.press("Escape");
  await page.goto(`${base}/#work`);
  check(
    await panel("projects").isVisible(),
    "Previous work anchor remains compatible",
  );
  check(errors.length === 0, `No browser errors: ${errors.join("; ")}`);
  console.log(
    `PASS: ${checks} checks. Default desktop: ${desktopHeight}px. Screenshots in test-results/.`,
  );
} finally {
  await browser.close();
}
