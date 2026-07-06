-- =========================================================
-- Núcleo — Script de exportación de la base de datos
-- Proyecto ISW-306 — Etapa 3: Backend y Persistencia de Datos
-- Motor: SQLite 3
-- =========================================================
-- Este script recrea la base de datos desde cero:
-- borra la tabla si ya existe, la vuelve a crear, e inserta
-- los datos que existían al momento de la entrega.
-- =========================================================

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE,
  carrera TEXT NOT NULL,
  fecha_registro TEXT NOT NULL
);

-- --- Datos existentes al momento de la exportación ---

INSERT INTO usuarios (id, nombre, correo, carrera, fecha_registro)
VALUES (2, 'Nombre Editado', 'correo-editado@gmail.com', 'datos', '5/7/2026');

-- Nota: el id 1 fue creado y luego borrado durante las pruebas de la Etapa 3
-- (usuario "Monkey D. Luffy"), por eso el primer registro conservado es el id 2.
-- Esto es normal en SQLite: AUTOINCREMENT no reutiliza ids ya usados.
