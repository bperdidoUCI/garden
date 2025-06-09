//index.ts
import favoritesRoutes from './favoritesRoutes.js';
import express from 'express';
const router = express.Router();
router.use('/jokes', favoritesRoutes);
export default router;