import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PLANTS } from '../graphql/queries';
import Footer from './footer';
import Search from '../pages/search';
import './css/plantcard.css';
import About from './aboutcard';
import Contact from './contact';

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
  // ...other mocks
];
interface PlantCardProps {
  onSearch?: (query: string) => void;
}

interface SearchPlantsData {
  searchPlants: Plant[];
}

interface SearchPlantsVars {
  query: string;
}

export default function PlantCard(_onSearch: PlantCardProps): JSX.Element {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Set up the useLazyQuery to search plants
  const [, { loading }] = useLazyQuery<SearchPlantsData, SearchPlantsVars>(SEARCH_PLANTS, {
    onCompleted: (data: SearchPlantsData) => {
      if (!data || data.searchPlants.length === 0) {
        setErrorMessage('No plants found');
        setPlants([]);
      } else {
        setErrorMessage('');
        setPlants(data.searchPlants);
      }
    },
    onError: () => {
      setErrorMessage('Error fetching plant');
      setPlants([]);
    },
  });

  // When the component mounts, it shows the plan of the day and checks login
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const index = dayOfYear % plantsMock.length;
    setPlants([plantsMock[index]]);

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  ///Logout - clears localStorage and returns to home
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Function that is called by SearchBar to search for plants

  return (
    <div className="plantcard-container">
      <Search />
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
              {plants.map((plant: Plant) => (
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