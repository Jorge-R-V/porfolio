const opcionesObservador = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observador = new IntersectionObserver((entradas, observadorActual) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.remove("opacity-0");
      entrada.target.classList.add("animate-slide-up-fade");
      observadorActual.unobserve(entrada.target);
    }
  });
}, opcionesObservador);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".scroll-animate")
    .forEach((elemento) => observador.observe(elemento));
});
