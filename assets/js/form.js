// form.js
// Validacion del formulario de contacto (contacto.html) y armado
// del envio de mail mediante un enlace "mailto" con los datos completados.

document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  var mensajeExito = document.getElementById("mensaje-exito");
  var mensajeError = document.getElementById("mensaje-error");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var errores = validarFormulario(formulario);
    limpiarErrores(formulario);

    if (errores.length > 0) {
      mostrarErrores(errores);
      mensajeExito.classList.remove("mostrar");
      mensajeError.classList.add("mostrar");
      return;
    }

    mensajeError.classList.remove("mostrar");
    enviarPorMail(formulario);
    mensajeExito.classList.add("mostrar");
    formulario.reset();
    formulario.classList.remove("was-validated");
  });
});

// Valida los campos obligatorios del formulario y devuelve
// un arreglo con los mensajes de error encontrados.
function validarFormulario(formulario) {
  var errores = [];

  var nombre = formulario.nombre.value.trim();
  var apellido = formulario.apellido.value.trim();
  var email = formulario.email.value.trim();
  var asunto = formulario.asunto.value;
  var mensaje = formulario.mensaje.value.trim();

  if (nombre.length < 2) {
    errores.push({ campo: "nombre", texto: "El nombre debe tener al menos 2 caracteres." });
  }
  if (apellido.length < 2) {
    errores.push({ campo: "apellido", texto: "El apellido debe tener al menos 2 caracteres." });
  }
  if (!validarEmail(email)) {
    errores.push({ campo: "email", texto: "Ingresa un correo electronico valido." });
  }
  if (asunto === "") {
    errores.push({ campo: "asunto", texto: "Selecciona un motivo de contacto." });
  }
  if (mensaje.length < 20) {
    errores.push({ campo: "mensaje", texto: "El mensaje debe tener al menos 20 caracteres." });
  }

  return errores;
}

// Formato de correo simple: algo@algo.algo
function validarEmail(valor) {
  var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor);
}

// Marca visualmente los campos invalidos y muestra el texto de error
// debajo de cada uno usando las clases de validacion de Bootstrap.
function mostrarErrores(errores) {
  errores.forEach(function (error) {
    var campo = document.getElementById(error.campo);
    if (!campo) return;
    campo.classList.add("is-invalid");

    var contenedorError = campo.parentElement.querySelector(".invalid-feedback");
    if (contenedorError) {
      contenedorError.textContent = error.texto;
    }
  });
}

function limpiarErrores(formulario) {
  var campos = formulario.querySelectorAll(".is-invalid");
  campos.forEach(function (campo) {
    campo.classList.remove("is-invalid");
  });
}

// Arma un enlace mailto con el asunto y el cuerpo del mensaje
// y lo abre para que el usuario complete el envio con su propio cliente de correo.
function enviarPorMail(formulario) {
  var nombre = formulario.nombre.value.trim();
  var apellido = formulario.apellido.value.trim();
  var email = formulario.email.value.trim();
  var asuntoSeleccionado = formulario.asunto.options[formulario.asunto.selectedIndex].text;
  var mensaje = formulario.mensaje.value.trim();

  var destinatario = "contacto.trabajofinal.mariposas@example.com";
  var asunto = "Contacto sitio Mariposas: " + asuntoSeleccionado;
  var cuerpo =
    "Nombre: " + nombre + " " + apellido + "\n" +
    "Email: " + email + "\n" +
    "Motivo: " + asuntoSeleccionado + "\n\n" +
    "Mensaje:\n" + mensaje;

  var enlaceMailto =
    "mailto:" + destinatario +
    "?subject=" + encodeURIComponent(asunto) +
    "&body=" + encodeURIComponent(cuerpo);

  window.location.href = enlaceMailto;
}
