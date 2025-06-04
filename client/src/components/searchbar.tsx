// src/components/SearchBar.tsx
import { useState } from 'react';
import './css/searchbar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Passa a query para a função onSearch fornecida pelo componente pai
    }
  };

  return (
    <div className="search-bar-container">
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
  );
}
