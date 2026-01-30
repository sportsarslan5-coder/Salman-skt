
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, MapPin, Menu, X, User, ChevronDown, Package, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, cart, navigate, route, language } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Marketplace Top Bar */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark' : 'bg-dark'}`}>
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-4 lg:gap-8">
          
          {/* Logo & Brand */}
          <a href="#/" className="flex items-center gap-1 group shrink-0">
            <div className="text-xl md:text-2xl font-display font-black text-white tracking-tighter">
              SALMAN<span className="text-accent italic">SKT</span>
            </div>
          </a>

          {/* Delivery Info (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 text-white/70 hover:text-white cursor-pointer px-2 py-1 border border-transparent hover:border-white/20 rounded-sm transition-all">
            <MapPin size={18} className="text-white" />
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-medium">Deliver to</span>
              <span className="text-xs font-black uppercase tracking-widest text-white">USA Market</span>
            </div>
          </div>

          {/* Amazon-Style Search Hub */}
          <form onSubmit={handleSearch} className="flex-1 flex group">
            <div className="hidden md:flex items-center bg-gray-100 px-3 rounded-l-md border-r border-gray-300 text-[10px] font-black uppercase cursor-pointer hover:bg-gray-200">
              All <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="relative flex-1">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')} 
                className="w-full bg-white text-dark py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button type="submit" className="bg-accent hover:bg-white text-black px-5 rounded-r-md transition-colors">
              <Search size={20} strokeWidth={3} />
            </button>
          </form>

          {/* Account & Orders (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
             <div className="flex items-center gap-1 text-white/70 hover:text-white cursor-pointer px-3 py-1 border border-transparent hover:border-white/20 rounded-sm">
                <div className="flex flex-col -space-y-1 text-left">
                  <span className="text-[10px] font-medium">Hello, Sign in</span>
                  <span className="text-xs font-black uppercase tracking-widest text-white flex items-center">Account <ChevronDown size={12} className="ml-1 opacity-50" /></span>
                </div>
             </div>
             
             <a href="#/admin" className="flex flex-col -space-y-1 text-left px-3 py-1 border border-transparent hover:border-white/20 rounded-sm text-white/70 hover:text-white transition-all">
               <span className="text-[10px] font-medium">Returns</span>
               <span className="text-xs font-black uppercase tracking-widest text-white">& Orders</span>
             </a>

             {/* Cart Button */}
             <a href="#/cart" className="relative flex items-end gap-1 px-3 py-1 border border-transparent hover:border-white/20 rounded-sm text-white group">
                <div className="relative">
                  <ShoppingBag size={28} strokeWidth={1.5} className="group-hover:text-accent transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-accent text-black text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-dark">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                </div>
                <span className="text-sm font-black uppercase tracking-tighter hidden xl:block">Cart</span>
             </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Sub-Header: Categories Bar */}
        <div className="bg-[#232f3e] text-white py-2 px-4 flex items-center gap-6 overflow-x-auto no-scrollbar shadow-md">
            <button className="flex items-center gap-1 text-xs font-black uppercase tracking-widest whitespace-nowrap px-2 py-1 border border-transparent hover:border-white/40 rounded-sm">
              <Menu size={16} /> All
            </button>
            {['Team Uniforms', 'Active & Casual', 'Elite Shoes', 'Gear & Bags'].map(cat => (
              <a 
                key={cat} 
                href={`#/shop?category=${encodeURIComponent(cat)}`}
                className="text-xs font-bold uppercase tracking-widest whitespace-nowrap px-2 py-1 border border-transparent hover:border-white/40 rounded-sm"
              >
                {cat}
              </a>
            ))}
            <a href="#/smart-pricing" className="text-xs font-black uppercase tracking-widest text-accent whitespace-nowrap px-2 py-1 border border-transparent hover:border-white/40 rounded-sm flex items-center gap-1">
              Studio Lens <Search size={12} />
            </a>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-8 lg:hidden animate-fade-in-up">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
             <div className="text-2xl font-display font-black">SALMAN<span className="text-accent">SKT</span></div>
             <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            <a href="#/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase tracking-tighter flex items-center justify-between">Home <ChevronDown className="-rotate-90 opacity-20" /></a>
            <a href="#/shop" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase tracking-tighter flex items-center justify-between">Marketplace <ChevronDown className="-rotate-90 opacity-20" /></a>
            <a href="#/cart" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase tracking-tighter flex items-center justify-between">My Cart ({cart.length}) <ChevronDown className="-rotate-90 opacity-20" /></a>
            <a href="#/admin" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black uppercase tracking-tighter text-accent pt-6 border-t">Admin Access</a>
          </div>
        </div>
      )}

      <main className="flex-grow pt-[104px] bg-gray-100/50">
        {children}
      </main>

      <BottomNav />

      {/* Modern Footer */}
      <footer className="bg-dark text-white pt-16 pb-32 md:pb-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
              <h2 className="text-xl font-display font-black mb-6">SALMAN<span className="text-accent italic">SKT</span></h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Proprietary technical gear and elite fashion studio. Manufactured in Sialkot, PK. Distributed globally for the USA market.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Get to Know Us</h4>
              <ul className="text-xs font-bold text-gray-400 space-y-4 uppercase tracking-widest">
                <li><a href="#/" className="hover:text-white transition-colors">Our Studio</a></li>
                <li><a href="#/blog" className="hover:text-white transition-colors">Tech Journal</a></li>
                <li><a href="#/" className="hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Studio Support</h4>
              <ul className="text-xs font-bold text-gray-400 space-y-4 uppercase tracking-widest">
                <li><a href="#/admin" className="hover:text-white transition-colors">Order Manifests</a></li>
                <li><a href="#/contact" className="hover:text-white transition-colors">Factory Direct Link</a></li>
                <li><a href="#/cart" className="hover:text-white transition-colors">Returns Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Join Pro List</h4>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Email Address" className="bg-white/5 border border-white/10 p-3 rounded-md text-[10px] font-bold outline-none focus:border-accent" />
                <button className="bg-accent text-black py-3 rounded-md font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">Sign Up</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em]">© 2025 SALMAN SKT GLOBAL STUDIO PROTOCOL</p>
            <div className="flex gap-4">
               <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
               <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">PAYPAL</div>
               <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">IBAN</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
