import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, ArrowLeftIcon, CheckIcon, StarIcon, TruckIcon, ShieldIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const isInWishlist = product ? wishlist.some(item => item.id === product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${quantity} of ${product.name} added to cart!`);
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all duration-200">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-purple-700 mb-8 transition-colors duration-200">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          {/* Product tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.category.map(cat => (
              <span key={cat} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Product header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(star => (
                  <StarIcon key={star} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600 ml-2">4.0 (24 reviews)</span>
            </div>
            <p className="text-5xl font-extrabold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-green-600 font-semibold flex items-center">
              <CheckIcon className="w-5 h-5 mr-1" /> In stock and ready to ship
            </p>
          </div>

          {/* Product description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Made with premium materials and attention to detail, this
              product is designed to provide exceptional quality and lasting
              performance.
            </p>
          </div>

          {/* Quantity selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-lg font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-lg w-32">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200 rounded-l-lg">
                -
              </button>
              <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-3 py-2 text-center focus:outline-none" />
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200 rounded-r-lg">
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4 mb-8">
            <button onClick={handleAddToCart} className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button onClick={() => toggleWishlist(product)} className={`px-5 py-4 border rounded-xl flex items-center justify-center transition-all duration-200 ${isInWishlist ? 'bg-red-100 border-red-300 text-red-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <HeartIcon className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Product features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-100 rounded-lg">
              <TruckIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-gray-600 text-sm">
                Free standard shipping on orders over $50. Expedited or
                next-day shipping available.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <CheckIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Easy Returns</h3>
              <p className="text-gray-600 text-sm">
                Not satisfied with your purchase? Return it within 30 days
                for a full refund.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <ShieldIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Secure Checkout</h3>
              <p className="text-gray-600 text-sm">
                Our payment process is secure and encrypted to protect your
                personal information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

