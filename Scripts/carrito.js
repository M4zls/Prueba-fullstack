// --- Carrito persistente con localStorage ---

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  let carrito = obtenerCarrito();
  // Si ya existe el mismo producto (id + talla), suma cantidad
  const idx = carrito.findIndex(item => item.id === producto.id && item.talla === producto.talla);
  if (idx !== -1) {
    carrito[idx].cantidad = (carrito[idx].cantidad || 1) + (producto.cantidad || 1);
  } else {
    carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
  }
  guardarCarrito(carrito);
}

function eliminarDelCarrito(id, talla) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => !(item.id === id && item.talla === talla));
  guardarCarrito(carrito);
}

// Exportar funciones si se usa con módulos
// export { obtenerCarrito, guardarCarrito, agregarAlCarrito, eliminarDelCarrito };
