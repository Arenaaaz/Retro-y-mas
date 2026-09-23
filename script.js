// ==========================================================================
// SCRIPT PRINCIPAL DE LA TIENDA
// ==========================================================================
// Este archivo contiene TODA la lógica del sitio: catálogo, filtros, carrito,
// modal de personalización de producto y testimonios. No contiene datos de
// productos (eso vive en productos.js) ni reseñas (eso vive en testimonios.js).
//
// Índice de este archivo (usa Ctrl+F con estos títulos para saltar rápido):
//   1. CONFIGURACIÓN DEL NEGOCIO
//   2. VARIABLES GLOBALES
//   3. INICIALIZACIÓN
//   4. RENDERIZADO DE CATEGORÍAS
//   5. RENDERIZADO DE TESTIMONIOS
//   6. RENDERIZADO DE PRODUCTOS
//   7. MODAL DE VISTA RÁPIDA DE PRODUCTO (foto grande + personalización)
//   8. FILTROS Y BÚSQUEDA
//   9. CARRITO Y ENVÍO POR WHATSAPP
//   10. VISOR DE FOTOS DE RESEÑAS
//   11. PREGUNTAS FRECUENTES (FAQ)
//   12. SIDEBAR
// ==========================================================================


// ==========================================================================
// 1. CONFIGURACIÓN DEL NEGOCIO
// ==========================================================================
// Cambia estos valores para actualizar datos del negocio en TODO el sitio
// sin tener que buscar número por número en el resto del código.
const CONFIG = {
  nombreTienda: "Retro y más",
  whatsapp: "573013276930", // Formato: código de país + número, sin +, sin espacios
  moneda: "COP",
  costoEnvioEstandar: 15000, // Costo de envío para menos de 3 prendas
  redesSociales: {
    instagram: "https://www.instagram.com/retroymas_/"
  }
};

// ==========================================================================
// 1B. ENLACES COMPARTIBLES Y TÍTULOS POR SECCIÓN
// ==========================================================================
const TITULO_BASE = document.title;
const DESCRIPCION_BASE = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

const INFO_TIPO_PRENDA = {
  'Camisetas': {
    titulo: `Camisetas Retro de Fútbol | ${CONFIG.nombreTienda}`,
    descripcion: 'Camisetas retro de fútbol de selecciones y clubes históricos, personalizadas con dorsal y número.'
  },
  'Pantalonetas': {
    titulo: `Pantalonetas de Fútbol | ${CONFIG.nombreTienda}`,
    descripcion: 'Pantalonetas retro y de entrenamiento a juego con la camiseta de tu equipo favorito.'
  },
  'Entrenamiento': {
    titulo: `Buzos y Ropa de Entrenamiento | ${CONFIG.nombreTienda}`,
    descripcion: 'Buzos y prendas de entrenamiento de equipos de fútbol, ideales para el día a día.'
  },
  'Cortavientos': {
    titulo: `Cortavientos de Fútbol | ${CONFIG.nombreTienda}`,
    descripcion: 'Cortavientos impermeables de tu equipo favorito, ideales para la lluvia y el frío.'
  }
};

/** Cambia el título de la pestaña y la meta description */
function actualizarMetaPagina(titulo, descripcion) {
  document.title = titulo || TITULO_BASE;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', descripcion || DESCRIPCION_BASE);
}

/** Pone en la URL (sin recargar la página) qué tipo de prenda se está viendo. */
function actualizarURLTipo(tipo) {
  const url = new URL(window.location.href);
  url.searchParams.set('tipo', tipo);
  url.searchParams.delete('producto');
  history.pushState({ tipo }, '', url);
  const info = INFO_TIPO_PRENDA[tipo];
  actualizarMetaPagina(info?.titulo, info?.descripcion);
}

/** Pone en la URL qué producto se está viendo. */
function actualizarURLProducto(prod) {
  const url = new URL(window.location.href);
  const yaEstabaEsteProducto = url.searchParams.get('producto') === String(prod.id);
  url.searchParams.set('producto', prod.id);
  if (yaEstabaEsteProducto) {
    history.replaceState({ producto: prod.id }, '', url);
  } else {
    history.pushState({ producto: prod.id }, '', url);
  }
  actualizarMetaPagina(`${prod.nombre} | ${CONFIG.nombreTienda}`, prod.descripcion || DESCRIPCION_BASE);
}

/** Quita "producto" o "tipo" de la URL al cerrar el modal o al volver a ver el catálogo. */
function limpiarURLProducto() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('producto')) return;
  url.searchParams.delete('producto');
  history.replaceState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
}

// ==========================================================================
// 1C. VISTA DE RESEÑAS COMO "PÁGINA" APARTE
// ==========================================================================

