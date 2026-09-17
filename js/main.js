/**
 * main.js — comportamiento global compartido por todas las páginas:
 * header sticky, menú móvil, WhatsApp flotante, banner de cookies,
 * animación al hacer scroll y utilidades de validación de formularios.
 */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileNav();
    initWhatsappLinks();
    initCookieBanner();
    initScrollReveal();
    trackConversionClicks();
});

/* ---------- Header sticky ---------- */
function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Menú móvil ---------- */
function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    const closeNav = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
    });
}

/* ---------- Enlaces WhatsApp / teléfono / email centralizados ---------- */
function initWhatsappLinks() {
    document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
        const customMsg = el.getAttribute("data-whatsapp-message");
        el.href = buildWhatsappLink(customMsg);
    });
    document.querySelectorAll("[data-tel-link]").forEach((el) => { el.href = buildTelLink(); });
    document.querySelectorAll("[data-mail-link]").forEach((el) => { el.href = buildMailLink(); });
    document.querySelectorAll("[data-phone-display]").forEach((el) => { el.textContent = siteConfig.phoneDisplay; });
    document.querySelectorAll("[data-email-display]").forEach((el) => { el.textContent = siteConfig.email; });
}

/* ---------- Banner de cookies ---------- */
function initCookieBanner() {
    const banner = document.querySelector(".cookie-banner");
    if (!banner) return;

    const STORAGE_KEY = "casau_cookie_consent";
    let stored;
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }

    const acceptAllBtn = banner.querySelector("[data-cookie-accept]");
    const rejectBtn = banner.querySelector("[data-cookie-reject]");
    const configureBtn = banner.querySelector("[data-cookie-configure]");
    const saveBtn = banner.querySelector("[data-cookie-save]");
    const prefsPanel = banner.querySelector(".cookie-prefs");
    const statsToggle = banner.querySelector("[data-cookie-stats]");
    const marketingToggle = banner.querySelector("[data-cookie-marketing]");

    if (!stored) {
        banner.classList.add("is-visible");
    }

    function saveConsent(consent) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch (e) { /* almacenamiento no disponible */ }
        banner.classList.remove("is-visible");
    }

    acceptAllBtn?.addEventListener("click", () => saveConsent({ necessary: true, preferences: true, stats: true, marketing: true }));
    rejectBtn?.addEventListener("click", () => saveConsent({ necessary: true, preferences: false, stats: false, marketing: false }));
    configureBtn?.addEventListener("click", () => prefsPanel?.classList.toggle("is-visible"));
    saveBtn?.addEventListener("click", () => saveConsent({
        necessary: true,
        preferences: true,
        stats: !!statsToggle?.checked,
        marketing: !!marketingToggle?.checked
    }));
}

/* ---------- Animación al hacer scroll ---------- */
function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach((el) => observer.observe(el));
}

/* ---------- Eventos de conversión (preparado para analítica futura) ---------- */
function trackConversionClicks() {
    const events = {
        "[data-tel-link]": "click_telefono",
        "[data-whatsapp-link]": "click_whatsapp",
        "[data-track='presupuesto']": "click_presupuesto",
        "[data-track='producto']": "click_producto",
        "[data-track='galeria']": "click_galeria"
    };
    Object.entries(events).forEach(([selector, eventName]) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener("click", () => {
                if (window.dataLayer) window.dataLayer.push({ event: eventName });
            });
        });
    });
}

/* ==========================================================================
   Utilidades de validación de formularios (usadas por presupuesto.js y contacto.js)
   ========================================================================== */

const FormValidation = {
    isRequired(value) { return value.trim().length > 0; },
    isEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); },
    isPhone(value) { return /^[6789]\d{2}\s?\d{3}\s?\d{3}$/.test(value.trim().replace(/\s+/g, "")) || /^[6789]\d{8}$/.test(value.trim().replace(/\s+/g, "")); },
    isPostalCode(value) { return /^\d{5}$/.test(value.trim()); },
    isPositiveNumber(value) { return value.trim() !== "" && Number(value) > 0; },
    minLength(value, min) { return value.trim().length >= min; },

    showError(field, message) {
        const group = field.closest(".form-group");
        if (!group) return;
        group.classList.add("has-error");
        const errorEl = group.querySelector(".field-error");
        if (errorEl) errorEl.textContent = message;
    },
    clearError(field) {
        const group = field.closest(".form-group");
        if (!group) return;
        group.classList.remove("has-error");
        const errorEl = group.querySelector(".field-error");
        if (errorEl) errorEl.textContent = "";
    }
};
