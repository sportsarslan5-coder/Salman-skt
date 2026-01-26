
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Filter, LayoutGrid, List } from 'lucide-react';

const Shop: React.FC = () => {
  const { t, route, navigate, products, isLoading } = useAppContext();
  
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

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
        navigate('/shop');
    } else {
        navigate(`/shop?category=${cat}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="loader-spin mb-6"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="animate-fade-in-right">
            <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Archive Catalog</span>
            <h1 className="text-7xl md:text-9xl font-display font-black text-white italic uppercase tracking-tighter leading-none">Studio<br/><span className="text-accent">Assets</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-3 glass p-2 rounded-[2rem] border border-white/5 animate-fade-in-up">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-accent text-black shadow-2xl' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Assets' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem]">
            <Filter size={60} className="mx-auto mb-8 text-gray-800" />
            <h2 className="text-3xl font-display font-black text-gray-600 uppercase italic">No Matches Found</h2>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-4">Adjust your search parameters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
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
