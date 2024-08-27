import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUserController);
router.get('/',userController.getAllUsersController);

export default router;
