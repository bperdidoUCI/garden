// Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchbar';
import Favorite from '../pages/favorites';

type Plant = {
  image_url: string;
  common_name: string;
  scientific_name: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [favoritos, setFavoritos] = useState<Plant[]>([]);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus !== 'true') {
      navigate('/login');
      // If not logged in, redirect to login
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const addFavorite = (plant: Plant) => {
    const updatedFavorites = [...favoritos, plant];
    setFavoritos(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  function setSearchTerm(_query: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="dashboard-container">
      <h2>Bem-vindo ao seu Dashboard</h2>
      <SearchBar onSearch={setSearchTerm} />
      {isLoggedIn ? (
        <>
          <h3>Seus Favoritos</h3>
          <div className="favoritos-list">
            {favoritos.map((plant, index) => (
              <div key={index}>
                <img src={plant.image_url} alt={plant.common_name} />
                <p>{plant.common_name}</p>
              </div>
            ))}
          </div>
          <Favorite
            plant={{
              id: 1,
              image_url: 'https://bs.plantnet.org/image/o/b07ad83adb571370a40982de0ec45248871486d6',
              common_name: 'Garden sorrel',
              scientific_name: 'Rumex acetosa'
            }}
            addFavorite={addFavorite}
          />
        </>
      ) : (
        <p>You are logged!</p>
      )}
    </div>
  );
}
