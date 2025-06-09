//favoritesRoutes.ts
import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../../controllers/favoriteController.js';
import { authMiddleware } from '../../utils/auth.js';
const router = Router(); router.post('/', authMiddleware, addFavorite);
router.get('/', authMiddleware, getFavorites);
router.delete('/:trefleId', authMiddleware, removeFavorite);
export default router;