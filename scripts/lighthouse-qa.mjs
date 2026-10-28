import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
fs.mkdirSync("qa-results", { recursive: true });
const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox"],
  logLevel: "silent",
});
let code = 0;
try {
  const result = await lighthouse("http://127.0.0.1:3000/", {
    port: chrome.port,
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result?.lhr || result.lhr.runtimeError)
    throw new Error(
      result?.lhr?.runtimeError?.message ||
        "Lighthouse did not return a complete result",
    );
  fs.writeFileSync(
    "qa-results/lighthouse-final.json",
    JSON.stringify(result.lhr, null, 2),
  );
  console.log(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      null,
      2,
    ),
  );
} catch (error) {
  console.error(error);
  code = 1;
} finally {
  const cleaned = await Promise.race([
    Promise.resolve()
      .then(() => chrome.kill())
      .then(() => true)
      .catch(() => false),
    new Promise((resolve) => setTimeout(() => resolve(false), 8000)),
  ]);
  if (!cleaned && process.platform === "win32")
    spawnSync("taskkill", ["/PID", String(chrome.pid), "/T", "/F"], {
      windowsHide: true,
      stdio: "ignore",
    });
}
process.exit(code);
