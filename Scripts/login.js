

document.addEventListener('DOMContentLoaded', function() {
  var guestBtn = document.getElementById('guest-btn');
  if (guestBtn) {
    guestBtn.onclick = function() {
      window.location.href = 'index.html'; // Cambia esto según la página de destino para invitados
    };
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');
  const msg = document.getElementById('login-msg');
  const spinner = document.getElementById('login-spinner');

  showRegister.onclick = () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    msg.textContent = '';
  };
  showLogin.onclick = () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    msg.textContent = '';
  };

  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function validarEmail(email) {
    return /^([\w\.-]+)@(gmail\.com|duocuc\.cl|profesor\.duocuc\.cl)$/i.test(email);
  }
  function validarPassword(pw) {
    return typeof pw === 'string' && pw.length >= 4 && pw.length <= 10;
  }

  registerForm.onsubmit = function(e) {
    e.preventDefault();
    const nombre = registerForm.nombre.value;
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    if (!nombre || !email || !password) return;
    if (!validarEmail(email)) {
      msg.textContent = 'El correo debe ser gmail.com, duocuc.cl o profesor.duocuc.cl';
      return;
    }
    if (!validarPassword(password)) {
      msg.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
      return;
    }
    let users = getUsers();
    if (users.some(u => u.email === email)) {
      msg.textContent = 'Ese correo ya está registrado.';
      return;
    }
    users.push({nombre, email, password});
    saveUsers(users);
    msg.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
    registerForm.reset();
    setTimeout(() => {
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
      msg.textContent = '';
    }, 1200);
  };

  loginForm.onsubmit = function(e) {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    if (!validarEmail(email)) {
      msg.textContent = 'El correo debe ser gmail.com, duocuc.cl o profesor.duocuc.cl';
      return;
    }
    if (!validarPassword(password)) {
      msg.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      msg.textContent = '';
      spinner.style.display = 'block';
      localStorage.setItem('userLogged', JSON.stringify(user));
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } else {
      msg.textContent = 'Correo o contraseña incorrectos.';
      spinner.style.display = 'none';
    }
  };
});
