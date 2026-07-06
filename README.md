# Núcleo — Proyecto Integrador ISW-306

Aplicación web desarrollada de forma incremental a lo largo de 4 etapas, como parte de la asignatura **Desarrollo de Aplicaciones Web (ISW-306)**.

## Descripción

Núcleo es un dashboard de gestión de proyectos con un módulo de registro de usuarios. El proyecto fue construido en etapas progresivas:

| Etapa | Nombre | Rama |
|---|---|---|
| 1 | Estructura Semántica y Estilización | `etapa-1/maquetacion` |
| 2 | Dinamismo y Lógica en el Cliente | `etapa-2/interactividad` |
| 3 | Backend y Persistencia de Datos | `etapa-3/backend` |
| 4 | Despliegue | `etapa-4/despliegue` |

## Tecnologías utilizadas

- **Frontend:** HTML5 semántico, CSS3 (Flexbox, Grid, Media Queries), JavaScript (DOM, Fetch API)
- **Backend:** Node.js + Express
- **Base de datos:** SQLite 3

## Estructura del proyecto

```
isw306-proyecto/
├── index.html          # Dashboard principal
├── registro.html        # Formulario de registro de usuarios
├── css/
│   └── styles.css       # Estilos generales del proyecto
├── js/
│   ├── registro.js      # Validaciones + conexión con la API
│   └── dashboard.js     # Lectura de usuarios desde la API
├── backend/
│   ├── server.js         # Servidor Express (rutas API)
│   ├── database.js       # Conexión y configuración de SQLite
│   ├── export.sql        # Script de exportación de la base de datos
│   ├── package.json
│   └── nucleo.db          # Base de datos (se genera automáticamente)
└── README.md
```

## Instrucciones de instalación

### Requisitos previos

- [Node.js](https://nodejs.org) (versión 18 o superior) instalado en tu computadora.
- Un navegador web moderno (Chrome, Edge, Firefox).

### 1. Clonar el repositorio

```bash
git clone https://github.com/yotyke/isw306-proyecto.git
cd isw306-proyecto
```

### 2. Instalar las dependencias del backend

```bash
cd backend
npm install
```

Esto instalará las dependencias necesarias: `express`, `sqlite3` y `cors`.

### 3. Levantar el servidor backend

Desde la carpeta `backend/`:

```bash
node server.js
```

Si todo funciona correctamente, verás en la consola:

```
✅ Conectado a la base de datos SQLite (nucleo.db)
✅ Tabla 'usuarios' lista para usarse
🚀 Servidor corriendo en http://localhost:3000
```

**Importante:** deja esta terminal abierta mientras uses la aplicación — el servidor debe seguir corriendo.

### 4. Abrir el frontend

Con el servidor corriendo, abre en tu navegador (doble clic):

- `index.html` → para ver el dashboard
- `registro.html` → para registrar un nuevo usuario

### 5. (Opcional) Recrear la base de datos desde el script SQL

Si quieres partir desde los datos de ejemplo incluidos en la entrega, puedes usar el archivo `backend/export.sql` con cualquier cliente de SQLite, o ejecutarlo manualmente contra `nucleo.db`.

## Endpoints de la API (backend)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/usuarios` | Lista todos los usuarios registrados |
| `POST` | `/api/usuarios` | Crea un usuario nuevo |
| `PUT` | `/api/usuarios/:id` | Actualiza un usuario existente |
| `DELETE` | `/api/usuarios/:id` | Elimina un usuario |

## Notas

- Este es un proyecto de aprendizaje individual, desarrollado de forma independiente para practicar el flujo completo de Git, HTML/CSS, JavaScript y backend con Node.js.
- Por simplicidad académica, las contraseñas ingresadas en el formulario de registro **no se envían ni se almacenan** — solo se validan en el navegador.
