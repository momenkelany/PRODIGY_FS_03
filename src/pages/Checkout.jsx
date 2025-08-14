import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { CheckIcon, CreditCardIcon, UserIcon, TruckIcon } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/');
      alert('Thank you for your order!');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Secure Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              <UserIcon className="w-6 h-6 mr-2 text-purple-500" /> Account Options
            </h2>
            <div className="flex space-x-4 mb-6">
              <button onClick={() => setIsGuest(true)} className={`flex-1 py-3 px-4 rounded-xl border font-medium transition-all duration-200 ${isGuest ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-purple-200 text-purple-700' : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'}`}>
                Guest Checkout
              </button>
              <button onClick={() => setIsGuest(false)} className={`flex-1 py-3 px-4 rounded-xl border font-medium transition-all duration-200 ${!isGuest ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-purple-200 text-purple-700' : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'}`}>
                Sign In
              </button>
            </div>
            {!isGuest && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700 rounded-md">
                <p>The sign-in functionality would be implemented with the backend. For this demo, we're focusing on the guest checkout flow.</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              <TruckIcon className="w-6 h-6 mr-2 text-purple-500" /> Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" id="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" id="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" id="address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" id="city" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" id="state" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input type="text" id="zip" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              <CreditCardIcon className="w-6 h-6 mr-2 text-purple-500" /> Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" id="cardNumber" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input type="text" id="expDate" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" id="cvv" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting} className="mt-8 w-full px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isSubmitting ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-gray-200 pt-4 mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <CheckIcon className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-green-600 font-medium">Secure Checkout</p>
            <p className="text-gray-500 text-sm">Your payment information is processed securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

