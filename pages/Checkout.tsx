import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, MessageCircle, MapPin, User } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { dbService } from '../services/dbService';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, convertPrice, clearCart, t } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    neighborhood: '',
    homeNumber: '',
    phone: '',
    email: ''
  });

  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Save to Database (Admin Panel Tracking)
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: `${formData.homeNumber}, ${formData.neighborhood}`,
      items: cart.map(item => ({
        productName: item.name,
        price: item.priceUSD,
        quantity: item.quantity,
        size: item.selectedSize
      })),
      total: totalUSD,
      status: 'Pending',
      date: new Date().toISOString()
    };

    dbService.saveOrder(newOrder);

    // 2. Construct WhatsApp Message
    const orderItems = cart.map((item, index) => `${index + 1}. ${item.name} (Size: ${item.selectedSize}, Qty: ${item.quantity})`).join('%0a');
    const total = convertPrice(totalUSD);
    
    const message = `*NEW ORDER REQUEST - SALMAN SKT*%0a----------------------------%0a*ORDER ID: #${newOrder.id.slice(-6)}*%0a----------------------------%0a*CUSTOMER DETAILS:*%0a👤 Name: ${formData.name}%0a📧 Email: ${formData.email}%0a🏙️ City: ${formData.city}%0a🏘️ Neighborhood: ${formData.neighborhood}%0a🏠 Address: ${formData.homeNumber}%0a📞 Phone: ${formData.phone}%0a----------------------------%0a*ORDER ITEMS:*%0a${orderItems}%0a----------------------------%0a*TOTAL PRICE:* ${total}%0a----------------------------%0aPlease confirm my order.`;
    
    // 3. Cleanup and Redirect
    clearCart();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-fade-in text-center">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
              </div>
            <h2 className="text-3xl font-bold mb-2">Order Success</h2>
            <p className="text-gray-600 mb-8">Your order details have been sent to our admin team and WhatsApp.</p>
            <a href="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-accent hover:text-black transition-colors">
                Return Home
            </a>
        </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
                <MessageCircle className="text-green-600 mt-1" />
                <p className="text-sm text-green-800">
                    <strong>Direct Order:</strong> Your details will be saved securely and verified via WhatsApp.
                </p>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><User size={20} /> Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      required 
                      name="name" 
                      placeholder="Full Name" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                    <input 
                      required 
                      name="email" 
                      type="email"
                      placeholder="Email Address" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                </div>
                <div className="mb-4">
                    <input 
                      required 
                      name="phone" 
                      type="tel" 
                      placeholder="Phone Number (e.g. 0303 9877968)" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><MapPin size={20} /> Shipping Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      required 
                      name="city" 
                      placeholder="City Name" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                    <input 
                      required 
                      name="neighborhood" 
                      placeholder="Neighborhood / Area" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                </div>
                <div className="mb-4">
                     <input 
                       required 
                       name="homeNumber" 
                       placeholder="Full Address / Landmark" 
                       onChange={handleInputChange} 
                       className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                      />
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4 text-gray-500">Payment Options</h3>
                <div className="space-y-3">
                     <label className="flex items-center p-4 border border-accent bg-yellow-50 rounded-lg cursor-pointer shadow-sm transition-all hover:scale-[1.01]">
                        <input type="radio" name="payment" defaultChecked className="mr-3 w-4 h-4 text-accent" />
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Cash on Delivery (COD)</span>
                        </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer opacity-50 bg-gray-50">
                        <input type="radio" name="payment" disabled className="mr-3 w-4 h-4" />
                        <div className="flex items-center gap-2 text-gray-500">
                            <CreditCard size={20} /> Online Bank Transfer (Soon)
                        </div>
                    </label>
                </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-black transition-all mt-6 flex items-center justify-center gap-2 shadow-xl transform hover:scale-[1.02] duration-200">
                <MessageCircle size={24} /> Confirm & Place Order
            </button>
        </form>

        <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100">
            <h3 className="font-black uppercase tracking-tighter text-lg mb-6 border-b pb-4">Order Summary</h3>
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                        <div className="text-sm flex-1">
                            <span className="font-bold block line-clamp-2">{item.name}</span>
                            <span className="text-gray-400 block mt-1 uppercase font-black text-[10px]">Qty: {item.quantity} | Size: {item.selectedSize}</span>
                        </div>
                        <span className="font-black text-primary">{convertPrice(item.priceUSD * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 font-black text-2xl tracking-tighter uppercase">
                <span>Total</span>
                <span className="text-accent bg-black px-3 py-1 rounded-lg">{convertPrice(totalUSD)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;