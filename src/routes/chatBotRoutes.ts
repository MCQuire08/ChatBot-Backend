import { Router } from 'express';
import { createMessageController, getAllConversationsController } from '../controllers/chatBotController';

const router = Router();

router.post('/messages', createMessageController);
router.get('/conversations', getAllConversationsController);

export default router;
