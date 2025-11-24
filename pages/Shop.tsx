import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const { t } = useAppContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  React.useEffect(() => {
     setActiveCategory(searchParams.get('category') || 'All');
  }, [location.search]);

  const categories = ['All', 'Men', 'Women', 'Kids'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('shop')}</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                  // Just local state for simplicity, though could update URL
                  setActiveCategory(cat);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-black text-white shadow-md' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {cat === 'All' ? 'All' : t(cat.toLowerCase())}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;