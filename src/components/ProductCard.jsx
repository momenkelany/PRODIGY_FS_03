import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const ProductCard = ({
  product
}) => {
  const {
    addToCart,
    toggleWishlist,
    wishlist
  } = useStore();
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {/* Category tag */}
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.category[0]}
          </span>
          {/* Wishlist button */}
          <button onClick={handleToggleWishlist} className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition-colors duration-200 ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
            <HeartIcon className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block text-xl font-semibold text-gray-800 hover:text-purple-700 mb-2">
          {product.name}
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button onClick={handleAddToCart} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
            <ShoppingCartIcon className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

