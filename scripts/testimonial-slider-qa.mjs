import fs from "node:fs";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { testimonials } from "../src/data/testimonials.ts";
import { site } from "../src/data/site.ts";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
const results = [];
const watch = (page) => {
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
};
const active = (page) =>
  page
    .locator(".testimonial-rail > figure")
    .evaluateAll((items) =>
      items.findIndex((e) => e.classList.contains("is-current")),
    );
const settle = async (page, index) => {
  await expect.poll(() => active(page), { timeout: 3000 }).toBe(index);
  await page.waitForTimeout(650);
  await expect.poll(() => active(page)).toBe(index);
};
fs.mkdirSync("qa-results", { recursive: true });
try {
  for (const width of [375, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1100 },
    });
    const page = await context.newPage();
    watch(page);
    for (const route of ["/", "/about/"]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      const connectLinks = page
        .locator("a")
        .filter({ hasText: "Let’s connect" });
      assert.equal(await connectLinks.count(), route === "/" ? 2 : 1);
      for (const link of await connectLinks.all()) {
        assert.equal(await link.getAttribute("href"), `mailto:${site.email}`);
      }
      const section = page.locator(".testimonials-section");
      const rail = page.locator(".testimonial-rail");
      await section.scrollIntoViewIfNeeded();
      await page
        .getByRole("button", {
          name: "Pause automatic testimonials",
          exact: true,
        })
        .click();
      const expected = testimonials;
      const perPage = width < 768 ? 1 : 2;
      const last = expected.length - perPage;
      assert.equal(await rail.locator("figure").count(), expected.length);
      assert.equal(
        await rail
          .locator("figure")
          .evaluateAll(
            (figures) =>
              figures.filter(
                (e) =>
                  e.querySelector("blockquote") &&
                  e.querySelector("figcaption"),
              ).length,
          ),
        expected.length,
      );
      assert.deepEqual(
        await rail.locator(".testimonial-quote p").allTextContents(),
        expected.map((t) => t.quote),
      );
      assert.deepEqual(
        await rail.locator(".testimonial-author").allTextContents(),
        expected.map((t) => t.author),
      );
      const photos = await rail.locator("img").evaluateAll(async (imgs) => {
        for (const img of imgs) img.loading = "eager";
        await Promise.all(imgs.map((i) => i.decode()));
        return imgs.every((i) => i.naturalWidth > 0);
      });
      assert.equal(photos, true);
      assert.equal(
        await rail.evaluate((e) =>
          Number(
            getComputedStyle(e).getPropertyValue("--visible-testimonials"),
          ),
        ),
        perPage,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await page
        .getByRole("button", { name: "Next testimonials", exact: true })
        .click();
      await settle(page, 1);
      await page
        .getByRole("button", { name: "Previous testimonials", exact: true })
        .click();
      await settle(page, 0);
      await page
        .getByRole("button", { name: "Previous testimonials", exact: true })
        .click();
      await settle(page, last);
      await page
        .getByRole("button", { name: "Next testimonials", exact: true })
        .click();
      await settle(page, 0);
      await rail.focus();
      await page.keyboard.press("End");
      await settle(page, last);
      await page.keyboard.press("Home");
      await settle(page, 0);
      await page.keyboard.press("ArrowRight");
      await settle(page, 1);
      assert.equal(
        await rail.evaluate((e) => getComputedStyle(e).outlineStyle),
        "solid",
      );
      await page.keyboard.press("Home");
      await settle(page, 0);
      await rail.hover();
      await page.mouse.wheel(500, 0);
      await expect.poll(() => active(page)).toBeGreaterThan(0);
      await rail.focus();
      await page.keyboard.press("Home");
      await settle(page, 0);
      if (width >= 768) {
        await page.locator(".testimonial-dot").last().click();
        await settle(page, last);
        await page.locator(".testimonial-dot").first().click();
        await settle(page, 0);
      }
      if (width === 1440) {
        const axe = await new AxeBuilder({ page })
          .include(".testimonials-section")
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        assert.deepEqual(axe.violations, []);
      }
      if (width === 375 || width === 1440)
        await section.screenshot({
          path: `qa-results/testimonial-slider-${route === "/" ? "home" : "about"}-${width}.png`,
          style: ".header, .skip-link { visibility:hidden!important; }",
        });
      results.push({ width, route, count: expected.length, visible: perPage });
      console.log(
        `PASS ${width}px ${route}: original content, images, responsive sizing, arrows, wrap, keyboard, horizontal scroll and pagination.`,
      );
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
  });
  const page = await context.newPage();
  watch(page);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.locator(".testimonial-carousel").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect.poll(() => active(page), { timeout: 10000 }).toBe(1);
  console.log("PASS: automatic advance.");
  await page.locator(".testimonial-rail").hover();
  await page.waitForTimeout(700);
  const hoverIndex = await active(page);
  await page.waitForTimeout(6500);
  assert.equal(await active(page), hoverIndex);
  console.log("PASS: pause on hover.");
  await page
    .getByRole("button", { name: "Pause automatic testimonials", exact: true })
    .click();
  await page.mouse.move(0, 0);
  const pausedIndex = await active(page);
  await page.waitForTimeout(6500);
  assert.equal(await active(page), pausedIndex);
  console.log("PASS: explicit pause.");
  await page
    .getByRole("button", { name: "Play automatic testimonials", exact: true })
    .click();
  await page.mouse.move(0, 0);
  await expect
    .poll(() => active(page), { timeout: 10000 })
    .not.toBe(pausedIndex);
  console.log("PASS: resume automatic advance.");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(700);
  const outsideIndex = await active(page);
  await page.waitForTimeout(6500);
  assert.equal(await active(page), outsideIndex);
  console.log("PASS: no offscreen autoplay.");
  await context.close();
  const reduced = await browser.newContext({
    viewport: { width: 375, height: 1000 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reduced.newPage();
  watch(reducedPage);
  await reducedPage.goto(base + "/about/", { waitUntil: "networkidle" });
  await reducedPage.locator(".testimonial-carousel").scrollIntoViewIfNeeded();
  await expect(
    reducedPage.getByRole("button", {
      name: "Automatic testimonials disabled for reduced motion",
      exact: true,
    }),
  ).toBeDisabled();
  await reducedPage.waitForTimeout(6500);
  assert.equal(await active(reducedPage), 0);
  await reducedPage
    .getByRole("button", { name: "Next testimonials", exact: true })
    .click();
  await settle(reducedPage, 1);
  assert.equal(
    await reducedPage
      .locator(".testimonial-carousel")
      .evaluate((e) => e.getAnimations({ subtree: true }).length),
    0,
  );
  console.log(
    "PASS: reduced motion disables automatic movement; manual navigation remains available.",
  );
  await reduced.close();
  const touch = await browser.newContext({
    viewport: { width: 375, height: 1000 },
    isMobile: true,
    hasTouch: true,
  });
  const touchPage = await touch.newPage();
  watch(touchPage);
  await touchPage.goto(base + "/", { waitUntil: "networkidle" });
  await touchPage.locator(".testimonial-carousel").scrollIntoViewIfNeeded();
  await touchPage
    .getByRole("button", { name: "Pause automatic testimonials", exact: true })
    .tap();
  const touchRail = touchPage.locator(".testimonial-rail");
  const box = await touchRail.boundingBox();
  assert.ok(box);
  const cdp = await touch.newCDPSession(touchPage);
  const y = box.y + Math.min(box.height / 2, 200);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: box.x + box.width * 0.88, y }],
  });
  for (const fraction of [0.78, 0.66, 0.54, 0.42, 0.3, 0.18]) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: box.x + box.width * fraction, y }],
    });
    await touchPage.waitForTimeout(35);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect.poll(() => active(touchPage)).toBeGreaterThan(0);
  await touchPage.waitForTimeout(700);
  const touchIndex = await active(touchPage);
  await touchPage
    .getByRole("button", { name: "Play automatic testimonials", exact: true })
    .tap();
  await expect
    .poll(() => active(touchPage), { timeout: 10000 })
    .not.toBe(touchIndex);
  console.log("PASS: native touch swipe and touch autoplay resume.");
  await touch.close();
  assert.deepEqual(errors, [], "Browser errors or hydration warnings");
  fs.writeFileSync(
    "qa-results/testimonial-slider-checks.json",
    JSON.stringify(
      {
        status: "passed",
        results,
        autoplay: true,
        hoverPause: true,
        explicitPause: true,
        resume: true,
        offscreenPause: true,
        reducedMotion: true,
        nativeTouchSwipe: true,
        touchResume: true,
        accessibility: "zero section violations",
        browserErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log("PASS: all testimonial slider checks.");
} finally {
  await browser.close();
}
