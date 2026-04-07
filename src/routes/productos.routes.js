const express = require("express");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
} = require("../controllers/productos.controller");
const { validarProducto } = require("../middlewares/validate-product.middleware");

const router = express.Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProducto);
router.post("/", validarProducto, crearProducto);
router.put("/:id", validarProducto, actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
