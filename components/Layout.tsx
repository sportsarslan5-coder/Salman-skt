
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, Globe, DollarSign, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, navigate, route, language, setLanguage, currency, setCurrency 
  } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Global Shipping Marquee */}
      <div className="bg-accent text-black py-2 px-4 text-[9px] font-black uppercase tracking-[0.5em] overflow-hidden whitespace-nowrap z-50 shadow-2xl">
        <div className="flex animate-marquee">
          <span className="mx-10 flex items-center gap-4"><Globe size={12} /> GLOBAL EXPORT READY</span>
          <span className="mx-10 flex items-center gap-4"><Globe size={12} /> SIALKOT FACTORY DIRECT</span>
          <span className="mx-10 flex items-center gap-4"><Globe size={12} /> I WAS A LESSON</span>
          <span className="mx-10 flex items-center gap-4"><Globe size={12} /> GLOBAL EXPORT READY</span>
          <span className="mx-10 flex items-center gap-4"><Globe size={12} /> SIALKOT FACTORY DIRECT</span>
        </div>
      </div>

      <nav className={`fixed w-full top-10 z-40 transition-all duration-700 px-4 md:px-12 ${scrolled ? 'top-2' : ''}`}>
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] border border-white/5 transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-3xl py-4 shadow-2xl border-white/10' : 'bg-transparent py-8'}`}>
          <div className="px-8 md:px-12 flex justify-between items-center">
            {/* Logo */}
            <a href="#/" className="text-3xl font-display font-black tracking-tighter uppercase italic text-white group">
              SALMAN<span className="text-accent group-hover:scale-110 transition-transform inline-block">SKT</span>
              <div className="text-[8px] tracking-[0.6em] text-white/20 font-black mt-1 uppercase group-hover:text-accent transition-colors">I WAS A LESSON</div>
            </a>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path}`}
                  className={`text-[9px] font-black uppercase tracking-[0.4em] transition-all relative group py-2 ${route === link.path ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
                >
                  {link.name === 'smartPricing' && <Sparkles size={10} className="text-accent inline mr-2 animate-pulse" />}
                  {t(link.name)}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all ${route === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
            </div>

            {/* Multi-Control */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 glass px-6 py-3 rounded-full border border-white/5">
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                  className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <Languages size={14} /> {language === 'en' ? 'URDU' : 'ENGLISH'}
                </button>
                <div className="w-[1px] h-3 bg-white/10"></div>
                <button 
                  onClick={() => setCurrency(currency === 'USD' ? 'PKR' : 'USD')}
                  className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-colors flex items-center gap-2"
                >
                  <DollarSign size={14} /> {currency}
                </button>
              </div>

              <a href="#/cart" className="relative group glass p-4 rounded-2xl border border-white/10 hover:border-accent/40 transition-all">
                <ShoppingBag size={22} className="group-hover:text-accent transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-2xl border border-black/10">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32">
        {children}
      </main>

      <BottomNav />

      <footer className="bg-black border-t border-white/5 pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.02] pointer-events-none select-none italic font-black text-[35vw]">SKT</div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <div className="mb-20">
             <h2 className="text-7xl font-display font-black italic uppercase tracking-tighter mb-4">SALMAN<span className="text-accent">SKT</span></h2>
             <p className="text-accent text-[11px] font-black tracking-[1em] uppercase">Technical Archive_2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mb-20 border-b border-white/5 pb-20">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Navigation</h4>
                <ul className="text-xs font-bold uppercase tracking-widest text-white/50 space-y-4">
                  <li><a href="#/" className="hover:text-accent">Home</a></li>
                  <li><a href="#/shop" className="hover:text-accent">Catalog</a></li>
                  <li><a href="#/smart-pricing" className="hover:text-accent">AI Lens</a></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Connect</h4>
                <ul className="text-xs font-bold uppercase tracking-widest text-white/50 space-y-4">
                  <li><a href="#" className="hover:text-accent">Instagram</a></li>
                  <li><a href="#" className="hover:text-accent">Facebook</a></li>
                  <li><a href="#" className="hover:text-accent">Twitter (X)</a></li>
                </ul>
             </div>
             <div className="space-y-6 col-span-2">
                <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">HQ Newsletter</h4>
                <div className="flex gap-4">
                   <input placeholder="ENTER EMAIL" className="bg-white/5 border border-white/10 p-5 rounded-2xl flex-1 text-[10px] font-black tracking-widest outline-none focus:border-accent" />
                   <button className="bg-white text-black px-10 rounded-2xl font-black text-[10px] tracking-widest">JOIN</button>
                </div>
             </div>
          </div>
          <p className="text-gray-800 text-[9px] uppercase tracking-[1em] font-black">SALMAN SKT © 2025 • ALL RIGHTS RESERVED • SIALKOT PK</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
