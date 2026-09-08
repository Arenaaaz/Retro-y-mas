// CONFIGURACIÓN DEL NEGOCIO
const CONFIG = {
  nombreTienda: "Retro y más",
  whatsapp: "573013276930",
  moneda: "COP"
};

// --------------------------------- CATÁLOGO --------------------------------- 
const PRODUCTOS = [
  {
    id: 1,
    nombre: "AC Milan 06/07",
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
    id: 2,
    nombre: "Argentina 2006 Local",
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
    id: 3,
    nombre: "Brasil 2002 Local",
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
    id: 4,
    nombre: "Manchester United 2007/08 Champions League",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Manchester United versión Champions League de local temporada 2007/2008.",
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
    }
  },
  {
    id: 5,
    nombre: "AC Milan 23/24 Edicion Beige",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta retro AC Milan edición especial beige temporada 2023/2024.",
    imagenes: ["img/AcMilan23-Blanco.jpg", "img/AcMilan23-Blanco-1.jpg", "img/AcMilan23-Blanco-2.jpg", "img/AcMilan23-Blanco-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    nombre: "AC Milan 23/24 Edicion Oscura",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 110000,
    descripcion: "Camiseta retro AC Milan edición especial oscura temporada 2023/2024.",
    imagenes: ["img/AcMilan23-Negra.jpg", "img/AcMilan23-Negra-1.jpg", "img/AcMilan23-Negra-2.jpg", "img/AcMilan23-Negra-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    nombre: "Alemania 2024 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Alemania versión local temporada 2024.",
    imagenes: ["img/Alemania24.jpg", "img/Alemania24-1.jpg", "img/Alemania24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    nombre: "Argentina 2026 Alternativa",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Argentina versión alternativa temporada 2026.",
    imagenes: ["img/Argentina26.jpg", "img/Argentina26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    nombre: "Arsenal 2005 Local",
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
    id: 10,
    nombre: "Arsenal 2022 Alternativa",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Arsenal versión alternativa temporada 2022.",
    imagenes: ["img/Arsenal22.jpeg", "img/Arsenal22-1.jpeg", "img/Arsenal22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 11,
    nombre: "Barcelona 2008/2009 Local Edicion Champions League",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Barcelona versión Champions League de local temporada 2008.",
    imagenes: ["img/Barcelona08.jpeg", "img/Barcelona08-1.jpeg", "img/Barcelona08-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 12,
    nombre: "Barcelona 2006/2007 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Barcelona versión local temporada 2006/2007.",
    imagenes: ["img/Barcelona06.jpeg", "img/Barcelona06-1.jpeg", "img/Barcelona06-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Edicion Champions League (Bordado de la final)", adicional: 0 },
        { tipo: "Parches Champions", adicional: 10000 }
      ]
    }
  },
  {
    id: 13,
    nombre: "Barcelona Edicion especial Travis Scott 2025/2026",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Travis Scott Barcelona temporada 2025/2026.",
    imagenes: ["img/BarcelonaSE-Travis.jpg", "img/BarcelonaSE-Travis-1.jpg", "img/BarcelonaSE-Travis-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 14,
    nombre: "Barcelona Edicion especial 2025/2026",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Barcelona temporada 2025/2026.",
    imagenes: ["img/BarcelonaSE-Rosa.jpg", "img/BarcelonaSE-Rosa-1.jpg", "img/BarcelonaSE-Rosa-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 15,
    nombre: "Bayern Munich 2017/2018 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2017/2018.",
    imagenes: ["img/Bayern17.jpg", "img/Bayern17-1.jpg", "img/Bayern17-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 16,
    nombre: "Bayern Munich 2024/2025 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2024/2025.",
    imagenes: ["img/Bayern24.jpg", "img/Bayern24-1.jpg", "img/Bayern24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 17,
    nombre: "Bayern Munich 2025/26 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Bayern Munich versión local temporada 2025/26.",
    imagenes: ["img/Bayern25.jpg", "img/Bayern25-1.jpg", "img/Bayern25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 18,
    nombre: "Brasil 2002 Alternativa azul",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2002.",
    imagenes: ["img/Brasil02-Alternativa.jpg", "img/Brasil02-Alternativa-1.jpg", "img/Brasil02-Alternativa-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 19,
    nombre: "Brasil 2010",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil temporada 2010.",
    imagenes: ["img/Brasil10.jpg", "img/Brasil10-1.jpg", "img/Brasil10-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 20,
    nombre: "Brasil 2010 Alternativa azul",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Brasil versión alternativa azul temporada 2010.",
    imagenes: ["img/Brasil10-Alternativa.jpeg", "img/Brasil10-Alternativa-1.jpeg", "img/Brasil10-Alternativa-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 21,
    nombre: "Chelsea 2026/2027 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta Chelsea versión local temporada 2026/2027.",
    imagenes: ["img/Chelsea26.jpg", "img/Chelsea26-1.jpg", "img/Chelsea26-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 22,
    nombre: "Chelsea 2011/2012 Local Edicion Champions League",
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
        { tipo: "Edicion Champions League (Bordado de la final)", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
  {
    id: 23,
    nombre: "Francia 2006 Local",
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
    id: 24,
    nombre: "Francia 2025 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual de Francia versión local temporada 2025.",
    imagenes: ["img/Francia25.jpg", "img/Francia25-1.jpg", "img/Francia25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 25,
    nombre: "Francia 2018 Local",
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
    id: 26,
    nombre: "Inter de Milan 2025/2026 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Inter de Milan versión local temporada 2025/2026.",
    imagenes: ["img/InterMilan25.jpg", "img/InterMilan25-1.jpg", "img/InterMilan25-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 27,
    nombre: "Inter de Milan 2004/2005 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2004/2005.",
    imagenes: ["img/InterMilan04.jpg", "img/InterMilan04-1.jpg", "img/InterMilan04-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 28,
    nombre: "Inter de Milan 2001/2002 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2001/2002.",
    imagenes: ["img/InterMilan01.jpeg", "img/InterMilan01-1.jpeg", "img/InterMilan01-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 29,
    nombre: "Inter de Milan 2011/2012 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Inter de Milan versión local temporada 2011/2012.",
    imagenes: ["img/InterMilan11.jpg", "img/InterMilan11-1.jpg", "img/InterMilan11-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 30,
    nombre: "Japon 2006 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Japon versión local temporada 2006.",
    imagenes: ["img/Japon06.jpg", "img/Japon06-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 31,
    nombre: "Juventus 2004/2005 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2004/2005.",
    imagenes: ["img/Juventus04.jpg", "img/Juventus04-1.jpg", "img/Juventus04-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 32,
    nombre: "Juventus 2019/2020 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Juventus versión local temporada 2019/2020.",
    imagenes: ["img/Juventus19.jpeg", "img/Juventus19-1.jpeg", "img/Juventus19-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 33,
    nombre: "Noruega 2026 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Noruega versión local temporada 2026.",
    imagenes: ["img/Noruega26.jpg", "img/Noruega26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 34,
    nombre: "Portugal 2026 \"La pantera negra\"",
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
    id: 35,
    nombre: "Portugal 2016 Local",
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
    id: 36,
    nombre: "Portugal 2023 Edicion Especial ",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial \"The Siuu\" Portugal temporada 2023.",
    imagenes: ["img/PortugalSE.jpeg", "img/PortugalSE-1.jpg", "img/PortugalSE-2.jpg", "img/PortugalSE-3.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 37,
    nombre: "Paris Saint Germain 2021/2022 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Paris Saint Germain versión local temporada 2021/2022.",
    imagenes: ["img/Psg21.jpg", "img/Psg21-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 38,
    nombre: "Paris Saint Germain 2024/2025 Cuarta equipacion",
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
    id: 39,
    nombre: "Real Madrid 2022/2023 Visitante",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid versión visitante temporada 2022/2023.",
    imagenes: ["img/Real22.jpeg", "img/Real22-1.jpeg", "img/Real22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 40,
    nombre: "Real Madrid 2025/2026 Visitante",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Real Madrid temporada 2025/2026.",
    imagenes: ["img/RealSE25.jpeg", "img/RealSE25-1.jpeg", "img/RealSE25-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 41,
    nombre: "Real Madrid 2012/2013 Visitante",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid temporada 2012/2013.",
    imagenes: ["img/Real12-Visitante.jpeg", "img/Real12-Visitante-1.jpeg", "img/Real12-Visitante-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 42,
    nombre: "Real Madrid 2006/2007",
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
    id: 43,
    nombre: "Real Madrid 2017/2018",
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
    id: 44,
    nombre: "Real Madrid 2017/2018 Visitante",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Real Madrid Visitante temporada 2017/2018.",
    imagenes: ["img/Real17-Visitante.jpeg", "img/Real17-Visitante-1.jpeg", "img/Real17-Visitante-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 45,
    nombre: "Real Madrid 2026/2027 Local",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Local temporada 2026/2027.",
    imagenes: ["img/Real26.jpg", "img/Real26-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 46,
    nombre: "Real Madrid 2026/2027 Visitante",
    categoria: "Actual",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta actual Real Madrid Visitante temporada 2026/2027.",
    imagenes: ["img/Real26-Visitante.jpeg", "img/Real26-Visitante-1.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 47,
    nombre: "Sporting 2003/2004 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro Sporting temporada 2003/2004.",
    imagenes: ["img/Sporting03.jpg", "img/Sporting03-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 48,
    nombre: "Japon 2024 Edicion Especial",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Japon temporada 2024.",
    imagenes: ["img/JaponSE24.jpg", "img/JaponSE24-1.jpg", "img/JaponSE24-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 49,
    nombre: "Argentina 2023 Edicion Especial",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial \"La Pulga\" Argentina temporada 2023.",
    imagenes: ["img/ArgentinaSE23.jpeg", "img/ArgentinaSE23-1.jpg", "img/ArgentinaSE23-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 50,
    nombre: "Brasil 2022 Edicion Especial",
    categoria: "Ediciones Especiales",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta edicion especial Brasil temporada 2022.",
    imagenes: ["img/BrasilSE22.jpeg", "img/BrasilSE22-1.jpeg", "img/BrasilSE22-2.jpeg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 51,
    nombre: "Colombia 2014 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 2014.",
    imagenes: ["img/Colombia14.jpg", "img/Colombia14-1.jpg", "img/Colombia14-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 52,
    nombre: "Colombia 1994 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro Colombia temporada 1994.",
    imagenes: ["img/Colombia94.jpg", "img/Colombia94-1.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 53,
    nombre: "España 2008 Local",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 120000,
    descripcion: "Camiseta retro España temporada 2008.",
    imagenes: ["img/España08.jpeg", "img/España08-1.jpg", "img/España08-2.jpg"],
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 54,
    nombre: "Barcelona 2009/2010 Local",
    categoria: "Retro",
    entregaInmediata: true,
    dorsalInmediato: "Messi 10",
    tallasInmediatas: ["L"],
    precio: 10000,
    descripcion: "Camiseta retro Barcelona temporada 2009/2010.",
    imagenes: ["img/Barcelona09.jpeg", "img/Barcelona09-1.jpeg", "img/Barcelona09-2.jpeg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Edicion Champions League (Bordado de la final)", adicional: 0 },
        { tipo: "Parches Champions / Mundial de clubes", adicional: 10000 }
      ]
    }
  },
  {
    id: 55,
    nombre: "AC Milan 2009/2010 Local",
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
    id: 56,
    nombre: "AC Milan 06/07 Visitante",
    categoria: "Retro",
    entregaInmediata: false,
    precio: 100000,
    descripcion: "Camiseta retro AC Milan versión visitante de Champions League temporada 2006/2007.",
    imagenes: ["img/AcMilan06-Visitante.jpg", "img/AcMilan06-Visitante-1.jpg"],
    tallas: ["S", "M", "L", "XL"],
    variantes: {
      manga: [
        { tipo: "Manga Corta", adicional: 0 },
        { tipo: "Manga Larga", adicional: 10000 }
      ],
      parches: [
        { tipo: "Sin parches", adicional: 0 },
        { tipo: "Edicion Champions League (Bordado de la final)", adicional: 0 },
        { tipo: "Parches Champions / Liga", adicional: 10000 }
      ]
    }
  },
];

// --------------------------------- VARIABLES GLOBALES --------------------------------- 
let carrito = [];
let total = 0;
let categoriaActual = 'todos';

let productoSeleccionadoTemp = null;
let opcionesSeleccionadas = { talla: '', manga: '', parches: '', nombreNumero: '' };

// --------------------------------- INICIALIZACIÓN --------------------------------- 
document.addEventListener("DOMContentLoaded", () => {
  renderizarCategorias();
  
  if (window.location.hash === "#entrega-inmediata") {
    filtrarCategoria("entrega-inmediata");
  } else {
    renderizarProductos(PRODUCTOS, "contenedor-productos");
  }
});

// --------------------------------- FUNCIONES DE RENDERIZADO --------------------------------- 
function renderizarCategorias() {
  const categoriasUnicas = [...new Set(PRODUCTOS.map(p => p.categoria))];
  const contenedor = document.getElementById("contenedor-categorias");
  if (!contenedor) return;
  
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

function renderizarProductos(productos, idContenedor = "contenedor-productos") {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  if (productos.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No se encontraron camisetas disponibles en esta sección.</p>`;
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
          
          ${(prod.entregaInmediata && prod.dorsalInmediato) ? `
            <p class="dorsal-destacado" style="color: #22c55e; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
              👕 Dorsal disponible: ${prod.dorsalInmediato}
            </p>
          ` : ''}

          ${prod.descripcion ? `<p class="descripcion-producto">${prod.descripcion}</p>` : ''}
          <div class="precio-producto">$ ${prod.precio.toLocaleString('es-CO')} COP</div>
        </div>
        
        <button class="btn-agregar" onclick="abrirModalOpciones(${prod.id})">
          + Personalizar y Agregar
        </button>
      </div>
    </div>
    `;
  }).join('');
}

// --------------------------------- MODAL DE OPCIONES DE PRODUCTO --------------------------------- 
function abrirModalOpciones(idProducto) {
  const prod = PRODUCTOS.find(p => p.id === idProducto);
  if (!prod) return;

  productoSeleccionadoTemp = prod;
  opcionesSeleccionadas = {
    talla: prod.tallas ? prod.tallas[0] : '',
    manga: prod.variantes?.manga ? prod.variantes.manga[0].tipo : '',
    parches: prod.variantes?.parches ? prod.variantes.parches[0].tipo : '',
    nombreNumero: ''
  };

  document.getElementById("modal-opt-titulo").innerText = prod.nombre;

  const contenedorBody = document.getElementById("modal-opt-body");
  contenedorBody.innerHTML = `
    <!-- ALERTA STOCK DESTACADO SI ES ENTREGA INMEDIATA -->
    ${prod.entregaInmediata ? `
      <div class="alerta-stock-modal">
        <span>⚡ <strong>DISPONIBLE PARA ENTREGA INMEDIATA:</strong></span>
        <p>Talla: <strong>${prod.tallasInmediatas ? prod.tallasInmediatas.join(', ') : 'L'}</strong> | Dorsal: <strong>${prod.dorsalInmediato || 'Sin estampado especificado'}</strong></p>
      </div>
    ` : ''}

    <!-- CHIPS DE TALLA -->
    ${prod.tallas ? `
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

    <!-- CAMPO NOMBRE Y NÚMERO DE JUGADOR -->
    <div class="campo-personalizacion-container">
      <label for="input-nombre-numero">Nombre y Número de Jugador (Opcional):</label>
      <input type="text" 
             id="input-nombre-numero" 
             placeholder="Ej: Messi 10" 
             oninput="opcionesSeleccionadas.nombreNumero = this.value">
      <small style="color: #64748b; font-size: 0.75rem; display: block; margin-top: 4px;">
        Déjalo en blanco si prefieres la camiseta sin dorsal estampado.
      </small>
    </div>

    <!-- CHIPS DE MANGA -->
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

    <!-- CHIPS DE PARCHES -->
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
  `;

  actualizarPrecioModal();

  const btnConfirmar = document.getElementById("btn-confirmar-opciones");
  btnConfirmar.onclick = () => {
    confirmarAgregarAlCarrito();
  };

  document.getElementById("modal-opciones-producto").classList.add("active");

  document.body.style.overflow = "hidden"; // Bloquea el fondo
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
  document.body.style.overflow = ""; // Restaura el scroll del fondo
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
    dorsalPersonalizado: dorsalIngresado,
    entregaInmediata: productoSeleccionadoTemp.entregaInmediata || false
  });

  actualizarCarrito();
  cerrarModalOpciones();
}

// --------------------------------- FILTROS Y BÚSQUEDA --------------------------------- 
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
    if (seccionInmediata) seccionInmediata.style.display = "block";
    if (seccionCatalogo) seccionCatalogo.style.display = "none";
    
    const productosStock = PRODUCTOS.filter(p => p.entregaInmediata === true);
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
    const coincideCategoria = (categoriaActual === 'todos') || (prod.categoria === categoriaActual);
    const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) || 
                          (prod.descripcion && prod.descripcion.toLowerCase().includes(textoBusqueda)) ||
                          prod.categoria.toLowerCase().includes(textoBusqueda);

    return coincideCategoria && coincideTexto;
  });

  renderizarProductos(resultados, "contenedor-productos");
}

// --------------------------------- MANEJO DE IMÁGENES --------------------------------- 
function cambiarImagenPrincipal(idProducto, nuevaUrl, elementoMiniatura) {
  const imgPrincipal = document.getElementById(`img-principal-${idProducto}`);
  if (imgPrincipal) {
    imgPrincipal.src = nuevaUrl;
  }
  
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
  document.body.style.overflow = "hidden"; // Bloquea el fondo
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.add("active");
}

function cerrarModalPedido() {
  const modal = document.getElementById("modal-pedido");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = ""; // Restaura el scroll del fondo
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
    fbq('track', 'Lead', {
      value: total,
      currency: 'COP'
    });
  }

  let mensaje = `👋 ¡Hola *${CONFIG.nombreTienda}*! Quisiera realizar el siguiente pedido:\n\n`;
  
  carrito.forEach((item, idx) => {
    let detalles = [];
    if (item.talla) detalles.push(`Talla: ${item.talla}`);
    if (item.dorsalPersonalizado) detalles.push(`Dorsal: ${item.dorsalPersonalizado}`);
    if (item.manga) detalles.push(item.manga);
    if (item.parches && item.parches !== "Sin parches") detalles.push(item.parches);
    
    const infoVariantes = detalles.length > 0 ? ` (${detalles.join(' | ')})` : '';
    const etiquetaInmediata = item.entregaInmediata ? ' ⚡ [ENTREGA INMEDIATA]' : '';

    mensaje += `*${idx + 1}.* ${item.nombre}${infoVariantes}${etiquetaInmediata} - $${item.precio.toLocaleString('es-CO')}\n`;
  });

  mensaje += `\n💵 *TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n\n`;
  mensaje += "📌 Quedo atento para confirmar disponibilidad de stock y datos de envío.";

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}