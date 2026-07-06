// =========================================================
// Núcleo — Registro de usuarios
// Etapa 3: Validaciones en tiempo real + conexión a la API (backend)
// =========================================================

const API_URL = "http://localhost:3000/api/usuarios";

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

  // --- Si todo es válido: enviamos el usuario al backend (API real) ---
  const nuevoUsuario = {
    nombre: campoNombre.value.trim(),
    correo: campoCorreo.value.trim(),
    carrera: campoCarrera.value,
  };
  // Nota: nunca se envía ni se guarda la contraseña en texto plano en un
  // proyecto real. Aquí, por simplicidad de la Etapa 3, no la enviamos.

  const boton = formulario.querySelector("button[type='submit']");
  boton.disabled = true;
  boton.textContent = "Creando cuenta...";

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario),
  })
    .then(async (respuesta) => {
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        // El servidor respondió con un error (ej. correo duplicado)
        mostrarResultado(campoCorreo, "error-correo", datos.error || "Ocurrió un error.");
        mensajeExito.hidden = true;
        return;
      }

      // Todo salió bien: mostramos éxito y limpiamos el formulario
      mensajeExito.hidden = false;
      formulario.reset();

      document
        .querySelectorAll(".field input, .field select")
        .forEach((el) => el.classList.remove("valid", "invalid"));
    })
    .catch(() => {
      // Esto ocurre si el servidor no está corriendo (node server.js)
      mensajeExito.hidden = true;
      alert(
        "No se pudo conectar con el servidor. Verifica que 'node server.js' esté corriendo."
      );
    })
    .finally(() => {
      boton.disabled = false;
      boton.textContent = "Crear cuenta";
    });
});
