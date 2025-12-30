
import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, TrendingUp, Sparkles, ChevronRight, Globe, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { t, products, isLoading } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-accent font-black tracking-widest uppercase text-xs">Loading Luxury...</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black">
      {/* Cinematic Hero Section */}
      <div className="relative h-[90vh] w-full bg-black overflow-hidden border-b border-accent/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Banner" 
          className="w-full h-full object-cover object-center opacity-60 transition-transform duration-[10s] hover:scale-110"
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl space-y-8">
              <div className="flex flex-wrap gap-4 animate-fade-in-up">
                <div className="bg-accent text-black px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                  Sialkot Export Grade
                </div>
                <div className="bg-white/5 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/10">
                  Global Shipping
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] animate-fade-in-up delay-100 italic">
                SIALKOT<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent">SHOP</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl animate-fade-in-up delay-200 uppercase tracking-[0.1em] border-l-2 border-accent pl-6">
                Premium manufacturing from the heart of Pakistan. Engineered for champions, delivered to you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-fade-in-up delay-300">
                <a 
                  href="#/shop" 
                  className="group inline-flex items-center justify-center bg-accent text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 shadow-xl"
                >
                  Shop Now <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </a>
                <a 
                  href="#/smart-pricing" 
                  className="inline-flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
                >
                  <Sparkles size={14} className="mr-2 text-accent" /> AI Lens
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Bar */}
      <div className="bg-[#050505] py-4 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-accent font-black text-[9px] tracking-[0.5em] uppercase opacity-70">
           • SIALKOT MANUFACTURING CAPITAL • GLOBAL QUALITY STANDARDS • 100% EXPORT GRADE • WORLDWIDE LOGISTICS • SIALKOT MANUFACTURING CAPITAL • GLOBAL QUALITY STANDARDS
        </div>
      </div>

      {/* Craftsmanship Section */}
      <div className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent font-black uppercase text-xs tracking-[0.3em] mb-4 block">The Legacy</span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">Made in <span className="text-accent">Sialkot</span>, Worn by the World.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium font-urdu">
                {"سیالکوٹ کے بہترین کاریگروں کی مہارت اور جدید ٹیکنالوجی کا امتزاج۔ ہم صرف کپڑے نہیں بناتے، ہم معیار کی ایک ایسی داستان لکھتے ہیں جو پوری دنیا میں پہچانی جاتی ہے۔"}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-accent text-3xl font-black mb-1">500+</div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Premium Designs</div>
                </div>
                <div>
                  <div className="text-accent text-3xl font-black mb-1">100%</div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Customer Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&q=80" 
                  className="rounded-[3rem] border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10" 
                  alt="Sialkot Craftsmanship"
                />
                <div className="absolute bottom-10 -left-10 bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl z-20 hidden md:block animate-bounce shadow-2xl">
                  <Globe className="text-accent mb-2" size={32} />
                  <p className="text-white font-black text-xs uppercase tracking-tighter">Exporting to<br/>30+ Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Items - Dark Grid */}
      <div className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent font-black tracking-[0.3em] uppercase text-[10px] mb-2 block">The Collection</span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">New Arrivals</h2>
            </div>
            <a href="#/shop" className="text-accent text-xs font-black uppercase tracking-widest hover:underline border-b border-accent pb-1">Explore Shop</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-[#111] p-4 rounded-3xl border border-white/5 hover:border-accent/30 transition-all group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us - Dark Themed Cards */}
      <div className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "EXPRESS SYNC", text: "Cloud-connected inventory system ensuring real-time stock availability across all devices." },
              { icon: Award, title: "ELITE FINISH", text: "Using premium threading and laser-cut technology to achieve the perfect Sialkot export finish." },
              { icon: ShieldCheck, title: "PROTEX GEAR", text: "Specialized protective layers in our jackets to shield you from the toughest weather elements." }
            ].map((feature, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] hover:bg-secondary transition-all group">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 text-black shadow-[0_0_20px_rgba(255,215,0,0.2)] group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-white font-black text-xl mb-4 italic uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
