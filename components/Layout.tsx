import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, MessageCircle, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WHATSAPP_NUMBER } from '../constants';

const { Link, useLocation } = ReactRouterDOM as any;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, language, setLanguage, currency, setCurrency, isRTL 
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'shop', path: '/shop' },
    { name: 'men', path: '/shop?category=Men' },
    { name: 'women', path: '/shop?category=Women' },
    { name: 'kids', path: '/shop?category=Kids' },
    { name: 'blog', path: '/blog' },
    { name: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
        return location.search.includes(path.split('?')[1]);
    }
    return location.pathname === path && location.search === '';
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-black">
      {/* Top Bar */}
      <div className="bg-black text-white py-2.5 px-4 text-xs tracking-wide z-50 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 opacity-90">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <MessageCircle size={14} /> <span className="font-medium">WhatsApp: 03039877968</span>
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-300">Global Shipping • 24/7 Support</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer text-xs">
                <button onClick={() => setLanguage('en')} className={`font-bold transition-colors ${language === 'en' ? 'text-accent' : 'text-gray-500 hover:text-white'}`}>EN</button>
                <span className="text-gray-700">/</span>
                <button onClick={() => setLanguage('ur')} className={`font-bold transition-colors ${language === 'ur' ? 'text-accent' : 'text-gray-500 hover:text-white'}`}>UR</button>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-xs">
                <button onClick={() => setCurrency('USD')} className={`font-bold transition-colors ${currency === 'USD' ? 'text-accent' : 'text-gray-500 hover:text-white'}`}>USD</button>
                <span className="text-gray-700">/</span>
                <button onClick={() => setCurrency('PKR')} className={`font-bold transition-colors ${currency === 'PKR' ? 'text-accent' : 'text-gray-500 hover:text-white'}`}>PKR</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Glassmorphism */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-2' 
            : 'bg-white border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter group">
                SALMAN<span className="text-accent group-hover:text-black transition-colors duration-300">.</span>SKT
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold uppercase tracking-wider transition-all duration-200 relative group ${
                    isActive(link.path) ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {t(link.name)}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block text-gray-600 hover:text-black">
                <Search size={20} />
              </button>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group text-gray-600 hover:text-black">
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full left-0 z-30 animate-slide-down shadow-xl h-screen">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-lg font-bold rounded-xl transition-colors ${
                    isActive(link.path) 
                      ? 'bg-accent/10 text-black border-l-4 border-accent' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                    <h3 className="text-3xl font-black tracking-tighter">SALMAN<span className="text-accent">.</span>SKT</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Experience the fusion of comfort and style. We bring you the finest footwear collection in Sialkot, crafted for champions.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all duration-300 transform hover:-translate-y-1">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all duration-300 transform hover:-translate-y-1">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all duration-300 transform hover:-translate-y-1">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white tracking-wide">{t('shop')}</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/shop?category=Men" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Men's Collection</Link></li>
                        <li><Link to="/shop?category=Women" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Women's Collection</Link></li>
                        <li><Link to="/shop?category=Kids" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> Kids' World</Link></li>
                        <li><Link to="/shop" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-accent rounded-full opacity-0 hover:opacity-100 transition-opacity"></span> New Arrivals</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white tracking-wide">Customer Care</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Order Tracking</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Size Guide</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Support</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white tracking-wide">{t('subscribe')}</h4>
                    <p className="text-gray-400 text-sm mb-4">Join our newsletter for exclusive drops.</p>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="bg-white/10 text-white px-5 py-3 pr-12 outline-none w-full text-sm rounded-lg focus:ring-2 focus:ring-accent transition-all border border-transparent focus:border-accent placeholder-gray-500" 
                        />
                        <button className="absolute right-1 top-1 bottom-1 bg-accent text-black px-3 rounded-md font-bold hover:bg-white transition-colors flex items-center justify-center">
                            <ArrowUp size={18} className="rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                <div>{t('footerText')}</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;