
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.producto-link');
  const marcas = new Set();
  cards.forEach(card => {
    const nombre = card.querySelector('.card-title')?.textContent || '';
    if (/adidas/i.test(nombre)) marcas.add('Adidas');
    if (/nike/i.test(nombre)) marcas.add('Nike');
    if (/jordan/i.test(nombre)) marcas.add('Jordan');
  });

  const nav = document.querySelector('.navbar-nav');
  if (!nav) return;
  let catLi = Array.from(nav.children).find(li => li.textContent.trim().toUpperCase().includes('CATEGORIAS'));
  if (!catLi) return;
  catLi.classList.add('dropdown');
  const catA = catLi.querySelector('a');
  catA.classList.add('dropdown-toggle');
  catA.setAttribute('data-bs-toggle', 'dropdown');
  catA.setAttribute('role', 'button');
  catA.setAttribute('aria-expanded', 'false');
  let menu = document.createElement('ul');
  menu.className = 'dropdown-menu';
  marcas.forEach(marca => {
    let item = document.createElement('li');
    item.innerHTML = `<a class='dropdown-item filtro-marca' href='#'>${marca}</a>`;
    menu.appendChild(item);
  });
  catLi.appendChild(menu);

  nav.querySelectorAll('.filtro-marca').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const marca = this.textContent.trim();
      cards.forEach(card => {
        const nombre = card.querySelector('.card-title')?.textContent || '';
        card.parentElement.style.display = new RegExp(marca, 'i').test(nombre) ? '' : 'none';
      });
    };
  });
});
