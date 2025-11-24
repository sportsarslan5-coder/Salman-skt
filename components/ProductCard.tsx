import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

const { Link } = ReactRouterDOM as any;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { convertPrice, addToCart, t } = useAppContext();

  return (
    <div className="group relative flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm transition-all duration-300 group-hover:shadow-xl">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link 
            to={`/product/${product.id}`}
            className="bg-white text-black p-3 rounded-full hover:bg-accent hover:text-black transition-all transform hover:scale-110 shadow-lg"
            title="View Details"
          >
            <Eye size={20} />
          </Link>
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
        {product.rating >= 4.9 && (
            <div className="absolute top-3 left-3 bg-accent text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">
                Best Seller
            </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block group-hover:text-accent transition-colors duration-200">
          <h3 className="text-lg font-bold text-primary leading-tight mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">{convertPrice(product.priceUSD)}</span>
          <div className="text-xs text-gray-400 font-medium">{product.reviews} Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;