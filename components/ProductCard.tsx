
import React from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, navigate } = useAppContext();
  
  const isStudioChoice = product.rating && product.rating >= 4.9;

  return (
    <div className="group flex flex-col h-full bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-300 relative">
      
      {/* Studio Choice Badge */}
      {isStudioChoice && (
        <div className="absolute top-0 left-0 z-10 bg-[#e47911] text-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-br-sm shadow-md">
           Studio's Choice
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <img 
          src={product.image_url} 
          alt={product.title} 
          loading="lazy"
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white text-dark p-3 rounded-full shadow-xl hover:bg-accent transition-all"
            >
                <Eye size={18} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, product.sizes?.[0] || 'M');
                }}
                className="bg-accent text-black p-3 rounded-full shadow-xl hover:bg-white transition-all"
            >
                <ShoppingCart size={18} strokeWidth={3} />
            </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <a href={`#/product/${product.id}`} className="block mb-2">
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-2 min-h-[40px]">{product.title}</h3>
        </a>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-2">
           <div className="flex text-[#ffa41c]">
              {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} strokeWidth={2} />
              ))}
           </div>
           <span className="text-[10px] font-bold text-blue-500 hover:text-accent cursor-pointer">{product.reviews || 0}</span>
        </div>
        
        {/* Price Row */}
        <div className="mt-auto pt-2 border-t border-gray-50 flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Price:</span>
              <span className="text-lg font-black text-dark tracking-tighter italic shimmer-text">{convertPrice(product.price)}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
               <span className="text-[9px] font-black text-green-600 uppercase">In Stock</span>
               <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
