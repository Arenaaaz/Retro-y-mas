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
  redesSociales: {
    instagram: "https://www.instagram.com/retroymas_/"
  },
  // TODO: ajusta este valor al costo real de tu envío nacional.
  // Se suma solo cuando el pedido tiene menos de 3 prendas Y no incluye
  // ninguna prenda de Entrega Inmediata (esas se manejan aparte, por
  // domiciliario en Medellín — ver actualizarBannerPedido en este archivo).
  costoEnvio: 15000,
  minimoPrendasSinEnvio: 3
};

// ==========================================================================
// 1B. ENLACES COMPARTIBLES Y TÍTULOS POR SECCIÓN
// ==========================================================================
// Permiten que compartir el link de una prenda puntual, o de una sección
// como "Pantalonetas", lleve a quien lo abra directo a esa vista (en vez de
// siempre caer en la portada), y que la pestaña del navegador muestre un
// título acorde en cada caso. Todo pasa por la URL (?producto=ID o
// ?tipo=Camisetas) sin recargar la página ni crear archivos nuevos, así que
// no hay nada adicional que mantener.
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

/** Cambia el título de la pestaña y la meta description (para SEO y para que
 * el link se vea bien si alguien lo comparte). */
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

/** Pone en la URL (sin recargar la página) qué producto se está viendo, para
 * que el link de la barra de direcciones se pueda copiar y compartir tal
 * cual y abra ese producto directamente. Si la URL ya traía ese mismo
 * producto (ej. se llegó por un link compartido), reemplaza en vez de
 * apilar una entrada duplicada en el historial. */
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

/** Quita "producto" o "tipo" de la URL al cerrar el modal o al volver a ver
 * todo el catálogo, y restaura el título original de la página. */
function limpiarURLProducto() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('producto')) return; // nada que limpiar
  url.searchParams.delete('producto');
  history.replaceState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
}

// ==========================================================================
// 1C. VISTA DE RESEÑAS COMO "PÁGINA" APARTE
// ==========================================================================
// No es un archivo .html nuevo (eso obligaría a mantener el header, sidebar,
// footer y modales duplicados en dos archivos) — es la misma página, pero
// intercambiando qué se ve, con su propia URL (?vista=resenas) para que se
// pueda compartir o guardar en favoritos igual que si fuera una página real.

const INFO_VISTA_RESENAS = {
  titulo: `Reseñas de clientes | ${CONFIG.nombreTienda}`,
  descripcion: 'Lo que dicen nuestros clientes sobre las camisetas retro de fútbol de Retro y más.'
};

/** Muestra la sección completa de reseñas como si fuera una página aparte,
 * ocultando el catálogo mientras tanto. `actualizarUrl` se pone en false
 * solo cuando la propia carga de la página ya trae ?vista=resenas. */
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

/** Vuelve del "página" de reseñas al catálogo normal, restaurando
 * exactamente lo que se estaba viendo antes de entrar a reseñas (incluida
 * la sección especial de "Entrega Inmediata" si esa era la que estaba
 * activa) — categoriaActual no se toca al entrar a reseñas, así que todavía
 * guarda ese dato. */
function volverAlCatalogo() {
  document.getElementById("seccion-testimonios")?.style.setProperty("display", "none");
  document.querySelector(".banner-encargo")?.style.setProperty("display", "block");

  const url = new URL(window.location.href);
  url.searchParams.delete('vista');
  history.pushState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (categoriaActual === 'entrega-inmediata') {
    filtrarCategoria('entrega-inmediata'); // muestra de nuevo esa sección especial y oculta el catálogo general
  } else {
    document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
    document.getElementById("seccion-catalogo-general")?.style.setProperty("display", "block");
    ejecutarFiltroCombinado();
  }
}

/**
 * Botón 🔗 del modal de producto. En celular usa el panel nativo de
 * compartir de WhatsApp/Instagram/etc. (navigator.share); en computador,
 * donde ese panel no existe, copia el link al portapapeles y avisa con un
 * toast. El link apunta a la URL actual (ya trae ?producto=ID desde
 * actualizarURLProducto, que se llama al abrir el modal).
 */
