setTimeout(function() {
  var loader = document.getElementById('exito-loader');
  var msg = document.getElementById('exito-msg');
  if (loader) loader.style.display = 'none';
  if (msg) msg.style.display = 'block';
  setTimeout(function() {
    window.location.href = '../index.html';
  }, 2000);
}, 1800);
