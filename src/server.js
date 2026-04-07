const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productosRouter = require("./routes/productos.routes");
const { errorHandler, notFoundHandler } = require("./middlewares/error.middleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/productos_db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Servidor operativo" });
});

app.use("/productos", productosRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicacion:", error.message);
    process.exit(1);
  }
}

startServer();
