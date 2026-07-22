document.addEventListener("DOMContentLoaded", () => {
  const botonesFiltro = document.querySelectorAll("[data-filter]");
  const seccionesTecnologia = document.querySelectorAll(".tech-section");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Restablecer estilos activos
      botonesFiltro.forEach((botonActual) => {
        botonActual.classList.remove(
          "bg-white/10",
          "text-white",
          "border-white/20",
          "shadow-[0_0_15px_rgba(255,255,255,0.05)]",
        );
        botonActual.classList.add("text-white/50", "border-transparent");
      });

      // Establecer estilo activo en el botón clickeado
      boton.classList.remove("text-white/50", "border-transparent");
      boton.classList.add(
        "bg-white/10",
        "text-white",
        "border-white/20",
        "shadow-[0_0_15px_rgba(255,255,255,0.05)]",
      );

      const filtroSeleccionado = boton.getAttribute("data-filter");

      seccionesTecnologia.forEach((seccion) => {
        if (filtroSeleccionado === "all" || seccion.id === filtroSeleccionado) {
          seccion.style.display = "block";
          seccion.style.opacity = "0";
          seccion.style.animation = "none";

          // Forzar reflujo (reflow) para reiniciar la animación
          void seccion.offsetWidth;

          seccion.style.animation =
            "slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards";
        } else {
          seccion.style.display = "none";
        }
      });
    });
  });
});
