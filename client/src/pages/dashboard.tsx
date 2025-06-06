// Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Favorito from '../pages/favorites'; 

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
      navigate('/login'); // Se não estiver logado, redireciona para o login
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const addFavorite = (plant: Plant) => {
    const updatedFavorites = [...favoritos, plant];
    setFavoritos(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="dashboard-container">
      <h2>Bem-vindo ao seu Dashboard</h2>
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
          {/* Exemplo de lista de plantas para favoritar */}
          {/* Substitua o objeto abaixo por um plant real conforme necessário */}
          {/* Exemplo de planta para favoritar */}
          <Favorito
            plant={{
              id: 1,
              image_url: 'https://via.placeholder.com/150',
              common_name: 'Planta Exemplo',
              scientific_name: 'Plantae exemplum'
            }}
            addFavorite={addFavorite}
          />
        </>
      ) : (
        <p>Você não está logado!</p>
      )}
    </div>
  );
}
