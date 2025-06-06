import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }
  try {
    const response = await fetch(
      `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_API_KEY}&q=${query}`
    );
    const data = await response.json();
    const simplifiedData = data.data.map((plant: { image_url: any; common_name: any; scientific_name: any; }) => ({
      image_url: plant.image_url,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
    }));
    res.json(simplifiedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Trefle' });
  }
});
export default router;