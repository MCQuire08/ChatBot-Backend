import prisma from '../src/models/prismaClient';

async function main() {
  await prisma.response.deleteMany({});
  await prisma.product.deleteMany({});

  await prisma.response.createMany({
    data: [
      { trigger: 'hola', reply: 'Hola, ¿en qué puedo ayudarte el día de hoy?' },
      { trigger: 'ayuda', reply: '¡Estoy aquí para ayudarte! ¿Con qué necesitas asistencia?' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Laptop', description: 'High-end laptop', price: 999.99, stock: 10, category: 'Electronics' },
      { name: 'Phone', description: 'Latest smartphone', price: 699.99, stock: 15, category: 'Electronics' },
    ],
  });
}

export default main;
