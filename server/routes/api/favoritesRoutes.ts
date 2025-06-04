import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoritesController';
import { authMiddleware } from '../utils/auth'; // Adjust the path as necessary

const router = Router();router.post('/', authMiddleware, addFavorite);
router.get('/', authMiddleware, getFavorites);
router.delete('/:trefleId', authMiddleware, removeFavorite);

export default router;
