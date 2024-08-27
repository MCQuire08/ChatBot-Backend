import prisma from '../models/prismaClient';

interface CreateConversationData {
  userId: number;
}

export const createConversation = async (data: CreateConversationData) => {
  return await prisma.conversation.create({
    data: {
      userId: data.userId,
    },
    include: {
      messages: true,
    },
  });
};

interface CreateMessageData {
  conversationId: number;
  content: string;
  sender: 'user' | 'bot';
}

export const createMessage = async (data: CreateMessageData) => {
  return await prisma.message.create({
    data: {
      conversationId: data.conversationId,
      content: data.content,
      sender: data.sender,
    },
  });
};

export const getAllConversations = async () => {
  return await prisma.conversation.findMany({
    include: {
      messages: true,
      user: true,
    },
  });
};
