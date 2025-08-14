import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, XIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const WishlistItem = ({
  product
}) => {
  const {
    toggleWishlist,
    addToCart
  } = useStore();
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <Link to={`/product/${product.id}`} className="flex items-center space-x-4 group">
        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-200" />
        <div>
          <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm">
            {product.category[0]}
          </p>
          <p className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="flex items-center space-x-2">
        <button onClick={() => addToCart(product)} className="flex items-center text-sm py-1.5 px-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200">
          <ShoppingCartIcon className="w-4 h-4 mr-1" />
          Add to Cart
        </button>
        <button onClick={() => toggleWishlist(product)} className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-full" aria-label="Remove from wishlist">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default WishlistItem;

