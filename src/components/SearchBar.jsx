import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    navigate('/');
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-sm transition-all duration-200"
      />
      <SearchIcon className="absolute left-3 text-gray-400 w-5 h-5" />
      {localSearchTerm && (
        <button type="button" onClick={clearSearch} className="absolute right-3 text-gray-400 hover:text-gray-600 w-5 h-5">
          <XIcon />
        </button>
      )}
    </form>
  );
};

export default SearchBar;

