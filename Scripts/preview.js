// --- PREVIEW DE PRODUCTO ---
if (window.location.pathname.includes('preview.html')) {
  
  const productos = {
    "adidas-superstar-bape": {
      nombre: "adidas Superstar Bape ABC Camo Green",
      precio: "$350.000",
      imagenes: [
        "../assets/adidas-Superstar-Bape-ABC-Camo-Green-Product.avif"
      ],
      tallas: ["38", "39", "40", "41", "42", "43"],
      descripcion: "Zapatilla icónica con colaboración Bape, edición limitada, materiales premium y diseño camuflado."
    },
    "nike-air-max-95-corteiz": {
      nombre: "Nike Air Max 95 SP Corteiz Gutta",
      precio: "$720.000",
      imagenes: [
        "../assets/Nike-Air-Max-95-Corteiz-Khaki-Green-Black-Product.avif"
      ],
      tallas: ["39", "40", "41", "42", "43", "44"],
      descripcion: "Edición especial Corteiz, máxima comodidad y estilo urbano."
    },
    "adidas-superstar-vintage": {
      nombre: "adidas Superstar Vintage Bape White Black",
      precio: "$280.000",
      imagenes: [
        "../assets/adidas-Superstar-Vintage-Bape-White-Black-Product.avif"
      ],
      tallas: ["38", "39", "40", "41", "42"],
      descripcion: "Superstar vintage con detalles Bape, blanco y negro clásico."
    }
    // Agrega más productos aquí...
  };

  // Obtener el id de la zapatilla desde la URL (?id=adidas-superstar-bape)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const producto = productos[id];

  if (producto) {
    // Nombre y precio
    document.getElementById('preview-nombre').textContent = producto.nombre;
    document.getElementById('preview-precio').textContent = producto.precio;
    // Descripción
    document.getElementById('preview-descripcion').textContent = producto.descripcion;
    // Tallas
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
    // Galería de imágenes
    const galleryInner = document.getElementById('preview-gallery-inner');
    galleryInner.innerHTML = '';
    producto.imagenes.forEach((img, i) => {
      const div = document.createElement('div');
      div.className = 'carousel-item' + (i === 0 ? ' active' : '');
      div.innerHTML = `<img src="${img}" class="d-block w-100" style="max-height:350px;object-fit:contain;background:#fff;border-radius:12px;">`;
      galleryInner.appendChild(div);
    });


    
    // Sugerencias de productos
    const sugerenciasDiv = document.getElementById('preview-sugerencias');
    if (sugerenciasDiv) {
      // Filtrar productos distintos al actual
      const sugeridos = Object.entries(productos)
        .filter(([key]) => key !== id)
        .slice(0, 3); // hasta 3 sugerencias
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

