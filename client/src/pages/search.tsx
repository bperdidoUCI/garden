import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import SearchBar from '../components/searchbar';
import Favorite from "./favorites";

type Plant = {
  id?: number | string;
  image_url?: string;
  common_name?: string;
  scientific_name?: string;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [results, setResults] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setResults([]);
      return;
    }

    const fetchPlants = async () => {
      setIsLoading(true);
      const baseUrl = 'https://trefle.io/api/v1/plants';
      const token = 'I7bUYTZqpBy8LYkKDDBE9VIFXQy7ta7HM5kALBqgBvI';
      const pageSize = 100;
      let page = 1;
      let allResults: Plant[] = [];
      let keepFetching = true;

      while (keepFetching) {
        const query = `?token=${token}&q=${debouncedSearchTerm}&page_size=${pageSize}&page=${page}`;
        const fullUrl = `${baseUrl}${query}`;
        const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(fullUrl);

        try {
          const response = await fetch(proxyUrl);
          const data = await response.json();

          const pageResults = data.data || [];
          allResults = [...allResults, ...pageResults];

          if (!data.meta?.next) {
            keepFetching = false;
          } else {
            page++;
          }
        } catch (error) {
          console.error("Error to search data:", error);
          keepFetching = false;
        }
      }

      const filteredResults = allResults.filter(plant =>
        plant.common_name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      setResults(filteredResults);
      setIsLoading(false);
    };

    fetchPlants();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h1 className="title-search-bar">Plant Search</h1>
      <SearchBar onSearch={setSearchTerm} />

      {isLoading && <p>🔍 Loading...</p>}
      {!isLoading && debouncedSearchTerm && results.length === 0 && <p>🌱 No plants found.</p>}

      <div className="results">
        {results.map((plant, idx) => (
          <div className="box" key={plant.id || idx} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            {plant.image_url && <img className="img-position" src={plant.image_url} alt={plant.common_name} width={150} />}
            <h3 style={{ marginBottom: '10.3rem' }}>{plant.common_name || "No common name"}</h3><br />
            <p><em>{plant.scientific_name || "No scientific name"}</em></p>
          </div>
        ))}
        <Favorite plant={{
          id: 0,
          image_url: "",
          common_name: "",
          scientific_name: ""
        }} />
      </div>
    </div>
  );
}

export default App;
