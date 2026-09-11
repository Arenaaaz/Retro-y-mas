// ==========================================================================
// CATÁLOGO DE PRODUCTOS
// ==========================================================================
// Este archivo es la ÚNICA fuente de datos de todo el catálogo. No contiene
// lógica: solo arreglos de objetos "producto". script.js lee estos datos
// para dibujar las tarjetas, el modal de personalización y los filtros.
//
// -----------------------------------------------------------------------
// CÓMO AGREGAR UN PRODUCTO NUEVO (cópialo y pégalo dentro del arreglo que
// corresponda a su tipo de prenda — CAMISETAS, PANTALONETAS, ENTRENAMIENTO
// o CORTAVIENTOS — y ajusta los campos):
//
// {
//   id: "CAM-99",                 // único en todo el catálogo, no lo repitas
//   nombre: "Nombre visible del producto",
//   tipoPrenda: "Camisetas",      // debe coincidir EXACTO con una de las
//                                 // secciones del menú lateral (ver más
//                                 // abajo "TIPOS DE PRENDA REGISTRADOS")
//   categoria: "Retro",           // agrupa los botones de filtro superiores;
//                                 // usa el mismo texto en varios productos
//                                 // para que caigan en el mismo botón
//   entregaInmediata: false,      // true = aparece en la sección "Entrega
//                                 // Inmediata" y arriba del catálogo
//   dorsalInmediato: "Messi 10",  // opcional, solo tiene sentido si
//                                 // entregaInmediata es true
//   tallasInmediatas: ["M"],      // opcional, tallas que SÍ hay en stock ya
//   precio: 100000,               // número entero en pesos, sin puntos ni $
//   descripcion: "Frase corta que describe la prenda.",
//   imagenes: ["img/foto1.jpg", "img/foto2.jpg"], // la primera es la
//                                 // portada de la tarjeta; agrega las que
//                                 // quieras, todas quedan navegables
//   tallas: ["S", "M", "L", "XL"],
//   variantes: {                  // opcional, agrega costo extra
//     manga: [
//       { tipo: "Manga Corta", adicional: 0 },
//       { tipo: "Manga Larga", adicional: 10000 }
//     ],
//     parches: [
//       { tipo: "Sin parches", adicional: 0 },
//       { tipo: "Parches Champions", adicional: 10000 }
//     ]
//   },
//   tieneOpcionBordado: true,               // opcional, casilla sin costo
//   textoBordado: "Bordado Final Moscow 2008"
// }
//
// TIPOS DE PRENDA REGISTRADOS EN EL MENÚ LATERAL (sidebar en index.html):
// "Camisetas", "Pantalonetas", "Entrenamiento" y "Cortavientos". Si algún
// día agregas un tipoPrenda distinto a estos cuatro, también debes crear
// su botón en el <aside id="sidebar-secciones"> de index.html o esos
// productos quedarán invisibles para el cliente (nadie podrá filtrarlos).
// -----------------------------------------------------------------------

