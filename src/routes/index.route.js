import { Router } from 'express';
import routesProducts from './products.route.js'

const router = Router();

router.use('/api/products', routesProducts)


router.get('/', (req, res) => {
  res.json({
    message: 'Talento Tech NodeJS Proyecto Final',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      auth: '/auth/login'
    }
  });
});

export default router;
