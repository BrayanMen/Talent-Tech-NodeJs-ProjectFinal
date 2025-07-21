export const handleError = (err, req, res, next) => {
  console.error('Manejador de Errores: ', err.stack);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: true,
    message: err.message || 'Error interno del servidor',
    status: statusCode,
  });
}