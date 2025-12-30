
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, MessageCircle, Instagram, Facebook, Twitter, Sparkles, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    t, cart, navigate, route 
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

  const navLinks = [
    { name: 'home', path: '/' },
    { name: 'shop', path: '/shop' },
    { name: 'smartPricing', path: '/smart-pricing' }, 
    { name: 'men', path: '/shop?category=Men' },
    { name: 'women', path: '/shop?category=Women' },
    { name: 'kids', path: '/shop?category=Kids' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-accent selection:text-black">
      {/* Top Banner */}
      <div className="bg-accent text-black py-1 px-4 text-[9px] font-black uppercase tracking-[0.3em] text-center z-50">
        World's Best Sialkot Quality • Fast Shipping • Quality Guaranteed
      </div>

      {/* Premium Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-lg border-b border-white/10' : 'bg-black'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>

            <a href="#/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-1 group">
              SIALKOT<span className="text-accent italic group-hover:scale-110 transition-transform">SHOP</span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path}`}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${route === link.path ? 'text-accent' : 'text-gray-400 hover:text-accent'}`}
                >
                  {link.name === 'smartPricing' && <Sparkles size={10} className="text-accent" />}
                  {t(link.name)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/shop')} className="text-white hover:text-accent">
                <Search size={20} />
              </button>
              <a href="#/cart" className="relative text-white hover:text-accent">
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/95" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-[80%] bg-[#0a0a0a] border-r border-white/10 p-10 animate-fade-in-right">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black uppercase">SIALKOT<span className="text-accent">SHOP</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={`#${link.path}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-tighter hover:text-accent">
                  {t(link.name)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />

      {/* Footer (Hidden on Mobile for cleaner app feel) */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <h3 className="text-2xl font-black uppercase mb-6 italic">SIALKOT<span className="text-accent">SHOP</span></h3>
              <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
                Premium sportswear and technical apparel from the world's manufacturing capital. Quality export items at local prices.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Twitter size={18} /></a>
              </div>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-accent font-black uppercase text-[10px] tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-xs font-bold text-gray-400">
                <li><a href="#/shop?category=Men" className="hover:text-white transition-colors">Men's Apparel</a></li>
                <li><a href="#/shop?category=Women" className="hover:text-white transition-colors">Women's Collection</a></li>
                <li><a href="#/smart-pricing" className="hover:text-white transition-colors">Smart Pricing Tool</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-accent font-black uppercase text-[10px] tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-xs text-gray-500">
                <li className="flex items-center gap-2"><MessageCircle size={14} className="text-accent" /> +92 303 9877968</li>
                <li><a href="#/admin" className="hover:text-white flex items-center gap-2"><Lock size={12} /> Admin Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">{t('footerText')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
