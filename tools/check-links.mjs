// Comprueba enlaces internos rotos (páginas, imágenes, scripts, anclas) y marcadores pendientes.
// Uso: node tools/check-links.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, posix } from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
let bad = 0, pending = 0;
const pages = readdirSync(root).filter((f) => f.endsWith(".html"));
const ids = {};
for (const p of pages) ids[p] = new Set([...readFileSync(join(root, p), "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const files = [...pages, ...readdirSync(join(root, "js")).map((f) => "js/" + f), "css/styles.css", "js/products.js", "js/gallery-data.js"];
for (const f of new Set(files)) {
  const txt = readFileSync(join(root, f), "utf8");
  for (const m of txt.matchAll(/(?:href|src)="([^"]+)"|image:\s*"([^"]+)"|url\(([^)]+)\)/g)) {
    let u = (m[1] || m[2] || m[3] || "").replace(/['"]/g, "");
    if (!u || f === "js/trust-data.js" || u.includes("${") || /^(https?:|mailto:|tel:|data:|\$\{|javascript:)/.test(u)) continue;
    if (u === "#") { if (f.endsWith(".html") && !/data-(tel|mail|whatsapp)-link/.test(txt.slice(Math.max(0, m.index - 200), m.index + 200))) { console.log(`ENLACE VACÍO  ${f}: href="#"`); bad++; } continue; }
    const [urlPath, hash] = u.split("#");
    const path = urlPath.split("?")[0];
    const target = path === "" ? f : posix.join(f.startsWith("js/") ? "." : posix.dirname(f), path);
    if (!existsSync(join(root, target))) { console.log(`ROTO  ${f} → ${u}`); bad++; }
    else if (hash && ids[target] && !ids[target].has(hash)) { console.log(`ANCLA ROTA  ${f} → ${u}`); bad++; }
  }
  if (f.endsWith(".html") && /placeholder">\[/.test(txt)) { pending += (txt.match(/placeholder">\[/g) || []).length; console.log(`PENDIENTE  ${f}: datos legales sin completar`); }
}
console.log(bad ? `\n${bad} enlace(s) con problema.` : "\nSin enlaces rotos.");
if (pending) console.log(`${pending} dato(s) legal(es) pendiente(s) de rellenar antes de publicar.`);
process.exit(bad ? 1 : 0);