async function compartirProducto() {
  if (!productoSeleccionadoTemp) return;
  const url = window.location.href;
  const titulo = `${productoSeleccionadoTemp.nombre} — ${CONFIG.nombreTienda}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, url });
    } catch (err) {
      // El usuario cerró el panel de compartir sin elegir nada; no es un error real.
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

/** Muestra un mensaje corto flotante que desaparece solo (ej. "Enlace copiado"). */
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
let costoEnvioAplicado = 0; // se recalcula en cada actualizarCarrito(); ver actualizarBannerPedido()
let formaEncargoSeleccionada = ''; // '100' o '50'; ver selector "Forma de pedido" en modal-pedido
let datosEnvio = null;
let tipoPrendaActual = 'Camisetas';
let categoriaActual = 'todos';

// Producto que está abierto actualmente en el modal de vista rápida, y las
// opciones que el cliente ha ido eligiendo dentro de ese modal.
let productoSeleccionadoTemp = null;
let opcionesSeleccionadas = { talla: '', manga: '', parches: '', nombreNumero: '' };

// Estado de navegación de fotos dentro del modal de vista rápida.
let vistaImagenesActuales = [];
let vistaIndiceActual = 0;

// --------------------------------- INICIALIZACIÓN ---------------------------------
/**
 * Punto de entrada del sitio. Se ejecuta una sola vez, cuando el HTML ya
 * terminó de cargar. Dibuja el catálogo y los testimonios, actualiza el año
 * del footer, y decide si debe abrir directamente la sección de "entrega
 * inmediata" (cuando alguien llega desde un enlace con #entrega-inmediata,
 * por ejemplo un anuncio).
 */
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
    // Alguien entró por un link directo a las reseñas (?vista=resenas);
    // el "false" evita reescribir la URL que ya está bien.
    irAResenas(false);
  } else if (window.location.hash === "#entrega-inmediata") {
    filtrarCategoria("entrega-inmediata");
  } else if (tipoURL && INFO_TIPO_PRENDA[tipoURL]) {
    // Alguien entró por un link tipo ?tipo=Pantalonetas (ej. compartido o
    // desde el sidebar); el "false" evita reescribir la URL que ya está bien.
    filtrarTipoPrenda(tipoURL, null, false);
    actualizarMetaPagina(INFO_TIPO_PRENDA[tipoURL].titulo, INFO_TIPO_PRENDA[tipoURL].descripcion);
  } else {
    // Por defecto, la página arranca en "Todos" — se ve el catálogo
    // general completo, no la caja oscura de Entrega Inmediata (esa
    // solo aparece si el cliente toca ese chip a propósito).
    filtrarCategoria("todos");
  }

  // Si además la URL trae ?producto=ID (ej. un link directo a una prenda
  // puntual compartido por WhatsApp), se abre ese producto de una vez.
  if (idProductoURL) {
    const prod = PRODUCTOS.find(p => String(p.id) === String(idProductoURL));
    if (prod) abrirVistaProducto(prod.id);
  }

  actualizarNavCompacta(); // por si la página carga ya con scroll (ej. #entrega-inmediata)
});

// ==========================================================================
// 4. RENDERIZADO DE CATEGORÍAS
// ==========================================================================
/**
 * Dibuja los botones de subcategoría (los "chips" horizontales debajo del
 * buscador: "Todos", "Entrega Inmediata", y una por cada categoría que
 * exista dentro del tipo de prenda actualmente seleccionado). Se vuelve a
 * llamar cada vez que el cliente cambia de tipo de prenda en el sidebar,
 * porque las categorías disponibles cambian según el tipo.
 */
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
/**
 * Convierte un número de calificación (1 a 5) en estrellas de texto.
 * Redondea al entero más cercano antes de dibujar, así que un 4.6 se ve
 * como 5 estrellas llenas.
 */
function generarEstrellas(calificacion) {
  const llenas = Math.round(Number(calificacion) || 0);
  return '★'.repeat(llenas) + '☆'.repeat(5 - llenas);
}

/**
 * Dibuja la sección completa de testimonios: la barra corta que aparece
 * arriba de todo el sitio (siempre visible, con o sin reseñas todavía), el
 * resumen de calificación junto al título de la sección, y cada tarjeta de
 * reseña individual (incluyendo las fotos que el cliente haya compartido).
 *
 * Si TESTIMONIOS (definido en testimonios.js) está vacío, en vez de
 * ocultar la sección se muestra una invitación a dejar la primera reseña:
 * así el cliente siempre encuentra el apartado en el mismo lugar, exista o
 * no contenido todavía (punto 1 del pedido de rediseño).
 */
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
    // Barra superior siempre visible, incluso sin reseñas: mantiene el
    // acceso predecible aunque el contenido cambie.
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

  // Number(...) convierte a número cualquier valor válido; si el campo
  // "calificacion" de alguna reseña faltara o estuviera mal escrito (por
  // ejemplo "calificación" con tilde), esto evita que todo el promedio
  // se dañe y muestre "NaN" en vez de un número.
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

/**
 * Dibuja el banner compacto de reseñas: fotos apiladas (decorativas) +
 * calificación + un solo botón "Ver todas". Reemplaza a la fila de
 * "historias" tipo Instagram, que no se adaptaba bien a pantallas chicas y
 * no quedaba claro qué eran — esto siempre ocupa el mismo alto sin
 * importar cuántas reseñas haya ni el ancho de pantalla.
 */
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

  // Hasta 4 fotos apiladas, con iniciales para quien no mandó foto.
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
/**
 * Dibuja una cuadrícula de tarjetas de producto dentro del contenedor
 * indicado. Se usa tanto para el catálogo general (#contenedor-productos)
 * como para la sección de entrega inmediata (#contenedor-stock-inmediato).
 * Las prendas con entrega inmediata siempre aparecen primero.
 *
 * @param {Array<Object>} productos - Lista de productos a dibujar (ya
 *   filtrada; esta función no vuelve a filtrar nada).
 * @param {string} idContenedor - id del elemento donde se inserta el grid.
 */
/** Normaliza la disponibilidad inmediata nueva y la estructura antigua. */
function obtenerDisponibilidadInmediata(prod) {
  const disponibilidad = prod.prendaInmediata || {};
  const comoLista = valor => {
    if (!valor) return [];
    return Array.isArray(valor) ? valor : [valor];
  };

  return {
    manga: disponibilidad.manga || '',
    parches: disponibilidad.parches || '',
    bordados: disponibilidad.bordados || disponibilidad.bordado || '',
    tallas: comoLista(disponibilidad.tallas || prod.tallasInmediatas),
    dorsales: comoLista(disponibilidad.dorsales || disponibilidad.dorsal || prod.dorsalInmediato)
  };
}

function coincideDisponibilidad(valorOpcion, valorDisponible) {
  if (!valorOpcion || !valorDisponible) return false;

  const normalizar = valor => valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const opcion = normalizar(valorOpcion);
  const disponible = normalizar(valorDisponible);

  if (disponible.startsWith('sin ')) return opcion === disponible;
  return !opcion.startsWith('sin ') && (opcion === disponible || opcion.includes(disponible));
}

function combinacionEsEntregaInmediata(prod, opciones = opcionesSeleccionadas) {
  if (!prod.entregaInmediata) return false;

  const disponibilidad = obtenerDisponibilidadInmediata(prod);
  const dorsalSeleccionado = opciones.nombreNumero || 'Sin dorsal';

  return (disponibilidad.tallas.length === 0 || disponibilidad.tallas.includes(opciones.talla)) &&
    (!disponibilidad.manga || coincideDisponibilidad(opciones.manga, disponibilidad.manga)) &&
    (!disponibilidad.parches || coincideDisponibilidad(opciones.parches, disponibilidad.parches)) &&
    (disponibilidad.dorsales.length === 0 || disponibilidad.dorsales.some(dorsal => coincideDisponibilidad(dorsalSeleccionado, dorsal)));
}

function escaparHTML(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, caracter => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[caracter]));
}

function renderizarDorsalInmediato(prod) {
  if (!prod.entregaInmediata) return '';

  const dorsales = obtenerDisponibilidadInmediata(prod).dorsales;
  if (dorsales.length === 0) return '';

  return `
    <div class="dorsal-stock-card" aria-label="Dorsal disponible para entrega inmediata">
      <span class="dorsal-stock-icon">⚡</span>
      <span class="dorsal-stock-texto">
        <small>Dorsal en stock</small>
        <strong>${dorsales.join(', ')}</strong>
      </span>
    </div>
  `;
}

function renderizarProductos(productos, idContenedor = "contenedor-productos") {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  if (productos.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No se encontraron prendas disponibles en esta sección.</p>`;
    return;
  }

  // Prioridad 1: entrega inmediata, SIEMPRE por prenda individual (no por
  // grupo) — así una versión sin stock nunca "arrastra" hacia arriba, ni
  // esconde, a otra que sí tiene, y el cliente ve de una todas las prendas
  // realmente disponibles ahora mismo.
  // Prioridad 2 (dentro de cada uno de esos dos bloques): las versiones
  // del mismo equipo (campo "grupo" en productos.js) se muestran juntas,
  // sin importar en qué orden se agregaron al archivo.
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
    return 0; // mismo grupo: conservan su orden original entre sí
  });

  contenedor.innerHTML = productosOrdenados.map(prod => {
    const dorsalInmediato = renderizarDorsalInmediato(prod);
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

          ${dorsalInmediato}

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

/**
 * Cambia la foto principal mostrada en una tarjeta de producto del catálogo
 * (no confundir con cambiarImagenVista, que hace lo mismo pero dentro del
 * modal de vista rápida).
 *
 * @param {string} idProducto - id del producto dueño de la miniatura.
 * @param {string} nuevaUrl - ruta de la imagen que se debe mostrar.
 * @param {HTMLElement} elementoMiniatura - la miniatura sobre la que se hizo clic.
 */
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
// Este es el modal combinado que pidió Sebastian: una sola ventana con la
// foto grande y navegable a la izquierda, y el panel de personalización +
// precio + botón de agregar a la derecha (se apilan en celular). Reemplaza
// lo que antes eran dos ventanas separadas (una para ampliar fotos y otra
// para elegir talla/dorsal).

/**
 * Abre el modal de vista rápida para un producto: prepara el estado de la
 * galería de fotos, resetea las opciones elegidas a sus valores por
 * defecto, y dibuja el formulario de personalización (talla, estampado,
 * variantes de manga/parches y bordado conmemorativo si aplican).
 *
 * @param {string|number} idProducto - id del producto a mostrar.
 */
function abrirVistaProducto(idProducto) {
  const prod = PRODUCTOS.find(p => String(p.id) === String(idProducto));
  if (!prod) return;

  productoSeleccionadoTemp = prod;
  vistaImagenesActuales = prod.imagenes || [];
  vistaIndiceActual = 0;

  // Si la prenda está en Entrega Inmediata, se auto-selecciona la talla y
  // el dorsal que realmente hay en stock hoy, en vez de dejar la primera
  // talla del arreglo por defecto — así el cliente ve de una el pedido
  // exacto que se puede despachar ya mismo, sin tener que adivinar cuál
  // combinación es la que está disponible.
  const disponibilidadInmediata = obtenerDisponibilidadInmediata(prod);
  const tallaInmediataDefault = (prod.entregaInmediata && disponibilidadInmediata.tallas.length) ? disponibilidadInmediata.tallas[0] : null;
  const dorsalDisponible = disponibilidadInmediata.dorsales.find(dorsal => !/^sin\b/i.test(dorsal.trim()));
  const dorsalInmediatoValido = prod.entregaInmediata && dorsalDisponible
    ? dorsalDisponible
    : '';
  const mangaInmediataDefault = prod.variantes?.manga?.find(manga =>
    coincideDisponibilidad(manga.tipo, disponibilidadInmediata.manga)
  )?.tipo;
  const parchesInmediatosDefault = prod.variantes?.parches?.find(parches =>
    coincideDisponibilidad(parches.tipo, disponibilidadInmediata.parches)
  )?.tipo;
  const bordadoInmediatoDefault = prod.tieneOpcionBordado && disponibilidadInmediata.bordados && !/^sin\b/i.test(disponibilidadInmediata.bordados)
    ? (prod.textoBordado || disponibilidadInmediata.bordados)
    : 'Sin bordado';

  opcionesSeleccionadas = {
    talla: tallaInmediataDefault || (prod.tallas ? prod.tallas[0] : ''),
    manga: mangaInmediataDefault || (prod.variantes?.manga ? prod.variantes.manga[0].tipo : ''),
    parches: parchesInmediatosDefault || (prod.variantes?.parches ? prod.variantes.parches[0].tipo : ''),
    bordadoConmemorativo: prod.tieneOpcionBordado ? bordadoInmediatoDefault : '',
    nombreNumero: dorsalInmediatoValido
  };

  document.getElementById("modal-opt-titulo").innerText = prod.nombre;
  document.getElementById("vista-opt-nombre").innerText = prod.nombre;

  const badgeInmediato = document.getElementById("vista-badge-inmediato");
  if (badgeInmediato) badgeInmediato.style.display = prod.entregaInmediata ? "block" : "none";

  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();

  // Evaluar si la prenda permite estampado (solo Camisetas)
  const esCamiseta = !prod.tipoPrenda || prod.tipoPrenda.toLowerCase() === 'camisetas';

  const contenedorBody = document.getElementById("modal-opt-body");
  contenedorBody.innerHTML = `
    ${prod.entregaInmediata ? `
      <div class="alerta-stock-modal">
        <span>⚡ <strong>DISPONIBLE PARA ENTREGA INMEDIATA</strong> — ya te dejamos seleccionada la talla y el dorsal que hay en stock.</span>
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
            const esStock = prod.entregaInmediata && disponibilidadInmediata.tallas.includes(t);
            return `
              <button type="button"
                  class="chip-opcion ${t === opcionesSeleccionadas.talla ? 'active' : ''} ${esStock ? 'chip-inmediato' : ''} ${prod.entregaInmediata && !esStock ? 'chip-encargo' : ''}"
                      onclick="cambiarOpcionModal('talla', '${t}', this)">
                ${t} ${esStock ? '⚡ (Entrega Inmediata)' : prod.entregaInmediata ? '📦 (Por encargo)' : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 2. CAMPO DE ESTAMPADO (SÓLO SE MUESTRA EN CAMISETAS) -->
    ${esCamiseta ? `
      <div class="campo-personalizacion-container">
        <label for="input-nombre-numero">🖊️ Nombre y Número de Jugador (Opcional)</label>
        <input type="text"
               id="input-nombre-numero"
               placeholder="Ej: MESSI 10 o Juan 7"
               value="${escaparHTML(opcionesSeleccionadas.nombreNumero)}"
               maxlength="40"
               pattern="[A-Za-zÀ-ÿ0-9 .-]{1,40}"
               ${prod.entregaInmediata && combinacionEsEntregaInmediata(prod) ? 'readonly' : ''}
               oninput="opcionesSeleccionadas.nombreNumero = this.value">
        <small style="color: #64748b; font-size: 0.75rem; display: block; margin-top: 4px;">
          Déjalo en blanco si prefieres la prenda sin estampado.
        </small>
      </div>
    ` : ''}

    <!-- 3. VARIANTES DE MANGA (SI APLICA) -->
    ${prod.variantes?.manga ? `
      <div class="selector-chip-container">
        <label>👕 Tipo de Manga</label>
        <div class="chips-wrapper">
          ${prod.variantes.manga.map((m, idx) => `
            ${(() => {
              const esStock = prod.entregaInmediata && coincideDisponibilidad(m.tipo, disponibilidadInmediata.manga);
              return `
            <button type="button"
                  class="chip-opcion ${m.tipo === opcionesSeleccionadas.manga ? 'active' : ''} ${esStock ? 'chip-inmediato' : ''} ${prod.entregaInmediata && disponibilidadInmediata.manga && !esStock ? 'chip-encargo' : ''}"
                    onclick="cambiarOpcionModal('manga', '${m.tipo}', this)">
                ${m.tipo} ${esStock ? '⚡' : prod.entregaInmediata && disponibilidadInmediata.manga ? '📦' : ''} ${m.adicional > 0 ? `(+$${m.adicional.toLocaleString('es-CO')})` : ''}
            </button>
              `;
            })()}
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 4. VARIANTES DE PARCHES (SI APLICA) -->
    ${prod.variantes?.parches ? `
      <div class="selector-chip-container">
        <label>🛡️ Parches / Escudos</label>
        <div class="chips-wrapper">
          ${prod.variantes.parches.map((p, idx) => `
            ${(() => {
              const esStock = prod.entregaInmediata && coincideDisponibilidad(p.tipo, disponibilidadInmediata.parches);
              return `
            <button type="button"
                  class="chip-opcion ${p.tipo === opcionesSeleccionadas.parches ? 'active' : ''} ${esStock ? 'chip-inmediato' : ''} ${prod.entregaInmediata && disponibilidadInmediata.parches && !esStock ? 'chip-encargo' : ''}"
                    onclick="cambiarOpcionModal('parches', '${p.tipo}', this)">
                ${p.tipo} ${esStock ? '⚡' : prod.entregaInmediata && disponibilidadInmediata.parches ? '📦' : ''} ${p.adicional > 0 ? `(+$${p.adicional.toLocaleString('es-CO')})` : ''}
            </button>
              `;
            })()}
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 5. BORDADO CONMEMORATIVO (SI APLICA) -->
    ${prod.tieneOpcionBordado ? `
      <div class="selector-chip-container">
        <label>🏆 Incluir ${prod.textoBordado || 'Bordado de la Final'} (Sin costo extra)</label>
        <div class="chips-wrapper">
          <button type="button"
              class="chip-opcion ${opcionesSeleccionadas.bordadoConmemorativo === 'Sin bordado' ? 'active' : ''} ${prod.entregaInmediata && disponibilidadInmediata.bordados === 'Sin bordado' ? 'chip-inmediato' : ''}"
                  onclick="cambiarOpcionModal('bordadoConmemorativo', 'Sin bordado', this)">
            Sin bordado ${prod.entregaInmediata && disponibilidadInmediata.bordados === 'Sin bordado' ? '⚡' : ''}
          </button>
          <button type="button"
              class="chip-opcion ${opcionesSeleccionadas.bordadoConmemorativo !== 'Sin bordado' ? 'active' : ''} ${prod.entregaInmediata && disponibilidadInmediata.bordados !== 'Sin bordado' && disponibilidadInmediata.bordados ? 'chip-inmediato' : ''}"
                  onclick="cambiarOpcionModal('bordadoConmemorativo', '${prod.textoBordado || 'Con Bordado de la Final'}', this)">
            Con Bordado Final ⚽ ${prod.entregaInmediata && disponibilidadInmediata.bordados !== 'Sin bordado' && disponibilidadInmediata.bordados ? '⚡' : ''}
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

/** Dibuja la foto actual (según vistaIndiceActual) en el panel izquierdo del modal. */
function renderizarImagenVista() {
  const img = document.getElementById("vista-img-principal");
  if (!img || vistaImagenesActuales.length === 0) return;
  img.src = vistaImagenesActuales[vistaIndiceActual];
  img.alt = productoSeleccionadoTemp ? productoSeleccionadoTemp.nombre : '';
}

/** Dibuja la fila de miniaturas debajo de la foto principal del modal. */
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

/**
 * Dibuja los puntos indicadores de foto que reemplazan a las miniaturas en
 * celular (ver CSS: .vista-galeria-dots solo se muestra en esa pantalla).
 * Cada punto también es clicable para saltar directo a esa foto.
 */
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

/** Salta directamente a una foto específica dentro del modal (clic en miniatura). */
function irAImagenVista(idx) {
  vistaIndiceActual = idx;
  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();
}

/**
 * Avanza o retrocede una foto dentro del modal, dando la vuelta al llegar
 * al final o al principio (por eso el módulo con el total de imágenes).
 * @param {number} delta - usa -1 para "anterior" y 1 para "siguiente".
 */
function cambiarImagenVista(delta) {
  if (vistaImagenesActuales.length === 0) return;
  const totalImagenes = vistaImagenesActuales.length;
  vistaIndiceActual = (vistaIndiceActual + delta + totalImagenes) % totalImagenes;
  renderizarImagenVista();
  renderizarMiniaturasVista();
  renderizarDotsVista();
}

/**
 * Registra la opción elegida (talla, manga, parches o bordado), resalta el
 * botón correspondiente como activo dentro de su mismo grupo, y recalcula
 * el precio mostrado.
 */
function cambiarOpcionModal(tipo, valor, elemento) {
  opcionesSeleccionadas[tipo] = valor;

  const padre = elemento.parentElement;
  if (padre) {
    padre.querySelectorAll('.chip-opcion').forEach(btn => btn.classList.remove('active'));
  }
  elemento.classList.add('active');

  const inputDorsal = document.getElementById('input-nombre-numero');
  if (inputDorsal && productoSeleccionadoTemp?.entregaInmediata) {
    const esInmediata = combinacionEsEntregaInmediata(productoSeleccionadoTemp);
    inputDorsal.readOnly = esInmediata;
    if (esInmediata) {
      const dorsalStock = obtenerDisponibilidadInmediata(productoSeleccionadoTemp).dorsales
        .find(dorsal => !/^sin\b/i.test(dorsal.trim())) || '';
      inputDorsal.value = dorsalStock;
      opcionesSeleccionadas.nombreNumero = dorsalStock;
    }
  }

  actualizarPrecioModal();
}

/**
 * Recalcula el precio final sumando los adicionales de manga y parches (si
 * el cliente eligió alguna variante con costo extra) y lo pinta en los dos
 * lugares donde se muestra el precio dentro del modal.
 */
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

/** Cierra el modal de vista rápida y limpia el estado temporal del producto. */
function cerrarModalOpciones() {
  document.getElementById("modal-opciones-producto").classList.remove("active");
  document.body.style.overflow = "";
  productoSeleccionadoTemp = null;
  vistaImagenesActuales = [];
  limpiarURLProducto();
}

/**
 * Se llama desde el link "Ver guía de tallas" dentro del modal de
 * personalización. El modal tapa toda la página mientras está abierto, así
 * que primero hay que cerrarlo y solo después hacer scroll a la sección
 * (si se hace al tiempo, el navegador no tiene una página visible a la
 * cual moverse).
 */
function verGuiaTallas() {
  cerrarModalOpciones();
  setTimeout(() => {
    document.getElementById("guia-tallas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 250);
}

// ==========================================================================
// BARRAS QUE REACCIONAN AL SCROLL (arriba y abajo)
// ==========================================================================
// 1) Barra superior (botón de secciones + buscador + categorías): se queda
//    SIEMPRE visible y pegada arriba (no se desliza ni desaparece; eso se
//    sentía brusco). En vez de eso, apenas el cliente deja el tope de la
//    página se "compacta": se esconde el botón de Ver secciones/Reseñas y
//    el buscador se hace más chico. La fila de categorías (Todos, Entrega
//    Inmediata, Retro...) no cambia nunca de tamaño ni se oculta, para
//    mantener siempre a mano el filtro más usado.
// 2) Barra flotante de "Total acumulado" (abajo): esta sí se oculta al
//    bajar buscando más prendas y reaparece al subir un poco, o de
//    inmediato al agregar algo al pedido (mostrarBarraCarritoTemporal,
//    llamada desde confirmarAgregarAlCarrito más abajo).

const UMBRAL_NAV_COMPACTA = 60; // px de scroll desde donde la barra superior empieza a poder compactarse
const UMBRAL_SCROLL_NAV = 12; // px mínimos de scroll hacia arriba para volver a expandirla
const PAUSA_TRAS_CAMBIO_NAV = 320; // ms; un poco más que la transición CSS (0.25s)
let ultimoScrollYNav = window.scrollY;
let navCompacta = false;
let navEnPausa = false; // true mientras la barra está animándose, para no reaccionar a scrolls que ella misma provoca

/**
 * Compacta la barra superior al bajar, y la vuelve a expandir con solo
 * subir un poco el scroll (no hace falta llegar hasta el tope de la
 * página) o al llegar cerca del tope, que siempre la muestra completa.
 */
function actualizarNavCompacta() {
  if (navEnPausa) return;

  const nav = document.querySelector(".categorias-nav");
  if (!nav) return;

  const scrollActual = window.scrollY;
  const diferencia = scrollActual - ultimoScrollYNav;
  let cambio = false;

  if (scrollActual < UMBRAL_NAV_COMPACTA) {
    // Cerca del tope de la página siempre se muestra completa.
    if (navCompacta) cambio = true;
    nav.classList.remove("compacta");
    navCompacta = false;
  } else if (diferencia > UMBRAL_SCROLL_NAV && !navCompacta) {
    // Bajando: se compacta para dejar ver más prendas.
    nav.classList.add("compacta");
    navCompacta = true;
    cambio = true;
  } else if (diferencia < -UMBRAL_SCROLL_NAV && navCompacta) {
    // Subiendo, aunque sea un poco: se vuelve a expandir.
    nav.classList.remove("compacta");
    navCompacta = false;
    cambio = true;
  }

  ultimoScrollYNav = scrollActual;

  if (cambio) {
    // Mientras dura la transición ignoramos el scroll, y al terminar
    // resincronizamos la referencia con la posición real ya asentada.
    navEnPausa = true;
    setTimeout(() => {
      navEnPausa = false;
      ultimoScrollYNav = window.scrollY;
    }, PAUSA_TRAS_CAMBIO_NAV);
  }
}

let ultimoScrollYBarraCarrito = window.scrollY;
let barraCarritoOculta = false;
const UMBRAL_SCROLL_BARRA = 12; // px mínimos para reaccionar; evita parpadeos con scrolls muy pequeños

function actualizarVisibilidadBarraCarrito() {
  const barra = document.querySelector(".barra-carrito");
  if (!barra) return;

  const scrollActual = window.scrollY;
  const diferencia = scrollActual - ultimoScrollYBarraCarrito;

  if (scrollActual < 80) {
    // Cerca del tope de la página siempre se muestra.
    barra.classList.remove("barra-carrito-oculta");
    barraCarritoOculta = false;
  } else if (diferencia > UMBRAL_SCROLL_BARRA && !barraCarritoOculta) {
    // Bajando: se oculta para dejar ver más prendas.
    barra.classList.add("barra-carrito-oculta");
    barraCarritoOculta = true;
  } else if (diferencia < -UMBRAL_SCROLL_BARRA && barraCarritoOculta) {
    // Subiendo: se vuelve a mostrar.
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

/**
 * Muestra la barra del carrito de inmediato, aunque el cliente esté en
 * medio de un scroll hacia abajo (por ejemplo, justo después de agregar
 * una prenda al pedido). Si sigue bajando para ver más prendas, la barra
 * se vuelve a ocultar sola con el listener de scroll de arriba.
 */
function mostrarBarraCarritoTemporal() {
  const barra = document.querySelector(".barra-carrito");
  if (!barra) return;
  barra.classList.remove("barra-carrito-oculta");
  barraCarritoOculta = false;
  ultimoScrollYBarraCarrito = window.scrollY;
}

/**
 * Toma las opciones elegidas por el cliente, calcula el precio final y
 * agrega el producto al carrito. Cada línea del carrito recibe un
 * itemUniqueId propio (aunque sea la misma camiseta) para poder eliminarla
 * individualmente sin afectar otras unidades iguales en el pedido.
 */
function confirmarAgregarAlCarrito() {
  if (!productoSeleccionadoTemp) return;

  if (!opcionesSeleccionadas.talla) {
    alert('Selecciona una talla antes de agregar la prenda.');
    return;
  }

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
  const esEntregaInmediata = combinacionEsEntregaInmediata(productoSeleccionadoTemp);

  carrito.push({
    itemUniqueId: Date.now() + Math.random(),
    id: productoSeleccionadoTemp.id,
    nombre: productoSeleccionadoTemp.nombre,
    tipoPrenda: productoSeleccionadoTemp.tipoPrenda,
    precio: precioFinal,
    talla: opcionesSeleccionadas.talla,
    manga: opcionesSeleccionadas.manga,
    parches: opcionesSeleccionadas.parches,
    bordadoConmemorativo: opcionesSeleccionadas.bordadoConmemorativo,
    dorsalPersonalizado: dorsalIngresado,
    entregaInmediata: esEntregaInmediata
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

/**
 * Al usar el botón "atrás" del navegador estando en el link de un producto
 * (?producto=ID), en vez de salir del sitio de una simplemente se cierra el
 * modal — es el comportamiento que la gente espera de un link compartido.
 */
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

  // Si estaba en la vista de reseñas y con "atrás" ya no queda ?vista=resenas
  // en la URL, hay que volver a mostrar el catálogo (sin volver a empujar
  // otra entrada al historial, por eso no se llama volverAlCatalogo()).
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
    // Caso inverso: con "adelante" se vuelve a entrar a la vista de reseñas.
    irAResenas(false);
  }
});

/**
 * Permite pasar de foto en la galería del modal deslizando el dedo hacia
 * la izquierda o la derecha (swipe), pensado sobre todo para celular ahora
 * que ahí la foto ocupa mucho más espacio. Solo reacciona a gestos
 * mayormente horizontales, para no interferir con el scroll vertical de la
 * página cuando alguien desliza en diagonal.
 */
(() => {
  const galeriaPrincipal = document.getElementById("vista-galeria-principal");
  if (!galeriaPrincipal) return;

  const UMBRAL_SWIPE = 40; // px mínimos para contar como deslizar, no un simple toque
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
/**
 * Cambia el tipo de prenda activo (Camisetas, Pantalonetas, Entrenamiento o
 * Cortavientos), resetea la subcategoría a "todos", vuelve a dibujar los
 * botones de categoría (porque cambian según el tipo) y hace scroll al
 * inicio de la página.
 *
 * @param {string} tipo - uno de los tipoPrenda usados en productos.js.
 * @param {HTMLElement} [elemento] - botón sobre el que se hizo clic, si vino
 *   de la barra horizontal (cuando viene del sidebar no se pasa).
 */
/**
 * Filtra el catálogo por tipo de prenda (Camisetas, Pantalonetas,
 * Entrenamiento, Cortavientos). `actualizarUrl` se pone en false solo
 * cuando la propia carga de la página ya trae ese tipo en la URL
 * (?tipo=Pantalonetas) y no hace falta volver a escribirla.
 */
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

/**
 * Cambia la subcategoría activa (los chips "Todos", "Retro", "Actual",
 * "Entrega Inmediata", etc.). Cuando la categoría es 'entrega-inmediata' se
 * muestra la sección destacada de stock en vez del catálogo general.
 *
 * @param {string} categoria - 'todos', 'entrega-inmediata', o el nombre
 *   exacto de una categoría definida en productos.js.
 * @param {HTMLElement} [elemento] - botón sobre el que se hizo clic.
 */
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

/** Se ejecuta con cada tecla escrita en el buscador; delega en ejecutarFiltroCombinado
 * y sube la página SOLO la primera vez que se empieza a escribir (si se
 * hiciera en cada tecla, en celular choca con el navegador tratando de
 * mantener visible el campo por encima del teclado, y la pantalla "brinca"
 * con cada letra). */
function filtrarPorBusqueda() {
  ejecutarFiltroCombinado();

  const input = document.getElementById('input-busqueda');
  const tieneTexto = input && input.value.trim() !== '';

  if (tieneTexto && !yaSubioPorBusqueda) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    yaSubioPorBusqueda = true;
  } else if (!tieneTexto) {
    yaSubioPorBusqueda = false; // se borró la búsqueda: la próxima vez vuelve a subir una vez
  }
}

/**
 * Filtro central del catálogo: combina tipo de prenda + categoría + texto
 * de búsqueda al mismo tiempo y vuelve a dibujar el grid de productos. Se
 * llama después de casi cualquier cambio de filtro para mantener todo
 * sincronizado en una sola función.
 */
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
/** Quita una línea del carrito por su itemUniqueId y refresca los totales visibles. */
function eliminarDelCarrito(itemUniqueId) {
  carrito = carrito.filter(item => item.itemUniqueId !== itemUniqueId);
  actualizarCarrito();
  renderizarModalPedido();
}

/**
 * Recalcula el total del carrito y actualiza todos los lugares donde se
 * muestra: la barra flotante inferior, el modal de pedido y el contador de
 * unidades. También activa la animación "con-items" del botón de pedido
 * cuando hay al menos un producto agregado.
 */
function actualizarCarrito() {
  actualizarBannerPedido(); // calcula costoEnvioAplicado y dibuja el banner correspondiente, antes de sumar el total

  total = carrito.reduce((sum, item) => sum + item.precio, 0) + costoEnvioAplicado;

  const totalPrecio = document.getElementById("total-precio");
  const modalTotalPrecio = document.getElementById("modal-total-precio");
  const contadorCant = document.getElementById("contador-cant");
  const btnRealizarPedido = document.querySelector(".btn-realizar-pedido");

  if (totalPrecio) totalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (modalTotalPrecio) modalTotalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (contadorCant) contadorCant.innerText = carrito.length;
  if (btnRealizarPedido) btnRealizarPedido.classList.toggle("con-items", carrito.length > 0);
}

/**
 * Decide y dibuja qué pasa con el envío según lo que hay en el carrito:
 * - Si hay alguna prenda de Entrega Inmediata: esas se entregan por
 *   domiciliario en Medellín, pagado contraentrega (su valor varía según
 *   la zona) — nunca se suma un monto fijo al total por esto.
 * - Si NO hay ninguna de Entrega Inmediata (todo es "por encargo") y el
 *   pedido tiene menos de CONFIG.minimoPrendasSinEnvio prendas: se
 *   suma CONFIG.costoEnvio al total, y además se muestra el selector de
 *   "Forma de pedido" (100% anticipado o 50% de anticipo).
 * - Si hay 3 o más prendas y nada de Entrega Inmediata: envío nacional
 *   incluido, sin costo adicional, pero el selector de forma de pedido
 *   sigue apareciendo (sigue siendo un pedido por encargo).
 */
function actualizarBannerPedido() {
  const banner = document.getElementById("banner-envio-pedido");
  const selectorForma = document.getElementById("selector-forma-encargo");
  if (!banner) return; // el modal de pedido no está en esta página

  if (carrito.length === 0) {
    banner.innerHTML = '';
    costoEnvioAplicado = 0;
    datosEnvio = null;
    formaEncargoSeleccionada = '';
    document.querySelectorAll('input[name="forma-encargo"]').forEach(input => {
      input.checked = false;
    });
    if (selectorForma) selectorForma.style.display = 'none';
    return;
  }

  const hayEntregaInmediata = carrito.some(item => item.entregaInmediata);
  const hayPorEncargo = carrito.some(item => !item.entregaInmediata);
  const cantidadPrendas = carrito.length;

  if (hayEntregaInmediata) {
    costoEnvioAplicado = 0;
    banner.innerHTML = `
      <p class="banner-envio-texto">🛵 <strong>Pago contraentrega en Medellín:</strong> el valor del domicilio depende de la zona (solo aplica dentro de Medellín).</p>
    `;
  } else if (cantidadPrendas < CONFIG.minimoPrendasSinEnvio) {
    costoEnvioAplicado = CONFIG.costoEnvio;
    banner.innerHTML = `
      <p class="banner-envio-texto">🚚 <strong>Envío nacional:</strong> se incluyen $${CONFIG.costoEnvio.toLocaleString('es-CO')} COP en el total (pedidos de ${CONFIG.minimoPrendasSinEnvio} o más prendas no pagan envío).</p>
    `;
  } else {
    costoEnvioAplicado = 0;
    banner.innerHTML = `
      <p class="banner-envio-texto">🚚 <strong>Envío nacional incluido</strong> — tu pedido ya califica por tener ${CONFIG.minimoPrendasSinEnvio} o más prendas.</p>
    `;
  }

  if (selectorForma) selectorForma.style.display = hayPorEncargo ? 'block' : 'none';
  if (!hayPorEncargo) formaEncargoSeleccionada = ''; // ya no aplica; evita que quede una selección vieja pegada
}

function seleccionarFormaEncargo(valor) {
  formaEncargoSeleccionada = valor;
  if (valor === '100') abrirModalDatosEnvio();
}

function abrirModalDatosEnvio() {
  const formulario = document.getElementById('form-datos-envio');
  if (formulario && datosEnvio) {
    Object.entries(datosEnvio).forEach(([campo, valor]) => {
      const input = formulario.elements[campo];
      if (input) input.value = valor;
    });
  }

  document.getElementById('modal-datos-envio')?.classList.add('active');
}

function cerrarModalDatosEnvio() {
  document.getElementById('modal-datos-envio')?.classList.remove('active');
}

function guardarDatosEnvio() {
  const formulario = document.getElementById('form-datos-envio');
  if (!formulario || !formulario.reportValidity()) return;

  datosEnvio = Object.fromEntries(new FormData(formulario).entries());
  cerrarModalDatosEnvio();
  mostrarToast('Datos de envío guardados');
}

/** Abre el modal que resume el pedido actual (carrito) y bloquea el scroll de fondo. */
function abrirModalPedido() {
  renderizarModalPedido();
  document.body.style.overflow = "hidden";
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.add("active");
}

/** Cierra el modal de resumen de pedido y restaura el scroll de la página. */
function cerrarModalPedido() {
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Dibuja la lista detallada de productos dentro del modal de pedido, con
 * todas las opciones elegidas (talla, dorsal, manga, parches, bordado) y un
 * botón para quitar cada línea individualmente.
 */
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
    if (item.dorsalPersonalizado) opcionesElegidas.push(`Dorsal: ${escaparHTML(item.dorsalPersonalizado)}`);
    if (item.manga) opcionesElegidas.push(item.manga);
    if (item.parches && item.parches !== "Sin parches") opcionesElegidas.push(item.parches);
    if (item.bordadoConmemorativo && item.bordadoConmemorativo !== "Sin bordado") {
      opcionesElegidas.push(item.bordadoConmemorativo);
    }

    return `
    <div class="item-pedido-row">
      <div class="item-pedido-info">
        <h4>${escaparHTML(item.nombre)} ${item.entregaInmediata ? '<span class="etiqueta-entrega-inmediata">(⚡ Entrega Inmediata)</span>' : ''}</h4>
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

/**
 * Construye el mensaje final con todos los productos del carrito y abre
 * WhatsApp con ese texto ya escrito, listo para enviar al número de
 * CONFIG.whatsapp. También dispara el evento "Lead" de Meta Pixel para
 * medir conversiones si en algún momento hay campañas activas.
 */
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Por favor agrega al menos un producto a tu pedido.");
    return;
  }

  const hayPorEncargo = carrito.some(item => !item.entregaInmediata);
  if (hayPorEncargo && !formaEncargoSeleccionada) {
    alert("Tu pedido incluye prendas por encargo: por favor elige una forma de pedido (100% anticipado o 50% de anticipo) antes de continuar.");
    return;
  }

  if (hayPorEncargo && formaEncargoSeleccionada === '100' && !datosEnvio) {
    alert("Para el pago total anticipado necesitamos los datos de envío.");
    abrirModalDatosEnvio();
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

  const hayEntregaInmediata = carrito.some(item => item.entregaInmediata);
  if (hayEntregaInmediata) {
    mensaje += `\n🛵 Pago contraentrega en Medellín (el domicilio varía según la zona).`;
  } else if (costoEnvioAplicado > 0) {
    mensaje += `\n🚚 Envío nacional incluido: $${costoEnvioAplicado.toLocaleString('es-CO')} COP`;
  } else if (hayPorEncargo) {
    mensaje += `\n🚚 Envío nacional incluido (pedido de ${CONFIG.minimoPrendasSinEnvio} o más prendas).`;
  }

  if (hayPorEncargo) {
    const textoForma = formaEncargoSeleccionada === '50'
      ? 'Anticipo del 50%: al llegar a Medellín enviamos foto, confirmamos quién recibe y se paga el saldo más el domicilio contraentrega.'
      : 'Pago total anticipado: envío gestionado con transportadora hasta la dirección indicada.';
    mensaje += `\n📋 Forma de pedido: ${textoForma}`;

    if (formaEncargoSeleccionada === '100') {
      mensaje += `\n\n📍 *Datos de envío:*
País: ${datosEnvio.pais}
Departamento: ${datosEnvio.departamento}
Ciudad: ${datosEnvio.ciudad}
Dirección: ${datosEnvio.direccion}
Teléfono: ${datosEnvio.telefono}
Nombre y apellido: ${datosEnvio.nombre}`;
    }
  }


  mensaje += `\n\n💵 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n\n`;
  mensaje += "📌 Quedo atento para confirmar disponibilidad de stock y datos de envío.";

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}

// ==========================================================================
// 10. VISOR DE FOTOS DE RESEÑAS
// ==========================================================================
// Visor simple (una sola imagen a la vez, sin opciones de compra) para
// ampliar las fotos que los clientes comparten junto a su reseña. Separado
// a propósito del modal de vista rápida de producto: aquí no hay nada que
// personalizar ni agregar al carrito, solo mostrar la foto en grande.

/**
 * Abre el visor de fotos con la imagen de una reseña específica.
 * @param {number} indiceTestimonio - posición del testimonio dentro de TESTIMONIOS.
 * @param {number} indiceImagen - posición de la foto dentro de ese testimonio.
 */
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

/** Cierra el visor de fotos de reseñas y restaura el scroll de la página. */
function cerrarVisorFoto() {
  document.getElementById("modal-foto-resena").classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 11. PREGUNTAS FRECUENTES (FAQ)
// ==========================================================================
// Contenido de las preguntas frecuentes. Edítalo libremente aquí: cada
// objeto es una pregunta con su respuesta; el orden en que las escribas es
// el orden en que aparecen en la página.
const FAQS = [
  {
    pregunta: "¿Cómo sé qué talla pedir?",
    respuesta: "La guía de tallas se encuentra más abajo en esta página. Si aún tienes alguna duda, escríbenos usando el botón de WhatsApp y te ayudaremos a elegir la talla adecuada."
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

/**
 * Dibuja el acordeón de preguntas frecuentes a partir del arreglo FAQS de
 * arriba. Cada pregunta empieza cerrada; un clic la abre y cierra sin
 * afectar a las demás (pueden quedar varias abiertas al tiempo).
 */
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

/** Abre o cierra una pregunta del acordeón de FAQ según su índice. */
function toggleFAQ(idx) {
  const item = document.getElementById(`faq-item-${idx}`);
  if (item) item.classList.toggle("active");
}

// ==========================================================================
// 12. SIDEBAR
// ==========================================================================
/**
 * Abre o cierra el menú lateral de secciones. Cuando se llama desde el
 * clic en el fondo oscuro (overlay), solo cierra si el clic fue exactamente
 * sobre el fondo y no sobre el panel interno (por eso la comprobación de
 * e.target !== e.currentTarget).
 */
function toggleSidebar(e) {
  if (e && e.target !== e.currentTarget) return;
  const sidebar = document.getElementById("sidebar-secciones");
  if (sidebar) sidebar.classList.toggle("active");
}