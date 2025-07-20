import { Router } from 'express';
import routesProducts from './products.route.js'

const router = Router();

router.use('/api/products', routesProducts)

export default router;
