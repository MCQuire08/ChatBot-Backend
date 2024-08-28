import { Request, Response } from 'express';
import { createResponse, getAllResponses, deleteResponse } from '../services/responseService';

export const createResponseController = async (req: Request, res: Response) => {
  try {
    const { trigger, reply } = req.body;
    const newResponse = await createResponse({ trigger, reply });
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create response' });
  }
};

export const getAllResponsesController = async (req: Request, res: Response) => {
  try {
    const responses = await getAllResponses();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

export const deleteResponseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteResponse(Number(id));
    res.status(200).json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete response' });
  }
};
