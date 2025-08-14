import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, SlidersIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { categories } from '../utils/mockData';

const Filters = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange
  } = useStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = value;
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    setPriceRange(localPriceRange);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center text-sm text-gray-600 hover:text-purple-700 md:hidden transition-colors duration-200">
          {isFilterOpen ? 'Hide' : 'Show'} Filters
          {isFilterOpen ? <ChevronUpIcon size={16} className="ml-1" /> : <ChevronDownIcon size={16} className="ml-1" />}
        </button>
      </div>

      <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`block px-3 py-2 rounded-lg text-left w-full transition-colors duration-200 ${selectedCategory === category.id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-purple-200 text-purple-700 font-medium' : 'hover:bg-gray-50'}`}>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price: ${localPriceRange[0]}</label>
              <input type="range" id="minPrice" min="0" max="1000" value={localPriceRange[0]} onChange={(e) => handlePriceChange(0, parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price: ${localPriceRange[1]}</label>
              <input type="range" id="maxPrice" min="0" max="1000" value={localPriceRange[1]} onChange={(e) => handlePriceChange(1, parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
            </div>
            <button onClick={applyPriceFilter} className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Apply Filter
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Sort By</h3>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white shadow-sm">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

