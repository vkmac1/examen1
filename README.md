# CRUD de Productos con Node.js, Express y MongoDB

Aplicacion web completa para gestionar productos usando una API REST con Express.js, MongoDB y Mongoose, mas una interfaz HTML/CSS/JavaScript que consume la API con `fetch`.

## Caracteristicas

- CRUD completo de productos
- Validacion de datos con middleware y esquema de Mongoose
- Manejo de errores con respuestas claras
- Formulario web con `select` de categorias
- Tabla HTML para listar, editar y eliminar productos
- Conexion compatible con MongoDB local o MongoDB Atlas

## Estructura del proyecto

```text
.
|-- public/
|   |-- app.js
|   |-- index.html
|   `-- styles.css
|-- src/
|   |-- controllers/
|   |   `-- productos.controller.js
|   |-- middlewares/
|   |   |-- error.middleware.js
|   |   `-- validate-product.middleware.js
|   |-- models/
|   |   `-- producto.model.js
|   |-- routes/
|   |   `-- productos.routes.js
|   `-- server.js
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Requisitos

- Node.js 18 o superior
- MongoDB local o una cadena de conexion de MongoDB Atlas

## Instalacion

En este entorno `npm` puede estar dañado. Si te ocurre lo mismo, puedes usar `pnpm` con `corepack`.

1. Habilita `pnpm`:

```powershell
corepack enable
corepack prepare pnpm@latest --activate
```

2. Instala dependencias:

```powershell
corepack pnpm install
```

3. Crea tu archivo `.env` a partir de `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/productos_db
```

4. Ejecuta la aplicacion:

```powershell
corepack pnpm start
```

O en modo desarrollo:

```powershell
corepack pnpm dev
```

## Endpoints de la API

### Crear producto

`POST /productos`

```json
{
  "nombre": "Laptop Lenovo",
  "descripcion": "Laptop Ryzen 7 con 16 GB de RAM",
  "precio": 3500,
  "stock": 8,
  "categoria": "Electronica"
}
```

### Listar productos

`GET /productos`

### Obtener un producto

`GET /productos/:id`

### Actualizar un producto

`PUT /productos/:id`

### Eliminar un producto

`DELETE /productos/:id`

## Validaciones implementadas

- `nombre`: obligatorio, minimo 2 caracteres
- `descripcion`: obligatoria, minimo 5 caracteres
- `precio`: numero mayor o igual a 0
- `stock`: numero entero mayor o igual a 0
- `categoria`: solo permite `Electronica`, `Ropa`, `Alimentos`

## Despliegue sugerido

Para cumplir el criterio de nube puedes desplegar el proyecto en:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Cyclic](https://www.cyclic.sh/)

Solo necesitas configurar la variable `MONGODB_URI` apuntando a MongoDB Atlas.

### Despliegue rapido en Render

Este proyecto ya incluye [render.yaml](C:\Users\51994\OneDrive\Documentos\examen1\render.yaml), por lo que puedes desplegarlo desde GitHub asi:

1. Sube el proyecto a tu repositorio.
2. En Render, elige `New +` > `Blueprint`.
3. Conecta tu repositorio `examen1`.
4. Configura la variable `MONGODB_URI` con tu cadena de MongoDB Atlas.
5. Ejecuta el despliegue.

Notas importantes para produccion:

- MongoDB Atlas debe permitir la IP de Render o usar `0.0.0.0/0` durante la prueba.
- No subas tu archivo `.env`; solo configura las variables en Render.
- La aplicacion usa el puerto asignado por Render mediante `process.env.PORT`.

## Guion breve para tu video

1. Mostrar la estructura del proyecto y explicar las carpetas principales.
2. Enseñar el modelo de Mongoose y las validaciones.
3. Probar los endpoints CRUD desde la interfaz web.
4. Crear un producto, editarlo y luego eliminarlo.
5. Mostrar la conexion a MongoDB y cerrar con la URL de despliegue si la publicas.
