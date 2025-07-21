# 🛠️ Proyecto Final - API REST de Productos

## 📁 1. Configuración Inicial

- [X] Crear el directorio del proyecto.
- [X] Crear `index.js` como punto de entrada.
- [X] Ejecutar `npm init -y`.
- [X] Agregar `"type": "module"` en `package.json`.
- [X] Configurar script `"start": "node index.js"` en `package.json`.

## 📦 2. Instalación de Dependencias

Instalar:

```bash
npm install express cors body-parser dotenv firebase jsonwebtoken
```

- [X] Confirmar que todas las dependencias están en `package.json`.

## 🌐 3. Configuración del Servidor (en `index.js`)

- [X] Crear app con Express.
- [X] Configurar CORS para permitir requests del frontend.
- [X] Usar `body-parser.json()` para parsear JSON.
- [ ] Crear middleware para rutas no definidas (Error 404).
- [X] Crear archivo `.env` con las variables de entorno necesarias (como las de Firebase, puerto, JWT secret, etc).

## 🚦 4. Rutas

- [X] Crear carpeta `routes/`.

**`products.routes.js`**

- [X] `GET /api/products` → Obtener todos los productos.
- [X] `GET /api/products/:id` → Obtener Producto por ID.
- [X] `GET /api/search?name=xxxx` → Buscar Producto por nombre.
- [X] `POST /api/products/create` → Crear producto.
- [X] `PUT /api/products/:ID` → Modificar producto.
- [X] `DELETE /api/products/:id` → Eliminar producto.

**`auth.routes.js`**

- [ ] `POST /auth/login` → Devuelve token si credenciales válidas.

## 🧠 5. Controladores y Servicios

- [X] Crear carpeta `controllers/` con lógicas para cada endpoint.
- [X] Crear carpeta `services/` que maneje la lógica de negocio y use los modelos.

## 🗄️ 6. Modelos y Acceso a Firebase

- [X] Crear carpeta `models/`.
- [X] Crear proyecto en Firebase.
- [X] Crear colección `products` y al menos un documento para estructura.
- [X] Configurar conexión a Firebase en archivo separado (por ej. `firebase.config.js`).
- [X] Implementar métodos CRUD en los modelos usando la API de Firebase.
- [X] Conectar servicios con los modelos.

## 🔐 7. Autenticación y Seguridad

- [X] Instalar y configurar JWT.
- [ ] Crear middleware `authMiddleware.js` para proteger rutas privadas.
- [ ] Validar credenciales en el login (puede ser hardcodeado o traído de Firebase).
- [ ] Generar y devolver Bearer Token si credenciales son válidas.
- [ ] Aplicar middleware de autenticación a rutas protegidas (crear, eliminar, etc.).

## ❌ 8. Manejo de Errores

- [X] Usar `try-catch` en controladores y servicios.
- [X] Enviar códigos de estado correctos:
  - `400` → Error de datos o petición malformada.
  - `401` → No autenticado (no token).
  - `403` → Token inválido o sin permisos.
  - `404` → Recurso no encontrado.
  - `500` → Error interno del servidor o fallo con Firebase.

## 📤 9. Despliegue (si aplica)

- [X] Asegurarte de no subir el archivo `.env` (agregar a `.gitignore`).
- [X] Verificar funcionamiento local de todos los endpoints.
- [ ] Documentar las rutas disponibles y requerimientos de cada una.

---

## 🧪 Bonus: Checklist de testing manual

| Endpoint                 | Método | Token necesario | Estado esperado       |
| ------------------------ | ------- | --------------- | --------------------- |
| `/api/products`        | GET     | ✅              | 200 + array productos |
| `/api/products/:id`    | GET     | ✅              | 200 o 404             |
| `/api/products/create` | POST    | ✅              | 201 o 400             |
| `/api/products/:id`    | DELETE  | ✅              | 200 o 404             |
| `/auth/login`          | POST    | ❌              | 200 + token o 401     |