// 👕 CAMISETAS DE FÚTBOL
const CAMISETAS = [
  {
    id: "CAM-01",
    nombre: "AC Milan 06/07",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: true,
    dorsalInmediato: "Kaká 22",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta retro AC Milan versión local temporada 2006/2007.",
    imagenes: ["img/AcMilan06.jpeg", "img/AcMilan06-1.jpeg", "img/AcMilan06-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Mundial de clubes", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-02",
    nombre: "Argentina 2006 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro Argentina versión local temporada 2006.",
    imagenes: ["img/Argentina06.jpg", "img/Argentina06-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-03",
    nombre: "Brasil 2002 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    dorsalInmediato: "Ronaldo 9",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión local temporada 2002.",
    imagenes: ["img/Brasil02.jpeg", "img/Brasil02-1.jpeg", "img/Brasil02-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-04",
    nombre: "Manchester United 2007/08 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Manchester United local temporada 2007/2008.",
    imagenes: ["img/United07.jpeg", "img/United07-1.jpeg", "img/United07-2.jpeg", "img/United07-3.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions League", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final Moscow 2008"
  },
  {
    id: "CAM-05",
    nombre: "AC Milan 23/24 Edicion Beige",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta retro AC Milan edición especial beige temporada 2023/2024.",
    imagenes: ["img/AcMilan23-Blanco.jpg", "img/AcMilan23-Blanco-1.jpg", "img/AcMilan23-Blanco-2.jpg", "img/AcMilan23-Blanco-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-06",
    nombre: "AC Milan 23/24 Edicion Oscura",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta retro AC Milan edición especial oscura temporada 2023/2024.",
    imagenes: ["img/AcMilan23-Negra.jpg", "img/AcMilan23-Negra-1.jpg", "img/AcMilan23-Negra-2.jpg", "img/AcMilan23-Negra-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-07",
    nombre: "Alemania 2024 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Alemania versión local temporada 2024.",
    imagenes: ["img/Alemania24.jpg", "img/Alemania24-1.jpg", "img/Alemania24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-08",
    nombre: "Argentina 2026 Alternativa",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Argentina versión alternativa temporada 2026.",
    imagenes: ["img/Argentina26.jpg", "img/Argentina26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-09",
    nombre: "Arsenal 2005 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Arsenal versión local temporada 2005.",
    imagenes: ["img/Arsenal05.jpeg", "img/Arsenal05-1.jpeg", "img/Arsenal05-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions ", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-10",
    nombre: "Arsenal 2022 Alternativa",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Arsenal versión alternativa temporada 2022.",
    imagenes: ["img/Arsenal22.jpeg", "img/Arsenal22-1.jpeg", "img/Arsenal22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-11",
    nombre: "Barcelona 2008/2009 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Barcelona de local temporada 2008.",
    imagenes: ["img/Barcelona08.jpeg", "img/Barcelona08-1.jpeg", "img/Barcelona08-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final Roma 2009"
  },
  {
    id: "CAM-12",
    nombre: "Barcelona 2005/2006 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Barcelona versión local temporada 2005/2006.",
    imagenes: ["img/Barcelona05.jpeg", "img/Barcelona05-1.jpeg", "img/Barcelona05-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final Paris 2006"
  },
  {
    id: "CAM-13",
    nombre: "Barcelona Edicion especial Travis Scott 2025/2026",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Travis Scott Barcelona temporada 2025/2026.",
    imagenes: ["img/BarcelonaSE-Travis.jpg", "img/BarcelonaSE-Travis-1.jpg", "img/BarcelonaSE-Travis-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-14",
    nombre: "Barcelona Edicion especial 2025/2026",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Barcelona temporada 2025/2026.",
    imagenes: ["img/BarcelonaSE-Rosa.jpg", "img/BarcelonaSE-Rosa-1.jpg", "img/BarcelonaSE-Rosa-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-15",
    nombre: "Bayern Munich 2017/2018 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2017/2018.",
    imagenes: ["img/Bayern17.jpg", "img/Bayern17-1.jpg", "img/Bayern17-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-16",
    nombre: "Bayern Munich 2024/2025 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2024/2025.",
    imagenes: ["img/Bayern24.jpg", "img/Bayern24-1.jpg", "img/Bayern24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-17",
    nombre: "Bayern Munich 2025/26 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2025/26.",
    imagenes: ["img/Bayern25.jpg", "img/Bayern25-1.jpg", "img/Bayern25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-18",
    nombre: "Brasil 2002 Alternativa azul",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2002.",
    imagenes: ["img/Brasil02-Alternativa.jpg", "img/Brasil02-Alternativa-1.jpg", "img/Brasil02-Alternativa-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-19",
    nombre: "Brasil 2010",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil temporada 2010.",
    imagenes: ["img/Brasil10.jpg", "img/Brasil10-1.jpg", "img/Brasil10-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-20",
    nombre: "Brasil 2010 Alternativa azul",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2010.",
    imagenes: ["img/Brasil10-Alternativa.jpeg", "img/Brasil10-Alternativa-1.jpeg", "img/Brasil10-Alternativa-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-21",
    nombre: "Chelsea 2026/2027 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta Chelsea versión local temporada 2026/2027.",
    imagenes: ["img/Chelsea26.jpg", "img/Chelsea26-1.jpg", "img/Chelsea26-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-22",
    nombre: "Chelsea 2011/2012 Local Edicion Champions League",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Chelsea versión Champions League local temporada 2011/2012.",
    imagenes: ["img/Chelsea11.jpeg", "img/Chelsea11-1.jpeg", "img/Chelsea11-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final Munich 2012"
  },
  {
    id: "CAM-23",
    nombre: "Francia 2006 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: true,
    dorsalInmediato: "Zidane 10",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta retro Francia versión local temporada 2006.",
    imagenes: ["img/Francia06.jpeg", "img/Francia06-1.jpeg", "img/Francia06-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-24",
    nombre: "Francia 2025 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual de Francia versión local temporada 2025.",
    imagenes: ["img/Francia25.jpg", "img/Francia25-1.jpg", "img/Francia25-2.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-25",
    nombre: "Francia 2018 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Francia versión local temporada 2018.",
    imagenes: ["img/Francia18.jpeg", "img/Francia18-1.jpeg", "img/Francia18-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-26",
    nombre: "Inter de Milan 2025/2026 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Inter de Milan versión local temporada 2025/2026.",
    imagenes: ["img/InterMilan25.jpg", "img/InterMilan25-1.jpg", "img/InterMilan25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-27",
    nombre: "Inter de Milan 2004/2005 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2004/2005.",
    imagenes: ["img/InterMilan04.jpg", "img/InterMilan04-1.jpg", "img/InterMilan04-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-28",
    nombre: "Inter de Milan 2001/2002 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2001/2002.",
    imagenes: ["img/InterMilan01.jpeg", "img/InterMilan01-1.jpeg", "img/InterMilan01-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-29",
    nombre: "Inter de Milan 2011/2012 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2011/2012.",
    imagenes: ["img/InterMilan11.jpg", "img/InterMilan11-1.jpg", "img/InterMilan11-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-30",
    nombre: "Japon 2006 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Japon versión local temporada 2006.",
    imagenes: ["img/Japon06.jpg", "img/Japon06-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-31",
    nombre: "Juventus 2004/2005 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2004/2005.",
    imagenes: ["img/Juventus04.jpg", "img/Juventus04-1.jpg", "img/Juventus04-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-32",
    nombre: "Juventus 2019/2020 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2019/2020.",
    imagenes: ["img/Juventus19.jpeg", "img/Juventus19-1.jpeg", "img/Juventus19-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-33",
    nombre: "Noruega 2026 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Noruega versión local temporada 2026.",
    imagenes: ["img/Noruega26.jpg", "img/Noruega26-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-34",
    nombre: "Portugal 2026 \"La pantera negra\"",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: true,
    dorsalInmediato: "Sin dorsal",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta actual Portugal versión \"La pantera negra\" temporada 2026.",
    imagenes: ["img/Portugal26.jpg", "img/Portugal26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-35",
    nombre: "Portugal 2016 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Portugal versión local temporada 2016.",
    imagenes: ["img/Portugal16.jpeg", "img/Portugal16-1.jpeg", "img/Portugal16-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-36",
    nombre: "Portugal 2023 Edicion Especial ",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial \"The Siuu\" Portugal temporada 2023.",
    imagenes: ["img/PortugalSE.jpeg", "img/PortugalSE-1.jpg", "img/PortugalSE-2.jpg", "img/PortugalSE-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-37",
    nombre: "Paris Saint Germain 2021/2022 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Paris Saint Germain versión local temporada 2021/2022.",
    imagenes: ["img/Psg21.jpg", "img/Psg21-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-38",
    nombre: "Paris Saint Germain 2024/2025 Cuarta equipacion",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Paris Saint Germain versión local temporada 2024/2025.",
    imagenes: ["img/Psg24.jpg", "img/Psg24-1.jpg", "img/Psg24-2.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-39",
    nombre: "Real Madrid 2022/2023 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid versión visitante temporada 2022/2023.",
    imagenes: ["img/Real22.jpeg", "img/Real22-1.jpeg", "img/Real22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-40",
    nombre: "Real Madrid 2025/2026 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Real Madrid temporada 2025/2026.",
    imagenes: ["img/RealSE25.jpeg", "img/RealSE25-1.jpeg", "img/RealSE25-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-41",
    nombre: "Real Madrid 2012/2013 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2012/2013.",
    imagenes: ["img/Real12-Visitante.jpeg", "img/Real12-Visitante-1.jpeg", "img/Real12-Visitante-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
        manga: [
            { tipo: "Manga Corta", adicional: 0 },
            { tipo: "Manga Larga", adicional: 10000 }
            ]
        }
  },
  {
    id: "CAM-42",
    nombre: "Real Madrid 2006/2007",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2006/2007.",
    imagenes: ["img/Real06.jpeg", "img/Real06-1.jpeg", "img/Real06-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-43",
    nombre: "Real Madrid 2017/2018",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: true,
    dorsalInmediato: "Ronaldo 7 + Parches - Manga larga",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2017/2018.",
    imagenes: ["img/Real17.jpeg", "img/Real17-1.jpeg", "img/Real17-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-44",
    nombre: "Real Madrid 2017/2018 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid Visitante temporada 2017/2018.",
    imagenes: ["img/Real17-Visitante.jpeg", "img/Real17-Visitante-1.jpeg", "img/Real17-Visitante-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
        manga: [
            { tipo: "Manga Corta", adicional: 0 },
            { tipo: "Manga Larga", adicional: 10000 }
            ]
        }
  },
  {
    id: "CAM-45",
    nombre: "Real Madrid 2026/2027 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Local temporada 2026/2027.",
    imagenes: ["img/Real26.jpg", "img/Real26-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
        manga: [
            { tipo: "Manga Corta", adicional: 0 },
            { tipo: "Manga Larga", adicional: 10000 }
            ]
        }
  },
  {
    id: "CAM-46",
    nombre: "Real Madrid 2026/2027 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Visitante temporada 2026/2027.",
    imagenes: ["img/Real26-Visitante.jpeg", "img/Real26-Visitante-1.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
        manga: [
            { tipo: "Manga Corta", adicional: 0 },
            { tipo: "Manga Larga", adicional: 10000 }
            ]
        }
  },
  {
    id: "CAM-47",
    nombre: "Sporting 2003/2004 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Sporting temporada 2003/2004.",
    imagenes: ["img/Sporting03.jpg", "img/Sporting03-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
        manga: [
            { tipo: "Manga Corta", adicional: 0 },
            { tipo: "Manga Larga", adicional: 10000 }
            ]
        }
  },
  {
    id: "CAM-48",
    nombre: "Japon 2024 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Japon temporada 2024.",
    imagenes: ["img/JaponSE24.jpg", "img/JaponSE24-1.jpg", "img/JaponSE24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-49",
    nombre: "Argentina 2023 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial \"La Pulga\" Argentina temporada 2023.",
    imagenes: ["img/ArgentinaSE23.jpeg", "img/ArgentinaSE23-1.jpg", "img/ArgentinaSE23-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-50",
    nombre: "Brasil 2022 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Brasil temporada 2022.",
    imagenes: ["img/BrasilSE22.jpeg", "img/BrasilSE22-1.jpeg", "img/BrasilSE22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-51",
    nombre: "Colombia 2014 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 2014.",
    imagenes: ["img/Colombia14.jpg", "img/Colombia14-1.jpg", "img/Colombia14-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-52",
    nombre: "Colombia 1994 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 1994.",
    imagenes: ["img/Colombia94.jpg", "img/Colombia94-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-53",
    nombre: "España 2008 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro España temporada 2008.",
    imagenes: ["img/España08.jpeg", "img/España08-1.jpg", "img/España08-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-54",
    nombre: "Barcelona 2010/2011 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: true,
    dorsalInmediato: "Messi 10",
    tallasInmediatas: ["L"],
    precio: 100000,
    descripcion: "Camiseta retro Barcelona temporada 2010/2011.",
    imagenes: ["img/Barcelona10.jpeg", "img/Barcelona10-1.jpeg", "img/Barcelona10-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Mundial de clubes", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final London 2011"
  },
  {
    id: "CAM-55",
    nombre: "AC Milan 2009/2010 Local",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro AC Milan temporada 2009/2010.",
    imagenes: ["img/AcMilan09.jpeg", "img/AcMilan09-1.jpeg", "img/AcMilan09-2.jpeg", "img/AcMilan09-3.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-56",
    nombre: "AC Milan 06/07 Visitante",
    tipoPrenda: "Camisetas",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro AC Milan versión visitante temporada 2006/2007.",
    imagenes: ["img/AcMilan06-Visitante.jpg", "img/AcMilan06-Visitante-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    },
    tieneOpcionBordado: true,
    textoBordado: "Bordado Final Athens 2007"
  },
  {
    id: "CAM-57",
    nombre: "PSG 25/26 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual PSG temporada 2025/2026.",
    imagenes: ["img/Psg25.jpg", "img/Psg25-1.jpg", "img/Psg25-2.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-58",
    nombre: "Manchester City 25/26 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Manchester City temporada 2025/2026.",
    imagenes: ["img/ManCity25.jpg", "img/ManCity25-1.jpg", "img/ManCity25-2.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-59",
    nombre: "PSG 26/27 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual PSG temporada 2026/2027.",
    imagenes: ["img/Psg26.jpg", "img/Psg26-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-60",
    nombre: "Manchester City 25/26 Alternativa",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Manchester City temporada 2025/2026.",
    imagenes: ["img/ManCity25-Alternativa.jpg", "img/ManCity25-Alternativa-1.jpg", "img/ManCity25-Alternativa-2.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: "CAM-61",
    nombre: "Vasco da Gama Edicion Especial 22/23",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta especial Vasco da Gama temporada 2022/2023.",
    imagenes: ["img/VascoSE22.jpeg", "img/VascoSE22-1.jpeg", "img/VascoSE22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
  },
  {
    id: "CAM-62",
    nombre: "Italia 2022 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta especial Italia temporada 2022/2023.",
    imagenes: ["img/ItaliaSE22.jpeg", "img/ItaliaSE22-1.jpeg", "img/ItaliaSE22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-63",
    nombre: "Italia 2023 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta especial Italia temporada 2023/2024.",
    imagenes: ["img/ItaliaSE23.jpeg", "img/ItaliaSE23-1.jpeg", "img/ItaliaSE23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-64",
    nombre: "Italia 2024 Edicion Especial",
    tipoPrenda: "Camisetas",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta especial Italia temporada 2024/2025.",
    imagenes: ["img/ItaliaSE24.jpeg", "img/ItaliaSE24-1.jpeg", "img/ItaliaSE24-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "CAM-65",
    nombre: "Inglaterra 2004 Local",
    tipoPrenda: "Camisetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta local Inglaterra temporada 2004.",
    imagenes: ["img/Inglaterra04.jpg", "img/Inglaterra04-1.jpg", "img/Inglaterra04-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  }
];

// 🩳 PANTALONETAS
const PANTALONETAS = [
  {
    id: "PAN-01",
    nombre: "Pantaloneta Argentina 2024",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Argentina temporada 2024.",
    imagenes: ["img/ShortArgentina24.jpg", "img/ShortArgentina24-1.jpg", "img/ShortArgentina24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-02",
    nombre: "Pantaloneta Chelsea 25/26",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Chelsea temporada 2025/2026.",
    imagenes: ["img/ShortChelsea25.jpg", "img/ShortChelsea25-1.jpg", "img/ShortChelsea25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-03",
    nombre: "Pantaloneta Manchester United 25/26",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Manchester United temporada 2025/2026.",
    imagenes: ["img/ShortUnited25.jpg", "img/ShortUnited25-1.jpg", "img/ShortUnited25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-04",
    nombre: "Pantaloneta Italia 2026",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Italia temporada 2026.",
    imagenes: ["img/ShortItalia26.jpg", "img/ShortItalia26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-05",
    nombre: "Pantaloneta Psg 25/26",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Psg temporada 2025/2026.",
    imagenes: ["img/ShortPsg25.jpg", "img/ShortPsg25-1.jpg", "img/ShortPsg25-2.jpg","img/ShortPsg25-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-06",
    nombre: "Pantaloneta Arsenal 25/26",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Arsenal temporada 2025/2026.",
    imagenes: ["img/ShortArsenal25.jpg", "img/ShortArsenal25-1.jpg", "img/ShortArsenal25-2.jpg", "img/ShortArsenal25-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-07",
    nombre: "Pantaloneta Vasco da Gama 26/27",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Vasco da Gama temporada 2026/2027.",
    imagenes: ["img/ShortVasco26.jpg", "img/ShortVasco26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-08",
    nombre: "Pantaloneta Vasco da Gama 2000",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Vasco da Gama temporada 2000.",
    imagenes: ["img/ShortVasco00.jpeg", "img/ShortVasco00-1.jpeg", "img/ShortVasco00-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-09",
    nombre: "Pantaloneta Corinthians 23/24 Alternativa",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Corinthians temporada 2023/2024.",
    imagenes: ["img/ShortCorinthians23.jpeg", "img/ShortCorinthians23-1.jpeg", "img/ShortCorinthians23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-10",
    nombre: "Pantaloneta Real Madrid 24/25 Local",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Real Madrid temporada 2024/2025.",
    imagenes: ["img/ShortRealM24.jpg", "img/ShortRealM24-1.jpg", "img/ShortRealM24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-11",
    nombre: "Pantaloneta Flamengo 26/27",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Flamengo temporada 2026/2027.",
    imagenes: ["img/ShortFlamengo26.jpg", "img/ShortFlamengo26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-12",
    nombre: "Pantaloneta Italia 2023",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Italia temporada 2023.",
    imagenes: ["img/ShortItalia23.jpeg", "img/ShortItalia23-1.jpeg", "img/ShortItalia23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-13",
    nombre: "Pantaloneta Flamengo 23/24",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Flamengo temporada 2023/2024.",
    imagenes: ["img/ShortFlamengo23.jpeg", "img/ShortFlamengo23-1.jpeg", "img/ShortFlamengo23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-14",
    nombre: "Pantaloneta Sao Paulo 23/24",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Sao Paulo temporada 2023/2024.",
    imagenes: ["img/ShortSaoP23.jpeg", "img/ShortSaoP23-1.jpeg", "img/ShortSaoP23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "PAN-15",
    nombre: "Pantaloneta Brasil 2026 Alternativa",
    tipoPrenda: "Pantalonetas",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 50000,
    descripcion: "Pantaloneta local Brasil temporada 2026.",
    imagenes: ["img/ShortBrasil26-Alternativa.jpg", "img/ShortBrasil26-Alternativa-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  }
]

// 🧥 ENTRENAMIENTO
const ENTRENAMIENTO = [
  {
    id: "ENT-01",
    nombre: "Buzo de entrenamiento Cruzeiro 23/24",
    tipoPrenda: "Entrenamiento",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 150000,
    descripcion: "Buzo de entrenamiento Cruzeiro.",
    imagenes: ["img/TrainCruzeiro23.jpeg","img/TrainCruzeiro23-1.jpeg", "img/TrainCruzeiro23-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "ENT-02",
    nombre: "Buzo de entrenamiento Flamengo 26/27",
    tipoPrenda: "Entrenamiento",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 150000,
    descripcion: "Buzo de entrenamiento Flamengo.",
    imagenes: ["img/TrainFlamengo26.jpg","img/TrainFlamengo26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "ENT-03",
    nombre: "Buzo de entrenamiento Sao Paulo 23/24",
    tipoPrenda: "Entrenamiento",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 150000,
    descripcion: "Buzo de entrenamiento Sao Paulo.",
    imagenes: ["img/TrainSaoP23.jpeg","img/TrainSaoP23-1.jpeg", "img/TrainSaoP23-2.jpeg", "img/TrainSaoP23-3.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "ENT-04",
    nombre: "Buzo de entrenamiento Brasil 2022",
    tipoPrenda: "Entrenamiento",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 150000,
    descripcion: "Buzo de entrenamiento Brasil.",
    imagenes: ["img/TrainBrasil22.jpeg","img/TrainBrasil22-1.jpeg", "img/TrainBrasil22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: "ENT-05",
    nombre: "Chaqueta PSG",
    tipoPrenda: "Entrenamiento",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 150000,
    descripcion: "Chaqueta de entrenamiento PSG.",
    imagenes: ["img/JacketPsg01.jpeg","img/JacketPsg01-1.jpeg", "img/JacketPsg01-2.jpeg"],
  }

];

// 💨 CORTAVIENTOS
const CORTAVIENTOS = [
  {
    id: "COR-01",
    nombre: "Cortavientos PSG Negro 23/24",
    tipoPrenda: "Cortavientos",
    categoria: "Actual",
    entregaInmediata: false,
    dorsalInmediato: "Sin dorsal",
    tallasInmediatas: ["M", "L"],
    precio: 150000,
    descripcion: "Cortavientos impermeable con capota del PSG.",
    imagenes: ["img/WindB-Psg.jpeg","img/WindB-Psg-1.jpeg","img/WindB-Psg-2-jpeg"],
    tallas: ["S", "M", "L", "XL"]
  }
];

// ==========================================================================
// UNIFICACIÓN EN LA VARIABLE GLOBAL PRODUCTOS
// ==========================================================================
// script.js y el resto del sitio SOLO leen este arreglo unificado; nunca
// referencian CAMISETAS, PANTALONETAS, etc. por separado. Si agregas una
// categoría de prenda completamente nueva (ej. "Balones"), crea su propio
// arreglo arriba con el mismo formato y súmalo aquí abajo con "...".
const PRODUCTOS = [
  ...CAMISETAS,
  ...PANTALONETAS,
  ...ENTRENAMIENTO,
  ...CORTAVIENTOS
];