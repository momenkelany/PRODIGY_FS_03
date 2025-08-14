import React from 'react';
import { Trash2Icon, MinusIcon, PlusIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const CartItem = ({
  product,
  quantity
}) => {
  const {
    updateCartQuantity,
    removeFromCart
  } = useStore();
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-4">
        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h3 className="font-medium text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm">
            {product.category[0]}
          </p>
          <p className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-200 rounded-md">
          <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-150" aria-label="Decrease quantity">
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="px-3 text-gray-700">{quantity}</span>
          <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-150" aria-label="Increase quantity">
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <button onClick={() => removeFromCart(product.id)} className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-full" aria-label="Remove item">
          <Trash2Icon className="w-5 h-5" />
        </button>
      </div>
      <span className="text-lg font-semibold text-gray-800">
        ${(product.price * quantity).toFixed(2)}
      </span>
    </div>
  );
};
export default CartItem;

