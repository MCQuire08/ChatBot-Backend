import { Request, Response } from 'express';
import { createProduct, getAllProducts, deleteProduct } from '../services/productsService';

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const newProduct = await createProduct({ name, description, price, category, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
