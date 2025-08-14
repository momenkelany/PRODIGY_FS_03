import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetail';
import CheckoutPage from './pages/Checkout';
import Layout from './components/Layout/Layout';

export function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}

