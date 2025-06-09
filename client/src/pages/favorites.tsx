import { useState } from 'react';
import axios from 'axios';
import './css/loginsignup.css'

type Plant = {
  id: number;
  image_url: string;
  common_name: string;
  scientific_name: string;
};

type Props = {
  plant: Plant;
};

export default function Favorite({ plant }: Props) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        alert('You must be logged in to favorite a plant.');
        return;
      }

      const response = await axios.post(
        '/api/favorites',
        {
          id: plant.id, // Use id if backend expects this
          common_name: plant.common_name,
          scientific_name: plant.scientific_name,
          image_url: plant.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      setIsFavorited(true);
      alert('Plant favorited!');
    } catch (err) {
      console.error('Favorite error:', err);
      alert('Could not favorite');
    }
  };

  return (
    <button className='favorites' onClick={handleFavorite} disabled={isFavorited}>
      {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
    </button>
  );
}
