import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
// Next.js Windows exports can put RSC segment payloads in nested directories.
// Add the flat filenames requested by the browser; Linux output already has them.
// Upstream issue: https://github.com/vercel/next.js/issues/85374
const root = path.resolve("out");
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
let aliases = 0;
for (const file of walk(root).filter((f) => f.endsWith(".txt"))) {
  const parts = path.relative(root, file).split(path.sep);
  const start = parts.findIndex(
    (p) => p.startsWith("__next.") && !p.endsWith(".txt"),
  );
  if (start < 0) continue;
  const flat = path.join(
    root,
    ...parts.slice(0, start),
    parts.slice(start).join("."),
  );
  if (!fs.existsSync(flat)) {
    fs.copyFileSync(file, flat);
    aliases++;
  }
  assert.ok(
    fs.readFileSync(file).equals(fs.readFileSync(flat)),
    "RSC alias content mismatch",
  );
}
assert.ok(
  fs.existsSync(path.join(root, "projects", "__next.projects.__PAGE__.txt")),
  "Missing static project RSC payload",
);
console.log(`Prepared static export: ${aliases} Windows RSC filename aliases.`);
