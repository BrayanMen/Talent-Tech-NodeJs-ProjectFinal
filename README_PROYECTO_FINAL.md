# Proyecto Final - API REST de Productos

## 1. Configuración Inicial

- [X] Crear el directorio del proyecto.
- [X] Crear `index.js` como punto de entrada.
- [X] Ejecutar `npm init -y`.
- [X] Agregar `"type": "module"` en `package.json`.
- [X] Configurar script `"start": "node index.js"` en `package.json`.

## 2. Instalación de Dependencias

Instalar:

```bash
npm install express cors body-parser dotenv firebase jsonwebtoken
```

- [X] Confirmar que todas las dependencias están en `package.json`.

## 3. Configuración del Servidor (en `index.js`)

- [X] Crear app con Express.
- [X] Configurar CORS para permitir requests del frontend.
- [X] Usar `body-parser.json()` para parsear JSON.
- [X] Crear middleware para rutas no definidas (Error 404).
- [X] Crear archivo `.env` con las variables de entorno necesarias (como las de Firebase, puerto, JWT secret, etc).

## 4. Rutas

* [X] Crear carpeta `routes/`.

### ✅ `products.routes.js`

* [X] `GET /api/products` → Obtener todos los productos.
* [X] `GET /api/products/:id` → Obtener producto por ID.
* [X] `GET /api/products/search?name=xxx` → Buscar producto por nombre.
* [X] `POST /api/products/create` → Crear producto (requiere token de admin).
* [X] `PUT /api/products/:id` → Modificar producto (requiere token de admin).
* [X] `DELETE /api/products/:id` → Eliminar producto (requiere token de admin).

### ✅ `auth.routes.js`

* [X] `POST /auth/login` → Devuelve token si credenciales válidas.
* [X] `POST /auth/register` → Registra un nuevo usuario.

### ✅ `users.routes.js`

* [X] `GET /api/users` → Listar todos los usuarios (admin).
* [X] `GET /api/users/profile` → Perfil del usuario autenticado.
* [X] `GET /api/users/profile/update` → Actualizar perfil del usuario.
* [X] `DELETE /api/users/profile` → Eliminar cuenta del usuario.
* [X] `PATCH /api/users/change-password` → Cambiar contraseña.
* [X] `PATCH /api/users/wishlist` → Agregar/quitar producto de favoritos.

## 5. Controladores y Servicios

- [X] Crear carpeta `controllers/` con lógicas para cada endpoint.
- [X] Crear carpeta `services/` que maneje la lógica de negocio y use los modelos.

## 6. Modelos y Acceso a Firebase

- [X] Crear carpeta `models/`.
- [X] Crear proyecto en Firebase.
- [X] Crear colección `products` y al menos un documento para estructura.
- [X] Configurar conexión a Firebase en archivo separado (por ej. `firebase.config.js`).
- [X] Implementar métodos CRUD en los modelos usando la API de Firebase.
- [X] Conectar servicios con los modelos.

## 7. Autenticación y Seguridad

* [X] Instalar y configurar JWT.
* [X] Crear middleware `authenticate` para validar token.
* [X] Crear middleware `authRole` para validar roles.
* [X] Validar credenciales desde Firestore en el login.
* [X] Generar y devolver Bearer Token si credenciales válidas.
* [X] Aplicar autenticación y roles en rutas protegidas (`create`, `delete`, `update`).

## 8. Manejo de Errores

- [X] Usar `try-catch` en controladores y servicios.
- [X] Enviar códigos de estado correctos:
  - `400` → Error de datos o petición malformada.
  - `401` → No autenticado (no token).
  - `403` → Token inválido o sin permisos.
  - `404` → Recurso no encontrado.
  - `500` → Error interno del servidor o fallo con Firebase.

## 9. Despliegue (si aplica)

- [X] Asegurarte de no subir el archivo `.env` (agregar a `.gitignore`).
- [X] Verificar funcionamiento local de todos los endpoints.
- [X] Documentar las rutas disponibles y requerimientos de cada una.

## Bonus: Testing Manual

| Endpoint                       | Método | Requiere Token | Estado Esperado   |
| ------------------------------ | ------- | -------------- | ----------------- |
| `/api/products`              | GET     | ✅             | 200 + productos   |
| `/api/products/:id`          | GET     | ✅             | 200 o 404         |
| `/api/products/search?name`  | GET     | ✅             | 200               |
| `/api/products/create`       | POST    | ✅ (admin)     | 201 o 400         |
| `/api/products/:id`          | PUT     | ✅ (admin)     | 200 o 400/404     |
| `/api/products/:id`          | DELETE  | ✅ (admin)     | 200 o 404         |
| `/auth/login`                | POST    | ✅             | 200 + token o 401 |
| `/auth/register`             | POST    | ✅             | 201 o 400         |
| `/api/users/profile`         | GET     | ✅             | 200 o 401         |
| `/api/users/change-password` | PATCH   | ✅             | 200 o 400         |
| `/api/users/wishlist`        | PATCH   | ✅             | 200 o 400         |
| `/api/users`                 | GET     | ✅ (admin)     | 200 o 403         |
