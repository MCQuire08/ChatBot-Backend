import prisma from '../models/prismaClient';
import { getBotResponse } from '../logic/chatBotLogic';

interface CreateMessageData {
  content: string;
  sender: 'user' | 'bot';
}

const FIXED_USER_ID = 1;
const FIXED_CONVERSATION_ID = 1;

export const getUserConversation = async () => {
  let conversation = await prisma.conversation.findFirst({
    where: {
      id: FIXED_CONVERSATION_ID,
    },
    include: {
      messages: true,
      user: true,
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId: FIXED_USER_ID,
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
      conversationId: FIXED_CONVERSATION_ID,
      content: data.content,
      sender: data.sender,
    },
  });

  let botResponse: string | null = null;

  if (data.sender === 'user') {
    botResponse = await getBotResponse(data.content);

    await prisma.message.create({
      data: {
        conversationId: FIXED_CONVERSATION_ID,
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

export const clearConversationMessages = async () => {
  try {
    await prisma.message.deleteMany({
      where: {
        conversationId: FIXED_CONVERSATION_ID,
      },
    });

    return { message: 'Conversation messages cleared successfully.' };
  } catch (error) {
    console.error('Error clearing conversation messages:', error);
    throw new Error('Error clearing conversation messages');
  }
};
