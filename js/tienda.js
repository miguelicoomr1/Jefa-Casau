/**
 * Lógica de la tienda: filtros combinables, buscador, orden, render de tarjetas
 * y modal de características de producto.
 */

document.addEventListener("DOMContentLoaded", () => {
    populateBrandFilter();
    populateBrandsStrip();
    bindFilterEvents();
    bindModalEvents();
    bindMobileFiltersToggle();
    renderProducts();
    prefillFromQueryParam();
});

function fieldValue(id, fallback = "todas") {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
}

function getFilterState() {
    return {
        brand: fieldValue("filterBrand"),
        frigories: fieldValue("filterFrigories"),
        area: fieldValue("filterArea"),
        type: fieldValue("filterType"),
        priceMin: parseFloat(fieldValue("filterPriceMin", "")) || null,
        priceMax: parseFloat(fieldValue("filterPriceMax", "")) || null,
        energy: fieldValue("filterEnergy"),
        search: fieldValue("searchInput", "").trim().toLowerCase(),
        sort: fieldValue("sortSelect", "recomendados")
    };
}

function matchesRange(value, rangeStr) {
    if (rangeStr === "todas") return true;
    const [min, max] = rangeStr.split("-").map(Number);
    return value >= min && value <= max;
}

function filterProducts() {
    const state = getFilterState();
    let result = products.filter((p) => {
        if (state.brand !== "todas" && p.brand !== state.brand) return false;
        if (!matchesRange(p.frigories, state.frigories)) return false;
        if (!matchesRange(p.area, state.area)) return false;
        if (state.type !== "todas" && p.type !== state.type) return false;
        if (state.energy !== "todas" && p.energyClass !== state.energy) return false;
        if (state.priceMin !== null && p.price < state.priceMin) return false;
        if (state.priceMax !== null && p.price > state.priceMax) return false;
        if (state.search) {
            const haystack = `${p.brand} ${p.model} ${p.type} ${p.features.join(" ")}`.toLowerCase();
            if (!haystack.includes(state.search)) return false;
        }
        return true;
    });

    switch (state.sort) {
        case "precio-asc": result.sort((a, b) => a.price - b.price); break;
        case "precio-desc": result.sort((a, b) => b.price - a.price); break;
        case "frigorias": result.sort((a, b) => a.frigories - b.frigories); break;
        case "marca": result.sort((a, b) => a.brand.localeCompare(b.brand)); break;
        default: break;
    }
    return result;
}

function renderProducts() {
    const grid = document.getElementById("productGrid");
    const countEl = document.getElementById("resultsCount");
    const filtered = filterProducts();

    countEl.textContent = `${filtered.length} producto${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;

    if (!filtered.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <h3>No hemos encontrado productos con esos filtros.</h3>
                <button class="btn btn-secondary" id="emptyClearBtn">Limpiar filtros</button>
            </div>`;
        document.getElementById("emptyClearBtn")?.addEventListener("click", clearFilters);
        return;
    }

    grid.innerHTML = filtered.map((p) => {
        const total = p.price + p.installation;
        return `
        <article class="product-card">
            <div class="product-card-image">
                <span class="product-badge">Precio orientativo</span>
                <img src="${p.image}" alt="${p.brand} ${p.model}" loading="lazy" width="400" height="300">
            </div>
            <div class="product-card-body">
                <span class="product-brand">${p.brand}</span>
                <h3 class="product-model">${p.model}</h3>
                <div class="product-specs">
                    <span>${p.type}</span>
                    <span>${p.frigories.toLocaleString("es-ES")} frigorías</span>
                    <span>${p.area} m² rec.</span>
                    <span>${p.energyClass}</span>
                </div>
                <div class="product-price-block">
                    <div class="product-price-row"><span>Equipo</span><span>${p.price.toLocaleString("es-ES")} €</span></div>
                    <div class="product-price-row"><span>Instalación desde</span><span>${p.installation.toLocaleString("es-ES")} €</span></div>
                    <div class="product-price-total"><span>Total orientativo</span><span>${total.toLocaleString("es-ES")} €</span></div>
                </div>
            </div>
            <div class="product-card-actions">
                <button class="btn btn-secondary" data-view-product="${p.id}">Ver características</button>
                <a href="presupuesto.html?equipo=${encodeURIComponent(p.brand + ' ' + p.model)}" class="btn btn-primary" data-track="producto">Solicitar presupuesto</a>
            </div>
        </article>`;
    }).join("");

    grid.querySelectorAll("[data-view-product]").forEach((btn) => {
        btn.addEventListener("click", () => openProductModal(Number(btn.getAttribute("data-view-product"))));
    });
}

