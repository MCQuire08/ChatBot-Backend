import { Request, Response } from 'express';
import { createMessage, getUserConversation } from '../services/chatBotService';

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

    const conversations = await getUserConversation(userId);
    res.status(200).json(conversations);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};