import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, convertPrice, t } = useAppContext();

  const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">{t('emptyCart')}</h2>
        <a href="#/shop" className="text-accent underline hover:text-black">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('cart')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm">Size: {item.selectedSize} | {convertPrice(item.price)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex items-center mt-4 gap-4">
                  <div className="flex items-center border rounded-full">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="p-2"><Minus size={16} /></button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="p-2"><Plus size={16} /></button>
                  </div>
                  <span className="font-bold ml-auto">{convertPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="flex justify-between mb-8 text-xl font-bold">
            <span>{t('total')}</span>
            <span>{convertPrice(totalUSD)}</span>
          </div>
          <a href="#/checkout" className="block w-full bg-black text-white text-center py-4 rounded-full font-bold">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;