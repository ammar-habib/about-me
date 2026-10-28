import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { projects } from "../src/data/projects.ts";
import { site } from "../src/data/site.ts";
const routes = [
  "",
  "about",
  "projects",
  "experience",
  "contact",
  ...projects.map((p) => "projects/" + p.slug),
];
let checked = 0;
const failures = [];
const titles = new Set();
const descriptions = new Set();
for (const route of routes) {
  const file = path.join("out", route, "index.html");
  assert.ok(fs.existsSync(file), "Missing route " + route);
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), "Duplicate title " + route);
  assert.ok(
    description && !descriptions.has(description),
    "Duplicate description " + route,
  );
  titles.add(title);
  descriptions.add(description);
  assert.match(html, /<h1[\s>]/, "Missing h1 " + route);
  assert.match(html, /<title>/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /name="description"/);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    let url;
    try {
      url = decodeURIComponent(match[1]);
    } catch {
      continue;
    }
    const local = path.join("out", url);
    if (
      !fs.existsSync(local) ||
      (match[0].startsWith("src=") && fs.statSync(local).isDirectory())
    )
      failures.push(`${route || "/"}: ${url}`);
    checked++;
  }
}
for (const project of projects) {
  assert.ok(
    fs.existsSync("out/" + project.legacy),
    "Missing legacy URL " + project.legacy,
  );
  for (const image of project.screenshots)
    assert.ok(
      fs.existsSync("out" + image) && fs.statSync("out" + image).isFile(),
      "Missing screenshot " + image,
    );
}
for (const asset of [
  "CNAME",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
  "404.html",
  site.resume.slice(1),
  "social-card.png",
])
  assert.ok(fs.existsSync("out/" + asset), "Missing " + asset);
assert.equal(fs.readFileSync("out/CNAME", "utf8").trim(), "ammarhabib.me");
assert.ok(
  fs.readFileSync("out/sitemap.xml", "utf8").includes("/projects/dicta/"),
);
assert.deepEqual([...new Set(failures)], [], "Broken export references");
console.log(
  `PASS: ${routes.length} routes, ${projects.length} legacy aliases, screenshots, ${checked} internal references, SEO metadata, CV, sitemap, CNAME and .nojekyll.`,
);
