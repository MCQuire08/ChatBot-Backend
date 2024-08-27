import { Request, Response } from 'express';
import { createConversation, createMessage, getAllConversations } from '../services/chatBotService';

export const createConversationController = async (req: Request, res: Response) => {
  try {
    const newConversation = await createConversation(req.body);
    res.status(201).json(newConversation);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const newMessage = await createMessage(req.body);
    res.status(201).json(newMessage);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAllConversationsController = async (req: Request, res: Response) => {
  try {
    const conversations = await getAllConversations();
    res.status(200).json(conversations);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};
