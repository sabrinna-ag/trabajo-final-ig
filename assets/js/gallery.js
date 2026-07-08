// gallery.js
// Funcionamiento de la galeria interactiva (galeria.html):
// filtro por categoria y vista ampliada en un modal de Bootstrap.

document.addEventListener("DOMContentLoaded", function () {
  activarFiltros();
  activarModalAmpliado();
});

// Al hacer clic en un boton de categoria, muestra solo los items
// de esa categoria (o todos si se elige "Todas").
function activarFiltros() {
  var botones = document.querySelectorAll(".filtro-galeria button");
  var items = document.querySelectorAll(".item-galeria");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      botones.forEach(function (b) { b.classList.remove("activo"); });
      boton.classList.add("activo");

      var categoria = boton.getAttribute("data-categoria");

      items.forEach(function (item) {
        var coincide = categoria === "todas" || item.getAttribute("data-categoria") === categoria;
        item.classList.toggle("oculto", !coincide);
      });
    });
  });
}

// Al hacer clic sobre una miniatura, carga la imagen ampliada,
// el titulo, la descripcion y el credito dentro del modal.
function activarModalAmpliado() {
  var items = document.querySelectorAll(".item-galeria");
  var modalImagen = document.getElementById("modal-imagen-ampliada");
  var modalTitulo = document.getElementById("modal-titulo-imagen");
  var modalDescripcion = document.getElementById("modal-descripcion-imagen");
  var modalCredito = document.getElementById("modal-credito-imagen");

  if (!modalImagen) return;

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      modalImagen.src = img.getAttribute("src");
      modalImagen.alt = img.getAttribute("alt");
      modalTitulo.textContent = item.getAttribute("data-titulo") || "";
      modalDescripcion.textContent = item.getAttribute("data-descripcion") || "";
      modalCredito.textContent = item.getAttribute("data-credito") || "";
    });
  });
}
