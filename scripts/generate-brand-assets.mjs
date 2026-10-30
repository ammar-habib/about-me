import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

// Run explicitly with npm run assets:brand. Production builds use committed assets.
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => fs.readFile(path.join(root, file));
const write = (file, bytes) => fs.writeFile(path.join(root, file), bytes);
const dataUrl = async (file, mime) =>
  `data:${mime};base64,${(await read(file)).toString("base64")}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const source = await dataUrl(
    "scripts/assets/favicon-source.png",
    "image/png",
  );
  const icons = await page.evaluate(async (source) => {
    const original = new Image();
    original.src = source;
    await original.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 180;
    const context = canvas.getContext("2d");
    context.drawImage(original, 0, 0);
    const pixels = context.getImageData(0, 0, 180, 180);
    const background = Array.from(
      context.getImageData(90, 10, 1, 1).data,
    ).slice(0, 3);
    const whiteDelta = background.map((v) => 255 - v);
    const denominator = whiteDelta.reduce((sum, v) => sum + v * v, 0);
    const navy = [11, 15, 20];
    // Recover the original white mark's antialiased coverage, without orange fringes.
    for (let i = 0; i < pixels.data.length; i += 4) {
      const coverage =
        (Math.max(
          0,
          Math.min(
            1,
            whiteDelta.reduce(
              (sum, v, c) => sum + (pixels.data[i + c] - background[c]) * v,
              0,
            ) / denominator,
          ),
        ) *
          pixels.data[i + 3]) /
        255;
      for (let c = 0; c < 3; c++)
        pixels.data[i + c] = Math.round(navy[c] + coverage * (255 - navy[c]));
      pixels.data[i + 3] = 255;
    }
    context.putImageData(pixels, 0, 0);
    return [16, 32, 48, 180].map((size) => {
      const resized = document.createElement("canvas");
      resized.width = resized.height = size;
      const draw = resized.getContext("2d");
      draw.imageSmoothingQuality = "high";
      draw.drawImage(canvas, 0, 0, size, size);
      return { size, base64: resized.toDataURL("image/png").split(",")[1] };
    });
  }, source);
  const png = (size) =>
    Buffer.from(icons.find((icon) => icon.size === size).base64, "base64");
  await write("public/favicon-32x32.png", png(32));
  await write("public/apple-touch-icon.png", png(180));
  const sizes = [16, 32, 48];
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  for (const [i, size] of sizes.entries()) {
    const start = 6 + i * 16;
    const bytes = png(size);
    header[start] = size;
    header[start + 1] = size;
    header.writeUInt16LE(1, start + 4);
    header.writeUInt16LE(32, start + 6);
    header.writeUInt32LE(bytes.length, start + 8);
    header.writeUInt32LE(offset, start + 12);
    offset += bytes.length;
  }
  await write("public/favicon.ico", Buffer.concat([header, ...sizes.map(png)]));
  let html = (await read("scripts/assets/social-card.html")).toString();
  const replacements = {
    FONT_DISPLAY: await dataUrl(
      "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2",
      "font/woff2",
    ),
    FONT_BODY: await dataUrl(
      "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      "font/woff2",
    ),
    PORTRAIT: await dataUrl(
      "public/images/ammar-professional-portrait-v3.webp",
      "image/webp",
    ),
    ICON: `data:image/png;base64,${png(180).toString("base64")}`,
  };
  for (const [name, value] of Object.entries(replacements))
    html = html.replaceAll(`{{${name}}}`, value);
  await page.setContent(html);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (img) => img.decode()));
  });
  assert.equal(
    await page.evaluate(
      () =>
        document.fonts.check("700 76px Display") &&
        document.fonts.check("400 12px Body"),
    ),
    true,
  );
  const screenshot = await page.screenshot({
    path: path.join(root, "public/social-card.png"),
    type: "png",
  });
  await fs.mkdir(path.join(root, "qa-results"), { recursive: true });
  const previews = await page.evaluate(
    async ({ image, icons }) => {
      const photo = new Image();
      photo.src = `data:image/png;base64,${image}`;
      await photo.decode();
      const small = document.createElement("canvas");
      small.width = 600;
      small.height = 315;
      small.getContext("2d").drawImage(photo, 0, 0, 600, 315);
      const sheet = document.createElement("canvas");
      sheet.width = 480;
      sheet.height = 150;
      const ctx = sheet.getContext("2d");
      ctx.fillStyle = "#111820";
      ctx.fillRect(0, 0, 480, 150);
      for (const [i, icon] of icons.entries()) {
        const img = new Image();
        img.src = `data:image/png;base64,${icon.base64}`;
        await img.decode();
        const x = 45 + i * 150;
        ctx.drawImage(img, x, 32, icon.size, icon.size);
        ctx.fillStyle = "#f5f7fa";
        ctx.font = "14px sans-serif";
        ctx.fillText(`${icon.size} × ${icon.size}`, x, 110);
      }
      return {
        small: small.toDataURL().split(",")[1],
        sheet: sheet.toDataURL().split(",")[1],
      };
    },
    {
      image: screenshot.toString("base64"),
      icons: icons.filter((i) => i.size <= 48),
    },
  );
  await write(
    "qa-results/social-card-600.png",
    Buffer.from(previews.small, "base64"),
  );
  await write(
    "qa-results/favicon-sizes.png",
    Buffer.from(previews.sheet, "base64"),
  );
  console.log(
    `Generated 1200×630 social card (${screenshot.length} bytes), ICO 16/32/48, PNG 32 and Apple icon 180.`,
  );
} finally {
  await browser.close();
}
