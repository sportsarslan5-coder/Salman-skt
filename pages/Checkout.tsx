import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, MessageCircle, MapPin, Home, User } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const Checkout: React.FC = () => {
  const { cart, convertPrice, clearCart, t } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    neighborhood: '',
    homeNumber: '',
    phone: ''
  });

  const totalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const orderItems = cart.map((item, index) => `${index + 1}. ${item.name} (Size: ${item.selectedSize}, Qty: ${item.quantity})`).join('%0a');
    const total = convertPrice(totalUSD);
    
    const message = `*NEW ORDER REQUEST - SALMAN SKT*%0a----------------------------%0a*CUSTOMER DETAILS:*%0a👤 Name: ${formData.name}%0a🏙️ City: ${formData.city}%0a🏘️ Neighborhood: ${formData.neighborhood}%0a🏠 Home Number: ${formData.homeNumber}%0a📞 Phone: ${formData.phone}%0a----------------------------%0a*ORDER ITEMS:*%0a${orderItems}%0a----------------------------%0a*TOTAL PRICE:* ${total}%0a----------------------------%0aPlease confirm my order.`;
    
    // Clear cart and redirect
    clearCart();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-fade-in text-center">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
              </div>
            <h2 className="text-3xl font-bold mb-2">Order Processed</h2>
            <p className="text-gray-600 mb-8">If you clicked "Order", your details have been sent to WhatsApp. If not, your cart is empty.</p>
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
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
                <MessageCircle className="text-green-600 mt-1" />
                <p className="text-sm text-green-800">
                    <strong>Direct Order:</strong> Clicking "Place Order" will verify your details on WhatsApp (Sajda - 03039877968).
                </p>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><User size={20} /> Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      required 
                      name="name" 
                      autoComplete="name"
                      placeholder="Full Name" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                    <input 
                      required 
                      name="phone" 
                      type="tel" 
                      autoComplete="tel"
                      placeholder="Phone Number" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><MapPin size={20} /> Delivery Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      required 
                      name="city" 
                      autoComplete="address-level2"
                      placeholder="City Name" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                    <input 
                      required 
                      name="neighborhood" 
                      autoComplete="address-level3"
                      placeholder="Neighborhood / Area" 
                      onChange={handleInputChange} 
                      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                    />
                </div>
                <div className="mb-4">
                     <input 
                       required 
                       name="homeNumber" 
                       autoComplete="address-line1"
                       placeholder="Home Number / House Address" 
                       onChange={handleInputChange} 
                       className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-accent outline-none" 
                      />
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-4">Payment Method</h3>
                <div className="space-y-3">
                     <label className="flex items-center p-4 border border-accent bg-yellow-50 rounded-lg cursor-pointer shadow-sm">
                        <input type="radio" name="payment" defaultChecked className="mr-3 w-4 h-4 text-accent" />
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Cash on Delivery (COD)</span>
                        </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-gray-400 transition-colors opacity-60">
                        <input type="radio" name="payment" disabled className="mr-3 w-4 h-4" />
                        <div className="flex items-center gap-2 text-gray-500">
                            <CreditCard size={20} /> Online Payment (Coming Soon)
                        </div>
                    </label>
                </div>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors mt-6 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 duration-200">
                <MessageCircle size={24} /> {t('placeOrder')} - {convertPrice(totalUSD)}
            </button>
        </form>

        {/* Mini Summary */}
        <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-200">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Your Order Summary</h3>
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="text-sm flex-1">
                            <span className="font-bold block line-clamp-2">{item.name}</span>
                            <span className="text-gray-500 block mt-1">Qty: {item.quantity} | Size: {item.selectedSize}</span>
                        </div>
                        <span className="font-medium text-accent">{convertPrice(item.priceUSD * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-300 font-bold text-xl">
                <span>Total Amount</span>
                <span className="text-primary">{convertPrice(totalUSD)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;