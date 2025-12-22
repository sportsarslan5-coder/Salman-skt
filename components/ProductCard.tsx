import React from 'react';
import { Star, ShoppingCart, Eye, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, t } = useAppContext();
  
  return (
    <div className="group relative flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary mb-4 border border-white/5 transition-all duration-500 group-hover:border-accent/50">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <a 
            href={`#/product/${product.id}`}
            className="bg-white text-black p-3 rounded-full hover:bg-accent transition-all transform hover:scale-110 shadow-lg"
          >
            <Eye size={18} />
          </a>
          <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, product.sizes?.[0] || 'M');
            }}
            className="bg-accent text-black p-3 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-lg"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {product.isProtex && (
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-accent text-[8px] font-black px-2 py-1 rounded border border-accent/20 flex items-center gap-1">
            <ShieldCheck size={10} /> PROTEX
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-black text-accent uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-accent">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-bold text-white">{(product.rating || 5).toFixed(1)}</span>
          </div>
        </div>
        
        <a href={`#/product/${product.id}`} className="block group-hover:text-accent transition-colors duration-200">
          <h3 className="text-sm font-bold text-gray-200 leading-tight mb-2 truncate">{product.title}</h3>
        </a>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-black text-white tracking-tighter">{convertPrice(product.price)}</span>
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Limited Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;