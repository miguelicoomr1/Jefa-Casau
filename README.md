# CLIMATSOL — Sitio web

Proyecto estático HTML/CSS/JavaScript. Conserva el diseño, las animaciones, la navegación móvil y los componentes de la web existente.

## Desarrollo

- Ejecutar: `node tools/serve.mjs` y abrir http://127.0.0.1:5177.
- Comprobar enlaces: `node tools/check-links.mjs`.
- Generar iconos e imagen social: `node tools/make-icons.mjs` (requiere las dependencias de tools).

## Contenido y datos

- Datos de contacto: js/config.js. La dirección, el horario y el JSON-LD también están presentes en el HTML para funcionar sin JavaScript.
- Servicios: index.html. Catálogo: tienda.html y js/products.js, con 15 equipos de demostración, imágenes, precios orientativos, filtros, buscador y fichas.
- Aerotermia: aerotermia.html. Restaurada la estructura original con explicación, etapas, aplicaciones, monobloc/bibloc y marcas de ejemplo.
- Historia y reseñas: sobre-nosotros.html y js/trust-data.js.
- Las imágenes de galería son recursos ilustrativos genéricos; no se atribuyen a CLIMATSOL.
- La identificación gráfica es tipográfica, creada para esta adaptación; no se afirma que sea el logotipo oficial.

## Formularios

No hay correo ni endpoint de envío verificados. Los formularios validan los campos y descargan un resumen local, explicando que no se envía a la empresa. El contacto efectivo se realiza por teléfono. Para habilitar envío remoto se necesita un endpoint autorizado en js/config.js y actualizar los textos de los formularios y la política de privacidad. No basta con añadir un correo.

La analítica permanece desactivada. El mapa se carga voluntariamente. Las fuentes y los resultados de auditoría están en AUDITORIA.md.
