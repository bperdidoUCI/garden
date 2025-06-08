import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://trefle.io/api/v1';
const TOKEN = process.env.TREFLE_TOKEN;

export const searchPlants = async (query: string) => {
  const url = `${BASE_URL}/species/search?token=${TOKEN}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error(`Trefle API Error ${response.status}:`, text);
      throw new Error(`Trefle API Error ${response.status}: ${text}`);
    }

    const data = await response.json();

    return data.data.map((plant: any) => ({
      id: plant.id,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      image_url: plant.image_url,
    }));
  } catch (error) {
    console.error('Trefle API fetch error:', error);
    throw new Error('Failed to fetch plants. Please try again later.');
  }
};








// import fetch from 'node-fetch';
// import dotenv from 'dotenv';
// dotenv.config();

// const BASE_URL = 'https://trefle.io/api/v1';
// const TOKEN = process.env.TREFLE_TOKEN;

// export const searchPlants = async (query: string) => {
//   const url = `${BASE_URL}/plants/search?token=${TOKEN}&q=${encodeURIComponent(query)}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Trefle API Error ${response.status}: ${errorText}`);
//     }

//     const json = await response.json();

//     if (!json.data) {
//       throw new Error('No data field in Trefle response');
//     }

//     return json.data.map((plant: any) => ({
//       id: plant.id,
//       common_name: plant.common_name,
//       scientific_name: plant.scientific_name,
//       image_url: plant.image_url,
//     }));
//   } catch (error) {
//     console.error('Trefle API fetch error:', error);
//     throw new Error('Failed to fetch plants. Please try again later.');
//   }
// };
