// =========================================================
// Núcleo — Registro de usuarios
// Etapa 2: Validaciones en tiempo real + LocalStorage
// =========================================================

// --- Referencias a elementos del DOM ---
const formulario = document.getElementById("formulario-registro");
const mensajeExito = document.getElementById("mensaje-exito");

const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoPassword = document.getElementById("password");
const campoPassword2 = document.getElementById("password2");
const campoCarrera = document.getElementById("carrera");
const campoTerminos = document.getElementById("terminos");

// --- Funciones de validación individuales ---
// Cada una devuelve un mensaje de error (string) o "" si el campo es válido.

function validarNombre() {
  const valor = campoNombre.value.trim();
  if (valor.length === 0) {
    return "El nombre es obligatorio.";
  }
  if (valor.length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }
  return "";
}

function validarCorreo() {
  const valor = campoCorreo.value.trim();
  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor.length === 0) {
    return "El correo es obligatorio.";
  }
  if (!formatoValido.test(valor)) {
    return "Ingresa un correo con formato válido (ej. nombre@dominio.com).";
  }
  return "";
}

function validarPassword() {
  const valor = campoPassword.value;
  if (valor.length === 0) {
    return "La contraseña es obligatoria.";
  }
  if (valor.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  return "";
}

function validarPassword2() {
  if (campoPassword2.value.length === 0) {
    return "Confirma tu contraseña.";
  }
  if (campoPassword2.value !== campoPassword.value) {
    return "Las contraseñas no coinciden.";
  }
  return "";
}

function validarCarrera() {
  if (campoCarrera.value === "") {
    return "Selecciona tu programa académico.";
  }
  return "";
}

function validarTerminos() {
  if (!campoTerminos.checked) {
    return "Debes aceptar los términos para continuar.";
  }
  return "";
}

// --- Función genérica para pintar el resultado en el DOM ---
// Recibe el input, el id del span de error, y el mensaje (o "" si es válido).
function mostrarResultado(input, idError, mensaje) {
  const spanError = document.getElementById(idError);
  spanError.textContent = mensaje;

  if (mensaje === "") {
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
  }
}

// --- Validación en tiempo real (mientras el usuario escribe) ---

campoNombre.addEventListener("input", () => {
  mostrarResultado(campoNombre, "error-nombre", validarNombre());
});

campoCorreo.addEventListener("input", () => {
  mostrarResultado(campoCorreo, "error-correo", validarCorreo());
});

campoPassword.addEventListener("input", () => {
  mostrarResultado(campoPassword, "error-password", validarPassword());
  // Si ya se había escrito la confirmación, la revalidamos también
  if (campoPassword2.value.length > 0) {
    mostrarResultado(campoPassword2, "error-password2", validarPassword2());
  }
});

campoPassword2.addEventListener("input", () => {
  mostrarResultado(campoPassword2, "error-password2", validarPassword2());
});

campoCarrera.addEventListener("change", () => {
  mostrarResultado(campoCarrera, "error-carrera", validarCarrera());
});

campoTerminos.addEventListener("change", () => {
  const error = document.getElementById("error-terminos");
  error.textContent = validarTerminos();
});

// --- Validación completa + guardado al enviar el formulario ---

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const errores = {
    nombre: validarNombre(),
    correo: validarCorreo(),
    password: validarPassword(),
    password2: validarPassword2(),
    carrera: validarCarrera(),
    terminos: validarTerminos(),
  };

  // Pintamos todos los errores en pantalla
  mostrarResultado(campoNombre, "error-nombre", errores.nombre);
  mostrarResultado(campoCorreo, "error-correo", errores.correo);
  mostrarResultado(campoPassword, "error-password", errores.password);
  mostrarResultado(campoPassword2, "error-password2", errores.password2);
  mostrarResultado(campoCarrera, "error-carrera", errores.carrera);
  document.getElementById("error-terminos").textContent = errores.terminos;

  // ¿Hay algún error? Si algún valor no es "", detenemos el envío.
  const hayErrores = Object.values(errores).some((mensaje) => mensaje !== "");

  if (hayErrores) {
    mensajeExito.hidden = true;
    return;
  }

  // --- Si todo es válido: guardamos el usuario en LocalStorage ---
  const nuevoUsuario = {
    nombre: campoNombre.value.trim(),
    correo: campoCorreo.value.trim(),
    carrera: campoCarrera.value,
    fechaRegistro: new Date().toLocaleDateString("es-DO"),
  };
  // Nota: nunca se guarda la contraseña en LocalStorage por seguridad,
  // ni siquiera en un proyecto de práctica — es una mala costumbre a evitar.

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mostramos el mensaje de éxito y limpiamos el formulario
  mensajeExito.hidden = false;
  formulario.reset();

  // Quitamos las clases valid/invalid después de reiniciar el formulario
  document
    .querySelectorAll(".field input, .field select")
    .forEach((el) => el.classList.remove("valid", "invalid"));
});
