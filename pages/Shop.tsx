
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

const Shop: React.FC = () => {
  const { route, navigate, products, isLoading } = useAppContext();
  
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

  const categories = ['All', 'Team Uniforms', 'Active & Casual', 'Elite Shoes', 'Gear & Bags'];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
        navigate('/shop');
    } else {
        navigate(`/shop?category=${cat}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="loader mb-6"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Catalog Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="animate-fade-in-right">
            <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Manufacturing Registry</span>
            <h1 className="text-6xl md:text-8xl font-display font-black text-gray-900 italic uppercase tracking-tighter leading-none">Studio<br/><span className="text-accent">Inventory</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100 animate-fade-in-up">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {cat === 'All' ? 'View All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-40 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[3rem]">
            <Filter size={48} className="mx-auto mb-6 text-gray-300" />
            <h2 className="text-xl font-display font-black text-gray-400 uppercase italic">Empty Registry</h2>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-3">No products found in this manufacturing line</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
