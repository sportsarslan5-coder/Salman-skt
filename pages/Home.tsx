
import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Award, TrendingUp, Sparkles, ChevronRight, Globe, Zap, CheckCircle2, Quote } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { t, products, isLoading } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-accent font-black tracking-widest uppercase text-[10px]">Syncing Luxury...</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black">
      {/* Premium Hero */}
      <div className="relative h-screen w-full bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Banner" 
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up">
                <div className="bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase backdrop-blur-md">
                  Salman SKT Export Hub
                </div>
                <div className="bg-white/5 border border-white/10 text-white px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase backdrop-blur-md">
                  "I was a lesson"
                </div>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-10 italic uppercase">
                SALMAN<br />
                <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-yellow-200">SKT</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-xl mb-12 uppercase tracking-tighter border-l-4 border-accent pl-8 leading-tight">
                "I was a lesson." — Elite sportswear & protective technical apparel. Directly from the heart of production to your doorstep.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-200">
                <a 
                  href="#/shop" 
                  className="group inline-flex items-center justify-center bg-accent text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105"
                >
                  Explore Catalog <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </a>
                <a 
                  href="#/smart-pricing" 
                  className="inline-flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
                >
                  <Sparkles size={16} className="mr-2 text-accent" /> AI Price Lens
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Marquee */}
      <div className="bg-[#050505] py-5 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-accent font-black text-[10px] tracking-[0.6em] uppercase opacity-80">
           • SALMAN SKT GLOBAL QUALITY • SOUP JACKET SERIES • I WAS A LESSON • FAST WORLDWIDE SHIPPING • PREMIUM TECHNICAL APPAREL • SALMAN SKT GLOBAL QUALITY
        </div>
      </div>

      {/* Special Quote Section */}
      <div className="py-24 bg-black border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <Quote size={60} className="text-accent mx-auto mb-10 opacity-40" />
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">"I was a lesson."</h2>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-xs">— Salman SKT Founder</p>
        </div>
      </div>

      {/* Grid Highlights */}
      <div className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <span className="text-accent font-black uppercase text-xs tracking-[0.4em]">The Legend</span>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Exporting <span className="text-accent">Perfection</span> Since 1998.</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-urdu">
                {"سلمان ایس کے ٹی کے بہترین کاریگروں کی مہارت اور جدید ٹیکنالوجی کا امتزاج۔ ہم صرف ملبوسات نہیں بناتے، ہم معیار کی ایک ایسی داستان لکھتے ہیں جو پوری دنیا میں پہچانی جاتی ہے۔"}
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" size={24} />
                    <span className="text-white font-black text-xs uppercase tracking-widest">Global Reach</span>
                </div>
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" size={24} />
                    <span className="text-white font-black text-xs uppercase tracking-widest">Direct Factory Pricing</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-accent/5 blur-[120px] rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1594932224828-b4b0573fe2f8?w=1000&q=80" 
                className="rounded-[4rem] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl relative z-10" 
                alt="Salman SKT Craftsmanship"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <div className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Signature Soup Series</span>
              <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Fresh Arrivals</h2>
            </div>
            <a href="#/shop" className="group text-accent text-xs font-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-accent pb-2">
              Shop Everything <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className="animate-fade-in-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
