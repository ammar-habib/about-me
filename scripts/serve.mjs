import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};
http
  .createServer((req, res) => {
    try {
      let p = path.resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
      if (p !== root && !p.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(p) && fs.statSync(p).isDirectory())
        p = path.join(p, "index.html");
      if (!fs.existsSync(p)) {
        res
          .writeHead(404, { "Content-Type": "text/html" })
          .end(fs.readFileSync(path.join(root, "404.html")));
        return;
      }
      res.writeHead(200, {
        "Content-Type": mime[path.extname(p)] || "application/octet-stream",
      });
      fs.createReadStream(p).pipe(res);
    } catch {
      res.writeHead(400).end();
    }
  })
  .listen(Number(process.env.PORT || 3000), "127.0.0.1", function () {
    console.log(`Local: http://127.0.0.1:${this.address().port}`);
  });
