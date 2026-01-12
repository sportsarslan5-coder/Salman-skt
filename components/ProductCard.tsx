
import React from 'react';
import { ShoppingCart, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart } = useAppContext();
  
  return (
    <div className="group relative flex flex-col h-full bg-secondary/50 border border-white/5 p-4 rounded-[2rem] hover:border-accent/40 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(255,215,0,0.15)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="relative aspect-[1/1.2] overflow-hidden rounded-2xl bg-black mb-6 border border-white/5">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-all duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-90 grayscale-[0.5] group-hover:grayscale-0"
        />
        
        {/* Interaction Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5 backdrop-blur-md">
          <a 
            href={`#/product/${product.id}`}
            className="bg-white text-black p-5 rounded-full hover:bg-accent transition-all transform hover:scale-110 shadow-2xl translate-y-4 group-hover:translate-y-0 duration-500"
          >
            <ArrowUpRight size={22} />
          </a>
          <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, product.sizes?.[0] || 'M');
            }}
            className="bg-accent text-black p-5 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-2xl translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
          >
            <ShoppingCart size={22} />
          </button>
        </div>

        {product.isProtex && (
          <div className="absolute top-4 left-4 glass text-accent text-[8px] font-black px-4 py-2 rounded-full border border-accent/30 flex items-center gap-2 tracking-[0.2em] uppercase">
            <ShieldCheck size={12} className="text-accent" /> ALPHA TECH
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow relative z-10 px-1">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{product.category} Series</span>
          <span className="text-[10px] font-black text-accent/60 uppercase tracking-widest">In Stock</span>
        </div>
        
        <a href={`#/product/${product.id}`} className="block group-hover:text-accent transition-colors duration-300">
          <h3 className="text-xl font-display font-black text-white leading-none mb-6 italic uppercase tracking-tighter truncate">{product.title}</h3>
        </a>
        
        <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">Asset Value</span>
                <span className="text-2xl font-display font-black text-white tracking-tighter italic">{convertPrice(product.price)}</span>
            </div>
            <div className="flex gap-1.5 pb-1">
                <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-150"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
