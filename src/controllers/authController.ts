import { Request, Response } from 'express';
import { loginUser } from '../services/authService';

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
