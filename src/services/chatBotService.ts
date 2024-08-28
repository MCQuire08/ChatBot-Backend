import prisma from '../models/prismaClient';
import { getBotResponse } from '../logic/chatBotLogic';

interface CreateMessageData {
  conversationId: number;
  content: string;
  sender: 'user' | 'bot';
}

export const getUserConversation = async (userId: string) => {
  let conversation = await prisma.conversation.findFirst({
    where: {
      userId: 1,
    },
    include: {
      messages: true,
      user: true,
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId: 1,
      },
      include: {
        messages: true,
        user: true,
      },
    });
  }

  return conversation;
};

export const createMessage = async (data: CreateMessageData) => {
  const userMessage = await prisma.message.create({
    data: {
      conversationId: data.conversationId,
      content: data.content,
      sender: data.sender,
    },
  });

  let botResponse: string | null = null;

  if (data.sender === 'user') {
    botResponse = getBotResponse(data.content);

    await prisma.message.create({
      data: {
        conversationId: data.conversationId,
        content: botResponse,
        sender: 'bot',
      },
    });
  }

  return {
    userMessage,
    botResponse: botResponse || null,
  };
};
