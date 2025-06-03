import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://trefle.io/api/v1';
const TOKEN = process.env.TREFLE_TOKEN;

export const searchPlants = async (query: string) => {
  const response = await fetch(`${BASE_URL}/plants/search?token=${TOKEN}&q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data.map((plant: any) => ({
    id: plant.id,
    common_name: plant.common_name,
    scientific_name: plant.scientific_name,
    image_url: plant.image_url,
  }));
};