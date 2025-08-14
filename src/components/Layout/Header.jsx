import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import SearchBar from '../SearchBar';

const Header = () => {
  const { cart, wishlist, toggleCart, toggleWishlistSidebar } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-700">
          LocalShop
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:block flex-grow mx-4">
          <SearchBar />
        </div>

        {/* Nav Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-gray-600 hover:text-purple-700 hidden md:block">
            <UserIcon className="w-6 h-6" />
          </Link>
          <button onClick={toggleWishlistSidebar} className="relative text-gray-600 hover:text-purple-700">
            <HeartIcon className="w-6 h-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
          <button onClick={toggleCart} className="relative text-gray-600 hover:text-purple-700">
            <ShoppingCartIcon className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-gray-600 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search - Mobile */}
      <div className="md:hidden mt-4 mx-auto w-full px-4">
        <SearchBar />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-gray-100 mt-4 py-2 px-4 rounded-md">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="block py-2 text-gray-700 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/?category=clothing" className="block py-2 text-gray-700 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(false)}>
                Clothing
              </Link>
            </li>
            <li>
              <Link to="/?category=electronics" className="block py-2 text-gray-700 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(false)}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/?category=home" className="block py-2 text-gray-700 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(false)}>
                Home & Decor
              </Link>
            </li>
            <li>
              <Link to="/?category=sustainable" className="block py-2 text-gray-700 hover:text-purple-700" onClick={() => setIsMobileMenuOpen(false)}>
                Sustainable
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

