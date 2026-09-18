// Parche único y repetible de <head>, footer y banner de cookies en todas las páginas.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
const dir = fileURLToPath(new URL("../", import.meta.url));
const SITE = "https://www.refrigeracioncasau.com";

const banner = `<div class="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
  <p id="cookie-title"><strong>Tu privacidad</strong></p>
  <p>Usamos cookies técnicas necesarias y, solo si lo aceptas, cookies de estadística para mejorar la web. Puedes cambiar tu decisión en cualquier momento. Más información en la <a href="politica-cookies.html">Política de cookies</a>.</p>
  <div class="cookie-actions">
    <button type="button" class="btn btn-primary btn-sm" data-cookie-accept>Aceptar todas</button>
    <button type="button" class="btn btn-primary btn-sm" data-cookie-reject>Rechazar</button>
    <button type="button" class="btn btn-ghost btn-sm" data-cookie-configure>Configurar</button>
  </div>
  <div class="cookie-prefs">
    <div class="cookie-pref-row">
      <span>Necesarias (siempre activas)</span>
      <label class="switch"><input type="checkbox" checked disabled aria-label="Cookies necesarias"><span class="switch-slider"></span></label>
    </div>
    <div class="cookie-pref-row">
      <span>Estadística (Google Analytics)</span>
      <label class="switch"><input type="checkbox" data-cookie-stats aria-label="Cookies de estadística"><span class="switch-slider"></span></label>
    </div>
    <button type="button" class="btn btn-primary btn-sm" data-cookie-save style="margin-top: var(--space-4);">Guardar preferencias</button>
  </div>
</div>`;

for (const f of readdirSync(dir).filter((n) => n.endsWith(".html"))) {
  let h = readFileSync(dir + f, "utf8");
  const indexable = !/name="robots" content="noindex"/.test(h);
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1] || "";
  const desc = (h.match(/<meta name="description" content="(.*?)">/) || [])[1] || "";
  const canon = (h.match(/<link rel="canonical" href="(.*?)">/) || [])[1] || `${SITE}/${f}`;

  // fuentes: Google Fonts fuera, precarga local
  h = h.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">.*?display=swap[^>]*>\s*/s, "");
  if (!h.includes("inter-latin.woff2")) {
    h = h.replace('<link rel="stylesheet" href="css/styles.css">',
      '<link rel="preload" href="assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" href="assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="stylesheet" href="css/styles.css">');
  }

  // iconos + social
  h = h.replace(/<meta property="og:[^>]*>\s*|<meta name="twitter:[^>]*>\s*|<link rel="icon"[^>]*>\s*|<link rel="apple-touch-icon"[^>]*>\s*|<link rel="manifest"[^>]*>\s*|<meta name="theme-color"[^>]*>\s*/g, "");
  let social = "";
  if (indexable) {
    const ogTitle = title.split(" | ")[0];
    social = `<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Climatización Casau">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${SITE}/assets/images/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Climatización Casau — climatización profesional en Murcia">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE}/assets/images/og-image.png">
`;
  }
  const icons = `<meta name="theme-color" content="#0a1730">
<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="icon" type="image/svg+xml" href="assets/logo/favicon.svg">
<link rel="apple-touch-icon" href="assets/logo/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
`;
  h = h.replace(/(<link rel="canonical"[^>]*>\s*)/, `$1${social}${icons}`);
  if (!h.includes('rel="manifest"')) h = h.replace("</head>", `${icons}</head>`); // 404 sin canonical

  // footer: quita redes con href="#" (enlaces rotos) y añade reabrir cookies
  h = h.replace(/\s*<div class="footer-social">.*?<\/div>\s*(?=<\/div>)/s, "\n      ");
  if (!h.includes("data-cookie-open")) {
    h = h.replace(/(<a href="politica-cookies\.html">Política de cookies<\/a>)/, '$1\n        <button type="button" class="footer-link-btn" data-cookie-open>Configurar cookies</button>');
  }

  // banner de cookies uniforme
  h = h.replace(/<div class="cookie-banner".*?<\/div>\s*<\/div>\s*(?=\n?<script|\n<\/body>)/s, banner + "\n\n");
  writeFileSync(dir + f, h);
}