const INFO_VISTA_RESENAS = {
  titulo: `Reseñas de clientes | ${CONFIG.nombreTienda}`,
  descripcion: 'Lo que dicen nuestros clientes sobre las camisetas retro de fútbol de Retro y más.'
};

function irAResenas(actualizarUrl = true) {
  document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
  document.getElementById("seccion-catalogo-general")?.style.setProperty("display", "none");
  document.querySelector(".banner-encargo")?.style.setProperty("display", "none");
  document.getElementById("seccion-testimonios")?.style.setProperty("display", "block");

  if (actualizarUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('vista', 'resenas');
    url.searchParams.delete('tipo');
    url.searchParams.delete('producto');
    history.pushState({ vista: 'resenas' }, '', url);
  }
  actualizarMetaPagina(INFO_VISTA_RESENAS.titulo, INFO_VISTA_RESENAS.descripcion);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverAlCatalogo() {
  document.getElementById("seccion-testimonios")?.style.setProperty("display", "none");
  document.querySelector(".banner-encargo")?.style.setProperty("display", "block");

  const url = new URL(window.location.href);
  url.searchParams.delete('vista');
  history.pushState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (categoriaActual === 'entrega-inmediata') {
    filtrarCategoria('entrega-inmediata');
  } else {
    document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
    document.getElementById("seccion-catalogo-general")?.style.setProperty("display", "block");
    ejecutarFiltroCombinado();
  }
}

async function compartirProducto() {
  if (!productoSeleccionadoTemp) return;
  const url = window.location.href;
  const titulo = `${productoSeleccionadoTemp.nombre} — ${CONFIG.nombreTienda}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, url });
    } catch (err) {
      // El usuario canceló la acción
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    mostrarToast("🔗 Enlace copiado");
  } catch (err) {
    mostrarToast("No se pudo copiar el enlace");
  }
}

let timeoutToast = null;

function mostrarToast(mensaje) {
  let toast = document.getElementById("toast-mensaje");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-mensaje";
    toast.className = "toast-mensaje";
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add("visible");

  clearTimeout(timeoutToast);
  timeoutToast = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

// ==========================================================================
// 2. VARIABLES GLOBALES
// ==========================================================================
let carrito = [];
let total = 0;
let tipoPrendaActual = 'Camisetas';
let categoriaActual = 'todos';

let productoSeleccionadoTemp = null;
let opcionesSeleccionadas = { talla: '', manga: '', parches: '', nombreNumero: '' };

let vistaImagenesActuales = [];
let vistaIndiceActual = 0;

// --------------------------------- INICIALIZACIÓN ---------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderizarCategorias();
  renderizarTestimonios();
  renderizarFAQ();

  const footerAnio = document.getElementById("footer-anio");
  if (footerAnio) footerAnio.textContent = `© ${new Date().getFullYear()} ${CONFIG.nombreTienda}`;

  const btnSocial = document.getElementById("btn-social-flotante");
  if (btnSocial && CONFIG.redesSociales.instagram) {
    btnSocial.href = CONFIG.redesSociales.instagram;
  }

  const parametrosURL = new URLSearchParams(window.location.search);
  const idProductoURL = parametrosURL.get('producto');
  const tipoURL = parametrosURL.get('tipo');
  const vistaURL = parametrosURL.get('vista');

  if (vistaURL === 'resenas') {
    irAResenas(false);
  } else if (window.location.hash === "#entrega-inmediata") {
    filtrarCategoria("entrega-inmediata");
  } else if (tipoURL && INFO_TIPO_PRENDA[tipoURL]) {
    filtrarTipoPrenda(tipoURL, null, false);
    actualizarMetaPagina(INFO_TIPO_PRENDA[tipoURL].titulo, INFO_TIPO_PRENDA[tipoURL].descripcion);
  } else {
    filtrarCategoria("todos");
  }

  if (idProductoURL) {
    const prod = PRODUCTOS.find(p => String(p.id) === String(idProductoURL));
    if (prod) abrirVistaProducto(prod.id);
  }

  actualizarNavCompacta();
});

// ==========================================================================
// 4. RENDERIZADO DE CATEGORÍAS
// ==========================================================================
function renderizarCategorias() {
  const contenedor = document.getElementById("contenedor-categorias");
  if (!contenedor) return;

  const productosVisibles = PRODUCTOS.filter(p => {
    const tipo = p.tipoPrenda || 'Camisetas';
    return (tipoPrendaActual === 'todos') || (tipo.toLowerCase() === tipoPrendaActual.toLowerCase());
  });

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

// ==========================================================================
// 5. RENDERIZADO DE TESTIMONIOS
// ==========================================================================
function generarEstrellas(calificacion) {
  const llenas = Math.round(Number(calificacion) || 0);
  return '★'.repeat(llenas) + '☆'.repeat(5 - llenas);
}

function renderizarTestimonios() {
  const contenedor = document.getElementById("contenedor-testimonios");
  const resumen = document.getElementById("resumen-calificacion");
  const barraSuperior = document.getElementById("barra-resenas");
  if (!contenedor) return;

  const listaTestimonios = (typeof TESTIMONIOS !== 'undefined') ? TESTIMONIOS : [];

  const mensajeInvitacion = encodeURIComponent(
    `👋 ¡Hola! Ya recibí mi camiseta de *${CONFIG.nombreTienda}* y quiero contarles mi experiencia:\n\n`
  );
  const linkDejarResena = `https://wa.me/${CONFIG.whatsapp}?text=${mensajeInvitacion}`;

  if (listaTestimonios.length === 0) {
    if (barraSuperior) {
      barraSuperior.innerHTML = `
        <a href="?vista=resenas" onclick="event.preventDefault(); irAResenas();">
          ⭐ Sé el primero en dejarnos tu opinión — Ver reseñas
        </a>
      `;
    }
    if (resumen) resumen.innerHTML = '';
    contenedor.innerHTML = `
      <div class="testimonio-vacio">
        <p>Todavía no tenemos reseñas publicadas, ¡pero ya llegan pedidos cada semana!</p>
        <a href="${linkDejarResena}" target="_blank" rel="noopener" class="btn-dejar-resena">
          📝 Danos tu opinión
        </a>
      </div>
    `;
    renderizarBannerResenas(listaTestimonios);
    return;
  }

  const promedio = listaTestimonios.reduce((sum, t) => sum + (Number(t.calificacion) || 0), 0) / listaTestimonios.length;

  if (barraSuperior) {
    barraSuperior.innerHTML = `
      <a href="?vista=resenas" onclick="event.preventDefault(); irAResenas();">
        <span class="estrellas-mini">${generarEstrellas(promedio)}</span>
        ${promedio.toFixed(1)} de 5 · ${listaTestimonios.length} reseña${listaTestimonios.length === 1 ? '' : 's'} — Ver opiniones
      </a>
    `;
  }

  if (resumen) {
    resumen.innerHTML = `
      <span class="estrellas-resumen">${generarEstrellas(promedio)}</span>
      <span class="texto-resumen">${promedio.toFixed(1)} de 5 · ${listaTestimonios.length} reseña${listaTestimonios.length === 1 ? '' : 's'}</span>
    `;
  }

  contenedor.innerHTML = listaTestimonios.map((t, indiceTestimonio) => `
    <div class="card-testimonio">
      ${t.imagenes && t.imagenes.length > 0 ? `
        <div class="testimonio-foto" onclick="abrirVisorFoto(${indiceTestimonio}, 0)">
          <img src="${t.imagenes[0]}" alt="Foto de ${t.nombre}">
          ${t.imagenes.length > 1 ? `<span class="testimonio-foto-badge">+${t.imagenes.length - 1} foto${t.imagenes.length - 1 === 1 ? '' : 's'}</span>` : ''}
        </div>
      ` : ''}
      <div class="testimonio-cuerpo">
        <div class="estrellas-testimonio">${generarEstrellas(t.calificacion)}</div>
        <p class="comentario-testimonio">"${t.comentario}"</p>
        <div class="autor-testimonio">
          <strong>${t.nombre}</strong>${t.ciudad ? ` · ${t.ciudad}` : ''}
          ${t.producto ? `<span class="producto-testimonio">Compró: ${t.producto}</span>` : ''}
        </div>
        ${t.imagenes && t.imagenes.length > 1 ? `
          <div class="imagenes-testimonio">
            ${t.imagenes.slice(1).map((url, indiceImagen) => `
              <img src="${url}" alt="Foto de ${t.nombre}" onclick="event.stopPropagation(); abrirVisorFoto(${indiceTestimonio}, ${indiceImagen + 1})">
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('') + `
    <div class="testimonio-cta">
      <a href="${linkDejarResena}" target="_blank" rel="noopener" class="btn-dejar-resena">
        📝 Danos tu opinión
      </a>
    </div>
  `;

  renderizarBannerResenas(listaTestimonios);
}

function renderizarBannerResenas(listaTestimonios) {
  const contenedor = document.getElementById("banner-resenas");
  if (!contenedor) return;

  if (!listaTestimonios || listaTestimonios.length === 0) {
    contenedor.innerHTML = `
      <a href="?vista=resenas" class="banner-resenas-link" onclick="event.preventDefault(); irAResenas();">
        <span class="banner-resenas-texto">⭐ Sé el primero en dejarnos tu opinión</span>
        <span class="banner-resenas-boton">Ver reseñas →</span>
      </a>
    `;
    return;
  }

  const promedio = listaTestimonios.reduce((sum, t) => sum + (Number(t.calificacion) || 0), 0) / listaTestimonios.length;

  const fotos = listaTestimonios.slice(0, 4).map(t => {
    if (t.imagenes && t.imagenes.length > 0) {
      return `<span class="banner-resenas-avatar"><img src="${t.imagenes[0]}" alt="Foto de ${t.nombre}"></span>`;
    }
    const iniciales = t.nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="banner-resenas-avatar banner-resenas-avatar-iniciales">${iniciales}</span>`;
  }).join('');

  contenedor.innerHTML = `
    <a href="?vista=resenas" class="banner-resenas-link" onclick="event.preventDefault(); irAResenas();">
      <span class="banner-resenas-fotos">${fotos}</span>
      <span class="banner-resenas-texto">
        <span class="estrellas-mini">${generarEstrellas(promedio)}</span>
        ${promedio.toFixed(1)} · Lo que dicen nuestros clientes
      </span>
      <span class="banner-resenas-boton">Ver todas las reseñas →</span>
    </a>
  `;
}

// ==========================================================================
// 6. RENDERIZADO DE PRODUCTOS
// ==========================================================================
function renderizarProductos(productos, idContenedor = "contenedor-productos") {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  if (productos.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No se encontraron prendas disponibles en esta sección.</p>`;
    return;
  }

  const primerIndicePorClave = new Map();
  productos.forEach((p, idx) => {
    const clave = p.grupo || p.id;
    if (!primerIndicePorClave.has(clave)) primerIndicePorClave.set(clave, idx);
  });

  const productosOrdenados = [...productos].sort((a, b) => {
    const inmediataA = a.entregaInmediata === true;
    const inmediataB = b.entregaInmediata === true;
    if (inmediataA !== inmediataB) return inmediataA ? -1 : 1;

    const claveA = a.grupo || a.id;
    const claveB = b.grupo || b.id;
    if (claveA !== claveB) return primerIndicePorClave.get(claveA) - primerIndicePorClave.get(claveB);
    return 0;
  });

  contenedor.innerHTML = productosOrdenados.map(prod => {
    return `
    <div class="card-producto">
      ${prod.entregaInmediata ? `<span class="badge-inmediato-card">⚡ Entrega Inmediata</span>` : ''}

      <div class="galeria-container">
        <div class="img-container" onclick="abrirVistaProducto('${prod.id}')" role="button" tabindex="0" aria-label="Ver ${prod.nombre} en grande y personalizar" onkeydown="if(event.key==='Enter') abrirVistaProducto('${prod.id}')">
          <img id="img-principal-${prod.id}" src="${prod.imagenes[0]}" alt="${prod.nombre}" loading="lazy">
          <div class="img-overlay-ver"><span>🔍 Ver y personalizar</span></div>
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

        <button class="btn-agregar" onclick="abrirVistaProducto('${prod.id}')">
          Pedir esta prenda
        </button>
      </div>
    </div>
    `;
  }).join('');
}

function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) imgPrincipal.src = nuevaUrl;

  if (elementoMiniatura && elementoMiniatura.parentElement) {
    elementoMiniatura.parentElement.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
    elementoMiniatura.classList.add('active');
  }
}

// ==========================================================================
// 7. MODAL DE VISTA RÁPIDA DE PRODUCTO
// ==========================================================================
function abrirVistaProducto(idProducto) {
  const prod = PRODUCTOS.find(p => String(p.id) === String(idProducto));
  if (!prod) return;

  productoSeleccionadoTemp = prod;
  vistaImagenesActuales = prod.imagenes || [];
  vistaIndiceActual = 0;

  opcionesSeleccionadas = {
    talla: prod.tallas ? prod.tallas[0] : '',
    manga: prod.variantes?.manga ? prod.variantes.manga[0].tipo : '',
    parches: prod.variantes?.parches ? prod.variantes.parches[0].tipo : '',
    bordadoConmemorativo: prod.tieneOpcionBordado ? 'Sin bordado' : '',
    nombreNumero: ''
  };

  document.getElementById("modal-opt-titulo").innerText = prod.nombre;
  document.getElementById("vista-opt-nombre").innerText = prod.nombre;

  const badgeInmediato = document.getElementById("vista-badge-inmediato");
  if (badgeInmediato) badgeInmediato.style.display = prod.entregaInmediata ? "block" : "none";

  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();

  const esCamiseta = !prod.tipoPrenda || prod.tipoPrenda.toLowerCase() === 'camisetas';

  const contenedorBody = document.getElementById("modal-opt-body");
  contenedorBody.innerHTML = `
    ${prod.entregaInmediata ? `
      <div class="alerta-stock-modal">
        <span>⚡ <strong>DISPONIBLE PARA ENTREGA INMEDIATA:</strong></span>
        <p>Talla: <strong>${prod.tallasInmediatas ? prod.tallasInmediatas.join(', ') : 'L'}</strong> \vert{} Dorsal: <strong>${prod.dorsalInmediato || 'Sin estampado especificado'}</strong></p>
      </div>
    ` : ''}

    ${(() => {
      if (!prod.grupo) return '';
      const otrasVersiones = PRODUCTOS.filter(p => p.grupo === prod.grupo && p.id !== prod.id);
      if (otrasVersiones.length === 0) return '';
      return `
        <div class="aviso-otras-versiones">
          <span>También disponible:</span>
          <div class="chips-otras-versiones">
            ${otrasVersiones.map(p => {
              const etiqueta = p.nombre.replace(prod.grupo, '').trim() || p.nombre;
              return `<button type="button" class="chip-otra-version" onclick="abrirVistaProducto('${p.id}')">${etiqueta}${p.entregaInmediata ? ' ⚡' : ''}</button>`;
            }).join('')}
          </div>
        </div>
      `;
    })()}

    <!-- 1. SELECCIÓN DE TALLA -->
    ${prod.tallas && prod.tallas.length > 0 ? `
      <div class="selector-chip-container">
        <label>
          📏 Talla
          ${esCamiseta ? '<button type="button" class="link-guia-tallas" onclick="verGuiaTallas()">¿Cómo saber qué talla soy?</button>' : ''}
        </label>
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

    <!-- 2. CAMPO DE ESTAMPADO -->
    ${esCamiseta ? `
      <div class="campo-personalizacion-container">
        <label for="input-nombre-numero">🖊️ Nombre y Número de Jugador (Opcional)</label>
        <input type="text"
               id="input-nombre-numero"
               placeholder="Ej: MESSI 10 o Juan 7"
               oninput="opcionesSeleccionadas.nombreNumero = this.value">
        <small style="color: #64748b; font-size: 0.75rem; display: block; margin-top: 4px;">
          Déjalo en blanco si prefieres la prenda sin estampado.
        </small>
      </div>
    ` : ''}

    <!-- 3. VARIANTES DE MANGA -->
    ${prod.variantes?.manga ? `
      <div class="selector-chip-container">
        <label>👕 Tipo de Manga</label>
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

    <!-- 4. VARIANTES DE PARCHES -->
    ${prod.variantes?.parches ? `
      <div class="selector-chip-container">
        <label>🛡️ Parches / Escudos</label>
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

    <!-- 5. BORDADO CONMEMORATIVO -->
    ${prod.tieneOpcionBordado ? `
      <div class="selector-chip-container">
        <label>🏆 Incluir ${prod.textoBordado || 'Bordado de la Final'} (Sin costo extra)</label>
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
  actualizarURLProducto(prod);
}

function renderizarImagenVista() {
  const img = document.getElementById("vista-img-principal");
  if (!img || vistaImagenesActuales.length === 0) return;
  img.src = vistaImagenesActuales[vistaIndiceActual];
  img.alt = productoSeleccionadoTemp ? productoSeleccionadoTemp.nombre : '';
}

function renderizarMiniaturasVista() {
  const cont = document.getElementById("vista-miniaturas");
  if (!cont) return;
  if (vistaImagenesActuales.length < 2) {
    cont.innerHTML = '';
    return;
  }
  cont.innerHTML = vistaImagenesActuales.map((url, idx) => `
    <img src="${url}" class="${idx === vistaIndiceActual ? 'active' : ''}" onclick="irAImagenVista(${idx})" alt="Vista ${idx + 1}">
  `).join('');
}

function renderizarDotsVista() {
  const cont = document.getElementById("vista-dots");
  if (!cont) return;
  if (vistaImagenesActuales.length < 2) {
    cont.innerHTML = '';
    return;
  }
  cont.innerHTML = vistaImagenesActuales.map((_, idx) => `
    <span class="dot ${idx === vistaIndiceActual ? 'active' : ''}" onclick="irAImagenVista(${idx})" role="button" aria-label="Ir a foto ${idx + 1}"></span>
  `).join('');
}

function irAImagenVista(idx) {
  vistaIndiceActual = idx;
  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();
}

function cambiarImagenVista(delta) {
  if (vistaImagenesActuales.length === 0) return;
  const totalImagenes = vistaImagenesActuales.length;
  vistaIndiceActual = (vistaIndiceActual + delta + totalImagenes) % totalImagenes;
  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();
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

  const precioFormateado = `$ ${precioCalculado.toLocaleString('es-CO')} COP`;
  document.getElementById("modal-opt-precio-total").innerText = precioFormateado;

  const precioVista = document.getElementById("vista-opt-precio");
  if (precioVista) precioVista.innerText = precioFormateado;
}

function cerrarModalOpciones() {
  document.getElementById("modal-opciones-producto").classList.remove("active");
  document.body.style.overflow = "";
  productoSeleccionadoTemp = null;
  vistaImagenesActuales = [];
  limpiarURLProducto();
}

function verGuiaTallas() {
  cerrarModalOpciones();
  setTimeout(() => {
    document.getElementById("guia-tallas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 250);
}

// ==========================================================================
// BARRAS QUE REACCIONAN AL SCROLL (arriba y abajo)
// ==========================================================================
const UMBRAL_NAV_COMPACTA = 60;
const UMBRAL_SCROLL_NAV = 12;
const PAUSA_TRAS_CAMBIO_NAV = 320;
let ultimoScrollYNav = window.scrollY;
let navCompacta = false;
let navEnPausa = false;

function actualizarNavCompacta() {
  if (navEnPausa) return;

  const nav = document.querySelector(".categorias-nav");
  if (!nav) return;

  const scrollActual = window.scrollY;
  const diferencia = scrollActual - ultimoScrollYNav;
  let cambio = false;

  if (scrollActual < UMBRAL_NAV_COMPACTA) {
    if (navCompacta) cambio = true;
    nav.classList.remove("compacta");
    navCompacta = false;
  } else if (diferencia > UMBRAL_SCROLL_NAV && !navCompacta) {
    nav.classList.add("compacta");
    navCompacta = true;
    cambio = true;
  } else if (diferencia < -UMBRAL_SCROLL_NAV && navCompacta) {
    nav.classList.remove("compacta");
    navCompacta = false;
    cambio = true;
  }

  ultimoScrollYNav = scrollActual;

  if (cambio) {
    navEnPausa = true;
    setTimeout(() => {
      navEnPausa = false;
      ultimoScrollYNav = window.scrollY;
    }, PAUSA_TRAS_CAMBIO_NAV);
  }
}

let ultimoScrollYBarraCarrito = window.scrollY;
let barraCarritoOculta = false;
const UMBRAL_SCROLL_BARRA = 12;

function actualizarVisibilidadBarraCarrito() {
  const barra = document.querySelector(".barra-carrito");
  if (!barra) return;

  const scrollActual = window.scrollY;
  const diferencia = scrollActual - ultimoScrollYBarraCarrito;

  if (scrollActual < 80) {
    barra.classList.remove("barra-carrito-oculta");
    barraCarritoOculta = false;
  } else if (diferencia > UMBRAL_SCROLL_BARRA && !barraCarritoOculta) {
    barra.classList.add("barra-carrito-oculta");
    barraCarritoOculta = true;
  } else if (diferencia < -UMBRAL_SCROLL_BARRA && barraCarritoOculta) {
    barra.classList.remove("barra-carrito-oculta");
    barraCarritoOculta = false;
  }

  ultimoScrollYBarraCarrito = scrollActual;
}

let scrollTickingBarras = false;
window.addEventListener("scroll", () => {
  if (!scrollTickingBarras) {
    window.requestAnimationFrame(() => {
      actualizarNavCompacta();
      actualizarVisibilidadBarraCarrito();
      scrollTickingBarras = false;
    });
    scrollTickingBarras = true;
  }
}, { passive: true });

function mostrarBarraCarritoTemporal() {
  const barra = document.querySelector(".barra-carrito");
  if (!barra) return;
  barra.classList.remove("barra-carrito-oculta");
  barraCarritoOculta = false;
  ultimoScrollYBarraCarrito = window.scrollY;
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
  mostrarBarraCarritoTemporal();
}

document.addEventListener("keydown", (e) => {
  const modalVista = document.getElementById("modal-opciones-producto");
  if (!modalVista || !modalVista.classList.contains("active")) return;
  if (e.key === "Escape") cerrarModalOpciones();
  if (e.key === "ArrowLeft") cambiarImagenVista(-1);
  if (e.key === "ArrowRight") cambiarImagenVista(1);
});

window.addEventListener("popstate", () => {
  const modalVista = document.getElementById("modal-opciones-producto");
  const tieneProductoEnURL = new URL(window.location.href).searchParams.has('producto');
  if (modalVista?.classList.contains("active") && !tieneProductoEnURL) {
    document.getElementById("modal-opciones-producto").classList.remove("active");
    document.body.style.overflow = "";
    productoSeleccionadoTemp = null;
    vistaImagenesActuales = [];
    actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
  }

  const estaEnVistaResenas = document.getElementById("seccion-testimonios")?.style.display === "block";
  const tieneVistaResenasEnURL = new URL(window.location.href).searchParams.get('vista') === 'resenas';
  if (estaEnVistaResenas && !tieneVistaResenasEnURL) {
    document.getElementById("seccion-testimonios").style.display = "none";
    document.querySelector(".banner-encargo")?.style.setProperty("display", "block");
    actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);

    if (categoriaActual === 'entrega-inmediata') {
      filtrarCategoria('entrega-inmediata');
    } else {
      document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
      document.getElementById("seccion-catalogo-general")?.style.setProperty("display", "block");
      ejecutarFiltroCombinado();
    }
  } else if (!estaEnVistaResenas && tieneVistaResenasEnURL) {
    irAResenas(false);
  }
});

(() => {
  const galeriaPrincipal = document.getElementById("vista-galeria-principal");
  if (!galeriaPrincipal) return;

  const UMBRAL_SWIPE = 40;
  let inicioX = 0;
  let inicioY = 0;

  galeriaPrincipal.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
    inicioY = e.touches[0].clientY;
  }, { passive: true });

  galeriaPrincipal.addEventListener("touchend", (e) => {
    const finX = e.changedTouches[0].clientX;
    const finY = e.changedTouches[0].clientY;
    const deltaX = finX - inicioX;
    const deltaY = finY - inicioY;

    if (Math.abs(deltaX) > UMBRAL_SWIPE && Math.abs(deltaX) > Math.abs(deltaY)) {
      cambiarImagenVista(deltaX < 0 ? 1 : -1);
    }
  }, { passive: true });
})();

// ==========================================================================
// 8. FILTROS Y BÚSQUEDA
// ==========================================================================
function filtrarTipoPrenda(tipo, elemento, actualizarUrl = true) {
  tipoPrendaActual = tipo;
  categoriaActual = 'todos';

  document.querySelectorAll('.sidebar-item').forEach(btn => btn.classList.remove('active'));

  if (elemento) {
    elemento.classList.add('active');
  } else {
    const btnSidebar = Array.from(document.querySelectorAll('.sidebar-item')).find(b =>
      b.getAttribute('onclick')?.includes(`'${tipo}'`)
    );
    if (btnSidebar) btnSidebar.classList.add('active');
  }

  renderizarCategorias();

  const seccionInmediata = document.getElementById("seccion-entrega-inmediata");
  const seccionCatalogo = document.getElementById("seccion-catalogo-general");
  if (seccionInmediata) seccionInmediata.style.display = "none";
  if (seccionCatalogo) seccionCatalogo.style.display = "block";

  ejecutarFiltroCombinado();

  if (actualizarUrl) actualizarURLTipo(tipo);

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
    const tituloStock = document.getElementById("titulo-stock-dinamico");
    if (tituloStock) {
      const nombreSeccion = tipoPrendaActual === 'todos' ? 'Prendas' : tipoPrendaActual;
      tituloStock.innerText = `${nombreSeccion} para Entrega Inmediata`;
    }

    if (seccionInmediata) seccionInmediata.style.display = "block";
    if (seccionCatalogo) seccionCatalogo.style.display = "none";

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

let yaSubioPorBusqueda = false;

function filtrarPorBusqueda() {
  ejecutarFiltroCombinado();

  const input = document.getElementById('input-busqueda');
  const tieneTexto = input && input.value.trim() !== '';

  if (tieneTexto && !yaSubioPorBusqueda) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    yaSubioPorBusqueda = true;
  } else if (!tieneTexto) {
    yaSubioPorBusqueda = false;
  }
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

// ==========================================================================
// 9. CARRITO Y ENVÍO POR WHATSAPP
// ==========================================================================
function eliminarDelCarrito(itemUniqueId) {
  carrito = carrito.filter(item => item.itemUniqueId !== itemUniqueId);
  actualizarCarrito();
  renderizarModalPedido();
}

function actualizarCarrito() {
  total = carrito.reduce((sum, item) => sum + item.precio, 0);

  // El costo fijo de envío solo aplica para pedidos por encargo con menos de 3 prendas
  const prendasPorEncargo = carrito.filter(item => !item.entregaInmediata);
  const aplicaCostoEnvioEncargo = prendasPorEncargo.length > 0 && prendasPorEncargo.length < 3;
  const costoEnvio = aplicaCostoEnvioEncargo ? CONFIG.costoEnvioEstandar : 0;
  const totalFinal = total + costoEnvio;

  const totalPrecio = document.getElementById("total-precio");
  const modalTotalPrecio = document.getElementById("modal-total-precio");
  const contadorCant = document.getElementById("contador-cant");
  const btnRealizarPedido = document.querySelector(".btn-realizar-pedido");

  if (totalPrecio) {
    totalPrecio.innerText = `$ ${totalFinal.toLocaleString('es-CO')} COP`;
  }
  if (modalTotalPrecio) {
    if (carrito.length > 0 && costoEnvio > 0) {
      modalTotalPrecio.innerHTML = `<small style="font-size:0.75rem; font-weight:normal; color:#64748b;">(Prendas $${total.toLocaleString('es-CO')} + Envío por encargo $${costoEnvio.toLocaleString('es-CO')})</small> <br> $${totalFinal.toLocaleString('es-CO')} COP`;
    } else {
      modalTotalPrecio.innerText = `$ ${totalFinal.toLocaleString('es-CO')} COP`;
    }
  }
  if (contadorCant) contadorCant.innerText = carrito.length;
  if (btnRealizarPedido) btnRealizarPedido.classList.toggle("con-items", carrito.length > 0);
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

  const prendasPorEncargo = carrito.filter(item => !item.entregaInmediata);
  const prendasInmediatas = carrito.filter(item => item.entregaInmediata);

  const aplicaCostoEnvioEncargo = prendasPorEncargo.length > 0 && prendasPorEncargo.length < 3;
  const costoEnvio = aplicaCostoEnvioEncargo ? CONFIG.costoEnvioEstandar : 0;
  const totalConEnvio = total + costoEnvio;

  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', { value: totalConEnvio, currency: 'COP' });
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

  mensaje += `\n📦 *SUBTOTAL PRENDAS:* $${total.toLocaleString('es-CO')} COP`;

  // Detalle del costo de envío según el tipo de producto
  if (prendasPorEncargo.length >= 3) {
    mensaje += `\n🚚 *ENVÍO POR ENCARGO:* ¡GRATIS! 🎉 (Aplica por llevar 3 o más prendas por encargo)`;
  } else if (prendasPorEncargo.length > 0) {
    mensaje += `\n🚚 *ENVÍO NACIONAL (ENCARGO):* $${costoEnvio.toLocaleString('es-CO')} COP`;
  }

  if (prendasInmediatas.length > 0) {
    mensaje += `\n⚡ *ENTREGA INMEDIATA:* Domicilio con pago contraentrega en Medellín (se coordina el valor según dirección).`;
  }

  mensaje += `\n💵 *TOTAL A PAGAR:* $${totalConEnvio.toLocaleString('es-CO')} COP\n\n`;
  mensaje += "📌 Quedo atento para confirmar los datos de despacho.";

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}

// ==========================================================================
// 10. VISOR DE FOTOS DE RESEÑAS
// ==========================================================================
function abrirVisorFoto(indiceTestimonio, indiceImagen) {
  if (typeof TESTIMONIOS === 'undefined') return;
  const testimonio = TESTIMONIOS[indiceTestimonio];
  if (!testimonio || !testimonio.imagenes) return;

  const img = document.getElementById("visor-foto-img");
  if (img) {
    img.src = testimonio.imagenes[indiceImagen];
    img.alt = `Foto de ${testimonio.nombre}`;
  }

  document.getElementById("modal-foto-resena").classList.add("active");
  document.body.style.overflow = "hidden";
}

function cerrarVisorFoto() {
  document.getElementById("modal-foto-resena").classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 11. PREGUNTAS FRECUENTES (FAQ)
// ==========================================================================
const FAQS = [
  {
    pregunta: "¿Cómo sé qué talla pedir?",
    respuesta: "Todas las prendas manejan tallas S, M, L y XL. Si tienes dudas sobre cuál te queda mejor, escríbenos por WhatsApp antes de pedir y te ayudamos a elegir según tu contextura."
  },
  {
    pregunta: "¿Cuánto tarda el envío?",
    respuesta: "Las prendas marcadas como Entrega Inmediata se despachan en 24-48 horas. Las prendas por encargo tardan entre 15 y 20 días hábiles. En ambos casos te compartimos la guía de rastreo por WhatsApp."
  },
  {
    pregunta: "¿Cómo pago mi pedido?",
    respuesta: "Primero confirmamos contigo la disponibilidad de talla y prenda por WhatsApp; solo después de esa confirmación coordinamos el método de pago."
  },
  {
    pregunta: "¿Puedo pedir la camiseta con el nombre y número que yo quiera?",
    respuesta: "Sí, en la mayoría de camisetas puedes escribir el nombre y número que prefieras al personalizar tu pedido, sin costo adicional."
  },
  {
    pregunta: "¿Qué pasa si la talla no me queda?",
    respuesta: "Escríbenos por WhatsApp apenas recibas tu pedido y revisamos juntos las opciones de cambio según el caso."
  }
];

function renderizarFAQ() {
  const contenedor = document.getElementById("contenedor-faq");
  if (!contenedor) return;

  contenedor.innerHTML = FAQS.map((item, idx) => `
    <div class="faq-item" id="faq-item-${idx}">
      <button class="faq-pregunta" onclick="toggleFAQ(${idx})">
        <span>${item.pregunta}</span>
        <span class="faq-icono">+</span>
      </button>
      <div class="faq-respuesta">
        <p>${item.respuesta}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(idx) {
  const item = document.getElementById(`faq-item-${idx}`);
  if (item) item.classList.toggle("active");
}

// ==========================================================================
// 12. SIDEBAR
// ==========================================================================
function toggleSidebar(e) {
  if (e && e.target !== e.currentTarget) return;
  const sidebar = document.getElementById("sidebar-secciones");
  if (sidebar) sidebar.classList.toggle("active");
}