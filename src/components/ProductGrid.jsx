import React from 'react';
import ProductCard from './ProductCard';
import { useStore } from '../contexts/StoreContext';

const ProductGrid = () => {
  const { filteredProducts, searchTerm } = useStore();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No products found</h2>
        {searchTerm ? (
          <p className="text-gray-500">
            We couldn't find any products matching "{searchTerm}". Try using
            different keywords or browse our categories.
          </p>
        ) : (
          <p className="text-gray-500">
            No products match the selected filters. Try adjusting your filter
            criteria.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

