// main.js
// Comportamientos generales del sitio: marcar el enlace activo del menu
// y mostrar el boton "volver arriba".

document.addEventListener("DOMContentLoaded", function () {
  marcarEnlaceActivo();
  activarBotonVolverArriba();
});

// Recorre los enlaces del navbar y le agrega la clase "active"
// al que corresponda con la pagina actual.
function marcarEnlaceActivo() {
  var paginaActual = window.location.pathname.split("/").pop() || "index.html";
  var enlaces = document.querySelectorAll(".navbar-mariposas .nav-link");

  enlaces.forEach(function (enlace) {
    var destino = enlace.getAttribute("href");
    if (destino === paginaActual) {
      enlace.classList.add("active");
    }
  });
}

// Muestra un boton flotante para volver al inicio de la pagina
// cuando el usuario baja mas de 400px.
function activarBotonVolverArriba() {
  var boton = document.getElementById("btn-volver-arriba");
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
