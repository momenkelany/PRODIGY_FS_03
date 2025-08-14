import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon, ShoppingBagIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import CartItem from './CartItem';

const CartSidebar = () => {
  const { cart, toggleCart, clearCart } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={toggleCart}></div>

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-5">
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/" onClick={toggleCart} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-5">
              {cart.map(item => (
                <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
              ))}
            </div>

            <div className="border-t border-gray-100 p-5 bg-gray-50">
              <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
              <Link to="/checkout" onClick={toggleCart} className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;

