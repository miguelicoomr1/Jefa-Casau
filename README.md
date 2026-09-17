# Refrigeración Casau — Sitio web

Web comercial en HTML/CSS/JavaScript vanilla para Refrigeración Casau, empresa de climatización en Algezares, Murcia.

## Cómo ejecutar la web

No requiere servidor ni build. Abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor estático:

```bash
npx serve .
```

## Estructura del proyecto

```
/
├── index.html, tienda.html, aerotermia.html, presupuesto.html,
│   galeria.html, contacto.html, sobre-nosotros.html
├── aviso-legal.html, politica-privacidad.html, politica-cookies.html
├── css/styles.css          Sistema de diseño completo (variables, componentes, responsive)
├── js/
│   ├── config.js           Datos de contacto centralizados (teléfono, email, WhatsApp)
│   ├── main.js              Header, menú móvil, WhatsApp, cookies, animaciones, validación
│   ├── products.js          Catálogo de productos demo
│   ├── gallery-data.js       Imágenes de galería demo
│   ├── tienda.js             Filtros, buscador, modal de producto
│   ├── galeria.js            Filtros de galería y lightbox
│   ├── presupuesto.js        Formulario de presupuesto
│   └── contacto.js           Formulario de contacto
└── assets/
    ├── logo/                 Logo placeholder (SVG) y favicon
    ├── products/              Imágenes demo de productos (SVG)
    ├── gallery/                Imágenes demo de galería (SVG)
    └── images/                 Imagen de fondo del hero (SVG)
```

## Cambiar teléfono, email y WhatsApp

Edita `js/config.js`:

```javascript
const siteConfig = {
    phone: "600000000",        // sin espacios, usado en tel:
    phoneDisplay: "600 000 000", // formato mostrado en pantalla
    whatsapp: "34600000000",     // con prefijo de país, sin +
    email: "refrigeracioncasau@gmail.com",
    ...
};
```

El teléfono, email y WhatsApp se actualizan automáticamente en todas las páginas (elementos con `data-tel-link`, `data-mail-link`, `data-whatsapp-link`, `data-phone-display`, `data-email-display`).

## Cambiar el logo

Sustituye `assets/logo/logo-placeholder.svg` y `assets/logo/favicon.svg` por los archivos reales (puede ser PNG, SVG o WEBP; solo hay que actualizar la ruta en `<img src="assets/logo/...">` de cada página si cambia el nombre de archivo).

## Añadir o modificar productos y precios

Edita `js/products.js`. Cada producto es un objeto dentro del array `products`:

```javascript
{
    id: 16, brand: "Marca", model: "Modelo", type: "Split",
    frigories: 3000, area: 30, price: 999, installation: 260,
    energyClass: "A++", refrigerant: "R32", seer: "...", scop: "...",
    noise: "...", wifi: true, image: "assets/products/nueva-imagen.webp",
    description: "...", features: ["...", "..."]
}
```

La interfaz (tarjetas, filtros, modal) se actualiza automáticamente sin tocar el HTML.

## Añadir fotografías

- Productos: coloca las imágenes en `assets/products/` y referencia la ruta en `image` dentro de `js/products.js`.
- Galería: coloca las imágenes en `assets/gallery/` y añade una entrada en `js/gallery-data.js`.

## Configurar el formulario (envío real)

Los formularios de `presupuesto.html` y `contacto.html` son actualmente una demostración: validan los campos pero no envían ningún email. Para conectarlos a un envío real:

1. Sustituir la lógica de `if (validateQuoteForm(form)) { ... }` en `js/presupuesto.js` (y su equivalente en `js/contacto.js`) por una llamada `fetch()` a tu servicio de envío (Formspree, Resend, un endpoint PHP propio, etc.).
2. No incluir claves de API ni credenciales en el código del cliente: usa variables de entorno en el backend.
3. El email de destino centralizado es `refrigeracioncasau@gmail.com` (ver `js/config.js`).

## Configurar Google Maps

En `contacto.html` hay un contenedor placeholder preparado para el mapa. Cuando se disponga de una API Key de Google Maps, sustituir el `div.image-placeholder` por el `<iframe>` o script de Google Maps correspondiente.

## Configurar redes sociales

Los iconos de Instagram y Facebook en el footer (`href="#"`) son placeholders. Sustituir por las URLs reales cuando estén disponibles.

## Publicar la web

Al ser HTML/CSS/JS estático, puede publicarse en cualquier hosting estático (Netlify, Vercel, GitHub Pages, hosting tradicional por FTP, etc.). No requiere base de datos ni backend salvo que se conecte el envío real de formularios.

## Datos pendientes de sustituir

- Logo real (actualmente placeholder SVG).
- Teléfono real (actualmente `600000000` de ejemplo).
- Historia real de la empresa en `sobre-nosotros.html` (marcado con `TODO`).
- CIF y razón social en `aviso-legal.html` y `politica-privacidad.html` (marcados como `[PENDIENTE]`).
- Catálogo de productos real con precios, fotos y especificaciones verificadas.
- Fotografías reales de instalaciones en la galería.
- API Key de Google Maps.
- URLs reales de redes sociales.
- Conexión real del envío de formularios por email.
