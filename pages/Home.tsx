
import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, Quote, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products, isLoading, convertPrice } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="loader-spin mb-6"></div>
        <h2 className="text-accent font-black tracking-[0.4em] uppercase text-[10px] animate-pulse italic">Initializing Studio Heuristics...</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black">
      {/* Hero Section */}
      <div className="relative h-screen w-full bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
        
        {/* Cinematic VFX */}
        <div className="absolute -top-40 -left-40 w-[60%] h-[60%] bg-accent/10 blur-[200px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full animate-float"></div>

        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
          alt="Studio" 
          className="w-full h-full object-cover object-center opacity-40 grayscale-[0.8] scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up">
                <span className="glass text-accent px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.5em] uppercase border border-accent/20">
                  EXPORT READY V1.0
                </span>
                <span className="glass text-white/30 px-6 py-2.5 rounded-full text-[10px] font-black tracking-[0.5em] uppercase">
                  SIALKOT • USA • GLOBAL
                </span>
              </div>
              
              <h1 className="text-[15vw] md:text-[14rem] font-display font-black text-white tracking-tighter leading-[0.75] mb-12 italic uppercase relative inline-block">
                SALMAN<br />
                <span className="text-accent">SKT</span>
                <div className="absolute -bottom-2 right-0 md:bottom-2 text-[10px] md:text-sm tracking-[1em] text-white/20 font-black italic whitespace-nowrap">I WAS A LESSON</div>
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-end gap-12 mt-4">
                <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-sm uppercase tracking-tighter border-l-4 border-accent pl-12 leading-[1.1] italic">
                  Technical apparel engineered for the global elite. From Sialkot's forge to your archive.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-150">
                  <a 
                    href="#/shop" 
                    className="group inline-flex items-center justify-center bg-accent text-black px-16 py-7 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white transition-all transform hover:scale-105 shadow-[0_20px_80px_rgba(255,215,0,0.3)]"
                  >
                    Enter Catalog <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand DNA Section */}
      <div className="py-64 bg-[#050505] relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[40vw] font-black text-white/[0.02] whitespace-nowrap select-none italic uppercase pointer-events-none">LESSON</div>
         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <Quote size={80} className="text-accent mx-auto mb-16 opacity-30" />
            <h2 className="text-7xl md:text-[10rem] font-display font-black text-white italic uppercase tracking-tighter mb-12 leading-[0.8] shimmer-text">
              "I WAS A <span className="text-accent">LESSON.</span>"
            </h2>
            <p className="text-gray-500 text-lg md:text-2xl font-bold uppercase tracking-[0.2em] leading-relaxed max-w-3xl mx-auto opacity-80 border-t border-white/10 pt-16 mt-16">
              Salman SKT didn't just build a brand; he built a standard. Every Soup Jacket is a testament to resilience and technical mastery.
            </p>
         </div>
      </div>

      {/* Flagship Product Showcase */}
      <div className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-40">
            {/* The Signature Piece */}
            <div className="group relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=1200&q=80" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  alt="Soup Jacket"
                />
                <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.6em] text-[11px] mb-6">Asset_001 / Alpha</span>
                    <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic tracking-tighter mb-10 leading-[0.8]">THE SOUP<br/><span className="text-accent">JACKET</span></h3>
                    <a href="#/product/soup-alpha-01" className="bg-white text-black self-start px-14 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl">Deploy Asset</a>
                </div>
                <div className="absolute top-12 right-12 glass p-10 rounded-[3rem] border border-accent/20 text-accent group-hover:rotate-12 transition-all">
                    <ShieldCheck size={48} strokeWidth={1} />
                </div>
            </div>

            {/* The Industrial Spec */}
            <div className="group relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  alt="Studio Stand"
                />
                <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.6em] text-[11px] mb-6">Hardware_004 / Studio</span>
                    <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic tracking-tighter mb-10 leading-[0.8]">STUDIO<br/><span className="text-accent">STAND</span></h3>
                    <a href="#/product/stand-studio-01" className="bg-white text-black self-start px-14 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl">Equip Facility</a>
                </div>
                <div className="absolute top-12 right-12 glass p-10 rounded-[3rem] border border-accent/20 text-accent group-hover:rotate-12 transition-all">
                    <Zap size={48} strokeWidth={1} />
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div>
              <span className="text-accent font-black tracking-[0.6em] uppercase text-[11px] mb-6 block">Factory-Direct Archives</span>
              <h2 className="text-7xl md:text-[9rem] font-display font-black text-white italic tracking-tighter uppercase leading-none">New Assets</h2>
            </div>
            <a href="#/shop" className="group text-accent text-xs font-black uppercase tracking-[0.4em] flex items-center gap-6 border-b-2 border-accent/30 pb-6 hover:border-accent transition-all">
              Browse Full Catalog <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
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

      {/* AI Diagnostic CTA */}
      <div className="py-40 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-accent/[0.02] animate-pulse"></div>
         <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
             <div className="inline-flex items-center gap-4 glass px-8 py-3 rounded-full border border-accent/30 text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-16">
                 <Activity size={16} /> Technical Diagnostics Active
             </div>
             <h2 className="text-6xl md:text-8xl font-display font-black text-white italic uppercase tracking-tighter mb-12 leading-none">AI Smart Pricing Lens</h2>
             <p className="text-gray-600 text-lg uppercase font-bold tracking-[0.3em] max-w-2xl mx-auto mb-20 leading-loose">
               Snap a production asset and receive an instant global export valuation based on Sialkot technical standards.
             </p>
             <a href="#/smart-pricing" className="bg-accent text-black px-16 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] shadow-[0_0_80px_rgba(255,215,0,0.3)] hover:scale-110 transition-transform inline-block">Initialize Visual Scan</a>
         </div>
      </div>
    </div>
  );
};

export default Home;
