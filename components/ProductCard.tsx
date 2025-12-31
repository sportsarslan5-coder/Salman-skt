
import React from 'react';
import { Star, ShoppingCart, Eye, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, t } = useAppContext();
  
  return (
    <div className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 p-4 rounded-[2.5rem] hover:border-accent/40 transition-all duration-700">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#111] mb-6 border border-white/5">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a 
            href={`#/product/${product.id}`}
            className="bg-white text-black p-4 rounded-full hover:bg-accent transition-all transform hover:scale-110 shadow-2xl"
          >
            <ArrowUpRight size={20} />
          </a>
          <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, product.sizes?.[0] || 'M');
            }}
            className="bg-accent text-black p-4 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-2xl"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {product.isProtex && (
          <div className="absolute top-5 left-5 bg-black/90 backdrop-blur-lg text-accent text-[8px] font-black px-3 py-1.5 rounded-full border border-accent/30 flex items-center gap-2 tracking-[0.2em] uppercase">
            <ShieldCheck size={12} className="text-accent" /> PROTEX ELITE
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em]">{product.category} Series</span>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            <Star size={10} fill="#FFD700" className="text-accent" />
            <span className="text-[10px] font-bold text-white">{(product.rating || 5).toFixed(1)}</span>
          </div>
        </div>
        
        <a href={`#/product/${product.id}`} className="block group-hover:text-accent transition-colors duration-300">
          <h3 className="text-lg font-black text-gray-200 leading-tight mb-4 uppercase tracking-tighter italic truncate">{product.title}</h3>
        </a>
        
        <div className="flex items-center justify-between mt-auto bg-black/40 p-3 rounded-2xl border border-white/5 group-hover:bg-accent/5 transition-all">
          <span className="text-xl font-black text-white tracking-tighter italic">{convertPrice(product.price)}</span>
          <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
