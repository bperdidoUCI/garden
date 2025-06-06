
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTANTE
import Footer from './footer';
import SearchBar from './searchbar';
import './css/plantcard.css';

type Plant = {
  image_url: string;
  common_name: string;
  scientific_name: string;
};
const plantsMock: Plant[] = [
  {
    image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/80b59a9439a2a520227f8a45e9c6b1ae.jpg',
    common_name: 'Epacris Corymbiflora',
    scientific_name: 'Epacris corymbiflora',
  },
  {
    image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg',
    common_name: 'Entandrophragma Candollei',
    scientific_name: 'Entandrophragma candollei',
  },
  {
    image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg',
    common_name: 'Entandrophragma Excelsum',
    scientific_name: 'Entandrophragma excelsum',
  },
  {
    image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/03ae84e4f42b9a1e66c914db3728e57c.jpg',
    common_name: 'Hypoxis Aurea',
    scientific_name: 'Hypoxis aurea',
  },
];
export default function PlantCard() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
    );
    const index = dayOfYear % plantsMock.length;
    const selectedPlant = plantsMock[index];
    setPlants([selectedPlant]);
    // Checa se o usuário está logado via localStorage
    const logged = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(logged === 'true');
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };
  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/plants?q=${query}`);
      if (!response.ok) {
        throw new Error('Error in request');
      }
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage('No plants found');
      } else {
        setErrorMessage('');
      }
      setPlants(data);
    } catch (error) {
      setErrorMessage('Error fetching plant');
      console.error(error);
    }
  };
  return (
    <div className="plantcard-container">
      <SearchBar onSearch={handleSearch} />
      <header className="app-header header1">
        <div className="header-content1">
          <h4 className="title-header1">Save your Favorites Searches :heart_eyes:</h4>
        </div>
        {!isLoggedIn ? (
          <div>
            <button className="auth-button" onClick={() => navigate('/login')}>Login</button>
            <button className="auth-button" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        ) : (
          <div>
            <button className="auth-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      <main className="app-main">
        <section className="plant-section">
          <h2 className="title-main1">:seedling: Plant of the Day</h2>
          {errorMessage && <p>{errorMessage}</p>}
          {plants.length === 0 ? (
            <p>No plants found or error occurred.</p>
          ) : (
            <div className="plant-card">
              {plants.map((plant, index) => (
                <div key={index} className="plant-content">
                  <img
                    src={plant.image_url}
                    alt={plant.common_name}
                    className="plant-image"
                  />
                  <p className="plant-name">
                    <strong>{plant.common_name}</strong>
                  </p>
                </div>
              ))}
              <p className="plant-scientific-name">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}