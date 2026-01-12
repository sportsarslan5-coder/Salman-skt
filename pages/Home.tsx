
import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Quote, Zap, ShieldCheck, Layers, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, isLoading } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="loader-spin mb-6"></div>
        <h2 className="text-accent font-black tracking-[0.5em] uppercase text-[10px] animate-pulse">Authenticating Studio...</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black selection:bg-accent selection:text-black">
      {/* Cinematic Hero */}
      <div className="relative h-[110vh] w-full bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
        
        {/* Abstract Light Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-float"></div>

        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical Studio" 
          className="w-full h-full object-cover object-center opacity-40 grayscale group-hover:grayscale-0 scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up">
                <span className="glass text-accent px-5 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase">
                  SALMAN SKT FLAGSHIP
                </span>
                <span className="glass text-white/40 px-5 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase">
                  EST. 1998
                </span>
              </div>
              
              <h1 className="text-[18vw] md:text-[14rem] font-display font-black text-white tracking-tighter leading-[0.7] mb-12 italic uppercase relative inline-block">
                SALMAN<br />
                <span className="text-accent">SKT</span>
                <div className="absolute bottom-2 right-0 md:bottom-6 text-[10px] md:text-sm tracking-[0.8em] text-white/20 font-black italic whitespace-nowrap">I WAS A LESSON</div>
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-end gap-12 mt-4">
                <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-sm uppercase tracking-tighter border-l-4 border-accent pl-10 leading-[1.1] italic">
                  Technical apparel engineered for the global elite. Built on lessons learned in fire.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-150">
                  <a 
                    href="#/shop" 
                    className="group inline-flex items-center justify-center bg-accent text-black px-16 py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 shadow-[0_20px_80px_rgba(255,215,0,0.3)]"
                  >
                    Enter Catalog <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                  </a>
                  <a 
                    href="#/smart-pricing" 
                    className="glass inline-flex items-center justify-center text-white px-16 py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                  >
                    <Sparkles size={18} className="mr-3 text-accent" /> AI PRICE LENS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-64 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[30vw] font-black text-white/[0.02] whitespace-nowrap select-none pointer-events-none italic uppercase">
          LESSON • LESSON
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <Quote size={100} className="text-accent mx-auto mb-16 opacity-20" />
            <h2 className="text-6xl md:text-9xl font-display font-black text-white italic uppercase tracking-tighter mb-12 leading-[0.85] shimmer-text">
              "I WAS A <span className="text-accent shimmer-none">LESSON.</span>"
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-left mt-24">
                <p className="text-gray-500 text-lg md:text-xl font-bold uppercase tracking-widest leading-relaxed opacity-80 border-t border-white/10 pt-10">
                    Salman SKT didn't just build a brand; he built a standard. Every stitch in our Soup Jackets is a legacy.
                </p>
                <div className="space-y-8 border-t border-white/10 pt-10">
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                            <Layers size={20} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.3em] text-white/60">Multi-Layer Protection</span>
                    </div>
                    <div className="flex items-center gap-6 group">
                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                            <Globe size={20} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.3em] text-white/60">Global Export Grade</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Flagship Showreel */}
      <div className="py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            {/* The Soup Jacket Highlight */}
            <div className="group relative aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=1200&q=80" 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  alt="Soup Jacket"
                />
                <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.6em] text-[11px] mb-6">Asset_001</span>
                    <h3 className="text-6xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-10 leading-none">THE SOUP<br/><span className="text-accent">JACKET</span></h3>
                    <a href="#/product/soup-alpha-01" className="bg-white text-black self-start px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl">Deploy Asset</a>
                </div>
                <div className="absolute top-12 right-12 glass p-8 rounded-[2.5rem] border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                    <ShieldCheck size={40} strokeWidth={1} />
                </div>
            </div>

            {/* The Stand Highlight */}
            <div className="group relative aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80" 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  alt="Studio Stand"
                />
                <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.6em] text-[11px] mb-6">Equipment_004</span>
                    <h3 className="text-6xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-10 leading-none">STUDIO<br/><span className="text-accent">STAND</span></h3>
                    <a href="#/product/stand-studio-01" className="bg-white text-black self-start px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl">Equip Studio</a>
                </div>
                <div className="absolute top-12 right-12 glass p-8 rounded-[2.5rem] border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                    <Zap size={40} strokeWidth={1} />
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div>
              <span className="text-accent font-black tracking-[0.5em] uppercase text-[11px] mb-6 block">Export Ready Inventory</span>
              <h2 className="text-7xl md:text-[9rem] font-display font-black text-white italic tracking-tighter uppercase leading-none">New Shipments</h2>
            </div>
            <a href="#/shop" className="group text-accent text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4 border-b border-accent/30 pb-4 hover:border-accent transition-all">
              Browse All Exports <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
