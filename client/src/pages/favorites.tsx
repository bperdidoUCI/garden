import { useState } from 'react';
import axios from 'axios';

type Plant = {
  id: number; // o Trefle ID
  image_url: string;
  common_name: string;
  scientific_name: string;
};

type Props = {
  plant: Plant;
  addFavorite?: (plant: Plant) => void; // caso use contexto global
};

export default function Favorite({ plant }: Props) {
  const [isFavorited, setIsFavorited] = useState(false);  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');      await axios.post(
        '/api/favorites',
        {
          trefleId: plant.id,
          common_name: plant.common_name,
          scientific_name: plant.scientific_name,
          image_url: plant.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );      setIsFavorited(true);
      alert('Plant favorited!');
    } catch (err) {
      console.error(err);
      alert('Could not favorite');
    }
  };  return (
    <button onClick={handleFavorite}>
      {isFavorited ? ':broken_heart: Remove from Favorites' : ':heart: Add to Favorites'}
    </button>
  );
}

/*
import { useState } from 'react';

type Plant = {
    image_url: string;
    common_name: string;
    scientific_name: string;
};

export default function Favorite({ plant, addFavorite }: { plant: Plant; addFavorite: (plant: Plant) => void }) {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
        if (!isFavorited) {
            addFavorite(plant);
        }
    };

    return (
        <button onClick={handleFavoriteClick}>
            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}
*/
