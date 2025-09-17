
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];

window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  let carrito = obtenerCarrito();
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


function renderizarCarritoIndex() {
  const cont = document.getElementById('carrito-items');
  const totalSpan = document.getElementById('carrito-total');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (!cont) return;
  if (!carrito.length) {
    cont.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
    if (totalSpan) totalSpan.textContent = '0.00';
    return;
  }
  let total = 0;
  let html = '<ul class="list-group mb-3">';
  carrito.forEach((item, idx) => {
    const precioNum = parseInt((item.precio||'').replace(/[^\d]/g, '')) || 0;
    const subtotal = precioNum * (item.cantidad||1);
    total += subtotal;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${item.nombre} (${item.talla})</span>
      <span>${item.cantidad||1} x $${precioNum.toLocaleString()}</span>
      <span>$${subtotal.toLocaleString()}</span>
    </li>`;
  });
  html += '</ul>';
  cont.innerHTML = html;
  if (totalSpan) totalSpan.textContent = total.toLocaleString();
}
