import { Router } from 'express';
import {
    changePassword,
    deleteProfile,
    getAllUsers,
    getProfileUser,
    updateUser,
    updateWishlist,
} from '../controllers/users.controller.js';
import { authenticate, authRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, authRole(['admin']), getAllUsers);
router.get('/profile', authenticate, getProfileUser);
router.put('/profile/update', authenticate, updateUser);
router.delete('/profile', authenticate, deleteProfile);
router.patch('/change-password', authenticate, changePassword);
router.patch('/wishlist', authenticate, updateWishlist);

export default router;
