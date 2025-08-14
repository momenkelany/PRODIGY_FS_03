import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import { useStore } from '../contexts/StoreContext';

const HomePage = () => {
  const location = useLocation();
  const { setSelectedCategory, filteredProducts } = useStore();

  // Extract category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search, setSelectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.1)" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Discover Quality Products for Your Lifestyle
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
            Shop our curated collection of premium items from your
            neighborhood store, now available online with fast shipping and
            exceptional service.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
            <Link to="/products" className="px-8 py-3 bg-white text-purple-700 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 font-semibold">
              Shop New Arrivals
            </Link>
            <Link to="/categories" className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-300 font-semibold">
              Explore Categories
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full h-24 z-20">
          <svg className="w-full h-full" viewBox="0 0 1440 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 240L1440 0V240H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Featured categories section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
            name: 'Clothing',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'clothing'
          }, {
            name: 'Electronics',
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'electronics'
          }, {
            name: 'Home & Decor',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'home'
          }, {
            name: 'Sustainable',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            category: 'sustainable'
          }].map(cat => (
            <Link to={`/?category=${cat.category}`} key={cat.category} className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative w-full h-48 overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <Filters />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            {/* Sorting dropdown can be added here */}
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

