// =========================================================
// Núcleo — Backend
// Servidor Express con rutas CRUD para "usuarios"
// =========================================================

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PUERTO = 3000;

// --- Middlewares ---
app.use(cors());            // Permite que registro.html/dashboard.js hagan fetch() sin bloqueos
app.use(express.json());    // Permite leer JSON en el body de las peticiones

// =========================================================
// RUTAS (endpoints)
// =========================================================

// GET /api/usuarios — Leer todos los usuarios (Read)
app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT id, nombre, correo, carrera, fecha_registro FROM usuarios ORDER BY id DESC";

  db.all(sql, [], (error, filas) => {
    if (error) {
      return res.status(500).json({ error: "Error al leer los usuarios." });
    }
    res.json(filas);
  });
});

// POST /api/usuarios — Crear un usuario nuevo (Create)
app.post("/api/usuarios", (req, res) => {
  const { nombre, correo, carrera } = req.body;

  // Validación básica en el servidor (nunca confiar solo en la validación del navegador)
  if (!nombre || !correo || !carrera) {
    return res.status(400).json({ error: "Nombre, correo y carrera son obligatorios." });
  }

  const fechaRegistro = new Date().toLocaleDateString("es-DO");
  const sql = "INSERT INTO usuarios (nombre, correo, carrera, fecha_registro) VALUES (?, ?, ?, ?)";

  db.run(sql, [nombre, correo, carrera, fechaRegistro], function (error) {
    if (error) {
      // Error típico: el correo ya existe (violación de UNIQUE)
      if (error.message.includes("UNIQUE")) {
        return res.status(409).json({ error: "Ese correo ya está registrado." });
      }
      return res.status(500).json({ error: "Error al guardar el usuario." });
    }

    // "this.lastID" es el id autogenerado del registro recién insertado
    res.status(201).json({
      id: this.lastID,
      nombre,
      correo,
      carrera,
      fecha_registro: fechaRegistro,
    });
  });
});

// PUT /api/usuarios/:id — Actualizar un usuario existente (Update)
app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo, carrera } = req.body;

  if (!nombre || !correo || !carrera) {
    return res.status(400).json({ error: "Nombre, correo y carrera son obligatorios." });
  }

  const sql = "UPDATE usuarios SET nombre = ?, correo = ?, carrera = ? WHERE id = ?";

  db.run(sql, [nombre, correo, carrera, id], function (error) {
    if (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario." });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json({ mensaje: "Usuario actualizado correctamente." });
  });
});

// DELETE /api/usuarios/:id — Borrar un usuario (Delete)
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.run(sql, [id], function (error) {
    if (error) {
      return res.status(500).json({ error: "Error al borrar el usuario." });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json({ mensaje: "Usuario borrado correctamente." });
  });
});

// --- Arrancar el servidor ---
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}`);
});
