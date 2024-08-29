import prisma from '../models/prismaClient';

const normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const removeStopWords = (text: string): string => {
    const stopWords = ['del', 'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'cual', 'es', 'que', 'tipo', 'productos', 'hay', 'en'];
    return text.split(/\s+/).filter(word => !stopWords.includes(word)).join(' ');
};

const formatPrice = (price: number): string => {
    const formattedPrice = price.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formattedPrice.replace('.', ':');
};

export const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerCaseMessage = normalizeText(userMessage);

    if (lowerCaseMessage.includes('precio')) {
        let productNameFragment = lowerCaseMessage.replace(/.*precio\s*/, '').trim();
        productNameFragment = removeStopWords(productNameFragment.replace(/[^\w\s]/gi, ''));

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: productNameFragment,
                },
            },
        });

        if (products.length > 0) {
            const product = products[0];
            return `El precio del producto "${product.name}" es: ₡${formatPrice(product.price)}.`;
        } else {
            return `No se encontró ningún producto con el nombre que contiene "${productNameFragment}".`;
        }
    } 
    else if (lowerCaseMessage.includes('tienen')) {
        let categoryFragment = lowerCaseMessage.replace(/.*tienen\s*/, '').trim();
        categoryFragment = removeStopWords(categoryFragment.replace(/[^\w\s]/gi, ''));

        if (categoryFragment === '') {
            return "Por favor, especifica la categoría que deseas consultar.";
        }

        const products = await prisma.product.findMany({
            where: {
                category: {
                    contains: categoryFragment,
                },
                stock: {
                    gt: 0,
                },
            },
        });

        if (products.length > 0) {
            const productList = products.map(product => product.name).join(', ');
            return `Los productos disponibles en la categoría "${categoryFragment}" son: ${productList}.`;
        } else {
            return `No se encontraron productos disponibles en la categoría "${categoryFragment}".`;
        }
    } 
    else if (lowerCaseMessage.includes('cuales son las categorias')) {
        const categories = await prisma.product.findMany({
            select: {
                category: true,
            },
            distinct: ['category'],
        });

        if (categories.length > 0) {
            const categoryList = categories.map(category => category.category).join(', ');
            return `Las categorías disponibles son: ${categoryList}.`;
        } else {
            return "No se encontraron categorías disponibles.";
        }
    } 
    else if (lowerCaseMessage.includes('que productos hay en') || lowerCaseMessage.includes('que hay en')) {
        let categoryNameFragment = lowerCaseMessage.replace(/.*(que productos hay en|que hay en)\s*/, '').trim();
        categoryNameFragment = normalizeText(removeStopWords(categoryNameFragment.replace(/[^\w\s]/gi, '')));

        if (categoryNameFragment === '') {
            return "Por favor, especifica la categoría que deseas consultar.";
        }

        const products = await prisma.product.findMany({
            where: {
                category: {
                    contains: categoryNameFragment,
                },
                stock: {
                    gt: 0,
                },
            },
        });

        if (products.length > 0) {
            const productList = products.map(product => product.name).join(', ');
            return `Los productos disponibles en la categoría "${categoryNameFragment}" son: ${productList}.`;
        } else {
            return `No se encontraron productos disponibles en la categoría "${categoryNameFragment}".`;
        }
    }

    const response = await prisma.response.findFirst({
        where: {
            trigger: lowerCaseMessage,
        },
    });

    return response ? response.reply : "No estoy seguro de cómo responder a eso. ¿Podrías intentar preguntar de otra manera?";
};
