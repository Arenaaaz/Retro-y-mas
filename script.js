// CONFIGURACIÓN DEL NEGOCIO
const CONFIG = {
  nombreTienda: "Retro y más",
  whatsapp: "573013276930",
  moneda: "COP"
};

// --------------------------------- VARIABLES GLOBALES --------------------------------- 
let carrito = [];
let total = 0;
let tipoPrendaActual = 'Camisetas';
let categoriaActual = 'todos';

let productoSeleccionadoTemp = null;
let opcionesSeleccionadas = { talla: '', manga: '', parches: '', nombreNumero: '' };

// --------------------------------- INICIALIZACIÓN --------------------------------- 
document.addEventListener("DOMContentLoaded", () => {
  renderizarCategorias();
  
  if (window.location.hash === "#entrega-inmediata") {
    filtrarCategoria("entrega-inmediata");
  } else {
    ejecutarFiltroCombinado();
  }
});

// --------------------------------- FUNCIONES DE RENDERIZADO --------------------------------- 
function renderizarCategorias() {
  const contenedor = document.getElementById("contenedor-categorias");
  if (!contenedor) return;

  // Filtrar productos según el tipo de prenda actual (o todos)
  const productosVisibles = PRODUCTOS.filter(p => {
    const tipo = p.tipoPrenda || 'Camisetas';
    return (tipoPrendaActual === 'todos') || (tipo.toLowerCase() === tipoPrendaActual.toLowerCase());
  });

  // Extraer únicamente las categorías disponibles para estas prendas
  const categoriasUnicas = [...new Set(productosVisibles.map(p => p.categoria))];

  contenedor.innerHTML = `
    <button class="btn-categoria active" onclick="filtrarCategoria('todos', this)">Todos</button>
    <button class="btn-categoria btn-inmediato" onclick="filtrarCategoria('entrega-inmediata', this)">⚡ Entrega Inmediata</button>
    ${categoriasUnicas.map(cat => `
      <button class="btn-categoria" onclick="filtrarCategoria('${cat}', this)">
        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    `).join('')}
  `;
}

