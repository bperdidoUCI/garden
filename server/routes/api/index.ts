import { jokeRouter } from './favoritesRoutes.js';
import express from 'express';
const router = express.Router();

router.use('/jokes', jokeRouter);

export default router;
