// main.js
// Comportamientos generales del sitio: marcar el enlace activo del menu
// y mostrar el boton "volver arriba".

document.addEventListener("DOMContentLoaded", function () {
  marcarEnlaceActivo();
  activarBotonVolverArriba();
  cerrarMenuMovilAlNavegar();
});

// Cada seccion principal vive en su propia carpeta (ej: conocer/index.html,
// conocer/ciclo-de-vida.html). El nombre de esa carpeta es el anteultimo
// segmento de la URL. Se compara contra esta lista para saber en que
// seccion esta parado el usuario, sin importar la profundidad de la pagina.
const CARPETAS_DE_SECCION = [
  "conocer",
  "especies",
  "habitat-jardines",
  "galeria",
  "conservacion",
  "recursos"
];

// Recorre los enlaces del navbar y le agrega la clase "active" al que
// corresponda con la seccion de la pagina actual (aunque sea una subpagina).
function marcarEnlaceActivo() {
  const segmentosRuta = window.location.pathname.split("/").filter(function (segmento) {
    return segmento !== "";
  });
  const carpetaCandidata = segmentosRuta.length > 1 ? segmentosRuta[segmentosRuta.length - 2] : null;
  const seccionActual = CARPETAS_DE_SECCION.includes(carpetaCandidata) ? carpetaCandidata : null;

  if (!seccionActual) return;

  const enlaces = document.querySelectorAll(".navbar-mariposas .nav-link[data-seccion]");
  enlaces.forEach(function (enlace) {
    if (enlace.getAttribute("data-seccion") === seccionActual) {
      enlace.classList.add("active");
    }
  });
}

// Muestra un boton flotante para volver al inicio de la pagina
// cuando el usuario baja mas de 400px.
function activarBotonVolverArriba() {
  const boton = document.getElementById("btn-volver-arriba");
  if (!boton) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      boton.classList.remove("d-none");
    } else {
      boton.classList.add("d-none");
    }
  });

  boton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// En celular, el menu principal queda desplegado (clase "show") hasta que
// se lo vuelve a tocar. Esto cierra el menu automaticamente al elegir un
// enlace, para que la navegacion se sienta mas fluida.
function cerrarMenuMovilAlNavegar() {
  const menu = document.getElementById("navbarPrincipal");
  if (!menu) return;

  const enlaces = menu.querySelectorAll("a");
  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      if (menu.classList.contains("show")) {
        const menuBootstrap = bootstrap.Collapse.getOrCreateInstance(menu);
        menuBootstrap.hide();
      }
    });
  });
}
