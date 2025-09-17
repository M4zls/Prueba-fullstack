
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.onsubmit = function(e) {
    e.preventDefault();
    const nombre = form['Nombre usuario'].value.trim();
    const correo = form['Correo usuario'].value.trim();
    const mensaje = form['Mensaje'].value.trim();
    const msgDiv = document.getElementById('contacto-msg');
    let error = '';
    if (!nombre) error = 'El nombre es obligatorio.';
    else if (!correo) error = 'El correo es obligatorio.';
    else if (!/^([\w\.-]+)@([\w\.-]+)\.([a-z]{2,})$/i.test(correo)) error = 'Correo inválido.';
    else if (!mensaje) error = 'El mensaje es obligatorio.';
    if (error) {
      msgDiv.textContent = error;
      msgDiv.className = 'mt-2 text-danger';
      return;
    }
    msgDiv.textContent = '¡Mensaje enviado correctamente!';
    msgDiv.className = 'mt-2 text-success';
    form.reset();
  };
});
