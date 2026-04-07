const { categoriasPermitidas } = require("../models/producto.model");

function validarProducto(req, res, next) {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  const errores = [];

  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    errores.push("El nombre es obligatorio y debe tener al menos 2 caracteres");
  }

  if (typeof descripcion !== "string" || descripcion.trim().length < 5) {
    errores.push("La descripcion es obligatoria y debe tener al menos 5 caracteres");
  }

  const precioNumero = Number(precio);
  if (Number.isNaN(precioNumero) || precioNumero < 0) {
    errores.push("El precio es obligatorio y debe ser un numero mayor o igual a 0");
  } else {
    req.body.precio = precioNumero;
  }

  const stockNumero = Number(stock);
  if (Number.isNaN(stockNumero) || stockNumero < 0 || !Number.isInteger(stockNumero)) {
    errores.push("El stock es obligatorio y debe ser un numero entero mayor o igual a 0");
  } else {
    req.body.stock = stockNumero;
  }

  if (!categoriasPermitidas.includes(categoria)) {
    errores.push(`La categoria debe ser una de las siguientes: ${categoriasPermitidas.join(", ")}`);
  }

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: "Error de validacion",
      errores
    });
  }

  req.body.nombre = nombre.trim();
  req.body.descripcion = descripcion.trim();

  next();
}

module.exports = { validarProducto };
