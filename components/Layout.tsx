import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, MessageCircle, Instagram, Facebook, Twitter, ArrowUp, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, language, setLanguage, currency, setCurrency, isRTL, route, navigate 
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [route]);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'shop', path: '/shop' },
    { name: 'smartPricing', path: '/smart-pricing' }, // Added new link
    { name: 'men', path: '/shop?category=Men' },
    { name: 'women', path: '/shop?category=Women' },
    { name: 'kids', path: '/shop?category=Kids' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    const currentPath = route.split('?')[0];
    const currentQuery = route.split('?')[1] || '';
    if (path.includes('?')) {
        return currentQuery.includes(path.split('?')[1]);
    }
    return currentPath === path && !currentQuery;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-black">
      {/* Top Bar */}
      <div className="bg-black text-white py-2.5 px-4 text-xs tracking-wide z-50 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 opacity-90">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <MessageCircle size={14} /> <span className="font-medium">WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-300">Global Shipping • 24/7 Support</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer text-xs">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`font-bold transition-colors ${language === 'en' ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  ENG
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setLanguage('ur')} 
                  className={`font-bold transition-colors ${language === 'ur' ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  اردو
                </button>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-xs">
                 <button 
                  onClick={() => setCurrency('USD')} 
                  className={`font-bold transition-colors ${currency === 'USD' ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  $ USD
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setCurrency('PKR')} 
                  className={`font-bold transition-colors ${currency === 'PKR' ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  ₨ PKR
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-white py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 text-black hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <a href="#/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-1">
              SALMAN<span className="text-accent">SKT</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path}`}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-accent flex items-center gap-1 ${isActive(link.path) ? 'text-accent' : 'text-black'}`}
                >
                  {link.name === 'smartPricing' && <Sparkles size={14} className="text-accent" />}
                  {t(link.name)}
                </a>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
               {/* Search Icon (Desktop) */}
              <button onClick={() => navigate('/shop')} className="hidden sm:flex hover:text-accent transition-colors">
                <Search size={22} strokeWidth={1.5} />
              </button>

              {/* Cart */}
              <a href="#/cart" className="relative group hover:text-accent transition-colors">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[80%] max-w-sm bg-white shadow-2xl p-6 flex flex-col`}>
             <div className="flex justify-between items-center mb-8">
                <a href="#/" className="text-2xl font-black tracking-tighter uppercase">
                  SALMAN<span className="text-accent">SKT</span>
                </a>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
             </div>

             <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
               {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={`#${link.path}`}
                    className={`text-lg font-bold uppercase tracking-wider flex items-center gap-2 ${isActive(link.path) ? 'text-accent' : 'text-black'}`}
                  >
                     {link.name === 'smartPricing' && <Sparkles size={16} className="text-accent" />}
                    {t(link.name)}
                  </a>
                ))}
             </div>

             <div className="border-t pt-6 space-y-4">
                <p className="text-sm text-gray-500">Language</p>
                <div className="flex gap-4">
                   <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded-lg border ${language === 'en' ? 'bg-black text-white border-black' : 'border-gray-200'}`}>English</button>
                   <button onClick={() => setLanguage('ur')} className={`px-4 py-2 rounded-lg border ${language === 'ur' ? 'bg-black text-white border-black' : 'border-gray-200'}`}>اردو</button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <a href="#/" className="text-3xl font-black tracking-tighter uppercase mb-6 block">
                SALMAN<span className="text-accent">SKT</span>
              </a>
              <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                Premium sneakers and streetwear for the modern generation. Sialkot's finest fashion destination.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-black transition-colors"><Instagram size={20} /></a>
                 <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-black transition-colors"><Facebook size={20} /></a>
                 <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-accent hover:text-black transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">{t('shop')}</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#/smart-pricing" className="hover:text-accent transition-colors flex items-center gap-2"><Sparkles size={14} /> Smart Pricing</a></li>
                <li><a href="#/shop?category=Men" className="hover:text-white transition-colors">Men's Collection</a></li>
                <li><a href="#/shop?category=Women" className="hover:text-white transition-colors">Women's Collection</a></li>
                <li><a href="#/shop?category=Kids" className="hover:text-white transition-colors">Kids' Collection</a></li>
              </ul>
            </div>

            <div>
               <h4 className="font-bold text-lg mb-6">{t('contact')}</h4>
               <ul className="space-y-4 text-gray-400">
                 <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">WhatsApp Support</a></li>
                 <li><a href="#/contact" className="hover:text-white transition-colors">Store Location</a></li>
                 <li><a href="#/contact" className="hover:text-white transition-colors">Email Us</a></li>
               </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {t('footerText')}
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
               <a href="#" className="hover:text-white">Privacy Policy</a>
               <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;