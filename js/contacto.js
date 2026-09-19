/**
 * Formulario de contacto: validación y preparación de un resumen local con antispam
 * que el formulario de presupuesto.
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    FormGuard.init(form);
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (validateContactForm(form)) {
            const btn = form.querySelector("button[type='submit']");
            btn.disabled = true;
            if (await FormGuard.send(form, "Mensaje de contacto — Web CLIMATSOL")) {
                document.getElementById("contactSuccess").classList.add("is-visible");
                document.getElementById("contactSuccess").scrollIntoView({ behavior: "smooth", block: "center" });
                btn.disabled = false;
            } else {
                btn.disabled = false;
            }
        } else {
            const firstError = form.querySelector(".has-error input, .has-error textarea");
            firstError?.focus();
        }
    });
});

function validateContactForm(form) {
    let valid = true;
    const nombre = form.cNombre;
    const email = form.cEmail;
    const telefono = form.cTelefono;
    const asunto = form.cAsunto;
    const mensaje = form.cMensaje;
    const consentimiento = form.cConsentimiento;

    if (!FormValidation.isRequired(nombre.value)) {
        FormValidation.showError(nombre, "Este campo es obligatorio.");
        valid = false;
    } else { FormValidation.clearError(nombre); }

    if (!FormValidation.isRequired(email.value)) {
        FormValidation.showError(email, "Este campo es obligatorio.");
        valid = false;
    } else if (!FormValidation.isEmail(email.value)) {
        FormValidation.showError(email, "Introduce un email válido.");
        valid = false;
    } else { FormValidation.clearError(email); }

    if (telefono.value.trim() !== "" && !FormValidation.isPhone(telefono.value)) {
        FormValidation.showError(telefono, "Introduce un teléfono válido.");
        valid = false;
    } else { FormValidation.clearError(telefono); }

    if (!FormValidation.isRequired(asunto.value)) {
        FormValidation.showError(asunto, "Este campo es obligatorio.");
        valid = false;
    } else { FormValidation.clearError(asunto); }

    if (!FormValidation.isRequired(mensaje.value)) {
        FormValidation.showError(mensaje, "Este campo es obligatorio.");
        valid = false;
    } else if (!FormValidation.minLength(mensaje.value, 10)) {
        FormValidation.showError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
        valid = false;
    } else { FormValidation.clearError(mensaje); }

    if (!consentimiento.checked) {
        FormValidation.showError(consentimiento, "Debes aceptar la Política de Privacidad para continuar.");
        valid = false;
    } else { FormValidation.clearError(consentimiento); }

    return valid;
}

// Mapa de la ficha verificada, cargado solo a petición del visitante.
document.getElementById('loadMap')?.addEventListener('click', () => {
 const frame = document.createElement('iframe');
 frame.title = 'Ubicación de CLIMATSOL en C. Mayor, 37, Garres y Lages, Murcia';
 frame.src = 'https://maps.google.com/maps?cid=3869468522116903768&output=embed';
 frame.width = '600'; frame.height = '320'; frame.style.cssText = 'width:100%;border:0';
 frame.referrerPolicy = 'no-referrer-when-downgrade';
 document.getElementById('mapContainer').replaceChildren(frame);
});
