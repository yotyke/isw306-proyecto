// =========================================================
// Núcleo — Dashboard
// Lee los usuarios guardados en LocalStorage (por registro.js)
// y los muestra dinámicamente en el panel principal.
// =========================================================

const contadorUsuarios = document.getElementById("contador-usuarios");
const listaUsuarios = document.getElementById("lista-usuarios");

function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  contadorUsuarios.textContent = usuarios.length;

  if (usuarios.length === 0) {
    listaUsuarios.innerHTML =
      '<li class="deadline-item">Todavía no hay usuarios registrados.</li>';
    return;
  }

  // Construimos la lista con los últimos 5 usuarios (los más recientes primero)
  const ultimos = usuarios.slice(-5).reverse();

  listaUsuarios.innerHTML = ultimos
    .map(
      (usuario) => `
        <li class="deadline-item">
          <span class="deadline-date">${usuario.fechaRegistro}</span>
          <span>${usuario.nombre} — ${usuario.correo}</span>
        </li>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", cargarUsuarios);
