import prisma from '../src/models/prismaClient';

async function main() {
  await prisma.response.deleteMany({});
  await prisma.product.deleteMany({});

  await prisma.response.createMany({
    data: [
      { trigger: 'hola', reply: 'Hola, ¿en qué puedo ayudarte el día de hoy?' },
      {
        trigger: 'ayuda',
        reply: `¡Hola! Puedes preguntar al chatbot:\n
Precio de un producto: 'Precio [nombre del producto].'\n
Productos en una categoría: 'Tienen [nombre de la categoría].'\n
Categorías disponibles: '¿Cuáles son las categorías?'\n
Tipo de productos en una categoría: '¿Qué productos hay en [nombre de la categoría]?\n\n
¡Espero que esto te ayude!'`
      },
      {
        trigger: 'ubicacion',
        reply: `Nuestra tienda está ubicada en: Avenida Central, San José, Costa Rica.\n
Puedes visitarnos de lunes a sábado de 10:00 a 18:00.`
      },
      {
        trigger: 'horario',
        reply: `Nuestro horario de atención es de lunes a sábado de 10:00 a 18:00.\n
Estamos cerrados los domingos.`
      },
      {
        trigger: 'contacto',
        reply: `Puedes contactarnos al teléfono: +506 1234 5678.\n
O enviarnos un correo electrónico a: contacto@tiendagaming.cr`
      },
      {
        trigger: 'informacion',
        reply: `Somos una tienda especializada en artículos gaming, incluyendo laptops, celulares, monitores, mouse, teclados y headsets.\n
Ofrecemos productos de las mejores marcas con garantía y servicio al cliente de calidad.`
      },
      {
        trigger: 'devoluciones',
        reply: `Si necesitas devolver un producto, por favor, contacta a nuestro servicio de atención al cliente.\n
Asegúrate de tener el recibo de compra y el producto en su estado original.`
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Lenovo LOQ 15AHP9', description: 'Ryzen 7 8845HS - RTX 4060', price: 799000, stock: 10, category: 'Laptop' },
      { name: 'Asus TUF A15', description: 'Ryzen 7 7735HS - RTX 4050', price: 699000, stock: 5, category: 'Laptop' },
      { name: 'HP Victus 15', description: 'Ryzen 7 8845HS- RTX 4050-16gb-144hz', price: 699000, stock: 3, category: 'Laptop' },

      { name: 'IPhone 15', description: 'APPLE IPHONE 15 128GB', price: 499900, stock: 15, category: 'Celulares' },
      { name: 'IPhone 15 Pro Max', description: 'APPLE IPHONE 15 PRO MAX 512GB', price: 879900, stock: 7, category: 'Celulares' },

      { name: 'Samsung Odyssey Ark', description: '55" - 4K - 165 Hz - Quantum Mini LED', price: 1275000, stock: 12, category: 'Monitores' },
      { name: 'Acer Predator OLED X34', description: '34" - 175Hz', price: 619000, stock: 8, category: 'Monitores' },

      { name: 'Razer Cobra', description: 'Razer Cobra', price: 19900, stock: 25, category: 'Mouse' },
      { name: 'Razer Basilisk V3 Pro', description: 'Razer Basilisk V3 Pro', price: 71900, stock: 20, category: 'Mouse' },

      { name: 'Razer Ornata', description: 'V3X Ingles', price: 17900, stock: 15, category: 'Teclados' },
      { name: 'Razer Blackwidow V3', description: 'Switch Green', price: 62000, stock: 18, category: 'Teclados' },

      { name: 'Razer Kaira X', description: 'Xbox- Azul/Negro', price: 26000, stock: 13, category: 'Headset' },
      { name: 'Razer Kraken ', description: 'V3 hypersense', price: 59000, stock: 10, category: 'Headset' },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

export default main;
