import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../Cart/CartSidebar';
import WishlistSidebar from '../Wishlist/WishlistSidebar';
import { useStore } from '../../contexts/StoreContext';

const Layout = ({
  children
}) => {
  const {
    isCartOpen,
    isWishlistOpen
  } = useStore();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />

      {/* Sidebar overlays */}
      {isCartOpen && <CartSidebar />}
      {isWishlistOpen && <WishlistSidebar />}
    </div>
  );
};
export default Layout;

