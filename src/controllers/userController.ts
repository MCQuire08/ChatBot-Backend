import { Request, Response } from 'express';
import { createUser as createUserService, getAllUsers } from '../services/userService';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
};
