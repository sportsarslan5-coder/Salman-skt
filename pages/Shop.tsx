import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const { t, route, navigate, products } = useAppContext();
  
  const queryString = route.split('?')[1] || '';
  const searchParams = new URLSearchParams(queryString);
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  useEffect(() => {
     const params = new URLSearchParams(route.split('?')[1] || '');
     setActiveCategory(params.get('category') || 'All');
  }, [route]);

  const categories = ['All', 'Men', 'Women', 'Kids'];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
        navigate('/shop');
    } else {
        navigate(`/shop?category=${cat}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('shop')}</h1>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
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