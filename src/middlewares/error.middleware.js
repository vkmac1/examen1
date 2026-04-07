function notFoundHandler(req, res) {
  res.status(404).json({
    mensaje: "Ruta no encontrada"
  });
}

function errorHandler(error, req, res, next) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      mensaje: "Error de validacion",
      errores: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      mensaje: "El identificador enviado no es valido"
    });
  }

  const status = error.status || 500;

  res.status(status).json({
    mensaje: error.message || "Error interno del servidor",
    errores: error.details || undefined
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
