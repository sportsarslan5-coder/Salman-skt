
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, MessageCircle, MapPin, User, Loader2, DollarSign, ShieldCheck, RefreshCcw, Lock } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { dbService } from '../services/dbService';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, convertPrice, clearCart, t } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'PayPal' | 'Bank Transfer'>('PayPal');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    neighborhood: '',
    homeNumber: '',
    phone: '',
    email: ''
  });

  const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrder: Partial<Order> = {
      customer_name: formData.name,
      phone: formData.phone,
      city: formData.city,
      email: formData.email,
      address: `${formData.homeNumber}, ${formData.neighborhood}`,
      items: cart.map(item => ({
        productName: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
        image: item.image_url
      })),
      total: totalUSD,
      status: 'Pending'
    };

    try {
      await dbService.saveOrder(newOrder);

      const orderItems = cart.map((item, index) => `${index + 1}. ${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity})`).join('%0a');
      const message = `*NEW ORDER REQUEST - SALMAN SKT*%0a` +
                      `*CUSTOMER:* ${formData.name}%0a` +
                      `*PHONE:* ${formData.phone}%0a` +
                      `*PAYMENT PREFERENCE:* ${paymentMethod}%0a` +
                      `*ITEMS:*%0a${orderItems}%0a` + 
                      `*TOTAL:* ${convertPrice(totalUSD)}%0a` +
                      `------------------%0a` +
                      `Protocol: Secure Factory Finalization Request.`;
      
      clearCart();
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    } catch (error: any) {
      console.error(error);
      alert('Order placement failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <CheckCircle size={60} className="text-accent mb-8 animate-bounce" />
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">Manifest Transmitted</h2>
            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em] mb-10">Secure channel initialized. Awaiting you on WhatsApp for payment finalization.</p>
            <a href="#/" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all">Return to Studio</a>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-12">
        <div>
            <span className="text-accent font-black uppercase tracking-[0.6em] text-[10px] mb-4 block">Manifest Finalization</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">Secure <span className="text-accent">Checkout</span></h1>
        </div>
        <div className="glass px-8 py-4 rounded-full border border-white/5 flex items-center gap-4">
            <Lock size={16} className="text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Encrypted Bridge Active</span>
        </div>
      </div>
      
      {/* Policy Banner - Dazing Update */}
      <div className="mb-12 glass border border-accent/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent/20"></div>
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <RefreshCcw size={32} className="animate-spin-slow" />
          </div>
          <div>
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">Refund Assurance Protocol</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">
                  Payments are held in escrow until dispatch. Full refunds issued via PayPal/Bank instantly upon request before order completion. 
                  Direct factory reversal.
              </p>
          </div>
          <div className="md:ml-auto flex gap-6">
              <ShieldCheck className="text-accent opacity-40" size={32} />
              <DollarSign className="text-accent opacity-40" size={32} />
          </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
            {/* Customer Info */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 flex items-center gap-4">
                  <User size={24} className="text-accent" /> Identity Manifest
                </h3>
                <div className="space-y-6">
                    <input required name="name" placeholder="FULL LEGAL NAME" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                    <input required name="email" type="email" placeholder="EMAIL ADDRESS" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                    <input required name="phone" placeholder="PHONE (WHATSAPP ENABLED)" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                </div>
            </div>

            {/* Payment Selection - Explicitly informational */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl relative">
                <div className="absolute -top-4 -right-4 bg-accent text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">Secure Selector</div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 flex items-center gap-4">
                  <CreditCard size={24} className="text-accent" /> Preferred Funding Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                        type="button"
                        onClick={() => setPaymentMethod('PayPal')}
                        className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${paymentMethod === 'PayPal' ? 'border-accent bg-accent/5 text-accent shadow-[0_0_30px_rgba(255,215,0,0.1)]' : 'border-white/5 bg-white/5 text-gray-500 opacity-40'}`}
                    >
                        <DollarSign size={32} />
                        <span className="font-black text-[10px] uppercase tracking-widest">PayPal / International</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => setPaymentMethod('Bank Transfer')}
                        className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${paymentMethod === 'Bank Transfer' ? 'border-accent bg-accent/5 text-accent shadow-[0_0_30px_rgba(255,215,0,0.1)]' : 'border-white/5 bg-white/5 text-gray-500 opacity-40'}`}
                    >
                        <MapPin size={32} />
                        <span className="font-black text-[10px] uppercase tracking-widest">Bank Transfer / IBAN</span>
                    </button>
                </div>
                <div className="mt-8 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                    <p className="text-[9px] text-red-400 font-black uppercase tracking-[0.2em] text-center leading-relaxed">
                        CRITICAL SECURITY NOTICE: Do not enter bank or PayPal details on this form. <br/> Your secure payment bridge will be provided directly by the Factory Link.
                    </p>
                </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-accent text-black py-7 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(255,215,0,0.2)] flex items-center justify-center gap-4 hover:bg-white transition-all disabled:opacity-50 group transform active:scale-95">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />} 
                {isSubmitting ? 'ENCRYPTING MANIFEST...' : 'FINALIZE MANIFEST ON WHATSAPP'}
            </button>
        </div>

        {/* Manifest Summary */}
        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] h-fit shadow-2xl sticky top-40">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 pb-6 border-b border-white/5">Studio Manifest Summary</h3>
            <div className="space-y-6 mb-10">
                {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.title}</span>
                            <span className="text-[9px] text-gray-500 uppercase font-black">QTY: {item.quantity} | SIZE: {item.selectedSize}</span>
                        </div>
                        <span className="text-xs font-black text-accent">{convertPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-10 pt-10 border-t border-white/10">
                <span className="text-sm font-black text-gray-500 uppercase tracking-[0.3em]">Total Valuation</span>
                <span className="text-4xl font-black text-white italic tracking-tighter shimmer-text">{convertPrice(totalUSD)}</span>
            </div>
            <div className="mt-10 flex items-center gap-4 justify-center">
                 <ShieldCheck size={14} className="text-accent" />
                 <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.6em]">Secure Studio Logistics Active</p>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
