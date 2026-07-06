// =========================================================
// Núcleo — Backend
// Conexión a la base de datos SQLite y creación de la tabla
// =========================================================

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// El archivo de la base de datos vivirá en backend/nucleo.db
const rutaBaseDeDatos = path.join(__dirname, "nucleo.db");

const db = new sqlite3.Database(rutaBaseDeDatos, (error) => {
  if (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  } else {
    console.log("✅ Conectado a la base de datos SQLite (nucleo.db)");
  }
});

// Creamos la tabla "usuarios" si todavía no existe.
// Esto se ejecuta cada vez que arranca el servidor, pero CREATE TABLE IF NOT EXISTS
// no borra los datos existentes si la tabla ya fue creada antes.
const sqlCrearTabla = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    carrera TEXT NOT NULL,
    fecha_registro TEXT NOT NULL
  )
`;

db.run(sqlCrearTabla, (error) => {
  if (error) {
    console.error("❌ Error al crear la tabla usuarios:", error.message);
  } else {
    console.log("✅ Tabla 'usuarios' lista para usarse");
  }
});

module.exports = db;
