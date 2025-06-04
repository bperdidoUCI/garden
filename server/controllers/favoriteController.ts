import Favorite from '../models/favorite';
import { Request, Response } from 'express';

export const addFavorite = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { trefleId, common_name, scientific_name, image_url } = req.body;  const exists = await Favorite.findOne({ user: userId, trefleId });
  if (exists) return res.status(409).json({ message: 'Already favorited' });  const favorite = await Favorite.create({
    user: userId,
    trefleId,
    common_name,
    scientific_name,
    image_url,
  });  res.status(201).json(favorite);
};

export const removeFavorite = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { trefleId } = req.params;  await Favorite.findOneAndDelete({ user: userId, trefleId });
  res.status(204).send();
};

export const getFavorites = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;  const favorites = await Favorite.find({ user: userId });
  res.json(favorites);
};
