// Scripts para la página de perfil de usuario FLEX
// Muestra datos del usuario, permite cambiar contraseña y lista pedidos

document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('userLogged'));
  const perfilInfo = document.getElementById('perfil-info');
  const pedidosList = document.getElementById('perfil-pedidos');
  const formPass = document.getElementById('form-cambiar-pass');
  const msg = document.getElementById('perfil-msg');

  if (!user) {
    perfilInfo.innerHTML = '<div class="alert alert-danger">No has iniciado sesión. <a href="../Login.html">Inicia sesión</a></div>';
    if (formPass) formPass.style.display = 'none';
    if (pedidosList) pedidosList.style.display = 'none';
    return;
  }

  // Mostrar datos minimalista
  perfilInfo.innerHTML = `
    <div class="d-flex flex-column align-items-center gap-2">
      <div style="background:#f5f5f5;border-radius:50%;width:80px;height:80px;display:flex;align-items:center;justify-content:center;">
        <img src=\"https://www.svgrepo.com/show/532363/user-alt-1.svg\" alt=\"Usuario\" style=\"width:48px;opacity:.7;\">
      </div>
      <div class="fw-bold fs-4">${user.nombre}</div>
      <div class="text-muted">${user.email}</div>
    </div>
  `;

  // Cambiar contraseña
  formPass.onsubmit = function(e) {
    e.preventDefault();
    msg.textContent = '';
    const actual = formPass.actual.value;
    const nueva = formPass.nueva.value;
    const repetir = formPass.repetir.value;
    if (actual !== user.password) {
      msg.textContent = 'Contraseña actual incorrecta.';
      return;
    }
    if (nueva.length < 4) {
      msg.textContent = 'La nueva contraseña debe tener al menos 4 caracteres.';
      return;
    }
    if (nueva !== repetir) {
      msg.textContent = 'Las contraseñas no coinciden.';
      return;
    }
    // Actualizar en localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].password = nueva;
      localStorage.setItem('users', JSON.stringify(users));
      user.password = nueva;
      localStorage.setItem('userLogged', JSON.stringify(user));
      msg.textContent = 'Contraseña actualizada correctamente.';
      formPass.reset();
    }
  };

  // Mostrar pedidos (simulado: busca en localStorage 'pedidos' por email)
  let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  let misPedidos = pedidos.filter(p => p.email === user.email);
  if (!misPedidos.length) {
    pedidosList.innerHTML = '<div class="alert alert-info">No tienes pedidos registrados.</div>';
  } else {
    pedidosList.innerHTML = '<div class="fw-bold mb-3 fs-5">Mis pedidos</div>' + misPedidos.map(p => {
      let badge = '';
      if (p.estado === 'Pendiente') badge = '<span class="badge bg-warning text-dark ms-2">Pendiente</span>';
      if (p.estado === 'Enviado') badge = '<span class="badge bg-info text-dark ms-2">Enviado</span>';
      if (p.estado === 'Entregado') badge = '<span class="badge bg-success ms-2">Entregado</span>';
      return `
      <div class="border rounded-3 p-3 mb-3 bg-white shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="text-muted small">${p.fecha || '---'}</span>
          ${badge}
        </div>
        <div class="mb-1"><span class="fw-semibold">Total:</span> $${p.total ? p.total.toLocaleString('es-CL') : '---'}</div>
        <div class="mb-1"><span class="fw-semibold">Productos:</span> ${Array.isArray(p.items) ? p.items.map(i => i.nombre + ' <span class=\"text-muted\">(x' + i.cantidad + ')</span>').join(', ') : ''}</div>
      </div>
      `;
    }).join('');
  }
});
