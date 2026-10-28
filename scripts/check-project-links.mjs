import fs from "node:fs";
import { projects } from "../src/data/projects.ts";
if (process.argv.includes("--browser-only")) {
  const { chromium } = await import("@playwright/test");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const records = [];
  try {
    const context = await browser.newContext();
    for (const url of [
      "https://www.crucialappconcepts.com/",
      "https://solelinks.com/",
      "https://shipm8.com/",
    ]) {
      const page = await context.newPage();
      try {
        const response = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });
        await page.waitForTimeout(1800);
        const record = {
          url,
          status: response?.status(),
          finalUrl: page.url(),
          title: await page.title(),
        };
        if (url.includes("solelinks"))
          record.identity = await page
            .locator("body")
            .innerText()
            .then((t) =>
              /sneaker|restock|release/i.test(t)
                ? "Sneaker releases and restocks"
                : "Not confirmed from visible text",
            );
        records.push(record);
        console.log(JSON.stringify(record));
      } catch (e) {
        const record = { url, error: e.message.split("\n")[0] };
        records.push(record);
        console.log(JSON.stringify(record));
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(
    "docs/project-link-browser-audit.json",
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        records: records.map(({ excerpt, ...evidence }) => evidence),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}
const urls = new Map();
for (const p of projects)
  for (const raw of p.sourceUrls) {
    const u = new URL(raw);
    if (u.hostname.includes("dropbox.com")) continue;
    u.protocol = "https:";
    const url = u.toString();
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(p.slug);
  }
for (const [url, slug] of [
  ["https://greenectus.com/", "greenectus"],
  ["https://www.greenectus.com/", "greenectus"],
  ["https://churchbase.com/", "churchbase"],
  ["https://www.sharpbrains.co.uk/", "sharp-brains"],
  ["https://eshipsol.com/", "eshipsol"],
  ["https://www.solelinks.com/", "solelinks"],
])
  if (!urls.has(url)) urls.set(url, [slug]);
const records = [...urls].map(([url, slugs]) => ({ url, slugs }));
let cursor = 0;
const clean = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < records.length) {
      const item = records[cursor++];
      try {
        const response = await fetch(item.url, {
          signal: AbortSignal.timeout(15000),
          headers: {
            "User-Agent": "Mozilla/5.0 Portfolio link availability check",
          },
          redirect: "follow",
        });
        const body = await response.text();
        Object.assign(item, {
          status: response.status,
          finalUrl: response.url,
          title: clean(
            body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "",
          ),
          excerpt: clean(body).slice(0, 550),
        });
      } catch (e) {
        Object.assign(item, {
          error: e.cause?.code || e.name,
          message: e.message,
        });
      }
      console.log(
        JSON.stringify(
          Object.fromEntries(
            Object.entries(item).filter(([key]) => key !== "excerpt"),
          ),
        ),
      );
    }
  }),
);
fs.writeFileSync(
  "docs/project-link-http-audit.json",
  JSON.stringify({ checkedAt: new Date().toISOString(), records }, null, 2),
);
