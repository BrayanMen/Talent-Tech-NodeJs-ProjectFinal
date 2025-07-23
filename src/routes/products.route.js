import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    searchProductsByName,
    updateProduct,
} from '../controllers/products.controller.js';
import { authenticate, authRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProductsByName);
router.get('/:id', getProductById);

router.post('/create', authenticate, authRole(['admin']), createProduct);
router.put('/:id', authenticate, authRole(['admin']), updateProduct);
router.delete('/:id', authenticate, authRole(['admin']), deleteProduct);

export default router;
