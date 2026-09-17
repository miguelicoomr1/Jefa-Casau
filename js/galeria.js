/**
 * Galería con filtros por categoría y lightbox accesible con navegación
 * por teclado, ratón y gestos táctiles (swipe).
 */

let currentGalleryItems = [];
let currentLightboxIndex = 0;
let lastGalleryFocusedElement = null;

document.addEventListener("DOMContentLoaded", () => {
    renderFilters();
    renderGallery("todas");
    bindLightboxEvents();
});

function renderFilters() {
    const bar = document.getElementById("galleryFilters");
    bar.innerHTML = galleryCategories.map((cat, i) =>
        `<button class="filter-chip${i === 0 ? " is-active" : ""}" data-category="${cat.value}">${cat.label}</button>`
    ).join("");

    bar.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            bar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
            chip.classList.add("is-active");
            renderGallery(chip.getAttribute("data-category"));
        });
    });
}

function renderGallery(category) {
    const grid = document.getElementById("galleryGrid");
    const countEl = document.getElementById("galleryCount");
    currentGalleryItems = category === "todas"
        ? galleryImages
        : galleryImages.filter((img) => img.category === category);

    countEl.textContent = `${currentGalleryItems.length} imagen${currentGalleryItems.length === 1 ? "" : "es"}`;

    if (!currentGalleryItems.length) {
        grid.innerHTML = `<div class="empty-state"><h3>No hay instalaciones en esta categoría todavía.</h3></div>`;
        return;
    }

    grid.innerHTML = currentGalleryItems.map((item, index) => `
        <button class="gallery-item" data-index="${index}" data-track="galeria" aria-label="Ver imagen: ${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" width="400" height="300">
            <span class="gallery-overlay"><span>${item.title}</span></span>
        </button>
    `).join("");

    grid.querySelectorAll(".gallery-item").forEach((btn) => {
        btn.addEventListener("click", () => openLightbox(Number(btn.getAttribute("data-index"))));
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    lastGalleryFocusedElement = document.activeElement;
    updateLightboxContent();
    document.getElementById("lightbox").classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastGalleryFocusedElement) lastGalleryFocusedElement.focus();
}

function updateLightboxContent() {
    const item = currentGalleryItems[currentLightboxIndex];
    const label = galleryCategories.find((c) => c.value === item.category)?.label || item.category;
    document.getElementById("lightboxImage").src = item.image;
    document.getElementById("lightboxImage").alt = item.title;
    document.getElementById("lightboxTitle").textContent = item.title;
    document.getElementById("lightboxCategory").textContent = label;
}

function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryItems.length;
    updateLightboxContent();
}
function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    updateLightboxContent();
}

function bindLightboxEvents() {
    const lightbox = document.getElementById("lightbox");
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxNext").addEventListener("click", showNext);
    document.getElementById("lightboxPrev").addEventListener("click", showPrev);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    let touchStartX = null;
    lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
        if (touchStartX === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) diff < 0 ? showNext() : showPrev();
        touchStartX = null;
    }, { passive: true });
}
