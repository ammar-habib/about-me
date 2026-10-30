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
  assert.match(
    html,
    /property="og:image" content="https:\/\/ammarhabib\.me\/social-card\.png\?v=\d{8}"/,
  );
  assert.match(
    html,
    /name="twitter:image" content="https:\/\/ammarhabib\.me\/social-card\.png\?v=\d{8}"/,
  );
  for (const icon of [
    "favicon.ico",
    "favicon-32x32.png",
    "apple-touch-icon.png",
  ]) {
    assert.ok(
      html.includes(`href="/${icon}?v=20261030"`),
      "Missing versioned icon " + route + ": " + icon,
    );
  }
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
  "favicon.ico",
  "favicon-32x32.png",
  "apple-touch-icon.png",
])
  assert.ok(fs.existsSync("out/" + asset), "Missing " + asset);
for (const [asset, width, height] of [
  ["social-card.png", 1200, 630],
  ["favicon-32x32.png", 32, 32],
  ["apple-touch-icon.png", 180, 180],
]) {
  const bytes = fs.readFileSync("out/" + asset);
  assert.equal(
    bytes.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    "Invalid PNG " + asset,
  );
  assert.equal(bytes.readUInt32BE(16), width, "Wrong width " + asset);
  assert.equal(bytes.readUInt32BE(20), height, "Wrong height " + asset);
}
const ico = fs.readFileSync("out/favicon.ico");
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
assert.deepEqual(
  [6, 22, 38].map((offset) => [ico[offset], ico[offset + 1]]),
  [
    [16, 16],
    [32, 32],
    [48, 48],
  ],
);
assert.equal(fs.readFileSync("out/CNAME", "utf8").trim(), "ammarhabib.me");
assert.ok(
  fs.readFileSync("out/sitemap.xml", "utf8").includes("/projects/dicta/"),
);
assert.deepEqual([...new Set(failures)], [], "Broken export references");
console.log(
  `PASS: ${routes.length} routes, ${projects.length} legacy aliases, screenshots, ${checked} internal references, SEO metadata, CV, sitemap, CNAME and .nojekyll.`,
);
