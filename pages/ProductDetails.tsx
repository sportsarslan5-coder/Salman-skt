
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Star, Truck, ShieldCheck, ArrowLeft, RefreshCw, Box, Layers, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { convertPrice, addToCart, navigate, route, products } = useAppContext();
  
  const id = route.split('/product/')[1]?.split('?')[0];
  const product = products.find(p => p.id === id);
  const related = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Salman SKT Global Store`;
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
                    `Greetings, I am interested in this item. Is it available for global export?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
           <a href="#/" className="hover:text-accent transition-colors">Home</a>
           <span>/</span>
           <a href={`#/shop?category=${product.category}`} className="hover:text-accent transition-colors">{product.category}</a>
           <span>/</span>
           <span className="text-dark truncate max-w-[150px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Gallery - Large Square View */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-sm p-8 shadow-sm group">
            <div className="aspect-square rounded-sm overflow-hidden bg-white mb-6">
              <img 
                src={product.image_url} 
                alt={product.title} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            {/* Mock Thumbnail List */}
            <div className="grid grid-cols-4 gap-4">
               <div className="aspect-square bg-gray-50 border-2 border-accent p-2 rounded-sm cursor-pointer">
                  <img src={product.image_url} className="w-full h-full object-contain opacity-100" />
               </div>
               {[1, 2, 3].map(i => (
                 <div key={i} className="aspect-square bg-gray-50 border border-gray-100 p-2 rounded-sm cursor-pointer hover:border-accent transition-colors opacity-40">
                    <img src={product.image_url} className="w-full h-full object-contain grayscale" />
                 </div>
               ))}
            </div>
          </div>

          {/* Core Info & Purchase Hub */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
                <p className="text-accent font-black uppercase tracking-[0.2em] text-[10px] mb-2">{product.category}</p>
                <h1 className="text-3xl font-black text-dark mb-4 leading-tight uppercase italic">{product.title}</h1>
                
                <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-6">
                  <div className="flex text-[#ffa41c]">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} strokeWidth={2} />
                      ))}
                  </div>
                  <span className="text-xs font-bold text-blue-500 hover:text-accent cursor-pointer border-l border-gray-200 pl-4">{product.reviews || 0} Ratings</span>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-accent text-sm font-black italic">Sale</span>
                    <span className="text-4xl font-black text-dark italic">{convertPrice(product.price)}</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global evaluation confirmed by Studio SKT</p>
                </div>

                {/* Sizes Selection */}
                {product.sizes && (
                  <div className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-gray-500">Select Export Size: <span className="text-dark">{selectedSize}</span></h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button 
                          key={size} 
                          onClick={() => setSelectedSize(size)} 
                          className={`min-w-[50px] h-10 rounded-sm font-bold text-xs transition-all border ${
                            selectedSize === size 
                              ? 'bg-accent border-accent text-black shadow-lg scale-105' 
                              : 'bg-white text-gray-400 border-gray-200 hover:border-accent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Marketplace Information Tabs */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-50">
                   {[
                     { id: 'desc', label: 'Details' },
                     { id: 'specs', label: 'Tech Brief' },
                     { id: 'reviews', label: 'Reviews' }
                   ].map(tab => (
                     <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-dark text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                     >
                       {tab.label}
                     </button>
                   ))}
                </div>
                <div className="p-8">
                    {activeTab === 'desc' && (
                      <p className="text-gray-500 text-xs leading-relaxed font-bold uppercase tracking-tighter opacity-80">{product.description}</p>
                    )}
                    {activeTab === 'specs' && (
                      <ul className="space-y-3">
                         <li className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fabric</span>
                            <span className="text-[10px] font-black text-dark uppercase">Tech Poly-Shell</span>
                         </li>
                         <li className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</span>
                            <span className="text-[10px] font-black text-dark uppercase italic">Sialkot Studio</span>
                         </li>
                         <li className="flex justify-between border-b border-gray-50 pb-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Market</span>
                            <span className="text-[10px] font-black text-dark uppercase">USA Exclusive</span>
                         </li>
                      </ul>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="text-center py-4">
                         <div className="flex justify-center text-[#ffa41c] mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                         </div>
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Verified Technical Quality</p>
                         <p className="text-[9px] font-bold text-accent uppercase mt-2">"Signature technical fit." - Export Auditor</p>
                      </div>
                    )}
                </div>
            </div>
          </div>

          {/* Buy Hub (Right Side) */}
          <div className="lg:col-span-3 space-y-6 sticky top-32">
             <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-accent"></div>
                
                <div className="mb-6">
                   <h2 className="text-2xl font-black text-dark italic">{convertPrice(product.price)}</h2>
                   <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">In Stock</p>
                   <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-sm border border-red-100 flex items-center gap-2">
                      <Zap size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Only 7 left - order soon</span>
                   </div>
                </div>

                <div className="space-y-3">
                   <button 
                     onClick={handleAddToCart} 
                     className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95"
                   >
                     Add to Bag
                   </button>
                   <button 
                     onClick={() => { handleAddToCart(); navigate('/checkout'); }} 
                     className="w-full bg-[#ffa41c] hover:bg-[#f3a847] text-black py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95"
                   >
                     Buy Now
                   </button>
                </div>

                <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
                   <div className="flex items-center gap-3 text-gray-500">
                      <Truck size={18} className="text-accent shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Global Factory Dispatch</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-500">
                      <ShieldCheck size={18} className="text-accent shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Studio Link</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-500">
                      <RefreshCw size={18} className="text-accent shrink-0" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Manufacturing Guarantee</span>
                   </div>
                </div>

                <button 
                  onClick={handleWhatsApp} 
                  className="w-full mt-8 bg-black text-white py-4 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent hover:text-black transition-all"
                >
                  <MessageCircle size={18} /> Studio Inquiry
                </button>
             </div>
          </div>
        </div>

        {/* Amazon-Style Frequently Bought Together */}
        <div className="mt-20 bg-white p-10 shadow-sm border border-gray-100 rounded-sm">
           <h3 className="text-xl font-black uppercase tracking-tighter mb-8 italic">Inspired by this Technical Gear</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {related.concat(products.slice(0, 5)).slice(0, 5).map(p => (
                <a key={p.id} href={`#/product/${p.id}`} className="group block">
                   <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden mb-3 border border-gray-100 p-4">
                      <img src={p.image_url} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                   </div>
                   <p className="text-[10px] font-black uppercase text-dark truncate mb-1">{p.title}</p>
                   <div className="flex text-[#ffa41c] mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                   </div>
                   <p className="text-sm font-black text-accent italic">{convertPrice(p.price)}</p>
                </a>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
