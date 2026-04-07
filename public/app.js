const API_URL = "/productos";

const form = document.getElementById("productoForm");
const productoIdInput = document.getElementById("productoId");
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const precioInput = document.getElementById("precio");
const stockInput = document.getElementById("stock");
const categoriaInput = document.getElementById("categoria");
const mensaje = document.getElementById("mensaje");
const productosBody = document.getElementById("productosBody");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const reloadButton = document.getElementById("reloadButton");
const modoFormulario = document.getElementById("modoFormulario");

function mostrarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.className = `message ${tipo}`.trim();
}

function resetFormulario() {
  form.reset();
  productoIdInput.value = "";
  submitButton.textContent = "Guardar producto";
  cancelEditButton.hidden = true;
  modoFormulario.textContent = "Creando";
}

function renderProductos(productos) {
  if (!productos.length) {
    productosBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No hay productos registrados.</td>
      </tr>
    `;
    return;
  }

  productosBody.innerHTML = productos
    .map(
      (producto) => `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>S/ ${Number(producto.precio).toFixed(2)}</td>
          <td>${producto.stock}</td>
          <td>${producto.categoria}</td>
          <td>
            <div class="row-actions">
              <button type="button" class="secondary" data-action="editar" data-id="${producto._id}">Editar</button>
              <button type="button" class="danger" data-action="eliminar" data-id="${producto._id}">Eliminar</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

async function cargarProductos() {
  try {
    productosBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">Cargando productos...</td>
      </tr>
    `;

    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar los productos");
    }

    renderProductos(data.data);
  } catch (error) {
    productosBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">${error.message}</td>
      </tr>
    `;
    mostrarMensaje(error.message, "error");
  }
}

async function obtenerProducto(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo obtener el producto");
  }

  return data.data;
}

async function guardarProducto(payload) {
  const id = productoIdInput.value;
  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    const errores = data.errores?.join(" | ");
    throw new Error(errores || data.mensaje || "No se pudo guardar el producto");
  }

  return data;
}

async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.mensaje || "No se pudo eliminar el producto");
  }

  return data;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  mostrarMensaje("");

  const payload = {
    nombre: nombreInput.value,
    descripcion: descripcionInput.value,
    precio: precioInput.value,
    stock: stockInput.value,
    categoria: categoriaInput.value
  };

  try {
    const data = await guardarProducto(payload);
    mostrarMensaje(data.mensaje, "success");
    resetFormulario();
    await cargarProductos();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
});

productosBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  try {
    if (action === "editar") {
      const producto = await obtenerProducto(id);
      productoIdInput.value = producto._id;
      nombreInput.value = producto.nombre;
      descripcionInput.value = producto.descripcion;
      precioInput.value = producto.precio;
      stockInput.value = producto.stock;
      categoriaInput.value = producto.categoria;
      submitButton.textContent = "Actualizar producto";
      cancelEditButton.hidden = false;
      modoFormulario.textContent = "Editando";
      mostrarMensaje("Producto cargado para edicion", "success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (action === "eliminar") {
      const confirmado = window.confirm("¿Deseas eliminar este producto?");
      if (!confirmado) {
        return;
      }

      const data = await eliminarProducto(id);
      mostrarMensaje(data.mensaje, "success");
      if (productoIdInput.value === id) {
        resetFormulario();
      }
      await cargarProductos();
    }
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
});

cancelEditButton.addEventListener("click", () => {
  resetFormulario();
  mostrarMensaje("Edicion cancelada");
});

reloadButton.addEventListener("click", () => {
  cargarProductos();
});

resetFormulario();
cargarProductos();
