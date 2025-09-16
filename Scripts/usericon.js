// Lógica para el ícono de usuario en el header
// Si hay usuario logueado, redirige a perfil. Si no, muestra login.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.user-header-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('userLogged'));
      // Detectar ruta base
      let base = '';
      if (window.location.pathname.includes('/PAGINAS/')) base = '../';
      // Si está logueado, ir a perfil
      if (user) {
        window.location.href = base + 'PAGINAS/Perlfil.html';
        return;
      }
      // Si NO está logueado, mostrar menú flotante para iniciar sesión
      let existing = document.getElementById('usericon-dropdown');
      if (existing) { existing.remove(); return; }
      const dropdown = document.createElement('div');
      dropdown.id = 'usericon-dropdown';
      dropdown.style.position = 'absolute';
      dropdown.style.top = (link.getBoundingClientRect().bottom + window.scrollY + 8) + 'px';
      dropdown.style.left = (link.getBoundingClientRect().left + window.scrollX - 40) + 'px';
      dropdown.style.background = '#fff';
      dropdown.style.border = '1px solid #ddd';
      dropdown.style.borderRadius = '8px';
      dropdown.style.boxShadow = '0 2px 12px #0002';
      dropdown.style.padding = '12px 18px';
      dropdown.style.zIndex = 9999;
      dropdown.innerHTML = `<a href="${base}Login.html" class="btn btn-dark w-100">Iniciar sesión</a>`;
      document.body.appendChild(dropdown);
      // Cerrar al hacer clic fuera
      setTimeout(() => {
        document.addEventListener('click', function handler(ev) {
          if (!dropdown.contains(ev.target) && ev.target !== link) {
            dropdown.remove();
            document.removeEventListener('click', handler);
          }
        });
      }, 10);
    });
  });
});
