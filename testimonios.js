// ==========================================================================
// TESTIMONIOS DE CLIENTES
// ==========================================================================
// Este sitio no tiene backend, así que las reseñas NO se publican solas:
// tú las agregas aquí a mano después de que un cliente te las comparta.
//
// ⚠️ IMPORTANTE: agrega solo reseñas reales de clientes reales. Publicar
// testimonios inventados es publicidad engañosa (puede meterte en problemas
// con la Superintendencia de Industria y Comercio) y, si se descubre, daña
// la confianza mucho más de lo que la ayuda.
//
// Cómo agregar una reseña nueva:
// 1. El botón "Danos tu opinión" de la sección de testimonios (y el que
//    aparece en la barra superior) le abre al cliente un WhatsApp dirigido
//    a ti con un mensaje ya escrito.
// 2. Cuando te responda con su comentario, copia sus palabras (puedes
//    resumir un poco, pero no inventes ni exageres) y agrega un objeto
//    nuevo al arreglo TESTIMONIOS de abajo, siguiendo el mismo formato.
// 3. "calificacion" va de 1 a 5. "producto" e "imagenes" son opcionales.
// 4. Si el cliente te mandó fotos de la camiseta puesta, guarda esas fotos
//    en la carpeta img/ (ej. img/resena-andres-1.jpg) y ponlas en el campo
//    "imagenes". Se muestran como miniaturas debajo del comentario, y
//    cualquiera que navegue el sitio puede ampliarlas en grande con un clic.
//
// Ejemplo de cómo se ve un objeto completo (bórralo o edítalo, no lo dejes
// como reseña real):
// {
//   nombre: "Andrés G.",
//   ciudad: "Medellín",
//   calificacion: 5,
//   comentario: "Me llegó justo a tiempo para el partido, la talla quedó perfecta.",
//   producto: "Argentina 2006 Local",
//   imagenes: ["img/resena-andres-1.jpg", "img/resena-andres-2.jpg"]
// }

const TESTIMONIOS = [
  {
    nombre: "Tomas A.",
    ciudad: "Medellin",
    calificacion: 5,
    comentario: "La calidad está increible; me sorprendió lo bien logrados que están los estampados. Muchas gracias!",
    producto: "AC Milan 2006 - Bordado de Champions League",
    imagenes: ["img/resena1.jpeg"]
  }
];