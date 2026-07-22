document.addEventListener("DOMContentLoaded", () => {
  const anioActual = document.getElementById('current-year'); 
  if(anioActual) anioActual.textContent = new Date().getFullYear();
});
