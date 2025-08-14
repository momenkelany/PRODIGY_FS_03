import React, { useEffect, useState, createContext, useContext } from 'react';
import { mockProducts } from '../utils/mockData';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const [products] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Filter and sort products based on current criteria
  const filteredProducts = products.filter(product => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Filter by category
    if (selectedCategory !== 'all' && !product.category.includes(selectedCategory)) {
      return false;
    }
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    // Sort products
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
      // Featured or default sorting
    }
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.product.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      } else {
        return [...prevCart, {
          product,
          quantity: 1
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.product.id === productId ? {
      ...item,
      quantity
    } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
    if (isWishlistOpen) setIsWishlistOpen(false);
  };

  const toggleWishlistSidebar = () => {
    setIsWishlistOpen(prev => !prev);
    if (isCartOpen) setIsCartOpen(false);
  };

  return (
    <StoreContext.Provider value={{
      products,
      filteredProducts,
      cart,
      wishlist,
      searchTerm,
      selectedCategory,
      sortOption,
      priceRange,
      isCartOpen,
      isWishlistOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      setSearchTerm,
      setSelectedCategory,
      setSortOption,
      setPriceRange,
      toggleCart,
      toggleWishlistSidebar
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

