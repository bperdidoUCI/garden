import './css/plantcard.css';
import { useState, useEffect } from 'react';
import Footer from './footer';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // To handle login state

  useEffect(() => {
    const today = new Date();
    const dayOfYear =
      Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
      );

    const index = dayOfYear % plantsMock.length;
    const selectedPlant = plantsMock[index];

    setPlants([selectedPlant]);
  }, []);

  // Toggle login state (just for demonstration)
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="plantcard-container">
      <header className="app-header header1">
        <div className='header-content1'>
          <h4 className="title-header1">Save your Favorites Searches 😍 </h4>
        </div>

        {/* Conditional rendering for login and sign-up buttons */}
        {!isLoggedIn ? (
          <div>
            <button className="auth-button" onClick={handleLogin}>Login</button>
            <button className="auth-button" onClick={handleLogin}>Sign Up</button>
          </div>
        ) : (
          <div>
            <button className="auth-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main className="app-main">
        <section className="plant-section">
          <h2 className="title-main1">🌱 Plant of the Day</h2>
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
              <p className="plant-scientific-name">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
