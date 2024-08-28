import { Request, Response } from 'express';
import { createMessage, getUserConversation,clearConversationMessages } from '../services/chatBotService';

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const result = await createMessage(req.body);
    res.status(201).json(result);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAllConversationsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const conversations = await getUserConversation();
    res.status(200).json(conversations);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};

export const clearConversationMessagesController = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const result = await clearConversationMessages();
    res.status(200).json(result);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};