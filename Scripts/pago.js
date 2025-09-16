// --- Renderizar resumen del carrito desde localStorage ---
function renderResumenCarrito() {
  const resumen = document.getElementById('resumen-carrito');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (!carrito.length) {
    resumen.innerHTML = '<div class="alert alert-warning">Tu carrito está vacío.</div>';
    return;
  }
  let total = 0;
  let html = `<table class="table summary-table align-middle"><thead><tr><th></th><th>Producto</th><th>Talla</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead><tbody>`;
  carrito.forEach((item, idx) => {
    const precioNum = parseInt((item.precio||'').replace(/[^\d]/g, '')) || 0;
    const subtotal = precioNum * (item.cantidad||1);
    total += subtotal;
    // Ajustar ruta de imagen para que siempre apunte a assets desde pago.html
    let imgSrc = item.imagen;
    if (imgSrc && !imgSrc.startsWith('..')) {
      imgSrc = '../' + imgSrc.replace(/^\/+/, '');
    }
    html += `<tr>
      <td><img src="${imgSrc}" class="summary-img"></td>
      <td>${item.nombre}</td>
      <td>${item.talla||'-'}</td>
      <td>
        <input type="number" min="1" value="${item.cantidad||1}" data-idx="${idx}" class="form-control form-control-sm input-cantidad" style="width:70px;">
      </td>
      <td>$${subtotal.toLocaleString('es-CL')}</td>
      <td>
        <button class="btn btn-danger btn-sm btn-eliminar" data-idx="${idx}" title="Eliminar producto">&times;</button>
      </td>
    </tr>`;
  });
  html += `</tbody><tfoot><tr><th colspan="5" class="text-end">Total</th><th>$${total.toLocaleString('es-CL')}</th></tr></tfoot></table>`;
  resumen.innerHTML = html;

  // Listeners para eliminar y modificar cantidad
  resumen.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.splice(idx, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderResumenCarrito();
    };
  });
  resumen.querySelectorAll('.input-cantidad').forEach(input => {
    input.onchange = function() {
      let val = parseInt(this.value);
      if (isNaN(val) || val < 1) val = 1;
      const idx = parseInt(this.getAttribute('data-idx'));
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito[idx].cantidad = val;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderResumenCarrito();
    };
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderResumenCarrito();
  // --- Enviar datos y monto al backend para iniciar pago ---
  const form = document.getElementById('form-pago');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(form));
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      if (!carrito.length) return alert('El carrito está vacío.');
      // Suma total
      let total = carrito.reduce((acc, item) => acc + (parseInt((item.precio||'').replace(/[^\d]/g, '')) || 0) * (item.cantidad||1), 0);
      // Puedes guardar los datos del usuario en localStorage si quieres persistencia
      localStorage.setItem('datosPago', JSON.stringify(datos));
      // Llama al backend para iniciar pago
      try {
        const buyOrder = 'orden_' + Date.now();
        const sessionId = 'session_' + Date.now();
        const returnUrl = 'http://localhost:3001/webpay/commit';
        const response = await fetch('http://localhost:3001/webpay/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            buyOrder,
            sessionId,
            returnUrl
          })
        });
        const data = await response.json();
        if (data.url && data.token) {
          const formPago = document.createElement('form');
          formPago.action = data.url;
          formPago.method = 'POST';
          formPago.innerHTML = `<input type="hidden" name="token_ws" value="${data.token}">`;
          document.body.appendChild(formPago);
          formPago.submit();
        } else {
          alert('Error iniciando pago: ' + (data.error || 'Desconocido'));
        }
      } catch (e) {
        alert('No se pudo conectar con el backend. ¿Está corriendo en localhost:3001?');
      }
    });
  }
});
