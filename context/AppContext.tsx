
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Language, Currency } from '../types';
import { TRANSLATIONS, EXCHANGE_RATE_PKR, PRODUCTS } from '../constants';
import { dbService } from '../services/dbService';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  products: Product[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  t: (key: string) => string;
  convertPrice: (priceUSD: number) => string;
  isRTL: boolean;
  isAdmin: boolean;
  loginAsAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  route: string;
  navigate: (path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD'); // Default for USA
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('admin_session') === 'active');
  const [route, setRoute] = useState<string>(window.location.hash.slice(1) || '/');

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const cloudData = await dbService.getProducts();
      if (!cloudData || cloudData.length === 0) {
        setProducts(PRODUCTS);
      } else {
        setProducts(cloudData);
      }
    } catch (e) {
      setProducts(PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setRoute(hash || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const loginAsAdmin = (pass: string) => {
    if (pass === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('admin_session', 'active');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('admin_session');
    navigate('/');
  };

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

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: quantity }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id && item.selectedSize === size ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      language, setLanguage, currency, setCurrency,
      products, isLoading, refreshProducts,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      t, convertPrice, isRTL,
      isAdmin, loginAsAdmin, logoutAdmin,
      route, navigate
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
