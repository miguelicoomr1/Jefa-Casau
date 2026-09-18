# Lista de lanzamiento — Climatización Casau

Estado de los 14 puntos. ✅ = hecho en el código · ⚠️ = falta un dato o una acción tuya (no se puede hacer desde el código).

| # | Punto | Estado | Qué falta |
|---|-------|--------|-----------|
| 1 | Aviso legal y privacidad | ⚠️ | Textos LSSI/RGPD completos. Rellena **razón social, NIF/CIF, datos registrales y proveedores** (marcados en rojo con `[...]`). Que un profesional los revise. |
| 2 | Banner de cookies | ✅ | Aceptar/Rechazar al mismo nivel, bloquea analítica hasta aceptar, reabrible desde el pie. |
| 3 | Móvil | ✅ | Sin desbordes horizontales en las páginas probadas a 376 px. Prueba también en tu móvil real. |
| 4 | Carga < 3 s | ✅ | Fuentes autoalojadas, imágenes WebP, sin peticiones a terceros. Verifica en producción con PageSpeed Insights. |
| 5 | Imágenes en WebP | ✅ | `cd tools && npm install && npm run images` convierte cualquier JPG/PNG nuevo de `assets/`. Referencia el `.webp` resultante. |
| 6 | Título y descripción SEO | ✅ | Únicos por página, canonical, Open Graph, JSON-LD en portada. |
| 7 | Sitemap a Google | ⚠️ | `sitemap.xml` listo. Debes enviarlo en Search Console (ver abajo). |
| 8 | Ficha de Google | ⚠️ | Hay que crearla y verificarla tú (ver abajo). |
| 9 | Favicon y vista previa | ✅ | `favicon.ico`, SVG, apple-touch, manifest y `og-image.png` (1200×630). Cámbialos cuando tengas logo real (`tools/make-icons.mjs`). |
| 10 | Formulario antispam | ⚠️ | Honeypot + tiempo mínimo listos. Para **recibir los envíos** pon `formEndpoint` en `js/config.js` (ver abajo). Turnstile opcional. |
| 11 | Cero enlaces rotos | ✅ | `node tools/check-links.mjs` → sin rotos. Redes sociales retiradas hasta tener URLs reales. |
| 12 | Analítica | ⚠️ | Instalada, solo se carga con consentimiento. Pon tu ID GA4 en `gaMeasurementId` (`js/config.js`). |
| 13 | Copia de seguridad | ✅ | Código en GitHub (`origin`). Copia local: `powershell -File tools/backup.ps1`. |
| 14 | Botón de contacto claro | ✅ | "Solicitar presupuesto", "Llamar" y WhatsApp en cabecera, WhatsApp flotante, CTA final. Falta el **teléfono real** (ahora `600000000`). |

## Datos que solo tú puedes poner

1. `js/config.js`: `phone`, `phoneDisplay`, `whatsapp`, `siteUrl` (dominio final), `gaMeasurementId`, `formEndpoint`.
2. Aviso legal y privacidad: razón social, NIF/CIF, registro, proveedores de hosting y formularios.
3. Dominio: el código asume `https://www.refrigeracioncasau.com`. Si es otro, busca y reemplaza en `*.html`, `sitemap.xml`, `robots.txt` (o rehaz con `node tools/patch-html.mjs` tras cambiar `SITE` en ese script).
4. `sobre-nosotros`: rellena `js/trust-data.js` con proyectos, testimonios, clientes, cifras y acreditaciones **reales**. Cada bloque aparece solo cuando tiene datos.
5. Fotos reales en galería (`js/gallery-data.js`) y logo real.

## Formulario: recibir los envíos

Sin `formEndpoint`, el botón abre el correo del usuario con el mensaje ya redactado (funciona, pero no es fiable). Recomendado:

1. Crea un formulario en [Formspree](https://formspree.io) (o Web3Forms) con el email `refrigeracioncasau@gmail.com`.
2. Copia la URL (`https://formspree.io/f/xxxx`) en `formEndpoint`.
3. Opcional, más antispam: crea un widget gratis en Cloudflare Turnstile y pega la *site key* en `turnstileSiteKey`. Añade el proveedor a la política de privacidad.
4. Los archivos adjuntos del presupuesto requieren plan de pago en Formspree; si no, quita el campo o pide las fotos por WhatsApp.

## Sitemap en Google (7)

1. Publica la web en su dominio.
2. Entra en <https://search.google.com/search-console> → añade la propiedad del dominio y verifícala.
3. Menú **Sitemaps** → escribe `sitemap.xml` → Enviar.
4. Comprueba que `https://TU-DOMINIO/sitemap.xml` y `/robots.txt` abren bien.

## Ficha de Google (8)

1. <https://business.google.com> → "Añadir tu empresa".
2. Nombre: Climatización Casau · categoría principal: "Contratista de aire acondicionado" (y secundaria "Instalador de calefacción").
3. Dirección: Calle Rosaleda 2, 30157 Algezares, Murcia · zona de servicio: Región de Murcia.
4. Teléfono, web, horario L–V 08:00–16:00, fotos reales y descripción.
5. Verifica (postal, teléfono o vídeo). Cuando tengas la URL de la ficha, añádela como `sameAs` en el JSON-LD de `index.html`.
6. Pide reseñas a clientes reales y enlaza la ficha desde la web.

## Analítica (12)

Crea una propiedad GA4 → copia el ID `G-XXXXXXXXXX` → `gaMeasurementId` en `js/config.js`. Eventos ya medidos: clics en teléfono, WhatsApp, presupuesto, envíos de formulario.

## Copia de seguridad (13)

- El repositorio ya está en GitHub: `git push` tras cada cambio.
- ZIP local: `powershell -File tools/backup.ps1` (crea `../backups/casau-FECHA.zip`).
- Activa las copias automáticas en tu hosting y guarda un ZIP fuera del ordenador (Drive, disco externo).

## Antes de publicar

```bash
node tools/check-links.mjs
```

Debe decir "Sin enlaces rotos" y ningún dato legal pendiente.
