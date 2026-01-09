
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, MessageCircle, Instagram, Facebook, Twitter, Sparkles, Lock } from 'lucide-react';
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
    { name: 'women', path: '/shop?category=Women' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      {/* International Shipping Banner */}
      <div className="bg-accent text-black py-2 px-4 text-[10px] font-black uppercase tracking-[0.4em] text-center z-50">
        FAST WORLDWIDE SHIPPING TO USA • SALMAN SKT EXPORT STANDARDS • PREMIUM QUALITY
      </div>

      {/* Modern Navbar */}
      <nav className={`fixed w-full top-8 z-40 transition-all duration-500 px-4 md:px-10 ${scrolled ? 'top-2' : ''}`}>
        <div className={`max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 border border-white/5 ${scrolled ? 'bg-black/80 backdrop-blur-2xl py-4 shadow-2xl border-white/10' : 'bg-transparent py-6'}`}>
          <div className="px-6 md:px-10 flex justify-between items-center">
            <a href="#/" className="text-3xl font-black tracking-tighter uppercase flex items-center gap-1 group italic text-white">
              SALMAN<span className="text-accent group-hover:scale-110 transition-transform">SKT</span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path}`}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${route === link.path ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.name === 'smartPricing' && <Sparkles size={12} className="text-accent animate-pulse" />}
                  {t(link.name)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <button onClick={() => navigate('/shop')} className="hidden md:block text-gray-400 hover:text-white">
                <Search size={22} />
              </button>
              <a href="#/cart" className="relative text-white group">
                <ShoppingBag size={24} className="group-hover:text-accent transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full animate-bounce shadow-xl">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 md:pt-32">
        {children}
      </main>

      <BottomNav />

      {/* Premium Footer */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
            <div className="md:col-span-5">
              <h3 className="text-3xl font-black uppercase mb-10 italic text-white">SALMAN<span className="text-accent">SKT</span></h3>
              <p className="text-gray-500 text-sm max-w-sm mb-12 leading-relaxed uppercase tracking-widest font-bold opacity-60">
                Direct-from-factory technical apparel. "I was a lesson" — Bringing the craftsmanship of Salman SKT to your doorstep.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-1"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-1"><Facebook size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all hover:-translate-y-1"><Twitter size={20} /></a>
              </div>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-accent font-black uppercase text-[10px] tracking-[0.5em] mb-10">Categories</h4>
              <ul className="space-y-6 text-xs font-black uppercase tracking-widest text-gray-400">
                <li><a href="#/shop?category=Men" className="hover:text-accent transition-colors">Men's Technical</a></li>
                <li><a href="#/shop?category=Women" className="hover:text-accent transition-colors">Women's Elite</a></li>
                <li><a href="#/smart-pricing" className="hover:text-accent transition-colors">AI Price Analysis</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-accent font-black uppercase text-[10px] tracking-[0.5em] mb-10">Support</h4>
              <ul className="space-y-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
                <li className="flex items-center gap-4 border-b border-white/5 pb-4"><MessageCircle size={18} className="text-accent" /> WhatsApp: +92 303 9877968</li>
                <li><a href="#/admin" className="hover:text-white flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"><Lock size={16} className="text-accent" /> Merchant Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-16 text-center border-t border-white/5">
            <p className="text-gray-700 text-[9px] uppercase tracking-[0.8em] font-black">SALMAN SKT © 2024 • GLOBAL LOGISTICS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
