
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, ShieldCheck, Zap, ArrowLeft, Layers, Globe, Activity, Cpu, Box, Star, Truck, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';

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
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize || 'M');
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const message = `*STUDIO INQUIRY - SALMAN SKT*%0a` +
                    `*Asset:* ${product.title}%0a` +
                    `*Evaluation:* ${convertPrice(product.price)}%0a` +
                    `*Size Preference:* ${selectedSize}%0a` +
                    `------------------%0a` +
                    `Greetings, I am interested in this item. Is it available for export?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back Navigation */}
        <button 
          onClick={() => window.history.back()} 
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-dark transition-colors font-bold text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 relative group shadow-sm">
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {product.isProtex && (
                <div className="absolute top-6 left-6 bg-accent text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Tech Grade
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-8 border-b border-gray-100 pb-8">
              <p className="text-accent font-black uppercase tracking-[0.2em] text-[10px] mb-2">{product.category}</p>
              <h1 className="text-4xl font-display font-black text-dark mb-4 uppercase tracking-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} />
                    ))}
                </div>
                <span className="text-xs font-bold text-gray-400">({product.reviews || 0} Professional Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-display font-black text-dark">{convertPrice(product.price)}</span>
                <span className="text-green-600 text-xs font-bold uppercase tracking-widest">In Stock & Ready</span>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-10">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-gray-500">Select Export Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`min-w-[60px] h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${
                        selectedSize === size 
                          ? 'bg-dark text-white border-dark' 
                          : 'bg-white text-gray-400 border-gray-200 hover:border-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 mb-12">
              <button 
                onClick={handleAddToCart} 
                className="w-full bg-dark text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-95"
              >
                <ShoppingCart size={18} /> Add to Bag
              </button>
              <button 
                onClick={handleWhatsApp} 
                className="w-full bg-gray-50 text-dark py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-100 transition-all border border-gray-100"
              >
                <MessageCircle size={18} /> Direct Studio Query
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4">
                    <Truck size={20} className="text-accent" />
                    <div>
                        <p className="text-[10px] font-black uppercase text-dark">Global Shipping</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Exported via DHL Express from Sialkot, PK.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <RefreshCcw size={20} className="text-accent" />
                    <div>
                        <p className="text-[10px] font-black uppercase text-dark">Quality Assurance</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Full refund if manufacturing standard is not met.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ShieldCheck size={20} className="text-accent" />
                    <div>
                        <p className="text-[10px] font-black uppercase text-dark">Secure Bridge</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Payment links finalized securely via WhatsApp.</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-100 pb-2">Technical Brief</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium uppercase tracking-tight italic">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
