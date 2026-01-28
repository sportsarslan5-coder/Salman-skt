
import React from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden product-card-shadow transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Interaction Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 translate-y-12 group-hover:translate-y-0 transition-all duration-300">
            <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex-1 bg-white text-gray-900 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
            >
                <Eye size={16} /> Details
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, product.sizes?.[0] || 'M');
                }}
                className="bg-accent text-white p-3 rounded-lg shadow-lg hover:bg-dark active:scale-95 transition-all"
            >
                <ShoppingCart size={18} />
            </button>
        </div>

        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={18} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[10px]">★</span>
              ))}
          </div>
        </div>
        
        <a href={`#/product/${product.id}`} className="block mb-4">
          <h3 className="text-base font-bold text-gray-900 leading-snug hover:text-accent transition-colors truncate">{product.title}</h3>
        </a>
        
        <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-display font-bold text-gray-900">{convertPrice(product.price)}</span>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
