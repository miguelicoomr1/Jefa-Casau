/**
 * Formulario de presupuesto: validación de campos, prellenado desde la tienda
 * (?equipo=Marca+Modelo) y resumen local (FormGuard en main.js).
 */

document.addEventListener("DOMContentLoaded", () => {
    prefillEquipoFromQuery();
    bindFileInput();
    bindQuoteForm();
});

function prefillEquipoFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const equipo = params.get("equipo");
    const requestedService = params.get('servicio');
    const select = document.getElementById('qServicio');
    if (requestedService && [...select.options].some(o => o.value === requestedService)) select.value = requestedService;
    if (!equipo) return;
    const textarea = document.getElementById("qMensaje");
    textarea.value = `Estoy interesado en el equipo ${equipo}.`;
    const servicio = document.getElementById("qServicio");
    servicio.value = "Aire acondicionado";
}

function bindFileInput() {
    const input = document.getElementById("qArchivos");
    const list = document.getElementById("fileList");
    if (!input || !list) return;
    input.addEventListener("change", () => {
        const names = Array.from(input.files).map((f) => f.name);
        list.textContent = names.length ? `Archivos seleccionados: ${names.join(", ")}` : "";
    });
}

function bindQuoteForm() {
    const form = document.getElementById("quoteForm");
    if (!form) return;

    FormGuard.init(form);
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (validateQuoteForm(form)) {
            const btn = form.querySelector("button[type='submit']");
            btn.disabled = true;
            if (await FormGuard.send(form, "Solicitud de presupuesto — Web CLIMATSOL")) {
                document.getElementById("formSuccess").classList.add("is-visible");
                document.getElementById("formSuccess").scrollIntoView({ behavior: "smooth", block: "center" });
                btn.disabled = false;
            } else {
                btn.disabled = false;
            }
        } else {
            const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
            firstError?.focus();
        }
    });
}

function validateQuoteForm(form) {
    let valid = true;

    const nombre = form.qNombre;
    const apellidos = form.qApellidos;
    const telefono = form.qTelefono;
    const email = form.qEmail;
    const localidad = form.qLocalidad;
    const cp = form.qCP;
    const servicio = form.qServicio;
    const superficie = form.qSuperficie;
    const mensaje = form.qMensaje;
    const consentimiento = form.qConsentimiento;

    valid = checkRequired(nombre, "Introduce tu nombre.") && valid;
    valid = checkRequired(apellidos, "Introduce tus apellidos.") && valid;

    if (!FormValidation.isRequired(telefono.value)) {
        FormValidation.showError(telefono, "Este campo es obligatorio.");
        valid = false;
    } else if (!FormValidation.isPhone(telefono.value)) {
        FormValidation.showError(telefono, "Introduce un teléfono válido.");
        valid = false;
    } else {
        FormValidation.clearError(telefono);
    }

    if (!FormValidation.isRequired(email.value)) {
        FormValidation.showError(email, "Este campo es obligatorio.");
        valid = false;
    } else if (!FormValidation.isEmail(email.value)) {
        FormValidation.showError(email, "Introduce un email válido.");
        valid = false;
    } else {
        FormValidation.clearError(email);
    }

    valid = checkRequired(localidad, "Introduce tu localidad.") && valid;

    if (cp.value.trim() !== "" && !FormValidation.isPostalCode(cp.value)) {
        FormValidation.showError(cp, "Indica un código postal válido (5 dígitos).");
        valid = false;
    } else {
        FormValidation.clearError(cp);
    }

    if (!FormValidation.isRequired(servicio.value)) {
        FormValidation.showError(servicio, "Selecciona un servicio.");
        valid = false;
    } else {
        FormValidation.clearError(servicio);
    }

    if (superficie.value.trim() !== "" && !FormValidation.isPositiveNumber(superficie.value)) {
        FormValidation.showError(superficie, "Indica una superficie válida.");
        valid = false;
    } else {
        FormValidation.clearError(superficie);
    }

    if (!FormValidation.isRequired(mensaje.value)) {
        FormValidation.showError(mensaje, "Cuéntanos brevemente qué necesitas.");
        valid = false;
    } else if (!FormValidation.minLength(mensaje.value, 10)) {
        FormValidation.showError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
        valid = false;
    } else {
        FormValidation.clearError(mensaje);
    }

    if (!consentimiento.checked) {
        FormValidation.showError(consentimiento, "Debes aceptar la Política de Privacidad para continuar.");
        valid = false;
    } else {
        FormValidation.clearError(consentimiento);
    }

    return valid;
}

function checkRequired(field, message) {
    if (!FormValidation.isRequired(field.value)) {
        FormValidation.showError(field, message);
        return false;
    }
    FormValidation.clearError(field);
    return true;
}
