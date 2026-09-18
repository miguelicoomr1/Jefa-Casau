// Genera og-image.png, apple-touch-icon.png, icon-192/512.png y favicon.ico desde los SVG.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
const a = (p) => fileURLToPath(new URL(`../assets/${p}`, import.meta.url));
await sharp(a("images/og-image.svg")).png().toFile(a("images/og-image.png"));
for (const [n, s] of [["apple-touch-icon", 180], ["icon-192", 192], ["icon-512", 512], ["favicon-32", 32]]) {
  await sharp(a("logo/favicon.svg"), { density: 600 }).resize(s, s).png().toFile(a(`logo/${n}.png`));
}
// .ico con PNG embebido (32x32)
import { readFile, writeFile } from "node:fs/promises";
const png = await readFile(a("logo/favicon-32.png"));
const h = Buffer.alloc(22);
h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
h[6] = 32; h[7] = 32; h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12);
h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
await writeFile(fileURLToPath(new URL("../favicon.ico", import.meta.url)), Buffer.concat([h, png]));
