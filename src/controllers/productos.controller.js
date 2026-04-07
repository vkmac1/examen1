const mongoose = require("mongoose");
const { Producto } = require("../models/producto.model");

function buildError(status, message, details) {
  const error = new Error(message);
  error.status = status;
  if (details) {
    error.details = details;
  }
  return error;
}

function validarObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw buildError(400, "El id del producto no tiene un formato valido");
  }
}

async function crearProducto(req, res, next) {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json({
      mensaje: "Producto creado correctamente",
      data: producto
    });
  } catch (error) {
    next(error);
  }
}

async function listarProductos(req, res, next) {
  try {
    const productos = await Producto.find().sort({ createdAt: -1 });
    res.json({
      total: productos.length,
      data: productos
    });
  } catch (error) {
    next(error);
  }
}

async function obtenerProducto(req, res, next) {
  try {
    validarObjectId(req.params.id);

    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      throw buildError(404, "Producto no encontrado");
    }

    res.json({ data: producto });
  } catch (error) {
    next(error);
  }
}

async function actualizarProducto(req, res, next) {
  try {
    validarObjectId(req.params.id);

    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!producto) {
      throw buildError(404, "Producto no encontrado");
    }

    res.json({
      mensaje: "Producto actualizado correctamente",
      data: producto
    });
  } catch (error) {
    next(error);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    validarObjectId(req.params.id);

    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      throw buildError(404, "Producto no encontrado");
    }

    res.json({
      mensaje: "Producto eliminado correctamente"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
};
