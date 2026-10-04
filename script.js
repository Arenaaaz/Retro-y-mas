// ==========================================================================
// SCRIPT PRINCIPAL DE LA TIENDA
// ==========================================================================

// 1. CONFIGURACIÓN DEL NEGOCIO
const CONFIG = {
  nombreTienda: "Retro y más",
  whatsapp: "573013276930",
  moneda: "COP",
  redesSociales: {
    instagram: "https://www.instagram.com/retroymas_/"
  },
  costoEnvio: 15000,
  minimoPrendasSinEnvio: 3
};

// 1B. ENLACES COMPARTIBLES Y TÍTULOS POR SECCIÓN
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

function actualizarMetaPagina(titulo, descripcion) {
  document.title = titulo || TITULO_BASE;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', descripcion || DESCRIPCION_BASE);
}

function actualizarURLTipo(tipo) {
  const url = new URL(window.location.href);
  url.searchParams.set('tipo', tipo);
  url.searchParams.delete('producto');
  history.pushState({ tipo }, '', url);
  const info = INFO_TIPO_PRENDA[tipo];
  actualizarMetaPagina(info?.titulo, info?.descripcion);
}

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

function limpiarURLProducto() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('producto')) return;
  url.searchParams.delete('producto');
  history.replaceState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
}

// 1C. VISTA DE RESEÑAS COMO "PÁGINA" APARTE
const INFO_VISTA_RESENAS = {
  titulo: `Reseñas de clientes | ${CONFIG.nombreTienda}`,
  descripcion: 'Lo que dicen nuestros clientes sobre las camisetas retro de fútbol de Retro y más.'
};

