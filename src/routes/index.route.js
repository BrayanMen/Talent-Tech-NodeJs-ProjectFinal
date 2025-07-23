import { Router } from 'express';
import routesProducts from './products.route.js'
import routesUsers from './users.route.js'
import routesAuth from './auth.route.js'

const router = Router();

router.use('/api/products', routesProducts)
router.use('/api/users', routesUsers)
router.use('/auth', routesAuth)


router.get('/', (req, res) => {
  res.json({
    message: 'Talento Tech NodeJS Proyecto Final',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      users: '/api/users',
      auth: '/auth/login || register'
    }
  });
});

export default router;
