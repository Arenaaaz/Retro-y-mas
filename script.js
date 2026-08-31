// CONFIGURACIÓN DEL NEGOCIO
const CONFIG = {
  nombreTienda: "Retro y más",
  whatsapp: "573013276930",
  moneda: "COP"
};

// --------------------------------- AQUI VA EL CATALOGO --------------------------------- 
const PRODUCTOS = [
  {
    id: 1,
    nombre: "AC Milan 06/07",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro AC Milan versión local temporada 2006/2007.",
    // Pasamos un arreglo de imágenes en lugar de una sola
    imagenes: [
      "img/AcMilan06.jpeg",
      "img/AcMilan06-1.jpeg",
      "img/AcMilan06-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    nombre: "Argentina 2006 Local",
    categoria: "Retro",
    precio: 130000,
    descripcion: "Camiseta retro Argentina versión local temporada 2006.",
    imagenes: [
      "img/Argentina06.jpg",
      "img/Argentina06-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    nombre: "Brasil 2002 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión local temporada 2002.",
    imagenes: [
      "img/Brasil02.jpeg",
      "img/Brasil02-1.jpeg",
      "img/Brasil02-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    nombre: "Manchester United 2007/08 Champions League",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Manchester United versión Champions League de local temporada 2007/2008.",
    imagenes: [
      "img/United07.jpeg",
      "img/United07-1.jpeg",
      "img/United07-2.jpeg",
      "img/United07-3.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    nombre: "Ac Milan 23/24 Edicion Beige",
    categoria: "Retro",
    precio: 110000,
    descripcion: "Camiseta retro Ac Milan edición especial beige temporada 2023/2024.",
    imagenes: [
      "img/AcMilan23-Blanco.jpg",
      "img/AcMilan23-Blanco-1.jpg",
      "img/AcMilan23-Blanco-2.jpg",
      "img/AcMilan23-Blanco-3.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
    {
    id: 6,
    nombre: "Ac Milan 23/24 Edicion Oscura",
    categoria: "Retro",
    precio: 110000,
    descripcion: "Camiseta retro Ac Milan edición especial oscura temporada 2023/2024.",
    imagenes: [
      "img/AcMilan23-Negra.jpg",
      "img/AcMilan23-Negra-1.jpg",
      "img/AcMilan23-Negra-2.jpg",
      "img/AcMilan23-Negra-3.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    nombre: "Alemania 2024 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Alemania versión local temporada 2024.",
    imagenes: [
      "img/Alemania24.jpg",
      "img/Alemania24-1.jpg",
      "img/Alemania24-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    nombre: "Argentina 2026 Alternativa",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Argentina versión alternativa temporada 2026.",
    imagenes: [
      "img/Argentina26.jpg",
      "img/Argentina26-1.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    nombre: "Arsenal 2005 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Arsenal versión local temporada 2005.",
    imagenes: [
      "img/Arsenal05.jpeg",
      "img/Arsenal05-1.jpeg",
      "img/Arsenal05-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 10,
    nombre: "Arsenal 2022 Alternativa",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Arsenal versión alternativa temporada 2022.",
    imagenes: [
      "img/Arsenal22.jpeg",
      "img/Arsenal22-1.jpeg",
      "img/Arsenal22-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 11,
    nombre: "Barcelona 2008/2009 Local Edicion Champions League",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Barcelona versión Champions League de local temporada 2008.",
    imagenes: [
      "img/Barcelona08.jpeg",
      "img/Barcelona08-1.jpeg",
      "img/Barcelona08-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 12,
    nombre: "Barcelona 2006/2007 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Barcelona versión local temporada 2006/2007.",
    imagenes: [
      "img/Barcelona06.jpeg",
      "img/Barcelona06-1.jpeg",
      "img/Barcelona06-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 13,
    nombre: "Barcelona Edicion especial Travis Scott 2025/2026",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial Travis Scott Barcelona temporada 2025/2026.",
    imagenes: [
      "img/BarcelonaSE-Travis.jpg",
      "img/BarcelonaSE-Travis-1.jpg",
      "img/BarcelonaSE-Travis-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 14,
    nombre: "Barcelona Edicion especial 2025/2026",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial Barcelona temporada 2025/2026.",
    imagenes: [
      "img/BarcelonaSE-Rosa.jpg",
      "img/BarcelonaSE-Rosa-1.jpg",
      "img/BarcelonaSE-Rosa-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 15,
    nombre: "Bayern Munich 2017/2018 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2017/2018.",
    imagenes: [
      "img/Bayern17.jpg",
      "img/Bayern17-1.jpg",
      "img/Bayern17-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 16,
    nombre: "Bayern Munich 2024/2025 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2024/2025.",
    imagenes: [
      "img/Bayern24.jpg",
      "img/Bayern24-1.jpg",
      "img/Bayern24-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 17,
    nombre: "Bayern Munich 2025/26 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2025/26.",
    imagenes: [
      "img/Bayern25.jpg",
      "img/Bayern25-1.jpg",
      "img/Bayern25-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 18,
    nombre: "Brasil 2002 Alternativa azul",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2002.",
    imagenes: [
      "img/Brasil02-Alternativa.jpg",
      "img/Brasil02-Alternativa-1.jpg",
      "img/Brasil02-Alternativa-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 19,
    nombre: "Brasil 2010",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Brasil temporada 2010.",
    imagenes: [
      "img/Brasil10.jpg",
      "img/Brasil10-1.jpg",
      "img/Brasil10-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 20,
    nombre: "Brasil 2010 Alternativa azul",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2010.",
    imagenes: [
      "img/Brasil10-Alternativa.jpeg",
      "img/Brasil10-Alternativa-1.jpeg",
      "img/Brasil10-Alternativa-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 21,
    nombre: "Chelsea 2026/2027 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta Chelsea versión local temporada 2026/2027.",
    imagenes: [
      "img/Chelsea26.jpg",
      "img/Chelsea26-1.jpg",
      "img/Chelsea26-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 22,
    nombre: "Chelsea 20211/2012 Local Edicion Champions League",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Chelsea versión Champions League local temporada 2011/2012.",
    imagenes: [
      "img/Chelsea11.jpeg",
      "img/Chelsea11-1.jpeg",
      "img/Chelsea11-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 23,
    nombre: "Francia 2006 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Francia versión local temporada 2006.",
    imagenes: [
      "img/Francia06.jpeg",
      "img/Francia06-1.jpeg",
      "img/Francia06-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 24,
    nombre: "Francia 2025 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual de Francia versión local temporada 2025.",
    imagenes: [
      "img/Francia25.jpg",
      "img/Francia25-1.jpg",
      "img/Francia25-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 25,
    nombre: "Francia 2018 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Francia versión local temporada 2018.",
    imagenes: [
      "img/Francia18.jpeg",
      "img/Francia18-1.jpeg",
      "img/Francia18-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 26,
    nombre: "Inter de Milan 2025/2026 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Inter de Milan versión local temporada 2025/2026.",
    imagenes: [
      "img/InterMilan25.jpg",
      "img/InterMilan25-1.jpg",
      "img/InterMilan25-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 27,
    nombre: "Inter de Milan 2004/2005 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2004/2005.",
    imagenes: [
      "img/InterMilan04.jpg",
      "img/InterMilan04-1.jpg",
      "img/InterMilan04-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 28,
    nombre: "Inter de Milan 2001/2002 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2001/2002.",
    imagenes: [
      "img/InterMilan01.jpeg",
      "img/InterMilan01-1.jpeg",
      "img/InterMilan01-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 29,
    nombre: "Inter de Milan 2011/2012 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2011/2012.",
    imagenes: [
      "img/InterMilan11.jpg",
      "img/InterMilan11-1.jpg",
      "img/InterMilan11-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 30,
    nombre: "Japon 2006 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Japon versión local temporada 2006.",
    imagenes: [
      "img/Japon06.jpg",
      "img/Japon06-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 31,
    nombre: "Juventus 2004/2005 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2004/2005.",
    imagenes: [
      "img/Juventus04.jpg",
      "img/Juventus04-1.jpg",
      "img/Juventus04-2.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 32,
    nombre: "Juventus 2019/2020 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2019/2020.",
    imagenes: [
      "img/Juventus19.jpeg",
      "img/Juventus19-1.jpeg",
      "img/Juventus19-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 33,
    nombre: "Noruega 2026 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Noruega versión local temporada 2026.",
    imagenes: [
      "img/Noruega26.jpg",
      "img/Noruega26-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 34,
    nombre: "Portugal 2026 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Portugal versión local temporada 2026.",
    imagenes: [
      "img/Portugal26.jpg",
      "img/Portugal26-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 35,
    nombre: "Portugal 2016 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Portugal versión local temporada 2016.",
    imagenes: [
      "img/Portugal16.jpeg",
      "img/Portugal16-1.jpeg",
      "img/Portugal16-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 36,
    nombre: "Portugal 2023 Edicion Especial ",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial \"The Siuu\" Portugal temporada 2023.",
    imagenes: [
      "img/PortugalSE.jpeg",
      "img/PortugalSE-1.jpg",
      "img/PortugalSE-2.jpg",
      "img/PortugalSE-3.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 37,
    nombre: "Paris Saint Germain 2021/2022 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Paris Saint Germain versión local temporada 2021/2022.",
    imagenes: [
      "img/Psg21.jpg",
      "img/Psg21-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 38,
    nombre: "Paris Saint Germain 2024/2025 Cuarta equipacion",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Paris Saint Germain versión local temporada 2024/2025.",
    imagenes: [
      "img/Psg24.jpg",
      "img/Psg24-1.jpg",
      "img/Psg24-2.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 39,
    nombre: "Real Madrid 2022/2023 Visitante",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid versión visitante temporada 2022/2023.",
    imagenes: [
      "img/Real22.jpeg",
      "img/Real22-1.jpeg",
      "img/Real22-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 40,
    nombre: "Real Madrid 2025/2026 Visitante",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial Real Madrid temporada 2025/2026.",
    imagenes: [
      "img/RealSE25.jpeg",
      "img/RealSE25-1.jpeg",
      "img/RealSE25-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 41,
    nombre: "Real Madrid 2012/2013 Visitante",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2012/2013.",
    imagenes: [
      "img/Real12-Visitante.jpeg",
      "img/Real12-Visitante-1.jpeg",
      "img/Real12-Visitante-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 42,
    nombre: "Real Madrid 2006/2007",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2006/2007.",
    imagenes: [
      "img/Real06.jpeg",
      "img/Real06-1.jpeg",
      "img/Real06-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 43,
    nombre: "Real Madrid 2017/2018",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2017/2018.",
    imagenes: [
      "img/Real17.jpeg",
      "img/Real17-1.jpeg",
      "img/Real17-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 44,
    nombre: "Real Madrid 2017/2018 Visitante",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid Visitante temporada 2017/2018.",
    imagenes: [
      "img/Real17-Visitante.jpeg",
      "img/Real17-Visitante-1.jpeg",
      "img/Real17-Visitante-2.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 45,
    nombre: "Real Madrid 2026/2027 Local",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Local temporada 2026/2027.",
    imagenes: [
      "img/Real26.jpg",
      "img/Real26-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 46,
    nombre: "Real Madrid 2026/2027 Visitante",
    categoria: "Actual",
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Visitante temporada 2026/2027.",
    imagenes: [
      "img/Real26-Visitante.jpeg",
      "img/Real26-Visitante-1.jpeg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 47,
    nombre: "Sporting 2003/2004 Local",
    categoria: "Retro",
    precio: 100000,
    descripcion: "Camiseta retro Sporting temporada 2003/2004.",
    imagenes: [
      "img/Sporting03.jpg",
      "img/Sporting03-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 48,
    nombre: "Japon 2024 Edicion Especial",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial Japon temporada 2024.",
    imagenes: [
      "img/JaponSE24.jpg",
      "img/JaponSE24-1.jpg",
      "img/JaponSE24-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 49,
    nombre: "Argentina 2023 Edicion Especial",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial \"La Pulga\" Argentina temporada 2023.",
    imagenes: [
      "img/ArgentinaSE23.jpeg",
      "img/ArgentinaSE23-1.jpg",
      "img/ArgentinaSE23-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 50,
    nombre: "Brasil 2022 Edicion Especial",
    categoria: "Ediciones Especiales",
    precio: 120000,
    descripcion: "Camiseta edicion especial Brasil temporada 2022.",
    imagenes: [
      "img/BrasilSE22.jpeg",
      "img/BrasilSE22-1.jpeg",
      "img/BrasilSE22-2.jpeg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 51,
    nombre: "Colombia 2014 Local",
    categoria: "Retro",
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 2014.",
    imagenes: [
      "img/Colombia14.jpg",
      "img/Colombia14-1.jpg",
      "img/Colombia14-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 52,
    nombre: "Colombia 1994 Local",
    categoria: "Retro",
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 1994.",
    imagenes: [
      "img/Colombia94.jpg",
      "img/Colombia94-1.jpg",
    ],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 53,
    nombre: "España 2008 Local",
    categoria: "Retro",
    precio: 120000,
    descripcion: "Camiseta retro España temporada 2008.",
    imagenes: [
      "img/España08.jpeg",
      "img/España08-1.jpg",
      "img/España08-2.jpg"
    ],
    tallas: ["S", "M", "L", "XL"]
  },  



];


// --------------------------------- AQUI ACABA EL CATALOGO --------------------------------- 





let carrito = [];
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderizarCategorias();
  renderizarProductos(PRODUCTOS);
});

function renderizarCategorias() {
  const categorias = ["todos", ...new Set(PRODUCTOS.map(p => p.categoria))];
  const contenedor = document.getElementById("contenedor-categorias");
  
  contenedor.innerHTML = categorias.map(cat => `
    <button class="btn-categoria ${cat === 'todos' ? 'active' : ''}" 
            onclick="filtrarCategoria('${cat}', this)">
      ${cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  `).join('');
}

function filtrarCategoria(categoria, elemento) {
  document.querySelectorAll('.btn-categoria').forEach(btn => btn.classList.remove('active'));
  if(elemento) elemento.classList.add('active');

  if (categoria === 'todos') {
    renderizarProductos(PRODUCTOS);
  } else {
    const filtrados = PRODUCTOS.filter(p => p.categoria === categoria);
    renderizarProductos(filtrados);
  }
}

function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = productos.map(prod => `
    <div class="card-producto">
      
      <!-- Visor de Imagen Principal y Miniaturas -->
      <div class="galeria-container">
        <div class="img-container">
          <img id="img-principal-${prod.id}" src="${prod.imagenes[0]}" alt="${prod.nombre}" loading="lazy">
        </div>
        
        ${prod.imagenes.length > 1 ? `
          <div class="miniaturas-container">
            ${prod.imagenes.map((imgUrl, index) => `
              <img src="${imgUrl}" 
                   class="miniatura ${index === 0 ? 'active' : ''}" 
                   onclick="cambiarImagenPrincipal(${prod.id}, '${imgUrl}', this)" 
                   alt="Vista ${index + 1}">
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="info-container">
        <div>
          <h3 class="titulo-producto">${prod.nombre}</h3>
          ${prod.descripcion ? `<p class="descripcion-producto">${prod.descripcion}</p>` : ''}
          <div class="precio-producto">$ ${prod.precio.toLocaleString('es-CO')} COP</div>
          
          ${prod.tallas ? `
            <div class="selector-opcion">
              <label for="talla-${prod.id}">Seleccionar Talla:</label>
              <select id="talla-${prod.id}">
                ${prod.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
          ` : ''}
        </div>
        
        <button class="btn-agregar" onclick="agregarAlCarrito(${prod.id})">
          + Agregar al pedido
        </button>
      </div>
    </div>
  `).join('');
}

function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  // Cambia la foto principal
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) {
    imgPrincipal.src = nuevaUrl;
  }
  
  // Cambia el borde activo de la miniatura seleccionada
  const contenedorPadre = elementoMiniatura.parentElement;
  contenedorPadre.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
  elementoMiniatura.classList.add('active');
}

function agregarAlCarrito(idProducto) {
  const producto = PRODUCTOS.find(p => p.id === idProducto);
  let tallaSeleccionada = "";

  const selectTalla = document.getElementById(`talla-${idProducto}`);
  if (selectTalla) {
    tallaSeleccionada = selectTalla.value;
  }

  carrito.push({
    nombre: producto.nombre,
    precio: producto.precio,
    talla: tallaSeleccionada
  });

  total += producto.precio;
  actualizarBarraCarrito();
}

// Funciones del Carrito y Modal

function agregarAlCarrito(idProducto) {
  const producto = PRODUCTOS.find(p => p.id === idProducto);
  let tallaSeleccionada = "";

  const selectTalla = document.getElementById(`talla-${idProducto}`);
  if (selectTalla) {
    tallaSeleccionada = selectTalla.value;
  }

  // Se agrega un ID único a cada ítem para poder eliminarlo de forma individual
  carrito.push({
    itemUniqueId: Date.now() + Math.random(),
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    talla: tallaSeleccionada
  });

  actualizarCarrito();
}

function eliminarDelCarrito(itemUniqueId) {
  // Filtra y remueve solo el ítem seleccionado
  carrito = carrito.filter(item => item.itemUniqueId !== itemUniqueId);
  actualizarCarrito();
  renderizarModalPedido(); // Actualiza la lista dentro del modal
}

function actualizarCarrito() {
  total = carrito.reduce((sum, item) => sum + item.precio, 0);
  
  // Actualiza textos de totales y contadores
  document.getElementById("total-precio").innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  document.getElementById("modal-total-precio").innerText = `$ ${total.toLocaleString('es-CO')} COP`;
  document.getElementById("contador-cant").innerText = carrito.length;
}

function abrirModalPedido() {
  renderizarModalPedido();
  document.getElementById("modal-pedido").classList.add("active");
}

function cerrarModalPedido() {
  document.getElementById("modal-pedido").classList.remove("active");
}

function renderizarModalPedido() {
  const contenedor = document.getElementById("lista-detallada-pedido");
  
  if (carrito.length === 0) {
    contenedor.innerHTML = `<p style="text-align: center; color: #64748b; padding: 20px 0;">Tu pedido está vacío.</p>`;
    return;
  }

  contenedor.innerHTML = carrito.map(item => `
    <div class="item-pedido-row">
      <div class="item-pedido-info">
        <h4>${item.nombre}</h4>
        <p>${item.talla ? `Talla: <strong>${item.talla}</strong> | ` : ''}$ ${item.precio.toLocaleString('es-CO')} COP</p>
      </div>
      <div class="item-pedido-acciones">
        <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.itemUniqueId})" title="Quitar del pedido">
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}

function actualizarBarraCarrito() {
  document.getElementById("total-precio").innerText = `$ ${total.toLocaleString('es-CO')} COP`;
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Por favor agrega al menos un producto a tu pedido.");
    return;
  }

  let mensaje = `👋 ¡Hola *${CONFIG.nombreTienda}*! Quisiera realizar el siguiente pedido:\n\n`;
  
  carrito.forEach((item, idx) => {
    const detalleTalla = item.talla ? ` (Talla: ${item.talla})` : '';
    mensaje += `*${idx + 1}.* ${item.nombre}${detalleTalla} - $${item.precio.toLocaleString('es-CO')}\n`;
  });

  mensaje += `\n💵 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n\n`;
  mensaje += "📌 Quedo atento para confirmar disponibilidad de stock y datos de envío.";

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

let categoriaActual = 'todos';

// Filtra según la categoría seleccionada
function filtrarCategoria(categoria, elemento) {
  categoriaActual = categoria;
  document.querySelectorAll('.btn-categoria').forEach(btn => btn.classList.remove('active'));
  if (elemento) elemento.classList.add('active');

  ejecutarFiltroCombinado();
}

// Filtra en tiempo real al escribir en el buscador
function filtrarPorBusqueda() {
  ejecutarFiltroCombinado();
}

// Combina el filtro de categoría y el de texto
function ejecutarFiltroCombinado() {
  const textoBusqueda = document.getElementById('input-busqueda').value.toLowerCase().trim();

  const resultados = PRODUCTOS.filter(prod => {
    // Valida si coincide con la categoría
    const coincideCategoria = (categoriaActual === 'todos') || (prod.categoria === categoriaActual);
    
    // Valida si el texto coincide con nombre, descripción o categoría
    const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) || 
                          (prod.descripcion && prod.descripcion.toLowerCase().includes(textoBusqueda)) ||
                          prod.categoria.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideTexto;
  });

  renderizarProductos(resultados);
}

/**
 * Intercambia la fuente de la imagen principal según la miniatura seleccionada
 * @param {string} targetId - ID del elemento img principal a actualizar
 * @param {string} newSrc - URL de la imagen miniatura seleccionada
 */
function changeImage(targetId, newSrc) {
  const mainImage = document.getElementById(targetId);
  if (mainImage) {
    mainImage.src = newSrc;
  }
}