function bindFilterEvents() {
    ["filterBrand", "filterFrigories", "filterArea", "filterType", "filterEnergy", "sortSelect"].forEach((id) => {
        document.getElementById(id).addEventListener("change", renderProducts);
    });
    ["filterPriceMin", "filterPriceMax"].forEach((id) => {
        document.getElementById(id).addEventListener("input", debounce(renderProducts, 300));
    });
    document.getElementById("searchInput").addEventListener("input", debounce(renderProducts, 250));
    document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);
}

function clearFilters() {
    ["filterBrand", "filterFrigories", "filterArea", "filterType", "filterEnergy"].forEach((id) => {
        document.getElementById(id).value = "todas";
    });
    document.getElementById("filterPriceMin").value = "";
    document.getElementById("filterPriceMax").value = "";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "recomendados";
    renderProducts();
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function populateBrandFilter() {
    const select = document.getElementById("filterBrand");
    const usedBrands = [...new Set(products.map((p) => p.brand))].sort();
    usedBrands.forEach((brand) => {
        const opt = document.createElement("option");
        opt.value = brand;
        opt.textContent = brand;
        select.appendChild(opt);
    });
}

function populateBrandsStrip() {
    const strip = document.getElementById("brandsStrip");
    if (!strip) return;
    strip.innerHTML = brandList.map((b) => `<span class="brand-pill">${b}</span>`).join("");
}

function bindMobileFiltersToggle() {
    const toggle = document.getElementById("toggleFiltersBtn");
    const panel = document.getElementById("filtersPanel");
    if (!toggle || !panel) return;
    toggle.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

/* ---------- Modal de producto ---------- */
let lastFocusedElement = null;

function openProductModal(productId) {
    const p = products.find((prod) => prod.id === productId);
    if (!p) return;
    const total = p.price + p.installation;
    const modal = document.getElementById("productModal");
    const content = document.getElementById("modalContent");

    content.innerHTML = `
        <div class="modal-image"><img src="${p.image}" alt="${p.brand} ${p.model}" width="400" height="300"></div>
        <div class="modal-details">
            <span class="badge-demo">Datos demo</span>
            <h2 id="modalTitle" style="margin-top:var(--space-2);">${p.brand} ${p.model}</h2>
            <p>${p.description}</p>
            <table class="modal-spec-table">
                <tr><td>Tipo</td><td>${p.type}</td></tr>
                <tr><td>Frigorías</td><td>${p.frigories.toLocaleString("es-ES")}</td></tr>
                <tr><td>Superficie recomendada</td><td>${p.area} m²</td></tr>
                <tr><td>Eficiencia</td><td>${p.energyClass}</td></tr>
                <tr><td>SEER</td><td>${p.seer}</td></tr>
                <tr><td>SCOP</td><td>${p.scop}</td></tr>
                <tr><td>Refrigerante</td><td>${p.refrigerant}</td></tr>
                <tr><td>Nivel sonoro</td><td>${p.noise}</td></tr>
                <tr><td>WiFi</td><td>${p.wifi ? "Sí" : "No"}</td></tr>
            </table>
            <ul class="check-list">
                ${p.features.map((f) => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>${f}</li>`).join("")}
            </ul>
            <div class="product-price-block">
                <div class="product-price-row"><span>Equipo</span><span>${p.price.toLocaleString("es-ES")} €</span></div>
                <div class="product-price-row"><span>Instalación desde</span><span>${p.installation.toLocaleString("es-ES")} €</span></div>
                <div class="product-price-total"><span>Total orientativo</span><span>${total.toLocaleString("es-ES")} €</span></div>
            </div>
            <p class="form-demo-note">Los precios mostrados son orientativos y deberán sustituirse por el catálogo actualizado de CLIMATSOL.</p>
            <a href="presupuesto.html?equipo=${encodeURIComponent(p.brand + ' ' + p.model)}" class="btn btn-primary btn-block" data-track="producto">Solicitar presupuesto para este equipo</a>
        </div>`;

    lastFocusedElement = document.activeElement;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.getElementById("modalCloseBtn").focus();
}

function closeProductModal() {
    const modal = document.getElementById("productModal");
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
}

function bindModalEvents() {
    const modal = document.getElementById("productModal");
    document.getElementById("modalCloseBtn").addEventListener("click", closeProductModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeProductModal(); });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeProductModal();
        if (e.key === "Tab" && modal.classList.contains("is-open")) trapFocus(e, modal);
    });
}

function trapFocus(e, container) {
    const focusable = container.querySelectorAll("button, a[href], input, select, textarea");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
    }
}

function prefillFromQueryParam() {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("marca");
    if (brand) {
        document.getElementById("filterBrand").value = brand;
        renderProducts();
    }
}
