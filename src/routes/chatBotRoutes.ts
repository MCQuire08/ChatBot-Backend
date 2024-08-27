import { Router } from 'express';
import { createConversationController, createMessageController, getAllConversationsController } from '../controllers/chatBotController';

const router = Router();

router.post('/conversations', createConversationController);
router.post('/messages', createMessageController);
router.get('/conversations', getAllConversationsController);

export default router;
