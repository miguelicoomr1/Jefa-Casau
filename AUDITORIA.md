# Auditoría de adaptación a CLIMATSOL

Fecha: 19 de septiembre de 2026. Modificaciones locales, sin despliegue.

## Fuentes y datos contrastados

- **Fuente prioritaria:** [ficha de Google Maps facilitada](https://maps.app.goo.gl/cRo4LC5KYhzhjXui7). Se abrió la ficha y se expandió el horario semanal con la sesión iniciada por el usuario.
- Nombre en la ficha: CLIMATSOL. Empresa de climatización en Murcia.
- Dirección: C. Mayor, 37, 30158 Garres y Lages, Murcia.
- Teléfono: 968 84 21 43.
- Horario: lunes, martes, miércoles y jueves de 07:00 a 19:00; viernes de 07:00 a 15:00; sábado y domingo cerrado. No se han supuesto horarios de festivos.
- Coordenadas del establecimiento en la URL de Maps: 37.9512931, -1.0981644. Se emplean las coordenadas del lugar, no las del centro de la cámara. Identificador CID: 3869468522116903768.
- Valoraciones visibles: **abrahxm gonza**, 5 estrellas, sin texto; **oconor brian**, 5 estrellas, sin texto. Se muestran esas dos valoraciones con su nombre público y sin inventar citas. No se han añadido `aggregateRating` ni `review` al JSON-LD.
- [Datos de constitución](https://www.datoscif.es/empresa/instalaciones-y-montajes-de-climatizacion-climatsol-sl): 1 de octubre de 2004; CIF B73328593.
- [BORME de 8 de abril de 2019, acto 156973](https://www.boe.es/borme/dias/2019/04/08/pdfs/BORME-A-2019-68-30.pdf): denominación social y actividad de calefacción, fontanería, energía solar, gas y gasoil.
- [BORME de 8 de septiembre de 2020](https://www.boe.es/borme/dias/2020/09/08/pdfs/BORME-A-2020-174-30.pdf): datos registrales, tomo 2189, folio 17, hoja MU 51543.
- Se descartaron horarios y opiniones de directorios que reproducían otra dirección o una ficha anterior. No se mezclaron sus reseñas con las de la ficha indicada.
- No se configura un dominio público. Canonical, URL del negocio e imágenes sociales absolutas quedan pendientes de un dominio autorizado.

## Cambios

Se revisaron las 11 páginas HTML, scripts, CSS, SVG, configuración, manifiesto, sitemap, robots y herramientas. Se adaptaron cabecera, pie, títulos, metadatos sociales, identificación gráfica, datos estructurados, textos y contacto. Se regeneró la imagen social PNG a partir del SVG actualizado; el icono geométrico genérico no contenía información de la empresa anterior.

Se conservan el sistema visual, las fuentes, colores, navegación, adaptación mediante media queries, animaciones y galería con filtros y lightbox. Por petición posterior del usuario, se restaura el catálogo original de 15 equipos con imágenes, precios, filtros, ordenación y modal de características. Se identifica como demostración, sin atribuir sus precios ni disponibilidad a CLIMATSOL. La sección de aerotermia se restaura por petición posterior del usuario: página completa, bloque de inicio, navegación y selección en presupuesto. Las etapas se explican de forma informativa y las marcas se presentan como ejemplos. Los datos del catálogo se identifican como demostración. No se atribuyen a CLIMATSOL certificaciones, plantilla, clientes ni proyectos no documentados.

Las ilustraciones genéricas se identifican como tales. No se presentan como fotografías de instalaciones reales. La marca gráfica es una identificación tipográfica para esta web, no un logotipo oficial obtenido de la empresa.

## Verificación realizada

| Comprobación | Resultado |
|---|---|
| Referencias anteriores | Búsqueda global de nombre, dirección, código postal, teléfono, email, dominio y horario anteriores: sin coincidencias en archivos de proyecto; excluidos historial Git y dependencias. |
| Contacto | Nombre, dirección y teléfono correctos; todos los enlaces telefónicos usan `tel:+34968842143`. |
| Horario | Coincide con Google Maps en texto y JSON-LD, incluidos fines de semana cerrados. |
| Navegación | `node tools/check-links.mjs`: sin enlaces internos, recursos o anclas rotos; interpreta correctamente parámetros de consulta. |
| Servidor local | Las 11 rutas HTML responden HTTP 200. |
| JSON-LD y SEO | JSON válido en las 11 páginas; identidad, dirección, horarios y coordenadas comprobados automáticamente. Sin URL canónica ni URL pública del negocio configuradas. |
| JavaScript | Todos los archivos JS pasan `node --check`. |
| Componentes | `node tools/audit.mjs`: carga y ejecución de scripts en DOM simulado en las 11 páginas, menú abierto/cerrado, rechazo de cookies, render de reseñas, filtros y lightbox de galería. |
| Formularios | En DOM simulado: campos vacíos rechazados, datos válidos aceptados, generación de archivo local, nombre y contenido del archivo comprobados. Sin solicitudes remotas. |
| Mapa | Enlace real abierto y contrastado en Maps. Botón de carga del iframe y CID comprobados en DOM simulado. |
| Diseño | Conservado por implementación; ajustes de contraste de botones de pie y ajuste de texto de botones en móvil. Detector mecánico ejecutado; sus sugerencias estéticas sobre el diseño heredado no motivaron un rediseño. |

## Limitaciones pendientes

1. **Recepción online:** no hay correo ni endpoint autorizado y verificable. Los formularios preparan un resumen descargable y explican que no se envía. El teléfono permite el contacto real. Para habilitar envío remoto hay que configurar un destino autorizado y adaptar mensajes y política de privacidad.
2. **Prueba visual y consola real:** el navegador disponible bloqueó las URLs locales y los archivos locales por política de acceso. No se eludió el bloqueo. No se certifican render móvil, desbordamientos, errores de consola del navegador, descarga real ni render del iframe; las pruebas de componentes son de DOM simulado.
3. **Enlaces externos:** se verificaron las fuentes citadas y la ficha Maps; no se certifica la disponibilidad continua de todos los enlaces externos. No se configura ningún dominio público.
4. **Publicación:** falta confirmar dominio, alojamiento, identidad gráfica oficial y condiciones efectivas de tratamiento con el titular antes de desplegar o conectar servicios externos.

## Repetir las comprobaciones

```sh
npm ci --prefix tools
node tools/check-links.mjs
node tools/audit.mjs
node tools/serve.mjs
```

Abrir la vista local en un navegador con acceso permitido y comprobar escritorio y móvil, formularios, menú, mapa y consola. El servidor local está limitado a 127.0.0.1.
