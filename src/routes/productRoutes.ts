import { Router } from 'express';
import { createProductController, getAllProductsController, deleteProductController } from '../controllers/productController';

const router = Router();

router.post('/', createProductController);
router.get('/', getAllProductsController);
router.delete('/:id',deleteProductController);

export default router;
