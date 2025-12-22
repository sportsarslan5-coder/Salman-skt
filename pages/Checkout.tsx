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
      const message = `*NEW ORDER REQUEST - SALMAN SKT*%0a*CUSTOMER:* ${formData.name}%0a*PHONE:* ${formData.phone}%0a*ITEMS:*%0a${orderItems}%0a*TOTAL:* ${convertPrice(totalUSD)}`;
      
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
            <CheckCircle size={40} className="text-green-600 mb-6" />
            <h2 className="text-3xl font-bold mb-2">Order Confirmed</h2>
            <p className="text-gray-500 mb-6">Your order has been saved and our team is ready to assist you on WhatsApp.</p>
            <a href="#/" className="bg-black text-white px-8 py-3 rounded-full mt-4 font-bold hover:bg-accent hover:text-black transition-all">Return Home</a>
        </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-tighter">{t('checkout')}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-xl flex items-center gap-2 mb-6"><User size={20} className="text-accent" /> Customer Details</h3>
                <div className="space-y-4">
                    <input required name="name" placeholder="Full Name" onChange={handleInputChange} className="w-full border-2 border-white bg-white p-4 rounded-xl shadow-sm focus:border-accent outline-none" />
                    <input required name="email" type="email" placeholder="Email Address" onChange={handleInputChange} className="w-full border-2 border-white bg-white p-4 rounded-xl shadow-sm focus:border-accent outline-none" />
                    <input required name="phone" placeholder="Phone Number" onChange={handleInputChange} className="w-full border-2 border-white bg-white p-4 rounded-xl shadow-sm focus:border-accent outline-none" />
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-xl flex items-center gap-2 mb-6"><MapPin size={20} className="text-accent" /> Shipping Information</h3>
                <div className="space-y-4">
                    <input required name="city" placeholder="City" onChange={handleInputChange} className="w-full border-2 border-white bg-white p-4 rounded-xl shadow-sm focus:border-accent outline-none" />
                    <input required name="homeNumber" placeholder="Full Address / Landmark" onChange={handleInputChange} className="w-full border-2 border-white bg-white p-4 rounded-xl shadow-sm focus:border-accent outline-none" />
                </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:bg-accent hover:text-black transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle size={24} />} 
                {isSubmitting ? 'Saving Global Order...' : 'Confirm Order via WhatsApp'}
            </button>
        </div>

        <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100">
            <h3 className="font-black uppercase tracking-tighter text-lg mb-6 border-b pb-4">Order Summary</h3>
            <div className="space-y-4 mb-6">
                {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                        <div className="flex flex-col">
                            <span className="font-bold">{item.title}</span>
                            <span className="text-xs text-gray-400 uppercase">Qty: {item.quantity} | Size: {item.selectedSize}</span>
                        </div>
                        <span className="font-bold">{convertPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 font-black text-2xl tracking-tighter">
                <span>Total</span>
                <span className="text-accent bg-black px-3 py-1 rounded-lg">{convertPrice(totalUSD)}</span>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;