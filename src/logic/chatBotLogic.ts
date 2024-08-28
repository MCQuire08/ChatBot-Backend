import prisma from '../models/prismaClient';

export const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('precio')) {
        const productNameFragment = lowerCaseMessage.replace('precio', '').trim();
        const words = productNameFragment.split(/\s+/);

        let product = null;
        for (const word of words) {
            product = await prisma.product.findFirst({
                where: {
                    name: {
                        contains: word,
                    },
                },
            });
            if (product) break;
        }

        if (product) {
            return `El precio del producto "${product.name}" es $${product.price.toFixed(2)}.`;
        } else {
            return `No se encontró ningún producto con el nombre que contiene "${productNameFragment}".`;
        }
    }

    const response = await prisma.response.findFirst({
        where: {
            trigger: {
                equals: lowerCaseMessage,
            },
        },
    });

    return response ? response.reply : "No estoy seguro de cómo responder a eso. ¿Podrías intentar preguntar de otra manera?";
};
