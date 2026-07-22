document.addEventListener("DOMContentLoaded", () => {
  const modalProyecto = document.getElementById("projectModal");
  const contenidoModal = document.getElementById("modalContent");
  const botonCerrar = document.getElementById("closeModalBtn");

  function abrirModal(elementoTarjeta) {
    if(!contenidoModal) return;
    const titulo = elementoTarjeta.querySelector("h3").innerText;
    const descripcion = elementoTarjeta.querySelector("p").innerText;
    const etiquetasHTML = elementoTarjeta.querySelector(".flex.flex-wrap").innerHTML;
    const urlProyecto = elementoTarjeta.getAttribute("data-url") || "#";

    contenidoModal.innerHTML = `
      <h3 class="text-3xl font-bold text-white mb-4">${titulo}</h3>
      <p class="text-lg text-white/70 mb-6 leading-relaxed">${descripcion}</p>
      <h4 class="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Tecnologías</h4>
      <div class="flex flex-wrap gap-2 mb-8">${etiquetasHTML}</div>
      <div class="flex gap-4">
        <a href="${urlProyecto}" target="${urlProyecto === '#' ? '_self' : '_blank'}" class="px-6 py-2 rounded-full font-medium text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/5 focus-visible:ring-2 focus-visible:ring-purple-500 focus:outline-none inline-flex items-center justify-center">Ver Código</a>
      </div>
    `;
    modalProyecto.showModal();
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    if(!modalProyecto) return;
    modalProyecto.close();
    document.body.style.overflow = "";
  }

  if (modalProyecto) {
    modalProyecto.addEventListener("click", (evento) => {
      if (evento.target === modalProyecto) cerrarModal();
    });
  }

  if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrarModal);
  }

  const tarjetasProyectos = document.querySelectorAll(".glass-card-hover[data-url]");
  tarjetasProyectos.forEach(tarjeta => {
    tarjeta.addEventListener("click", function() {
      abrirModal(this);
    });
  });
});
