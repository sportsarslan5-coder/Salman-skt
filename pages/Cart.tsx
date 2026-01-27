
import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, convertPrice, t } = useAppContext();

  const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <div className="glass p-20 rounded-[4rem] text-center border border-white/5 shadow-2xl animate-fade-in-up">
           <ShoppingBag size={100} className="mx-auto text-gray-900 mb-10" strokeWidth={1} />
           <h2 className="text-5xl font-display font-black text-white uppercase italic tracking-tighter mb-6">{t('emptyCart')}</h2>
           <p className="text-gray-500 uppercase text-[10px] font-black tracking-[0.5em] mb-12">No active assets detected in deployment queue.</p>
           <a href="#/shop" className="inline-block bg-accent text-black px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white transition-all">Initialize Catalog Query</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-24 border-b border-white/5 pb-12">
          <div>
            <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Asset Review</span>
            <h1 className="text-7xl font-display font-black text-white italic uppercase tracking-tighter">Current <span className="text-accent">Manifest</span></h1>
          </div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{cart.length} Asset(s) Registered</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-8 bg-[#0a0a0a] border border-white/10 p-8 rounded-[3rem] shadow-xl group hover:border-accent/30 transition-all">
                <div className="w-full sm:w-40 h-40 rounded-3xl overflow-hidden border border-white/5 flex-shrink-0 relative">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white uppercase italic tracking-tighter mb-2">{item.title}</h3>
                      <div className="flex gap-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 glass px-3 py-1 rounded-full">SIZE: {item.selectedSize}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-accent glass px-3 py-1 rounded-full border border-accent/10">{convertPrice(item.price)} PER UNIT</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="p-4 glass text-gray-800 hover:text-red-500 rounded-full transition-all hover:bg-red-500/10">
                      <Trash2 size={24} />
                    </button>
                  </div>
                  <div className="flex items-center mt-8 gap-10">
                    <div className="flex items-center glass rounded-2xl border border-white/10 overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="p-4 hover:bg-white/5 transition-colors"><Minus size={18} /></button>
                      <span className="w-12 text-center font-black text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="p-4 hover:bg-white/5 transition-colors"><Plus size={18} /></button>
                    </div>
                    <div className="ml-auto text-right">
                       <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-1">Sub-Valuation</p>
                       <span className="text-3xl font-display font-black text-white tracking-tighter italic">{convertPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 h-fit sticky top-40 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="glass p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><ShoppingBag size={120} /></div>
              <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-10 pb-6 border-b border-white/5">Order Diagnostics</h3>
              
              <div className="space-y-6 mb-12">
                 <div className="flex justify-between items-center text-gray-500">
                    <span className="text-[10px] font-black uppercase tracking-widest">Base Valuation</span>
                    <span className="text-sm font-bold">{convertPrice(totalUSD)}</span>
                 </div>
                 <div className="flex justify-between items-center text-gray-500">
                    <span className="text-[10px] font-black uppercase tracking-widest">Studio Logistics</span>
                    <span className="text-sm font-bold text-accent">Calculated at Link</span>
                 </div>
                 <div className="flex justify-between items-center pt-8 border-t border-white/10">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-white">{t('total')}</span>
                    <span className="text-4xl font-display font-black text-accent italic tracking-tighter">{convertPrice(totalUSD)}</span>
                 </div>
              </div>
              
              <a href="#/checkout" className="w-full bg-accent text-black py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-white transition-all shadow-[0_20px_60px_rgba(255,215,0,0.3)] group">
                Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              <div className="mt-12 flex items-center gap-4 justify-center">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                 <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.6em]">Secure Studio Checkout Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
