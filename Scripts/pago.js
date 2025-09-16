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
    // --- Validación de formulario y redirección ---
    const form = document.getElementById('form-pago');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = document.getElementById('form-pago-msg');
        msg.textContent = '';
        const datos = Object.fromEntries(new FormData(form));
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (!carrito.length) {
          msg.textContent = 'El carrito está vacío.';
          return;
        }
        // Validaciones manuales
        if (!datos.nombre || datos.nombre.length < 3) return msg.textContent = 'Ingresa tu nombre completo.';
        if (!datos.correo || !/^\S+@\S+\.\S+$/.test(datos.correo)) return msg.textContent = 'Correo electrónico inválido.';
        if (!datos.telefono || datos.telefono.replace(/\D/g,'').length < 8) return msg.textContent = 'Teléfono inválido.';
        if (!datos.direccion || datos.direccion.length < 5) return msg.textContent = 'Dirección inválida.';
        if (!datos.region) return msg.textContent = 'Ingresa tu región.';
        if (!datos.ciudad) return msg.textContent = 'Ingresa tu ciudad.';
        if (!datos.tarjeta || !/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/.test(datos.tarjeta)) return msg.textContent = 'Número de tarjeta inválido.';
        if (!datos.vencimiento || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(datos.vencimiento)) return msg.textContent = 'Fecha de vencimiento inválida (MM/AA).';
        if (!datos.cvv || !/^\d{3,4}$/.test(datos.cvv)) return msg.textContent = 'CVV inválido.';
        if (!datos.nombre_tarjeta || datos.nombre_tarjeta.length < 3) return msg.textContent = 'Nombre del titular inválido.';

        // Si todo es válido, redirigir a exito.html
        localStorage.setItem('datosPago', JSON.stringify(datos));
        // Guardar pedido en localStorage con estado
        let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        let user = JSON.parse(localStorage.getItem('userLogged') || 'null');
        let total = carrito.reduce((acc, item) => acc + (parseInt((item.precio||'').replace(/[^\d]/g, '')) || 0) * (item.cantidad||1), 0);
        pedidos.push({
          email: (user && user.email) ? user.email : datos.correo,
          nombre: (user && user.nombre) ? user.nombre : datos.nombre,
          fecha: new Date().toLocaleString('es-CL'),
          total: total,
          items: carrito,
          estado: 'Pendiente'
        });
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        window.location.href = 'exito.html';
      });
    }
});
