import './css/plantcard.css';
import plantIcon from '../assets/plantIcon.png';
import { useState, useEffect } from 'react';

type Plant = {
    image_url: string;
    common_name: string;
    scientific_name: string;
};

const plantsMock: Plant[] = [
    {
        image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/80b59a9439a2a520227f8a45e9c6b1ae.jpg', // Epacris corymbiflora
        common_name: 'Epacris Corymbiflora',
        scientific_name: 'Epacris corymbiflora',
    },
    {
        image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg', // Entandrophragma candollei
        common_name: 'Entandrophragma Candollei',
        scientific_name: 'Entandrophragma candollei',
    },
    {
        image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg', // Entandrophragma excelsum (mesma imagem por falta de outra)
        common_name: 'Entandrophragma Excelsum',
        scientific_name: 'Entandrophragma excelsum',
    },
    {
        image_url: 'https://d2seqvvyy3b8p2.cloudfront.net/03ae84e4f42b9a1e66c914db3728e57c.jpg', // Hypoxis aurea
        common_name: 'Hypoxis Aurea',
        scientific_name: 'Hypoxis aurea',
    },
];

export default function PlantCard() {
    const [plants, setPlants] = useState<Plant[]>([]); 

    // search query state and error message
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
        // Alterando a URL para a rota do servidor Express
        const response = await fetch(
            `/api/search-plants?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();

        console.log('API Response:', data);  // Verifique a resposta aqui

        if (data.data && data.data.length > 0) {
            setPlants(data.data.map((plant: any) => ({
                image_url: plant.image_url || '',
                common_name: plant.common_name || plant.scientific_name,
                scientific_name: plant.scientific_name,
            })));
            setErrorMessage('');
        } else {
            setPlants([]);
            setErrorMessage('No plants found.');
        }
    } catch (error) {
        console.error('Search error:', error);
        setPlants([]);
        setErrorMessage('Error occurred while fetching data.');
    }
};


    useEffect(() => {
        const today = new Date();
        const dayOfYear =
            Math.floor(
                (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
                (1000 * 60 * 60 * 24)
            );

        const index = dayOfYear % plantsMock.length;
        const selectedPlant = plantsMock[index];

        setPlants([selectedPlant]); // Exibe apenas a planta do dia
    }, []);

    return (
        <div className="plantcard-container">
            <header className="app-header">
                <h1 className="title-header">
                    <img src={plantIcon} alt="Plant" className="plant-icon" />
                    Seedsmart 🌿
                </h1>
            </header>

            <nav className="app-nav">
                <ul className="nav-list">
                    <li>
                        <a className="nav-link" href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="/about">
                            About
                        </a>
                    </li>
                    <li>
                        <a className="nav-link" href="/contact">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
            
            {/* search form */}
            <div>
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Enter scientific name..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            <main className="app-main">
                <section className="plant-section">
                    <h2 className="tittle-main1">🌱 Plant of the Day</h2>
                    {errorMessage && <p>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
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

            <footer className="app-footer">
                <p>&copy; 2025 Plant Card. All rights reserved.</p>
            </footer>
        </div>
    );
}
