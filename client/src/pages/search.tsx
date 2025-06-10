import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import SearchBar from '../components/searchbar';

interface SearchProps {
  onSearch: (query: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

 useEffect(() => {
  if (debouncedSearchTerm.trim().length > 1) {
    onSearch(debouncedSearchTerm);
  }
}, [debouncedSearchTerm, onSearch]);

  return (
    <div>
      <h1 className="title-search-bar">Plant Search</h1>
      <SearchBar onSearch={setSearchTerm} />
    </div>
  );
}

export default Search;