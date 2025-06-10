import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PLANTS } from '../graphql/queries';
import Footer from '../components/footer';
// import Search from '../search';
import Search from '../pages/search';
import About from '../components/aboutcard';
import Contact from '../components/contact';
import './css/plantcard.css';

type Plant = {
  id: string;
  image_url: string;
  common_name: string;
  scientific_name: string;
};

const plantsMock: Plant[] = [
  {
    id: '1',
    image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/80b59a9439a2a520227f8a45e9c6b1ae.jpg',
    common_name: 'Epacris Corymbiflora',
    scientific_name: 'Epacris corymbiflora',
  },
];

export default function PlantCard() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [searchPlants, { data, loading, error }] = useLazyQuery(SEARCH_PLANTS);

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const index = dayOfYear % plantsMock.length;
    setPlants([plantsMock[index]]);

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    if (data?.searchPlants) {
      if (data.searchPlants.length === 0) {
        setErrorMessage('No plants found');
        setPlants([]);
      } else {
        setErrorMessage('');
        setPlants(data.searchPlants);
      }
    }
    if (error) {
      setErrorMessage('Error fetching plant');
      setPlants([]);
    }
  }, [data, error]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearch = useCallback((query: string) => {
  searchPlants({ variables: { query } });
}, [searchPlants]);

  return (
    <div className="plantcard-container">
      <Search onSearch={handleSearch} />
      <header className="app-header header1">
        <div className="header-content1">
          <h4 className="title-header1">Save your Favorites Searches 😍</h4>
        </div>

        {!isLoggedIn ? (
          <>
            <button className="auth-button" onClick={() => navigate('/login')}>Login</button>
            <button className="auth-button" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        ) : (
          <button className="auth-button" onClick={handleLogout}>Logout</button>
        )}
      </header>

      <main className="app-main">
        <section className="plant-section">
          <h2 className="title-main1">{loading ? '🔍 Searching...' : '🌱 Plant of the Day'}</h2>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {plants.length === 0 && !loading ? (
            <p>No plants found or error occurred.</p>
          ) : (
            <div className="plant-card">
              {plants.map((plant) => (
                <div key={plant.id} className="plant-content">
                  <img src={plant.image_url} alt={plant.common_name} className="plant-image" />
                  <p className="plant-name"><strong>{plant.common_name}</strong></p>
                  <p className="plant-scientific-name"><em>{plant.scientific_name}</em></p>
                </div>
              ))}
              {!loading && plants.length > 0 && (
                <p className="plant-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                </p>
              )}
            </div>
          )}
        </section>
      </main>
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

