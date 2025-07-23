
# Talento Tech - Proyecto Final Node.js + Firebase

Una API RESTful desarrollada para administrar productos y usuarios de forma segura, escalable y lista para producción. Utiliza Firebase Firestore como base de datos, Express.js como framework backend y JWT para autenticación.

## Características

- CRUD completo de productos
- Autenticación con JWT
- Roles: `admin`, `user`
- Protección de rutas con middleware
- Registro y login de usuarios
- Wishlist por usuario
- Cambio de contraseña
- Paginado y filtrado por categoría, disponibilidad y precio
- Arquitectura limpia: Routes, Controllers, Services, Models
- Firebase Firestore como base de datos en la nube

## Instalación

```bash
git clone https://github.com/tuusuario/proyecto-final-techlab.git
cd proyecto-final-techlab
npm install
```


## Variables de entorno

Crea un archivo `.env` en la raíz y agrega:

```
PORT=8080

JWT_SECRET=secreto

NODE_ENV=development

DEV_URL=http://localhost:8080
PROD_URL=''

FIREBASE_API_KEY=xxxxx
FIREBASE_AUTH_DOMAIN=xxxxxx
FIREBASE_PROJECT_ID=xxxxxxx
FIREBASE_STORAGE_BUCKET=xxxxxx
FIREBASE_MESSAGING_SENDER_ID=xxxxx
FIREBASE_APP_ID=xxxxxxx
MEASUREMENT_ID=xxxxxxx
```

## Cómo correr el servidor

```
npm run start
```

Servidor disponible en: `http://localhost:3001`

## Pruebas con Postman

Podés importar la siguiente colección para testear cada endpoint:

1. Login y copia el token.
2. Usalo como `Bearer Token` para las rutas protegidas.
3. Probá las operaciones CRUD de productos.
4. Registrá y editá usuarios.

## Endpoints

| Método | Ruta                        | Descripción                   | Protegido   |
| ------- | --------------------------- | ------------------------------ | ----------- |
| POST    | /auth/login                 | Login de usuario               | No          |
| POST    | /auth/register              | Registro de usuario            | No          |
| GET     | /api/products               | Listado con filtros y paginado | No          |
| GET     | /api/products/:id           | Obtener producto por ID        | No          |
| GET     | /api/products/search?name=x | Buscar producto por nombre     | No          |
| POST    | /api/products/create        | Crear producto                 | Sí (admin) |
| PUT     | /api/products/:id           | Actualizar producto            | Sí (admin) |
| DELETE  | /api/products/:id           | Eliminar producto              | Sí (admin) |
| GET     | /api/users/profile          | Obtener perfil                 | Sí         |
| GET     | /api/users/profile/update   | Actualizar perfil              | Sí         |
| DELETE  | /api/users/profile          | Eliminar cuenta                | Sí         |
| PATCH   | /api/users/change-password  | Cambiar contraseña            | Sí         |
| PATCH   | /api/users/wishlist         | Modificar wishlist             | Sí         |
| GET     | /api/users                  | Listado de usuarios            | Sí (admin) |