function irAResenas(actualizarUrl = true) {
  limpiarHashOfertaEspecial();
  document.body.classList.add("vista-resenas-activa");
  document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
  document.getElementById("seccion-oferta-especial")?.style.setProperty("display", "none");
  document.getElementById("seccion-catalogo-general")?.style.setProperty("display", "none");
  document.querySelector(".banner-encargo")?.style.setProperty("display", "none");
  document.querySelector(".seccion-confianza")?.style.setProperty("display", "none");
  document.querySelector(".seccion-faq")?.style.setProperty("display", "none");
  document.getElementById("guia-tallas")?.style.setProperty("display", "none");
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
  document.body.classList.remove("vista-resenas-activa");
  document.getElementById("seccion-testimonios")?.style.setProperty("display", "none");
  document.querySelector(".banner-encargo")?.style.setProperty("display", "block");
  document.querySelector(".seccion-confianza")?.style.setProperty("display", "block");
  document.querySelector(".seccion-faq")?.style.setProperty("display", "block");
  document.getElementById("guia-tallas")?.style.setProperty("display", "block");

  const url = new URL(window.location.href);
  url.searchParams.delete('vista');
  history.pushState(null, '', url);
  actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (categoriaActual === 'entrega-inmediata') {
    filtrarCategoria('entrega-inmediata');
  } else if (categoriaActual === 'oferta-especial') {
    filtrarCategoria('oferta-especial');
  } else {
    document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
    document.getElementById("seccion-oferta-especial")?.style.setProperty("display", "none");
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
    } catch (err) {}
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

// 2. VARIABLES GLOBALES
let carrito = [];
let total = 0;
let costoEnvioAplicado = 0;
let formaEncargoSeleccionada = '';
let datosEnvio = null;
let tipoPrendaActual = 'Camisetas';
let categoriaActual = 'todos';

let productoSeleccionadoTemp = null;
let opcionesSeleccionadas = { talla: '', manga: '', parches: '', nombreNumero: '' };

let vistaImagenesActuales = [];
let vistaIndiceActual = 0;

// 3. INICIALIZACIÓN
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
  } else if (window.location.hash === "#oferta-especial") {
    irAOfertaEspecial();
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

// 4. RENDERIZADO DE CATEGORÍAS
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
    <button class="btn-categoria btn-oferta-limitada" onclick="irAOfertaEspecial(this)">🔥 Ofertas Especiales</button>
    <button class="btn-categoria btn-inmediato" onclick="filtrarCategoria('entrega-inmediata', this)">⚡ Entrega Inmediata</button>
    ${categoriasUnicas.map(cat => `
      <button class="btn-categoria" onclick="filtrarCategoria('${cat}', this)">
        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    `).join('')}
  `;
}

// 5. RENDERIZADO DE TESTIMONIOS
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

// 6. RENDERIZADO DE PRODUCTOS
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

function obtenerRecargoDorsalPromocional(prod, dorsal) {
  const esCamisetaEnPromocion = prod.ofertaEspecial === true &&
    (!prod.tipoPrenda || prod.tipoPrenda.toLowerCase() === 'camisetas');
  return esCamisetaEnPromocion && dorsal.trim() ? 10000 : 0;
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

function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) imgPrincipal.src = nuevaUrl;

  if (elementoMiniatura && elementoMiniatura.parentElement) {
    elementoMiniatura.parentElement.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
    elementoMiniatura.classList.add('active');
  }
}

// 7. MODAL DE VISTA RÁPIDA DE PRODUCTO
function abrirVistaProducto(idProducto, actualizarUrl = true) {
  const prod = PRODUCTOS.find(p => String(p.id) === String(idProducto));
  if (!prod) return;

  productoSeleccionadoTemp = prod;
  vistaImagenesActuales = prod.imagenes || [];
  vistaIndiceActual = 0;

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
               oninput="opcionesSeleccionadas.nombreNumero = this.value; actualizarPrecioModal()">
        <small style="color: #64748b; font-size: 0.75rem; display: block; margin-top: 4px;">
          Déjalo en blanco si prefieres la prenda sin estampado.
        </small>
      </div>
    ` : ''}

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

    ${prod.tieneOpcionBordado ? `
      <div class="selector-chip-container">
        <label>🏆 Incluir ${prod.textoBordado || 'Bordado de la Final'} (Sin costo extra)</label>
        <div class="chips-wrapper">
          <button type="button"
              class="chip-opcion ${opcionesSeleccionadas.bordadoConmemorativo === 'Sin bordado' ? 'active' : ''}${prod.entregaInmediata && disponibilidadInmediata.bordados === 'Sin bordado' ? 'chip-inmediato' : ''}"
                  onclick="cambiarOpcionModal('bordadoConmemorativo', 'Sin bordado', this)">
            Sin bordado ${prod.entregaInmediata && disponibilidadInmediata.bordados === 'Sin bordado' ? '⚡' : ''}
          </button>
          <button type="button"
              class="chip-opcion ${opcionesSeleccionadas.bordadoConmemorativo !== 'Sin bordado' ? 'active' : ''}${prod.entregaInmediata && disponibilidadInmediata.bordados !== 'Sin bordado' && disponibilidadInmediata.bordados ? 'chip-inmediato' : ''}"
                  onclick="cambiarOpcionModal('bordadoConmemorativo', '${prod.textoBordado || 'Con Bordado de la Final'}', this)">
            Con Bordado Final ⚽ ${prod.entregaInmediata && disponibilidadInmediata.bordados !== 'Sin bordado' && disponibilidadInmediata.bordados ? '⚡' : ''}
          </button>
        </div>
      </div>
    ` : ''}
  `;

  const restablecerScrollVista = () => {
    const layout = document.querySelector('.vista-producto-layout');
    const opciones = document.querySelector('.vista-opciones');
    if (layout) layout.scrollTop = 0;
    if (opciones) opciones.scrollTop = 0;
  };
  restablecerScrollVista();
  requestAnimationFrame(restablecerScrollVista);

  actualizarPrecioModal();

  const btnConfirmar = document.getElementById("btn-confirmar-opciones");
  if (btnConfirmar) {
    btnConfirmar.onclick = () => {
      confirmarAgregarAlCarrito();
    };
  }

  document.body.style.overflow = "hidden";
  document.getElementById("modal-opciones-producto").classList.add("active");
  if (actualizarUrl) actualizarURLProducto(prod);
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

  const dorsal = document.getElementById("input-nombre-numero")?.value.trim() || opcionesSeleccionadas.nombreNumero;
  precioCalculado += obtenerRecargoDorsalPromocional(productoSeleccionadoTemp, dorsal);

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

// BARRAS QUE REACCIONAN AL SCROLL
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
  precioFinal += obtenerRecargoDorsalPromocional(productoSeleccionadoTemp, dorsalIngresado);
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
    ofertaEspecial: productoSeleccionadoTemp.ofertaEspecial === true,
    entregaInmediata: esEntregaInmediata
  });

  actualizarCarrito();
  cerrarModalOpciones();
  mostrarBarraCarritoTemporal();
}

document.addEventListener("keydown", (e) => {
  const modalVista = document.getElementById("modal-opciones-producto");
  const modalPedido = document.getElementById("modal-pedido");
  const modalDatos = document.getElementById("modal-datos-envio");
  const modalFoto = document.getElementById("modal-foto-resena");

  if (e.key === "Escape") {
    if (modalDatos?.classList.contains("active")) cerrarModalDatosEnvio();
    else if (modalPedido?.classList.contains("active")) cerrarModalPedido();
    else if (modalFoto?.classList.contains("active")) cerrarVisorFoto();
    else if (modalVista?.classList.contains("active")) cerrarModalOpciones();
    return;
  }

  if (!modalVista?.classList.contains("active")) return;
  if (e.key === "ArrowLeft") cambiarImagenVista(-1);
  if (e.key === "ArrowRight") cambiarImagenVista(1);
});

window.addEventListener("popstate", () => {
  const modalVista = document.getElementById("modal-opciones-producto");
  const parametrosURL = new URL(window.location.href).searchParams;
  const idProductoURL = parametrosURL.get('producto');
  const productoActualURL = productoSeleccionadoTemp ? String(productoSeleccionadoTemp.id) : '';
  const tieneProductoEnURL = Boolean(idProductoURL);
  if (modalVista?.classList.contains("active") && idProductoURL && idProductoURL !== productoActualURL) {
    abrirVistaProducto(idProductoURL, false);
  } else if (modalVista?.classList.contains("active") && !tieneProductoEnURL) {
    document.getElementById("modal-opciones-producto").classList.remove("active");
    document.body.style.overflow = "";
    productoSeleccionadoTemp = null;
    vistaImagenesActuales = [];
    actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);
  }

  const tipoURL = parametrosURL.get('tipo');
  if (tipoURL && INFO_TIPO_PRENDA[tipoURL] && tipoURL !== tipoPrendaActual) {
    filtrarTipoPrenda(tipoURL, null, false);
  }

  const estaEnVistaResenas = document.getElementById("seccion-testimonios")?.style.display === "block";
  const tieneVistaResenasEnURL = new URL(window.location.href).searchParams.get('vista') === 'resenas';
  if (estaEnVistaResenas && !tieneVistaResenasEnURL) {
    document.body.classList.remove("vista-resenas-activa");
    document.getElementById("seccion-testimonios").style.display = "none";
    document.querySelector(".banner-encargo")?.style.setProperty("display", "block");
    document.querySelector(".seccion-confianza")?.style.setProperty("display", "block");
    document.querySelector(".seccion-faq")?.style.setProperty("display", "block");
    document.getElementById("guia-tallas")?.style.setProperty("display", "block");
    actualizarMetaPagina(TITULO_BASE, DESCRIPCION_BASE);

    if (categoriaActual === 'entrega-inmediata') {
      filtrarCategoria('entrega-inmediata');
    } else if (categoriaActual === 'oferta-especial') {
      filtrarCategoria('oferta-especial');
    } else {
      document.getElementById("seccion-entrega-inmediata")?.style.setProperty("display", "none");
      document.getElementById("seccion-oferta-especial")?.style.setProperty("display", "none");
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

// 8. FILTROS Y BÚSQUEDA
function filtrarTipoPrenda(tipo, elemento, actualizarUrl = true) {
  limpiarHashOfertaEspecial();
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
  const seccionOferta = document.getElementById("seccion-oferta-especial");
  const seccionCatalogo = document.getElementById("seccion-catalogo-general");
  if (seccionInmediata) seccionInmediata.style.display = "none";
  if (seccionOferta) seccionOferta.style.display = "none";
  if (seccionCatalogo) seccionCatalogo.style.display = "block";

  ejecutarFiltroCombinado();

  if (actualizarUrl) actualizarURLTipo(tipo);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irAOfertaEspecial(elemento = null) {
  if (window.location.hash !== '#oferta-especial') {
    const url = new URL(window.location.href);
    url.hash = 'oferta-especial';
    history.pushState({ categoria: 'oferta-especial' }, '', url);
  }

  filtrarCategoria('oferta-especial', elemento, false);
  document.getElementById('seccion-oferta-especial')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#oferta-especial') {
    irAOfertaEspecial();
  } else if (categoriaActual === 'oferta-especial') {
    filtrarCategoria('todos', null, false);
  }
});

function limpiarHashOfertaEspecial() {
  if (window.location.hash !== '#oferta-especial') return;

  const url = new URL(window.location.href);
  url.hash = '';
  history.replaceState(history.state, '', url);
}

function filtrarCategoria(categoria, elemento, desplazarAlInicio = true) {
  if (categoria !== 'oferta-especial') {
    limpiarHashOfertaEspecial();
  }

  categoriaActual = categoria;
  const bannerOferta = document.getElementById('banner-combo-oferta');
  if (bannerOferta) bannerOferta.style.display = categoria === 'oferta-especial' ? 'none' : '';
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
  const seccionOferta = document.getElementById("seccion-oferta-especial");
  const seccionCatalogo = document.getElementById("seccion-catalogo-general");

  if (categoria === 'oferta-especial') {
    if (seccionInmediata) seccionInmediata.style.display = "none";
    if (seccionOferta) seccionOferta.style.display = "block";
    if (seccionCatalogo) seccionCatalogo.style.display = "none";

    const productosOferta = PRODUCTOS.filter(p => {
      const tipo = p.tipoPrenda || 'Camisetas';
      const coincideTipo = (tipoPrendaActual === 'todos') || (tipo.toLowerCase() === tipoPrendaActual.toLowerCase());
      return p.ofertaEspecial === true && coincideTipo;
    });
    renderizarProductos(productosOferta, "contenedor-oferta-especial");
  } else if (categoria === 'entrega-inmediata') {
    const tituloStock = document.getElementById("titulo-stock-dinamico");
    if (tituloStock) {
      const nombreSeccion = tipoPrendaActual === 'todos' ? 'Prendas' : tipoPrendaActual;
      tituloStock.innerText = `${nombreSeccion} para Entrega Inmediata`;
    }

    if (seccionInmediata) seccionInmediata.style.display = "block";
    if (seccionOferta) seccionOferta.style.display = "none";
    if (seccionCatalogo) seccionCatalogo.style.display = "none";

    const productosStock = PRODUCTOS.filter(p => {
      const tipo = p.tipoPrenda || 'Camisetas';
      const coincideTipo = (tipoPrendaActual === 'todos') || (tipo.toLowerCase() === tipoPrendaActual.toLowerCase());
      return p.entregaInmediata === true && coincideTipo;
    });
    renderizarProductos(productosStock, "contenedor-stock-inmediato");
  } else {
    if (seccionInmediata) seccionInmediata.style.display = "none";
    if (seccionOferta) seccionOferta.style.display = "none";
    if (seccionCatalogo) seccionCatalogo.style.display = "block";

    ejecutarFiltroCombinado();
  }

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  if (desplazarAlInicio) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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

// 9. CARRITO Y ENVÍO POR WHATSAPP
function eliminarDelCarrito(itemUniqueId) {
  carrito = carrito.filter(item => item.itemUniqueId !== itemUniqueId);
  actualizarCarrito();
  renderizarModalPedido();
}

function calcularDescuentoPromocion() {
  const camisetasEnOferta = carrito.filter(item =>
    item.ofertaEspecial === true &&
    (!item.tipoPrenda || item.tipoPrenda.toLowerCase() === 'camisetas')
  );
  let descuento = 0;

  for (let indice = 0; indice + 2 < camisetasEnOferta.length; indice += 3) {
    const combo = camisetasEnOferta.slice(indice, indice + 3);
    const precioRegular = combo.reduce((suma, item) => suma + item.precio, 0);
    const camisetasConDorsal = combo.filter(item => item.dorsalPersonalizado).length;
    const precioPromocional = 200000 + camisetasConDorsal * 10000;
    descuento += Math.max(0, precioRegular - precioPromocional);
  }

  return { cantidad: camisetasEnOferta.length, descuento };
}

function actualizarCarrito() {
  actualizarBannerPedido();

  const promocion = calcularDescuentoPromocion();
  const totalAnterior = carrito.reduce((sum, item) => sum + item.precio, 0) + costoEnvioAplicado;
  total = totalAnterior - promocion.descuento;

  const totalPrecio = document.getElementById("total-precio");
  const totalPrecioOriginal = document.getElementById("total-precio-original");
  const modalTotalPrecio = document.getElementById("modal-total-precio");
  const modalTotalOriginal = document.getElementById("modal-total-original");
  const contadorCant = document.getElementById("contador-cant");
  const btnRealizarPedido = document.querySelector(".btn-realizar-pedido");

  if (totalPrecio) totalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (totalPrecioOriginal) {
    totalPrecioOriginal.innerText = `$ ${totalAnterior.toLocaleString('es-CO')} COP`;
    totalPrecioOriginal.hidden = promocion.descuento <= 0;
  }
  if (modalTotalPrecio) modalTotalPrecio.innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  if (modalTotalOriginal) {
    modalTotalOriginal.innerText = `$ ${totalAnterior.toLocaleString('es-CO')} COP`;
    modalTotalOriginal.hidden = promocion.descuento <= 0;
  }
  if (contadorCant) contadorCant.innerText = carrito.length;
  if (btnRealizarPedido) btnRealizarPedido.classList.toggle("con-items", carrito.length > 0);
}

function actualizarBannerPedido() {
  const banner = document.getElementById("banner-envio-pedido");
  const bannerCombo = document.getElementById("banner-combo-promo");
  const selectorForma = document.getElementById("selector-forma-encargo");
  const promocion = calcularDescuentoPromocion();

  if (bannerCombo) {
    if (promocion.cantidad >= 3) {
      const combosAplicados = Math.floor(promocion.cantidad / 3);
      const camisetasRestantes = promocion.cantidad % 3;
      bannerCombo.innerHTML = `
        <p class="banner-combo-promo-texto">🔥 <strong>Combo aplicado:</strong> ${combosAplicados} grupo${combosAplicados === 1 ? '' : 's'} de 3 camisetas actuales${promocion.descuento > 0 ? ` — ahorras $${promocion.descuento.toLocaleString('es-CO')} COP + $15.000 COP de costos de importación` : '. Costos de importación incluidos'}.${camisetasRestantes ? ` ${camisetasRestantes} camiseta${camisetasRestantes === 1 ? '' : 's'} más para otro combo.` : ''}
        </p>
      `;
    } else if (promocion.cantidad > 0) {
      const faltantes = 3 - promocion.cantidad;
      bannerCombo.innerHTML = `
        <p class="banner-combo-promo-texto">🔥 Agrega ${faltantes} camiseta${faltantes === 1 ? '' : 's'} actual${faltantes === 1 ? '' : 'es'} más para activar el combo promocional.</p>
      `;
    } else {
      bannerCombo.innerHTML = '';
    }
  }

  if (!banner) return;

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
      <p class="banner-envio-texto">🚚 <strong>Envío nacional:</strong> se incluyen $${CONFIG.costoEnvio.toLocaleString('es-CO')} COP en el total.</p>
    `;
  } else {
    costoEnvioAplicado = 0;
    banner.innerHTML = `
      <p class="banner-envio-texto">📦 <strong>Costos de importación incluidos</strong> — tu pedido ya califica por tener ${CONFIG.minimoPrendasSinEnvio} o más prendas.</p>
    `;
  }

  if (selectorForma) selectorForma.style.display = hayPorEncargo ? 'block' : 'none';
  if (!hayPorEncargo) formaEncargoSeleccionada = '';
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

  const promocion = calcularDescuentoPromocion();
  if (promocion.descuento > 0) {
    mensaje += `\n🔥 Descuento combo camisetas actuales: -$${promocion.descuento.toLocaleString('es-CO')} COP`;
  }

  const hayEntregaInmediata = carrito.some(item => item.entregaInmediata);
  if (hayEntregaInmediata) {
    mensaje += `\n🛵 Pago contraentrega en Medellín (el domicilio varía según la zona).`;
  } else if (costoEnvioAplicado > 0) {
    mensaje += `\n🚚 Envío nacional incluido: $${costoEnvioAplicado.toLocaleString('es-CO')} COP`;
  } else if (hayPorEncargo) {
    mensaje += `\n📦 Costos de importación incluidos (pedido de ${CONFIG.minimoPrendasSinEnvio} o más prendas).`;
  }

  if (hayPorEncargo) {
    const textoForma = formaEncargoSeleccionada === '50'
      ? 'Anticipo del 50%: al llegar a Medellín enviamos foto, confirmamos quién recibe y se paga el saldo más el costo del domicilio (no incluido) contraentrega.'
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

// 10. VISOR DE FOTOS DE RESEÑAS
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

// 11. PREGUNTAS FRECUENTES (FAQ)
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

function renderizarFAQ() {
  const contenedor = document.getElementById("contenedor-faq");
  if (!contenedor) return;

  contenedor.innerHTML = FAQS.map((item, idx) => `
    <div class="faq-item" id="faq-item-${idx}">
      <button class="faq-pregunta" aria-expanded="false" aria-controls="faq-respuesta-${idx}" onclick="toggleFAQ(${idx})">
        <span>${item.pregunta}</span>
        <span class="faq-icono">+</span>
      </button>
      <div class="faq-respuesta" id="faq-respuesta-${idx}" role="region">
        <p>${item.respuesta}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(idx) {
  const item = document.getElementById(`faq-item-${idx}`);
  if (!item) return;
  const abierto = item.classList.toggle("active");
  item.querySelector(".faq-pregunta")?.setAttribute("aria-expanded", String(abierto));
}

// 12. SIDEBAR
function toggleSidebar(e) {
  if (e && e.target !== e.currentTarget) return;
  const sidebar = document.getElementById("sidebar-secciones");
  if (sidebar) sidebar.classList.toggle("active");
}