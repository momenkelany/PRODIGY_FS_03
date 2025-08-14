import React from 'react';
import { XIcon, HeartIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import WishlistItem from './WishlistItem';
import { Link } from 'react-router-dom';

const WishlistSidebar = () => {
  const { wishlist, toggleWishlistSidebar } = useStore();

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={toggleWishlistSidebar}></div>

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
          <button onClick={toggleWishlistSidebar} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-5">
            <HeartIcon className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-2">Your wishlist is empty</p>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist and find them here anytime.</p>
            <Link to="/" onClick={toggleWishlistSidebar} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-5">
            {wishlist.map(product => (
              <WishlistItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistSidebar;

