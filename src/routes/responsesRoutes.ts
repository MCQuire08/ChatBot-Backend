import { Router } from 'express';
import { createResponseController, getAllResponsesController, deleteResponseController } from '../controllers/responseController';

const router = Router();

router.post('/', createResponseController);
router.get('/', getAllResponsesController);
router.delete('/:id', deleteResponseController);

export default router;
