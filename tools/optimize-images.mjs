// Convierte a WebP todo JPG/PNG de assets/ (calidad 80, máx. 1600px) y lo deja junto al original.
// Uso: cd tools && npm install && npm run images
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const root = fileURLToPath(new URL("../assets/", import.meta.url));
const exts = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (exts.has(extname(e.name).toLowerCase())) yield p;
  }
}

for await (const file of walk(root)) {
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  await sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  const [a, b] = [(await stat(file)).size, (await stat(out)).size];
  console.log(`${file} ${(a / 1024).toFixed(0)}KB -> ${(b / 1024).toFixed(0)}KB`);
}
