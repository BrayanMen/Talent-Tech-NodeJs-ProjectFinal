export const notFound = (req, res, next) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe en este servidor`,
        routes: [
            'GET /api/products → Obtener todos los productos.',
            'GET /api/products/:id → Obtener producto por ID.',
            'GET /api/products/search?name=xxx → Buscar producto por nombre.',
            'POST /api/products/create → Crear producto (requiere token de admin).',
            'PUT /api/products/:id → Modificar producto (requiere token de admin).',
            'DELETE /api/products/:id → Eliminar producto (requiere token de admin).',

            'POST /auth/login → Devuelve token si credenciales válidas.',
            'POST /auth/register → Registra un nuevo usuario.',

            'GET /api/users → Listar todos los usuarios (admin).',
            'GET /api/users/profile → Perfil del usuario autenticado.',
            'GET /api/users/profile/update → Actualizar perfil del usuario.',
            'DELETE /api/users/profile → Eliminar cuenta del usuario.',
            'PATCH /api/users/change-password → Cambiar contraseña.',
            'PATCH /api/users/wishlist → Agregar/quitar producto de favoritos.',
        ],
    });
};