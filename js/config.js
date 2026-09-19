/** Datos contrastados con Google Maps el 19/09/2026. */
const siteConfig = {
    "companyName": "CLIMATSOL",
    "phone": "968842143",
    "phoneDisplay": "968 84 21 43",
    "email": "",
    "address": "C. Mayor, 37, 30158 Garres y Lages, Murcia",
    "location": "Los Garres, Murcia",
    "serviceArea": "Murcia",
    "openingHours": "Lunes a jueves, 07:00–19:00; viernes, 07:00–15:00. Sábados y domingos cerrado",
    "mapsUrl": "https://maps.app.goo.gl/cRo4LC5KYhzhjXui7",
    "siteUrl": "",
    "logo": "assets/logo/logo-placeholder.svg",
    "gaMeasurementId": "",
    "formEndpoint": "",
    "turnstileSiteKey": ""
};
function buildTelLink() { return 'tel:+34' + siteConfig.phone; }
function buildMailLink() { return siteConfig.email ? 'mailto:' + siteConfig.email : 'contacto.html'; }
