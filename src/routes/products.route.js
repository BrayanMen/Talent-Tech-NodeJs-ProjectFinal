import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, searchProductsByName } from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProductsByName)
router.post('/create', createProduct)
router.get('/:id', getProductById);
// router.put('/:id', );
// router.delete('/:id', );

export default router;
