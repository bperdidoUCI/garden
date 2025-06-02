// Favorite.tsx
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