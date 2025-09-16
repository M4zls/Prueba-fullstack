// --- PREVIEW DE PRODUCTO ---
if (window.location.pathname.includes('preview.html')) {
  // --- Agregar funcionalidad al botón "Agregar al carrito" ---
  const btnAgregar = document.getElementById('preview-comprar');
  if (btnAgregar) {
    btnAgregar.onclick = function() {
      // Obtener datos del producto actual
      const id = new URLSearchParams(window.location.search).get('id');
      const tallaSeleccionada = document.querySelector('#preview-tallas .btn.active')?.textContent || null;
      const cantidad = 1;
      const producto = productos[id];
      if (!producto) return alert('Producto no encontrado');
      if (!tallaSeleccionada) return alert('Selecciona una talla');
      // Construir objeto para el carrito
      const item = {
        id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagenes[0],
        talla: tallaSeleccionada,
        cantidad
      };
      if (typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(item);
        // Actualizar el carrito offcanvas inmediatamente
        if (typeof renderizarCarritoPreview === 'function') {
          renderizarCarritoPreview();
        }
        // Feedback visual rápido
        btnAgregar.textContent = '¡Agregado!';
        btnAgregar.disabled = true;
        setTimeout(() => {
          btnAgregar.textContent = 'Agregar al carrito';
          btnAgregar.disabled = false;
        }, 1200);
      } else {
        alert('No se pudo agregar al carrito. Recarga la página.');
      }
    };
  }
  
  const productos = {
    "adidas-superstar-bape": {
      nombre: "adidas Superstar Bape ABC Camo Green",
      precio: "$350.000",
      imagenes: ["../assets/adidas-Superstar-Bape-ABC-Camo-Green-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Zapatilla icónica con colaboración Bape, edición limitada, materiales premium y diseño camuflado."
    },
    "adidas-superstar-vintage": {
      nombre: "adidas Superstar Vintage Bape White Black",
      precio: "$280.000",
      imagenes: ["../assets/adidas-Superstar-Vintage-Bape-White-Black-Product.avif"],
      tallas: ["38", "39", "40", "41", "42"],
      descripcion: "Superstar vintage con detalles Bape, blanco y negro clásico."
    },
    "adidas-gazelle-bad-bunny": {
      nombre: "Adidas Gazelle Indoor Bad Bunny",
      precio: "$310.000",
      imagenes: ["../assets/adidas-Gazelle-Indoor-Bad-Bunny-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Colaboración con Bad Bunny, edición limitada, estilo urbano y materiales premium."
    },
    "adidas-yeezy-500-stone-salt": {
      nombre: "Adidas Yeezy 500 Stone Salt",
      precio: "$150.000",
      imagenes: ["../assets/adidas-Yeezy-500-Stone-Salt-Product.avif"],
      tallas: ["39", "40", "41", "42", "43", "44"],
      descripcion: "Yeezy 500 en color Stone Salt, diseño innovador y gran comodidad."
    },
    "adidas-yeezy-700-v3-blue-glow": {
      nombre: "adidas Yeezy 700 V3 Blue Glow",
      precio: "$300.000",
      imagenes: ["../assets/adidas-Yeezy-700-V3-Blue-Glow-Product.avif"],
      tallas: ["39", "40", "41", "42", "43"],
      descripcion: "Yeezy 700 V3 con detalles que brillan en la oscuridad, edición especial."
    },
    "adidas-yeezy-boost-350-v2-zebra": {
      nombre: "adidas Yeezy Boost 350 V2 Zebra",
      precio: "$450.000",
      imagenes: ["../assets/adidas-Yeezy-Boost-350-V2-Zebra-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Yeezy Boost 350 V2 en color Zebra, uno de los modelos más icónicos."
    },
    "nike-sb-dunk-low-supreme-94-ocean-fog": {
      nombre: "Nike Dunk Low Supreme 94 Ocean Fog",
      precio: "$320.000",
      imagenes: ["../assets/Nike-SB-Dunk-Low-Supreme-94-Ocean-Fog-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Dunk Low edición Supreme, color Ocean Fog, estilo único y urbano."
    },
    "nike-dunk-high-wu-tang-2024": {
      nombre: "Nike Dunk High Wu Tang 2024",
      precio: "$220.000",
      imagenes: ["../assets/Nike-Dunk-High-Wu-Tang-2024-Product.avif"],
      tallas: ["39", "40", "41", "42", "43"],
      descripcion: "Edición especial Wu Tang, diseño llamativo y coleccionable."
    },
    "nike-air-force-1-low-supreme-box-logo-black": {
      nombre: "Nike Air Force 1 Low Supreme Box Logo Black",
      precio: "$380.000",
      imagenes: ["../assets/Nike-Air-Force-1-Low-Supreme-Box-Logo-Black-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43", "44"],
      descripcion: "Air Force 1 con logo Supreme, clásico renovado en negro."
    },
    "nike-air-trainer-1-sp-travis-scott-wheat": {
      nombre: "Nike Air Trainer 1 SP Travis Scott Wheat",
      precio: "$500.000",
      imagenes: ["../assets/Nike-Air-Trainer-1-SP-Travis-Scott-Wheat-Product.avif"],
      tallas: ["39", "40", "41", "42", "43"],
      descripcion: "Colaboración con Travis Scott, edición Wheat, detalles exclusivos."
    },
    "air-jordan-4-retro-og-sp-a-ma-maniere": {
      nombre: "Air Jordan 4 Retro OG SP A Ma Maniere",
      precio: "$650.000",
      imagenes: ["../assets/Air-Jordan-4-Retro-OG-SP-A-Ma-Maniere-While-You-Were-Sleeping-Womens-Product.avif"],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Jordan 4 edición especial A Ma Maniere, lujo y exclusividad."
    }
  };

  // Obtener el id de la zapatilla desde la URL (?id=adidas-superstar-bape)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const producto = productos[id];

  if (producto) {

    document.getElementById('preview-nombre').textContent = producto.nombre;
    document.getElementById('preview-precio').textContent = producto.precio;

    document.getElementById('preview-descripcion').textContent = producto.descripcion;
  
    const tallasDiv = document.getElementById('preview-tallas');
    tallasDiv.innerHTML = '';
    producto.tallas.forEach(talla => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-outline-dark btn-sm m-1';
      btn.textContent = talla;
      btn.onclick = () => {
        document.querySelectorAll('#preview-tallas button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      tallasDiv.appendChild(btn);
    });
 
    const galleryInner = document.getElementById('preview-gallery-inner');
    galleryInner.innerHTML = '';
    producto.imagenes.forEach((img, i) => {
      const div = document.createElement('div');
      div.className = 'carousel-item' + (i === 0 ? ' active' : '');
      div.innerHTML = `<img src="${img}" class="d-block w-100" style="max-height:350px;object-fit:contain;background:#fff;border-radius:12px;">`;
      galleryInner.appendChild(div);
    });


    
    
    const sugerenciasDiv = document.getElementById('preview-sugerencias');
    if (sugerenciasDiv) {
      // Filtrar productos 
      const sugeridos = Object.entries(productos)
        .filter(([key]) => key !== id)
        .slice(0, 6); //sugerencias
      sugerenciasDiv.innerHTML = '';
      sugeridos.forEach(([key, prod]) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${prod.imagenes[0]}" class="card-img-top" alt="${prod.nombre}">
            <div class="card-body text-center">
              <h6 class="card-title">${prod.nombre}</h6>
              <span class="fw-bold d-block mb-2">${prod.precio}</span>
              <a href="preview.html?id=${key}" class="btn btn-outline-dark btn-sm">Ver más</a>
            </div>
          </div>
        `;
        sugerenciasDiv.appendChild(col);
      });
    }
  } else {
    document.getElementById('preview-producto').innerHTML = '<div class="alert alert-danger">Producto no encontrado</div>';
  }
}

// --- Renderizar carrito en el offcanvas de preview.html ---
function renderizarCarritoPreview() {
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
      <div>
        <strong>${item.nombre}</strong><br>
        <small>Talla: ${item.talla||'-'} | Cant: <input type='number' min='1' value='${item.cantidad||1}' data-idx='${idx}' class='input-cantidad form-control form-control-sm d-inline-block' style='width:60px;'></small>
      </div>
      <span>$${subtotal.toLocaleString('es-CL')}</span>
      <button class='btn btn-danger btn-sm btn-eliminar' data-idx='${idx}' title='Eliminar'>&times;</button>
    </li>`;
  });
  html += '</ul>';
  cont.innerHTML = html;
  if (totalSpan) totalSpan.textContent = total.toLocaleString('es-CL');

  // Listeners para eliminar y modificar cantidad
  cont.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.splice(idx, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarritoPreview();
    };
  });
  cont.querySelectorAll('.input-cantidad').forEach(input => {
    input.onchange = function() {
      let val = parseInt(this.value);
      if (isNaN(val) || val < 1) val = 1;
      const idx = parseInt(this.getAttribute('data-idx'));
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito[idx].cantidad = val;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarritoPreview();
    };
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof renderizarCarritoPreview === 'function') renderizarCarritoPreview();
});

