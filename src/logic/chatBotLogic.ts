import prisma from '../models/prismaClient';

export const getBotResponse = async (userMessage: string): Promise<string> => {
    const lowerCaseMessage = userMessage.toLowerCase();
  
    const response = await prisma.response.findFirst({
      where: {
        trigger: {
          equals: lowerCaseMessage, 
        },
      },
    });
  
    return response ? response.reply : "No estoy seguro de cómo responder a eso. ¿Podrías intentar preguntar de otra manera?";
  };
  