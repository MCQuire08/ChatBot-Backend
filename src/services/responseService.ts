import prisma from '../models/prismaClient';

interface CreateResponseData {
  trigger: string;
  reply: string;
}

export const findResponseByTrigger = async (trigger: string) => {
    try {
        const responses = await prisma.response.findMany({
            where: {
                trigger: {
                    contains: trigger,
                }
            }
        });

        const filteredResponses = responses.filter(response => 
            response.trigger.toLowerCase().includes(trigger.toLowerCase())
        );

        return filteredResponses.length > 0 ? filteredResponses[0] : null;
    } catch (error) {
        console.error('Error fetching response:', error);
        throw error;
    }
};
export const createResponse = async (data: CreateResponseData) => {
  try {
    const newResponse = await prisma.response.create({
      data: {
        trigger: data.trigger,
        reply: data.reply,
      },
    });
    return newResponse;
  } catch (error) {
    console.error('Error creating response:', error);
    throw new Error('Failed to create response');
  }
};

export const getAllResponses = async () => {
  try {
    const responses = await prisma.response.findMany();
    return responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw new Error('Failed to fetch responses');
  }
};

export const deleteResponse = async (id: number) => {
  try {
    await prisma.response.delete({
      where: { id },
    });
    return { message: 'Response deleted successfully' };
  } catch (error) {
    console.error('Error deleting response:', error);
    throw new Error('Failed to delete response');
  }
};