// --- RENDERIZADO DE PRODUCTOS (CORREGIDO) ---
function renderizarProductos(productos, idContenedor = "contenedor-productos") {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  if (productos.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No se encontraron prendas disponibles en esta sección.</p>`;
    return;
  }

  const productosOrdenados = [...productos].sort((a, b) => {
    return (b.entregaInmediata === true ? 1 : 0) - (a.entregaInmediata === true ? 1 : 0);
  });

  contenedor.innerHTML = productosOrdenados.map(prod => {
    return `
    <div class="card-producto">
      ${prod.entregaInmediata ? `<span class="badge-inmediato-card">⚡ Entrega Inmediata</span>` : ''}

      <div class="galeria-container">
        <div class="img-container">
          <img id="img-principal-${prod.id}" src="${prod.imagenes[0]}" alt="${prod.nombre}" loading="lazy">
        </div>
        
        ${prod.imagenes && prod.imagenes.length > 1 ? `
          <div class="miniaturas-container">
            ${prod.imagenes.map((imgUrl, index) => `
              <img src="${imgUrl}" 
                   class="miniatura ${index === 0 ? 'active' : ''}" 
                   onclick="cambiarImagenPrincipal('${prod.id}', '${imgUrl}', this)" 
                   alt="Vista ${index + 1}">
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="info-container">
        <div>
          <h3 class="titulo-producto">${prod.nombre}</h3>
          
          ${(prod.entregaInmediata && prod.dorsalInmediato) ? `
            <p class="dorsal-destacado" style="color: #22c55e; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
              👕 Dorsal disponible: ${prod.dorsalInmediato}
            </p>
          ` : ''}

          ${prod.descripcion ? `<p class="descripcion-producto">${prod.descripcion}</p>` : ''}
          <div class="precio-producto">$ ${prod.precio.toLocaleString('es-CO')} COP</div>
        </div>
        
        <button class="btn-agregar" onclick="abrirModalOpciones('${prod.id}')">
          + Personalizar y Agregar
        </button>
      </div>
    </div>
    `;
  }).join('');
}

// --- CAMBIO DE IMAGEN PRINCIPAL (CORREGIDO Y ROBUSTO) ---
function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  // Busca la imagen por su ID único de producto (soporta IDs de texto como "CAM-01")
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) {
    imgPrincipal.src = nuevaUrl;
  }

  // Cambia el borde activo visual de la miniatura seleccionada
  if (elementoMiniatura && elementoMiniatura.parentElement) {
    elementoMiniatura.parentElement.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
    elementoMiniatura.classList.add('active');
  }
}

// --- MODAL DE OPCIONES DE PRODUCTO (CON NOMBRE/NÚMERO SOLO PARA CAMISETAS) ---
function abrirModalOpciones(idProducto) {
  const prod = PRODUCTOS.find(p => String(p.id) === String(idProducto));
  if (!prod) return;

  productoSeleccionadoTemp = prod;
  
  // Resetear opciones al abrir
  opcionesSeleccionadas = {
    talla: prod.tallas ? prod.tallas[0] : '',
    manga: prod.variantes?.manga ? prod.variantes.manga[0].tipo : '',
    parches: prod.variantes?.parches ? prod.variantes.parches[0].tipo : '',
    bordadoConmemorativo: prod.tieneOpcionBordado ? 'Sin bordado' : '',
    nombreNumero: ''
  };

  document.getElementById("modal-opt-titulo").innerText = prod.nombre;

  // Evaluar si la prenda permite estampado (Solo Camisetas)
  const esCamiseta = !prod.tipoPrenda || prod.tipoPrenda.toLowerCase() === 'camisetas';

  const contenedorBody = document.getElementById("modal-opt-body");
  contenedorBody.innerHTML = `
    ${prod.entregaInmediata ? `
      <div class="alerta-stock-modal">
        <span>⚡ <strong>DISPONIBLE PARA ENTREGA INMEDIATA:</strong></span>
        <p>Talla: <strong>${prod.tallasInmediatas ? prod.tallasInmediatas.join(', ') : 'L'}</strong> | Dorsal: <strong>${prod.dorsalInmediato || 'Sin estampado especificado'}</strong></p>
      </div>
    ` : ''}

    <!-- 1. SELECCIÓN DE TALLA -->
    ${prod.tallas && prod.tallas.length > 0 ? `
      <div class="selector-chip-container">
        <label>Talla:</label>
        <div class="chips-wrapper">
          ${prod.tallas.map((t, idx) => {
            const esStock = prod.entregaInmediata && prod.tallasInmediatas?.includes(t);
            return `
              <button type="button" 
                      class="chip-opcion ${idx === 0 ? 'active' : ''} ${esStock ? 'chip-inmediato' : ''}" 
                      onclick="cambiarOpcionModal('talla', '${t}', this)">
                ${t} ${esStock ? '⚡ (Entrega Inmediata)' : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 2. CAMPO DE ESTAMPADO (SÓLO SE MUESTRA EN CAMISETAS) -->
    ${esCamiseta ? `
      <div class="campo-personalizacion-container">
        <label for="input-nombre-numero">Nombre y Número de Jugador (Opcional):</label>
        <input type="text" 
               id="input-nombre-numero" 
               placeholder="Ej: MESSI 10 o Juan 7" 
               oninput="opcionesSeleccionadas.nombreNumero = this.value">
        <small style="color: #64748b; font-size: 0.75rem; display: block; margin-top: 4px;">
          Déjalo en blanco si prefieres la prenda sin estampado.
        </small>
      </div>
    ` : ''}

    <!-- 3. VARIANTES DE MANGA (SI APLICA) -->
    ${prod.variantes?.manga ? `
      <div class="selector-chip-container">
        <label>Tipo de Manga:</label>
        <div class="chips-wrapper">
          ${prod.variantes.manga.map((m, idx) => `
            <button type="button" 
                    class="chip-opcion ${idx === 0 ? 'active' : ''}" 
                    onclick="cambiarOpcionModal('manga', '${m.tipo}', this)">
              ${m.tipo} ${m.adicional > 0 ? `(+$${m.adicional.toLocaleString('es-CO')})` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 4. VARIANTES DE PARCHES (SI APLICA) -->
    ${prod.variantes?.parches ? `
      <div class="selector-chip-container">
        <label>Parches / Escudos:</label>
        <div class="chips-wrapper">
          ${prod.variantes.parches.map((p, idx) => `
            <button type="button" 
                    class="chip-opcion ${idx === 0 ? 'active' : ''}" 
                    onclick="cambiarOpcionModal('parches', '${p.tipo}', this)">
              ${p.tipo} ${p.adicional > 0 ? `(+$${p.adicional.toLocaleString('es-CO')})` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 5. BORDADO CONMEMORATIVO (SI APLICA) -->
    ${prod.tieneOpcionBordado ? `
      <div class="selector-chip-container">
        <label>Incluir ${prod.textoBordado || 'Bordado de la Final'} (Sin costo extra):</label>
        <div class="chips-wrapper">
          <button type="button" 
                  class="chip-opcion active" 
                  onclick="cambiarOpcionModal('bordadoConmemorativo', 'Sin bordado', this)">
            Sin bordado
          </button>
          <button type="button" 
                  class="chip-opcion" 
                  onclick="cambiarOpcionModal('bordadoConmemorativo', '${prod.textoBordado || 'Con Bordado de la Final'}', this)">
            Con Bordado Final ⚽
          </button>
        </div>
      </div>
    ` : ''}
  `;

  actualizarPrecioModal();

  const btnConfirmar = document.getElementById("btn-confirmar-opciones");
  if (btnConfirmar) {
    btnConfirmar.onclick = () => {
      confirmarAgregarAlCarrito();
    };
  }

  document.body.style.overflow = "hidden";
  document.getElementById("modal-opciones-producto").classList.add("active");
}

function cambiarOpcionModal(tipo, valor, elemento) {
  opcionesSeleccionadas[tipo] = valor;
  
  const padre = elemento.parentElement;
  if (padre) {
    padre.querySelectorAll('.chip-opcion').forEach(btn => btn.classList.remove('active'));
  }
  elemento.classList.add('active');

  actualizarPrecioModal();
}

function actualizarPrecioModal() {
  if (!productoSeleccionadoTemp) return;
  
  let precioCalculado = productoSeleccionadoTemp.precio;

  if (opcionesSeleccionadas.manga && productoSeleccionadoTemp.variantes?.manga) {
    const varManga = productoSeleccionadoTemp.variantes.manga.find(m => m.tipo === opcionesSeleccionadas.manga);
    if (varManga) precioCalculado += varManga.adicional;
  }

  if (opcionesSeleccionadas.parches && productoSeleccionadoTemp.variantes?.parches) {
    const varParches = productoSeleccionadoTemp.variantes.parches.find(p => p.tipo === opcionesSeleccionadas.parches);
    if (varParches) precioCalculado += varParches.adicional;
  }

  document.getElementById("modal-opt-precio-total").innerText = `$ ${precioCalculado.toLocaleString('es-CO')} COP`;
}

function cerrarModalOpciones() {
  document.getElementById("modal-opciones-producto").classList.remove("active");
  document.body.style.overflow = "";
  productoSeleccionadoTemp = null;
}

function confirmarAgregarAlCarrito() {
  if (!productoSeleccionadoTemp) return;

  let precioFinal = productoSeleccionadoTemp.precio;

  if (opcionesSeleccionadas.manga && productoSeleccionadoTemp.variantes?.manga) {
    const varManga = productoSeleccionadoTemp.variantes.manga.find(m => m.tipo === opcionesSeleccionadas.manga);
    if (varManga) precioFinal += varManga.adicional;
  }

  if (opcionesSeleccionadas.parches && productoSeleccionadoTemp.variantes?.parches) {
    const varParches = productoSeleccionadoTemp.variantes.parches.find(p => p.tipo === opcionesSeleccionadas.parches);
    if (varParches) precioFinal += varParches.adicional;
  }

  const dorsalIngresado = document.getElementById("input-nombre-numero")?.value.trim() || '';

  carrito.push({
    itemUniqueId: Date.now() + Math.random(),
    id: productoSeleccionadoTemp.id,
    nombre: productoSeleccionadoTemp.nombre,
    precio: precioFinal,
    talla: opcionesSeleccionadas.talla,
    manga: opcionesSeleccionadas.manga,
    parches: opcionesSeleccionadas.parches,
    bordadoConmemorativo: opcionesSeleccionadas.bordadoConmemorativo,
    dorsalPersonalizado: dorsalIngresado,
    entregaInmediata: productoSeleccionadoTemp.entregaInmediata || false
  });

  actualizarCarrito();
  cerrarModalOpciones();
}

// --------------------------------- FILTROS Y BÚSQUEDA --------------------------------- 
function filtrarTipoPrenda(tipo, elemento) {
  tipoPrendaActual = tipo;
  categoriaActual = 'todos'; // Resetear subcategoría al cambiar de tipo de prenda

  document.querySelectorAll('.btn-tipo-prenda, .sidebar-item').forEach(btn => btn.classList.remove('active'));
  
  if (elemento) {
    elemento.classList.add('active');
  } else {
    // Sincronizar botón de barra superior si el clic vino desde la sidebar
    const btnBarra = Array.from(document.querySelectorAll('.btn-tipo-prenda')).find(b => 
      b.getAttribute('onclick')?.includes(`'${tipo}'`)
    );
    if (btnBarra) btnBarra.classList.add('active');
  }

  // Regenerar los botones de subcategoría para el tipo de prenda actual
  renderizarCategorias();

  const seccionInmediata = document.getElementById("seccion-entrega-inmediata");
  const seccionCatalogo = document.getElementById("seccion-catalogo-general");
  if (seccionInmediata) seccionInmediata.style.display = "none";
  if (seccionCatalogo) seccionCatalogo.style.display = "block";

  ejecutarFiltroCombinado();

  // 🚀 Hace scroll suave al inicio de la página al cambiar de sección
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filtrarCategoria(categoria, elemento) {
  categoriaActual = categoria;
  document.querySelectorAll('.btn-categoria').forEach(btn => btn.classList.remove('active'));
  
  if (elemento) {
    elemento.classList.add('active');
  } else {
    const btnCoincidente = Array.from(document.querySelectorAll('.btn-categoria')).find(btn => 
      btn.innerText.toLowerCase().includes(categoria.toLowerCase())
    );
    if (btnCoincidente) btnCoincidente.classList.add('active');
  }

  const seccionInmediata = document.getElementById("seccion-entrega-inmediata");
  const seccionCatalogo = document.getElementById("seccion-catalogo-general");

  if (categoria === 'entrega-inmediata') {
    // 🚀 Cambia el título de forma dinámica según la sección actual
    const tituloStock = document.getElementById("titulo-stock-dinamico");
    if (tituloStock) {
      const nombreSeccion = tipoPrendaActual === 'todos' ? 'Prendas' : tipoPrendaActual;
      tituloStock.innerText = `${nombreSeccion} para Entrega Inmediata`;
    }

    if (seccionInmediata) seccionInmediata.style.display = "block";
    if (seccionCatalogo) seccionCatalogo.style.display = "none";
    
    // Filtrar entregas inmediatas respetando el tipo de prenda actual
    const productosStock = PRODUCTOS.filter(p => {
      const tipo = p.tipoPrenda || 'Camisetas';
      const coincideTipo = (tipoPrendaActual === 'todos') || (tipo.toLowerCase() === tipoPrendaActual.toLowerCase());
      return p.entregaInmediata === true && coincideTipo;
    });
    renderizarProductos(productosStock, "contenedor-stock-inmediato");
  } else {
    if (seccionInmediata) seccionInmediata.style.display = "none";
    if (seccionCatalogo) seccionCatalogo.style.display = "block";
    
    ejecutarFiltroCombinado();
  }

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filtrarPorBusqueda() {
  ejecutarFiltroCombinado();
}

function ejecutarFiltroCombinado() {
  const inputBusqueda = document.getElementById('input-busqueda');
  const textoBusqueda = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';

  const resultados = PRODUCTOS.filter(prod => {
    const tipoProd = prod.tipoPrenda || 'Camisetas';
    const coincideTipo = (tipoPrendaActual === 'todos') || (tipoProd.toLowerCase() === tipoPrendaActual.toLowerCase());
    const coincideCategoria = (categoriaActual === 'todos') || (prod.categoria === categoriaActual);
    const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) || 
                          (prod.descripcion && prod.descripcion.toLowerCase().includes(textoBusqueda)) ||
                          prod.categoria.toLowerCase().includes(textoBusqueda);

    return coincideTipo && coincideCategoria && coincideTexto;
  });

  renderizarProductos(resultados, "contenedor-productos");
}

function toggleSidebar(e) {
  if (e && e.target !== e.currentTarget) return;
  const sidebar = document.getElementById("sidebar-secciones");
  if (sidebar) sidebar.classList.toggle("active");
}

// --------------------------------- MANEJO DE IMÁGENES --------------------------------- 
function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) imgPrincipal.src = nuevaUrl;
  
  const contenedorPadre = elementoMiniatura.parentElement;
  if (contenedorPadre) {
    contenedorPadre.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
    elementoMiniatura.classList.add('active');
  }
}

// --------------------------------- LÓGICA DEL CARRITO Y WHATSAPP --------------------------------- 
function eliminarDelCarrito(itemUniqueId) {
  carrito = carrito.filter(item => item.itemUniqueId !== itemUniqueId);
  actualizarCarrito();
  renderizarModalPedido();
}

function actualizarCarrito() {
  total = carrito.reduce((sum, item) => sum + item.precio, 0);
  
  const totalPrecio = document.getElementById("total-precio");
  const modalTotalPrecio = document.getElementById("modal-total-precio");
  const contadorCant = document.getElementById("contador-cant");

  if (totalPrecio) totalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (modalTotalPrecio) modalTotalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (contadorCant) contadorCant.innerText = carrito.length;
}

function abrirModalPedido() {
  renderizarModalPedido();
  document.body.style.overflow = "hidden";
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.add("active");
}

function cerrarModalPedido() {
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function renderizarModalPedido() {
  const contenedor = document.getElementById("lista-detallada-pedido");
  if (!contenedor) return;
  
  if (carrito.length === 0) {
    contenedor.innerHTML = `<p style="text-align: center; color: #64748b; padding: 20px 0;">Tu pedido está vacío.</p>`;
    return;
  }

  contenedor.innerHTML = carrito.map(item => {
    let opcionesElegidas = [];
    if (item.talla) opcionesElegidas.push(`Talla: ${item.talla}`);
    if (item.dorsalPersonalizado) opcionesElegidas.push(`Dorsal: ${item.dorsalPersonalizado}`);
    if (item.manga) opcionesElegidas.push(item.manga);
    if (item.parches && item.parches !== "Sin parches") opcionesElegidas.push(item.parches);
    if (item.bordadoConmemorativo && item.bordadoConmemorativo !== "Sin bordado") {
      opcionesElegidas.push(item.bordadoConmemorativo);
    }

    return `
    <div class="item-pedido-row">
      <div class="item-pedido-info">
        <h4>${item.nombre} ${item.entregaInmediata ? '<span style="color:#22c55e; font-size:0.75rem;">(⚡ Entrega Inmediata)</span>' : ''}</h4>
        <p>${opcionesElegidas.join(' | ')} - <strong>$ ${item.precio.toLocaleString('es-CO')} COP</strong></p>
      </div>
      <div class="item-pedido-acciones">
        <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.itemUniqueId})" title="Quitar del pedido">
          🗑️
        </button>
      </div>
    </div>
  `;
  }).join('');
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Por favor agrega al menos un producto a tu pedido.");
    return;
  }

  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', { value: total, currency: 'COP' });
  }

  let mensaje = `👋 ¡Hola *${CONFIG.nombreTienda}*! Quisiera realizar el siguiente pedido:\n\n`;
  
  carrito.forEach((item, idx) => {
    let detalles = [];
    if (item.talla) detalles.push(`Talla: ${item.talla}`);
    if (item.dorsalPersonalizado) detalles.push(`Dorsal: ${item.dorsalPersonalizado}`);
    if (item.manga) detalles.push(item.manga);
    if (item.parches && item.parches !== "Sin parches") detalles.push(item.parches);
    if (item.bordadoConmemorativo && item.bordadoConmemorativo !== "Sin bordado") {
      detalles.push(item.bordadoConmemorativo);
    }
    
    const infoVariantes = detalles.length > 0 ? ` (${detalles.join(' | ')})` : '';
    const etiquetaInmediata = item.entregaInmediata ? ' ⚡ [ENTREGA INMEDIATA]' : '';

    mensaje += `*${idx + 1}.* ${item.nombre}${infoVariantes}${etiquetaInmediata} - $${item.precio.toLocaleString('es-CO')}\n`;
  });

  mensaje += `\n💵 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n\n`;
  mensaje += "📌 Quedo atento para confirmar disponibilidad de stock y datos de envío.";

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}