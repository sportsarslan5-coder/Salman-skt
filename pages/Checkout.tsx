
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, MessageCircle, MapPin, User, Loader2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { dbService } from '../services/dbService';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, convertPrice, clearCart, t } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const message = `*NEW ORDER REQUEST - SIALKOT SHOP*%0a*CUSTOMER:* ${formData.name}%0a*PHONE:* ${formData.phone}%0a*ITEMS:*%0a${orderItems}%0a*TOTAL:* ${convertPrice(totalUSD)}`;
      
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
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">Order Synced</h2>
            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em] mb-10">Our global team is processing your request on WhatsApp.</p>
            <a href="#/" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all">Return Home</a>
        </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-12 text-white">Final <span className="text-accent">Checkout</span></h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 flex items-center gap-4">
                  <User size={24} className="text-accent" /> Customer Credentials
                </h3>
                <div className="space-y-6">
                    <input required name="name" placeholder="FULL NAME" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                    <input required name="email" type="email" placeholder="EMAIL ADDRESS" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                    <input required name="phone" placeholder="PHONE NUMBER (WITH COUNTRY CODE)" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-10 flex items-center gap-4">
                  <MapPin size={24} className="text-accent" /> Delivery Logistics
                </h3>
                <div className="space-y-6">
                    <input required name="city" placeholder="CITY / STATE" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                    <input required name="homeNumber" placeholder="FULL SHIPPING ADDRESS" onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-accent font-bold text-xs uppercase tracking-widest" />
                </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-accent text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 hover:bg-white transition-all disabled:opacity-50 group">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle size={24} />} 
                {isSubmitting ? 'SECURELY SAVING ORDER...' : 'PLACE ORDER VIA WHATSAPP'}
            </button>
        </div>

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
