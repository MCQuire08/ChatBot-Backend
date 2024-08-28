import { Router } from 'express';
import { clearConversationMessagesController, createMessageController, getAllConversationsController, } from '../controllers/chatBotController';

const router = Router();

router.post('/messages', createMessageController);
router.get('/conversations', getAllConversationsController);
router.delete('/conversations/clean',clearConversationMessagesController)

export default router;
