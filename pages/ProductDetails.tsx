
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, ShieldCheck, Zap, ArrowLeft, Layers, Globe, Activity, Cpu, Box } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loader-spin"></div>
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
                    `I am interested in acquiring this asset. Please confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black py-20 px-6 selection:bg-accent selection:text-black">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="mb-12 flex items-center gap-3 text-gray-500 hover:text-accent transition-colors font-black uppercase text-[10px] tracking-widest group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Asset Image Section */}
          <div className="relative animate-fade-in-right sticky top-32">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 bg-[#050505] relative group shadow-2xl technical-scan">
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Floating Specs */}
              <div className="absolute bottom-10 left-10 glass p-6 rounded-[2rem] border border-white/10 animate-float">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black">
                          <Activity size={20} />
                      </div>
                      <div>
                          <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Asset Quality</p>
                          <p className="text-xs font-black text-white uppercase italic">Grade_Alpha</p>
                      </div>
                  </div>
              </div>
            </div>
            
            {/* Asset Metadata Table */}
            <div className="mt-10 glass rounded-[2.5rem] border border-white/5 p-8 grid grid-cols-3 gap-8">
               <div className="text-center">
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Density</p>
                  <p className="text-white font-black text-sm">450 GSM</p>
               </div>
               <div className="text-center border-x border-white/5">
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Thread</p>
                  <p className="text-white font-black text-sm">Nylon_V2</p>
               </div>
               <div className="text-center">
                  <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Origin</p>
                  <p className="text-white font-black text-sm">SKT_Forge</p>
               </div>
            </div>
          </div>

          {/* Technical Specs Section */}
          <div className="flex flex-col animate-fade-in-up">
            <div className="mb-12">
              <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Asset Specifications / {product.id.slice(0, 8)}</span>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 leading-[0.85] italic tracking-tighter uppercase">{product.title}</h1>
              <div className="flex items-center gap-6">
                <span className="text-4xl font-display font-black text-white tracking-tighter italic">{convertPrice(product.price)}</span>
                <span className="glass text-accent text-[10px] font-black px-5 py-2 rounded-full border border-accent/20 tracking-widest uppercase flex items-center gap-2">
                    <Cpu size={12} /> Sync_Protocol_Active
                </span>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] mb-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Box size={100} /></div>
              <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase tracking-tighter opacity-80 italic relative z-10">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4">
                  <Layers size={24} className="text-accent/40" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Technical Construct</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe size={24} className="text-accent/40" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">USA_Export_Ready</span>
                </div>
              </div>
            </div>

            {product.sizes && (
              <div className="mb-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-gray-500">Configuration Size</h3>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
                        selectedSize === size 
                          ? 'bg-accent text-black scale-105 shadow-xl' 
                          : 'glass text-gray-500 border border-white/5 hover:border-accent/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <button 
                onClick={handleAddToCart} 
                className="w-full bg-white text-black py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl flex items-center justify-center gap-4 group"
              >
                <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" /> Deploy to Cart
              </button>
              <button 
                onClick={handleWhatsApp} 
                className="w-full glass text-accent py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/10 transition-all border border-accent/20"
              >
                <MessageCircle size={22} /> Live Factory Consultation
              </button>
            </div>
            
            {/* Warning Message */}
            <div className="mt-16 p-6 glass rounded-2xl border border-white/5 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 leading-relaxed">
                    Financial Policy: Secure payment links are generated via WhatsApp. <br/> Do not transmit account numbers on this interface.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
