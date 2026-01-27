
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, MessageCircle, MapPin, User, Loader2, DollarSign, ShieldCheck, RefreshCcw } from 'lucide-react';
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
                      `Please provide the secure ${paymentMethod} details for final settlement.`;
      
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
            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em] mb-10">Our global team is awaiting you on WhatsApp to provide payment details.</p>
            <a href="#/" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all">Return to Studio</a>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-12 text-white">Security <span className="text-accent">Checkout</span></h1>
      
      {/* Policy Banner */}
      <div className="mb-12 glass border border-accent/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <RefreshCcw size={32} />
          </div>
          <div>
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">100% Pre-Dispatch Refund Guarantee</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-tighter leading-relaxed">
                  Orders can be fully refunded via PayPal or Bank Transfer at any time before the status is marked as 'Dispatched'. 
                  Contact Studio Ops on WhatsApp for immediate reversal.
              </p>
          </div>
          <div className="md:ml-auto flex gap-4">
              <ShieldCheck className="text-accent" size={24} />
              <DollarSign className="text-accent" size={24} />
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

            {/* Payment Selection */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 flex items-center gap-4">
                  <CreditCard size={24} className="text-accent" /> Payment Methodology
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                        type="button"
                        onClick={() => setPaymentMethod('PayPal')}
                        className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${paymentMethod === 'PayPal' ? 'border-accent bg-accent/5 text-accent' : 'border-white/5 bg-white/5 text-gray-500'}`}
                    >
                        <DollarSign size={32} />
                        <span className="font-black text-[10px] uppercase tracking-widest">PayPal Global</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => setPaymentMethod('Bank Transfer')}
                        className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${paymentMethod === 'Bank Transfer' ? 'border-accent bg-accent/5 text-accent' : 'border-white/5 bg-white/5 text-gray-500'}`}
                    >
                        <MapPin size={32} />
                        <span className="font-black text-[10px] uppercase tracking-widest">Direct IBAN</span>
                    </button>
                </div>
                <p className="mt-8 text-[9px] text-gray-600 font-bold uppercase tracking-widest text-center">
                    DO NOT ENTER NUMBERS HERE. SECURE DETAILS PROVIDED ON WHATSAPP.
                </p>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-accent text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 hover:bg-white transition-all disabled:opacity-50 group">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle size={24} />} 
                {isSubmitting ? 'ENCRYPTING MANIFEST...' : 'FINALIZE VIA STUDIO BRIDGE'}
            </button>
        </div>

        {/* Manifest Summary */}
        <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] h-fit shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 pb-6 border-b border-white/5">Order Manifest</h3>
            <div className="space-y-6 mb-10">
                {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
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
                <span className="text-4xl font-black text-white italic tracking-tighter">{convertPrice(totalUSD)}</span>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
