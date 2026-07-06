// =========================================================
// Núcleo — Dashboard
// Etapa 3: Lee los usuarios reales desde la API del backend
// (en vez de LocalStorage) y los muestra dinámicamente.
// =========================================================

const API_URL = "http://localhost:3000/api/usuarios";

const contadorUsuarios = document.getElementById("contador-usuarios");
const listaUsuarios = document.getElementById("lista-usuarios");

async function cargarUsuarios() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error("El servidor respondió con un error.");
    }

    const usuarios = await respuesta.json();

    contadorUsuarios.textContent = usuarios.length;

    if (usuarios.length === 0) {
      listaUsuarios.innerHTML =
        '<li class="deadline-item">Todavía no hay usuarios registrados.</li>';
      return;
    }

    // La API ya devuelve los usuarios ordenados del más reciente al más viejo,
    // así que solo tomamos los primeros 5.
    const ultimos = usuarios.slice(0, 5);

    listaUsuarios.innerHTML = ultimos
      .map(
        (usuario) => `
          <li class="deadline-item">
            <span class="deadline-date">${usuario.fecha_registro}</span>
            <span>${usuario.nombre} — ${usuario.correo}</span>
          </li>
        `
      )
      .join("");
  } catch (error) {
    // Esto ocurre si el servidor (node server.js) no está corriendo
    contadorUsuarios.textContent = "—";
    listaUsuarios.innerHTML =
      '<li class="deadline-item">⚠️ No se pudo conectar con el servidor backend.</li>';
  }
}

document.addEventListener("DOMContentLoaded", cargarUsuarios);
