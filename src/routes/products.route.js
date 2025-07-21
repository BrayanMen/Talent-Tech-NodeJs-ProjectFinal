import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    searchProductsByName,
    updateProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProductsByName);
router.post('/create', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
