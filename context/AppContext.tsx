import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Language, Currency } from '../types';
import { TRANSLATIONS, EXCHANGE_RATE_PKR } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, qty: number) => void;
  clearCart: () => void;
  t: (key: string) => string;
  convertPrice: (priceUSD: number) => string;
  isRTL: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);

  const isRTL = language === 'ur';

  const t = (key: string): string => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  const convertPrice = (priceUSD: number): string => {
    if (currency === 'PKR') {
      return `₨ ${(priceUSD * EXCHANGE_RATE_PKR).toLocaleString()}`;
    }
    return `$${priceUSD.toFixed(2)}`;
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: number, size: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id && item.selectedSize === size ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      language, setLanguage, currency, setCurrency,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      t, convertPrice, isRTL
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-urdu' : 'font-sans'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};