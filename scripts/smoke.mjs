import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

// Start npm run dev (or preview) first. Override for a production preview or CI.
const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:5173";
const executablePath = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const browser = await chromium.launch({ executablePath, headless: true });
const errors = [];
let checks = 0;
const check = (value, label) => {
  assert.ok(value, label);
  checks++;
};
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
await mkdir("test-results", { recursive: true });

async function noOverflow(label) {
  const size = await page.evaluate(() => ({
    width: window.innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  check(
    size.content <= size.width,
    `${label}: no horizontal overflow (${size.content}/${size.width})`,
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
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        null,
        2,
      ),
    );
  check(result.violations.length === 0, `${label}: automated WCAG A/AA checks`);
}

try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  check(
    await page
      .locator("h1")
      .innerText()
      .then((t) => t.includes("useful systems")),
    "English hero",
  );
  check(
    (await page.locator(".index-row").count()) === 9,
    "Nine unique indexed projects",
  );
  check(
    (await page.locator(".experience").count()) === 4,
    "Four public internships",
  );
  check(
    (await page.getByText("[ADD_COMPANY]").count()) === 0,
    "Hidden fifth entry",
  );
  check(
    (await page.getByRole("link", { name: "Download CV" }).count()) === 0,
    "CV hidden until PDF supplied",
  );
  check(
    (await page.locator('a[href="mailto:tananimouhsin@gmail.com"]').count()) ===
      1,
    "Real email action",
  );
  await noOverflow("Desktop English");
  await page.screenshot({
    path: "test-results/desktop-en.png",
    fullPage: true,
  });
  await accessibility("Desktop English");

  const filters = page.locator(".filters button");
  for (const [i, count] of [9, 3, 2, 1, 2, 1].entries()) {
    await filters.nth(i).click();
    check(
      (await page.locator(".index-row").count()) === count,
      `Filter ${i}: ${count} projects`,
    );
    check(
      (await filters.nth(i).getAttribute("aria-pressed")) === "true",
      `Filter ${i}: selected state`,
    );
  }
  await filters.nth(0).click();
  for (let i = 0; i < 9; i++) {
    await page.locator(".index-row").nth(i).click();
    check(
      await page.locator("dialog").evaluate((d) => d.open),
      `Project ${i + 1}: opens`,
    );
    check(
      (await page.locator("dialog .case-content section").count()) === 8,
      `Project ${i + 1}: substantive sections`,
    );
    check(
      await page
        .locator("dialog")
        .evaluate((d) => d.contains(document.activeElement)),
      "Focus enters dialog",
    );
    await page.keyboard.press("Escape");
    check(
      await page.locator("dialog").evaluate((d) => !d.open),
      "Escape closes dialog",
    );
    check(
      await page
        .locator(".index-row")
        .nth(i)
        .evaluate((el) => el === document.activeElement),
      "Focus returns to trigger",
    );
  }

  await page.locator(".index-row").first().click();
  await page.screenshot({ path: "test-results/case-study-en.png" });
  await accessibility("English case study");
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    check(
      await page
        .locator("dialog")
        .evaluate((d) => d.contains(document.activeElement)),
      "Dialog traps keyboard focus",
    );
  }
  await page
    .getByRole("button", { name: "Close case study", exact: true })
    .first()
    .click();

  await page.getByRole("button", { name: "Français", exact: true }).click();
  check(
    (await page.locator("html").getAttribute("lang")) === "fr",
    "French document language",
  );
  check(
    await page
      .locator("h1")
      .innerText()
      .then((t) => t.includes("système utile")),
    "French hero",
  );
  await page.locator(".index-row").first().click();
  check(
    await page
      .locator("dialog")
      .innerText()
      .then(
        (t) =>
          t.includes("Ma contribution") &&
          t.includes("Comment l’entraînement fédéré"),
      ),
    "French project details",
  );
  await page.keyboard.press("Escape");
  await page.reload();
  check(
    (await page.locator("html").getAttribute("lang")) === "fr",
    "Language persists after reload",
  );
  await accessibility("Desktop French");
  await page.screenshot({
    path: "test-results/desktop-fr.png",
    fullPage: true,
  });

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await noOverflow(`${width}px French`);
    await page.screenshot({
      path: `test-results/${width}-fr.png`,
      fullPage: true,
    });
    if (width <= 390) {
      await page.getByRole("button", { name: "Ouvrir la navigation" }).click();
      check(await page.locator(".main-nav").isVisible(), "Mobile menu opens");
      await page.locator('.main-nav a[href="#experience"]').click();
      check(
        await page.locator(".main-nav").isHidden(),
        "Mobile navigation closes after selection",
      );
      check(
        new URL(page.url()).hash === "#experience",
        "Mobile navigation reaches section",
      );
    }
    await page.getByRole("button", { name: "English", exact: true }).click();
    await noOverflow(`${width}px English`);
    await page.screenshot({
      path: `test-results/${width}-en.png`,
      fullPage: true,
    });
    await page.locator(".index-row").nth(7).click();
    await noOverflow(`${width}px dialog`);
    await page.keyboard.press("Escape");
    if (width === 390) await accessibility("Mobile English");
    await page.getByRole("button", { name: "Français", exact: true }).click();
  }

  await page.goto(`${base}/#project/chifaa`);
  check(
    await page.locator("dialog").evaluate((d) => d.open),
    "Direct project URL opens details",
  );
  check(
    await page
      .locator("dialog")
      .innerText()
      .then((t) => t.includes("90 %") && t.includes("validation clinique")),
    "Experimental figures retain qualification",
  );
  await page.keyboard.press("Escape");
  await page.locator(".index-row").first().click();
  await page
    .locator("dialog")
    .click({ position: { x: -4, y: -4 }, force: true });
  check(
    await page.locator("dialog").evaluate((d) => !d.open),
    "Backdrop closes details",
  );
  check(errors.length === 0, `No browser errors: ${errors.join("; ")}`);
  console.log(`PASS: ${checks} checks. Screenshots saved in test-results/.`);
} finally {
  await browser.close();
}
