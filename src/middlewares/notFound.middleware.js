export const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
    routes: [
      'GET /',
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/products/search?name=xxxx',
      'POST /api/products/create',
      'PUT /api/products/:id',
      'DELETE /api/products/:id',
      'POST /auth/login'
    ]
  });
}