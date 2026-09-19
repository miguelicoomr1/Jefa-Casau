/**
 * Renderiza los bloques de confianza de sobre-nosotros.html a partir de trust-data.js.
 * Un bloque sin datos se mantiene oculto.
 */
document.addEventListener("DOMContentLoaded", () => {
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const fill = (id, html) => {
        const section = document.getElementById(id);
        if (!section) return;
        const target = section.querySelector("[data-fill]");
        target.innerHTML = html;
        section.hidden = false;
    };

    if (trustData.stats.length) {
        fill("trust-stats", trustData.stats.map((s) => `<div class="trust-item"><strong>${esc(s.value)}</strong>${esc(s.label)}</div>`).join(""));
    }
    if (trustData.projects.length) {
        fill("trust-projects", trustData.projects.map((p) => `<article class="service-card">
            ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="400" height="300">` : ""}
            <h3>${esc(p.title)}</h3><p>${esc(p.description || "")}</p><p class="text-muted">${esc(p.place || "")}</p></article>`).join(""));
    }
    if (trustData.testimonials.length) {
        fill("trust-testimonials", trustData.testimonials.map((t) => `<figure class="testimonial">
            <p class="review-stars" role="img" aria-label="${t.rating} de 5 estrellas">★★★★★</p>${t.quote ? `<blockquote>“${esc(t.quote)}”</blockquote>` : `<p>Valoración sin comentario escrito.</p>`}<figcaption>${esc(t.name)}${t.place ? " · " + esc(t.place) : ""}</figcaption></figure>`).join(""));
    }
    if (trustData.clients.length) {
        fill("trust-clients", trustData.clients.map((c) => `<li>${esc(c)}</li>`).join(""));
    }
    if (trustData.certifications.length) {
        fill("trust-certs", trustData.certifications.map((c) => `<li>${esc(c)}</li>`).join(""));
    }
});
