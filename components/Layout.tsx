
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, MessageCircle, Instagram, Facebook, Twitter, Sparkles, Lock, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, navigate, route 
  } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'shop', path: '/shop' },
    { name: 'smartPricing', path: '/smart-pricing' }, 
    { name: 'men', path: '/shop?category=Men' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      {/* International Shipping Banner */}
      <div className="bg-accent text-black py-2.5 px-4 text-[9px] font-black uppercase tracking-[0.5em] text-center z-50 shadow-2xl flex items-center justify-center gap-4">
        <Globe size={12} className="animate-pulse" /> SALMAN SKT STUDIO ORIGINALS • USA EXPORT CERTIFIED • SIALKOT, PK
      </div>

      {/* Modern Navbar */}
      <nav className={`fixed w-full top-10 z-40 transition-all duration-700 px-4 md:px-12 ${scrolled ? 'top-4' : ''}`}>
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] transition-all duration-700 border border-white/5 overflow-hidden ${scrolled ? 'bg-black/80 backdrop-blur-3xl py-4 shadow-[0_30px_100px_rgba(0,0,0,0.8)] border-white/10' : 'bg-transparent py-8'}`}>
          <div className="px-8 md:px-12 flex justify-between items-center relative">
            {/* Branding */}
            <a href="#/" className="text-3xl font-black tracking-tighter uppercase flex flex-col items-start group italic text-white leading-none">
              <div>SALMAN<span className="text-accent group-hover:scale-110 transition-transform inline-block">SKT</span></div>
              <span className="text-[8px] tracking-[0.8em] text-white/20 font-black mt-1.5 uppercase">I WAS A LESSON</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path}`}
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-2 relative group py-2 ${route === link.path ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
                >
                  {link.name === 'smartPricing' && <Sparkles size={12} className="text-accent animate-pulse" />}
                  {t(link.name)}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ${route === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-10">
              <button onClick={() => navigate('/shop')} className="hidden md:block text-gray-500 hover:text-white transition-colors">
                <Search size={24} strokeWidth={1.5} />
              </button>
              <a href="#/cart" className="relative text-white group bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all shadow-xl">
                <ShoppingBag size={24} className="group-hover:text-accent transition-colors" strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full animate-bounce shadow-2xl border border-black/10">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 md:pt-40">
        {children}
      </main>

      <BottomNav />

      {/* Premium Footer */}
      <footer className="bg-black border-t border-white/5 pt-48 pb-24 hidden md:block relative overflow-hidden">
        <div className="absolute top-0 right-0 p-40 opacity-[0.02] pointer-events-none select-none italic font-black text-[30vw]">SKT</div>
        
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
            <div className="md:col-span-6">
              <h3 className="text-5xl font-black uppercase mb-4 italic text-white leading-none tracking-tighter">SALMAN<br/><span className="text-accent">SKT STUDIO</span></h3>
              <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase mb-12">I WAS A LESSON</p>
              <p className="text-gray-600 text-sm max-w-md mb-16 leading-relaxed uppercase tracking-tighter font-bold opacity-60 italic">
                Pioneering technical apparel and industrial studio equipment directly from Sialkot's export engine. Engineered for extreme durability and global recognition.
              </p>
              <div className="flex gap-8">
                <a href="#" className="w-14 h-14 rounded-3xl glass border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-2 shadow-xl"><Instagram size={24} /></a>
                <a href="#" className="w-14 h-14 rounded-3xl glass border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-2 shadow-xl"><Facebook size={24} /></a>
                <a href="#" className="w-14 h-14 rounded-3xl glass border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-2 shadow-xl"><Twitter size={24} /></a>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-accent font-black uppercase text-[11px] tracking-[0.6em] mb-12 italic">Studio Inventory</h4>
              <ul className="space-y-8 text-xs font-black uppercase tracking-[0.4em] text-gray-500">
                <li><a href="#/shop?category=Men" className="hover:text-white transition-colors">Technical Soup Jackets</a></li>
                <li><a href="#/shop?category=Accessories" className="hover:text-white transition-colors">Industrial Stands</a></li>
                <li><a href="#/shop?category=Men" className="hover:text-white transition-colors">Elite Field Jerseys</a></li>
                <li><a href="#/smart-pricing" className="hover:text-white transition-colors flex items-center gap-3">AI Price Lens <Sparkles size={12} className="text-accent"/></a></li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-accent font-black uppercase text-[11px] tracking-[0.6em] mb-12 italic">Direct Support</h4>
              <ul className="space-y-8 text-xs text-gray-600 font-bold uppercase tracking-[0.4em]">
                <li className="flex items-center gap-5 pb-6 border-b border-white/5"><MessageCircle size={22} className="text-accent" /> +92 303 9877968</li>
                <li><a href="#/admin" className="hover:text-white flex items-center gap-5 glass p-6 rounded-[2rem] border border-white/5 shadow-2xl transition-all hover:border-accent/20"><Lock size={18} className="text-accent" /> Command Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-24 text-center border-t border-white/5">
            <p className="text-gray-800 text-[10px] uppercase tracking-[1em] font-black">SALMAN SKT FLAGSHIP © 2025 • GLOBAL ARCHIVE ACCESS • SIALKOT PK</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
