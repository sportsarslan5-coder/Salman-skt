
import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, convertPrice, t } = useAppContext();

  const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-16 md:p-24 rounded-[3rem] text-center border border-gray-100 shadow-xl animate-fade-in-up">
           <ShoppingBag size={80} className="mx-auto text-gray-100 mb-8" strokeWidth={1.5} />
           <h2 className="text-4xl font-display font-black text-dark uppercase mb-4 tracking-tight">{t('emptyCart')}</h2>
           <p className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.3em] mb-10">Start building your studio wardrobe.</p>
           <a href="#/shop" className="inline-block bg-dark text-white px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-accent transition-all shadow-lg">Browse Inventory</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-accent font-black uppercase tracking-widest text-[10px] mb-2 block">Your Selection</span>
            <h1 className="text-5xl font-display font-black text-dark uppercase tracking-tight">Shopping <span className="text-accent">Bag</span></h1>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cart.length} Item(s) in review</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-8 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-full sm:w-32 h-40 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-dark mb-1">{item.title}</h3>
                      <div className="flex gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">Size: {item.selectedSize}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">{convertPrice(item.price)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center mt-6 justify-between">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="px-4 py-2.5 hover:bg-gray-200 transition-colors text-gray-500"><Minus size={14} /></button>
                      <span className="w-10 text-center font-bold text-dark text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="px-4 py-2.5 hover:bg-gray-200 transition-colors text-gray-500"><Plus size={14} /></button>
                    </div>
                    <span className="text-2xl font-display font-black text-dark">{convertPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 h-fit sticky top-28">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl">
              <h3 className="text-xl font-bold text-dark uppercase mb-8 pb-4 border-b border-gray-50 tracking-tight">Order Summary</h3>
              
              <div className="space-y-4 mb-10">
                 <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span>Valuation</span>
                    <span className="text-dark">{convertPrice(totalUSD)}</span>
                 </div>
                 <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-accent">FREE EXPORT</span>
                 </div>
                 <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <span className="text-sm font-black uppercase tracking-widest text-dark">{t('total')}</span>
                    <span className="text-3xl font-display font-black text-dark">{convertPrice(totalUSD)}</span>
                 </div>
              </div>
              
              <a href="#/checkout" className="w-full bg-dark text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-lg group">
                Checkout Manifest <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="mt-8 flex items-center gap-3 justify-center opacity-40">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure Checkout Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
