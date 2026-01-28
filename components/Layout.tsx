
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, Globe, Heart, Menu, X, User, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, navigate, route 
  } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'shop', path: '/shop' },
    { name: 'smartPricing', path: '/smart-pricing' }, 
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-5 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center gap-6">
          {/* Logo */}
          <a href="#/" className="text-xl md:text-2xl font-display font-black tracking-tight text-gray-900 flex items-center gap-1 group whitespace-nowrap">
            SALMAN<span className="text-accent group-hover:opacity-80 transition-opacity">SKT</span>
          </a>

          {/* Amazon-style Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder={t('search')} 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</span>
              <a href="#/admin" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
                Studio Access <User size={14} />
              </a>
            </div>
            
            <a href="#/cart" className="relative group p-2 text-gray-600 hover:text-accent transition-all flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">Cart</span>
            </a>
          </div>

          <button className="lg:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-10 lg:hidden">
          <button className="self-end mb-12" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display font-bold uppercase tracking-tighter border-b border-gray-50 pb-4 hover:text-accent transition-colors"
              >
                {t(link.name)}
              </a>
            ))}
            <a href="#/admin" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-bold uppercase tracking-tighter text-accent pt-4">Admin Login</a>
          </div>
        </div>
      )}

      <main className="flex-grow pt-20">
        {children}
      </main>

      <BottomNav />

      <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h2 className="text-lg font-display font-black mb-4">SALMAN<span className="text-accent">SKT</span></h2>
              <p className="text-gray-500 text-xs leading-relaxed uppercase font-bold tracking-tighter opacity-80">
                The global studio for technical apparel and elite fashion. Exported directly from our Sialkot manufacturing facility to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-6">Catalog</h4>
              <ul className="text-xs font-bold text-gray-500 space-y-4 uppercase tracking-wider">
                <li><a href="#/shop" className="hover:text-accent transition-colors">All Products</a></li>
                <li><a href="#/shop?category=Team Uniforms" className="hover:text-accent transition-colors">Team Uniforms</a></li>
                <li><a href="#/shop?category=Elite Shoes" className="hover:text-accent transition-colors">Elite Shoes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-6">Support</h4>
              <ul className="text-xs font-bold text-gray-500 space-y-4 uppercase tracking-wider">
                <li><a href="#/contact" className="hover:text-accent transition-colors">Factory Help</a></li>
                <li><a href="#/admin" className="hover:text-accent transition-colors flex items-center gap-2 text-dark">Admin Portal <Lock size={12}/></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-6">Factory Link</h4>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Globe size={14} /> SIALKOT, PK
                </p>
                <button className="bg-dark text-white py-3 px-6 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-black transition-all">Join Studio Mail</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.4em]">© 2025 SALMAN SKT • GLOBAL EXPORT PROTOCOL</p>
            <div className="flex gap-6 opacity-30">
               <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
               <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
               <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
