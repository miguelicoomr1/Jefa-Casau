/**
 * main.js — comportamiento global compartido por todas las páginas:
 * header sticky, menú móvil, contacto, banner de cookies,
 * animación al hacer scroll y utilidades de validación de formularios.
 */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileNav();
    initContactLinks();
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
    const header = document.querySelector(".site-header");
    if (!toggle || !nav) return;

    const closeNav = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        header?.classList.remove("nav-elevated");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen);
        header?.classList.toggle("nav-elevated", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav();
    });

    const mq = window.matchMedia("(min-width: 961px)");
    const handleBreakpointChange = (e) => { if (e.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener("change", handleBreakpointChange);
    else mq.addListener(handleBreakpointChange);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960 && nav.classList.contains("is-open")) closeNav();
    }, { passive: true });
}

/* ---------- Enlaces de contacto centralizados ---------- */
function initContactLinks() {
    document.querySelectorAll("[data-tel-link]").forEach((el) => { el.href = buildTelLink(); });
    document.querySelectorAll("[data-mail-link]").forEach((el) => { el.href = buildMailLink(); });
    document.querySelectorAll("[data-phone-display]").forEach((el) => { el.textContent = siteConfig.phoneDisplay; });
    document.querySelectorAll("[data-email-display]").forEach((el) => { el.textContent = siteConfig.email; });
}

/* ---------- Banner de cookies + analítica con consentimiento ---------- */
const CONSENT_KEY = "climatsol_cookie_consent";

function readConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
}

function loadAnalytics() {
    const id = siteConfig.gaMeasurementId;
    if (!id || window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", id, { anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
}

function removeAnalyticsCookies() {
    document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    });
}

function initCookieBanner() {
    const banner = document.querySelector(".cookie-banner");
    const stored = readConsent();
    if (stored && stored.stats) loadAnalytics();
    if (!banner) return;

    const prefsPanel = banner.querySelector(".cookie-prefs");
    const statsToggle = banner.querySelector("[data-cookie-stats]");
    const show = () => {
        if (statsToggle) statsToggle.checked = !!(readConsent() || {}).stats;
        banner.classList.add("is-visible");
    };

    if (!stored) show();

    function saveConsent(consent) {
        try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch (e) { /* almacenamiento no disponible */ }
        banner.classList.remove("is-visible");
        prefsPanel?.classList.remove("is-visible");
        if (consent.stats) loadAnalytics(); else removeAnalyticsCookies();
    }

    banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => saveConsent({ necessary: true, stats: true }));
    banner.querySelector("[data-cookie-reject]")?.addEventListener("click", () => saveConsent({ necessary: true, stats: false }));
    banner.querySelector("[data-cookie-configure]")?.addEventListener("click", () => prefsPanel?.classList.toggle("is-visible"));
    banner.querySelector("[data-cookie-save]")?.addEventListener("click", () => saveConsent({ necessary: true, stats: !!statsToggle?.checked }));
    document.querySelectorAll("[data-cookie-open]").forEach((b) => b.addEventListener("click", () => {
        show();
        prefsPanel?.classList.add("is-visible");
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

/* ---------- Eventos de conversión (GA4, solo con consentimiento) ---------- */
function trackConversionClicks() {
    const events = {
        "[data-tel-link]": "click_telefono",

        "[data-track='presupuesto']": "click_presupuesto",
        "[data-track='producto']": "click_producto",
        "[data-track='galeria']": "click_galeria"
    };
    Object.entries(events).forEach(([selector, eventName]) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener("click", () => {
                if (window.gtag) gtag("event", eventName);
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

/* ==========================================================================
   Envío de formularios con antispam (usado por presupuesto.js y contacto.js)
   Capas: honeypot + tiempo mínimo + Cloudflare Turnstile (opcional).
   Destino opcional: siteConfig.formEndpoint. Sin endpoint, descarga un resumen local.
   ========================================================================== */

const FormGuard = {
    MIN_FILL_MS: 4000,

    init(form) {
        form.__openedAt = Date.now();
        if (!form.querySelector(".hp-field")) {
            const hp = document.createElement("div");
            hp.className = "hp-field";
            hp.setAttribute("aria-hidden", "true");
            hp.innerHTML = '<label>No rellenar este campo<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
            form.appendChild(hp);
        }
        if (siteConfig.turnstileSiteKey && !form.querySelector(".cf-turnstile")) {
            const slot = document.createElement("div");
            slot.className = "cf-turnstile";
            slot.setAttribute("data-sitekey", siteConfig.turnstileSiteKey);
            form.querySelector("button[type='submit']")?.before(slot);
            if (!document.querySelector("script[data-turnstile]")) {
                const s = document.createElement("script");
                s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
                s.async = true; s.defer = true; s.dataset.turnstile = "1";
                document.head.appendChild(s);
            }
        }
    },

    showError(form, msg) {
        let box = form.querySelector(".form-error-banner");
        if (!box) {
            box = document.createElement("div");
            box.className = "form-error-banner";
            box.setAttribute("role", "alert");
            form.querySelector("button[type='submit']")?.after(box);
        }
        box.textContent = msg;
        box.classList.add("is-visible");
    },

    async send(form, subject) {
        form.querySelector(".form-error-banner")?.classList.remove("is-visible");
        const data = new FormData(form);

        if (data.get("website")) return true; // bot: fingimos éxito sin enviar nada
        if (Date.now() - form.__openedAt < FormGuard.MIN_FILL_MS) {
            FormGuard.showError(form, "Has enviado el formulario demasiado rápido. Espera unos segundos e inténtalo de nuevo.");
            return false;
        }
        if (siteConfig.turnstileSiteKey && !data.get("cf-turnstile-response")) {
            FormGuard.showError(form, "Completa la verificación antispam antes de enviar.");
            return false;
        }
        data.delete("website");
        data.append("_subject", subject);

        if (!siteConfig.formEndpoint) {
            const lines = [subject, 'CLIMATSOL · Teléfono: 968 84 21 43', 'Resumen local. No enviado a la empresa.', ''];
            data.forEach((v, k) => { if (typeof v === 'string' && v && !k.startsWith('_') && k !== 'cf-turnstile-response') lines.push(k + ': ' + v); });
            const blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = 'solicitud-climatsol.txt';
            document.body.appendChild(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            return true;
        }
        try {
            const res = await fetch(siteConfig.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(String(res.status));
            if (window.gtag) gtag("event", "form_submit", { form_name: subject });
            return true;
        } catch (e) {
            FormGuard.showError(form, "No hemos podido enviar el formulario. Inténtalo de nuevo o llama al 968 84 21 43.");
            return false;
        }
    }
};
