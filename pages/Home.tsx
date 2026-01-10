
import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, CheckCircle2, Quote, Zap, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { t, products, isLoading } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-accent font-black tracking-widest uppercase text-[10px]">Initializing Salman SKT...</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-black">
      {/* Cinematic Hero */}
      <div className="relative h-screen w-full bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical Studio" 
          className="w-full h-full object-cover object-center opacity-30 grayscale scale-110"
        />
        
        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-accent text-black px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase">
                  SALMAN SKT EXCLUSIVE
                </div>
                <div className="bg-white/5 border border-white/10 text-white px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase backdrop-blur-md">
                  USA EXPORT GRADE
                </div>
              </div>
              
              <h1 className="text-8xl md:text-[12rem] font-black text-white tracking-tighter leading-[0.75] mb-10 italic uppercase relative">
                SALMAN<br />
                <span className="text-accent">SKT</span>
                <span className="absolute -bottom-4 right-0 text-[10px] tracking-[1em] text-gray-500 font-black italic">I WAS A LESSON</span>
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-300 font-black max-w-xl mb-12 uppercase tracking-tighter border-l-8 border-accent pl-8 leading-none italic">
                Engineering the legendary SOUP JACKET. Wear the lesson.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up">
                <a 
                  href="#/shop" 
                  className="group inline-flex items-center justify-center bg-accent text-black px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(255,215,0,0.3)]"
                >
                  Shop the Soup Collection <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </a>
                <a 
                  href="#/smart-pricing" 
                  className="inline-flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all"
                >
                  <Sparkles size={16} className="mr-2 text-accent" /> AI Pricing Hub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none">
          I WAS A LESSON • I WAS A LESSON
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <Quote size={80} className="text-accent mx-auto mb-12 opacity-30" />
            <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-8 leading-[0.8]">
              "I WAS A <span className="text-accent">LESSON.</span>"
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-bold uppercase tracking-widest leading-relaxed mb-12 max-w-2xl mx-auto opacity-80">
              Salman SKT didn't just build a brand; he built a standard. Every stitch in our Soup Jackets and every weld in our T-shirt Stands is a testament to the lessons of the past.
            </p>
            <div className="inline-block h-1 w-40 bg-accent"></div>
        </div>
      </div>

      {/* Featured: The Soup Jacket & The Stand */}
      <div className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {/* The Soup Jacket Highlight */}
            <div className="group relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <img src="https://images.unsplash.com/photo-1591047139829-d91aec16adcd?w=1000&q=80" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-4">Flagship Asset</span>
                    <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-6">THE SOUP JACKET</h3>
                    <a href="#/product/soup-01" className="bg-white text-black self-start px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all">Claim Yours</a>
                </div>
                <div className="absolute top-10 right-10 bg-accent/20 backdrop-blur-xl p-4 rounded-3xl border border-accent/30 text-accent">
                    <ShieldCheck size={32} />
                </div>
            </div>

            {/* The Stand Highlight */}
            <div className="group relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&q=80" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-[10px] mb-4">Studio Essential</span>
                    <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-6">T-SHIRT STAND</h3>
                    <a href="#/product/stand-01" className="bg-white text-black self-start px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all">Equip Studio</a>
                </div>
                <div className="absolute top-10 right-10 bg-accent/20 backdrop-blur-xl p-4 rounded-3xl border border-accent/30 text-accent">
                    <Zap size={32} />
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">The Full Catalog</span>
              <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">Fresh From Sialkot</h2>
            </div>
            <a href="#/shop" className="group text-accent text-xs font-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-accent pb-2">
              Browse All Exports <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

      {/* Trust Grid */}
      <div className="py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
                <div className="bg-white/5 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:bg-accent transition-all">
                    <Zap size={32} className="text-accent" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Instant Export</h4>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose">USA orders processed with priority flight shipping.</p>
            </div>
            <div className="text-center">
                <div className="bg-white/5 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <ShieldCheck size={32} className="text-accent" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Verified Tech</h4>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose">All Soup Jackets undergo multi-stage stress testing.</p>
            </div>
            <div className="text-center">
                <div className="bg-white/5 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <CheckCircle2 size={32} className="text-accent" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">SKT Certified</h4>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose">Authentic production direct from the SKT flagship studio.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
