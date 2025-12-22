import React, { useState, useMemo, useEffect } from 'react';
import { Star, ShoppingCart, MessageCircle, Shield, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { convertPrice, addToCart, navigate, route, products } = useAppContext();
  
  const id = route.split('/product/')[1]?.split('?')[0];
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Salman SKT`;
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize || 'M');
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const message = `*Hi, I want to inquire about this item:*%0a` +
                    `Item: ${product.title}%0a` +
                    `Price: ${convertPrice(product.price)}%0a` +
                    `Size: ${selectedSize}%0a` +
                    `------------------%0a` +
                    `Is this available?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-square shadow-sm">
                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
                <div className="mb-6">
                   <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">{product.category} Series</span>
                   <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">{product.title}</h1>
                </div>

                <div className="text-3xl font-bold text-primary mb-8 flex items-center gap-4">
                    {convertPrice(product.price)}
                    <span className="text-sm font-normal text-green-600 bg-green-50 px-3 py-1 rounded-full">In Stock</span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-10 border-l-2 border-gray-200 pl-6">
                    {product.description}
                </p>

                {product.sizes && (
                <div className="mb-10">
                    <h3 className="font-bold text-sm uppercase mb-4">Select Size</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {product.sizes.map(size => (
                            <button key={size} onClick={() => setSelectedSize(size)} className={`py-3 rounded-xl font-bold text-sm ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-50 text-gray-700'}`}>
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                )}

                <div className="space-y-4">
                    <button onClick={handleAddToCart} className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-black transition-all shadow-xl flex items-center justify-center gap-3">
                        <ShoppingCart size={24} /> Add to Cart
                    </button>
                    <button onClick={handleWhatsApp} className="w-full bg-green-50 text-green-600 py-4 rounded-full font-bold flex items-center justify-center gap-3 border border-green-100">
                        <MessageCircle size={24} /> Chat on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;