import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../pages/search';
import Favorite from '../pages/favorites';

typePlant = {
  image_url: string;
  common_name: string;
  scientific_name: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Plant[]>([]);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus !== 'true') {
      navigate('/login');
    } else {
      setIsLoggedIn(true);

      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [navigate]);



  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      <Search />

      {isLoggedIn ? (
        <>
          <h3>Your Favorites</h3>
          {favorites.length > 0 ? (
            <div className="favorites-list">
              {favorites.map((plant, index) => (
                <div key={index} className="favorite-card">
                  <img src={plant.image_url} alt={plant.common_name} />
                  <p><strong>{plant.common_name}</strong></p>
                  <p><em>{plant.scientific_name}</em></p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not added plants to your favorites yet.</p>
          )}

          {/* Example of using a favorite component, if you want to show a fixed card */}
          <Favorite
            plant={{
              id: 1,
              image_url: 'https://bs.plantnet.org/image/o/b07ad83adb571370a40982de0ec45248871486d6',
              common_name: 'Garden sorrel',
              scientific_name: 'Rumex acetosa',
            }}
          />
        </>
      ) : (
        <p>You are not logged in. Redirecting to login...</p>
      )}
    </div>
  );
}