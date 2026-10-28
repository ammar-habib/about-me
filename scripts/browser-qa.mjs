import { chromium } from "@playwright/test";
import fs from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
fs.mkdirSync("qa-results", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (e) => {
  if (e.type() === "error") errors.push(e.text());
});
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const widths = [320, 375, 430, 768, 1024, 1440, 1920];
const routes = [
  "/",
  "/about/",
  "/projects/",
  "/experience/",
  "/contact/",
  "/projects/dicta/",
];
let checks = 0;
for (const width of widths) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of routes) {
    const r = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    assert.equal(r.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    assert.equal(overflow, false, `Overflow ${width} ${route}`);
    await page.locator("h1").waitFor();
    await page.locator("img").evaluateAll(async (imgs) => {
      await Promise.all(
        imgs.map(async (i) => {
          i.loading = "eager";
          try {
            await i.decode();
          } catch {}
        }),
      );
    });
    const badImages = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src),
      );
    assert.deepEqual(badImages, [], `Images ${route}`);
    checks++;
  }
  await page.goto(base + "/");
  await page.locator("img").evaluateAll(async (imgs) => {
    await Promise.all(
      imgs.map(async (i) => {
        i.loading = "eager";
        try {
          await i.decode();
        } catch {}
      }),
    );
  });
  if ([375, 1440].includes(width))
    await page.screenshot({
      path: `qa-results/home-${width}.png`,
      fullPage: true,
    });
}
await page.setViewportSize({ width: 375, height: 850 });
await page.goto(base + "/");
const menu = page.getByRole("button", { name: "Open navigation" });
await menu.click();
await page
  .getByRole("navigation")
  .getByRole("link", { name: "About", exact: true })
  .focus();
await page.keyboard.press("Escape");
assert.equal(await menu.getAttribute("aria-expanded"), "false");
assert.equal(await menu.evaluate((e) => document.activeElement === e), true);
await menu.click();
await page
  .getByRole("navigation")
  .getByRole("link", { name: "Projects", exact: true })
  .click();
await page.waitForURL("**/projects/");
assert.equal(
  await page
    .getByRole("button", { name: "Open navigation" })
    .getAttribute("aria-expanded"),
  "false",
);
await page.getByRole("button", { name: /Email templates/ }).click();
assert.equal(await page.locator(".project-card").count(), 4);
await page.getByRole("button", { name: /All work/ }).click();
assert.equal(await page.locator(".project-card").count(), 32);
await page.goto(base + "/dicta.html");
await page.waitForURL("**/projects/dicta/");
await page.goto(base + "/#resume");
await page.waitForURL("**/experience/");
await page.goto(base + "/#portfolio/dicta");
await page.waitForURL("**/projects/dicta/");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base + "/");
assert.equal(
  await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
  "auto",
);
await page.keyboard.press("Tab");
assert.equal(
  await page
    .locator(".skip-link")
    .evaluate((e) => document.activeElement === e),
  true,
);
const accessibility = [];
await page.setViewportSize({ width: 1440, height: 1000 });
for (const route of routes) {
  await page.goto(base + route, {
    waitUntil: "networkidle",
  });
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  accessibility.push({ route, violations: result.violations });
}
fs.writeFileSync(
  "qa-results/accessibility.json",
  JSON.stringify(accessibility, null, 2),
);
assert.deepEqual(
  accessibility.flatMap((r) => r.violations.map((v) => r.route + ": " + v.id)),
  [],
  "Accessibility violations",
);
assert.deepEqual(errors, [], "Browser exceptions");
const result = {
  status: "passed",
  responsivePageChecks: checks,
  widths,
  routes,
  interactions: [
    "filters",
    "mobile navigation",
    "Escape focus return",
    "keyboard skip link",
    "reduced motion",
    "legacy HTML navigation",
    "legacy hash navigation",
  ],
  browserErrors: errors,
};
fs.writeFileSync(
  "qa-results/browser-results.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
await browser.close();
