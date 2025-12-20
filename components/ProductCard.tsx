import React from 'react';
import { Star, ShoppingCart, Eye, ShieldCheck, Box } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, t } = useAppContext();
  
  const is3DItem = product.description.toLowerCase().includes('3d');

  return (
    <div className="group relative flex flex-col h-full bg-white">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-4 shadow-sm transition-all duration-300 group-hover:shadow-xl border border-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a 
            href={`#/product/${product.id}`}
            className="bg-white text-black p-3 rounded-full hover:bg-accent hover:text-black transition-all transform hover:scale-110 shadow-lg flex items-center justify-center"
            title="View Details"
          >
            <Eye size={20} />
          </a>
          <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, product.sizes[0]);
            }}
            className="bg-black text-white p-3 rounded-full hover:bg-accent hover:text-black transition-all transform hover:scale-110 shadow-lg"
            title={t('addToCart')}
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {is3DItem && (
                <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-sm w-fit flex items-center gap-1">
                    <Box size={10} /> 3D PRINTED
                </div>
            )}
            {product.isProtex && (
                <div className="bg-black text-accent text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-sm border border-accent/30 flex items-center gap-1 w-fit">
                    <ShieldCheck size={10} /> PROTEX PREMIUM
                </div>
            )}
            {product.rating >= 4.9 && (
                <div className="bg-accent text-black text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-sm w-fit">
                    BEST SELLER
                </div>
            )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-[11px] font-bold text-gray-700">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <a href={`#/product/${product.id}`} className="block group-hover:text-accent transition-colors duration-200">
          <h3 className="text-sm font-black text-primary leading-tight mb-1 truncate">{product.name}</h3>
        </a>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base font-black text-primary tracking-tighter">{convertPrice(product.priceUSD)}</span>
          <div className="text-[10px] text-gray-400 font-bold uppercase">{product.reviews} Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;