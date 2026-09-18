/**
 * Configuración global del sitio. Punto único para actualizar teléfono, email,
 * WhatsApp y demás datos de contacto de Climatización Casau.
 */
const siteConfig = {
    companyName: "Climatización Casau",
    phone: "600000000",
    phoneDisplay: "600 000 000",
    whatsapp: "34600000000",
    whatsappMessage: "Hola, estoy interesado en vuestros servicios de climatización.",
    email: "refrigeracioncasau@gmail.com",
    address: "Calle Rosaleda 2, 30157 Murcia",
    location: "Algezares, Murcia",
    serviceArea: "Toda la Región de Murcia",
    openingHours: "Lunes a viernes, de 08:00 a 16:00",
    logo: "assets/logo/logo-placeholder.svg",
    siteUrl: "https://www.refrigeracioncasau.com",
    // Analítica: ID de medida de Google Analytics 4 (G-XXXXXXXXXX). Vacío = no se carga nada.
    gaMeasurementId: "",
    // Formularios: URL del endpoint (p. ej. https://formspree.io/f/xxxxxxx). Vacío = se abre el correo del usuario.
    formEndpoint: "",
    // Antispam extra: site key pública de Cloudflare Turnstile. Vacío = solo honeypot + tiempo mínimo.
    turnstileSiteKey: ""
};

function buildWhatsappLink(customMessage) {
    const message = encodeURIComponent(customMessage || siteConfig.whatsappMessage);
    return `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
}

function buildTelLink() {
    return `tel:+34${siteConfig.phone}`;
}

function buildMailLink() {
    return `mailto:${siteConfig.email}`;
}
