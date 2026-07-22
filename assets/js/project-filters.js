document.addEventListener("DOMContentLoaded", () => {
  const tarjetasTecnologia = document.querySelectorAll("#frontend .glass-panel, #backend .glass-panel");
  const tarjetasProyectos = document.querySelectorAll(".glass-card-hover[data-url]");
  
  if (tarjetasProyectos.length === 0) return;
  const cuadriculaProyectos = tarjetasProyectos[0].parentElement;
  
  let filtroActivo = null;

  tarjetasTecnologia.forEach(tarjeta => {
    tarjeta.style.cursor = "pointer";
    tarjeta.title = "Filtrar proyectos por esta tecnología";
    
    tarjeta.addEventListener("click", () => {
      const etiqueta = tarjeta.querySelector("span");
      if (!etiqueta) return;
      
      const nombreTecnologiaCrudo = etiqueta.innerText;
      const nombreTecnologia = nombreTecnologiaCrudo.toLowerCase().replace(".js", "").trim();
      
      // Lógica para activar o desactivar el filtro
      if (filtroActivo === nombreTecnologia) {
        filtroActivo = null;
        tarjeta.classList.remove("ring-2", "ring-cyan-400", "bg-white/10");
      } else {
        filtroActivo = nombreTecnologia;
        tarjetasTecnologia.forEach(t => t.classList.remove("ring-2", "ring-cyan-400", "bg-white/10"));
        tarjeta.classList.add("ring-2", "ring-cyan-400", "bg-white/10");
      }
      
      let contadorVisibles = 0;
      
      // Filtrar los proyectos según la tecnología seleccionada
      tarjetasProyectos.forEach((proyecto, indice) => {
        if (!filtroActivo) {
          // Si no hay filtro, mostramos solo los 3 primeros por defecto
          if (indice < 3) {
            proyecto.style.display = "flex";
            proyecto.style.animation = "none";
            void proyecto.offsetWidth;
            proyecto.style.animation = "slide-up-fade 0.5s forwards";
            contadorVisibles++;
          } else {
            proyecto.style.display = "none";
          }
          return;
        }
        
        const etiquetasProyecto = Array.from(proyecto.querySelectorAll(".flex.flex-wrap span"))
          .map(span => span.innerText.toLowerCase().replace(".js", "").trim());
        
        const coincide = etiquetasProyecto.some(tag => tag.includes(filtroActivo) || filtroActivo.includes(tag));
        
        if (coincide) {
          proyecto.style.display = "flex";
          proyecto.style.animation = "none";
          void proyecto.offsetWidth;
          proyecto.style.animation = "slide-up-fade 0.5s forwards";
          contadorVisibles++;
        } else {
          proyecto.style.display = "none";
        }
      });
      
      // Mostrar mensaje si no hay proyectos con esa tecnología
      let mensajeSinCoincidencias = document.getElementById("mensaje-sin-coincidencias");
      if (contadorVisibles === 0) {
        if (!mensajeSinCoincidencias) {
          mensajeSinCoincidencias = document.createElement("p");
          mensajeSinCoincidencias.id = "mensaje-sin-coincidencias";
          mensajeSinCoincidencias.className = "text-white/50 text-center w-full py-8 col-span-full animate-slide-up-fade";
          mensajeSinCoincidencias.innerText = "No hay proyectos destacados usando esta tecnología actualmente.";
          cuadriculaProyectos.appendChild(mensajeSinCoincidencias);
        }
        mensajeSinCoincidencias.style.display = "block";
      } else if (mensajeSinCoincidencias) {
        mensajeSinCoincidencias.style.display = "none";
      }
      
      // Hacer scroll suave hacia los proyectos para ver los resultados
      if (cuadriculaProyectos) {
        const margenCabecera = 100;
        const posicionElemento = cuadriculaProyectos.parentElement.getBoundingClientRect().top;
        const posicionConMargen = posicionElemento + window.pageYOffset - margenCabecera;
  
        window.scrollTo({
             top: posicionConMargen,
             behavior: "smooth"
        });
      }
    });
  });

  // Estado inicial: solo mostrar los 3 primeros proyectos al cargar la página
  tarjetasProyectos.forEach((proyecto, indice) => {
    if (indice >= 3) {
      proyecto.style.display = "none";
    }
  });
});
